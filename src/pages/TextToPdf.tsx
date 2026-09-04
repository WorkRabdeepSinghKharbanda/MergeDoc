import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { downloadBlob, textToPdf } from '../lib/pdf'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function TextToPdf() {
  useDocumentMeta('Text to PDF Free Online | MergeDoc', 'Turn plain text into a downloadable PDF, entirely in your browser.')
  const toast = useToast()
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleConvert() {
    if (!text.trim()) return
    setBusy(true)
    try {
      const bytes = await textToPdf(text)
      downloadBlob(bytes, 'document.pdf')
      toast.success('PDF downloaded.')
    } catch {
      toast.error('Could not build a PDF from this text.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Text to PDF</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Paste text below to turn it into a PDF.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here…"
        rows={14}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
      />

      <button
        onClick={handleConvert}
        disabled={!text.trim() || busy}
        className="mt-6 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Building…' : 'Convert to PDF'}
      </button>
    </div>
  )
}
