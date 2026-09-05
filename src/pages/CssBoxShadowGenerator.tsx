import { useMemo, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function CssBoxShadowGenerator() {
  useDocumentMeta('CSS Box Shadow Generator Free Online | MergeDoc', 'Design a CSS box-shadow with a live preview, entirely in your browser.')
  const toast = useToast()
  const [x, setX] = useState(0)
  const [y, setY] = useState(10)
  const [blur, setBlur] = useState(20)
  const [spread, setSpread] = useState(-5)
  const [color, setColor] = useState('#000000')
  const [opacity, setOpacity] = useState(0.25)
  const [inset, setInset] = useState(false)

  const rgba = useMemo(() => {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }, [color, opacity])

  const css = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${rgba}`

  async function copy() {
    await navigator.clipboard.writeText(`box-shadow: ${css};`)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">CSS Box Shadow Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Design a box shadow and copy the CSS.</p>

      <div className="mt-8 flex h-48 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900">
        <div className="h-24 w-24 rounded-lg bg-white dark:bg-slate-800" style={{ boxShadow: css }} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Offset X: {x}px
          <input type="range" min={-50} max={50} value={x} onChange={(e) => setX(Number(e.target.value))} className="mt-1.5 w-full" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Offset Y: {y}px
          <input type="range" min={-50} max={50} value={y} onChange={(e) => setY(Number(e.target.value))} className="mt-1.5 w-full" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Blur: {blur}px
          <input type="range" min={0} max={100} value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="mt-1.5 w-full" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Spread: {spread}px
          <input type="range" min={-50} max={50} value={spread} onChange={(e) => setSpread(Number(e.target.value))} className="mt-1.5 w-full" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Opacity: {opacity.toFixed(2)}
          <input type="range" min={0} max={1} step={0.05} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="mt-1.5 w-full" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Color
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="mt-1.5 h-9 w-full cursor-pointer rounded border border-slate-300 dark:border-slate-700" />
        </label>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} />
        Inset
      </label>

      <div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 p-3 font-mono text-sm dark:border-slate-800">
        <span className="flex-1 break-all">box-shadow: {css};</span>
        <button onClick={copy} className="shrink-0 rounded px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950">
          Copy
        </button>
      </div>
    </div>
  )
}
