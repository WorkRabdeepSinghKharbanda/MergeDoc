/**
 * Placeholder ad slot. Swap the inner div for your ad network's script/ins
 * tag (e.g. AdSense <ins class="adsbygoogle">) once you have a publisher ID.
 */
export default function AdSlot({ variant = 'banner' }: { variant?: 'banner' | 'sidebar' }) {
  const size = variant === 'banner' ? 'h-24 max-w-3xl' : 'h-64 w-full max-w-xs'
  return (
    <div
      className={`mx-auto my-8 flex ${size} items-center justify-center rounded-lg border border-dashed border-slate-300 text-xs text-slate-400 dark:border-slate-700 dark:text-slate-600`}
    >
      Ad slot
    </div>
  )
}
