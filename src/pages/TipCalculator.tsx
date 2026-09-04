import { useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function TipCalculator() {
  useDocumentMeta('Tip Calculator Free Online | MergeDoc', 'Calculate tip amount and split the bill, entirely in your browser.')
  const [bill, setBill] = useState(50)
  const [tipPercent, setTipPercent] = useState(18)
  const [people, setPeople] = useState(1)

  const tip = (bill * tipPercent) / 100
  const total = bill + tip
  const perPerson = total / Math.max(1, people)

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Tip Calculator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Calculate the tip and split the bill.</p>

      <label className="mt-8 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Bill amount
        <input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
      </label>

      <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Tip: {tipPercent}%
        <input type="range" min={0} max={30} value={tipPercent} onChange={(e) => setTipPercent(Number(e.target.value))} className="mt-1.5 w-full" />
      </label>

      <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Number of people
        <input type="number" min={1} value={people} onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
      </label>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          ['Tip', tip],
          ['Total', total],
          ['Per person', perPerson],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{(value as number).toFixed(2)}</div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
