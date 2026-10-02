import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.tsx'
import { resetHead, takeHead } from './lib/useDocumentMeta'

export function render(url: string) {
  resetHead()
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
  return { html, head: takeHead() }
}

export { prerenderRoutes } from './lib/routes'
