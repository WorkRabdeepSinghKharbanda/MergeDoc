import { useEffect, useRef, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { encodeCode128B, isCode128Printable } from '../lib/barcode'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function BarcodeGenerator() {
  useDocumentMeta('Barcode Generator Free Online | MergeDoc', 'Generate a Code 128 barcode from text, entirely in your browser.')
  const toast = useToast()
  const [text, setText] = useState('MERGEDOC123')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !text || !isCode128Printable(text)) return
    const bars = encodeCode128B(text)
    const moduleWidth = 2
    const height = 100
    const totalWidth = bars.reduce((sum, b) => sum + b.width, 0) * moduleWidth
    canvas.width = totalWidth + 40
    canvas.height = height + 40
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    let x = 20
    for (const bar of bars) {
      const w = bar.width * moduleWidth
      if (bar.isBar) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(x, 20, w, height)
      }
      x += w
    }
    ctx.fillStyle = '#000000'
    ctx.font = '14px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(text, canvas.width / 2, height + 35)
  }, [text])

  function download() {
    const canvas = canvasRef.current
    if (!canvas) return
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = 'barcode.png'
    a.click()
    toast.success('Barcode downloaded.')
  }

  const valid = isCode128Printable(text)

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Barcode Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Generate a Code 128 barcode from text.</p>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      {!valid && <p className="mt-2 text-sm text-red-500">Code 128 only supports printable ASCII characters.</p>}

      {valid && text && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <canvas ref={canvasRef} className="max-w-full rounded-lg border border-slate-200 dark:border-slate-800" />
          <button onClick={download} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Download PNG
          </button>
        </div>
      )}
    </div>
  )
}
