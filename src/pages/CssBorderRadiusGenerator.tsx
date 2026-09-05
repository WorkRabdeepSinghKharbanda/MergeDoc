import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function CssBorderRadiusGenerator() {
  useDocumentMeta('CSS Border Radius Generator Free Online | MergeDoc', 'Design a CSS border-radius per corner with a live preview, entirely in your browser.')
  const toast = useToast()
  const [tl, setTl] = useState(16)
  const [tr, setTr] = useState(16)
  const [br, setBr] = useState(16)
  const [bl, setBl] = useState(16)

  const css = `${tl}px ${tr}px ${br}px ${bl}px`

  async function copy() {
    await navigator.clipboard.writeText(`border-radius: ${css};`)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">CSS Border Radius Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Design a per-corner border radius and copy the CSS.</p>

      <div className="mt-8 flex h-48 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900">
        <div className="h-32 w-32 bg-indigo-600" style={{ borderRadius: `${tl}px ${tr}px ${br}px ${bl}px` }} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Top-left: {tl}px
          <input type="range" min={0} max={100} value={tl} onChange={(e) => setTl(Number(e.target.value))} className="mt-1.5 w-full" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Top-right: {tr}px
          <input type="range" min={0} max={100} value={tr} onChange={(e) => setTr(Number(e.target.value))} className="mt-1.5 w-full" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Bottom-right: {br}px
          <input type="range" min={0} max={100} value={br} onChange={(e) => setBr(Number(e.target.value))} className="mt-1.5 w-full" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Bottom-left: {bl}px
          <input type="range" min={0} max={100} value={bl} onChange={(e) => setBl(Number(e.target.value))} className="mt-1.5 w-full" />
        </label>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 p-3 font-mono text-sm dark:border-slate-800">
        <span className="flex-1 break-all">border-radius: {css};</span>
        <button onClick={copy} className="shrink-0 rounded px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950">
          Copy
        </button>
      </div>
    </div>
  )
}
