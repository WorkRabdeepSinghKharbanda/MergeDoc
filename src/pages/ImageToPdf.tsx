import { useRef, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { downloadBlob, imagesToPdf } from '../lib/pdf'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function ImageToPdf() {
  useDocumentMeta(
    'Image to PDF Free Online | MergeDoc',
    'Combine JPG or PNG images into a single PDF, entirely in your browser.',
  )
  const toast = useToast()
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [busy, setBusy] = useState(false)

  function pickImages(fileList: FileList | null) {
    if (!fileList) return
    const imgs = [...fileList].filter((f) => f.type === 'image/jpeg' || f.type === 'image/png')
    setFiles((prev) => [...prev, ...imgs])
  }

  async function handleConvert() {
    if (files.length === 0) return
    setBusy(true)
    try {
      const bytes = await imagesToPdf(files)
      downloadBlob(bytes, 'images.pdf')
      toast.success('PDF downloaded.')
    } catch {
      toast.error('Could not convert these images. Only JPG and PNG are supported.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Image to PDF</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Combine JPG or PNG images into one PDF.</p>

      <div
        onClick={() => inputRef.current?.click()}
        className="mt-8 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
      >
        <p className="font-medium text-slate-700 dark:text-slate-200">Click to add JPG/PNG images</p>
        <p className="text-sm text-slate-400 dark:text-slate-500">Files never leave your browser</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          multiple
          onChange={(e) => {
            pickImages(e.target.files)
            e.target.value = ''
          }}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-6 divide-y divide-slate-200 rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="flex items-center justify-between px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
              <span className="truncate">{file.name}</span>
              <button
                onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                className="rounded px-2 py-1 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleConvert}
        disabled={files.length === 0 || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Converting…' : `Convert ${files.length || ''} image${files.length === 1 ? '' : 's'} to PDF`}
      </button>
    </div>
  )
}
