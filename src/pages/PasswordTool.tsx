import { useMemo, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { generatePassword, checkPasswordStrength } from '../lib/password'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const BAR_COLORS = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500']

export default function PasswordTool() {
  useDocumentMeta('Password Generator & Strength Checker Free Online | MergeDoc', 'Generate strong random passwords and check password strength, entirely in your browser.')
  const toast = useToast()
  const [length, setLength] = useState(16)
  const [opts, setOpts] = useState({ lower: true, upper: true, digits: true, symbols: true })
  const [generated, setGenerated] = useState('')
  const [checkValue, setCheckValue] = useState('')

  const strength = useMemo(() => checkPasswordStrength(checkValue), [checkValue])

  function handleGenerate() {
    const pw = generatePassword({ length, ...opts })
    if (!pw) {
      toast.error('Pick at least one character type.')
      return
    }
    setGenerated(pw)
  }

  async function copyGenerated() {
    if (!generated) return
    await navigator.clipboard.writeText(generated)
    toast.success('Password copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Password Generator & Strength Checker</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Generate a strong random password, or check one of your own.</p>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Generate</h2>
        <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Length: {length}
          <input type="range" min={8} max={32} value={length} onChange={(e) => setLength(Number(e.target.value))} className="mt-1.5 w-full" />
        </label>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {(['lower', 'upper', 'digits', 'symbols'] as const).map((k) => (
            <label key={k} className="flex items-center gap-2 capitalize text-slate-600 dark:text-slate-400">
              <input type="checkbox" checked={opts[k]} onChange={(e) => setOpts((o) => ({ ...o, [k]: e.target.checked }))} />
              {k}
            </label>
          ))}
        </div>
        <button
          onClick={handleGenerate}
          className="mt-4 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          Generate password
        </button>
        {generated && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 p-3 font-mono text-sm dark:border-slate-800">
            <span className="flex-1 break-all">{generated}</span>
            <button onClick={copyGenerated} className="shrink-0 rounded px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950">
              Copy
            </button>
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold">Check strength</h2>
        <input
          type="text"
          value={checkValue}
          onChange={(e) => setCheckValue(e.target.value)}
          placeholder="Type a password to check"
          className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <div className="mt-3 flex gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className={`h-2 flex-1 rounded ${i <= strength.score ? BAR_COLORS[strength.score] : 'bg-slate-200 dark:bg-slate-800'}`} />
          ))}
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{strength.label}</p>
      </section>
    </div>
  )
}
