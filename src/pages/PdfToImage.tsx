import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { renderPagesToImages } from '../lib/pdfjs'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function PdfToImage() {
  useDocumentMeta(
    'PDF to Image (JPG) Free Online | MergeDoc',
    'Convert every page of a PDF into a JPG image, entirely in your browser.',
  )
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleConvert() {
    if (!file) return
    setBusy(true)
    try {
      const images = await renderPagesToImages(file)
      const base = file.name.replace(/\.pdf$/i, '')
      images.forEach((blob, i) => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${base}-page-${i + 1}.jpg`
        a.click()
        URL.revokeObjectURL(url)
      })
      toast.success(`${images.length} image${images.length === 1 ? '' : 's'} downloaded.`)
    } catch {
      toast.error('Could not convert this PDF to images.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">PDF to Image</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Convert every page into a JPG image.</p>

      <div className="mt-8">
        <FileDropzone onFiles={(files) => setFile(files[0])} label={file ? file.name : 'Click or drop a PDF here'} />
      </div>

      <button
        onClick={handleConvert}
        disabled={!file || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Converting…' : 'Convert to images'}
      </button>
    </div>
  )
}
