import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function UuidGenerator() {
  useDocumentMeta('UUID Generator Free Online | MergeDoc', 'Generate random UUID v4 identifiers instantly, entirely in your browser.')
  const toast = useToast()
  const [count, setCount] = useState(5)
  const [uuids, setUuids] = useState<string[]>([])

  function generate() {
    setUuids(Array.from({ length: count }, () => crypto.randomUUID()))
  }

  async function copyAll() {
    if (uuids.length === 0) return
    await navigator.clipboard.writeText(uuids.join('\n'))
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">UUID Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Generate random UUID v4 identifiers.</p>

      <label className="mt-8 block text-sm font-medium text-slate-700 dark:text-slate-300">
        How many? ({count})
        <input type="range" min={1} max={50} value={count} onChange={(e) => setCount(Number(e.target.value))} className="mt-1.5 w-full" />
      </label>

      <button onClick={generate} className="mt-4 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
        Generate
      </button>

      {uuids.length > 0 && (
        <>
          <textarea readOnly value={uuids.join('\n')} rows={Math.min(uuids.length, 15)} className="mt-6 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900" />
          <button onClick={copyAll} className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
            Copy all
          </button>
        </>
      )}
    </div>
  )
}
