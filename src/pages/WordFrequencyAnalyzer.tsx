import { useMemo, useState } from 'react'
import { wordFrequencies } from '../lib/wordFrequency'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function WordFrequencyAnalyzer() {
  useDocumentMeta('Word Frequency Analyzer Free Online | MergeDoc', 'Find the most frequently used words in a piece of text, entirely in your browser.')
  const [text, setText] = useState('')
  const [excludeStopWords, setExcludeStopWords] = useState(true)

  const frequencies = useMemo(() => wordFrequencies(text, excludeStopWords).slice(0, 25), [text, excludeStopWords])
  const maxCount = frequencies[0]?.count ?? 1

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Word Frequency Analyzer</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Paste text to see the most frequently used words.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste an article, essay, or transcript…"
        rows={10}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <label className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <input type="checkbox" checked={excludeStopWords} onChange={(e) => setExcludeStopWords(e.target.checked)} />
        Exclude common words (the, a, and, …)
      </label>

      {frequencies.length > 0 && (
        <div className="mt-6 space-y-2">
          {frequencies.map(({ word, count }) => (
            <div key={word} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-sm">{word}</span>
              <div className="h-4 flex-1 overflow-hidden rounded bg-slate-100 dark:bg-slate-800">
                <div className="h-full rounded bg-indigo-500" style={{ width: `${(count / maxCount) * 100}%` }} />
              </div>
              <span className="w-8 shrink-0 text-right text-xs text-slate-500 dark:text-slate-400">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
