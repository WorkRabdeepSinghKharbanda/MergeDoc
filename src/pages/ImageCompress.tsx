import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { compressImage } from '../lib/image'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function ImageCompress() {
  useDocumentMeta(
    'Image Compressor Free Online | MergeDoc',
    'Shrink JPG or PNG file size by re-encoding at your chosen quality, entirely in your browser.',
  )
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [quality, setQuality] = useState(0.7)
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<{ before: number; after: number } | null>(null)

  function pick(fileList: FileList | null) {
    const f = fileList?.[0]
    if (!f || (f.type !== 'image/jpeg' && f.type !== 'image/png')) return
    setFile(f)
    setResult(null)
  }

  async function handleCompress() {
    if (!file) return
    setBusy(true)
    try {
      const blob = await compressImage(file, quality)
      setResult({ before: file.size, after: blob.size })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${file.name.replace(/\.\w+$/, '')}-compressed.jpg`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('Compressed image downloaded.')
    } catch {
      toast.error('Could not compress this image.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Image Compressor</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Shrink a JPG or PNG's file size.</p>

      <div
        onClick={() => document.getElementById('image-compress-input')?.click()}
        className="mt-8 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
      >
        <p className="font-medium text-slate-700 dark:text-slate-200">{file ? file.name : 'Click to choose a JPG or PNG'}</p>
        <p className="text-sm text-slate-400 dark:text-slate-500">Files never leave your browser</p>
        <input
          id="image-compress-input"
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e) => {
            pick(e.target.files)
            e.target.value = ''
          }}
          className="hidden"
        />
      </div>

      <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Quality ({Math.round(quality * 100)}%)
        <input
          type="range"
          min={0.1}
          max={1}
          step={0.05}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="mt-2 w-full"
        />
      </label>

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
        {busy ? 'Compressing…' : 'Compress image'}
      </button>
    </div>
  )
}
