import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { downloadBlob, readPdfMetadata, setPdfMetadata } from '../lib/pdf'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function Metadata() {
  useDocumentMeta(
    'Edit PDF Metadata Free Online | MergeDoc',
    'View and edit a PDF’s title, author, subject, and keywords, entirely in your browser.',
  )
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [fields, setFields] = useState({ title: '', author: '', subject: '', keywords: '' })
  const [busy, setBusy] = useState(false)

  async function handleFile(files: File[]) {
    const f = files[0]
    setFile(f)
    try {
      setFields(await readPdfMetadata(f))
    } catch {
      toast.error('Could not read metadata from this PDF.')
    }
  }

  async function handleSave() {
    if (!file) return
    setBusy(true)
    try {
      const bytes = await setPdfMetadata(file, fields)
      downloadBlob(bytes, `${file.name.replace(/\.pdf$/i, '')}-updated.pdf`)
      toast.success('Metadata updated, PDF downloaded.')
    } catch {
      toast.error('Could not update metadata on this PDF.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Edit PDF Metadata</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">View and edit a PDF's title, author, subject, and keywords.</p>

      <div className="mt-8">
        <FileDropzone onFiles={handleFile} label={file ? file.name : 'Click or drop a PDF here'} />
      </div>

      <div className="mt-6 space-y-4">
        {(['title', 'author', 'subject', 'keywords'] as const).map((field) => (
          <label key={field} className="block text-sm font-medium capitalize text-slate-700 dark:text-slate-300">
            {field}
            <input
              type="text"
              value={fields[field]}
              onChange={(e) => setFields((prev) => ({ ...prev, [field]: e.target.value }))}
              placeholder={field === 'keywords' ? 'comma, separated' : undefined}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={!file || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Saving…' : 'Save & download'}
      </button>
    </div>
  )
}
