import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { downloadBlob, redactPdf, type RedactionBox } from '../lib/pdf'
import { renderThumbnail, getPageCount } from '../lib/pdfjs'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function RedactPdf() {
  useDocumentMeta('Redact PDF Free Online | MergeDoc', 'Black out sensitive regions of a PDF page before sharing, entirely in your browser.')
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [boxes, setBoxes] = useState<RedactionBox[]>([])
  const [draft, setDraft] = useState({ x: 0.1, y: 0.1, width: 0.3, height: 0.1 })
  const [busy, setBusy] = useState(false)

  async function handleFile(files: File[]) {
    const f = files[0]
    setFile(f)
    setBoxes([])
    try {
      const count = await getPageCount(f)
      setPageCount(count)
      setPageIndex(0)
      setThumbnail(await renderThumbnail(f, 0, 400))
    } catch {
      toast.error('Could not read this PDF.')
    }
  }

  async function changePage(index: number) {
    if (!file) return
    setPageIndex(index)
    try {
      setThumbnail(await renderThumbnail(file, index, 400))
    } catch {
      toast.error('Could not render page.')
    }
  }

  function addBox() {
    setBoxes((prev) => [...prev, { pageIndex, xRatio: draft.x, yRatio: draft.y, widthRatio: draft.width, heightRatio: draft.height }])
  }

  function removeBox(index: number) {
    setBoxes((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleRedact() {
    if (!file || boxes.length === 0) return
    setBusy(true)
    try {
      const bytes = await redactPdf(file, boxes)
      downloadBlob(bytes, `${file.name.replace(/\.pdf$/i, '')}-redacted.pdf`)
      toast.success('Redacted PDF downloaded.')
    } catch {
      toast.error('Could not redact this PDF.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Redact PDF</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Black out sensitive regions before sharing. Covers content visually — underlying text is not removed.</p>

      <div className="mt-8">
        <FileDropzone onFiles={handleFile} label={file ? file.name : 'Click or drop a PDF here'} />
      </div>

      {file && pageCount > 0 && (
        <>
          <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Page
            <select value={pageIndex} onChange={(e) => changePage(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
              {Array.from({ length: pageCount }, (_, i) => <option key={i} value={i}>Page {i + 1}</option>)}
            </select>
          </label>

          {thumbnail && (
            <div className="relative mt-4 inline-block">
              <img src={thumbnail} alt="Page preview" className="max-w-full rounded border border-slate-200 dark:border-slate-800" />
              {boxes.filter((b) => b.pageIndex === pageIndex).map((b, i) => (
                <div
                  key={i}
                  className="absolute bg-black"
                  style={{ left: `${b.xRatio * 100}%`, top: `${b.yRatio * 100}%`, width: `${b.widthRatio * 100}%`, height: `${b.heightRatio * 100}%` }}
                />
              ))}
              <div
                className="absolute border-2 border-dashed border-red-500 bg-red-500/20"
                style={{ left: `${draft.x * 100}%`, top: `${draft.y * 100}%`, width: `${draft.width * 100}%`, height: `${draft.height * 100}%` }}
              />
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-4">
            <label className="text-sm text-slate-600 dark:text-slate-400">
              X position
              <input type="range" min={0} max={0.9} step={0.01} value={draft.x} onChange={(e) => setDraft((d) => ({ ...d, x: Number(e.target.value) }))} className="w-full" />
            </label>
            <label className="text-sm text-slate-600 dark:text-slate-400">
              Y position
              <input type="range" min={0} max={0.9} step={0.01} value={draft.y} onChange={(e) => setDraft((d) => ({ ...d, y: Number(e.target.value) }))} className="w-full" />
            </label>
            <label className="text-sm text-slate-600 dark:text-slate-400">
              Width
              <input type="range" min={0.05} max={1} step={0.01} value={draft.width} onChange={(e) => setDraft((d) => ({ ...d, width: Number(e.target.value) }))} className="w-full" />
            </label>
            <label className="text-sm text-slate-600 dark:text-slate-400">
              Height
              <input type="range" min={0.02} max={1} step={0.01} value={draft.height} onChange={(e) => setDraft((d) => ({ ...d, height: Number(e.target.value) }))} className="w-full" />
            </label>
          </div>

          <button onClick={addBox} className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
            Add redaction box on this page
          </button>

          {boxes.length > 0 && (
            <ul className="mt-4 space-y-1 text-sm text-slate-600 dark:text-slate-400">
              {boxes.map((b, i) => (
                <li key={i} className="flex items-center justify-between rounded border border-slate-200 px-3 py-1.5 dark:border-slate-800">
                  <span>Page {b.pageIndex + 1} redaction</span>
                  <button onClick={() => removeBox(i)} className="text-red-500 hover:underline">Remove</button>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={handleRedact}
            disabled={boxes.length === 0 || busy}
            className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? 'Redacting…' : 'Redact & download PDF'}
          </button>
        </>
      )}
    </div>
  )
}
