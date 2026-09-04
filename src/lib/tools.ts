export type Tool = { to: string; title: string; description: string; icon: string }

const ICON_PATHS = {
  merge: 'M9 12h6m-6 0-3 3m3-3-3-3m12 0 3 3-3 3M4.5 6.75h3v10.5h-3zm12 0h3v10.5h-3z',
  split:
    'M12 4.5v15m-6-15h4.5a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 0-1.5 1.5v3A1.5 1.5 0 0 0 6 15h4.5m3-10.5H18a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 18 10.5h-4.5',
  compress:
    'M9 9V4.5M9 9H4.5M9 9 3.75 3.75M15 9h4.5M15 9V4.5M15 9l5.25-5.25M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25',
  rotate:
    'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99',
  watermark: 'M4.5 4.5v15m15-15v15M4.5 12h15M8 8l4 4-4 4m8-8-4 4 4 4',
  protect:
    'M12 3.75c-3.5 0-6 1.5-6 1.5v6c0 4.5 3 8.25 6 9 3-.75 6-4.5 6-9v-6s-2.5-1.5-6-1.5Zm0 5.25v3',
  metadata: 'M9 12h6m-6 3.75h6M9 8.25h1.5M6 4.5h12A1.5 1.5 0 0 1 19.5 6v12a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5Z',
  reorder: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  pdfToImage: 'M3.75 4.5h16.5v15H3.75zM3.75 15l4.5-4.5 3 3 5.25-5.25 3.75 3.75',
  imageToPdf:
    'M9 12h6m-6 3.75h6M6 4.5h9l4.5 4.5V19.5A1.5 1.5 0 0 1 18 21H6a1.5 1.5 0 0 1-1.5-1.5V6A1.5 1.5 0 0 1 6 4.5Z',
  imageCompress:
    'M9 9V4.5M9 9H4.5M9 9 3.75 3.75M15 9h4.5M15 9V4.5M15 9l5.25-5.25M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25',
  qr: 'M3.75 3.75h6v6h-6zm10.5 0h6v6h-6zm-10.5 10.5h6v6h-6zm10.5 3h2.25m-2.25-3h6v6h-6z',
  wordCount: 'M4 6h16M4 12h10M4 18h7',
  typeMaster: 'M6.75 7.5h10.5M6.75 12h10.5M6.75 16.5h6M3.75 3.75h16.5v16.5H3.75z',
}

export const PDF_TOOLS: Tool[] = [
  { to: '/merge', title: 'Merge PDF', description: 'Combine multiple PDFs into a single file, in the order you choose.', icon: ICON_PATHS.merge },
  { to: '/split', title: 'Split PDF', description: 'Pull specific pages or ranges out of a PDF into a new file.', icon: ICON_PATHS.split },
  { to: '/compress', title: 'Compress PDF', description: 'Shrink a PDF’s file size for easier sharing and storage.', icon: ICON_PATHS.compress },
  { to: '/rotate', title: 'Rotate PDF', description: 'Fix sideways or upside-down pages, 90° at a time.', icon: ICON_PATHS.rotate },
  { to: '/watermark', title: 'Watermark PDF', description: 'Stamp a diagonal text watermark across every page.', icon: ICON_PATHS.watermark },
  { to: '/protect', title: 'Protect PDF', description: 'Add or remove a password on a PDF.', icon: ICON_PATHS.protect },
  { to: '/metadata', title: 'Edit Metadata', description: 'View and edit a PDF’s title, author, and keywords.', icon: ICON_PATHS.metadata },
  { to: '/reorder', title: 'Reorder Pages', description: 'Visually reorder or delete pages, then save.', icon: ICON_PATHS.reorder },
  { to: '/pdf-to-image', title: 'PDF to Image', description: 'Convert every page of a PDF into a JPG image.', icon: ICON_PATHS.pdfToImage },
  { to: '/image-to-pdf', title: 'Image to PDF', description: 'Combine JPG or PNG images into a single PDF.', icon: ICON_PATHS.imageToPdf },
]

export const OTHER_TOOLS: Tool[] = [
  { to: '/image-compress', title: 'Image Compressor', description: 'Shrink a JPG or PNG’s file size.', icon: ICON_PATHS.imageCompress },
  { to: '/qr-generator', title: 'QR Code Generator', description: 'Turn any text or URL into a QR code.', icon: ICON_PATHS.qr },
  { to: '/word-counter', title: 'Word Counter', description: 'Count words, characters, sentences, and paragraphs.', icon: ICON_PATHS.wordCount },
  { to: '/type-master', title: 'Type Master', description: 'Test your typing speed and accuracy in words per minute.', icon: ICON_PATHS.typeMaster },
]
