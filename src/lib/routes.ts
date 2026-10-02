import { PDF_TOOLS, OTHER_TOOLS } from './tools'
import { CATEGORIES } from './categories'
import { TOOL_LANDINGS } from './toolLandings'
import { BLOG_POSTS } from './blog'
import { ALTERNATIVES } from './alternatives'

export type PrerenderRoute = { path: string; priority: number; lastmod?: string }

/** Every public, indexable route — the single list that drives prerendering and sitemap.xml. */
export function prerenderRoutes(): PrerenderRoute[] {
  return [
    { path: '/', priority: 1.0 },
    ...CATEGORIES.map((c) => ({ path: c.path, priority: 0.95 })),
    ...[...PDF_TOOLS, ...OTHER_TOOLS].map((t) => ({ path: t.to, priority: 0.8 })),
    ...TOOL_LANDINGS.map((l) => ({ path: l.path, priority: 0.7 })),
    { path: '/blog', priority: 0.8 },
    ...BLOG_POSTS.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6, lastmod: p.updated })),
    { path: '/alternatives', priority: 0.7 },
    ...ALTERNATIVES.map((a) => ({ path: a.path, priority: 0.65 })),
    { path: '/privacy-policy', priority: 0.2 },
  ]
}
