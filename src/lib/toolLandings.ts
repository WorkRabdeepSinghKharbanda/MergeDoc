export type ToolLanding = {
  slug: string
  path: string
  toolPath: string
  toolLabel: string
  h1: string
  metaTitle: string
  metaDescription: string
  intro: string
  bullets: string[]
  steps: string[]
  faqs: { q: string; a: string }[]
}

export const TOOL_LANDINGS: ToolLanding[] = [
  {
    slug: 'free-pdf-merger',
    path: '/free-pdf-merger',
    toolPath: '/merge',
    toolLabel: 'Open the PDF Merger',
    h1: 'Free PDF Merger — Combine PDFs Online, No Upload',
    metaTitle: 'Free PDF Merger Online — Combine PDF Files (No Upload)',
    metaDescription: 'Merge multiple PDF files into one, free, with no upload to a server, no account, and no file limit. Your files stay on your device.',
    intro: 'Most "PDF merger" sites upload your documents to a server before combining them. This one doesn\'t — the merge happens entirely in your browser using client-side PDF processing, so your files never leave your device.',
    bullets: [
      'No upload — files are processed locally in your browser',
      'No account, no email, no watermark added to the result',
      'Reorder files by dragging before merging',
      'No artificial file-size limit imposed by a backend',
    ],
    steps: [
      'Select or drop the PDF files you want to combine',
      'Drag to put them in the order you want in the final document',
      'Click merge — the combined PDF downloads directly',
    ],
    faqs: [
      { q: 'Is this PDF merger really free?', a: 'Yes, with no usage limit, no sign-up, and no watermark on the merged file.' },
      { q: 'How many PDFs can I merge at once?', a: 'There\'s no fixed cap — the practical limit is your device\'s available memory, since everything runs locally.' },
      { q: 'Will the page order be preserved?', a: 'Yes, each source PDF keeps its internal page order; you control the order of the files themselves before merging.' },
    ],
  },
  {
    slug: 'pdf-compressor-online',
    path: '/pdf-compressor-online',
    toolPath: '/compress',
    toolLabel: 'Open the PDF Compressor',
    h1: 'Compress PDF Online — Shrink File Size for Free',
    metaTitle: 'Compress PDF Online Free — Reduce PDF File Size',
    metaDescription: 'Shrink a PDF\'s file size for free, directly in your browser. No upload, no account, works on any device.',
    intro: 'A bloated PDF is usually carrying duplicated fonts and uncompressed structure. This tool re-serializes the file to remove that overhead, entirely on your device.',
    bullets: [
      'Runs in your browser — no upload required',
      'No account or watermark',
      'Works alongside other tools like Split and Rotate for a full cleanup pass',
    ],
    steps: [
      'Select the PDF you want to shrink',
      'Click compress and wait a moment while it re-serializes the file',
      'Download the smaller result',
    ],
    faqs: [
      { q: 'Will compression reduce quality?', a: 'This tool deduplicates structural overhead (fonts, object streams) rather than recompressing embedded images, so visual quality is unaffected.' },
      { q: 'Does it work on scanned, image-heavy PDFs?', a: 'It helps less on image-heavy files, since the size there comes from embedded images rather than structure — resizing the source images first gives a bigger win for those.' },
    ],
  },
  {
    slug: 'image-to-pdf-converter',
    path: '/image-to-pdf-converter',
    toolPath: '/image-to-pdf',
    toolLabel: 'Open Image to PDF',
    h1: 'Image to PDF Converter — Combine JPGs and PNGs Into One PDF',
    metaTitle: 'Image to PDF Converter Online Free — JPG/PNG to PDF',
    metaDescription: 'Combine JPG or PNG images into a single PDF file, free, entirely in your browser. No upload, no account.',
    intro: 'Turn a folder of scanned pages or photos into a single shareable PDF, in the order you choose, without uploading anything.',
    bullets: [
      'Supports JPG and PNG input',
      'Combine any number of images into one PDF',
      'Runs entirely client-side — images never leave your device',
    ],
    steps: [
      'Select or drop the images you want to include',
      'Reorder them into the sequence you want in the PDF',
      'Click convert and download the resulting PDF',
    ],
    faqs: [
      { q: 'Can I mix JPG and PNG in the same PDF?', a: 'Yes, you can combine both formats into a single output PDF.' },
      { q: 'Does each image become its own page?', a: 'Yes, each image is placed on its own page in the order you set.' },
    ],
  },
  {
    slug: 'password-protect-pdf-online',
    path: '/password-protect-pdf-online',
    toolPath: '/protect',
    toolLabel: 'Open Protect PDF',
    h1: 'Password Protect a PDF Online — Free, No Upload',
    metaTitle: 'Password Protect PDF Online Free — Encrypt a PDF File',
    metaDescription: 'Add or remove a password on a PDF file for free, processed entirely in your browser. No upload of your document to any server.',
    intro: 'Add a password so a PDF can\'t be opened without it — or remove one you already know — without ever sending the file to a server.',
    bullets: [
      'Add or remove a password in the same tool',
      'Encryption happens locally in your browser',
      'No account, no file retained anywhere after you close the tab',
    ],
    steps: [
      'Select your PDF and choose add-password or remove-password mode',
      'Enter the password',
      'Download the resulting file',
    ],
    faqs: [
      { q: 'What happens if I forget the password I set?', a: 'There is no recovery mechanism — the encryption is real, so losing the password means losing access to the file.' },
      { q: 'Does this also redact content?', a: 'No, a password only restricts opening the file. Use Redact PDF separately to black out specific sensitive regions before sharing.' },
    ],
  },
  {
    slug: 'free-qr-code-generator',
    path: '/free-qr-code-generator',
    toolPath: '/qr-generator',
    toolLabel: 'Open the QR Code Generator',
    h1: 'Free QR Code Generator — No Expiry, No Account',
    metaTitle: 'Free QR Code Generator Online — Static QR Codes, No Expiry',
    metaDescription: 'Generate a static QR code for any text or URL, free, with no expiry and no account required. Download as an image instantly.',
    intro: 'This generates a static QR code — your content is encoded directly into the pattern, so it works forever with no dependency on a redirect service that could go offline.',
    bullets: [
      'No expiry — static codes never stop working',
      'No account, no scan tracking, no ongoing dependency',
      'Works for any text or URL',
    ],
    steps: [
      'Type or paste the text or URL you want to encode',
      'Preview the QR code',
      'Download it as an image',
    ],
    faqs: [
      { q: 'Do these QR codes expire?', a: 'No, static QR codes encode your content directly and have no expiry date.' },
      { q: 'Can I generate one for a contact card?', a: 'Yes, use the vCard QR Code Generator for contact-card QR codes specifically.' },
    ],
  },
  {
    slug: 'online-json-formatter',
    path: '/online-json-formatter',
    toolPath: '/json-formatter',
    toolLabel: 'Open the JSON Formatter',
    h1: 'Online JSON Formatter — Format, Validate, and Minify',
    metaTitle: 'Online JSON Formatter & Validator — Free, No Upload',
    metaDescription: 'Format, validate, and minify JSON for free, entirely in your browser. Paste your JSON and get readable, indented output instantly.',
    intro: 'Paste minified or malformed JSON and get a readable, indented version — or go the other way and minify it — with validation errors pointing at exactly what\'s wrong.',
    bullets: [
      'Format, validate, and minify in one tool',
      'Clear error messages when the JSON is invalid',
      'Nothing you paste is sent anywhere',
    ],
    steps: [
      'Paste your JSON into the input',
      'Choose format or minify',
      'Copy or download the result',
    ],
    faqs: [
      { q: 'Is it safe to paste API responses with real data here?', a: 'Yes, everything runs locally in your browser with no network calls, so pasted data is never transmitted.' },
      { q: 'What happens if my JSON is invalid?', a: 'The tool reports a validation error so you can locate and fix the problem before using the file elsewhere.' },
    ],
  },
  {
    slug: 'strong-password-generator',
    path: '/strong-password-generator',
    toolPath: '/password-tool',
    toolLabel: 'Open the Password Generator',
    h1: 'Strong Password Generator — Free, Cryptographically Random',
    metaTitle: 'Strong Password Generator Online Free — Random & Secure',
    metaDescription: 'Generate strong, random passwords using your browser\'s cryptographic random number generator, plus a strength checker. Free, no account.',
    intro: 'Generates passwords using `crypto.getRandomValues`, a cryptographically secure random source, not a predictable pseudo-random generator.',
    bullets: [
      'Cryptographically secure randomness, not Math.random',
      'Customize length and character sets',
      'Includes a strength checker for a password you already have',
    ],
    steps: [
      'Choose length and which character types to include',
      'Generate a password',
      'Copy it, or check the strength of your own',
    ],
    faqs: [
      { q: 'Are these passwords actually random?', a: 'Yes, generated with the Web Crypto API\'s getRandomValues, a cryptographically secure source suitable for real passwords.' },
      { q: 'Should I use a passphrase instead?', a: 'A multi-word passphrase can be easier to type and remember — see the Passphrase Generator for that alternative.' },
    ],
  },
  {
    slug: 'online-unit-converter',
    path: '/online-unit-converter',
    toolPath: '/unit-converter',
    toolLabel: 'Open the Unit Converter',
    h1: 'Online Unit Converter — Length, Weight, Temperature, Data',
    metaTitle: 'Online Unit Converter Free — Length, Weight, Temperature & Data',
    metaDescription: 'Convert between length, weight, temperature, and data units for free, instantly, in your browser.',
    intro: 'Covers the common conversion categories — length, weight, temperature, and digital storage — with results updating instantly as you type.',
    bullets: [
      'Length, weight, temperature, and data units',
      'Temperature handled correctly (not a simple linear factor)',
      'Instant results, no page reload',
    ],
    steps: [
      'Pick a category (length, weight, temperature, data)',
      'Enter a value in one unit',
      'Read the converted value in any other unit in that category',
    ],
    faqs: [
      { q: 'Why does temperature need special handling?', a: 'Unlike length or weight, temperature scales (Celsius, Fahrenheit, Kelvin) don\'t share a common zero point, so conversion needs an offset, not just a multiplier.' },
    ],
  },
  {
    slug: 'markdown-previewer-online',
    path: '/markdown-previewer-online',
    toolPath: '/markdown-preview',
    toolLabel: 'Open the Markdown Previewer',
    h1: 'Markdown Previewer — Live HTML Preview, Free',
    metaTitle: 'Online Markdown Previewer — Live Preview, Free, No Upload',
    metaDescription: 'Preview Markdown rendered as HTML live as you type, free, entirely in your browser. Supports headers, bold/italic, links, and lists.',
    intro: 'See exactly how your Markdown will render before pasting it into a README, a comment, or documentation — updated live as you type.',
    bullets: [
      'Live preview, no manual refresh',
      'Supports headers, bold/italic, links, inline code, and lists',
      'Nothing you type is uploaded anywhere',
    ],
    steps: [
      'Type or paste Markdown into the editor',
      'Watch the rendered HTML update on the right',
      'Copy the content wherever you need it',
    ],
    faqs: [
      { q: 'Does it support tables?', a: 'No, this is a deliberately small subset of Markdown (headers, bold/italic, links, inline code, flat lists) — no tables or nested lists.' },
    ],
  },
  {
    slug: 'free-invoice-generator',
    path: '/free-invoice-generator',
    toolPath: '/invoice-generator',
    toolLabel: 'Open the Invoice Generator',
    h1: 'Free Invoice Generator — Create a PDF Invoice Online',
    metaTitle: 'Free Invoice Generator Online — Create a PDF Invoice',
    metaDescription: 'Create a simple invoice as a downloadable PDF, free, from a form, entirely in your browser. No account, no logo required.',
    intro: 'Fill in a simple form — your details, the client\'s, line items, and totals — and get a clean PDF invoice, with no account and no data sent to a server.',
    bullets: [
      'No account or template subscription needed',
      'Generates a real, downloadable PDF',
      'Nothing you type is uploaded anywhere',
    ],
    steps: [
      'Fill in your business details and the client\'s',
      'Add line items with quantity and price',
      'Generate and download the PDF invoice',
    ],
    faqs: [
      { q: 'Can I add my own logo?', a: 'The generator focuses on a clean text-based invoice layout without image/logo upload in this version.' },
      { q: 'Is invoice data saved anywhere?', a: 'No, the form data exists only in your browser tab while you fill it in and is discarded once you close or refresh the page.' },
    ],
  },
]
