import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { csvToJson, jsonToCsv } from '../lib/csv'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function CsvJsonConverter() {
  useDocumentMeta('CSV to JSON Converter Free Online | MergeDoc', 'Convert CSV to JSON or JSON to CSV instantly, entirely in your browser.')
  const toast = useToast()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  function toJson() {
    try {
      setOutput(JSON.stringify(csvToJson(input), null, 2))
    } catch {
      toast.error('Could not parse this CSV.')
    }
  }

  function toCsv() {
    try {
      const parsed = JSON.parse(input)
      if (!Array.isArray(parsed)) throw new Error('not an array')
      setOutput(jsonToCsv(parsed))
    } catch {
      toast.error('Input must be a JSON array of objects.')
    }
  }

  async function copyOutput() {
    if (!output) return
    await navigator.clipboard.writeText(output)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">CSV ⇄ JSON Converter</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Paste CSV or a JSON array of objects to convert between them.</p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="name,age&#10;Alice,30&#10;Bob,25"
        rows={8}
        spellCheck={false}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <div className="mt-4 flex gap-3">
        <button onClick={toJson} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
          CSV → JSON
        </button>
        <button onClick={toCsv} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
          JSON → CSV
        </button>
      </div>

      {output && (
        <div className="mt-6">
          <textarea readOnly value={output} rows={10} spellCheck={false} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900" />
          <button onClick={copyOutput} className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
            Copy
          </button>
        </div>
      )}
    </div>
  )
}
