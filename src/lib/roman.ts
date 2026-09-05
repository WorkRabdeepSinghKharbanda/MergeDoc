const VALUES: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

export function toRoman(num: number): string {
  if (!Number.isInteger(num) || num < 1 || num > 3999) return ''
  let n = num
  let result = ''
  for (const [value, symbol] of VALUES) {
    while (n >= value) {
      result += symbol
      n -= value
    }
  }
  return result
}

const ROMAN_TO_VALUE: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }

export function fromRoman(roman: string): number | null {
  const upper = roman.toUpperCase().trim()
  if (!upper || !/^[IVXLCDM]+$/.test(upper)) return null
  let total = 0
  for (let i = 0; i < upper.length; i++) {
    const current = ROMAN_TO_VALUE[upper[i]]
    const next = ROMAN_TO_VALUE[upper[i + 1]]
    if (next && current < next) total -= current
    else total += current
  }
  return toRoman(total) === upper ? total : null
}
