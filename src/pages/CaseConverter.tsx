import { useState } from 'react'
import { CASE_CONVERTERS } from '../lib/caseConvert'
import { useToast } from '../components/ToastProvider'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function CaseConverter() {
  useDocumentMeta('Case Converter Free Online | MergeDoc', 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, and more, entirely in your browser.')
  const toast = useToast()
  const [text, setText] = useState('')

  async function copy(value: string) {
    await navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Case Converter</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Convert text between common casing styles.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text here…"
        rows={5}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <div className="mt-6 space-y-3">
        {Object.entries(CASE_CONVERTERS).map(([label, convert]) => (
          <div key={label} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{label}</p>
              <p className="mt-1 break-all text-sm">{text ? convert(text) : '—'}</p>
            </div>
            <button
              onClick={() => copy(convert(text))}
              disabled={!text}
              className="shrink-0 rounded px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 disabled:opacity-40 dark:hover:bg-indigo-950"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
