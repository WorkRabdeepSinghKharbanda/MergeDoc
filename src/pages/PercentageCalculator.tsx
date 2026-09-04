import { useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function PercentageCalculator() {
  useDocumentMeta('Percentage Calculator Free Online | MergeDoc', 'Calculate percentages, percentage change, and percentage of a value, entirely in your browser.')
  const [x, setX] = useState(20)
  const [y, setY] = useState(80)
  const [from, setFrom] = useState(50)
  const [to, setTo] = useState(75)

  const whatIsXofY = (x / 100) * y
  const xIsWhatPercentOfY = y === 0 ? 0 : (x / y) * 100
  const percentChange = from === 0 ? 0 : ((to - from) / from) * 100

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Percentage Calculator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Three common percentage calculations.</p>

      <section className="mt-10 rounded-lg border border-slate-200 p-5 dark:border-slate-800">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">What is X% of Y?</p>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <input type="number" value={x} onChange={(e) => setX(Number(e.target.value))} className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
          <span>% of</span>
          <input type="number" value={y} onChange={(e) => setY(Number(e.target.value))} className="w-28 rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
          <span>=</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{whatIsXofY.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 p-5 dark:border-slate-800">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">X is what percent of Y?</p>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <input type="number" value={x} onChange={(e) => setX(Number(e.target.value))} className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
          <span>is what % of</span>
          <input type="number" value={y} onChange={(e) => setY(Number(e.target.value))} className="w-28 rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
          <span>=</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{xIsWhatPercentOfY.toFixed(2)}%</span>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 p-5 dark:border-slate-800">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Percentage change from X to Y</p>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <input type="number" value={from} onChange={(e) => setFrom(Number(e.target.value))} className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
          <span>→</span>
          <input type="number" value={to} onChange={(e) => setTo(Number(e.target.value))} className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
          <span>=</span>
          <span className={`font-semibold ${percentChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
          </span>
        </div>
      </section>
    </div>
  )
}
