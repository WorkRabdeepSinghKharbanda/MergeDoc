import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import ToolCard from '../components/ToolCard'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { PDF_TOOLS, OTHER_TOOLS } from '../lib/tools'

function Icon({ path }: { path: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={path} />
    </svg>
  )
}

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
