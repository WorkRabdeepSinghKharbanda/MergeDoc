// Code 128B encoder — printable ASCII 32-126 only.
const CODE128_PATTERNS = [
  '212222', '222122', '222221', '121223', '121322', '131222', '122213', '122312', '132212', '221213',
  '221312', '231212', '112232', '122132', '122231', '113222', '123122', '123221', '223211', '221132',
  '221231', '213212', '223112', '312131', '311222', '321122', '321221', '312212', '322112', '322211',
  '212123', '212321', '232121', '111323', '131123', '131321', '112313', '132113', '132311', '211313',
  '231113', '231311', '112133', '112331', '132131', '113123', '113321', '133121', '313121', '211331',
  '231131', '213113', '213311', '213131', '311123', '311321', '331121', '312113', '312311', '332111',
  '314111', '221411', '431111', '111224', '111422', '121124', '121421', '141122', '141221', '112214',
  '112412', '122114', '122411', '142112', '142211', '241211', '221114', '413111', '241112', '134111',
  '111242', '121142', '121241', '114212', '124112', '124211', '411212', '421112', '421211', '212141',
  '214121', '412121', '111143', '111341', '131141', '114113', '114311', '411113', '411311', '113141',
  '114131', '311141', '411131', '211412', '211214', '211232', '2331112',
]
const STOP_PATTERN = '2331112'
const START_B = 104
const CODE_B_OFFSET = 32

export type BarcodeBar = { width: number; isBar: boolean }

/** Returns alternating bar/space widths (in module units) for a Code 128B barcode of `text`. */
export function encodeCode128B(text: string): BarcodeBar[] {
  const chars = [...text]
  const values = [START_B, ...chars.map((c) => c.charCodeAt(0) - CODE_B_OFFSET)]
  let checksum = values[0]
  for (let i = 1; i < values.length; i++) checksum += values[i] * i
  values.push(checksum % 103)

  const bars: BarcodeBar[] = []
  for (const value of values) {
    const pattern = CODE128_PATTERNS[value]
    pattern.split('').forEach((digit, i) => bars.push({ width: Number(digit), isBar: i % 2 === 0 }))
  }
  STOP_PATTERN.split('').forEach((digit, i) => bars.push({ width: Number(digit), isBar: i % 2 === 0 }))
  return bars
}

export function isCode128Printable(text: string): boolean {
  return [...text].every((c) => {
    const code = c.charCodeAt(0)
    return code >= 32 && code <= 126
  })
}
