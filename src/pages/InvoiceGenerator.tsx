import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { downloadBlob, generateInvoicePdf, type InvoiceItem } from '../lib/pdf'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function InvoiceGenerator() {
  useDocumentMeta('Invoice Generator Free Online | MergeDoc', 'Create a simple invoice PDF from a form, entirely in your browser.')
  const toast = useToast()
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [fromName, setFromName] = useState('')
  const [toName, setToName] = useState('')
  const [taxPercent, setTaxPercent] = useState(0)
  const [notes, setNotes] = useState('')
  const [items, setItems] = useState<InvoiceItem[]>([{ description: '', quantity: 1, price: 0 }])
  const [busy, setBusy] = useState(false)

  function updateItem(index: number, field: keyof InvoiceItem, value: string | number) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  function addItem() {
    setItems((prev) => [...prev, { description: '', quantity: 1, price: 0 }])
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleGenerate() {
    if (!fromName.trim() || !toName.trim()) {
      toast.error('Fill in From and To before generating.')
      return
    }
    setBusy(true)
    try {
      const bytes = await generateInvoicePdf({ invoiceNumber, date, fromName, toName, items, taxPercent, notes })
      downloadBlob(bytes, `${invoiceNumber || 'invoice'}.pdf`)
      toast.success('Invoice PDF downloaded.')
    } catch {
      toast.error('Could not generate this invoice.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Invoice Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Fill in the details to generate a simple invoice PDF.</p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Invoice number
          <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          From
          <input type="text" value={fromName} onChange={(e) => setFromName(e.target.value)} placeholder="Your name / business" className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          To
          <input type="text" value={toName} onChange={(e) => setToName(e.target.value)} placeholder="Client name" className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={item.description}
              onChange={(e) => updateItem(i, 'description', e.target.value)}
              placeholder="Description"
              className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
            <input type="number" min={0} value={item.quantity} onChange={(e) => updateItem(i, 'quantity', Number(e.target.value))} placeholder="Qty" className="w-16 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
            <input type="number" min={0} value={item.price} onChange={(e) => updateItem(i, 'price', Number(e.target.value))} placeholder="Price" className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
            <button onClick={() => removeItem(i)} className="rounded px-2 py-1 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950">✕</button>
          </div>
        ))}
      </div>

      <button onClick={addItem} className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
        Add line item
      </button>

      <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Tax (%)
        <input type="number" min={0} value={taxPercent} onChange={(e) => setTaxPercent(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
      </label>

      <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Notes
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
      </label>

      <button
        onClick={handleGenerate}
        disabled={busy}
        className="mt-8 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? 'Generating…' : 'Generate invoice PDF'}
      </button>
    </div>
  )
}
