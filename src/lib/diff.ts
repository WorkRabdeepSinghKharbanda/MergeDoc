export type DiffPart = { value: string; added?: boolean; removed?: boolean }

/** Word-level LCS diff. ponytail: O(n*m) table, fine for page-sized text, not for whole books. */
export function diffWords(a: string, b: string): DiffPart[] {
  const aw = a.split(/(\s+)/)
  const bw = b.split(/(\s+)/)
  const m = aw.length
  const n = bw.length
  const lcs: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0))
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      lcs[i][j] = aw[i] === bw[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1])
    }
  }
  const parts: DiffPart[] = []
  let i = 0
  let j = 0
  while (i < m && j < n) {
    if (aw[i] === bw[j]) {
      parts.push({ value: aw[i] })
      i++
      j++
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      parts.push({ value: aw[i], removed: true })
      i++
    } else {
      parts.push({ value: bw[j], added: true })
      j++
    }
  }
  while (i < m) parts.push({ value: aw[i++], removed: true })
  while (j < n) parts.push({ value: bw[j++], added: true })
  return parts
}
