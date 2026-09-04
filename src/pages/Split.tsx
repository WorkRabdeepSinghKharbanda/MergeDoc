import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { downloadBlob, splitPdf } from '../lib/pdf'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function Split() {
  useDocumentMeta(
    'Split PDF Free Online | MergeDoc',
    'Extract specific pages or ranges from a PDF into a new file, entirely in your browser.',
  )
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [ranges, setRanges] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSplit() {
    if (!file) return
    setBusy(true)
    try {
      const bytes = await splitPdf(file, ranges || '1-')
      downloadBlob(bytes, `${file.name.replace(/\.pdf$/i, '')}-split.pdf`)
      toast.success('Split PDF downloaded.')
    } catch {
      toast.error('Could not split this PDF. Check your page ranges and try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Split PDF</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Extract specific pages into a new PDF.</p>

      <div className="mt-8">
        <FileDropzone onFiles={(files) => setFile(files[0])} label={file ? file.name : 'Click or drop a PDF here'} />
      </div>

      <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Pages to extract
        <input
          type="text"
          value={ranges}
          onChange={(e) => setRanges(e.target.value)}
          placeholder="e.g. 1-3,5"
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
        />
      </label>

      <button
        onClick={handleSplit}
        disabled={!file || !ranges.trim() || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Splitting…' : 'Split PDF'}
      </button>
    </div>
  )
}
