import { useMemo, useState } from 'react'
import { useDocumentMeta } from '../lib/useDocumentMeta'

type Course = { grade: number; credits: number }

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, A: 4.0, 'A-': 3.7,
  'B+': 3.3, B: 3.0, 'B-': 2.7,
  'C+': 2.3, C: 2.0, 'C-': 1.7,
  'D+': 1.3, D: 1.0, F: 0.0,
}

export default function GpaCalculator() {
  useDocumentMeta('GPA Calculator Free Online | MergeDoc', 'Calculate your grade point average from letter grades and credit hours, entirely in your browser.')
  const [courses, setCourses] = useState<Course[]>([{ grade: 4.0, credits: 3 }])

  const gpa = useMemo(() => {
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0)
    if (totalCredits === 0) return 0
    const totalPoints = courses.reduce((sum, c) => sum + c.grade * c.credits, 0)
    return totalPoints / totalCredits
  }, [courses])

  function update(index: number, field: keyof Course, value: number) {
    setCourses((prev) => prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)))
  }

  function addCourse() {
    setCourses((prev) => [...prev, { grade: 4.0, credits: 3 }])
  }

  function removeCourse(index: number) {
    setCourses((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">GPA Calculator</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Add each course's grade and credit hours to calculate your GPA.</p>

      <div className="mt-8 space-y-3">
        {courses.map((course, i) => (
          <div key={i} className="flex items-center gap-2">
            <select
              value={Object.keys(GRADE_POINTS).find((g) => GRADE_POINTS[g] === course.grade) ?? 'A'}
              onChange={(e) => update(i, 'grade', GRADE_POINTS[e.target.value])}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              {Object.keys(GRADE_POINTS).map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <input
              type="number"
              min={0}
              value={course.credits}
              onChange={(e) => update(i, 'credits', Number(e.target.value))}
              placeholder="Credits"
              className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
            <button onClick={() => removeCourse(i)} className="rounded px-2 py-1 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950">✕</button>
          </div>
        ))}
      </div>

      <button onClick={addCourse} className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
        Add course
      </button>

      <div className="mt-8 rounded-lg border border-slate-200 p-6 text-center dark:border-slate-800">
        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{gpa.toFixed(2)}</div>
        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">GPA</div>
      </div>
    </div>
  )
}
