import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { extractPdfText } from '../lib/pdfjs'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function ExtractText() {
  useDocumentMeta('Extract Text from PDF Free Online | MergeDoc', 'Pull the plain text out of a PDF for copying or searching, entirely in your browser.')
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleFile(files: File[]) {
    const f = files[0]
    setFile(f)
    setBusy(true)
    try {
      const pages = await extractPdfText(f)
      setText(pages.join('\n\n'))
    } catch {
      toast.error('Could not extract text from this PDF.')
    } finally {
      setBusy(false)
    }
  }

  async function copyText() {
    await navigator.clipboard.writeText(text)
    toast.success('Text copied to clipboard.')
  }

  function downloadText() {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${file?.name.replace(/\.pdf$/i, '') ?? 'extracted'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Extract Text from PDF</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Pull the plain text out of a PDF.</p>

      <div className="mt-8">
        <FileDropzone onFiles={handleFile} label={file ? file.name : 'Click or drop a PDF here'} />
      </div>

      {busy && <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">Extracting…</p>}

      {text && (
        <>
          <textarea
            readOnly
            value={text}
            rows={14}
            className="mt-6 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <div className="mt-3 flex gap-3">
            <button onClick={copyText} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
              Copy
            </button>
            <button onClick={downloadText} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
              Download .txt
            </button>
          </div>
        </>
      )}
    </div>
  )
}
