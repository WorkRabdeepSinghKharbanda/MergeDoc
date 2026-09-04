import { useMemo, useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

export default function AgeCalculator() {
  useDocumentMeta('Age Calculator Free Online | MergeDoc', 'Calculate your exact age and days until your next birthday, entirely in your browser.')
  const [dob, setDob] = useState('2000-01-01')
  const [onDate, setOnDate] = useState(() => todayStr())

  const result = useMemo(() => {
    const birth = new Date(dob)
    const target = new Date(onDate)
    if (Number.isNaN(birth.getTime()) || Number.isNaN(target.getTime()) || birth > target) return null

    let years = target.getFullYear() - birth.getFullYear()
    let months = target.getMonth() - birth.getMonth()
    let days = target.getDate() - birth.getDate()
    if (days < 0) {
      months -= 1
      days += new Date(target.getFullYear(), target.getMonth(), 0).getDate()
    }
    if (months < 0) {
      years -= 1
      months += 12
    }

    let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < target) nextBirthday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate())
    const daysToNext = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24))
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))

    return { years, months, days, daysToNext, totalDays }
  }, [dob, onDate])

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Age Calculator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Calculate exact age and days to your next birthday.</p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Date of birth
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          As of
          <input type="date" value={onDate} onChange={(e) => setOnDate(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
      </div>

      {result ? (
        <>
          <div className="mt-8 rounded-lg border border-slate-200 p-6 text-center dark:border-slate-800">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {result.years} years, {result.months} months, {result.days} days
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
              <div className="text-xl font-bold">{result.totalDays.toLocaleString()}</div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Total days lived</div>
            </div>
            <div className="rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
              <div className="text-xl font-bold">{result.daysToNext}</div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Days to next birthday</div>
            </div>
          </div>
        </>
      ) : (
        <p className="mt-8 text-sm text-red-500">Date of birth must be before the target date.</p>
      )}
    </div>
  )
}
