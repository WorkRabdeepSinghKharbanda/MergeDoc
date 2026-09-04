import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { resizeImage } from '../lib/image'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function ImageResizer() {
  useDocumentMeta('Image Resizer Free Online | MergeDoc', 'Resize a JPG or PNG to exact dimensions, entirely in your browser.')
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [lockRatio, setLockRatio] = useState(true)
  const [ratio, setRatio] = useState(1)
  const [busy, setBusy] = useState(false)

  function pick(fileList: FileList | null) {
    const f = fileList?.[0]
    if (!f || (f.type !== 'image/jpeg' && f.type !== 'image/png')) return
    setFile(f)
    const img = new Image()
    img.onload = () => {
      setWidth(img.width)
      setHeight(img.height)
      setRatio(img.width / img.height)
    }
    img.src = URL.createObjectURL(f)
  }

  function handleWidth(next: number) {
    setWidth(next)
    if (lockRatio) setHeight(Math.round(next / ratio))
  }

  function handleHeight(next: number) {
    setHeight(next)
    if (lockRatio) setWidth(Math.round(next * ratio))
  }

  async function handleResize() {
    if (!file) return
    setBusy(true)
    try {
      const blob = await resizeImage(file, width, height)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${file.name.replace(/\.\w+$/, '')}-resized.${file.type === 'image/png' ? 'png' : 'jpg'}`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('Resized image downloaded.')
    } catch {
      toast.error('Could not resize this image.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Image Resizer</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Resize a JPG or PNG to exact dimensions.</p>

      <div
        onClick={() => document.getElementById('image-resize-input')?.click()}
        className="mt-8 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
      >
        <p className="font-medium text-slate-700 dark:text-slate-200">{file ? file.name : 'Click to choose a JPG or PNG'}</p>
        <p className="text-sm text-slate-400 dark:text-slate-500">Files never leave your browser</p>
        <input
          id="image-resize-input"
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e) => {
            pick(e.target.files)
            e.target.value = ''
          }}
          className="hidden"
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Width (px)
          <input type="number" min={1} value={width} onChange={(e) => handleWidth(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Height (px)
          <input type="number" min={1} value={height} onChange={(e) => handleHeight(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
      </div>

      <label className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <input type="checkbox" checked={lockRatio} onChange={(e) => setLockRatio(e.target.checked)} />
        Lock aspect ratio
      </label>

      <button
        onClick={handleResize}
        disabled={!file || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Resizing…' : 'Resize & download'}
      </button>
    </div>
  )
}
