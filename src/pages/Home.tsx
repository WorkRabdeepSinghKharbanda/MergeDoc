import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import ToolCard from '../components/ToolCard'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const ICON_PATHS: Record<string, string> = {
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

function Icon({ path }: { path: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={path} />
    </svg>
  )
}

const PDF_TOOLS = [
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

const OTHER_TOOLS = [
  { to: '/image-compress', title: 'Image Compressor', description: 'Shrink a JPG or PNG’s file size.', icon: ICON_PATHS.imageCompress },
  { to: '/qr-generator', title: 'QR Code Generator', description: 'Turn any text or URL into a QR code.', icon: ICON_PATHS.qr },
  { to: '/word-counter', title: 'Word Counter', description: 'Count words, characters, sentences, and paragraphs.', icon: ICON_PATHS.wordCount },
  { to: '/type-master', title: 'Type Master', description: 'Test your typing speed and accuracy in words per minute.', icon: ICON_PATHS.typeMaster },
]

export default function Home() {
  useDocumentMeta(
    'MergeDoc — Free Online PDF Tools (Merge, Split, Compress, Rotate)',
    'Merge, split, compress, rotate, watermark, and password-protect PDFs free, entirely in your browser. No uploads, no accounts, no file size limits.',
  )

  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-24 text-center">
        <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
          100% client-side &mdash; files never leave your device
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          PDF tools that respect your privacy
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
          Merge, split, compress, rotate, watermark, protect, and convert PDFs directly in your
          browser. No uploads, no accounts, no waiting on a server.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/merge"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Merge PDFs now
          </Link>
        </div>
      </section>

      <AdSlot variant="banner" />

      <section id="tools" className="mx-auto max-w-5xl scroll-mt-20 px-6 pb-16">
        <h2 className="mb-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">PDF tools</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PDF_TOOLS.map((tool) => (
            <ToolCard key={tool.to} to={tool.to} title={tool.title} description={tool.description} icon={<Icon path={tool.icon} />} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Other tools</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OTHER_TOOLS.map((tool) => (
            <ToolCard key={tool.to} to={tool.to} title={tool.title} description={tool.description} icon={<Icon path={tool.icon} />} />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-16 dark:border-slate-900 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Why client-side?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
            Every tool on this site runs entirely in your browser using JavaScript PDF processing.
            Your documents are never uploaded anywhere, which means no privacy risk, no file size
            caps from a server, and it works even offline once the page has loaded.
          </p>
        </div>
      </section>

      <AdSlot variant="banner" />
    </div>
  )
}
