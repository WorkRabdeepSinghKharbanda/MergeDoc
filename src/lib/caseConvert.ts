function words(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/[\s_-]+/)
    .filter(Boolean)
}

export const CASE_CONVERTERS: Record<string, (text: string) => string> = {
  UPPERCASE: (t) => t.toUpperCase(),
  lowercase: (t) => t.toLowerCase(),
  'Title Case': (t) => words(t).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' '),
  'Sentence case': (t) => t.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (m) => m.toUpperCase()),
  camelCase: (t) => words(t).map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase())).join(''),
  snake_case: (t) => words(t).map((w) => w.toLowerCase()).join('_'),
  'kebab-case': (t) => words(t).map((w) => w.toLowerCase()).join('-'),
}
