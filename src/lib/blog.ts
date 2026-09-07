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
  {
    slug: 'resize-image-without-losing-quality',
    title: 'How to Resize an Image Without Losing Quality',
    description: 'What actually causes quality loss when resizing, and how to avoid it for both shrinking and enlarging.',
    date: '2026-03-18',
    content: `"Resizing loses quality" is only half true — it depends on which direction you're going, and what's causing the loss.

## Shrinking an image

Shrinking (downscaling) rarely loses meaningful quality on its own — you have more source pixels than the target needs, so a good resampling algorithm can produce a sharp, accurate smaller image. [Image Resizer](/image-resize) handles this using the canvas API's built-in image smoothing.

The quality loss people notice when shrinking usually comes from a *second* factor: aggressive JPEG re-compression applied at the same time. If you need both a smaller resolution and a smaller file size, treat them as separate steps mentally, even if one tool does both.

## Enlarging an image

Enlarging (upscaling) is the direction that genuinely loses quality, because the algorithm has to invent pixel data that was never captured. There's a hard ceiling here: no amount of resizing software recovers detail that isn't in the original. If you need a much larger version of a small image, the honest answer is that you need a higher-resolution source, not a smarter resize.

## Practical guidance

- Downscaling for a smaller file: safe, minimal visible loss
- Upscaling more than roughly 2x: expect visible softness, this is a physical limit, not a tool limitation
- Need a specific file size, not just dimensions? Use [Image Compressor](/image-compress) after resizing, so you're not fighting resolution and compression at once`,
  },
  {
    slug: 'minified-json-debugging',
    title: 'JSON Formatting 101: Why Minified JSON Breaks Debugging',
    description: 'Minified JSON is fine for machines and a nightmare for humans — here\'s why formatting it back out matters.',
    date: '2026-03-25',
    content: `JSON minification strips every non-essential character — whitespace, newlines, indentation — to make a payload smaller over the wire. That's a genuinely good idea for an API response a machine will parse. It's a terrible idea for a human trying to find one wrong field.

## What minification actually removes

A minified JSON blob is functionally identical to its formatted version — same keys, same values, same structure. What's gone is purely visual: the line breaks and indentation that let a human eye track which closing brace matches which opening one.

## Why that matters when debugging

When an API call fails validation or returns unexpected data, you usually need to answer one question: which field, nested how deep, has the wrong value? On a single unbroken line of minified JSON, that means manually counting braces. Formatted, with each nesting level indented, the same question is answered by just looking at where your eye lands.

[JSON Formatter](/json-formatter) does exactly this conversion, plus validates the JSON is well-formed in the first place — a common source of confusion is a payload that isn't actually valid JSON at all (a trailing comma, an unescaped quote), which a minifier will happily choke on with an unhelpful error.

## When to minify instead

Once you're done debugging and the JSON is headed into a request body, a config file that ships to production, or anywhere payload size matters, minify it back down. The same tool does both directions — format while you're working on it, minify when you're done.`,
  },
  {
    slug: 'how-to-test-a-regex',
    title: 'Regex Basics: How to Actually Test a Pattern Before Using It',
    description: 'A regular expression that looks right can still fail on real input — here\'s how to catch that before it ships.',
    date: '2026-04-02',
    content: `A regular expression is easy to write and surprisingly easy to get subtly wrong — matching too much, too little, or breaking entirely on an edge case you didn't think to try.

## The mistake: testing against only the input you had in mind

It's tempting to write a pattern, glance at it, and trust it because it *looks* right. The problem is a regex's behavior on edge cases (empty strings, extra whitespace, unicode characters, multiple matches on one line) is rarely obvious just from reading the pattern.

## Test against a spread of real inputs

Before using a pattern anywhere that matters — form validation, a data-cleaning script — run it against:

- The typical case you're designing for
- An empty or minimal input
- An input with extra whitespace or punctuation nearby
- A case specifically designed to *not* match, to confirm it correctly rejects

[Regex Tester](/regex-tester) lets you do this interactively: paste a pattern, paste sample text, and see exactly what matches (and what doesn't) highlighted directly in the text, instead of guessing from the pattern alone.

## A common trap: greedy vs lazy quantifiers

\`+\` and \`*\` are greedy by default — they'll match as much as possible, which can grab far more than you intended when there are multiple candidates in a line (e.g. matching everything between the *first* and *last* quote instead of one pair at a time). Adding \`?\` after a quantifier (\`+?\`, \`*?\`) makes it lazy — matching as little as possible instead. This single detail causes a large share of "why did my regex match too much" bugs.`,
  },
  {
    slug: 'uuid-v4-explained',
    title: 'UUIDs Explained: Why v4 Is Random, Not Sequential',
    description: 'What a UUID actually guarantees, why version 4 is the common default, and when a UUID is the wrong choice.',
    date: '2026-04-09',
    content: `A UUID (Universally Unique Identifier) is a 128-bit value formatted as 32 hex digits split into five groups. What most people actually want to know is: how does something generated with no central coordination avoid colliding with another one generated somewhere else entirely?

## Version 4: random, not sequential

[UUID Generator](/uuid-generator) produces version 4 UUIDs — the bits (aside from a few fixed version/variant bits) are filled with cryptographically random data. There's no counter, timestamp, or machine identifier baked in; two v4 UUIDs generated a millisecond apart on the same machine are unrelated to each other.

The collision math is what makes this safe: with 122 random bits, you'd need to generate roughly a billion billion (10^18) UUIDs before a 50% chance of any collision — a number large enough that in practice it doesn't happen.

## When a UUID is the right choice

- Distributed systems generating IDs with no shared database or coordination
- Anything where you don't want the ID to leak information (a sequential integer ID reveals how many records exist and in what order)

## When it's the wrong choice

- If you need IDs to sort by creation time, a random v4 UUID actively works against you — every new row scatters through an index instead of appending. A timestamp-ordered ID scheme (or a plain auto-increment integer) is the better fit there.
- If storage size matters a lot, a UUID (16 bytes) is heavier than a 4- or 8-byte integer.

The right identifier scheme depends on whether you need "guaranteed no collision with no coordination" or "sorts naturally by time" — they're different requirements, and a UUID only solves the first one.`,
  },
  {
    slug: 'loan-emi-formula-explained',
    title: 'The Loan/EMI Formula Behind Every Amortization Calculator',
    description: 'What the monthly payment formula actually computes, and why the same loan can look different at different terms.',
    date: '2026-04-17',
    content: `Every loan or EMI calculator, including [Loan & EMI Calculator](/loan-calculator), is built on the same standard amortization formula. Understanding it explains why extending a loan's term lowers the monthly payment but increases the total interest paid.

## The formula

The monthly payment for a fixed-rate loan is:

\`M = P × [r(1+r)^n] / [(1+r)^n − 1]\`

Where P is the loan principal, r is the monthly interest rate (annual rate divided by 12), and n is the number of monthly payments.

## Why a longer term lowers the payment but raises total cost

Stretching n (the number of payments) across more months spreads the same principal over more installments, which lowers each individual payment — but it also means interest keeps accruing on the outstanding balance for longer. The result: a 30-year loan has a smaller monthly payment than a 15-year loan for the same principal and rate, but pays substantially more interest over the loan's life.

## Why early payments are mostly interest

In the early months of a loan, most of each payment goes to interest, not principal — because interest is calculated on the current outstanding balance, which is still close to the full loan amount. As the balance shrinks, a growing share of each fixed payment goes toward principal instead. This is why paying slightly extra early in a loan's life has an outsized effect on total interest paid compared to the same extra payment made later.`,
  },
  {
    slug: 'base64-encoding-what-its-for',
    title: 'Base64 Encoding: What It\'s For (and What It Isn\'t)',
    description: 'Base64 is not encryption. Here\'s what it actually solves, and the mistake of using it for anything security-related.',
    date: '2026-04-24',
    content: `Base64 shows up constantly — in image data URIs, email attachments, API tokens — but its purpose is routinely confused with encryption. It isn't encryption. It's a format conversion.

## What Base64 actually does

Many systems (older email protocols, some text-based data formats) can only reliably carry plain ASCII text — not arbitrary binary bytes. Base64 solves that by re-encoding binary data as a restricted set of 64 printable ASCII characters, so it can travel safely through systems that would otherwise mangle raw binary.

## Why it's not security

Base64 is fully reversible with zero secret information — anyone can decode it instantly with [Base64 Encoder/Decoder](/base64-tool) or a one-line command. There's no key, no passphrase, nothing hidden. If you see a Base64 string and assume it's "encoded" in a way that protects its contents, that assumption is wrong; it protects nothing.

A surprising number of real security issues have come from someone Base64-encoding a password or API key and treating that as sufficient protection. It is exactly as protected as writing it in plain text and reversing the letters.

## What to use instead, for actual secrecy

If you need to keep something confidential, you need real encryption — a scheme like AES with a secret key, not a reversible format conversion. [Text Encryptor](/text-encryptor) uses AES-256-GCM for that purpose; Base64 is simply the wrong tool for that job, however often it gets used as one.`,
  },
  {
    slug: 'flesch-reading-ease-explained',
    title: 'Flesch Reading Ease: What Your Readability Score Actually Means',
    description: 'The formula behind the readability score, what a high or low number means, and its real limitations.',
    date: '2026-05-01',
    content: `[Reading Time & Readability](/reading-time) reports a Flesch Reading Ease score alongside estimated reading time. The number can look arbitrary if you don't know what it's measuring.

## The formula

Flesch Reading Ease is computed from two structural signals: average sentence length (words per sentence) and average word length (syllables per word). Longer sentences and longer words both push the score down; shorter ones push it up. The scale runs roughly 0–100, with higher meaning easier to read.

## What the score ranges mean

- 90–100: very easy, understandable by an 11-year-old
- 60–70: plain English, easily understood by most adults
- 30–50: fairly difficult, best suited to college-level readers
- 0–30: very difficult, dense academic or legal writing

## What it deliberately ignores

The formula only looks at sentence and word length — it has no concept of vocabulary difficulty, jargon, ambiguity, or whether the ideas themselves are complex. A sentence built entirely of short, simple-looking words can still score "easy" while being confusing or misleading in meaning. Readability scores are a useful structural proxy, not a judgment of whether writing is actually clear.

## Practical use

Use the score as a signal, not a target to game — chopping every sentence in half to inflate the number produces choppy, worse writing, not better communication. It's most useful as a comparison: is this draft more or less structurally dense than the last one, for a similar audience.`,
  },
  {
    slug: 'wcag-color-contrast-explained',
    title: 'Color Contrast and WCAG: Why Some Text Combinations Fail Accessibility',
    description: 'What a contrast ratio actually measures, the WCAG thresholds, and why light gray text is a common accessibility bug.',
    date: '2026-05-08',
    content: `Low-contrast text — light gray on white being the classic offender — is one of the most common accessibility failures on the web, and one of the easiest to catch before shipping.

## What a contrast ratio measures

WCAG contrast ratio compares the relative luminance of the foreground (text) color against the background color, producing a ratio from 1:1 (identical, invisible) up to 21:1 (pure black on pure white). [Color Converter](/color-tool) computes this ratio directly from any two HEX/RGB/HSL colors.

## The thresholds that matter

- **4.5:1** — minimum for normal-sized text to meet WCAG AA, the baseline most legal and organizational accessibility standards require
- **3:1** — minimum for large text (roughly 18pt+, or bold 14pt+), since bigger text is inherently easier to distinguish
- **7:1** — the stricter AAA level, for content that needs to be readable in poor lighting or by users with low vision

## Why this matters beyond compliance

Low contrast doesn't only affect people with diagnosed vision impairments — it affects anyone reading on a low-quality screen, in bright sunlight, or simply while tired. A design that "looks fine" on a calibrated monitor in a dim office can be nearly unreadable in the conditions most people actually use their phones.

## The common failure mode

Light gray text on a white background is popular in modern design because it looks subtle and clean — and it very often falls below 4.5:1 without anyone checking. Running your actual foreground/background pair through a contrast checker before shipping catches this in seconds, rather than after a complaint or an accessibility audit.`,
  },
  {
    slug: 'pomodoro-technique-why-25-minutes',
    title: 'The Pomodoro Technique: Why 25 Minutes Works',
    description: 'The reasoning behind the pomodoro interval, and how to adapt it when 25 minutes doesn\'t fit your work.',
    date: '2026-05-15',
    content: `The Pomodoro Technique — work for a fixed interval, then take a short break — is simple enough to sound arbitrary. The 25-minute default has a real rationale behind it, even if the exact number isn't magic.

## The core idea: bounded, undistracted focus

The technique's actual mechanism isn't the specific number of minutes — it's converting an open-ended, vague task ("work on this for a while") into a bounded commitment ("focus on just this for 25 minutes, then you get a break"). A bounded interval is psychologically easier to start than an open-ended one, which is most of the technique's value.

## Why roughly 25 minutes specifically

25 minutes is short enough that most people can sustain real focus for the whole interval without their attention degrading, but long enough to make meaningful progress on a task rather than just orienting toward it. The 5-minute break that follows is deliberately short — long enough to reset attention, short enough that momentum isn't lost.

## When to adjust it

The specific numbers are a starting point, not a law:

- Deep, hard-to-re-enter work (writing, complex debugging) often benefits from longer intervals, since 25 minutes may end just as you're getting into flow
- Shallow, high-interruption work (email, quick admin tasks) can work fine with shorter intervals
- After roughly four intervals, a longer break (15–30 minutes) is the traditional recommendation, to avoid accumulating fatigue across a full day

[Pomodoro Timer](/pomodoro-timer) runs the standard 25/5 pattern by default — treat it as a default worth adjusting once you know how your own attention actually behaves.`,
  },
  {
    slug: 'csv-vs-json-when-to-use-each',
    title: 'CSV vs JSON: When to Use Each Format',
    description: 'Two very different data shapes that get compared constantly — here\'s the actual deciding factor.',
    date: '2026-05-22',
    content: `CSV and JSON solve overlapping but genuinely different problems. Picking between them isn't about which is "better" — it's about whether your data is uniformly tabular or has real structure.

## CSV: flat, tabular, spreadsheet-shaped

CSV is a natural fit when every record has exactly the same fields, with no nesting — a list of names and emails, a table of transactions, an export a spreadsheet can open directly. Its simplicity is the whole point: any tool from Excel to a one-line shell script can read it.

CSV's limitation is exactly that flatness: it has no native way to represent a record with a nested list or an optional sub-object. Force that kind of data into CSV and you end up with awkward workarounds — flattened column names, repeated rows, delimiter escaping headaches.

## JSON: nested, structured, code-shaped

JSON handles nested structure naturally — an order with a list of line items, a user record with an optional array of addresses, deeply nested configuration. It's the natural fit for anything that isn't uniformly tabular, and it's what most APIs speak natively.

Its tradeoff is verbosity and tooling: a human can't easily eyeball a large JSON file the way they can skim a CSV in a spreadsheet, and not every tool ingests it as readily.

## Converting between them

When you need to move data between a spreadsheet-shaped tool and a code-shaped one, [CSV ⇄ JSON Converter](/csv-json-converter) converts either direction. The conversion is lossless for flat data — but converting a nested JSON structure to CSV will need that structure flattened first, since CSV simply has nowhere to put a nested list.`,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
