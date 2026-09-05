import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { convertImageFormat } from '../lib/image'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const FORMATS = [
  { label: 'PNG', mime: 'image/png' as const, ext: 'png' },
  { label: 'JPEG', mime: 'image/jpeg' as const, ext: 'jpg' },
  { label: 'WebP', mime: 'image/webp' as const, ext: 'webp' },
]

export default function ImageConverter() {
  useDocumentMeta('Image Format Converter Free Online | MergeDoc', 'Convert images between PNG, JPEG, and WebP, entirely in your browser.')
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [format, setFormat] = useState(FORMATS[2])
  const [busy, setBusy] = useState(false)

  function pick(fileList: FileList | null) {
    const f = fileList?.[0]
    if (!f || !f.type.startsWith('image/')) return
    setFile(f)
  }

  async function handleConvert() {
    if (!file) return
    setBusy(true)
    try {
      const blob = await convertImageFormat(file, format.mime)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${file.name.replace(/\.\w+$/, '')}.${format.ext}`
      a.click()
      URL.revokeObjectURL(url)
      toast.success(`Converted to ${format.label}.`)
    } catch {
      toast.error(`Could not convert to ${format.label}. Your browser may not support this format.`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Image Format Converter</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Convert an image between PNG, JPEG, and WebP.</p>

      <div
        onClick={() => document.getElementById('image-convert-input')?.click()}
        className="mt-8 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
      >
        <p className="font-medium text-slate-700 dark:text-slate-200">{file ? file.name : 'Click to choose an image'}</p>
        <p className="text-sm text-slate-400 dark:text-slate-500">Files never leave your browser</p>
        <input
          id="image-convert-input"
          type="file"
          accept="image/*"
          onChange={(e) => {
            pick(e.target.files)
            e.target.value = ''
          }}
          className="hidden"
        />
      </div>

      <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Convert to
        <select
          value={format.mime}
          onChange={(e) => setFormat(FORMATS.find((f) => f.mime === e.target.value) ?? FORMATS[0])}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          {FORMATS.map((f) => <option key={f.mime} value={f.mime}>{f.label}</option>)}
        </select>
      </label>

      <button
        onClick={handleConvert}
        disabled={!file || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Converting…' : 'Convert & download'}
      </button>
    </div>
  )
}
