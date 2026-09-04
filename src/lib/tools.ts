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
  compare: 'M9 4.5v15m6-15v15M4.5 9h4.5m6 0H19.5M4.5 15h4.5m6 0H19.5',
  sign: 'M3 17.25 14.06 6.19a1.5 1.5 0 0 1 2.12 0l1.63 1.63a1.5 1.5 0 0 1 0 2.12L6.75 21H3v-3.75Z',
  fillForm: 'M4.5 6h15M4.5 6a1.5 1.5 0 0 1 1.5-1.5h12A1.5 1.5 0 0 1 19.5 6M4.5 6v12a1.5 1.5 0 0 0 1.5 1.5h4.5m3-9h6m-6 3.75h6m-6 3.75h3',
  extractText: 'M9 12h6m-6 3.75h4.5M9 8.25h6M6 4.5h12A1.5 1.5 0 0 1 19.5 6v12a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5Z',
  crop: 'M6 3v13.5A1.5 1.5 0 0 0 7.5 18H21M3 6h13.5A1.5 1.5 0 0 1 18 7.5V21',
  passwordGen: 'M12 3.75c-3.5 0-6 1.5-6 1.5v6c0 4.5 3 8.25 6 9 3-.75 6-4.5 6-9v-6s-2.5-1.5-6-1.5Zm0 4.5v3m-2 2h4',
  json: 'M9.75 3.75c-1.5 0-2.25.75-2.25 2.25v3c0 1.2-.6 1.8-1.8 1.8H5.25v1.4h.45c1.2 0 1.8.6 1.8 1.8v3c0 1.5.75 2.25 2.25 2.25M14.25 3.75c1.5 0 2.25.75 2.25 2.25v3c0 1.2.6 1.8 1.8 1.8h.45v1.4h-.45c-1.2 0-1.8.6-1.8 1.8v3c0 1.5-.75 2.25-2.25 2.25',
  unitConvert: 'M7.5 3.75 3.75 7.5m0 0L7.5 11.25M3.75 7.5h16.5m-4.5 5.25 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.75',
  pageNumbers: 'M6 4.5h12A1.5 1.5 0 0 1 19.5 6v12a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5Zm4.5 15v-3h3v3',
  textToPdf: 'M9 12h6m-6 3.75h4.5M6 4.5h9l4.5 4.5V19.5A1.5 1.5 0 0 1 18 21H6a1.5 1.5 0 0 1-1.5-1.5V6A1.5 1.5 0 0 1 6 4.5Z',
  base64: 'M4.5 12h15m-15 0 3-3m-3 3 3 3m8.25-6 3 3-3 3',
  urlEncode: 'M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 3L21 3m0 0h-5.25M21 3v5.25',
  caseConvert: 'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.25-6v13.5m-3.75 0h7.5',
  hash: 'M5.25 4.5 6.75 19.5m6-15-1.5 15M3.75 9h16.5M3 15h16.5',
  timestamp: 'M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  csvJson: 'M8.25 4.5 5.25 7.5m0 0 3 3m-3-3h13.5m-4.5 6-3 3m0 0 3 3m-3-3h13.5',
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
  { to: '/compare-pdf', title: 'Compare PDFs', description: 'See word-level differences between two PDFs.', icon: ICON_PATHS.compare },
  { to: '/sign-pdf', title: 'Sign PDF', description: 'Draw a signature and place it on a page.', icon: ICON_PATHS.sign },
  { to: '/fill-form', title: 'Fill PDF Form', description: 'Fill in a PDF form’s fields and download it.', icon: ICON_PATHS.fillForm },
  { to: '/extract-text', title: 'Extract Text', description: 'Pull the plain text out of a PDF.', icon: ICON_PATHS.extractText },
  { to: '/crop-pdf', title: 'Crop PDF', description: 'Trim margins from every page.', icon: ICON_PATHS.crop },
  { to: '/add-page-numbers', title: 'Add Page Numbers', description: 'Stamp page numbers onto every page.', icon: ICON_PATHS.pageNumbers },
  { to: '/text-to-pdf', title: 'Text to PDF', description: 'Turn plain text into a downloadable PDF.', icon: ICON_PATHS.textToPdf },
]

export const OTHER_TOOLS: Tool[] = [
  { to: '/image-compress', title: 'Image Compressor', description: 'Shrink a JPG or PNG’s file size.', icon: ICON_PATHS.imageCompress },
  { to: '/qr-generator', title: 'QR Code Generator', description: 'Turn any text or URL into a QR code.', icon: ICON_PATHS.qr },
  { to: '/word-counter', title: 'Word Counter', description: 'Count words, characters, sentences, and paragraphs.', icon: ICON_PATHS.wordCount },
  { to: '/type-master', title: 'Type Master', description: 'Test your typing speed and accuracy in words per minute.', icon: ICON_PATHS.typeMaster },
  { to: '/password-tool', title: 'Password Generator', description: 'Generate strong passwords and check password strength.', icon: ICON_PATHS.passwordGen },
  { to: '/json-formatter', title: 'JSON Formatter', description: 'Format, validate, and minify JSON.', icon: ICON_PATHS.json },
  { to: '/unit-converter', title: 'Unit Converter', description: 'Convert length, weight, temperature, and data units.', icon: ICON_PATHS.unitConvert },
  { to: '/base64-tool', title: 'Base64 Encoder/Decoder', description: 'Encode or decode Base64 text.', icon: ICON_PATHS.base64 },
  { to: '/url-encoder', title: 'URL Encoder/Decoder', description: 'Encode or decode URL components.', icon: ICON_PATHS.urlEncode },
  { to: '/case-converter', title: 'Case Converter', description: 'Convert text between UPPERCASE, Title Case, camelCase, and more.', icon: ICON_PATHS.caseConvert },
  { to: '/hash-generator', title: 'Hash Generator', description: 'Generate SHA-1/256/384/512 hashes of text.', icon: ICON_PATHS.hash },
  { to: '/timestamp-converter', title: 'Timestamp Converter', description: 'Convert Unix epoch time to and from a readable date.', icon: ICON_PATHS.timestamp },
  { to: '/csv-json-converter', title: 'CSV ⇄ JSON Converter', description: 'Convert CSV to JSON or JSON to CSV.', icon: ICON_PATHS.csvJson },
]
