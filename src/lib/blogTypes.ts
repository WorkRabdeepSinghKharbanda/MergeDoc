export type BlogPost = {
  slug: string
  title: string
  description: string
  /** ISO publish date (YYYY-MM-DD) */
  date: string
  /** ISO last-updated date (YYYY-MM-DD) */
  updated: string
  /** A Category.slug from categories.ts (e.g. 'pdf-tools', 'text-writing-tools') */
  category: string
  keywords: string[]
  /** Tool routes from tools.ts this post is about (e.g. '/merge') */
  relatedTools: string[]
  faqs: { q: string; a: string }[]
  /** Markdown subset body; the FAQ is rendered separately from `faqs`, do not repeat it here */
  content: string
}
