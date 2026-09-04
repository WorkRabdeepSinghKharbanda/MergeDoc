const WORDS = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'
).split(' ')

function randomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

function sentence(wordCount: number): string {
  const words = Array.from({ length: wordCount }, randomWord)
  const text = words.join(' ')
  return text[0].toUpperCase() + text.slice(1) + '.'
}

export function generateLorem(paragraphs: number, sentencesPerParagraph = 5): string {
  return Array.from({ length: paragraphs }, () =>
    Array.from({ length: sentencesPerParagraph }, () => sentence(6 + Math.floor(Math.random() * 10))).join(' '),
  ).join('\n\n')
}
