import { useEffect } from 'react'

const SITE_URL = 'https://mergedoc.vercel.app'

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

/** Sets per-page title, description, canonical URL, and OG/Twitter title+description+url. */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)

    const canonicalUrl = SITE_URL + window.location.pathname
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
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
  }, [title, description])
}
