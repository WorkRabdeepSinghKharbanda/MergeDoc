import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { downloadBlob, reorderPdf } from '../lib/pdf'
import { renderThumbnail, getPageCount } from '../lib/pdfjs'
import { useDocumentMeta } from '../lib/useDocumentMeta'

type Page = { index: number; thumbnail: string }

export default function Reorder() {
  useDocumentMeta(
    'Reorder & Delete PDF Pages Free Online | MergeDoc',
    'Visually reorder or delete pages in a PDF, entirely in your browser.',
  )
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(false)
  const [busy, setBusy] = useState(false)

  async function handleFile(files: File[]) {
    const f = files[0]
    setFile(f)
    setLoading(true)
    try {
      const count = await getPageCount(f)
      const thumbs = await Promise.all(
        Array.from({ length: count }, (_, i) => renderThumbnail(f, i)),
      )
      setPages(thumbs.map((thumbnail, index) => ({ index, thumbnail })))
    } catch {
      toast.error('Could not read pages from this PDF.')
    } finally {
      setLoading(false)
    }
  }

  function remove(pos: number) {
    setPages((prev) => prev.filter((_, i) => i !== pos))
  }

  function move(pos: number, dir: -1 | 1) {
    setPages((prev) => {
      const next = [...prev]
      const target = pos + dir
      if (target < 0 || target >= next.length) return prev
      ;[next[pos], next[target]] = [next[target], next[pos]]
      return next
    })
  }

  async function handleSave() {
    if (!file || pages.length === 0) return
    setBusy(true)
    try {
      const bytes = await reorderPdf(file, pages.map((p) => p.index))
      downloadBlob(bytes, `${file.name.replace(/\.pdf$/i, '')}-reordered.pdf`)
      toast.success('Reordered PDF downloaded.')
    } catch {
      toast.error('Could not save this PDF.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">Reorder & Delete Pages</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Rearrange or remove pages, then save.</p>

      <div className="mt-8">
        <FileDropzone onFiles={handleFile} label={file ? file.name : 'Click or drop a PDF here'} />
      </div>

      {loading && <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">Rendering pages…</p>}

      {pages.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {pages.map((page, pos) => (
            <div key={page.index} className="relative rounded-lg border border-slate-200 p-2 dark:border-slate-800">
              <img src={page.thumbnail} alt={`Page ${page.index + 1}`} className="w-full rounded" />
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Page {page.index + 1}</span>
                <div className="flex gap-1">
                  <button onClick={() => move(pos, -1)} disabled={pos === 0} className="rounded px-1.5 py-0.5 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800">↑</button>
                  <button onClick={() => move(pos, 1)} disabled={pos === pages.length - 1} className="rounded px-1.5 py-0.5 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800">↓</button>
                  <button onClick={() => remove(pos)} className="rounded px-1.5 py-0.5 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950">✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={pages.length === 0 || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Saving…' : 'Save PDF'}
      </button>
    </div>
  )
}
