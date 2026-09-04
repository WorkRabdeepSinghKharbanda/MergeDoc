import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { addPageNumbers, downloadBlob } from '../lib/pdf'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const POSITIONS = ['bottom-left', 'bottom-center', 'bottom-right'] as const

export default function AddPageNumbers() {
  useDocumentMeta('Add Page Numbers to PDF Free Online | MergeDoc', 'Stamp page numbers onto every page of a PDF, entirely in your browser.')
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [position, setPosition] = useState<(typeof POSITIONS)[number]>('bottom-center')
  const [startAt, setStartAt] = useState(1)
  const [busy, setBusy] = useState(false)

  async function handleAdd() {
    if (!file) return
    setBusy(true)
    try {
      const bytes = await addPageNumbers(file, { position, startAt })
      downloadBlob(bytes, `${file.name.replace(/\.pdf$/i, '')}-numbered.pdf`)
      toast.success('Numbered PDF downloaded.')
    } catch {
      toast.error('Could not add page numbers to this PDF.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Add Page Numbers</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Stamp page numbers onto every page.</p>

      <div className="mt-8">
        <FileDropzone onFiles={(files) => setFile(files[0])} label={file ? file.name : 'Click or drop a PDF here'} />
      </div>

      <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Position
        <select value={position} onChange={(e) => setPosition(e.target.value as typeof position)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm capitalize dark:border-slate-700 dark:bg-slate-900">
          {POSITIONS.map((p) => <option key={p} value={p}>{p.replace('-', ' ')}</option>)}
        </select>
      </label>

      <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Start at
        <input
          type="number"
          min={1}
          value={startAt}
          onChange={(e) => setStartAt(Math.max(1, Number(e.target.value)))}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
      </label>

      <button
        onClick={handleAdd}
        disabled={!file || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Adding…' : 'Add page numbers'}
      </button>
    </div>
  )
}
