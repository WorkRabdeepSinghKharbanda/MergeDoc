import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const BASES = [
  { label: 'Binary', radix: 2 },
  { label: 'Octal', radix: 8 },
  { label: 'Decimal', radix: 10 },
  { label: 'Hexadecimal', radix: 16 },
] as const

export default function NumberBaseConverter() {
  useDocumentMeta('Number Base Converter Free Online | MergeDoc', 'Convert numbers between binary, octal, decimal, and hexadecimal, entirely in your browser.')
  const toast = useToast()
  const [radix, setRadix] = useState<number>(10)
  const [value, setValue] = useState('255')

  const parsed = parseInt(value, radix)
  const valid = !Number.isNaN(parsed) && new RegExp(`^[0-${Math.min(radix, 10) - 1}${radix > 10 ? `a-${String.fromCharCode(96 + radix - 10)}` : ''}]+$`, 'i').test(value)

  async function copy(text: string) {
    await navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Number Base Converter</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Convert a number between binary, octal, decimal, and hex.</p>

      <div className="mt-8 flex gap-2">
        <select value={radix} onChange={(e) => setRadix(Number(e.target.value))} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
          {BASES.map((b) => <option key={b.radix} value={b.radix}>{b.label}</option>)}
        </select>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      {!valid && <p className="mt-2 text-sm text-red-500">Invalid number for the selected base.</p>}

      {valid && (
        <div className="mt-6 space-y-3">
          {BASES.map((b) => (
            <div key={b.radix} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{b.label}</p>
                <p className="font-mono text-sm">{parsed.toString(b.radix)}</p>
              </div>
              <button onClick={() => copy(parsed.toString(b.radix))} className="rounded px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950">
                Copy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
