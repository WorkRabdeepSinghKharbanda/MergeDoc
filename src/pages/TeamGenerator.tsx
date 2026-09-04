import { useState } from 'react'
import { shuffle, splitIntoGroups } from '../lib/shuffle'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function TeamGenerator() {
  useDocumentMeta('Random Team Generator Free Online | MergeDoc', 'Split a list of names into random, balanced teams, entirely in your browser.')
  const [namesInput, setNamesInput] = useState('Alice\nBob\nCharlie\nDana\nEve\nFrank')
  const [teamCount, setTeamCount] = useState(2)
  const [teams, setTeams] = useState<string[][]>([])

  function generate() {
    const names = namesInput.split('\n').map((n) => n.trim()).filter(Boolean)
    if (names.length === 0) return
    setTeams(splitIntoGroups(shuffle(names), Math.max(1, Math.min(teamCount, names.length))))
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Random Team Generator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Paste a list of names (one per line) to split into random teams.</p>

      <textarea
        value={namesInput}
        onChange={(e) => setNamesInput(e.target.value)}
        rows={8}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Number of teams
        <input type="number" min={1} value={teamCount} onChange={(e) => setTeamCount(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
      </label>

      <button onClick={generate} className="mt-6 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
        Generate teams
      </button>

      {teams.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {teams.map((team, i) => (
            <div key={i} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Team {i + 1}</p>
              <ul className="mt-2 space-y-1 text-sm">
                {team.map((name) => <li key={name}>{name}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
