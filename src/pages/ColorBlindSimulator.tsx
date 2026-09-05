import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { simulateColorBlindness, type ColorBlindType } from '../lib/colorblind'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const TYPES: { value: ColorBlindType; label: string }[] = [
  { value: 'protanopia', label: 'Protanopia (red-blind)' },
  { value: 'deuteranopia', label: 'Deuteranopia (green-blind)' },
  { value: 'tritanopia', label: 'Tritanopia (blue-blind)' },
]

export default function ColorBlindSimulator() {
  useDocumentMeta('Color Blindness Simulator Free Online | MergeDoc', 'Preview how an image looks to people with color vision deficiencies, entirely in your browser.')
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [original, setOriginal] = useState<string | null>(null)
  const [type, setType] = useState<ColorBlindType>('deuteranopia')
  const [result, setResult] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  function pick(fileList: FileList | null) {
    const f = fileList?.[0]
    if (!f || !f.type.startsWith('image/')) return
    setFile(f)
    setOriginal((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(f)
    })
    setResult(null)
  }

  async function handleSimulate() {
    if (!file) return
    setBusy(true)
    try {
      setResult(await simulateColorBlindness(file, type))
    } catch {
      toast.error('Could not process this image.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">Color Blindness Simulator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Preview how an image looks under common color vision deficiencies.</p>

      <div
        onClick={() => document.getElementById('colorblind-input')?.click()}
        className="mt-8 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
      >
        <p className="font-medium text-slate-700 dark:text-slate-200">{file ? file.name : 'Click to choose an image'}</p>
        <p className="text-sm text-slate-400 dark:text-slate-500">Files never leave your browser</p>
        <input
          id="colorblind-input"
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
        Simulation type
        <select value={type} onChange={(e) => setType(e.target.value as ColorBlindType)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
          {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </label>

      <button
        onClick={handleSimulate}
        disabled={!file || busy}
        className="mt-6 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Processing…' : 'Simulate'}
      </button>

      {original && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Original</p>
            <img src={original} alt="Original" className="w-full rounded-lg border border-slate-200 dark:border-slate-800" />
          </div>
          {result && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Simulated</p>
              <img src={result} alt="Simulated" className="w-full rounded-lg border border-slate-200 dark:border-slate-800" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
