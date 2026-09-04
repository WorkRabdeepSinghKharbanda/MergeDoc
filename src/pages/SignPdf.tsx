import { useEffect, useRef, useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { downloadBlob, signPdf } from '../lib/pdf'
import { renderThumbnail, getPageCount } from '../lib/pdfjs'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function SignPdf() {
  useDocumentMeta('Sign PDF Free Online | MergeDoc', 'Draw a signature and place it on a PDF page, entirely in your browser.')
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [pos, setPos] = useState({ x: 0.1, y: 0.85 })
  const [busy, setBusy] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)

  async function handleFile(files: File[]) {
    const f = files[0]
    setFile(f)
    try {
      const count = await getPageCount(f)
      setPageCount(count)
      setPageIndex(0)
      setThumbnail(await renderThumbnail(f, 0, 400))
    } catch {
      toast.error('Could not read this PDF.')
    }
  }

  useEffect(() => {
    if (!file || pageCount === 0) return
    renderThumbnail(file, pageIndex, 400).then(setThumbnail).catch(() => toast.error('Could not render page.'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex])

  function clearCanvas() {
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx && canvasRef.current) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  function startDraw(e: React.PointerEvent<HTMLCanvasElement>) {
    drawing.current = true
    draw(e)
  }
  function draw(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')!
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#1e293b'
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }
  function endDraw() {
    drawing.current = false
    canvasRef.current?.getContext('2d')?.beginPath()
  }

  async function handleSign() {
    if (!file || !canvasRef.current) return
    setBusy(true)
    try {
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvasRef.current!.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png'),
      )
      const bytes = new Uint8Array(await blob.arrayBuffer())
      const out = await signPdf(file, bytes, { pageIndex, xRatio: pos.x, yRatio: pos.y, widthRatio: 0.25 })
      downloadBlob(out, `${file.name.replace(/\.pdf$/i, '')}-signed.pdf`)
      toast.success('Signed PDF downloaded.')
    } catch {
      toast.error('Could not sign this PDF.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Sign PDF</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Draw your signature, then place it on a page.</p>

      <div className="mt-8">
        <FileDropzone onFiles={handleFile} label={file ? file.name : 'Click or drop a PDF here'} />
      </div>

      {file && pageCount > 0 && (
        <>
          <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Page to sign
            <select
              value={pageIndex}
              onChange={(e) => setPageIndex(Number(e.target.value))}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              {Array.from({ length: pageCount }, (_, i) => (
                <option key={i} value={i}>Page {i + 1}</option>
              ))}
            </select>
          </label>

          {thumbnail && (
            <div className="relative mt-4 inline-block">
              <img src={thumbnail} alt="Page preview" className="rounded border border-slate-200 dark:border-slate-800" />
              <div
                className="absolute h-6 w-16 cursor-move border-2 border-dashed border-indigo-500 bg-indigo-100/50"
                style={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%` }}
                onClick={() => toast.success('Drag not wired — use sliders below to position.')}
              />
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-4">
            <label className="text-sm text-slate-600 dark:text-slate-400">
              Horizontal position
              <input type="range" min={0} max={0.9} step={0.01} value={pos.x} onChange={(e) => setPos((p) => ({ ...p, x: Number(e.target.value) }))} className="w-full" />
            </label>
            <label className="text-sm text-slate-600 dark:text-slate-400">
              Vertical position
              <input type="range" min={0} max={0.9} step={0.01} value={pos.y} onChange={(e) => setPos((p) => ({ ...p, y: Number(e.target.value) }))} className="w-full" />
            </label>
          </div>

          <p className="mt-6 text-sm font-medium text-slate-700 dark:text-slate-300">Draw your signature</p>
          <canvas
            ref={canvasRef}
            width={400}
            height={140}
            onPointerDown={startDraw}
            onPointerMove={draw}
            onPointerUp={endDraw}
            onPointerLeave={endDraw}
            className="mt-2 touch-none rounded-lg border border-slate-300 bg-white dark:border-slate-700"
          />
          <button onClick={clearCanvas} className="ml-3 text-sm text-slate-500 underline hover:text-slate-700 dark:text-slate-400">
            Clear
          </button>

          <button
            onClick={handleSign}
            disabled={busy}
            className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? 'Signing…' : 'Sign & download PDF'}
          </button>
        </>
      )}
    </div>
  )
}
