/** Fisher-Yates, uses crypto for unbiased randomness. */
export function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function splitIntoGroups<T>(items: T[], groupCount: number): T[][] {
  const groups: T[][] = Array.from({ length: groupCount }, () => [])
  items.forEach((item, i) => groups[i % groupCount].push(item))
  return groups
}
