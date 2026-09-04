import { useEffect, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { hashText, type HashAlgo } from '../lib/hash'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const ALGOS: HashAlgo[] = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']

export default function HashGenerator() {
  useDocumentMeta('Hash Generator Free Online | MergeDoc', 'Generate SHA-1/256/384/512 hashes of text instantly, entirely in your browser.')
  const toast = useToast()
  const [text, setText] = useState('')
  const [hashes, setHashes] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!text) return
    let cancelled = false
    Promise.all(ALGOS.map((algo) => hashText(text, algo))).then((results) => {
      if (cancelled) return
      const next: Record<string, string> = {}
      ALGOS.forEach((algo, i) => (next[algo] = results[i]))
      setHashes(next)
    })
    return () => {
      cancelled = true
    }
  }, [text])

  async function copy(value: string) {
    await navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Hash Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Generate cryptographic hashes of text.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text here…"
        rows={5}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <div className="mt-6 space-y-3">
        {ALGOS.map((algo) => (
          <div key={algo} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{algo}</p>
              <button
                onClick={() => copy(hashes[algo] ?? '')}
                disabled={!text || !hashes[algo]}
                className="shrink-0 rounded px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 disabled:opacity-40 dark:hover:bg-indigo-950"
              >
                Copy
              </button>
            </div>
            <p className="mt-1 break-all font-mono text-sm">{text ? (hashes[algo] ?? 'Hashing…') : '—'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
