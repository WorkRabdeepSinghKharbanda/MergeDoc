import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { resizeImage } from '../lib/image'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const SIZES = [16, 32, 48, 180, 192, 512]

type Generated = { size: number; url: string }

export default function FaviconGenerator() {
  useDocumentMeta('Favicon Generator Free Online | MergeDoc', 'Generate favicon PNGs in every common size from one image, entirely in your browser.')
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [icons, setIcons] = useState<Generated[]>([])
  const [busy, setBusy] = useState(false)

  function pick(fileList: FileList | null) {
    const f = fileList?.[0]
    if (!f || (f.type !== 'image/jpeg' && f.type !== 'image/png')) return
    setFile(f)
    setIcons((prev) => {
      prev.forEach((icon) => URL.revokeObjectURL(icon.url))
      return []
    })
  }

  async function handleGenerate() {
    if (!file) return
    setBusy(true)
    try {
      icons.forEach((icon) => URL.revokeObjectURL(icon.url))
      const results = await Promise.all(
        SIZES.map(async (size) => ({ size, url: URL.createObjectURL(await resizeImage(file, size, size)) })),
      )
      setIcons(results)
      toast.success('Favicons generated.')
    } catch {
      toast.error('Could not generate favicons from this image.')
    } finally {
      setBusy(false)
    }
  }

  function download(icon: Generated) {
    const a = document.createElement('a')
    a.href = icon.url
    a.download = `favicon-${icon.size}x${icon.size}.png`
    a.click()
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Favicon Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Generate favicon PNGs in every common size from one square image.</p>

      <div
        onClick={() => document.getElementById('favicon-input')?.click()}
        className="mt-8 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
      >
        <p className="font-medium text-slate-700 dark:text-slate-200">{file ? file.name : 'Click to choose a JPG or PNG'}</p>
        <p className="text-sm text-slate-400 dark:text-slate-500">Files never leave your browser</p>
        <input
          id="favicon-input"
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e) => {
            pick(e.target.files)
            e.target.value = ''
          }}
          className="hidden"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={!file || busy}
        className="mt-6 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Generating…' : 'Generate favicons'}
      </button>

      {icons.length > 0 && (
        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {icons.map((icon) => (
            <button key={icon.size} onClick={() => download(icon)} className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-3 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
              <img src={icon.url} alt={`${icon.size}x${icon.size}`} className="h-10 w-10" />
              <span className="text-xs text-slate-500 dark:text-slate-400">{icon.size}px</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
