import { useMemo, useState } from 'react'
import { settleBill, type Person } from '../lib/billSplit'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function BillSplitter() {
  useDocumentMeta('Bill Splitter Free Online | MergeDoc', 'Split a shared bill fairly and see who owes whom, entirely in your browser.')
  const [people, setPeople] = useState<Person[]>([
    { name: 'Alice', paid: 60 },
    { name: 'Bob', paid: 0 },
    { name: 'Charlie', paid: 20 },
  ])

  const settlements = useMemo(() => settleBill(people.filter((p) => p.name.trim())), [people])
  const total = people.reduce((sum, p) => sum + p.paid, 0)
  const share = people.length > 0 ? total / people.length : 0

  function update(index: number, field: keyof Person, value: string | number) {
    setPeople((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)))
  }

  function addPerson() {
    setPeople((prev) => [...prev, { name: '', paid: 0 }])
  }

  function removePerson(index: number) {
    setPeople((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Bill Splitter</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Enter what each person paid — see who owes whom to settle up evenly.</p>

      <div className="mt-8 space-y-3">
        {people.map((person, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={person.name}
              onChange={(e) => update(i, 'name', e.target.value)}
              placeholder="Name"
              className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
            <input
              type="number"
              min={0}
              value={person.paid}
              onChange={(e) => update(i, 'paid', Number(e.target.value))}
              placeholder="Paid"
              className="w-28 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
            <button onClick={() => removePerson(i)} className="rounded px-2 py-1 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950">✕</button>
          </div>
        ))}
      </div>

      <button onClick={addPerson} className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
        Add person
      </button>

      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        Total: {total.toFixed(2)} — Fair share each: {share.toFixed(2)}
      </p>

      <div className="mt-4 space-y-2">
        {settlements.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">Everyone's even.</p>
        ) : (
          settlements.map((s, i) => (
            <div key={i} className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-800">
              <strong>{s.from}</strong> owes <strong>{s.to}</strong> <span className="text-indigo-600 dark:text-indigo-400">{s.amount.toFixed(2)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
