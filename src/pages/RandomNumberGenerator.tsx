import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function RandomNumberGenerator() {
  useDocumentMeta('Random Number Generator Free Online | MergeDoc', 'Generate random numbers in any range, entirely in your browser.')
  const toast = useToast()
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [count, setCount] = useState(1)
  const [unique, setUnique] = useState(false)
  const [results, setResults] = useState<number[]>([])

  function generate() {
    const lo = Math.min(min, max)
    const hi = Math.max(min, max)
    const range = hi - lo + 1
    if (unique && count > range) {
      toast.error(`Can't generate ${count} unique numbers in a range of ${range}.`)
      return
    }
    const output: number[] = []
    const seen = new Set<number>()
    while (output.length < count) {
      const bytes = new Uint32Array(1)
      crypto.getRandomValues(bytes)
      const value = lo + (bytes[0] % range)
      if (unique) {
        if (seen.has(value)) continue
        seen.add(value)
      }
      output.push(value)
    }
    setResults(output)
  }

  async function copy() {
    if (results.length === 0) return
    await navigator.clipboard.writeText(results.join(', '))
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Random Number Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Generate random numbers within a range.</p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Min
          <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Max
          <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Count
          <input type="number" min={1} max={1000} value={count} onChange={(e) => setCount(Math.max(1, Number(e.target.value)))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} />
        No duplicates
      </label>

      <button onClick={generate} className="mt-6 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
        Generate
      </button>

      {results.length > 0 && (
        <div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 p-3 font-mono text-sm dark:border-slate-800">
          <span className="flex-1 break-all">{results.join(', ')}</span>
          <button onClick={copy} className="shrink-0 rounded px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950">
            Copy
          </button>
        </div>
      )}
    </div>
  )
}
