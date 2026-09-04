const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const UPPER = LOWER.toUpperCase()
const DIGITS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

export type PasswordOptions = { length: number; lower: boolean; upper: boolean; digits: boolean; symbols: boolean }

export function generatePassword(opts: PasswordOptions): string {
  const pool = [opts.lower && LOWER, opts.upper && UPPER, opts.digits && DIGITS, opts.symbols && SYMBOLS]
    .filter(Boolean)
    .join('')
  if (!pool) return ''
  const bytes = new Uint32Array(opts.length)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => pool[b % pool.length]).join('')
}

export type Strength = { score: 0 | 1 | 2 | 3 | 4; label: string }

/** ponytail: heuristic scoring (length + charset variety), not zxcvbn-grade entropy analysis. */
export function checkPasswordStrength(password: string): Strength {
  if (!password) return { score: 0, label: 'Empty' }
  let variety = 0
  if (/[a-z]/.test(password)) variety++
  if (/[A-Z]/.test(password)) variety++
  if (/[0-9]/.test(password)) variety++
  if (/[^a-zA-Z0-9]/.test(password)) variety++

  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (variety >= 3) score++
  if (password.length >= 16 && variety === 4) score++

  const labels = ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong']
  return { score: Math.min(score, 4) as Strength['score'], label: labels[Math.min(score, 4)] }
}
