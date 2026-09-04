import { useRef, useState, type DragEvent, type ChangeEvent } from 'react'

type Props = {
  multiple?: boolean
  onFiles: (files: File[]) => void
  label?: string
}

export default function FileDropzone({ multiple = false, onFiles, label }: Props) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function pickPdfs(fileList: FileList | null): File[] {
    if (!fileList) return []
    return [...fileList].filter((f) => f.type === 'application/pdf')
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragOver(false)
    const files = pickPdfs(e.dataTransfer.files)
    if (files.length) onFiles(files)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = pickPdfs(e.target.files)
    if (files.length) onFiles(files)
    e.target.value = ''
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
        dragOver
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40'
          : 'border-slate-300 bg-slate-50 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500'
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16.5V9m0 0-3 3m3-3 3 3m6 4.5v3a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 16.5v-3" />
      </svg>
      <p className="font-medium text-slate-700 dark:text-slate-200">{label ?? `Click or drop ${multiple ? 'PDFs' : 'a PDF'} here`}</p>
      <p className="text-sm text-slate-400 dark:text-slate-500">Files never leave your browser</p>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}
