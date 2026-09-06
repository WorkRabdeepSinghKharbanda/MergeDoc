# MergeDoc — Feature Brain

Living inventory of every feature on the site, plus product-level state (ads, SEO, deploy) that doesn't belong in `CLAUDE.md` (which documents *code architecture*, not *product state*). Read this at the start of any new session before starting work — it's the fastest way to know what already exists so you don't re-suggest or re-build something that's already live.

Source of truth for the actual tool list/routes is always `src/lib/tools.ts` — this doc should match it, but if they disagree, `tools.ts` wins (update this file to match).

## Tool count: 86 (as of the last update below)

### PDF (19)
Merge, Split, Compress, Rotate, Watermark, Protect/Unprotect, Edit Metadata, Reorder & Delete Pages, PDF to Image, Image to PDF, Compare PDFs, Sign PDF, Fill PDF Form, Extract Text, Crop PDF, Add Page Numbers, Text to PDF, Redact PDF, Split PDF into Individual Pages, Invoice Generator.

### Images (6)
Image Compressor, Image Resizer, Image Format Converter (PNG/JPEG/WebP), Favicon Generator, Color Blindness Simulator, Color Palette Extractor.

### Text & writing (11)
Word Counter, Text Diff Checker, Text Line Sorter, Case Converter, Slug Generator, Reading Time & Readability, Word Frequency Analyzer, Markdown Previewer, Markdown Table Generator, Lorem Ipsum Generator, Type Master (typing speed test).

### Developer tools (13)
JSON Formatter, CSV ⇄ JSON Converter, Base64 Encoder/Decoder, URL Encoder/Decoder, HTML Entity Encoder/Decoder, Hash Generator (SHA-1/256/384/512), UUID Generator, Regex Tester, Number Base Converter, IP Subnet Calculator, Barcode Generator, CSS Gradient/Box Shadow/Border Radius Generators (3), Meta Tag & Open Graph Generator.

### QR & contact (4)
QR Code Generator, Batch QR Code Generator, QR Code Scanner (decode), vCard QR Code Generator.

### Calculators (9)
BMI, Percentage, Tip, Age, GPA, Loan & EMI, Discount, Sales Tax, Bill Splitter.

### Security & privacy (3)
Password Generator & Strength Checker, Passphrase Generator, Text Encryptor/Decryptor (AES-256-GCM).

### Fun & productivity (14)
Countdown Timer & Stopwatch, Countdown to Date, Pomodoro Timer, Random Team Generator, Dice Roller, Random Number Generator, Decision Wheel, Morse Code Translator, Roman Numeral Converter, Number to Words, ASCII Art Text Generator, Todo List (localStorage), Scratchpad (localStorage), Text to Speech.

## Product-level state (not code architecture — see CLAUDE.md for that)

- **Monetization**: AdSense wired in (publisher ID `ca-pub-5852027898822024`, live in `src/lib/ads.ts`/`public/ads.txt`/index.html meta tag). Ads only render after a visitor accepts the cookie-consent banner (`ConsentBanner.tsx`). Awaiting Google's site approval — until approved, ad units may render blank even post-consent.
- **Privacy Policy**: `/privacy-policy` page exists, linked from footer. Covers client-side processing, localStorage use, AdSense disclosure + opt-out link.
- **SEO**: full pass done — og:image (1200×630, generated), favicon PNGs (16/32/apple-touch-icon/192/512, generated), manifest.json, per-route canonical + OG/Twitter via `useDocumentMeta`, two JSON-LD blocks in index.html (WebApplication + ItemList of all 86 tools), sitemap.xml/robots.txt verified complete against the route table.
- **Mobile**: fixed overflow bugs (SignPdf/RedactPdf thumbnails, SignPdf's signature canvas scaling + draw-coordinate math), added `overflow-x-hidden` backstop on the root layout. Rest of the site was already responsive (Tailwind `sm:`/grid breakpoints throughout).
- **Bug audit**: one full codebase audit done (5 bugs found/fixed — AgeCalculator day-borrow math, TimestampConverter UTC/local mismatch, 3 blob-URL leaks). No standing known bugs beyond the documented caveats in CLAUDE.md (SignPdf slider-not-drag, compress not-real-recompression).
- **Repo conventions**: personal solo project, not Uniqode work — see `.claude/rules/branching.md` for the no-PR/direct-to-master workflow and the manual `vercel --prod --yes` deploy-after-push convention. The org pre-push hook's code-review-marker check still applies unconditionally (no config override) — every push needs `~/.uniqode/reviews/MergeDoc/master.json` updated to the new HEAD commit first (the user runs this themselves, or grants a permission rule to automate it).

## Update discipline

When a new tool ships: update `src/lib/tools.ts` (source of truth), `src/App.tsx` (route), `public/sitemap.xml`, `CLAUDE.md` (architecture), `index.html`'s ItemList JSON-LD, README.md, and this file's tool count/category list.
