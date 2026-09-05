import { useMemo, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { renderAsciiBanner } from '../lib/asciiFont'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function AsciiArtGenerator() {
  useDocumentMeta('ASCII Art Text Generator Free Online | MergeDoc', 'Turn text into a block-letter ASCII banner, entirely in your browser.')
  const toast = useToast()
  const [text, setText] = useState('HELLO')

  const banner = useMemo(() => renderAsciiBanner(text.slice(0, 20)), [text])

  async function copy() {
    await navigator.clipboard.writeText(banner)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">ASCII Art Text Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Turn text into a block-letter banner (letters, digits, spaces — up to 20 characters).</p>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={20}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <pre className="mt-6 overflow-x-auto rounded-lg border border-slate-200 p-4 font-mono text-sm leading-tight dark:border-slate-800">{banner}</pre>

      <button onClick={copy} className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
        Copy
      </button>
    </div>
  )
}
