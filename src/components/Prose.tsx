import { useNavigate } from 'react-router-dom'
import { markdownToHtml } from '../lib/markdown'

/** Renders Markdown-subset text; internal links (href="/...") navigate client-side instead of reloading. */
export default function Prose({ markdown, className = '' }: { markdown: string; className?: string }) {
  const navigate = useNavigate()
  return (
    <div
      className={`markdown-preview ${className}`}
      dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown) }}
      onClick={(e) => {
        const a = (e.target as HTMLElement).closest('a')
        const href = a?.getAttribute('href')
        if (a && href?.startsWith('/') && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
          e.preventDefault()
          navigate(href)
        }
      }}
    />
  )
}
