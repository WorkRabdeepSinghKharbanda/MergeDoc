import { useMemo, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function CssGradientGenerator() {
  useDocumentMeta('CSS Gradient Generator Free Online | MergeDoc', 'Design a linear or radial CSS gradient with a live preview, entirely in your browser.')
  const toast = useToast()
  const [type, setType] = useState<'linear' | 'radial'>('linear')
  const [angle, setAngle] = useState(90)
  const [colorA, setColorA] = useState('#4f46e5')
  const [colorB, setColorB] = useState('#ec4899')

  const css = useMemo(
    () => (type === 'linear' ? `linear-gradient(${angle}deg, ${colorA}, ${colorB})` : `radial-gradient(circle, ${colorA}, ${colorB})`),
    [type, angle, colorA, colorB],
  )

  async function copy() {
    await navigator.clipboard.writeText(`background: ${css};`)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">CSS Gradient Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Design a gradient and copy the CSS.</p>

      <div className="mt-8 h-48 w-full rounded-lg border border-slate-200 dark:border-slate-800" style={{ background: css }} />

      <div className="mt-6 flex gap-2">
        {(['linear', 'radial'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${type === t ? 'bg-indigo-600 text-white' : 'border border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {type === 'linear' && (
        <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Angle: {angle}°
          <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="mt-1.5 w-full" />
        </label>
      )}

      <div className="mt-6 flex items-center gap-6">
        <label className="text-sm text-slate-600 dark:text-slate-400">
          Color A
          <input type="color" value={colorA} onChange={(e) => setColorA(e.target.value)} className="ml-2 h-9 w-14 cursor-pointer rounded border border-slate-300 align-middle dark:border-slate-700" />
        </label>
        <label className="text-sm text-slate-600 dark:text-slate-400">
          Color B
          <input type="color" value={colorB} onChange={(e) => setColorB(e.target.value)} className="ml-2 h-9 w-14 cursor-pointer rounded border border-slate-300 align-middle dark:border-slate-700" />
        </label>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 p-3 font-mono text-sm dark:border-slate-800">
        <span className="flex-1 break-all">background: {css};</span>
        <button onClick={copy} className="shrink-0 rounded px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950">
          Copy
        </button>
      </div>
    </div>
  )
}
