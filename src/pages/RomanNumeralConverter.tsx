import { useMemo, useState } from 'react'
import { fromRoman, toRoman } from '../lib/roman'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function RomanNumeralConverter() {
  useDocumentMeta('Roman Numeral Converter Free Online | MergeDoc', 'Convert numbers to Roman numerals and back, entirely in your browser.')
  const [number, setNumber] = useState('1994')
  const [roman, setRoman] = useState('MCMXCIV')

  const numberToRoman = useMemo(() => {
    const n = Number(number)
    return Number.isInteger(n) ? toRoman(n) : ''
  }, [number])

  const romanToNumber = useMemo(() => fromRoman(roman), [roman])

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Roman Numeral Converter</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Convert between numbers and Roman numerals (1-3999).</p>

      <section className="mt-8">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Number
          <input type="number" min={1} max={3999} value={number} onChange={(e) => setNumber(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <p className="mt-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">{numberToRoman || '—'}</p>
      </section>

      <section className="mt-8">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Roman numeral
          <input type="text" value={roman} onChange={(e) => setRoman(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm uppercase dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <p className="mt-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">{romanToNumber ?? 'Invalid'}</p>
      </section>
    </div>
  )
}
