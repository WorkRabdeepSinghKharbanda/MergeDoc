import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { BLOG_POSTS } from '../lib/blog'

export default function Blog() {
  useDocumentMeta(
    'Blog — MergeDoc',
    'Guides on PDF editing, file privacy, encryption, and QR codes from the team behind MergeDoc\'s client-side tools.',
  )

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-16">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Blog</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">
        Guides on PDFs, file privacy, and the tools on this site.
      </p>

      <div className="mt-10 space-y-8">
        {BLOG_POSTS.map((post) => (
          <article key={post.slug} className="border-b border-slate-100 pb-8 dark:border-slate-900">
            <time className="text-sm text-slate-400 dark:text-slate-500">
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <h2 className="mt-1 text-xl font-semibold">
              <Link to={`/blog/${post.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">{post.description}</p>
            <Link to={`/blog/${post.slug}`} className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
              Read more &rarr;
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
