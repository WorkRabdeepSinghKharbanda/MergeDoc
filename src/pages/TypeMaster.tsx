import { useEffect, useMemo, useRef, useState } from 'react'
import { randomTypingText } from '../lib/typingTexts'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function TypeMaster() {
  useDocumentMeta(
    'Typing Speed Test (WPM) Free Online | MergeDoc',
    'Test your typing speed and accuracy in words per minute, instantly and privately in your browser.',
  )
  const [target, setTarget] = useState(() => randomTypingText())
  const [input, setInput] = useState('')
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [finishedAt, setFinishedAt] = useState<number | null>(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const done = finishedAt !== null

  // Ticks once a second while the test is running, driving the live timer/WPM below.
  useEffect(() => {
    if (!startedAt || done) return
    const id = setInterval(() => setElapsedSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [startedAt, done])

  function handleChange(value: string) {
    if (done || value.length > target.length) return
    const now = Date.now()
    if (!startedAt) setStartedAt(now)
    setInput(value)
    if (value.length === target.length) {
      setFinishedAt(now)
      setElapsedSeconds(Math.max(1, Math.round((now - (startedAt ?? now)) / 1000)))
    }
  }

  function restart() {
    setTarget(randomTypingText(target))
    setInput('')
    setStartedAt(null)
    setFinishedAt(null)
    setElapsedSeconds(0)
    inputRef.current?.focus()
  }

  const live = useMemo(() => {
    let correct = 0
    for (let i = 0; i < input.length; i++) if (input[i] === target[i]) correct++
    const accuracy = input.length ? Math.round((correct / input.length) * 100) : 100
    const minutes = Math.max(elapsedSeconds / 60, 1 / 60)
    const wpm = startedAt ? Math.round(correct / 5 / minutes) : 0

    return {
      typed: input.length,
      total: target.length,
      progress: Math.round((input.length / target.length) * 100),
      accuracy,
      elapsedSeconds,
      wpm,
    }
  }, [input, target, startedAt, elapsedSeconds])

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Type Master</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Type the passage below as fast and accurately as you can.</p>

      <div className="mt-8 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>
          {live.typed} / {live.total} characters
        </span>
        <span>
          {live.elapsedSeconds}s{startedAt ? ` · ${live.wpm} WPM · ${live.accuracy}% accuracy` : ''}
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-150"
          style={{ width: `${live.progress}%` }}
        />
      </div>

      <div
        className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-lg leading-relaxed dark:border-slate-800 dark:bg-slate-900"
        onClick={() => inputRef.current?.focus()}
      >
        {target.split('').map((char, i) => {
          const typed = input[i]
          const color =
            typed === undefined
              ? 'text-slate-400 dark:text-slate-500'
              : typed === char
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400'
          return (
            <span key={i} className={color}>
              {char}
            </span>
          )
        })}
      </div>

      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        disabled={done}
        autoFocus
        rows={3}
        placeholder="Start typing here…"
        className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm focus:border-indigo-500 focus:outline-none disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900"
      />

      {done && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{live.wpm}</div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">WPM</div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{live.accuracy}%</div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{live.elapsedSeconds}s</div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Time</div>
          </div>
        </div>
      )}

      <button
        onClick={restart}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
      >
        {done ? 'Try again' : 'Restart'}
      </button>
    </div>
  )
}
