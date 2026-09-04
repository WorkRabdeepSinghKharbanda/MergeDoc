import { useState } from 'react'
import { countText } from '../lib/text'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function WordCounter() {
  useDocumentMeta(
    'Word & Character Counter Free Online | MergeDoc',
    'Count words, characters, sentences, and paragraphs in any text, instantly and privately in your browser.',
  )
  const [text, setText] = useState('')
  const stats = countText(text)

  const STATS = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.chars },
    { label: 'Characters (no spaces)', value: stats.charsNoSpaces },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
  ]

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Word & Character Counter</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Paste or type text to see live counts.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here…"
        rows={10}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
      />

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{s.value}</div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
