import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Props = {
  to: string
  title: string
  description: string
  icon: ReactNode
}

export default function ToolCard({ to, title, description, icon }: Props) {
  return (
    <Link
      to={to}
      className="group flex flex-col gap-3 rounded-2xl border border-slate-200 p-6 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 dark:border-slate-800 dark:hover:border-indigo-700 dark:hover:shadow-indigo-950"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400 dark:group-hover:bg-indigo-900">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </Link>
  )
}
