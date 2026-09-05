import { useEffect, useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

function todayPlus(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default function CountdownToDate() {
  useDocumentMeta('Countdown to Date Free Online | MergeDoc', 'Count down the days, hours, minutes, and seconds until any date, entirely in your browser.')
  const [target, setTarget] = useState(() => todayPlus(30))
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const targetMs = new Date(`${target}T00:00:00`).getTime()
  const diff = targetMs - now
  const isPast = diff <= 0
  const abs = Math.abs(diff)
  const days = Math.floor(abs / 86400000)
  const hours = Math.floor((abs % 86400000) / 3600000)
  const minutes = Math.floor((abs % 3600000) / 60000)
  const seconds = Math.floor((abs % 60000) / 1000)

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold">Countdown to Date</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Count down to any future date.</p>

      <input
        type="date"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        className="mx-auto mt-8 block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{isPast ? 'Time since' : 'Time until'} {target}</p>

      <div className="mt-6 grid grid-cols-4 gap-3">
        {[
          ['Days', days],
          ['Hours', hours],
          ['Minutes', minutes],
          ['Seconds', seconds],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
            <div className="text-2xl font-bold tabular-nums text-indigo-600 dark:text-indigo-400">{value}</div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
