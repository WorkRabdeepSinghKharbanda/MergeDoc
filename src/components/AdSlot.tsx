import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT_ID, isAdsConfigured } from '../lib/ads'
import { readStorage } from '../lib/storage'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

type Props = { variant?: 'banner' | 'sidebar'; slot?: string }

/**
 * Renders a real AdSense unit once configured (ADSENSE_CLIENT_ID set) and consent given,
 * otherwise falls back to a dashed placeholder so layout/spacing stays visible during dev.
 */
export default function AdSlot({ variant = 'banner', slot = '0000000000' }: Props) {
  const insRef = useRef<HTMLModElement>(null)
  const consented = readStorage<'accepted' | 'declined' | null>('mergedoc:ad-consent', null) === 'accepted'
  const live = isAdsConfigured() && consented

  useEffect(() => {
    if (!live) return
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch {
      // AdSense script not ready yet — nothing to recover, the slot just stays empty
    }
  }, [live])

  const size = variant === 'banner' ? 'h-24 max-w-3xl' : 'h-64 w-full max-w-xs'

  if (live) {
    return (
      <ins
        ref={insRef}
        className={`adsbygoogle mx-auto my-8 block ${size}`}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    )
  }

  return (
    <div
      className={`mx-auto my-8 flex ${size} items-center justify-center rounded-lg border border-dashed border-slate-300 text-xs text-slate-400 dark:border-slate-700 dark:text-slate-600`}
    >
      Ad slot
    </div>
  )
}
