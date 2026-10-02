import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const SITE_URL = 'https://mergedoc.vercel.app'

export type MetaOptions = {
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

export type HeadData = {
  title: string
  description: string
  canonical: string
  type: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  jsonld: object[]
}

// Server-side collector: effects don't run during renderToString, so hooks push into this
// synchronously while rendering and the prerender script reads it back via takeHead().
let collected: HeadData | null = null
const isServer = typeof document === 'undefined'

export function resetHead() {
  collected = { title: '', description: '', canonical: '', type: 'website', jsonld: [] }
}

export function takeHead(): HeadData {
  return collected ?? { title: '', description: '', canonical: '', type: 'website', jsonld: [] }
}

function setMeta(kind: 'name' | 'property', key: string, value: string) {
  const selector = `meta[${kind}="${key}"]`
  let tag = document.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(kind, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', value)
}

function removeMeta(kind: 'name' | 'property', key: string) {
  document.querySelector(`meta[${kind}="${key}"]`)?.remove()
}

/** Sets per-page title, description, canonical URL, and OG/Twitter tags (client effect + SSR collector). */
export function useDocumentMeta(title: string, description: string, opts: MetaOptions = {}) {
  const { pathname } = useLocation()
  const canonicalUrl = SITE_URL + (pathname === '/' ? '' : pathname.replace(/\/$/, ''))
  const type = opts.type ?? 'website'
  const { publishedTime, modifiedTime } = opts

  if (isServer && collected) {
    collected.title = title
    collected.description = description
    collected.canonical = canonicalUrl
    collected.type = type
    collected.publishedTime = publishedTime
    collected.modifiedTime = modifiedTime
  }

  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:type', type)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    if (publishedTime) setMeta('property', 'article:published_time', publishedTime)
    else removeMeta('property', 'article:published_time')
    if (modifiedTime) setMeta('property', 'article:modified_time', modifiedTime)
    else removeMeta('property', 'article:modified_time')
  }, [title, description, canonicalUrl, type, publishedTime, modifiedTime])
}

/** Injects a per-page JSON-LD `<script>` block, removed on unmount/navigation. Also feeds the SSR collector. */
export function useJsonLd(data: object) {
  const json = JSON.stringify(data)

  if (isServer && collected) collected.jsonld.push(data)

  useEffect(() => {
    // Drop the prerendered copies (marked data-ssr) once the client takes over, so they don't double up.
    document.querySelectorAll('script[type="application/ld+json"][data-ssr]').forEach((el) => el.remove())
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = json
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [json])
}
