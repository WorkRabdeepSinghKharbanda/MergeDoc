import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import { SITE_URL, useDocumentMeta, useJsonLd } from '../lib/useDocumentMeta'
import { BLOG_POSTS } from '../lib/blog'
import { CATEGORIES } from '../lib/categories'
import { formatDate, postsForCategory } from '../lib/links'

export default function Blog() {
  useDocumentMeta(
    'Blog: PDF, Privacy & Developer Guides | MergeDoc',
    'Practical guides on PDFs, file privacy, encryption, images, developer tools and everyday calculators from the team behind MergeDoc.',
  )
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: BLOG_POSTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/blog/${p.slug}`, name: p.title })),
  })

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-16">
      <Breadcrumbs items={[{ name: 'Home', to: '/' }, { name: 'Blog' }]} />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Blog</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">Guides on PDFs, file privacy, developer tools and the free tools on this site.</p>
      <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
        Looking for a swap? See <Link to="/alternatives" className="text-indigo-600 hover:underline dark:text-indigo-400">tool alternatives</Link>.
      </p>

      {CATEGORIES.map((cat) => {
        const posts = postsForCategory(cat.slug)
        if (posts.length === 0) return null
        return (
          <section key={cat.slug} className="mt-12">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              <Link to={cat.path} className="hover:text-indigo-600 dark:hover:text-indigo-400">{cat.title}</Link>
            </h2>
            <div className="mt-4 space-y-6">
              {posts.map((post) => (
                <article key={post.slug} className="border-b border-slate-100 pb-6 dark:border-slate-900">
                  <time dateTime={post.date} className="text-sm text-slate-400 dark:text-slate-500">{formatDate(post.date)}</time>
                  <h3 className="mt-1 text-lg font-semibold">
                    <Link to={`/blog/${post.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">{post.title}</Link>
                  </h3>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">{post.description}</p>
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
