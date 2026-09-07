import { PDF_TOOLS, OTHER_TOOLS, type Tool } from './tools'

export type Category = {
  slug: string
  path: string
  title: string
  metaTitle: string
  metaDescription: string
  intro: string
  faqs: { q: string; a: string }[]
  routes: string[]
}

const ALL_TOOLS = [...PDF_TOOLS, ...OTHER_TOOLS]

export function toolsForCategory(category: Category): Tool[] {
  return category.routes
    .map((r) => ALL_TOOLS.find((t) => t.to === r))
    .filter((t): t is Tool => t !== undefined)
}

export const CATEGORIES: Category[] = [
  {
    slug: 'pdf-tools',
    path: '/pdf-tools',
    title: 'PDF Tools',
    metaTitle: 'Free Online PDF Tools — Merge, Split, Compress, Sign & More',
    metaDescription:
      'A full set of free, client-side PDF tools: merge, split, compress, rotate, watermark, protect, sign, fill forms, redact, and convert PDFs. No uploads, no accounts, no file size limits.',
    intro:
      'Every PDF tool below runs entirely in your browser — your files are processed on your device and never uploaded to a server. That means no privacy risk, no waiting on an upload, and no arbitrary file-size caps from a backend. Pick a tool to get started.',
    faqs: [
      { q: 'Are these PDF tools really free?', a: 'Yes, every tool is free with no usage limits, no sign-up, and no watermarks added to your files.' },
      { q: 'Do my PDFs get uploaded to a server?', a: 'No. All processing happens locally in your browser using JavaScript. Your files never leave your device.' },
      { q: 'Is there a file size limit?', a: 'There is no artificial limit imposed by us — the only ceiling is your own device\'s memory, since processing happens locally.' },
      { q: 'Do I need to create an account?', a: 'No account, no email, no login is required for any tool on this site.' },
    ],
    routes: [
      '/merge', '/split', '/compress', '/rotate', '/watermark', '/protect', '/metadata', '/reorder',
      '/pdf-to-image', '/image-to-pdf', '/compare-pdf', '/sign-pdf', '/fill-form', '/extract-text',
      '/crop-pdf', '/add-page-numbers', '/text-to-pdf', '/redact-pdf', '/split-pdf-pages', '/invoice-generator',
    ],
  },
  {
    slug: 'image-tools',
    path: '/image-tools',
    title: 'Image Tools',
    metaTitle: 'Free Online Image Tools — Compress, Resize, Convert & More',
    metaDescription:
      'Compress, resize, convert, and analyze images free in your browser: image compressor, resizer, format converter, favicon generator, color blindness simulator, and color palette extractor.',
    intro:
      'These image tools resize, compress, convert, and analyze images entirely on your device using the canvas API — nothing is uploaded anywhere.',
    faqs: [
      { q: 'What image formats are supported?', a: 'JPEG, PNG, and WebP are supported for compression, resizing, and format conversion.' },
      { q: 'Will image quality suffer?', a: 'Compression and format conversion involve a quality/size tradeoff you control — you can preview the result before downloading.' },
      { q: 'Do you store my images?', a: 'No. Images are processed in-memory in your browser tab and discarded when you close or refresh the page.' },
    ],
    routes: ['/image-compress', '/image-resize', '/image-converter', '/favicon-generator', '/color-blind-simulator', '/color-palette-extractor', '/color-tool', '/placeholder-image'],
  },
  {
    slug: 'text-writing-tools',
    path: '/text-tools',
    title: 'Text & Writing Tools',
    metaTitle: 'Free Online Text Tools — Word Counter, Diff Checker, Markdown & More',
    metaDescription:
      'Free text and writing tools: word counter, text diff checker, case converter, slug generator, readability checker, Markdown previewer, and word frequency analyzer.',
    intro:
      'Tools for writers and editors — count words, diff two texts, convert case, check readability, and preview Markdown, all processed locally as you type.',
    faqs: [
      { q: 'Is anything I type sent anywhere?', a: 'No. All text tools run client-side; nothing you type is transmitted or stored remotely.' },
      { q: 'Can I use these for large documents?', a: 'Yes, they run in your browser\'s memory so performance depends on your device, not a server queue.' },
    ],
    routes: [
      '/word-counter', '/type-master', '/case-converter', '/slug-generator', '/reading-time',
      '/word-frequency-analyzer', '/markdown-preview', '/markdown-table-generator', '/lorem-generator',
      '/text-sorter', '/text-diff',
    ],
  },
  {
    slug: 'developer-tools',
    path: '/developer-tools',
    title: 'Developer Tools',
    metaTitle: 'Free Online Developer Tools — JSON, Regex, Base64, CSS Generators & More',
    metaDescription:
      'Free developer tools that run entirely client-side: JSON formatter, regex tester, Base64/URL/HTML entity encoders, hash generator, UUID generator, CSS gradient/shadow/border-radius generators, and more.',
    intro:
      'Everyday developer utilities — formatters, encoders, generators, and testers — with no server round-trip, so sensitive strings and payloads never leave your machine.',
    faqs: [
      { q: 'Is it safe to paste API keys or secrets into these tools?', a: 'Processing happens entirely in your browser with no network calls, so nothing you paste is transmitted. Still, treat any tool as you would a local script when handling secrets.' },
      { q: 'Do these tools work offline?', a: 'Once the page is loaded, most tools continue to work without an internet connection since there is no backend dependency.' },
    ],
    routes: [
      '/json-formatter', '/csv-json-converter', '/base64-tool', '/url-encoder', '/html-entity-tool',
      '/hash-generator', '/uuid-generator', '/regex-tester', '/number-base-converter', '/subnet-calculator',
      '/barcode-generator', '/css-gradient-generator', '/css-box-shadow-generator', '/css-border-radius-generator',
      '/meta-tag-generator', '/unit-converter', '/timestamp-converter',
    ],
  },
  {
    slug: 'qr-code-tools',
    path: '/qr-code-tools',
    title: 'QR Code Tools',
    metaTitle: 'Free QR Code Generator & Scanner — Batch, vCard & More',
    metaDescription:
      'Generate QR codes for text, URLs, and contact cards, create batches of QR codes, or scan and decode a QR code from an image — all free and client-side.',
    intro:
      'Generate and scan QR codes without an account or usage cap. Everything from a single QR code to a batch of hundreds is created locally in your browser.',
    faqs: [
      { q: 'Do generated QR codes expire?', a: 'No. These are static QR codes encoded directly with your content, so they never expire and are not tracked by us.' },
      { q: 'Can I generate a QR code for contact details?', a: 'Yes, the vCard QR tool encodes name, phone, email, and more into a scannable contact card.' },
    ],
    routes: ['/qr-generator', '/qr-batch-generator', '/qr-scanner', '/vcard-qr'],
  },
  {
    slug: 'calculators',
    path: '/calculators',
    title: 'Calculators',
    metaTitle: 'Free Online Calculators — BMI, Loan, Tip, Age, GPA & More',
    metaDescription:
      'Free calculators for everyday math: BMI, percentage, tip, age, loan/EMI, discount, GPA, sales tax, and bill splitting — instant results, no sign-up.',
    intro:
      'Quick calculators for everyday numbers — health, finance, school, and splitting a bill — all computed instantly in your browser.',
    faqs: [
      { q: 'Are the calculations accurate?', a: 'Each calculator uses standard, well-documented formulas (e.g. amortization for loans, Flesch-style scoring for readability) — see each tool page for details.' },
    ],
    routes: [
      '/bmi-calculator', '/percentage-calculator', '/tip-calculator', '/age-calculator', '/loan-calculator',
      '/discount-calculator', '/gpa-calculator', '/sales-tax-calculator', '/bill-splitter',
    ],
  },
  {
    slug: 'security-privacy-tools',
    path: '/security-tools',
    title: 'Security & Privacy Tools',
    metaTitle: 'Free Online Security Tools — Password Generator, Text Encryptor & More',
    metaDescription:
      'Generate strong passwords and passphrases, check password strength, and encrypt or decrypt text with AES-256-GCM — all processed locally, nothing transmitted.',
    intro:
      'Security utilities that never send your passwords or plaintext anywhere — generation and encryption both happen locally using your browser\'s built-in Web Crypto API.',
    faqs: [
      { q: 'Are generated passwords random enough to be secure?', a: 'Yes, passwords are generated using `crypto.getRandomValues`, a cryptographically secure random source, not `Math.random`.' },
      { q: 'What encryption does the text encryptor use?', a: 'AES-256-GCM with a PBKDF2-derived key (100,000 iterations) from your passphrase — a standard, modern authenticated-encryption scheme.' },
    ],
    routes: ['/password-tool', '/passphrase-generator', '/text-encryptor'],
  },
  {
    slug: 'fun-productivity-tools',
    path: '/productivity-tools',
    title: 'Fun & Productivity Tools',
    metaTitle: 'Free Productivity Tools — Pomodoro Timer, Todo List, Countdown & More',
    metaDescription:
      'A pomodoro timer, todo list, scratchpad, countdown timer, decision wheel, dice roller, and more small tools to help you focus, decide, and get things done.',
    intro:
      'Small tools for staying focused, making quick decisions, and keeping track of tasks — several of these save your data locally so it is there next time you visit.',
    faqs: [
      { q: 'Does the todo list save between visits?', a: 'Yes, the todo list and scratchpad save to your browser\'s local storage, so your data persists on the same device and browser.' },
      { q: 'Is my todo list synced across devices?', a: 'No, data is stored only in your current browser\'s local storage — there is no account or cloud sync.' },
    ],
    routes: [
      '/pomodoro-timer', '/countdown-stopwatch', '/countdown-to-date', '/todo-list', '/scratchpad',
      '/decision-wheel', '/dice-roller', '/random-number-generator', '/team-generator', '/text-to-speech',
      '/number-to-words', '/roman-numeral-converter', '/morse-code-translator', '/ascii-art-generator',
    ],
  },
]
