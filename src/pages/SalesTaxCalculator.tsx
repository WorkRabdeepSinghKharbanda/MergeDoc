import { useMemo, useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function SalesTaxCalculator() {
  useDocumentMeta('Sales Tax Calculator Free Online | MergeDoc', 'Calculate sales tax and total price, or reverse-calculate the pre-tax price, entirely in your browser.')
  const [mode, setMode] = useState<'add' | 'remove'>('add')
  const [amount, setAmount] = useState(100)
  const [rate, setRate] = useState(8)

  const result = useMemo(() => {
    if (mode === 'add') {
      const tax = (amount * rate) / 100
      return { base: amount, tax, total: amount + tax }
    }
    const base = amount / (1 + rate / 100)
    return { base, tax: amount - base, total: amount }
  }, [mode, amount, rate])

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Sales Tax Calculator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Add tax to a price, or work out the pre-tax price from a total.</p>

      <div className="mt-8 flex gap-2">
        {(['add', 'remove'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === m ? 'bg-indigo-600 text-white' : 'border border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'}`}
          >
            {m === 'add' ? 'Add tax to price' : 'Remove tax from total'}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {mode === 'add' ? 'Pre-tax amount' : 'Total (tax included)'}
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Tax rate (%)
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          ['Pre-tax', result.base],
          ['Tax', result.tax],
          ['Total', result.total],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
            <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{(value as number).toFixed(2)}</div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
