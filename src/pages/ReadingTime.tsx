import { useState } from 'react'
import { readingStats } from '../lib/readability'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function ReadingTime() {
  useDocumentMeta('Reading Time & Readability Estimator Free Online | MergeDoc', 'Estimate reading time and Flesch reading ease score for any text, entirely in your browser.')
  const [text, setText] = useState('')
  const stats = readingStats(text)

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Reading Time & Readability</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Paste text to estimate reading time and readability.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste an article or blog post…"
        rows={12}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{stats.words}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Words</div>
        </div>
        <div className="rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{stats.readingTimeMinutes < 1 ? '<1' : Math.ceil(stats.readingTimeMinutes)}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Minutes to read</div>
        </div>
        <div className="rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{stats.fleschScore.toFixed(0)}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{stats.level}</div>
        </div>
      </div>
    </div>
  )
}
