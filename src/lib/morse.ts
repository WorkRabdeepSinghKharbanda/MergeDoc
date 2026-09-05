const MORSE_MAP: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..',
  J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
  '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '@': '.--.-.',
}
const MORSE_TO_CHAR: Record<string, string> = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]))

export function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split(' ')
    .map((word) => [...word].map((c) => MORSE_MAP[c] ?? '').filter(Boolean).join(' '))
    .join(' / ')
}

export function morseToText(morse: string): string {
  return morse
    .trim()
    .split(' / ')
    .map((word) => word.split(' ').map((code) => MORSE_TO_CHAR[code] ?? '').join(''))
    .join(' ')
}
