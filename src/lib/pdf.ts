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
