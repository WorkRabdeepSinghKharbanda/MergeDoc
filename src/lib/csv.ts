/** ponytail: naive comma-split, no quoted-field/escape handling — fine for simple exports, not RFC 4180 edge cases. */
export function csvToJson(csv: string): Record<string, string>[] {
  const lines = csv.trim().split(/\r?\n/)
  const headers = lines[0].split(',').map((h) => h.trim())
  return lines.slice(1).map((line) => {
    const cells = line.split(',')
    const row: Record<string, string> = {}
    headers.forEach((h, i) => (row[h] = (cells[i] ?? '').trim()))
    return row
  })
}

export function jsonToCsv(json: Record<string, unknown>[]): string {
  if (json.length === 0) return ''
  const headers = Object.keys(json[0])
  const lines = [headers.join(',')]
  for (const row of json) {
    lines.push(headers.map((h) => String(row[h] ?? '')).join(','))
  }
  return lines.join('\n')
}
