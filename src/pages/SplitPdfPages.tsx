import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { downloadBlob, splitPdfToPages } from '../lib/pdf'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function SplitPdfPages() {
  useDocumentMeta('Split PDF into Individual Pages Free Online | MergeDoc', 'Split every page of a PDF into its own separate file, entirely in your browser.')
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleSplit() {
    if (!file) return
    setBusy(true)
    try {
      const pages = await splitPdfToPages(file)
      const base = file.name.replace(/\.pdf$/i, '')
      pages.forEach((bytes, i) => downloadBlob(bytes, `${base}-page-${i + 1}.pdf`))
      toast.success(`Downloaded ${pages.length} page${pages.length === 1 ? '' : 's'}.`)
    } catch {
      toast.error('Could not split this PDF.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Split PDF into Individual Pages</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Each page downloads as its own separate PDF file.</p>

      <div className="mt-8">
        <FileDropzone onFiles={(files) => setFile(files[0])} label={file ? file.name : 'Click or drop a PDF here'} />
      </div>

      <button
        onClick={handleSplit}
        disabled={!file || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Splitting…' : 'Split into individual pages'}
      </button>
    </div>
  )
}
