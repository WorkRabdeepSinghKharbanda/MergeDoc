import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import RelatedGuides from '../components/RelatedGuides'
import { useDocumentMeta, useJsonLd } from '../lib/useDocumentMeta'
import type { ToolLanding } from '../lib/toolLandings'

export default function ToolLandingPage({ landing }: { landing: ToolLanding }) {
  useDocumentMeta(landing.metaTitle, landing.metaDescription)
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: landing.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  })

  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-16 text-center">
        <nav className="mb-4 text-sm text-slate-400 dark:text-slate-500">
          <Link to="/" className="hover:text-slate-600 dark:hover:text-slate-300">Home</Link>
          <span className="mx-2">/</span>
          <span>{landing.h1}</span>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{landing.h1}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">{landing.intro}</p>
        <Link
          to={landing.toolPath}
          className="mt-8 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          {landing.toolLabel}
        </Link>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Why use this</h2>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
              {landing.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-indigo-500">&#8226;</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">How it works</h2>
            <ol className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
              {landing.steps.map((s, i) => (
                <li key={s} className="flex gap-2">
                  <span className="font-semibold text-indigo-500">{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <RelatedGuides currentSlug={landing.slug} />

      <AdSlot variant="banner" />

      <section className="border-t border-slate-100 bg-slate-50 py-16 dark:border-slate-900 dark:bg-slate-900">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Frequently asked questions</h2>
          <dl className="mt-6 space-y-6">
            {landing.faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-medium text-slate-900 dark:text-white">{f.q}</dt>
                <dd className="mt-1 text-slate-500 dark:text-slate-400">{f.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 text-center">
            <Link to={landing.toolPath} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
              {landing.toolLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
