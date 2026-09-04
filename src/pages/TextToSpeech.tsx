import { useEffect, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function TextToSpeech() {
  useDocumentMeta('Text to Speech Free Online | MergeDoc', 'Convert typed text into spoken audio using your browser’s speech engine, entirely in your browser.')
  const toast = useToast()
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [text, setText] = useState('Hello! This is MergeDoc reading your text out loud.')
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [voiceIndex, setVoiceIndex] = useState(0)
  const [rate, setRate] = useState(1)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    if (!supported) return
    function loadVoices() {
      setVoices(window.speechSynthesis.getVoices())
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [supported])

  function speak() {
    if (!supported || !text.trim()) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    if (voices[voiceIndex]) utterance.voice = voices[voiceIndex]
    utterance.rate = rate
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => {
      setSpeaking(false)
      toast.error('Could not play speech.')
    }
    window.speechSynthesis.speak(utterance)
    setSpeaking(true)
  }

  function stop() {
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  if (!supported) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-bold">Text to Speech</h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400">Your browser doesn't support the Web Speech API. Try a recent version of Chrome, Edge, or Safari.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Text to Speech</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Type text and have your browser read it aloud.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      {voices.length > 0 && (
        <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Voice
          <select value={voiceIndex} onChange={(e) => setVoiceIndex(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
            {voices.map((v, i) => <option key={v.name} value={i}>{v.name} ({v.lang})</option>)}
          </select>
        </label>
      )}

      <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Speed: {rate.toFixed(1)}x
        <input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-1.5 w-full" />
      </label>

      <div className="mt-6 flex gap-3">
        <button onClick={speak} disabled={!text.trim()} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40">
          {speaking ? 'Restart' : 'Speak'}
        </button>
        <button onClick={stop} disabled={!speaking} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800">
          Stop
        </button>
      </div>
    </div>
  )
}
