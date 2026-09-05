import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function TextSorter() {
  useDocumentMeta('Text Line Sorter Free Online | MergeDoc', 'Sort, deduplicate, and clean up a list of lines instantly, entirely in your browser.')
  const toast = useToast()
  const [text, setText] = useState('banana\napple\ncherry\napple')

  function apply(fn: (lines: string[]) => string[]) {
    const lines = text.split('\n')
    setText(fn(lines).join('\n'))
  }

  async function copy() {
    await navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Text Line Sorter</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Sort, deduplicate, and clean up a list of lines.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => apply((l) => [...l].sort((a, b) => a.localeCompare(b)))} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
          Sort A→Z
        </button>
        <button onClick={() => apply((l) => [...l].sort((a, b) => b.localeCompare(a)))} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
          Sort Z→A
        </button>
        <button onClick={() => apply((l) => [...new Set(l)])} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
          Remove duplicates
        </button>
        <button onClick={() => apply((l) => l.map((line) => line.trim()).filter(Boolean))} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
          Trim & remove blanks
        </button>
        <button onClick={() => apply((l) => [...l].reverse())} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
          Reverse order
        </button>
      </div>

      <button onClick={copy} className="mt-4 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
        Copy
      </button>
    </div>
  )
}
