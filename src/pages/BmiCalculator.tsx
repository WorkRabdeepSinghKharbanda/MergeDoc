import { useMemo, useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

function classify(bmi: number): string {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

export default function BmiCalculator() {
  useDocumentMeta('BMI Calculator Free Online | MergeDoc', 'Calculate your Body Mass Index from height and weight, entirely in your browser.')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [heightCm, setHeightCm] = useState(170)
  const [weightKg, setWeightKg] = useState(70)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(7)
  const [weightLb, setWeightLb] = useState(154)

  const bmi = useMemo(() => {
    if (unit === 'metric') {
      const m = heightCm / 100
      return weightKg / (m * m)
    }
    const totalInches = heightFt * 12 + heightIn
    return (703 * weightLb) / (totalInches * totalInches)
  }, [unit, heightCm, weightKg, heightFt, heightIn, weightLb])

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">BMI Calculator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Calculate your Body Mass Index.</p>

      <div className="mt-8 flex gap-2">
        {(['metric', 'imperial'] as const).map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${unit === u ? 'bg-indigo-600 text-white' : 'border border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'}`}
          >
            {u === 'metric' ? 'Metric (cm/kg)' : 'Imperial (ft/lb)'}
          </button>
        ))}
      </div>

      {unit === 'metric' ? (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Height (cm)
            <input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          </label>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Weight (kg)
            <input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          </label>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Height (ft)
            <input type="number" value={heightFt} onChange={(e) => setHeightFt(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          </label>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Height (in)
            <input type="number" value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          </label>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Weight (lb)
            <input type="number" value={weightLb} onChange={(e) => setWeightLb(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
          </label>
        </div>
      )}

      {Number.isFinite(bmi) && bmi > 0 && (
        <div className="mt-8 rounded-lg border border-slate-200 p-6 text-center dark:border-slate-800">
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{bmi.toFixed(1)}</div>
          <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{classify(bmi)}</div>
        </div>
      )}
    </div>
  )
}
