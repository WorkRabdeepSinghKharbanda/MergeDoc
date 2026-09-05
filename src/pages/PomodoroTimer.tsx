import { useEffect, useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const WORK_MINUTES = 25
const BREAK_MINUTES = 5

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function PomodoroTimer() {
  useDocumentMeta('Pomodoro Timer Free Online | MergeDoc', 'A focus timer using the Pomodoro technique — 25 minutes of work, 5 minutes of break, entirely in your browser.')
  const [phase, setPhase] = useState<'work' | 'break'>('work')
  const [remaining, setRemaining] = useState(WORK_MINUTES * 60)
  const [running, setRunning] = useState(false)
  const [cycles, setCycles] = useState(0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev > 1) return prev - 1
        setPhase((prevPhase) => {
          const next = prevPhase === 'work' ? 'break' : 'work'
          if (prevPhase === 'work') setCycles((c) => c + 1)
          return next
        })
        return 0
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if (remaining === 0) setRemaining(phase === 'work' ? WORK_MINUTES * 60 : BREAK_MINUTES * 60)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  function reset() {
    setRunning(false)
    setPhase('work')
    setRemaining(WORK_MINUTES * 60)
    setCycles(0)
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">25 minutes focused work, 5 minute break, repeat.</p>

      <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {phase === 'work' ? 'Focus time' : 'Break time'}
      </p>
      <div className="mt-2 text-6xl font-bold tabular-nums">{formatTime(remaining)}</div>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Completed cycles: {cycles}</p>

      <div className="mt-8 flex justify-center gap-3">
        <button onClick={() => setRunning((r) => !r)} className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset} className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
          Reset
        </button>
      </div>
    </div>
  )
}
