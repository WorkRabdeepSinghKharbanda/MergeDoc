import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { extractPdfText } from '../lib/pdfjs'
import { diffWords, type DiffPart } from '../lib/diff'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function ComparePdf() {
  useDocumentMeta(
    'Compare PDFs Free Online | MergeDoc',
    'Compare two PDFs and see word-level differences highlighted, entirely in your browser.',
  )
  const toast = useToast()
  const [fileA, setFileA] = useState<File | null>(null)
  const [fileB, setFileB] = useState<File | null>(null)
  const [parts, setParts] = useState<DiffPart[] | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleCompare() {
    if (!fileA || !fileB) return
    setBusy(true)
    try {
      const [textA, textB] = await Promise.all([extractPdfText(fileA), extractPdfText(fileB)])
      setParts(diffWords(textA.join('\n'), textB.join('\n')))
    } catch {
      toast.error('Could not compare these PDFs.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">Compare PDFs</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">See word-level differences between two PDFs.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <FileDropzone onFiles={(files) => setFileA(files[0])} label={fileA ? fileA.name : 'Original PDF'} />
        <FileDropzone onFiles={(files) => setFileB(files[0])} label={fileB ? fileB.name : 'Changed PDF'} />
      </div>

      <button
        onClick={handleCompare}
        disabled={!fileA || !fileB || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Comparing…' : 'Compare'}
      </button>

      {parts && (
        <div className="mt-8 rounded-lg border border-slate-200 p-4 text-sm leading-relaxed whitespace-pre-wrap dark:border-slate-800">
          {parts.map((p, i) => (
            <span
              key={i}
              className={
                p.added
                  ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                  : p.removed
                    ? 'bg-red-100 text-red-800 line-through dark:bg-red-950 dark:text-red-300'
                    : ''
              }
            >
              {p.value}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
