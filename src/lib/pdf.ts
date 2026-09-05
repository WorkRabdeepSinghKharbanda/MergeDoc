import { PDFDocument, StandardFonts, degrees, rgb } from '@cantoo/pdf-lib'

async function toArrayBuffer(file: File): Promise<ArrayBuffer> {
  return file.arrayBuffer()
}

export function downloadBlob(bytes: Uint8Array, filename: string) {
  const blob = new Blob([new Uint8Array(bytes)], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  const merged = await PDFDocument.create()
  for (const file of files) {
    const src = await PDFDocument.load(await toArrayBuffer(file))
    const pages = await merged.copyPages(src, src.getPageIndices())
    pages.forEach((page) => merged.addPage(page))
  }
  return merged.save()
}

/** ranges: e.g. "1-3,5" (1-indexed, inclusive) */
export function parsePageRanges(ranges: string, pageCount: number): number[] {
  const indices = new Set<number>()
  for (const part of ranges.split(',').map((p) => p.trim()).filter(Boolean)) {
    const [startStr, endStr] = part.split('-')
    const start = Math.max(1, parseInt(startStr, 10))
    const end = Math.min(pageCount, parseInt(endStr ?? startStr, 10))
    for (let i = start; i <= end; i++) indices.add(i - 1)
  }
  return [...indices].sort((a, b) => a - b)
}

export async function splitPdf(file: File, ranges: string): Promise<Uint8Array> {
  const src = await PDFDocument.load(await toArrayBuffer(file))
  const indices = parsePageRanges(ranges, src.getPageCount())
  const out = await PDFDocument.create()
  const pages = await out.copyPages(src, indices)
  pages.forEach((page) => out.addPage(page))
  return out.save()
}

export async function rotatePdf(file: File, degreesAmount: 90 | 180 | 270): Promise<Uint8Array> {
  const doc = await PDFDocument.load(await toArrayBuffer(file))
  for (const page of doc.getPages()) {
    page.setRotation(degrees((page.getRotation().angle + degreesAmount) % 360))
  }
  return doc.save()
}

/**
 * Re-saves with object streams enabled, which pdf-lib omits by default.
 * ponytail: not true image recompression (that needs a rasterize+re-encode
 * pipeline), just structural dedup — real savings only on PDFs with
 * duplicated fonts/streams. Upgrade path: rasterize pages via pdf.js
 * + re-encode as JPEG if users need real size reduction on image-heavy PDFs.
 */
export async function compressPdf(file: File): Promise<Uint8Array> {
  const doc = await PDFDocument.load(await toArrayBuffer(file))
  return doc.save({ useObjectStreams: true })
}

/** Builds a new PDF with one page per image (jpg/png), fit to the page. */
export async function imagesToPdf(files: File[]): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  for (const file of files) {
    const bytes = new Uint8Array(await toArrayBuffer(file))
    const isPng = file.type === 'image/png'
    const image = isPng ? await doc.embedPng(bytes) : await doc.embedJpg(bytes)
    const page = doc.addPage([image.width, image.height])
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height })
  }
  return doc.save()
}

export async function watermarkPdf(file: File, text: string, opacity = 0.3): Promise<Uint8Array> {
  const doc = await PDFDocument.load(await toArrayBuffer(file))
  const font = await doc.embedFont(StandardFonts.HelveticaBold)
  const fontSize = 48
  for (const page of doc.getPages()) {
    const { width, height } = page.getSize()
    const textWidth = font.widthOfTextAtSize(text, fontSize)
    page.drawText(text, {
      x: width / 2 - textWidth / 2,
      y: height / 2,
      size: fontSize,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity,
      rotate: degrees(45),
    })
  }
  return doc.save()
}

export async function setPdfMetadata(
  file: File,
  meta: { title?: string; author?: string; subject?: string; keywords?: string },
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(await toArrayBuffer(file))
  if (meta.title) doc.setTitle(meta.title)
  if (meta.author) doc.setAuthor(meta.author)
  if (meta.subject) doc.setSubject(meta.subject)
  if (meta.keywords) doc.setKeywords(meta.keywords.split(',').map((k) => k.trim()).filter(Boolean))
  return doc.save()
}

export async function readPdfMetadata(file: File) {
  const doc = await PDFDocument.load(await toArrayBuffer(file))
  return {
    title: doc.getTitle() ?? '',
    author: doc.getAuthor() ?? '',
    subject: doc.getSubject() ?? '',
    keywords: doc.getKeywords() ?? '',
  }
}

export async function protectPdf(file: File, password: string): Promise<Uint8Array> {
  const doc = await PDFDocument.load(await toArrayBuffer(file))
  doc.encrypt({ userPassword: password, ownerPassword: password })
  return doc.save()
}

export async function unprotectPdf(file: File, password: string): Promise<Uint8Array> {
  const doc = await PDFDocument.load(await toArrayBuffer(file), { password })
  return doc.save()
}

/** Reorders and/or drops pages. `order` is a list of 0-indexed source page indices, in the desired output order. */
export async function reorderPdf(file: File, order: number[]): Promise<Uint8Array> {
  const src = await PDFDocument.load(await toArrayBuffer(file))
  const out = await PDFDocument.create()
  const pages = await out.copyPages(src, order)
  pages.forEach((page) => out.addPage(page))
  return out.save()
}

export async function getPageCountFromPdfLib(file: File): Promise<number> {
  const doc = await PDFDocument.load(await toArrayBuffer(file))
  return doc.getPageCount()
}

/** Crops every page by inset margins (in PDF points, 72/inch). */
export async function cropPdf(
  file: File,
  inset: { top: number; right: number; bottom: number; left: number },
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(await toArrayBuffer(file))
  for (const page of doc.getPages()) {
    const { width, height } = page.getSize()
    page.setCropBox(
      inset.left,
      inset.bottom,
      width - inset.left - inset.right,
      height - inset.top - inset.bottom,
    )
  }
  return doc.save()
}

/** Draws a signature image onto one page at a normalized (0-1) position. */
export async function signPdf(
  file: File,
  signaturePngBytes: Uint8Array,
  opts: { pageIndex: number; xRatio: number; yRatio: number; widthRatio: number },
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(await toArrayBuffer(file))
  const page = doc.getPages()[opts.pageIndex]
  const image = await doc.embedPng(signaturePngBytes)
  const { width: pageWidth, height: pageHeight } = page.getSize()
  const w = pageWidth * opts.widthRatio
  const h = w * (image.height / image.width)
  page.drawImage(image, {
    x: pageWidth * opts.xRatio,
    y: pageHeight * (1 - opts.yRatio) - h,
    width: w,
    height: h,
  })
  return doc.save()
}

export type RedactionBox = { pageIndex: number; xRatio: number; yRatio: number; widthRatio: number; heightRatio: number }

/** Draws opaque black rectangles over the given normalized (0-1) regions. Covers the content visually but does not remove underlying text — fine for print/scan redaction, not for text-searchable removal. */
export async function redactPdf(file: File, boxes: RedactionBox[]): Promise<Uint8Array> {
  const doc = await PDFDocument.load(await toArrayBuffer(file))
  const pages = doc.getPages()
  for (const box of boxes) {
    const page = pages[box.pageIndex]
    if (!page) continue
    const { width, height } = page.getSize()
    const w = width * box.widthRatio
    const h = height * box.heightRatio
    page.drawRectangle({
      x: width * box.xRatio,
      y: height * (1 - box.yRatio) - h,
      width: w,
      height: h,
      color: rgb(0, 0, 0),
    })
  }
  return doc.save()
}

export type PdfFormField = { name: string; type: 'text' | 'checkbox' | 'radio' | 'dropdown' | 'unsupported'; options?: string[] }

export async function readPdfFormFields(file: File): Promise<PdfFormField[]> {
  const doc = await PDFDocument.load(await toArrayBuffer(file))
  const form = doc.getForm()
  return form.getFields().map((field) => {
    const name = field.getName()
    const ctor = field.constructor.name
    if (ctor === 'PDFTextField') return { name, type: 'text' as const }
    if (ctor === 'PDFCheckBox') return { name, type: 'checkbox' as const }
    if (ctor === 'PDFRadioGroup') return { name, type: 'radio' as const, options: (field as unknown as { getOptions(): string[] }).getOptions() }
    if (ctor === 'PDFDropdown') return { name, type: 'dropdown' as const, options: (field as unknown as { getOptions(): string[] }).getOptions() }
    return { name, type: 'unsupported' as const }
  })
}

export async function fillPdfForm(file: File, values: Record<string, string | boolean>, flatten: boolean): Promise<Uint8Array> {
  const doc = await PDFDocument.load(await toArrayBuffer(file))
  const form = doc.getForm()
  for (const [name, value] of Object.entries(values)) {
    const field = form.getFields().find((f) => f.getName() === name)
    if (!field) continue
    const ctor = field.constructor.name
    if (ctor === 'PDFTextField') (field as unknown as { setText(v: string): void }).setText(String(value))
    else if (ctor === 'PDFCheckBox') {
      const cb = field as unknown as { check(): void; uncheck(): void }
      if (value) cb.check()
      else cb.uncheck()
    } else if (ctor === 'PDFRadioGroup' || ctor === 'PDFDropdown') {
      ;(field as unknown as { select(v: string): void }).select(String(value))
    }
  }
  if (flatten) form.flatten()
  return doc.save()
}

export async function addPageNumbers(
  file: File,
  opts: { position: 'bottom-center' | 'bottom-right' | 'bottom-left'; startAt: number } = { position: 'bottom-center', startAt: 1 },
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(await toArrayBuffer(file))
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const fontSize = 10
  const margin = 24
  doc.getPages().forEach((page, i) => {
    const label = String(opts.startAt + i)
    const { width } = page.getSize()
    const textWidth = font.widthOfTextAtSize(label, fontSize)
    const x = opts.position === 'bottom-left' ? margin : opts.position === 'bottom-right' ? width - margin - textWidth : width / 2 - textWidth / 2
    page.drawText(label, { x, y: margin / 2, size: fontSize, font, color: rgb(0.3, 0.3, 0.3) })
  })
  return doc.save()
}

export type InvoiceItem = { description: string; quantity: number; price: number }
export type InvoiceData = {
  invoiceNumber: string
  date: string
  fromName: string
  toName: string
  items: InvoiceItem[]
  taxPercent: number
  notes?: string
}

/** Builds a single-page invoice PDF — plain text layout, no logo/branding. */
export async function generateInvoicePdf(data: InvoiceData): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  const page = doc.addPage([612, 792])
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const bold = await doc.embedFont(StandardFonts.HelveticaBold)
  const margin = 50
  let y = 792 - margin

  page.drawText('INVOICE', { x: margin, y, size: 24, font: bold })
  y -= 30
  page.drawText(`Invoice #: ${data.invoiceNumber}`, { x: margin, y, size: 10, font })
  page.drawText(`Date: ${data.date}`, { x: 612 - margin - 150, y, size: 10, font })
  y -= 30
  page.drawText(`From: ${data.fromName}`, { x: margin, y, size: 11, font: bold })
  y -= 16
  page.drawText(`To: ${data.toName}`, { x: margin, y, size: 11, font: bold })
  y -= 30

  page.drawText('Description', { x: margin, y, size: 10, font: bold })
  page.drawText('Qty', { x: 350, y, size: 10, font: bold })
  page.drawText('Price', { x: 420, y, size: 10, font: bold })
  page.drawText('Total', { x: 500, y, size: 10, font: bold })
  y -= 6
  page.drawLine({ start: { x: margin, y }, end: { x: 612 - margin, y }, thickness: 1, color: rgb(0.8, 0.8, 0.8) })
  y -= 18

  let subtotal = 0
  for (const item of data.items) {
    const lineTotal = item.quantity * item.price
    subtotal += lineTotal
    page.drawText(item.description, { x: margin, y, size: 10, font })
    page.drawText(String(item.quantity), { x: 350, y, size: 10, font })
    page.drawText(item.price.toFixed(2), { x: 420, y, size: 10, font })
    page.drawText(lineTotal.toFixed(2), { x: 500, y, size: 10, font })
    y -= 20
  }

  const tax = (subtotal * data.taxPercent) / 100
  const total = subtotal + tax
  y -= 10
  page.drawLine({ start: { x: 350, y }, end: { x: 612 - margin, y }, thickness: 1, color: rgb(0.8, 0.8, 0.8) })
  y -= 20
  page.drawText('Subtotal', { x: 420, y, size: 10, font })
  page.drawText(subtotal.toFixed(2), { x: 500, y, size: 10, font })
  y -= 18
  page.drawText(`Tax (${data.taxPercent}%)`, { x: 420, y, size: 10, font })
  page.drawText(tax.toFixed(2), { x: 500, y, size: 10, font })
  y -= 18
  page.drawText('Total', { x: 420, y, size: 11, font: bold })
  page.drawText(total.toFixed(2), { x: 500, y, size: 11, font: bold })

  if (data.notes) {
    y -= 40
    page.drawText('Notes:', { x: margin, y, size: 10, font: bold })
    y -= 16
    page.drawText(data.notes, { x: margin, y, size: 10, font })
  }

  return doc.save()
}

/** Builds a simple multi-page PDF from plain text, wrapping at word boundaries. */
export async function textToPdf(text: string): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const fontSize = 11
  const lineHeight = fontSize * 1.4
  const pageWidth = 612
  const pageHeight = 792
  const margin = 50
  const maxWidth = pageWidth - margin * 2

  const lines: string[] = []
  for (const paragraph of text.split('\n')) {
    let current = ''
    for (const word of paragraph.split(' ')) {
      const candidate = current ? `${current} ${word}` : word
      if (font.widthOfTextAtSize(candidate, fontSize) > maxWidth && current) {
        lines.push(current)
        current = word
      } else {
        current = candidate
      }
    }
    lines.push(current)
  }

  const linesPerPage = Math.floor((pageHeight - margin * 2) / lineHeight)
  for (let i = 0; i < lines.length; i += linesPerPage) {
    const page = doc.addPage([pageWidth, pageHeight])
    const chunk = lines.slice(i, i + linesPerPage)
    chunk.forEach((line, row) => {
      page.drawText(line, { x: margin, y: pageHeight - margin - row * lineHeight, size: fontSize, font })
    })
  }
  return doc.save()
}
