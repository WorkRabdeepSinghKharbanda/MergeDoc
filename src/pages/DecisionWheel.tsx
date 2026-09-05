import { useRef, useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const COLORS = ['#4f46e5', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#14b8a6']

export default function DecisionWheel() {
  useDocumentMeta('Decision Wheel Free Online | MergeDoc', 'Spin a wheel to make a random choice from your own options, entirely in your browser.')
  const [optionsInput, setOptionsInput] = useState('Pizza\nSushi\nTacos\nBurgers')
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  const options = optionsInput.split('\n').map((o) => o.trim()).filter(Boolean)
  const segmentAngle = options.length > 0 ? 360 / options.length : 0

  function spin() {
    if (options.length < 2 || spinning) return
    setSpinning(true)
    setWinner(null)
    const winningIndex = Math.floor(Math.random() * options.length)
    const targetAngle = 360 - (winningIndex * segmentAngle + segmentAngle / 2)
    const fullSpins = 5 * 360
    const finalRotation = rotation - (rotation % 360) + fullSpins + targetAngle
    setRotation(finalRotation)
    setTimeout(() => {
      setSpinning(false)
      setWinner(options[winningIndex])
    }, 4000)
  }

  const gradient = options
    .map((_, i) => `${COLORS[i % COLORS.length]} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`)
    .join(', ')

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold">Decision Wheel</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Enter your options (one per line) and spin.</p>

      <textarea
        value={optionsInput}
        onChange={(e) => setOptionsInput(e.target.value)}
        rows={5}
        className="mx-auto mt-8 w-full max-w-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      {options.length >= 2 && (
        <div className="relative mx-auto mt-8 h-64 w-64">
          <div className="absolute left-1/2 top-0 z-10 h-0 w-0 -translate-x-1/2 -translate-y-1 border-x-8 border-t-[16px] border-x-transparent border-t-red-500" />
          <div
            ref={wheelRef}
            className="h-64 w-64 rounded-full border-4 border-slate-300 dark:border-slate-700"
            style={{
              background: `conic-gradient(${gradient})`,
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            }}
          />
        </div>
      )}

      <button
        onClick={spin}
        disabled={options.length < 2 || spinning}
        className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {spinning ? 'Spinning…' : 'Spin'}
      </button>

      {winner && <p className="mt-4 text-xl font-bold text-indigo-600 dark:text-indigo-400">{winner}</p>}
    </div>
  )
}
