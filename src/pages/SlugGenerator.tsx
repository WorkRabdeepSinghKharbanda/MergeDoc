import { useMemo, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { slugify } from '../lib/slug'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function SlugGenerator() {
  useDocumentMeta('Slug Generator Free Online | MergeDoc', 'Turn a title into a clean URL slug, entirely in your browser.')
  const toast = useToast()
  const [text, setText] = useState('My Awesome Blog Post Title!')

  const slug = useMemo(() => slugify(text), [text])

  async function copy() {
    if (!slug) return
    await navigator.clipboard.writeText(slug)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Slug Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Turn a title into a clean, URL-safe slug.</p>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a title…"
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 p-3 font-mono text-sm dark:border-slate-800">
        <span className="flex-1 break-all">{slug || '—'}</span>
        <button onClick={copy} disabled={!slug} className="shrink-0 rounded px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 disabled:opacity-40 dark:hover:bg-indigo-950">
          Copy
        </button>
      </div>
    </div>
  )
}
