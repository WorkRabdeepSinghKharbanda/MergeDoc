import { Link } from 'react-router-dom'
import { BLOG_POSTS } from '../lib/blog'

/** Next 3 posts after the current one, wrapping around — more pageviews per session. */
export default function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const index = BLOG_POSTS.findIndex((p) => p.slug === currentSlug)
  if (index === -1) return null

  const related = Array.from({ length: 3 }, (_, i) => BLOG_POSTS[(index + i + 1) % BLOG_POSTS.length])

  return (
    <section className="mt-16 border-t border-slate-100 pt-10 dark:border-slate-900">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Related posts</h2>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group rounded-2xl border border-slate-200 p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 dark:border-slate-800 dark:hover:border-indigo-700 dark:hover:shadow-indigo-950"
          >
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
              {post.title}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{post.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
