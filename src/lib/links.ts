import { PDF_TOOLS, OTHER_TOOLS, type Tool } from './tools'
import { CATEGORIES, type Category } from './categories'
import { TOOL_LANDINGS } from './toolLandings'
import { ALTERNATIVES } from './alternatives'
import { BLOG_POSTS } from './blog'

/** Cross-reference helpers behind the hub-and-spoke internal linking (category → tool → landing/alternative/post). */
export const ALL_TOOLS: Tool[] = [...PDF_TOOLS, ...OTHER_TOOLS]

export const toolByPath = (path: string) => ALL_TOOLS.find((t) => t.to === path)
export const categoryForTool = (path: string) => CATEGORIES.find((c) => c.routes.includes(path))
export const categoryBySlug = (slug: string): Category | undefined => CATEGORIES.find((c) => c.slug === slug)
export const postsForTool = (path: string) => BLOG_POSTS.filter((p) => p.relatedTools.includes(path))
export const postsForCategory = (slug: string) => BLOG_POSTS.filter((p) => p.category === slug)
export const landingsForTool = (path: string) => TOOL_LANDINGS.filter((l) => l.toolPath === path)
export const alternativesForTool = (path: string) =>
  ALTERNATIVES.filter((a) => a.toolPath === path || a.extraToolPaths.includes(path))
export const alternativesForCategory = (c: Category) => ALTERNATIVES.filter((a) => c.routes.includes(a.toolPath))

/** UTC so the prerendered date matches what a browser in any timezone hydrates with. */
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
