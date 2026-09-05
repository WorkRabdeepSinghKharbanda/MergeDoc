import { useEffect, useRef, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function PlaceholderImage() {
  useDocumentMeta('Placeholder Image Generator Free Online | MergeDoc', 'Generate a placeholder image at any size and color, entirely in your browser.')
  const toast = useToast()
  const [width, setWidth] = useState(600)
  const [height, setHeight] = useState(400)
  const [bgColor, setBgColor] = useState('#94a3b8')
  const [textColor, setTextColor] = useState('#ffffff')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = textColor
    ctx.font = `${Math.max(16, Math.min(width, height) / 8)}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${width} × ${height}`, width / 2, height / 2)
  }, [width, height, bgColor, textColor])

  function download() {
    const canvas = canvasRef.current
    if (!canvas) return
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = `placeholder-${width}x${height}.png`
    a.click()
    toast.success('Placeholder image downloaded.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Placeholder Image Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Generate a placeholder image at any size and color.</p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Width
          <input type="number" min={1} value={width} onChange={(e) => setWidth(Math.max(1, Number(e.target.value)))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Height
          <input type="number" min={1} value={height} onChange={(e) => setHeight(Math.max(1, Number(e.target.value)))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Background color
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="mt-1.5 h-9 w-full cursor-pointer rounded border border-slate-300 dark:border-slate-700" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Text color
          <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="mt-1.5 h-9 w-full cursor-pointer rounded border border-slate-300 dark:border-slate-700" />
        </label>
      </div>

      <div className="mt-8 overflow-auto rounded-lg border border-slate-200 p-4 dark:border-slate-800">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>

      <button onClick={download} className="mt-6 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
        Download PNG
      </button>
    </div>
  )
}
