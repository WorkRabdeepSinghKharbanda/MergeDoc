import { useLocation } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import LinkCards from './LinkCards'
import {
  alternativesForTool,
  categoryForTool,
  landingsForTool,
  postsForTool,
  toolByPath,
} from '../lib/links'

/** Rendered by Layout under every page; only shows on tool routes (breadcrumb + guides + alternatives + sibling tools). */
export default function RelatedForRoute() {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/$/, '') || '/'
  const tool = toolByPath(path)
  const category = tool ? categoryForTool(path) : undefined
  if (!tool || !category) return null

  const guides = [
    ...landingsForTool(path).map((l) => ({ to: l.path, title: l.h1, note: 'Quick guide' })),
    ...postsForTool(path).map((p) => ({ to: `/blog/${p.slug}`, title: p.title, note: p.description })),
    ...alternativesForTool(path).map((a) => ({ to: a.path, title: `${a.competitor} alternative`, note: 'Compare' })),
  ]
  const siblings = category.routes
    .filter((r) => r !== path)
    .slice(0, 6)
    .flatMap((r) => {
      const t = toolByPath(r)
      return t ? [{ to: t.to, title: t.title, note: t.description }] : []
    })

  return (
    <aside className="mx-auto max-w-5xl px-6 pb-16 pt-4">
      <Breadcrumbs
        className="mb-8"
        items={[{ name: 'Home', to: '/' }, { name: category.title, to: category.path }, { name: tool.title }]}
      />
      <LinkCards heading="Guides, articles & comparisons" items={guides} />
      <LinkCards className="mt-10" heading={`More in ${category.title}`} items={siblings} />
    </aside>
  )
}
