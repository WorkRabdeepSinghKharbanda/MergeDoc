import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PDF_TOOLS, OTHER_TOOLS } from '../lib/tools'
import ThemeToggle from './ThemeToggle'

function ToolMenu({ label, tools }: { label: string; tools: typeof PDF_TOOLS }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        {label}
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 z-40 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          {tools.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {tool.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function NavHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" onClick={() => setMobileOpen(false)} className="text-lg font-semibold tracking-tight">
          MergeDoc
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <ToolMenu label="PDF Tools" tools={PDF_TOOLS} />
          <ToolMenu label="Other Tools" tools={OTHER_TOOLS} />
          <Link to="/#tools" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            All tools
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 sm:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={mobileOpen ? 'M6 18 18 6M6 6l12 12' : 'M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5'} />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 px-6 py-4 sm:hidden dark:border-slate-800">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">PDF tools</p>
          <div className="mb-4 flex flex-col gap-1">
            {PDF_TOOLS.map((tool) => (
              <Link key={tool.to} to={tool.to} onClick={() => setMobileOpen(false)} className="rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                {tool.title}
              </Link>
            ))}
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Other tools</p>
          <div className="flex flex-col gap-1">
            {OTHER_TOOLS.map((tool) => (
              <Link key={tool.to} to={tool.to} onClick={() => setMobileOpen(false)} className="rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
