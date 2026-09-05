export function encodeHtmlEntities(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/** Safe: assigns to textarea.innerHTML (never executed as markup) and reads back the decoded text. */
export function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}
