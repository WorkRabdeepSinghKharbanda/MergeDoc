import { Link, Outlet } from 'react-router-dom'
import NavHeader from './NavHeader'
import ConsentBanner from './ConsentBanner'
import RelatedForRoute from './RelatedForRoute'
import { CATEGORIES } from '../lib/categories'

export default function Layout() {
  // AdSense's loader script is a static <script> tag in index.html's <head> (present on every
  // route of this SPA on first load), not injected from here — see ads.ts.

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <NavHeader />

      <main className="flex-1">
        <Outlet />
        <RelatedForRoute />
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-400 dark:border-slate-800 dark:text-slate-600">
        <p>MergeDoc — PDF tools that run entirely in your browser. No uploads, no servers.</p>
        <div className="mx-auto mt-3 flex max-w-3xl flex-wrap justify-center gap-x-4 gap-y-1">
          {CATEGORIES.map((c) => (
            <Link key={c.path} to={c.path} className="hover:text-slate-600 dark:hover:text-slate-400">
              {c.title}
            </Link>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-4">
          <Link to="/blog" className="underline hover:text-slate-600 dark:hover:text-slate-400">
            Blog
          </Link>
          <Link to="/alternatives" className="underline hover:text-slate-600 dark:hover:text-slate-400">
            Alternatives
          </Link>
          <Link to="/privacy-policy" className="underline hover:text-slate-600 dark:hover:text-slate-400">
            Privacy Policy
          </Link>
        </div>
      </footer>

      <ConsentBanner />
    </div>
  )
}
