import { useEffect, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { generateQrDataUrl } from '../lib/qr'
import { buildVCard } from '../lib/vcard'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function VCardQr() {
  useDocumentMeta('vCard QR Code Generator Free Online | MergeDoc', 'Turn contact details into a scannable vCard QR code, entirely in your browser.')
  const toast = useToast()
  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [url, setUrl] = useState('')
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!name.trim()) {
      setDataUrl(null)
      return
    }
    let cancelled = false
    generateQrDataUrl(buildVCard({ name, org, phone, email, url }))
      .then((url) => {
        if (!cancelled) setDataUrl(url)
      })
      .catch(() => {
        if (!cancelled) toast.error('Could not generate a QR code.')
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, org, phone, email, url])

  function download() {
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = 'contact-qrcode.png'
    a.click()
    toast.success('QR code downloaded.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">vCard QR Code Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Fill in contact details to generate a scannable QR code that saves the contact.</p>

      <div className="mt-8 space-y-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Name
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Organization
          <input type="text" value={org} onChange={(e) => setOrg(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Phone
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Website
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
      </div>

      {dataUrl && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <img src={dataUrl} alt="Contact QR code" className="h-56 w-56 rounded-lg border border-slate-200 dark:border-slate-800" />
          <button onClick={download} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Download PNG
          </button>
        </div>
      )}
    </div>
  )
}
