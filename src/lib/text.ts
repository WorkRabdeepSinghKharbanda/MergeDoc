export function countText(text: string) {
  const trimmed = text.trim()
  const words = trimmed ? trimmed.split(/\s+/).length : 0
  const chars = text.length
  const charsNoSpaces = text.replace(/\s/g, '').length
  const sentences = trimmed ? (trimmed.match(/[.!?]+(?:\s|$)/g) ?? []).length || 1 : 0
  const paragraphs = trimmed ? trimmed.split(/\n{2,}/).filter((p) => p.trim()).length : 0
  return { words, chars, charsNoSpaces, sentences, paragraphs }
}
