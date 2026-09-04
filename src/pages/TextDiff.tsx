import { useState } from 'react'
import { diffWords } from '../lib/diff'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function TextDiff() {
  useDocumentMeta('Text Diff Checker Free Online | MergeDoc', 'Compare two pieces of text and see word-level differences highlighted, entirely in your browser.')
  const [a, setA] = useState('')
  const [b, setB] = useState('')

  const parts = a || b ? diffWords(a, b) : null

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">Text Diff Checker</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Compare two texts and see word-level differences.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <textarea
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Original text"
          rows={10}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <textarea
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="Changed text"
          rows={10}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      {parts && (
        <div className="mt-6 rounded-lg border border-slate-200 p-4 text-sm leading-relaxed whitespace-pre-wrap dark:border-slate-800">
          {parts.map((p, i) => (
            <span
              key={i}
              className={
                p.added
                  ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                  : p.removed
                    ? 'bg-red-100 text-red-800 line-through dark:bg-red-950 dark:text-red-300'
                    : ''
              }
            >
              {p.value}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
