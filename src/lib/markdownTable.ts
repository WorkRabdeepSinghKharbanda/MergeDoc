/** Parses simple delimited text (comma or tab separated) into a Markdown table. First line is the header. */
export function toMarkdownTable(input: string): string {
  const lines = input.split('\n').map((l) => l.trim()).filter(Boolean)
  if (lines.length === 0) return ''
  const delimiter = lines[0].includes('\t') ? '\t' : ','
  const rows = lines.map((line) => line.split(delimiter).map((cell) => cell.trim()))
  const columnCount = rows[0].length

  const header = rows[0]
  const separator = header.map(() => '---')
  const body = rows.slice(1).map((row) => Array.from({ length: columnCount }, (_, i) => row[i] ?? ''))

  const formatRow = (cells: string[]) => `| ${cells.join(' | ')} |`
  return [formatRow(header), formatRow(separator), ...body.map(formatRow)].join('\n')
}
