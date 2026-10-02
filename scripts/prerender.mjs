// Post-build static prerender: renders every route with the SSR bundle and writes one HTML file
// per route into dist/, plus sitemap.xml. Run after `vite build` and the SSR build (see package.json).
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const SITE = 'https://mergedoc.vercel.app'

const { render, prerenderRoutes } = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href)
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function swap(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: template is missing ${pattern}`)
  return html.replace(pattern, () => replacement)
}

function buildPage(url) {
  const { html, head } = render(url)
  if (!head.title) throw new Error(`prerender: ${url} did not set a page title (missing useDocumentMeta?)`)

  let page = template
  page = swap(page, /<title>[\s\S]*?<\/title>/, `<title>${esc(head.title)}</title>`)
  page = swap(page, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(head.description)}" />`)
  page = swap(page, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${head.canonical}" />`)
  page = swap(page, /<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${head.type}" />`)
  page = swap(page, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(head.title)}" />`)
  page = swap(page, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(head.description)}" />`)
  page = swap(page, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${head.canonical}" />`)
  page = swap(page, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(head.title)}" />`)
  page = swap(page, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(head.description)}" />`)

  const extra = []
  if (head.publishedTime) extra.push(`<meta property="article:published_time" content="${head.publishedTime}" />`)
  if (head.modifiedTime) extra.push(`<meta property="article:modified_time" content="${head.modifiedTime}" />`)
  for (const data of head.jsonld) {
    // "<" escaped so a stray "</script>" in copy can never terminate the block early.
    extra.push(`<script type="application/ld+json" data-ssr>${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`)
  }
  page = swap(page, /<\/head>/, `${extra.join('\n    ')}\n  </head>`)
  page = swap(page, /<div id="root"><\/div>/, `<div id="root">${html}</div>`)
  return page
}

const routes = prerenderRoutes()
const seen = new Set()
for (const { path } of routes) {
  if (seen.has(path)) throw new Error(`prerender: duplicate route ${path}`)
  seen.add(path)
  const page = buildPage(path)
  const file = path === '/' ? join(dist, 'index.html') : join(dist, `${path}.html`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page)
}

const urls = routes
  .map(
    ({ path, priority, lastmod }) =>
      `  <url><loc>${SITE}${path === '/' ? '/' : path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}<priority>${priority.toFixed(2)}</priority></url>`,
  )
  .join('\n')
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)

console.log(`prerendered ${routes.length} routes + sitemap.xml`)
