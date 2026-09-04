import { useMemo, useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function RegexTester() {
  useDocumentMeta('Regex Tester Free Online | MergeDoc', 'Test regular expressions against sample text with live match highlighting, entirely in your browser.')
  const [pattern, setPattern] = useState('\\w+@\\w+\\.\\w+')
  const [flags, setFlags] = useState('g')
  const [text, setText] = useState('Contact us at hello@example.com or support@example.org')

  const { error, matches, highlighted } = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags)
      const found = [...text.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'))]
      let cursor = 0
      const pieces: { text: string; match: boolean }[] = []
      for (const m of found) {
        if (m.index === undefined) continue
        if (m.index > cursor) pieces.push({ text: text.slice(cursor, m.index), match: false })
        pieces.push({ text: m[0], match: true })
        cursor = m.index + m[0].length
      }
      if (cursor < text.length) pieces.push({ text: text.slice(cursor), match: false })
      return { error: null, matches: found, highlighted: pieces, re }
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Invalid regex', matches: [], highlighted: [] }
    }
  }, [pattern, flags, text])

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Regex Tester</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Test a regular expression against sample text.</p>

      <div className="mt-8 flex gap-2">
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="Pattern"
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <input
          type="text"
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          placeholder="flags"
          className="w-20 rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <div className="mt-4 rounded-lg border border-slate-200 p-4 text-sm leading-relaxed whitespace-pre-wrap dark:border-slate-800">
        {highlighted.map((p, i) => (
          <span key={i} className={p.match ? 'bg-yellow-200 dark:bg-yellow-900' : ''}>{p.text}</span>
        ))}
      </div>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{matches.length} match{matches.length === 1 ? '' : 'es'}</p>
    </div>
  )
}
