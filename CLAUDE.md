# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server
- `npm run build` — `tsc -b && vite build`, output to `dist/`
- `npm run lint` — oxlint (`.oxlintrc.json`)
- `npm run preview` — serve the production build locally
- Deploy: `vercel --prod --yes --name mergedoc` (project already linked in `.vercel/`)

No test runner is configured.

## Architecture

Client-side PDF tools site. Vite + React + TypeScript + React Router + Tailwind v4 (via `@tailwindcss/vite`, no `postcss.config`/`tailwind.config` — styles are plain utility classes plus `@import "tailwindcss";` and a `@custom-variant dark` in `src/index.css`).

Everything runs in the browser — there is no backend/API.

- `src/lib/pdf.ts` — the only place that touches `@cantoo/pdf-lib` (a drop-in `pdf-lib` fork; same API, adds `.encrypt()`/password-load via Web Crypto). Each tool page calls one function from here (`mergePdfs`, `splitPdf`, `rotatePdf`, `compressPdf`, `imagesToPdf`, `watermarkPdf`, `setPdfMetadata`/`readPdfMetadata`, `protectPdf`/`unprotectPdf`, `reorderPdf`, `cropPdf`, `signPdf`, `readPdfFormFields`/`fillPdfForm`, `addPageNumbers`, `textToPdf`, `generateInvoicePdf`, `redactPdf`, `splitPdfToPages`) plus the shared `downloadBlob` helper. New PDF operations should be added here, not inline in a page.
- `src/lib/encode.ts`, `src/lib/caseConvert.ts`, `src/lib/hash.ts`, `src/lib/csv.ts` — pure-JS helpers for Base64/URL encode-decode, case conversion, Web Crypto-backed hashing, and naive CSV↔JSON, used by Base64Tool/UrlEncoder/CaseConverter/HashGenerator/CsvJsonConverter respectively. `csv.ts` is a plain comma-split — no quoted-field escaping (documented in-file).
- `src/lib/color.ts` — HEX/RGB/HSL conversions + WCAG contrast ratio math, used by ColorTool.
- `src/lib/textCrypto.ts` — `encryptText`/`decryptText`, AES-256-GCM with a PBKDF2-derived key (100k iterations) from a user passphrase, salt+iv+ciphertext packed as base64. Used by TextEncryptor. Wrong passphrase/corrupted input surfaces as a decrypt error, not silently wrong output.
- `src/lib/slug.ts` — `slugify`, used by SlugGenerator.
- `src/lib/shuffle.ts` — `shuffle` (Fisher-Yates) + `splitIntoGroups`, used by TeamGenerator.
- `src/lib/passphrase.ts` — `generatePassphrase`, a curated real-word bank (distinct from `lorem.ts`'s Latin filler), used by PassphraseGenerator.
- `src/lib/vcard.ts` — `buildVCard`, used by VCardQr together with `generateQrDataUrl` from `qr.ts`.
- `src/lib/readability.ts` — `readingStats` (Flesch Reading Ease + reading time), built on `countText` from `text.ts`, used by ReadingTime.
- `src/lib/colorblind.ts` — `simulateColorBlindness`, canvas pixel-matrix transform (Brettel/Vienot-style approximation) for protanopia/deuteranopia/tritanopia, used by ColorBlindSimulator.
- `src/lib/barcode.ts` — `encodeCode128B`/`isCode128Printable`, a from-scratch Code 128B encoder (printable ASCII only), used by BarcodeGenerator to draw bars on canvas.
- `src/lib/subnet.ts` — `calculateSubnet`, pure bitwise IPv4 CIDR math, used by SubnetCalculator.
- `src/lib/htmlEntities.ts` — `encodeHtmlEntities`/`decodeHtmlEntities` via a detached `div`/`textarea` (never inserted into the live DOM as executable markup), used by HtmlEntityTool.
- `src/lib/qrScan.ts` — `scanQrFromFile`, the only place that touches `jsqr` (the one non-pdf/image runtime dependency added beyond the original set — decoding a QR image is impractical to hand-roll, unlike everything else in this codebase). Used by QrScanner.
- `src/lib/numberWords.ts`, `src/lib/roman.ts`, `src/lib/morse.ts` — pure conversion functions (`numberToWords`, `toRoman`/`fromRoman`, `textToMorse`/`morseToText`), used by NumberToWords, RomanNumeralConverter, and MorseCodeTranslator (which also plays the result via Web Audio `AudioContext`, no library).
- `src/lib/asciiFont.ts` — `renderAsciiBanner`, a hand-authored 5-row block font (letters/digits/space only), used by AsciiArtGenerator.
- `src/lib/colorPalette.ts` — `extractPalette`, coarse pixel-bucket dominant-color sampling (not k-means), used by ColorPaletteExtractor.
- `src/lib/wordFrequency.ts` — `wordFrequencies` with an optional English stop-word filter, used by WordFrequencyAnalyzer.
- `src/lib/storage.ts` — `readStorage`/`writeStorage`, a try/catch-wrapped localStorage helper (private browsing / disabled storage / quota all fail silently to a fallback). This is the only place in the codebase that persists anything — every other tool is stateless per-visit. Used by TodoList and Scratchpad.
- `src/lib/billSplit.ts` — `settleBill`, a greedy debtor/creditor matching algorithm (net balance vs. equal share, largest-to-largest settle), used by BillSplitter.
- `src/lib/markdownTable.ts` — `toMarkdownTable`, comma/tab-delimited text to a Markdown table, used by MarkdownTableGenerator.
- `src/lib/lorem.ts` — `generateLorem`, a fixed word-bank placeholder text generator, used by LoremGenerator.
- `src/lib/markdown.ts` — `markdownToHtml`, a small escaped-then-transformed subset of Markdown (headers, bold/italic, links, inline code, flat lists — no tables/nesting), used by MarkdownPreview. Input is HTML-escaped before transformation so raw HTML/script in the textarea can't execute via the `dangerouslySetInnerHTML` render.
- `src/lib/pdfjs.ts` — the only place that touches `pdfjs-dist`, used for anything that needs to rasterize a page to canvas or read its text layer: `renderPagesToImages` (PDF→JPG), `renderThumbnail` (page-reorder/sign-page previews), `getPageCount`, `extractPdfText` (per-page plain text, used by Compare and Extract Text). The worker is wired via `?url` import (`pdf.worker.min.mjs?url`) — needed for Vite to bundle it correctly.
- `src/lib/diff.ts` — pure word-level LCS diff (`diffWords`), used by ComparePdf. ponytail: O(n·m) table, fine for page-sized text, not built for whole books.
- `src/lib/password.ts` — `generatePassword` (crypto.getRandomValues-backed) and `checkPasswordStrength` (heuristic length+variety scoring, not zxcvbn-grade), used by PasswordTool.
- `src/lib/converters.ts` — `UNIT_CATEGORIES` table + `convertUnit`, used by UnitConverter. Temperature is handled specially (not a linear factor).
- `src/pages/*.tsx` — one page per tool: Merge, Split, Compress, Rotate, Watermark, Protect (add/remove password, two-mode toggle), Metadata (read+edit), Reorder (thumbnail grid, move/delete pages), PdfToImage, ImageToPdf, ComparePdf (word-diff between two PDFs), SignPdf (canvas-drawn signature placed via slider position, embedded as PNG), FillForm (detects AcroForm fields, renders inputs per field type, optional flatten), ExtractText (per-page text → copy/download .txt), CropPdf (margin inset in points), AddPageNumbers, TextToPdf (word-wrapped plain text → paginated PDF), RedactPdf (draws opaque black rectangles over chosen regions — visual cover only, does not strip underlying text), SplitPdfPages (one downloaded file per page), plus non-PDF utilities ImageCompress, QrGenerator, WordCounter, TypeMaster (typing speed/WPM test), PasswordTool (generator + strength meter), JsonFormatter (format/minify/validate), UnitConverter, Base64Tool, UrlEncoder, CaseConverter, HashGenerator (SHA-1/256/384/512 via Web Crypto), TimestampConverter, CsvJsonConverter, TextDiff (plain-text word diff, reuses `diffWords` from ComparePdf), ColorTool, UuidGenerator, LoremGenerator, RegexTester, ImageResizer, MarkdownPreview, MetaTagGenerator, BmiCalculator, PercentageCalculator, TipCalculator, AgeCalculator, NumberBaseConverter, TextEncryptor, TextToSpeech (Web Speech API `speechSynthesis`, feature-detected with a fallback message), SlugGenerator, FaviconGenerator (reuses `resizeImage`), QrBatchGenerator (reuses `generateQrDataUrl`, one QR per line), LoanCalculator, DiscountCalculator, GpaCalculator, CountdownStopwatch, TeamGenerator, TextSorter, InvoiceGenerator, VCardQr, PassphraseGenerator, ReadingTime, PomodoroTimer, SalesTaxCalculator, ImageConverter, ColorBlindSimulator, CssGradientGenerator, CssBoxShadowGenerator, CssBorderRadiusGenerator, BarcodeGenerator, HtmlEntityTool, PlaceholderImage, SubnetCalculator, QrScanner, NumberToWords, RomanNumeralConverter, MorseCodeTranslator, AsciiArtGenerator, ColorPaletteExtractor, WordFrequencyAnalyzer, TodoList (localStorage-persisted), Scratchpad (localStorage-persisted, debounced autosave), CountdownToDate, BillSplitter, DecisionWheel, MarkdownTableGenerator, DiceRoller, RandomNumberGenerator, plus `Home` (landing page, split into a "PDF tools" grid and an "Other tools" grid). Each tool page owns its own file-selection state; there is no shared state/store across pages.
- `src/lib/image.ts` — canvas-based image re-encode (`compressImage`), resize (`resizeImage`, used by ImageResizer and FaviconGenerator), and format conversion (`convertImageFormat`, used by ImageConverter). No PDF involved.
- `src/lib/qr.ts` — thin wrapper around the `qrcode` npm package (has a browser build via its `browser` package.json field), used by `QrGenerator`.
- `src/lib/text.ts` — pure text stats (`countText`: words/chars/sentences/paragraphs), used by `WordCounter`. No dependency.
- `src/components/FileDropzone.tsx` — shared drag-and-drop/click file input for single-PDF tools. `ImageToPdf` has its own inline picker since it accepts images, not PDFs.
- `src/components/ToastProvider.tsx` — app-wide toast context (`useToast().success(msg)` / `.error(msg)`). Every tool's success/failure path reports through this, not inline `<p>` error text. Wraps the whole app in `App.tsx`.
- `src/components/ThemeToggle.tsx` — light/dark toggle; persists to `localStorage['theme']`. The initial class is set by an inline script in `index.html` `<head>` (before React mounts) to avoid a flash of the wrong theme.
- `src/lib/useDocumentMeta.ts` — sets `document.title` + the meta-description tag per page (no router-integrated head library; this is deliberately minimal since it's a small, fixed set of routes).
- `src/components/AdSlot.tsx` — placeholder ad slot (dashed box). Swap its inner div for a real ad network embed (e.g. AdSense `<ins>`) when a publisher ID exists.
- `src/lib/tools.ts` — the single source of truth for the tool list (`PDF_TOOLS`, `OTHER_TOOLS`: to/title/description/icon path). `Home.tsx` and `NavHeader.tsx` both read from here — add a new tool here once, not in both places.
- `src/components/NavHeader.tsx` — the nav bar: two dropdown menus (PDF Tools / Other Tools, click-outside-to-close) on desktop, a slide-down link list behind a hamburger on mobile (`sm:` breakpoint).
- `src/components/Layout.tsx` — the router's persistent shell (`NavHeader` + footer) via `<Outlet />`.
- `src/App.tsx` — route table; adding a new tool means adding a page component here and a route.
- `index.html` — base canonical URL, Open Graph/Twitter tags, favicon/manifest links, and two JSON-LD blocks (`WebApplication`, and an `ItemList` enumerating every tool route) hardcoded here (single-page site, no per-route SSR/prerendering, so these are the values crawlers see if they don't execute JS). `og-image.png` and the favicon PNGs (`favicon-16x16.png`/`favicon-32x32.png`/`apple-touch-icon.png`/`icon-192.png`/`icon-512.png`) are generated, not hand-drawn — see the pixel-block "M"/wordmark approach baked into their generation (no image library available, so they're built as raw RGBA buffers and hand-encoded to PNG via Node's `zlib`; the generator scripts themselves aren't checked in, only their output). `public/manifest.json` is the PWA/home-screen manifest referencing the same icons.
- `src/lib/useDocumentMeta.ts` — beyond `document.title`/meta description, also updates `<link rel="canonical">` (to `https://mergedoc.vercel.app` + the current path) and og/twitter title+description+url per route on every navigation. This only matters to crawlers that execute JS (Google does; most social-preview scrapers don't) — the static tags in `index.html` are what non-JS bots and link unfurls see, and are necessarily generic/homepage-only without SSR.
- `public/sitemap.xml` / `public/robots.txt` — static, hand-maintained, one `<url>` per route. Currently point at the real `https://mergedoc.vercel.app` domain — update both if the domain changes.
- `vercel.json` — SPA rewrite (`/(.*) -> /index.html`) so direct navigation to a route like `/merge` doesn't 404 on Vercel.

### sign PDF caveat

`SignPdf.tsx` positions the signature via two range sliders (horizontal/vertical), not real drag-and-drop — the dashed placement box shown over the preview is visual only and doesn't respond to pointer drag. Fine for v1; a real implementation would make that box draggable and derive `xRatio`/`yRatio` from its position instead.

### compress caveat

`compressPdf` in `src/lib/pdf.ts` only re-serializes with `useObjectStreams: true` (structural dedup of fonts/streams). It does not rasterize/re-encode images, so it won't meaningfully shrink image-heavy PDFs. A real size-reduction pipeline would reuse `renderPagesToImages` from `src/lib/pdfjs.ts` to rasterize pages and re-encode as JPEG, then rebuild the PDF from those images.
