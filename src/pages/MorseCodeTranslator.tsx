import { useRef, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { morseToText, textToMorse } from '../lib/morse'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const DOT_MS = 100

export default function MorseCodeTranslator() {
  useDocumentMeta('Morse Code Translator Free Online | MergeDoc', 'Translate text to and from Morse code, with audio playback, entirely in your browser.')
  const toast = useToast()
  const [text, setText] = useState('SOS')
  const [morse, setMorse] = useState('... --- ...')
  const [playing, setPlaying] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)

  function updateFromText(value: string) {
    setText(value)
    setMorse(textToMorse(value))
  }

  function updateFromMorse(value: string) {
    setMorse(value)
    setText(morseToText(value))
  }

  async function copy(value: string) {
    await navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard.')
  }

  async function play() {
    if (!morse.trim() || playing) return
    setPlaying(true)
    const ctx = audioCtxRef.current ?? new AudioContext()
    audioCtxRef.current = ctx
    let time = ctx.currentTime
    for (const symbol of morse) {
      if (symbol === '.' || symbol === '-') {
        const duration = (symbol === '.' ? 1 : 3) * DOT_MS
        const osc = ctx.createOscillator()
        osc.frequency.value = 600
        osc.connect(ctx.destination)
        osc.start(time)
        osc.stop(time + duration / 1000)
        time += duration / 1000 + DOT_MS / 1000
      } else {
        time += (symbol === ' ' ? DOT_MS * 3 : DOT_MS * 7) / 1000
      }
    }
    setTimeout(() => setPlaying(false), (time - ctx.currentTime) * 1000)
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Morse Code Translator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Translate between text and Morse code, and play it as audio.</p>

      <label className="mt-8 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Text
        <textarea value={text} onChange={(e) => updateFromText(e.target.value)} rows={3} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
      </label>

      <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Morse code
        <textarea value={morse} onChange={(e) => updateFromMorse(e.target.value)} rows={3} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900" />
      </label>

      <div className="mt-4 flex gap-3">
        <button onClick={play} disabled={playing || !morse.trim()} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40">
          {playing ? 'Playing…' : 'Play audio'}
        </button>
        <button onClick={() => copy(morse)} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
          Copy Morse
        </button>
      </div>
    </div>
  )
}
