import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT_ID, isAdsConfigured } from '../lib/ads'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

type Props = { variant?: 'banner' | 'sidebar'; slot?: string }

// Fixed container size (not just min-height) matching the ad-unit shape, reserved up front —
// this is what actually prevents layout shift, whether the slot ends up live or a placeholder.
const SIZE = {
  banner: 'h-24 max-w-3xl',
  sidebar: 'h-64 w-full max-w-xs',
}

/**
 * Renders a real AdSense unit whenever ADSENSE_CLIENT_ID is configured — the script itself
 * (loaded once from Layout.tsx) and this slot are not gated on cookie consent, so ads appear
 * on every visit. Falls back to a dashed placeholder only when no publisher ID is set, so
 * layout/spacing stays identical before and after ads go live.
 */
export default function AdSlot({ variant = 'banner', slot = '0000000000' }: Props) {
  const insRef = useRef<HTMLModElement>(null)
  const live = isAdsConfigured()

  useEffect(() => {
    if (!live) return
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch {
      // AdSense script not ready yet — nothing to recover, the slot just stays empty
    }
  }, [live])

  const size = SIZE[variant]

  if (live) {
    return (
      <div className={`mx-auto my-8 flex ${size} flex-col items-center justify-center`}>
        <span className="mb-1 text-[10px] uppercase tracking-wide text-slate-300 dark:text-slate-700">Advertisement</span>
        <ins
          ref={insRef}
          className="adsbygoogle block w-full flex-1"
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
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
