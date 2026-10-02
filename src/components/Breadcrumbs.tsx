import { Link } from 'react-router-dom'
import { SITE_URL, useJsonLd } from '../lib/useDocumentMeta'

export type Crumb = { name: string; to?: string }

/** Visible breadcrumb trail + BreadcrumbList JSON-LD. Last crumb is the current page (no link). */
export default function Breadcrumbs({ items, className = 'mb-4' }: { items: Crumb[]; className?: string }) {
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.to ? { item: SITE_URL + (c.to === '/' ? '' : c.to) } : {}),
    })),
  })

  return (
    <nav aria-label="Breadcrumb" className={`${className} text-sm text-slate-400 dark:text-slate-500`}>
      {items.map((c, i) => (
        <span key={c.name}>
          {i > 0 && <span className="mx-2">/</span>}
          {c.to ? <Link to={c.to} className="hover:text-slate-600 dark:hover:text-slate-300">{c.name}</Link> : <span>{c.name}</span>}
        </span>
      ))}
    </nav>
  )
}
