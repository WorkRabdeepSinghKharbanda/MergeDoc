import { useEffect, useRef, useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.floor(totalSeconds % 60)
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
}

export default function CountdownStopwatch() {
  useDocumentMeta('Countdown Timer & Stopwatch Free Online | MergeDoc', 'A simple countdown timer and stopwatch, entirely in your browser.')
  const [mode, setMode] = useState<'timer' | 'stopwatch'>('timer')

  const [minutesInput, setMinutesInput] = useState(5)
  const [remaining, setRemaining] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)

  const [elapsed, setElapsed] = useState(0)
  const [watchRunning, setWatchRunning] = useState(false)
  const lapsRef = useRef<number[]>([])
  const [laps, setLaps] = useState<number[]>([])

  useEffect(() => {
    if (!timerRunning) return
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setTimerRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [timerRunning])

  useEffect(() => {
    if (!watchRunning) return
    const id = setInterval(() => setElapsed((prev) => prev + 1), 1000)
    return () => clearInterval(id)
  }, [watchRunning])

  function startTimer() {
    setRemaining(minutesInput * 60)
    setTimerRunning(true)
  }

  function lap() {
    lapsRef.current = [...lapsRef.current, elapsed]
    setLaps(lapsRef.current)
  }

  function resetStopwatch() {
    setWatchRunning(false)
    setElapsed(0)
    lapsRef.current = []
    setLaps([])
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Countdown Timer & Stopwatch</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Time things without leaving your browser tab.</p>

      <div className="mt-8 flex gap-2">
        {(['timer', 'stopwatch'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${mode === m ? 'bg-indigo-600 text-white' : 'border border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'}`}
          >
            {m}
          </button>
        ))}
      </div>

      {mode === 'timer' ? (
        <div className="mt-8">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Minutes
            <input
              type="number"
              min={1}
              value={minutesInput}
              onChange={(e) => setMinutesInput(Math.max(1, Number(e.target.value)))}
              disabled={timerRunning}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
          <div className="mt-6 text-center text-5xl font-bold tabular-nums">{formatDuration(remaining)}</div>
          <div className="mt-6 flex gap-3">
            <button onClick={startTimer} disabled={timerRunning} className="flex-1 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40">
              Start
            </button>
            <button onClick={() => setTimerRunning(false)} disabled={!timerRunning} className="flex-1 rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800">
              Pause
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="text-center text-5xl font-bold tabular-nums">{formatDuration(elapsed)}</div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => setWatchRunning((r) => !r)} className="flex-1 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
              {watchRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={lap} disabled={!watchRunning} className="flex-1 rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800">
              Lap
            </button>
            <button onClick={resetStopwatch} className="flex-1 rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
              Reset
            </button>
          </div>
          {laps.length > 0 && (
            <ol className="mt-6 space-y-1 text-sm text-slate-600 dark:text-slate-400">
              {laps.map((lapTime, i) => (
                <li key={i} className="flex justify-between rounded border border-slate-200 px-3 py-1.5 dark:border-slate-800">
                  <span>Lap {i + 1}</span>
                  <span className="tabular-nums">{formatDuration(lapTime)}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  )
}
