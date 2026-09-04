export const TYPING_TEXTS = [
  'The quick brown fox jumps over the lazy dog while the sun sets behind the distant mountains.',
  'Practice makes perfect, and the only way to improve your typing speed is to type every single day.',
  'A journey of a thousand miles begins with a single step, and every great skill starts with small habits.',
  'Technology changes the way we work, communicate, and solve problems across every industry in the world.',
  'Consistency and patience are the two most important qualities anyone can develop over a long career.',
]

export function randomTypingText(exclude?: string): string {
  const options = TYPING_TEXTS.filter((t) => t !== exclude)
  return options[Math.floor(Math.random() * options.length)]
}
