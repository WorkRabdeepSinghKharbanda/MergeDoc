import { Link, Navigate, useParams } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import Breadcrumbs from '../components/Breadcrumbs'
import LinkCards from '../components/LinkCards'
import Prose from '../components/Prose'
import RelatedPosts from '../components/RelatedPosts'
import { SITE_URL, useDocumentMeta, useJsonLd } from '../lib/useDocumentMeta'
import { getPostBySlug, type BlogPost as Post } from '../lib/blog'
import { alternativesForTool, categoryBySlug, formatDate, toolByPath } from '../lib/links'

const wordCount = (s: string) => s.trim().split(/\s+/).length

function PostView({ post }: { post: Post }) {
  const url = `${SITE_URL}/blog/${post.slug}`
  const category = categoryBySlug(post.category)

  useDocumentMeta(`${post.title} | MergeDoc`, post.description, {
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated,
  })
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}/og-image.png`,
    datePublished: post.date,
    dateModified: post.updated,
    keywords: post.keywords.join(', '),
    wordCount: wordCount(post.content),
    author: { '@type': 'Organization', name: 'MergeDoc', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'MergeDoc', logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  })
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  })

  const tools = post.relatedTools.flatMap((p) => {
    const t = toolByPath(p)
    return t ? [{ to: t.to, title: t.title, note: t.description }] : []
  })
  const alts = [...new Map(post.relatedTools.flatMap(alternativesForTool).map((a) => [a.slug, a])).values()].map((a) => ({
    to: a.path,
    title: `${a.competitor} alternative`,
  }))

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-16">
      <Breadcrumbs
        className="mb-6"
        items={[
          { name: 'Home', to: '/' },
          { name: 'Blog', to: '/blog' },
          ...(category ? [{ name: category.title, to: category.path }] : []),
          { name: post.title },
        ]}
      />
      <time dateTime={post.date} className="text-sm text-slate-400 dark:text-slate-500">
        {formatDate(post.date)}
        {post.updated !== post.date && <> · Updated {formatDate(post.updated)}</>}
      </time>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{post.title}</h1>
      <Prose className="mt-8 text-slate-600 dark:text-slate-300" markdown={post.content} />

      <AdSlot variant="banner" />

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Frequently asked questions</h2>
        <dl className="mt-6 space-y-6">
          {post.faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-medium text-slate-900 dark:text-white">{f.q}</dt>
              <dd className="mt-1 text-slate-500 dark:text-slate-400">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <LinkCards className="mt-12" heading="Tools mentioned" items={tools} />
      <LinkCards className="mt-10" heading="Compare alternatives" items={alts} />
      {category && (
        <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
          More in <Link to={category.path} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">{category.title}</Link>
        </p>
      )}

      <RelatedPosts currentSlug={post.slug} />
    </article>
  )
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined
  return post ? <PostView post={post} /> : <Navigate to="/blog" replace />
}
