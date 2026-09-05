import { useMemo, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { toMarkdownTable } from '../lib/markdownTable'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function MarkdownTableGenerator() {
  useDocumentMeta('Markdown Table Generator Free Online | MergeDoc', 'Convert comma or tab separated data into a Markdown table, entirely in your browser.')
  const toast = useToast()
  const [input, setInput] = useState('Name, Role, Location\nAlice, Engineer, Remote\nBob, Designer, NYC')

  const table = useMemo(() => toMarkdownTable(input), [input])

  async function copy() {
    if (!table) return
    await navigator.clipboard.writeText(table)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Markdown Table Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Paste comma or tab separated data — first line is the header.</p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <pre className="mt-6 overflow-x-auto rounded-lg border border-slate-200 p-4 font-mono text-sm dark:border-slate-800">{table}</pre>

      <button onClick={copy} className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
        Copy
      </button>
    </div>
  )
}
