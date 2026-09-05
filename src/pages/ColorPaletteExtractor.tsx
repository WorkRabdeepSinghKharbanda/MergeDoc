import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { extractPalette } from '../lib/colorPalette'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function ColorPaletteExtractor() {
  useDocumentMeta('Color Palette Extractor Free Online | MergeDoc', 'Extract the dominant colors from an image, entirely in your browser.')
  const toast = useToast()
  const [preview, setPreview] = useState<string | null>(null)
  const [palette, setPalette] = useState<string[]>([])
  const [busy, setBusy] = useState(false)

  async function pick(fileList: FileList | null) {
    const f = fileList?.[0]
    if (!f || !f.type.startsWith('image/')) return
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(f)
    })
    setBusy(true)
    try {
      setPalette(await extractPalette(f))
    } catch {
      toast.error('Could not process this image.')
    } finally {
      setBusy(false)
    }
  }

  async function copy(hex: string) {
    await navigator.clipboard.writeText(hex)
    toast.success(`${hex} copied.`)
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Color Palette Extractor</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Upload an image to extract its dominant colors.</p>

      <div
        onClick={() => document.getElementById('palette-input')?.click()}
        className="mt-8 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
      >
        <p className="font-medium text-slate-700 dark:text-slate-200">Click to choose an image</p>
        <p className="text-sm text-slate-400 dark:text-slate-500">Files never leave your browser</p>
        <input
          id="palette-input"
          type="file"
          accept="image/*"
          onChange={(e) => {
            pick(e.target.files)
            e.target.value = ''
          }}
          className="hidden"
        />
      </div>

      {preview && <img src={preview} alt="Uploaded" className="mx-auto mt-6 max-h-64 rounded-lg border border-slate-200 dark:border-slate-800" />}

      {busy && <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">Extracting…</p>}

      {palette.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {palette.map((hex) => (
            <button key={hex} onClick={() => copy(hex)} className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-2 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
              <div className="h-12 w-12 rounded" style={{ backgroundColor: hex }} />
              <span className="font-mono text-xs">{hex}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
