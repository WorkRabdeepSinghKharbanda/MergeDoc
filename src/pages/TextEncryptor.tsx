import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { decryptText, encryptText } from '../lib/textCrypto'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function TextEncryptor() {
  useDocumentMeta('Text Encryptor & Decryptor Free Online | MergeDoc', 'Encrypt or decrypt text with a passphrase using AES-256-GCM, entirely in your browser.')
  const toast = useToast()
  const [text, setText] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [output, setOutput] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleEncrypt() {
    if (!text || !passphrase) return
    setBusy(true)
    try {
      setOutput(await encryptText(text, passphrase))
      toast.success('Encrypted.')
    } catch {
      toast.error('Could not encrypt this text.')
    } finally {
      setBusy(false)
    }
  }

  async function handleDecrypt() {
    if (!text || !passphrase) return
    setBusy(true)
    try {
      setOutput(await decryptText(text, passphrase))
      toast.success('Decrypted.')
    } catch {
      toast.error('Wrong passphrase or corrupted input.')
    } finally {
      setBusy(false)
    }
  }

  async function copyOutput() {
    if (!output) return
    await navigator.clipboard.writeText(output)
    toast.success('Copied to clipboard.')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Text Encryptor & Decryptor</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Encrypt or decrypt text with a passphrase (AES-256-GCM).</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Plain text to encrypt, or ciphertext to decrypt…"
        rows={6}
        className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <input
        type="password"
        value={passphrase}
        onChange={(e) => setPassphrase(e.target.value)}
        placeholder="Passphrase"
        className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
      />

      <div className="mt-4 flex gap-3">
        <button onClick={handleEncrypt} disabled={!text || !passphrase || busy} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40">
          Encrypt
        </button>
        <button onClick={handleDecrypt} disabled={!text || !passphrase || busy} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800">
          Decrypt
        </button>
      </div>

      {output && (
        <div className="mt-6">
          <textarea readOnly value={output} rows={6} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900" />
          <button onClick={copyOutput} className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
            Copy
          </button>
        </div>
      )}
    </div>
  )
}
