import { Link } from 'react-router-dom'

export type LinkCard = { to: string; title: string; note?: string }

/** Small titled grid of internal links — the shared building block for guides / alternatives / related tools. */
export default function LinkCards({ heading, items, className = '' }: { heading: string; items: LinkCard[]; className?: string }) {
  if (items.length === 0) return null
  return (
    <section className={className}>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{heading}</h2>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            className="group rounded-2xl border border-slate-200 p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 dark:border-slate-800 dark:hover:border-indigo-700 dark:hover:shadow-indigo-950"
          >
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">{it.title}</h3>
            {it.note && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{it.note}</p>}
          </Link>
        ))}
      </div>
    </section>
  )
}
