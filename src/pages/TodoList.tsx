import { useState } from 'react'
import { readStorage, writeStorage } from '../lib/storage'
import { useDocumentMeta } from '../lib/useDocumentMeta'

type Task = { id: string; text: string; done: boolean }
const STORAGE_KEY = 'mergedoc:todo-list'

export default function TodoList() {
  useDocumentMeta('Todo List Free Online | MergeDoc', 'A simple todo list that saves to your browser, entirely in your browser.')
  const [tasks, setTasks] = useState<Task[]>(() => readStorage(STORAGE_KEY, []))
  const [input, setInput] = useState('')

  function persist(next: Task[]) {
    setTasks(next)
    writeStorage(STORAGE_KEY, next)
  }

  function addTask() {
    if (!input.trim()) return
    persist([...tasks, { id: crypto.randomUUID(), text: input.trim(), done: false }])
    setInput('')
  }

  function toggle(id: string) {
    persist(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function remove(id: string) {
    persist(tasks.filter((t) => t.id !== id))
  }

  function clearCompleted() {
    persist(tasks.filter((t) => !t.done))
  }

  const remaining = tasks.filter((t) => !t.done).length

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Todo List</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Saved locally in your browser — nothing is uploaded.</p>

      <div className="mt-8 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a task…"
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <button onClick={addTask} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
          Add
        </button>
      </div>

      <ul className="mt-6 space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
            <input type="checkbox" checked={task.done} onChange={() => toggle(task.id)} />
            <span className={`flex-1 text-sm ${task.done ? 'text-slate-400 line-through' : ''}`}>{task.text}</span>
            <button onClick={() => remove(task.id)} className="rounded px-2 py-1 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950">✕</button>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>{remaining} remaining</span>
          <button onClick={clearCompleted} className="hover:underline">Clear completed</button>
        </div>
      )}
    </div>
  )
}
