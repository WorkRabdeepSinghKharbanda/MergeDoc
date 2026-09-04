import { useEffect, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { generateQrDataUrl } from '../lib/qr'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function QrGenerator() {
  useDocumentMeta(
    'QR Code Generator Free Online | MergeDoc',
    'Generate a QR code from any text or URL, instantly and privately in your browser.',
  )
  const toast = useToast()
  const [text, setText] = useState('https://')
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!text.trim()) {
      setDataUrl(null)
      return
    }
    let cancelled = false
    generateQrDataUrl(text)
      .then((url) => {
        if (!cancelled) setDataUrl(url)
      })
      .catch(() => {
        if (!cancelled) toast.error('Could not generate a QR code for this text.')
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  function handleDownload() {
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = 'qrcode.png'
    a.click()
    toast.success('QR code downloaded.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">QR Code Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Turn any text or URL into a QR code.</p>

      <label className="mt-8 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Text or URL
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
        />
      </label>

      {dataUrl && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <img src={dataUrl} alt="Generated QR code" className="h-56 w-56 rounded-lg border border-slate-200 dark:border-slate-800" />
          <button
            onClick={handleDownload}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Download PNG
          </button>
        </div>
      )}
    </div>
  )
}
