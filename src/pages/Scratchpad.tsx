import { useEffect, useState } from 'react'
import { readStorage, writeStorage } from '../lib/storage'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const STORAGE_KEY = 'mergedoc:scratchpad'

export default function Scratchpad() {
  useDocumentMeta('Scratchpad Free Online | MergeDoc', 'A notepad that autosaves to your browser, entirely in your browser.')
  const [text, setText] = useState(() => readStorage(STORAGE_KEY, ''))
  const [savedAt, setSavedAt] = useState<Date | null>(null)

  useEffect(() => {
    const id = setTimeout(() => {
      writeStorage(STORAGE_KEY, text)
      setSavedAt(new Date())
    }, 400)
    return () => clearTimeout(id)
  }, [text])

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Scratchpad</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Autosaves to your browser as you type — nothing is uploaded.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing…"
        rows={16}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      {savedAt && <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Saved at {savedAt.toLocaleTimeString()}</p>}
    </div>
  )
}
