import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import Breadcrumbs from '../components/Breadcrumbs'
import LinkCards from '../components/LinkCards'
import Prose from '../components/Prose'
import { useDocumentMeta, useJsonLd } from '../lib/useDocumentMeta'
import { getPostBySlug } from '../lib/blog'
import { toolByPath } from '../lib/links'
import { ALTERNATIVES } from '../lib/alternatives'
import type { Alternative } from '../lib/alternativeTypes'

export default function AlternativePage({ alt }: { alt: Alternative }) {
  useDocumentMeta(alt.metaTitle, alt.metaDescription)
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: alt.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  })

  const tools = [alt.toolPath, ...alt.extraToolPaths].flatMap((p) => {
    const t = toolByPath(p)
    return t ? [{ to: t.to, title: t.title, note: t.description }] : []
  })
  const posts = alt.relatedPosts.flatMap((s) => {
    const p = getPostBySlug(s)
    return p ? [{ to: `/blog/${p.slug}`, title: p.title, note: p.description }] : []
  })
  const others = ALTERNATIVES.filter((a) => a.slug !== alt.slug).map((a) => ({ to: a.path, title: `${a.competitor} alternative` }))

  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pb-8 pt-16">
        <Breadcrumbs items={[{ name: 'Home', to: '/' }, { name: 'Alternatives', to: '/alternatives' }, { name: `${alt.competitor} alternative` }]} />
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{alt.h1}</h1>
        <div className="mt-5 space-y-4 text-lg text-slate-500 dark:text-slate-400">
          {alt.intro.split('\n\n').map((p) => <Prose key={p} markdown={p} />)}
        </div>
        <Link to={alt.toolPath} className="mt-8 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
          {alt.toolLabel}
        </Link>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-10">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Why people look for a {alt.competitor} alternative</h2>
        <div className="mt-5 space-y-5">
          {alt.whySearch.map((w) => (
            <div key={w.title}>
              <h3 className="font-medium text-slate-900 dark:text-white">{w.title}</h3>
              <Prose className="mt-1 text-slate-600 dark:text-slate-300" markdown={w.body} />
            </div>
          ))}
        </div>
      </section>

      <AdSlot variant="banner" />

      <section className="mx-auto max-w-4xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{alt.competitor} vs MergeDoc, side by side</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-900 dark:border-slate-800 dark:text-white">
                <th className="py-2 pr-4 font-semibold">&nbsp;</th>
                <th className="py-2 pr-4 font-semibold">{alt.competitor}</th>
                <th className="py-2 font-semibold">MergeDoc</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-300">
              {alt.comparison.map((r) => (
                <tr key={r.aspect} className="border-b border-slate-100 align-top dark:border-slate-900">
                  <th scope="row" className="py-3 pr-4 font-medium text-slate-900 dark:text-white">{r.aspect}</th>
                  <td className="py-3 pr-4">{r.them}</td>
                  <td className="py-3">{r.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-10">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">When {alt.competitor} is still the better pick</h2>
        <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
          {alt.stillBetter.map((s) => (
            <li key={s} className="flex gap-2"><span className="text-indigo-500">&#8226;</span><span>{s}</span></li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-10">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">How to switch in a few steps</h2>
        <ol className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
          {alt.switchSteps.map((s, i) => (
            <li key={s} className="flex gap-2"><span className="font-semibold text-indigo-500">{i + 1}.</span><Prose markdown={s} /></li>
          ))}
        </ol>
      </section>

      <div className="mx-auto max-w-3xl px-6 pb-12">
        <LinkCards heading="Tools covered" items={tools} />
        <LinkCards className="mt-10" heading="Read next" items={posts} />
        <LinkCards className="mt-10" heading="Other alternatives" items={others} />
      </div>

      <section className="border-t border-slate-100 bg-slate-50 py-16 dark:border-slate-900 dark:bg-slate-900">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Frequently asked questions</h2>
          <dl className="mt-6 space-y-6">
            {alt.faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-medium text-slate-900 dark:text-white">{f.q}</dt>
                <dd className="mt-1 text-slate-500 dark:text-slate-400">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-xs text-slate-400 dark:text-slate-500">
            {alt.competitor} is a trademark of its owner and is named here only for comparison. MergeDoc is not affiliated with or endorsed by {alt.competitor}. Check their current terms for the latest details.
          </p>
        </div>
      </section>
      <AdSlot variant="banner" />
    </div>
  )
}
