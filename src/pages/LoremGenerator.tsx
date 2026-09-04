import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { generateLorem } from '../lib/lorem'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function LoremGenerator() {
  useDocumentMeta('Lorem Ipsum Generator Free Online | MergeDoc', 'Generate placeholder Lorem Ipsum text instantly, entirely in your browser.')
  const toast = useToast()
  const [paragraphs, setParagraphs] = useState(3)
  const [text, setText] = useState('')

  function generate() {
    setText(generateLorem(paragraphs))
  }

  async function copyText() {
    if (!text) return
    await navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Lorem Ipsum Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Generate placeholder text for mockups and layouts.</p>

      <label className="mt-8 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Paragraphs ({paragraphs})
        <input type="range" min={1} max={10} value={paragraphs} onChange={(e) => setParagraphs(Number(e.target.value))} className="mt-1.5 w-full" />
      </label>

      <button onClick={generate} className="mt-4 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
        Generate
      </button>

      {text && (
        <>
          <textarea readOnly value={text} rows={14} className="mt-6 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          <button onClick={copyText} className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
            Copy
          </button>
        </>
      )}
    </div>
  )
}
