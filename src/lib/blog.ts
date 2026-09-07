export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  content: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'merge-pdf-without-uploading',
    title: 'How to Merge PDF Files Without Uploading Them Anywhere',
    description: 'Combine multiple PDFs into one file entirely in your browser — no upload, no account, no waiting on a server.',
    date: '2026-01-15',
    content: `Most "free" PDF mergers online quietly upload your files to a server before combining them. For most documents that's a minor inconvenience. For a contract, a medical record, or anything with an NDA attached, it's a real risk — you don't know what happens to a copy of your file once it leaves your device.

## How to merge PDFs client-side

MergeDoc's [Merge PDF](/merge) tool runs entirely in your browser using JavaScript PDF processing. The steps:

- Drop or select the PDFs you want to combine
- Drag to reorder them into the order you want in the final file
- Click merge — the combined PDF is generated and downloaded directly, no round-trip to a server

Because nothing is uploaded, there's no file-size cap imposed by a backend, no queue, and it works even on a slow connection.

## Why this matters for privacy

When you upload a file to a server, you're trusting that:

- The server actually deletes the file afterward (many say they do, few show you how)
- The upload itself isn't logged or cached somewhere
- The connection is encrypted end-to-end

Client-side processing sidesteps all three concerns by never sending the file anywhere. If you're merging anything sensitive — tax documents, contracts, medical paperwork — that's the difference between "probably fine" and "actually private."

If you also need to reorder pages after merging, or split the combined file back apart later, both [Reorder Pages](/reorder) and [Split PDF](/split) work the same way.`,
  },
  {
    slug: 'reduce-pdf-file-size',
    title: '5 Ways to Reduce a PDF\'s File Size',
    description: 'Practical techniques for shrinking a bloated PDF, from image compression to removing what you don\'t need.',
    date: '2026-01-22',
    content: `A PDF gets bloated for a handful of predictable reasons: high-resolution images, duplicated fonts, and embedded content you don't actually need. Here's how to fix each one.

## 1. Compress the images inside it

Scanned documents and PDFs with embedded photos are almost always dominated by image data, not text. If you have the original images, resizing them with an [Image Resizer](/image-resize) or [Image Compressor](/image-compress) before rebuilding the PDF gets the biggest win.

## 2. Re-serialize the PDF structure

Some of a PDF's size is structural overhead — duplicated font subsets, uncompressed object streams. MergeDoc's [Compress PDF](/compress) tool re-serializes the file with object streams enabled, which deduplicates this structural overhead. Note: this step targets structure, not embedded images — see point 1 for image-heavy files.

## 3. Remove unnecessary pages

If only a handful of pages actually matter, use [Split PDF](/split) or [Split PDF into Pages](/split-pdf-pages) to pull out just what you need instead of carrying the whole document around.

## 4. Strip metadata you don't need

Author names, software version strings, and revision history can accumulate in a PDF's metadata over multiple edits. [Edit Metadata](/metadata) lets you see and clear what's there.

## 5. Convert to images only if you truly need to

If the PDF is going somewhere that only accepts images (an image gallery, an old system), [PDF to Image](/pdf-to-image) converts each page to a JPG — but this is a one-way trip and loses selectable text, so only do it when you genuinely need image output.

Most of the time, #1 and #2 together get you most of the way there.`,
  },
  {
    slug: 'password-protect-pdf-guide',
    title: 'How to Password Protect a PDF (and Remove a Password Later)',
    description: 'Add or remove PDF encryption in your browser, and understand what password protection actually secures.',
    date: '2026-02-03',
    content: `PDF password protection comes in two flavors that are often confused: a password to *open* the file, and a password to change permissions (printing, copying text) while the file stays readable. Most "protect this PDF" requests mean the first one.

## Adding a password

[Protect PDF](/protect) encrypts the file so it can't be opened without the password you set. Once encrypted, anyone without the password sees nothing — not even a preview — when they try to open it in a PDF viewer.

Keep in mind:

- If you lose the password, the file is effectively gone — there's no recovery mechanism, by design
- The password only protects the file at rest; once someone enters it and the PDF is open, the content is fully readable and copyable

## Removing a password

If you have the password and want to share the file more freely, the same [Protect PDF](/protect) tool has a remove-password mode: enter the current password, and it re-saves the file without encryption.

## What password protection doesn't do

A password stops someone from *opening* the file. It doesn't:

- Redact or hide specific sensitive sections from someone who does have the password — for that, use [Redact PDF](/redact-pdf) to black out specific regions before sharing
- Prevent screenshots or manual retyping of visible content once opened
- Add a visible ownership mark — for that, pair it with [Watermark PDF](/watermark)

For genuinely sensitive documents, combine redaction of what shouldn't be shared at all with a password on what remains.`,
  },
  {
    slug: 'qr-codes-static-vs-dynamic',
    title: 'QR Codes 101: Static vs Dynamic, and When to Use Each',
    description: 'What actually happens when you scan a QR code, and why most free generators only give you the static kind.',
    date: '2026-02-14',
    content: `A QR code is just a pattern encoding text. What makes a QR code "static" or "dynamic" isn't the code itself — it's whether that text is your actual content, or a short redirect link someone else controls.

## Static QR codes

A static QR code encodes your final content directly: a URL, a Wi-Fi password, a contact card. Once generated, it never changes and never expires, because there's no server involved — the code *is* the data.

[QR Code Generator](/qr-generator) and [vCard QR Code Generator](/vcard-qr) both produce static codes this way. They'll work forever, with no dependency on a third-party service staying online.

## Dynamic QR codes

A dynamic QR code instead encodes a short redirect URL controlled by a service, which then forwards the scanner to your real destination. This lets you change the destination later without reprinting the code, and usually comes with scan analytics — but it only works as long as that service keeps running, and someone else now controls where your printed code points.

## Which one do you need?

Use a static QR code when:

- The destination will never need to change (a vCard, a fixed document link, a Wi-Fi password)
- You don't want a dependency on a third-party redirect service

Consider a dynamic QR code (from a dedicated service) when:

- You need to update the destination after the code is already printed on thousands of flyers
- You want scan-count analytics

For most personal and small-business uses — a menu, a business card, a portfolio link — a static QR code from [QR Code Generator](/qr-generator) is simpler and has no expiration risk. If you need many at once, [Batch QR Code Generator](/qr-batch-generator) generates one per line of input.`,
  },
  {
    slug: 'aes-256-text-encryption-explained',
    title: 'AES-256 Explained: How MergeDoc Encrypts Your Text Client-Side',
    description: 'A plain-language walkthrough of what AES-256-GCM and PBKDF2 actually do in the Text Encryptor tool.',
    date: '2026-02-25',
    content: `[Text Encryptor](/text-encryptor) turns a passphrase and some text into ciphertext you can safely paste into an email, a note, or a chat. Here's what's actually happening under the hood, using only your browser's built-in Web Crypto API — no server, no library shipped over the network.

## Turning a passphrase into a key

A human passphrase like "correct horse battery staple" isn't itself a valid encryption key — it needs to be stretched into one. This uses PBKDF2 (Password-Based Key Derivation Function 2), run for 100,000 iterations with a random salt. The large iteration count is deliberate: it makes brute-forcing many candidate passphrases against stolen ciphertext computationally expensive, since each guess costs 100,000 rounds of hashing instead of one.

## Encrypting with AES-256-GCM

The derived key feeds into AES-256-GCM, an authenticated encryption mode. Two things matter here:

- **256-bit key size** — the key space is large enough that brute-forcing the key itself (as opposed to the passphrase) isn't a realistic attack with current or foreseeable hardware
- **Authenticated (the "GCM" part)** — the ciphertext carries a tag that detects tampering. If even one byte of the encrypted output is altered, decryption fails loudly instead of silently returning corrupted plaintext

## What gets packed into the output

The final output bundles the random salt, a random initialization vector (IV), and the ciphertext together, base64-encoded into one block of text. All three pieces are needed to decrypt, and none of them are secret on their own — only the passphrase is.

## What this protects against, and what it doesn't

This is solid protection for text at rest — a note sitting in someone's inbox, a password stashed in a file. It does not protect against:

- A weak, guessable passphrase (the derivation makes each guess expensive, but a short dictionary word is still a short dictionary word)
- Someone with access to your device while the plaintext is on screen

Pair it with a strong passphrase — [Passphrase Generator](/passphrase-generator) or [Password Generator](/password-tool) can both produce one.`,
  },
  {
    slug: 'why-client-side-tools-matter',
    title: "The Case for Client-Side Tools: Why Your Files Shouldn't Have to Leave Your Browser",
    description: 'Most online file tools work by uploading your data to a server. Here\'s why that\'s not actually necessary for most tasks.',
    date: '2026-03-10',
    content: `Search for almost any "online PDF tool" or "image converter" and you'll land on a page that uploads your file to a server, processes it there, and sends back a result. This has been the default pattern for over a decade — but for a huge share of these tasks, it's solving a problem that no longer needs solving.

## Why the upload model became the default

Early browsers genuinely couldn't do much heavy lifting client-side — no fast JavaScript engines, no canvas image processing, no Web Crypto API. Uploading to a server was the only option. That constraint mostly disappeared years ago, but the upload-based tools built during that era never had a reason to rebuild.

## What's actually possible in a modern browser today

Modern browsers can do nearly everything a small server-side script could:

- Parse, edit, and rebuild PDF structure (used across every tool in [PDF Tools](/pdf-tools))
- Resize, compress, and re-encode images via the canvas API (used in [Image Tools](/image-tools))
- Cryptographically hash and encrypt data via the Web Crypto API (used in [Security & Privacy Tools](/security-tools))
- Rasterize PDF pages, extract embedded text, decode QR codes from an image

None of this requires a network round-trip once the page itself has loaded.

## The actual tradeoffs

Client-side processing isn't free of tradeoffs — it's worth being honest about them:

- Very large files are bounded by your device's memory, not a server's, which can be a limit or a relief depending on your device
- There's no server-side history or account sync — closing the tab means the session's state is gone unless a tool explicitly saves to local storage
- Heavier processing (e.g. rendering many PDF pages) uses your device's CPU, not someone else's

In exchange, you get files that never leave your device, no accounts, no arbitrary rate limits, and tools that keep working offline once loaded. For anything involving a document you'd rather not hand to an unknown third-party server, that trade is worth making.`,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
