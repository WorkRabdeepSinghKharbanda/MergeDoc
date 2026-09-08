import { Link } from 'react-router-dom'
import { TOOL_LANDINGS } from '../lib/toolLandings'

/** Next 3 landing-page guides after the current one, wrapping around. */
export default function RelatedGuides({ currentSlug }: { currentSlug: string }) {
  const index = TOOL_LANDINGS.findIndex((l) => l.slug === currentSlug)
  if (index === -1) return null

  const related = Array.from({ length: 3 }, (_, i) => TOOL_LANDINGS[(index + i + 1) % TOOL_LANDINGS.length])

  return (
    <section className="mx-auto max-w-3xl px-6 pb-16">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Related guides</h2>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {related.map((landing) => (
          <Link
            key={landing.slug}
            to={landing.path}
            className="group rounded-2xl border border-slate-200 p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 dark:border-slate-800 dark:hover:border-indigo-700 dark:hover:shadow-indigo-950"
          >
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
              {landing.h1}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  )
}
