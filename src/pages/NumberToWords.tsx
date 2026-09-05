import { useMemo, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { numberToWords } from '../lib/numberWords'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function NumberToWords() {
  useDocumentMeta('Number to Words Converter Free Online | MergeDoc', 'Convert a number into its written-out English words, entirely in your browser.')
  const toast = useToast()
  const [value, setValue] = useState('123456')

  const words = useMemo(() => {
    const n = Number(value)
    return Number.isFinite(n) ? numberToWords(n) : null
  }, [value])

  async function copy() {
    if (!words) return
    await navigator.clipboard.writeText(words)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Number to Words Converter</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Convert a number into written-out English words.</p>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      {words ? (
        <div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 p-4 capitalize dark:border-slate-800">
          <span className="flex-1">{words}</span>
          <button onClick={copy} className="shrink-0 rounded px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950">
            Copy
          </button>
        </div>
      ) : (
        <p className="mt-6 text-sm text-red-500">Enter a valid number.</p>
      )}
    </div>
  )
}
