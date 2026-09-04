import { useMemo, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { contrastRatio, hexToRgb, rgbToHsl } from '../lib/color'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function ColorTool() {
  useDocumentMeta('Color Converter & Contrast Checker Free Online | MergeDoc', 'Convert colors between HEX/RGB/HSL and check WCAG contrast ratios, entirely in your browser.')
  const toast = useToast()
  const [hex, setHex] = useState('#4f46e5')
  const [bgHex, setBgHex] = useState('#ffffff')

  const rgb = useMemo(() => hexToRgb(hex), [hex])
  const hsl = useMemo(() => (rgb ? rgbToHsl(rgb) : null), [rgb])
  const bgRgb = useMemo(() => hexToRgb(bgHex), [bgHex])
  const ratio = useMemo(() => (rgb && bgRgb ? contrastRatio(rgb, bgRgb) : null), [rgb, bgRgb])

  async function copy(value: string) {
    await navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Color Converter & Contrast Checker</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Convert HEX/RGB/HSL and check WCAG contrast ratios.</p>

      <div className="mt-8 flex items-center gap-4">
        <input type="color" value={rgb ? hex : '#000000'} onChange={(e) => setHex(e.target.value)} className="h-12 w-16 cursor-pointer rounded border border-slate-300 dark:border-slate-700" />
        <input
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      {rgb && hsl ? (
        <div className="mt-4 space-y-2 text-sm">
          {[
            ['HEX', hex.toUpperCase()],
            ['RGB', `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`],
            ['HSL', `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
              <span className="font-mono">{value}</span>
              <button onClick={() => copy(value)} className="rounded px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950">Copy</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-red-500">Invalid HEX color.</p>
      )}

      <section className="mt-12">
        <h2 className="text-lg font-semibold">Contrast checker</h2>
        <div className="mt-4 flex items-center gap-4">
          <label className="text-sm text-slate-600 dark:text-slate-400">
            Background
            <input type="color" value={bgHex} onChange={(e) => setBgHex(e.target.value)} className="ml-2 h-9 w-14 cursor-pointer rounded border border-slate-300 align-middle dark:border-slate-700" />
          </label>
        </div>
        {rgb && bgRgb && ratio && (
          <div
            className="mt-4 flex items-center justify-center rounded-lg border border-slate-200 py-10 text-lg font-medium dark:border-slate-800"
            style={{ backgroundColor: bgHex, color: hex }}
          >
            Sample text
          </div>
        )}
        {ratio && (
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Ratio {ratio.toFixed(2)}:1 — AA normal text {ratio >= 4.5 ? '✅ pass' : '❌ fail'}, AA large text {ratio >= 3 ? '✅ pass' : '❌ fail'}, AAA normal text {ratio >= 7 ? '✅ pass' : '❌ fail'}
          </p>
        )}
      </section>
    </div>
  )
}
