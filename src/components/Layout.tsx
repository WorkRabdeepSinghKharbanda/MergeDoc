import { Link, Outlet } from 'react-router-dom'
import NavHeader from './NavHeader'
import ConsentBanner from './ConsentBanner'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <NavHeader />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-400 dark:border-slate-800 dark:text-slate-600">
        <p>MergeDoc — PDF tools that run entirely in your browser. No uploads, no servers.</p>
        <Link to="/privacy-policy" className="mt-2 inline-block underline hover:text-slate-600 dark:hover:text-slate-400">
          Privacy Policy
        </Link>
      </footer>

      <ConsentBanner />
    </div>
  )
}
