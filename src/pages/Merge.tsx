import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { downloadBlob, mergePdfs } from '../lib/pdf'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function Merge() {
  useDocumentMeta(
    'Merge PDF Free Online | MergeDoc',
    'Combine multiple PDF files into one, in any order, entirely in your browser. Free, no uploads, no sign-up.',
  )
  const toast = useToast()
  const [files, setFiles] = useState<File[]>([])
  const [busy, setBusy] = useState(false)

  function addFiles(newFiles: File[]) {
    setFiles((prev) => [...prev, ...newFiles])
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  function move(index: number, dir: -1 | 1) {
    setFiles((prev) => {
      const next = [...prev]
      const target = index + dir
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  async function handleMerge() {
    setBusy(true)
    try {
      const bytes = await mergePdfs(files)
      downloadBlob(bytes, 'merged.pdf')
      toast.success('Merged PDF downloaded.')
    } catch {
      toast.error('Could not merge these PDFs. Make sure every file is a valid, unencrypted PDF.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Merge PDF</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Combine PDFs in the order you add them.</p>

      <div className="mt-8">
        <FileDropzone multiple onFiles={addFiles} label="Click or drop PDFs here" />
      </div>

      {files.length > 0 && (
        <ul className="mt-6 divide-y divide-slate-200 rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="truncate text-sm text-slate-700 dark:text-slate-300">{file.name}</span>
              <div className="flex shrink-0 gap-1 text-slate-400">
                <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded px-2 py-1 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800" aria-label="Move up">
                  ↑
                </button>
                <button onClick={() => move(i, 1)} disabled={i === files.length - 1} className="rounded px-2 py-1 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800" aria-label="Move down">
                  ↓
                </button>
                <button onClick={() => removeFile(i)} className="rounded px-2 py-1 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950" aria-label="Remove">
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleMerge}
        disabled={files.length < 2 || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Merging…' : `Merge ${files.length || ''} PDFs`}
      </button>
    </div>
  )
}
