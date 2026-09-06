import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { scanQrFromFile } from '../lib/qrScan'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function QrScanner() {
  useDocumentMeta('QR Code Scanner Free Online | MergeDoc', 'Decode a QR code from an uploaded image, entirely in your browser.')
  const toast = useToast()
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function pick(fileList: FileList | null) {
    const f = fileList?.[0]
    if (!f || !f.type.startsWith('image/')) return
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(f)
    })
    setResult(null)
    setBusy(true)
    try {
      const decoded = await scanQrFromFile(f)
      if (decoded) setResult(decoded)
      else toast.error('No QR code found in this image.')
    } catch {
      toast.error('Could not read this image.')
    } finally {
      setBusy(false)
    }
  }

  async function copy() {
    if (!result) return
    await navigator.clipboard.writeText(result)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">QR Code Scanner</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Upload an image containing a QR code to decode it.</p>

      <div
        onClick={() => document.getElementById('qr-scan-input')?.click()}
        className="mt-8 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
      >
        <p className="font-medium text-slate-700 dark:text-slate-200">Click to choose an image</p>
        <p className="text-sm text-slate-400 dark:text-slate-500">Files never leave your browser</p>
        <input
          id="qr-scan-input"
          type="file"
          accept="image/*"
          onChange={(e) => {
            pick(e.target.files)
            e.target.value = ''
          }}
          className="hidden"
        />
      </div>

      {preview && (
        <img src={preview} alt="Uploaded" className="mx-auto mt-6 max-h-64 max-w-full rounded-lg border border-slate-200 dark:border-slate-800" />
      )}

      {busy && <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">Scanning…</p>}

      {result && (
        <div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 p-3 font-mono text-sm dark:border-slate-800">
          <span className="flex-1 break-all">{result}</span>
          <button onClick={copy} className="shrink-0 rounded px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950">
            Copy
          </button>
        </div>
      )}
    </div>
  )
}
