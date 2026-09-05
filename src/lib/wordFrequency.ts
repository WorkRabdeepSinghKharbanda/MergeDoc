const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'for', 'is', 'are', 'was', 'were',
  'it', 'this', 'that', 'with', 'as', 'at', 'by', 'be', 'from', 'has', 'have', 'had', 'i', 'you',
  'he', 'she', 'they', 'we', 'his', 'her', 'their', 'its', 'not', 'so', 'if', 'then', 'than',
])

export type WordFrequency = { word: string; count: number }

export function wordFrequencies(text: string, excludeStopWords: boolean): WordFrequency[] {
  const words = (text.toLowerCase().match(/[a-z0-9']+/g) ?? []).filter((w) => !excludeStopWords || !STOP_WORDS.has(w))
  const counts = new Map<string, number>()
  for (const word of words) counts.set(word, (counts.get(word) ?? 0) + 1)
  return [...counts.entries()].map(([word, count]) => ({ word, count })).sort((a, b) => b.count - a.count)
}
