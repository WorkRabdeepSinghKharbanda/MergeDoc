export type HashAlgo = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'

export async function hashText(text: string, algo: HashAlgo): Promise<string> {
  const data = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest(algo, data)
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
}
