import { countText } from './text'

function countSyllables(word: string): number {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, '')
  if (!cleaned) return 0
  const matches = cleaned.match(/[aeiouy]+/g)
  let count = matches ? matches.length : 1
  if (cleaned.endsWith('e') && count > 1) count -= 1
  return Math.max(1, count)
}

/** Flesch Reading Ease: higher = easier to read (0-100 typical range). */
export function readingStats(text: string) {
  const { words, sentences } = countText(text)
  const wordList = text.trim().split(/\s+/).filter(Boolean)
  const syllables = wordList.reduce((sum, w) => sum + countSyllables(w), 0)
  const safeSentences = Math.max(1, sentences)
  const safeWords = Math.max(1, words)

  const fleschScore = 206.835 - 1.015 * (safeWords / safeSentences) - 84.6 * (syllables / safeWords)
  const readingTimeMinutes = words / 200

  let level = 'Very difficult'
  if (fleschScore >= 90) level = 'Very easy'
  else if (fleschScore >= 70) level = 'Easy'
  else if (fleschScore >= 60) level = 'Standard'
  else if (fleschScore >= 50) level = 'Fairly difficult'
  else if (fleschScore >= 30) level = 'Difficult'

  return { words, fleschScore: Math.max(0, Math.min(100, fleschScore)), level, readingTimeMinutes }
}
