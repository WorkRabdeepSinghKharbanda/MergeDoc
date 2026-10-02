function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** ponytail: subset of markdown (headers, bold, italic, links, inline code, flat bullet + numbered lists) — no tables/nesting/code fences, not a full CommonMark parser. */
export function markdownToHtml(markdown: string): string {
  const escaped = escapeHtml(markdown)
  const lines = escaped.split('\n')
  const html: string[] = []
  let list: 'ul' | 'ol' | null = null

  function closeList() {
    if (list) html.push(`</${list}>`)
    list = null
  }

  for (const line of lines) {
    const heading = /^(#{1,6})\s+(.*)$/.exec(line)
    const bullet = /^[-*]\s+(.*)$/.exec(line)
    const numbered = /^\d+\.\s+(.*)$/.exec(line)
    const item = bullet ?? numbered

    if (item) {
      const kind = bullet ? 'ul' : 'ol'
      if (list !== kind) {
        closeList()
        html.push(`<${kind}>`)
        list = kind
      }
      html.push(`<li>${inline(item[1])}</li>`)
      continue
    }
    closeList()

    if (heading) {
      const level = heading[1].length
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`)
    } else if (line.trim() === '') {
      html.push('')
    } else {
      html.push(`<p>${inline(line)}</p>`)
    }
  }
  closeList()
  return html.join('\n')
}

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, (_m, label: string, href: string) =>
      // Internal paths stay in-tab (crawl flow + SPA navigation); only external links open a new tab.
      href.startsWith('/')
        ? `<a href="${href}">${label}</a>`
        : `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`,
    )
}
