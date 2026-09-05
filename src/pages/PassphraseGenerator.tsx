import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { generatePassphrase } from '../lib/passphrase'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function PassphraseGenerator() {
  useDocumentMeta('Passphrase Generator Free Online | MergeDoc', 'Generate memorable, secure multi-word passphrases, entirely in your browser.')
  const toast = useToast()
  const [wordCount, setWordCount] = useState(4)
  const [separator, setSeparator] = useState('-')
  const [passphrase, setPassphrase] = useState('')

  function generate() {
    setPassphrase(generatePassphrase(wordCount, separator))
  }

  async function copy() {
    if (!passphrase) return
    await navigator.clipboard.writeText(passphrase)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Passphrase Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Generate a memorable, multi-word passphrase.</p>

      <label className="mt-8 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Number of words ({wordCount})
        <input type="range" min={3} max={8} value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))} className="mt-1.5 w-full" />
      </label>

      <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Separator
        <select value={separator} onChange={(e) => setSeparator(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
          <option value="-">Hyphen (-)</option>
          <option value=" ">Space</option>
          <option value="_">Underscore (_)</option>
          <option value=".">Dot (.)</option>
        </select>
      </label>

      <button onClick={generate} className="mt-6 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
        Generate passphrase
      </button>

      {passphrase && (
        <div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 p-3 font-mono text-sm dark:border-slate-800">
          <span className="flex-1 break-all">{passphrase}</span>
          <button onClick={copy} className="shrink-0 rounded px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950">
            Copy
          </button>
        </div>
      )}
    </div>
  )
}
