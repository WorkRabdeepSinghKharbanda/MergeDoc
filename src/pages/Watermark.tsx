import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { downloadBlob, watermarkPdf } from '../lib/pdf'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function Watermark() {
  useDocumentMeta(
    'Watermark PDF Free Online | MergeDoc',
    'Stamp a diagonal text watermark across every page of a PDF, entirely in your browser.',
  )
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('CONFIDENTIAL')
  const [busy, setBusy] = useState(false)

  async function handleWatermark() {
    if (!file || !text.trim()) return
    setBusy(true)
    try {
      const bytes = await watermarkPdf(file, text.trim())
      downloadBlob(bytes, `${file.name.replace(/\.pdf$/i, '')}-watermarked.pdf`)
      toast.success('Watermarked PDF downloaded.')
    } catch {
      toast.error('Could not watermark this PDF.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Watermark PDF</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Add a diagonal text watermark to every page.</p>

      <div className="mt-8">
        <FileDropzone onFiles={(files) => setFile(files[0])} label={file ? file.name : 'Click or drop a PDF here'} />
      </div>

      <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Watermark text
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
        />
      </label>

      <button
        onClick={handleWatermark}
        disabled={!file || !text.trim() || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Adding watermark…' : 'Watermark PDF'}
      </button>
    </div>
  )
}
