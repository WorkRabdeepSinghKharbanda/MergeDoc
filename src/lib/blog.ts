import type { BlogPost } from './blogTypes'
import { EXPANDED_POSTS_1 } from './posts/expanded-1'
import { EXPANDED_POSTS_2 } from './posts/expanded-2'
import { NEW_POSTS } from './posts/new'

export type { BlogPost }

/** All posts, newest publish date first (stable within a date). Add a post by adding it to a file in posts/. */
export const BLOG_POSTS: BlogPost[] = [...EXPANDED_POSTS_1, ...EXPANDED_POSTS_2, ...NEW_POSTS].sort((a, b) =>
  b.date.localeCompare(a.date),
)

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
