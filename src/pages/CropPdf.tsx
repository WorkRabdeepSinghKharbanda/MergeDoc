import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { cropPdf, downloadBlob } from '../lib/pdf'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function CropPdf() {
  useDocumentMeta('Crop PDF Free Online | MergeDoc', 'Trim margins from every page of a PDF, entirely in your browser.')
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [inset, setInset] = useState({ top: 20, right: 20, bottom: 20, left: 20 })
  const [busy, setBusy] = useState(false)

  async function handleCrop() {
    if (!file) return
    setBusy(true)
    try {
      const bytes = await cropPdf(file, inset)
      downloadBlob(bytes, `${file.name.replace(/\.pdf$/i, '')}-cropped.pdf`)
      toast.success('Cropped PDF downloaded.')
    } catch {
      toast.error('Could not crop this PDF.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Crop PDF</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Trim margins from every page (in points, 72 per inch).</p>

      <div className="mt-8">
        <FileDropzone onFiles={(files) => setFile(files[0])} label={file ? file.name : 'Click or drop a PDF here'} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <label key={side} className="text-sm font-medium capitalize text-slate-700 dark:text-slate-300">
            {side} margin
            <input
              type="number"
              min={0}
              value={inset[side]}
              onChange={(e) => setInset((prev) => ({ ...prev, [side]: Math.max(0, Number(e.target.value)) }))}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
        ))}
      </div>

      <button
        onClick={handleCrop}
        disabled={!file || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Cropping…' : 'Crop PDF'}
      </button>
    </div>
  )
}
