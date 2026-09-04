import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function JsonFormatter() {
  useDocumentMeta('JSON Formatter & Validator Free Online | MergeDoc', 'Format, validate, and minify JSON instantly, entirely in your browser.')
  const toast = useToast()
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  function format(minify: boolean) {
    try {
      const parsed = JSON.parse(input)
      setInput(JSON.stringify(parsed, null, minify ? 0 : 2))
      setError(null)
      toast.success(minify ? 'Minified.' : 'Formatted.')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
      toast.error('Invalid JSON.')
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">JSON Formatter & Validator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Paste JSON to format, validate, or minify it.</p>

      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          setError(null)
        }}
        placeholder='{"example": true}'
        rows={14}
        spellCheck={false}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
      />

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      <div className="mt-4 flex gap-3">
        <button onClick={() => format(false)} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
          Format
        </button>
        <button onClick={() => format(true)} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
          Minify
        </button>
      </div>
    </div>
  )
}
