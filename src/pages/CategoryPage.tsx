import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import ToolCard from '../components/ToolCard'
import { useDocumentMeta, useJsonLd } from '../lib/useDocumentMeta'
import { toolsForCategory, type Category } from '../lib/categories'

function Icon({ path }: { path: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={path} />
    </svg>
  )
}

export default function CategoryPage({ category }: { category: Category }) {
  useDocumentMeta(category.metaTitle, category.metaDescription)
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: category.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  })

  const tools = toolsForCategory(category)

  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pb-10 pt-16 text-center">
        <nav className="mb-4 text-sm text-slate-400 dark:text-slate-500">
          <Link to="/" className="hover:text-slate-600 dark:hover:text-slate-300">Home</Link>
          <span className="mx-2">/</span>
          <span>{category.title}</span>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{category.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">{category.intro}</p>
      </section>

      <AdSlot variant="banner" />

      <section className="mx-auto max-w-5xl px-6 pb-16 pt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.to} to={tool.to} title={tool.title} description={tool.description} icon={<Icon path={tool.icon} />} />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-16 dark:border-slate-900 dark:bg-slate-900">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Frequently asked questions</h2>
          <dl className="mt-6 space-y-6">
            {category.faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-medium text-slate-900 dark:text-white">{f.q}</dt>
                <dd className="mt-1 text-slate-500 dark:text-slate-400">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  )
}
