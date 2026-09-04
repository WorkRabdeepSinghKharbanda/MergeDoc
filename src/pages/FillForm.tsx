import { useState } from 'react'
import FileDropzone from '../components/FileDropzone'
import { useToast } from '../components/ToastProvider'
import { downloadBlob, fillPdfForm, readPdfFormFields, type PdfFormField } from '../lib/pdf'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function FillForm() {
  useDocumentMeta('Fill PDF Form Free Online | MergeDoc', 'Fill in a PDF form’s fields and download it, entirely in your browser.')
  const toast = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [fields, setFields] = useState<PdfFormField[]>([])
  const [values, setValues] = useState<Record<string, string | boolean>>({})
  const [flatten, setFlatten] = useState(true)
  const [busy, setBusy] = useState(false)

  async function handleFile(files: File[]) {
    const f = files[0]
    setFile(f)
    setValues({})
    try {
      const found = await readPdfFormFields(f)
      setFields(found)
      if (found.length === 0) toast.error('No fillable fields found in this PDF.')
    } catch {
      toast.error('Could not read form fields from this PDF.')
    }
  }

  async function handleFill() {
    if (!file) return
    setBusy(true)
    try {
      const bytes = await fillPdfForm(file, values, flatten)
      downloadBlob(bytes, `${file.name.replace(/\.pdf$/i, '')}-filled.pdf`)
      toast.success('Filled PDF downloaded.')
    } catch {
      toast.error('Could not fill this PDF.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Fill PDF Form</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Fill in a PDF’s form fields, then download.</p>

      <div className="mt-8">
        <FileDropzone onFiles={handleFile} label={file ? file.name : 'Click or drop a PDF here'} />
      </div>

      {fields.length > 0 && (
        <div className="mt-6 space-y-4">
          {fields.map((field) => (
            <label key={field.name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {field.name}
              {field.type === 'text' && (
                <input
                  type="text"
                  onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                />
              )}
              {field.type === 'checkbox' && (
                <input
                  type="checkbox"
                  onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.checked }))}
                  className="ml-2"
                />
              )}
              {(field.type === 'radio' || field.type === 'dropdown') && (
                <select
                  onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                >
                  <option value="">—</option>
                  {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              )}
              {field.type === 'unsupported' && <span className="ml-2 text-xs text-slate-400">(unsupported field type)</span>}
            </label>
          ))}

          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <input type="checkbox" checked={flatten} onChange={(e) => setFlatten(e.target.checked)} />
            Flatten form (make values permanent, non-editable)
          </label>

          <button
            onClick={handleFill}
            disabled={busy}
            className="w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? 'Filling…' : 'Fill & download PDF'}
          </button>
        </div>
      )}
    </div>
  )
}
