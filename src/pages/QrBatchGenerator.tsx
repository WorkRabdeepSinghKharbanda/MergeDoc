import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { generateQrDataUrl } from '../lib/qr'
import { useDocumentMeta } from '../lib/useDocumentMeta'

type Generated = { text: string; url: string }

export default function QrBatchGenerator() {
  useDocumentMeta('Batch QR Code Generator Free Online | MergeDoc', 'Generate multiple QR codes from a list of text or URLs at once, entirely in your browser.')
  const toast = useToast()
  const [input, setInput] = useState('https://example.com\nhttps://example.org')
  const [codes, setCodes] = useState<Generated[]>([])
  const [busy, setBusy] = useState(false)

  async function handleGenerate() {
    const lines = input.split('\n').map((l) => l.trim()).filter(Boolean)
    if (lines.length === 0) return
    setBusy(true)
    try {
      const results = await Promise.all(lines.map(async (text) => ({ text, url: await generateQrDataUrl(text) })))
      setCodes(results)
    } catch {
      toast.error('Could not generate one or more QR codes.')
    } finally {
      setBusy(false)
    }
  }

  function download(code: Generated, index: number) {
    const a = document.createElement('a')
    a.href = code.url
    a.download = `qrcode-${index + 1}.png`
    a.click()
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">Batch QR Code Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">One line per QR code — paste a list of URLs or text.</p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <button
        onClick={handleGenerate}
        disabled={busy}
        className="mt-4 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Generating…' : 'Generate QR codes'}
      </button>

      {codes.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {codes.map((code, i) => (
            <button key={i} onClick={() => download(code, i)} className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-3 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
              <img src={code.url} alt={code.text} className="h-28 w-28 rounded" />
              <span className="max-w-full truncate text-xs text-slate-500 dark:text-slate-400">{code.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
