import { useMemo, useState } from 'react'
import { UNIT_CATEGORIES, convertUnit } from '../lib/converters'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function UnitConverter() {
  useDocumentMeta('Unit Converter Free Online | MergeDoc', 'Convert length, weight, temperature, and data units instantly, entirely in your browser.')
  const [category, setCategory] = useState('length')
  const units = Object.keys(UNIT_CATEGORIES[category].units)
  const [from, setFrom] = useState(units[0])
  const [to, setTo] = useState(units[1])
  const [value, setValue] = useState('1')

  function handleCategory(next: string) {
    setCategory(next)
    const nextUnits = Object.keys(UNIT_CATEGORIES[next].units)
    setFrom(nextUnits[0])
    setTo(nextUnits[1])
  }

  const result = useMemo(() => {
    const n = parseFloat(value)
    if (Number.isNaN(n)) return ''
    return convertUnit(category, from, to, n).toLocaleString(undefined, { maximumFractionDigits: 6 })
  }, [category, from, to, value])

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Unit Converter</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Convert between common units instantly.</p>

      <label className="mt-8 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Category
        <select
          value={category}
          onChange={(e) => handleCategory(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          {Object.entries(UNIT_CATEGORIES).map(([key, cat]) => <option key={key} value={key}>{cat.name}</option>)}
        </select>
      </label>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          From
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm capitalize dark:border-slate-700 dark:bg-slate-900">
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          To
          <select value={to} onChange={(e) => setTo(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm capitalize dark:border-slate-700 dark:bg-slate-900">
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </label>
      </div>

      <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Value
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
      </label>

      <div className="mt-6 rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{result || '—'}</div>
        <div className="mt-1 text-xs capitalize text-slate-500 dark:text-slate-400">{to}</div>
      </div>
    </div>
  )
}
