import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { base64Decode, base64Encode } from '../lib/encode'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function Base64Tool() {
  useDocumentMeta('Base64 Encoder & Decoder Free Online | MergeDoc', 'Encode or decode Base64 text instantly, entirely in your browser.')
  const toast = useToast()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  function encode() {
    try {
      setOutput(base64Encode(input))
    } catch {
      toast.error('Could not encode this text.')
    }
  }

  function decode() {
    try {
      setOutput(base64Decode(input))
    } catch {
      toast.error('Invalid Base64 input.')
    }
  }

  async function copyOutput() {
    if (!output) return
    await navigator.clipboard.writeText(output)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Base64 Encoder & Decoder</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Encode text to Base64, or decode it back.</p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or paste text here…"
        rows={6}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <div className="mt-4 flex gap-3">
        <button onClick={encode} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
          Encode
        </button>
        <button onClick={decode} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
          Decode
        </button>
      </div>

      {output && (
        <div className="mt-6">
          <textarea readOnly value={output} rows={6} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900" />
          <button onClick={copyOutput} className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
            Copy
          </button>
        </div>
      )}
    </div>
  )
}
