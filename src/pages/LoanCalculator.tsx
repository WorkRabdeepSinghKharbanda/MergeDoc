import { useMemo, useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function LoanCalculator() {
  useDocumentMeta('Loan & EMI Calculator Free Online | MergeDoc', 'Calculate your monthly loan payment, total interest, and total cost, entirely in your browser.')
  const [principal, setPrincipal] = useState(20000)
  const [annualRate, setAnnualRate] = useState(6.5)
  const [years, setYears] = useState(5)

  const result = useMemo(() => {
    const monthlyRate = annualRate / 100 / 12
    const n = years * 12
    if (n <= 0) return null
    const emi = monthlyRate === 0 ? principal / n : (principal * monthlyRate * (1 + monthlyRate) ** n) / ((1 + monthlyRate) ** n - 1)
    const totalPaid = emi * n
    const totalInterest = totalPaid - principal
    return { emi, totalPaid, totalInterest }
  }, [principal, annualRate, years])

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Loan & EMI Calculator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Calculate your monthly payment on a fixed-rate loan.</p>

      <div className="mt-8 space-y-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Loan amount
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Annual interest rate (%)
          <input type="number" step={0.1} value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Loan term (years)
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </label>
      </div>

      {result && (
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            ['Monthly payment', result.emi],
            ['Total interest', result.totalInterest],
            ['Total paid', result.totalPaid],
          ].map(([label, value]) => (
            <div key={label as string} className="rounded-lg border border-slate-200 p-4 text-center dark:border-slate-800">
              <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{(value as number).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
