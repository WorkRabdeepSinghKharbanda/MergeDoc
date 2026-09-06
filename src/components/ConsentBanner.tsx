import { useState } from 'react'
import { readStorage, writeStorage } from '../lib/storage'
import { isAdsConfigured, loadAdsenseScript } from '../lib/ads'

const STORAGE_KEY = 'mergedoc:ad-consent'

export default function ConsentBanner() {
  const [choice, setChoice] = useState<'accepted' | 'declined' | null>(() => readStorage<'accepted' | 'declined' | null>(STORAGE_KEY, null))

  if (!isAdsConfigured() || choice !== null) {
    if (choice === 'accepted') loadAdsenseScript()
    return null
  }

  function accept() {
    writeStorage(STORAGE_KEY, 'accepted')
    setChoice('accepted')
    loadAdsenseScript()
  }

  function decline() {
    writeStorage(STORAGE_KEY, 'declined')
    setChoice('declined')
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          MergeDoc stays free by showing ads. Ads use cookies to personalize content — see our{' '}
          <a href="/privacy-policy" className="underline hover:text-slate-900 dark:hover:text-slate-200">Privacy Policy</a>.
        </p>
        <div className="flex shrink-0 gap-2">
          <button onClick={decline} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
            Decline
          </button>
          <button onClick={accept} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
