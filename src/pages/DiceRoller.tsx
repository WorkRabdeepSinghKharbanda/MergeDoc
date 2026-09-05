import { useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const SIDE_OPTIONS = [4, 6, 8, 10, 12, 20, 100]

export default function DiceRoller() {
  useDocumentMeta('Dice Roller Free Online | MergeDoc', 'Roll any number of dice with any number of sides, entirely in your browser.')
  const [count, setCount] = useState(2)
  const [sides, setSides] = useState(6)
  const [rolls, setRolls] = useState<number[] | null>(null)

  function roll() {
    const bytes = new Uint32Array(count)
    crypto.getRandomValues(bytes)
    setRolls(Array.from(bytes, (b) => (b % sides) + 1))
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold">Dice Roller</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Roll any number of dice with any number of sides.</p>

      <div className="mt-8 flex justify-center gap-4">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Dice
          <input type="number" min={1} max={20} value={count} onChange={(e) => setCount(Math.max(1, Number(e.target.value)))} className="mt-1.5 w-20 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Sides
          <select value={sides} onChange={(e) => setSides(Number(e.target.value))} className="mt-1.5 w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
            {SIDE_OPTIONS.map((s) => <option key={s} value={s}>d{s}</option>)}
          </select>
        </label>
      </div>

      <button onClick={roll} className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
        Roll
      </button>

      {rolls && (
        <>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {rolls.map((value, i) => (
              <div key={i} className="flex h-14 w-14 items-center justify-center rounded-lg border border-slate-300 bg-white text-xl font-bold shadow-sm dark:border-slate-700 dark:bg-slate-900">
                {value}
              </div>
            ))}
          </div>
          <p className="mt-4 text-lg font-semibold">Total: {rolls.reduce((sum, r) => sum + r, 0)}</p>
        </>
      )}
    </div>
  )
}
