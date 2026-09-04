import { useMemo, useState } from 'react'
import { markdownToHtml } from '../lib/markdown'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function MarkdownPreview() {
  useDocumentMeta('Markdown Previewer Free Online | MergeDoc', 'Preview Markdown rendered as HTML side by side, entirely in your browser.')
  const [markdown, setMarkdown] = useState('# Hello\n\nThis is **bold** and *italic* text with a [link](https://example.com).\n\n- Item one\n- Item two')

  const html = useMemo(() => markdownToHtml(markdown), [markdown])

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold">Markdown Previewer</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Write Markdown and see the rendered HTML live. Supports headings, bold/italic, links, and lists.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          rows={16}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <div
          className="markdown-preview rounded-lg border border-slate-200 p-4 text-sm dark:border-slate-800"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
