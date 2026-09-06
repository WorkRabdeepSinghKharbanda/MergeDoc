/**
 * PLACEHOLDER — replace with your real AdSense publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
 * before going live. Until then AdSlot renders its dashed placeholder instead of a real ad.
 */
export const ADSENSE_CLIENT_ID = 'ca-pub-5852027898822024'

const isConfigured = !ADSENSE_CLIENT_ID.includes('0000000000000000')

let scriptLoaded = false

/** Injects the AdSense loader script once. No-op if already loaded or not configured. */
export function loadAdsenseScript(): void {
  if (scriptLoaded || !isConfigured) return
  scriptLoaded = true
  const script = document.createElement('script')
  script.async = true
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`
  script.crossOrigin = 'anonymous'
  document.head.appendChild(script)
}

export function isAdsConfigured(): boolean {
  return isConfigured
}
