import { useMemo, useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function TimestampConverter() {
  useDocumentMeta('Timestamp Converter Free Online | MergeDoc', 'Convert Unix epoch timestamps to human-readable dates and back, entirely in your browser.')
  const [epoch, setEpoch] = useState(() => String(Math.floor(Date.now() / 1000)))
  const [dateStr, setDateStr] = useState(() => new Date().toISOString().slice(0, 19))

  const fromEpoch = useMemo(() => {
    const n = Number(epoch)
    if (Number.isNaN(n)) return null
    return new Date(n * 1000)
  }, [epoch])

  function useNow() {
    const now = new Date()
    setEpoch(String(Math.floor(now.getTime() / 1000)))
    setDateStr(now.toISOString().slice(0, 19))
  }

  function fromDate() {
    const t = new Date(dateStr)
    if (!Number.isNaN(t.getTime())) setEpoch(String(Math.floor(t.getTime() / 1000)))
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Timestamp Converter</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Convert between Unix epoch time and a readable date.</p>

      <button onClick={useNow} className="mt-6 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
        Use current time
      </button>

      <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Unix epoch (seconds)
        <input
          type="text"
          value={epoch}
          onChange={(e) => setEpoch(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
        />
      </label>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {fromEpoch ? fromEpoch.toString() : 'Invalid timestamp'}
      </p>

      <label className="mt-8 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Date &amp; time
        <input
          type="datetime-local"
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
      </label>
      <button onClick={fromDate} className="mt-3 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
        Convert to epoch
      </button>
    </div>
  )
}
