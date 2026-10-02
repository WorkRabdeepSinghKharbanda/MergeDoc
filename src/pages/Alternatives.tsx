import Breadcrumbs from '../components/Breadcrumbs'
import LinkCards from '../components/LinkCards'
import { useDocumentMeta, useJsonLd, SITE_URL } from '../lib/useDocumentMeta'
import { ALTERNATIVES } from '../lib/alternatives'
import { toolByPath } from '../lib/links'

export default function Alternatives() {
  useDocumentMeta(
    'Free Online Tool Alternatives — MergeDoc',
    'Looking for a private, no-upload alternative to iLovePDF, Smallpdf, Diffchecker or TinyPNG? Compare them with MergeDoc’s free browser tools.',
  )
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: ALTERNATIVES.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: SITE_URL + a.path,
      name: `${a.competitor} alternative`,
    })),
  })

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-16">
      <Breadcrumbs items={[{ name: 'Home', to: '/' }, { name: 'Alternatives' }]} />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Alternatives to popular online tools</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
        MergeDoc runs every tool in your browser: no uploads, no sign-up, no watermarks. These honest side-by-side comparisons show where that fits, and where the other tool is still the better choice.
      </p>
      <LinkCards
        className="mt-10"
        heading="All comparisons"
        items={ALTERNATIVES.map((a) => ({
          to: a.path,
          title: `${a.competitor} alternative`,
          note: `Replaces it with: ${toolByPath(a.toolPath)?.title ?? a.toolLabel}`,
        }))}
      />
    </div>
  )
}
