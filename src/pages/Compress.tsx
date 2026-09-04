import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { compressPdf, downloadBlob } from '../lib/pdf'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function Compress() {
  useDocumentMeta(
    'Compress PDF Free Online | MergeDoc',
    'Shrink a PDF file size for easier sharing, entirely in your browser.',
  )
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<{ before: number; after: number } | null>(null)

  async function handleCompress() {
    if (!file) return
    setBusy(true)
    setResult(null)
    try {
      const bytes = await compressPdf(file)
      setResult({ before: file.size, after: bytes.byteLength })
      downloadBlob(bytes, `${file.name.replace(/\.pdf$/i, '')}-compressed.pdf`)
      toast.success('Compressed PDF downloaded.')
    } catch {
      toast.error('Could not compress this PDF.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Compress PDF</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Reduce file size for easier sharing.</p>

      <div className="mt-8">
        <FileDropzone
          onFiles={(files) => {
            setFile(files[0])
            setResult(null)
          }}
          label={file ? file.name : 'Click or drop a PDF here'}
        />
      </div>

      {result && (
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          {(result.before / 1024).toFixed(0)} KB → {(result.after / 1024).toFixed(0)} KB
        </p>
      )}

      <button
        onClick={handleCompress}
        disabled={!file || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Compressing…' : 'Compress PDF'}
      </button>
    </div>
  )
}
