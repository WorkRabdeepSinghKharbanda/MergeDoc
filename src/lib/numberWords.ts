const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
const SCALES = ['', 'thousand', 'million', 'billion', 'trillion']

function threeDigitsToWords(n: number): string {
  const parts: string[] = []
  if (n >= 100) {
    parts.push(ONES[Math.floor(n / 100)], 'hundred')
    n %= 100
  }
  if (n >= 20) {
    parts.push(TENS[Math.floor(n / 10)])
    n %= 10
    if (n > 0) parts.push(ONES[n])
  } else if (n > 0) {
    parts.push(ONES[n])
  }
  return parts.join(' ')
}

export function numberToWords(value: number): string {
  if (!Number.isFinite(value)) return 'Not a number'
  if (value === 0) return 'zero'
  const negative = value < 0
  let n = Math.floor(Math.abs(value))
  const groups: number[] = []
  while (n > 0) {
    groups.push(n % 1000)
    n = Math.floor(n / 1000)
  }
  const words = groups
    .map((group, i) => (group === 0 ? '' : `${threeDigitsToWords(group)}${SCALES[i] ? ' ' + SCALES[i] : ''}`))
    .filter(Boolean)
    .reverse()
    .join(' ')
  return (negative ? 'negative ' : '') + words
}
