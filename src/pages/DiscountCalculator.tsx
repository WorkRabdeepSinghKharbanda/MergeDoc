import { useMemo, useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function DiscountCalculator() {
  useDocumentMeta('Discount Calculator Free Online | MergeDoc', 'Calculate the sale price and savings from an original price and discount percentage, entirely in your browser.')
  const [price, setPrice] = useState(100)
  const [discount, setDiscount] = useState(20)

  const { savings, finalPrice } = useMemo(() => {
    const savings = (price * discount) / 100
    return { savings, finalPrice: price - savings }
  }, [price, discount])

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Discount Calculator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Calculate the sale price after a percentage discount.</p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Original price
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Discount (%)
          <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{finalPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Final price</div>
        </div>
        <div className="rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
          <div className="text-xl font-bold text-green-600 dark:text-green-400">{savings.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">You save</div>
        </div>
      </div>
    </div>
  )
}
