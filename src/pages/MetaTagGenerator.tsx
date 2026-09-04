import { useMemo, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function MetaTagGenerator() {
  useDocumentMeta('Meta Tag & Open Graph Generator Free Online | MergeDoc', 'Generate title, description, and Open Graph/Twitter meta tags with a live preview, entirely in your browser.')
  const toast = useToast()
  const [title, setTitle] = useState('My Page Title')
  const [description, setDescription] = useState('A short description of the page for search engines and social previews.')
  const [url, setUrl] = useState('https://example.com')
  const [image, setImage] = useState('https://example.com/og-image.png')

  const tags = useMemo(
    () =>
      [
        `<title>${title}</title>`,
        `<meta name="description" content="${description}" />`,
        `<meta property="og:title" content="${title}" />`,
        `<meta property="og:description" content="${description}" />`,
        `<meta property="og:url" content="${url}" />`,
        `<meta property="og:image" content="${image}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${title}" />`,
        `<meta name="twitter:description" content="${description}" />`,
        `<meta name="twitter:image" content="${image}" />`,
      ].join('\n'),
    [title, description, url, image],
  )

  async function copyTags() {
    await navigator.clipboard.writeText(tags)
    toast.success('Meta tags copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Meta Tag & Open Graph Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Fill in your page details to generate SEO and social preview tags.</p>

      <div className="mt-8 space-y-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Title
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Page URL
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Image URL
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
      </div>

      <div className="mt-8 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Social preview</p>
        <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="h-32 bg-slate-100 bg-cover bg-center dark:bg-slate-800" style={{ backgroundImage: `url(${image})` }} />
          <div className="p-3">
            <p className="text-xs uppercase text-slate-400">{url}</p>
            <p className="mt-1 font-semibold">{title}</p>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{description}</p>
          </div>
        </div>
      </div>

      <textarea readOnly value={tags} rows={12} className="mt-6 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      <button onClick={copyTags} className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
        Copy tags
      </button>
    </div>
  )
}
