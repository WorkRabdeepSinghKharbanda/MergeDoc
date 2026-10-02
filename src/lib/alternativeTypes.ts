export type Alternative = {
  /** e.g. 'ilovepdf-alternative' */
  slug: string
  /** e.g. '/alternatives/ilovepdf-alternative' */
  path: string
  /** Display name of the competitor, e.g. 'iLovePDF' */
  competitor: string
  /** Our matching primary tool route and CTA label */
  toolPath: string
  toolLabel: string
  /** Other tool routes of ours that cover the competitor's feature set */
  extraToolPaths: string[]
  h1: string
  metaTitle: string
  metaDescription: string
  /** 1-3 paragraphs, separated by a blank line (\n\n), plain text */
  intro: string
  /** Why people search for an alternative (privacy, offline, limits, sign-up...) */
  whySearch: { title: string; body: string }[]
  /** Side-by-side rows */
  comparison: { aspect: string; them: string; us: string }[]
  /** Honest cases where the competitor is the better pick */
  stillBetter: string[]
  /** Numbered steps to switch / do the same job with us */
  switchSteps: string[]
  faqs: { q: string; a: string }[]
  /** Blog post slugs to link to */
  relatedPosts: string[]
}
