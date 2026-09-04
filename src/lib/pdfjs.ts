import * as pdfjsLib from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

export async function loadPdfDocument(file: File) {
  const data = await file.arrayBuffer()
  return pdfjsLib.getDocument({ data }).promise
}

/** Renders every page to a JPEG blob at the given scale (1 = 72dpi). */
export async function renderPagesToImages(
  file: File,
  scale = 1.5,
): Promise<Blob[]> {
  const doc = await loadPdfDocument(file)
  const blobs: Blob[] = []
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const viewport = page.getViewport({ scale })
    const canvas = document.createElement('canvas')
    canvas.width = viewport.width
    canvas.height = viewport.height
    const ctx = canvas.getContext('2d')!
    await page.render({ canvasContext: ctx, viewport, canvas }).promise
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/jpeg', 0.92),
    )
    blobs.push(blob)
  }
  return blobs
}

/** Renders a single page to a small thumbnail canvas, returned as a data URL. */
export async function renderThumbnail(file: File, pageIndex: number, maxWidth = 160): Promise<string> {
  const doc = await loadPdfDocument(file)
  const page = await doc.getPage(pageIndex + 1)
  const base = page.getViewport({ scale: 1 })
  const scale = maxWidth / base.width
  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  canvas.width = viewport.width
  canvas.height = viewport.height
  const ctx = canvas.getContext('2d')!
  await page.render({ canvasContext: ctx, viewport, canvas }).promise
  return canvas.toDataURL('image/png')
}

export async function getPageCount(file: File): Promise<number> {
  const doc = await loadPdfDocument(file)
  return doc.numPages
}

/** Extracts plain text per page. */
export async function extractPdfText(file: File): Promise<string[]> {
  const doc = await loadPdfDocument(file)
  const pages: string[] = []
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const content = await page.getTextContent()
    pages.push(content.items.map((item) => ('str' in item ? item.str : '')).join(' '))
  }
  return pages
}
