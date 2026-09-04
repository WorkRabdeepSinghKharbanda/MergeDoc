function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** ponytail: subset of markdown (headers, bold, italic, links, inline code, lists) — no tables/nesting, not a full CommonMark parser. */
export function markdownToHtml(markdown: string): string {
  const escaped = escapeHtml(markdown)
  const lines = escaped.split('\n')
  const html: string[] = []
  let inList = false

  for (const line of lines) {
    const heading = /^(#{1,6})\s+(.*)$/.exec(line)
    const listItem = /^[-*]\s+(.*)$/.exec(line)

    if (listItem) {
      if (!inList) {
        html.push('<ul>')
        inList = true
      }
      html.push(`<li>${inline(listItem[1])}</li>`)
      continue
    }
    if (inList) {
      html.push('</ul>')
      inList = false
    }

    if (heading) {
      const level = heading[1].length
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`)
    } else if (line.trim() === '') {
      html.push('')
    } else {
      html.push(`<p>${inline(line)}</p>`)
    }
  }
  if (inList) html.push('</ul>')
  return html.join('\n')
}

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
}
