import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { downloadBlob, rotatePdf } from '../lib/pdf'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const ANGLES = [90, 180, 270] as const

export default function Rotate() {
  useDocumentMeta(
    'Rotate PDF Free Online | MergeDoc',
    'Rotate every page of a PDF by 90, 180, or 270 degrees, entirely in your browser.',
  )
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [angle, setAngle] = useState<(typeof ANGLES)[number]>(90)
  const [busy, setBusy] = useState(false)

  async function handleRotate() {
    if (!file) return
    setBusy(true)
    try {
      const bytes = await rotatePdf(file, angle)
      downloadBlob(bytes, `${file.name.replace(/\.pdf$/i, '')}-rotated.pdf`)
      toast.success('Rotated PDF downloaded.')
    } catch {
      toast.error('Could not rotate this PDF.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Rotate PDF</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Rotate every page by a fixed angle.</p>

      <div className="mt-8">
        <FileDropzone onFiles={(files) => setFile(files[0])} label={file ? file.name : 'Click or drop a PDF here'} />
      </div>

      <div className="mt-6 flex gap-2">
        {ANGLES.map((a) => (
          <button
            key={a}
            onClick={() => setAngle(a)}
            className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium ${
              angle === a
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                : 'border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-900'
            }`}
          >
            {a}°
          </button>
        ))}
      </div>

      <button
        onClick={handleRotate}
        disabled={!file || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Rotating…' : 'Rotate PDF'}
      </button>
    </div>
  )
}
