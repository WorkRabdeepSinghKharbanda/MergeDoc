import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { downloadBlob, protectPdf, unprotectPdf } from '../lib/pdf'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function Protect() {
  useDocumentMeta(
    'Password Protect / Unlock PDF Free Online | MergeDoc',
    'Add or remove a password on a PDF, entirely in your browser.',
  )
  const toast = useToast()
  const [mode, setMode] = useState<'protect' | 'unprotect'>('protect')
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit() {
    if (!file || !password) return
    setBusy(true)
    try {
      const bytes =
        mode === 'protect' ? await protectPdf(file, password) : await unprotectPdf(file, password)
      const suffix = mode === 'protect' ? 'protected' : 'unlocked'
      downloadBlob(bytes, `${file.name.replace(/\.pdf$/i, '')}-${suffix}.pdf`)
      toast.success(mode === 'protect' ? 'Password-protected PDF downloaded.' : 'Unlocked PDF downloaded.')
    } catch {
      toast.error(
        mode === 'protect'
          ? 'Could not protect this PDF.'
          : 'Wrong password, or this PDF is not encrypted.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Password Protect PDF</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Add or remove a password from a PDF.</p>

      <div className="mt-6 flex gap-2">
        {(['protect', 'unprotect'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium capitalize ${
              mode === m
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                : 'border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-900'
            }`}
          >
            {m === 'protect' ? 'Add password' : 'Remove password'}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <FileDropzone onFiles={(files) => setFile(files[0])} label={file ? file.name : 'Click or drop a PDF here'} />
      </div>

      <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {mode === 'protect' ? 'New password' : 'Current password'}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
        />
      </label>

      <button
        onClick={handleSubmit}
        disabled={!file || !password || busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Working…' : mode === 'protect' ? 'Add password' : 'Remove password'}
      </button>
    </div>
  )
}
