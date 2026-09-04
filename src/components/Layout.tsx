import { Outlet } from 'react-router-dom'
import NavHeader from './NavHeader'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <NavHeader />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-400 dark:border-slate-800 dark:text-slate-600">
        MergeDoc — PDF tools that run entirely in your browser. No uploads, no servers.
      </footer>
    </div>
  )
}
