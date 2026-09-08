import { Link, Navigate, useParams } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import { useDocumentMeta, useJsonLd } from '../lib/useDocumentMeta'
import { getPostBySlug } from '../lib/blog'
import { markdownToHtml } from '../lib/markdown'

const SITE_URL = 'https://mergedoc.vercel.app'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  useDocumentMeta(post ? `${post.title} — MergeDoc Blog` : 'Blog — MergeDoc', post?.description ?? '')
  useJsonLd(
    post
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { '@type': 'Organization', name: 'MergeDoc' },
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        }
      : { '@context': 'https://schema.org', '@type': 'Article' },
  )

  if (!post) return <Navigate to="/blog" replace />

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-16">
      <nav className="mb-6 text-sm text-slate-400 dark:text-slate-500">
        <Link to="/blog" className="hover:text-slate-600 dark:hover:text-slate-300">Blog</Link>
        <span className="mx-2">/</span>
        <span>{post.title}</span>
      </nav>
      <time className="text-sm text-slate-400 dark:text-slate-500">
        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </time>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{post.title}</h1>
      <div
        className="markdown-preview mt-8 text-slate-600 dark:text-slate-300"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
      />

      <AdSlot variant="banner" />
    </article>
  )
}
