# MergeDoc

Free, private PDF and utility tools that run entirely in your browser. No uploads, no accounts, no servers — every tool processes your files and text locally using client-side JavaScript.

**Live:** https://mergedoc.vercel.app

## Why client-side?

There is no backend. Nothing you upload, type, or generate ever leaves your device — PDFs are parsed and rebuilt in-browser, images are processed on `<canvas>`, and text tools run as pure JavaScript. That means no file size limits imposed by a server, no privacy risk, and most tools keep working offline once the page has loaded.

## Tools

### PDF

Merge, Split, Compress, Rotate, Watermark, Protect/Unprotect (password), Edit Metadata, Reorder & Delete Pages, PDF to Image, Image to PDF, Compare PDFs, Sign PDF, Fill PDF Form, Extract Text, Crop PDF, Add Page Numbers, Text to PDF, Redact PDF, Split PDF into Individual Pages, Invoice Generator.

### Images

Image Compressor, Image Resizer, Image Format Converter (PNG/JPEG/WebP), Favicon Generator, Color Blindness Simulator, Color Palette Extractor.

### Text & writing

Word Counter, Text Diff Checker, Text Line Sorter, Case Converter, Slug Generator, Reading Time & Readability, Word Frequency Analyzer, Markdown Previewer, Markdown Table Generator, Lorem Ipsum Generator, Type Master (typing speed test).

### Developer tools

JSON Formatter, CSV ⇄ JSON Converter, Base64 Encoder/Decoder, URL Encoder/Decoder, HTML Entity Encoder/Decoder, Hash Generator (SHA-1/256/384/512), UUID Generator, Regex Tester, Number Base Converter, IP Subnet Calculator, Barcode Generator, CSS Gradient/Box Shadow/Border Radius Generators, Meta Tag & Open Graph Generator.

### QR & contact

QR Code Generator, Batch QR Code Generator, QR Code Scanner, vCard QR Code Generator.

### Calculators

BMI, Percentage, Tip, Age, GPA, Loan & EMI, Discount, Sales Tax, Bill Splitter.

### Security & privacy

Password Generator & Strength Checker, Passphrase Generator, Text Encryptor/Decryptor (AES-256-GCM).

### Fun & productivity

Countdown Timer & Stopwatch, Countdown to Date, Pomodoro Timer, Random Team Generator, Dice Roller, Random Number Generator, Decision Wheel, Morse Code Translator, Roman Numeral Converter, Number to Words, ASCII Art Text Generator, Todo List, Scratchpad, Text to Speech.

New tools are added regularly — see [`src/lib/tools.ts`](src/lib/tools.ts) for the definitive, current list.

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [React Router](https://reactrouter.com/) for client-side routing
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`) for styling, with a light/dark theme toggle
- [`@cantoo/pdf-lib`](https://github.com/cantoo-scribe/pdf-lib) for PDF creation/editing (a `pdf-lib` fork with password encryption support)
- [`pdfjs-dist`](https://mozilla.github.io/pdf.js/) for rendering PDF pages to canvas
- [`qrcode`](https://www.npmjs.com/package/qrcode) for QR generation, [`jsqr`](https://github.com/cozmo/jsQR) for QR decoding
- Everything else (barcodes, diffing, hashing, encryption, readability scoring, color math, etc.) is hand-written, dependency-free code in `src/lib/`

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build to dist/
npm run lint      # oxlint
npm run preview   # serve the production build locally
```

## Deploy

Deployed to Vercel; pushing to `master` triggers a deploy via Vercel's GitHub integration. To deploy manually:

```bash
vercel --prod --yes --name mergedoc
```

## Architecture

See [`CLAUDE.md`](CLAUDE.md) for a detailed breakdown of the codebase structure, one module/page at a time.
