// The AdSense loader script itself is a static <script> tag in index.html's <head> — present
// on every route of this SPA on first load, per AdSense's own setup instructions. Nothing here
// injects it dynamically; this just tells the rest of the app whether ads are configured.
export const ADSENSE_CLIENT_ID = 'ca-pub-5852027898822024'

const isConfigured = !ADSENSE_CLIENT_ID.includes('0000000000000000')

export function isAdsConfigured(): boolean {
  return isConfigured
}
