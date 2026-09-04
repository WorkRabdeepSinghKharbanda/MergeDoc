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

- `src/lib/pdf.ts` — the only place that touches `@cantoo/pdf-lib` (a drop-in `pdf-lib` fork; same API, adds `.encrypt()`/password-load via Web Crypto). Each tool page calls one function from here (`mergePdfs`, `splitPdf`, `rotatePdf`, `compressPdf`, `imagesToPdf`, `watermarkPdf`, `setPdfMetadata`/`readPdfMetadata`, `protectPdf`/`unprotectPdf`, `reorderPdf`) plus the shared `downloadBlob` helper. New PDF operations should be added here, not inline in a page.
- `src/lib/pdfjs.ts` — the only place that touches `pdfjs-dist`, used for anything that needs to rasterize a page to canvas: `renderPagesToImages` (PDF→JPG), `renderThumbnail` (page-reorder previews), `getPageCount`. The worker is wired via `?url` import (`pdf.worker.min.mjs?url`) — needed for Vite to bundle it correctly.
- `src/pages/*.tsx` — one page per tool: Merge, Split, Compress, Rotate, Watermark, Protect (add/remove password, two-mode toggle), Metadata (read+edit), Reorder (thumbnail grid, move/delete pages), PdfToImage, ImageToPdf, plus non-PDF utilities ImageCompress, QrGenerator, WordCounter, TypeMaster (typing speed/WPM test), plus `Home` (landing page, split into a "PDF tools" grid and an "Other tools" grid). Each tool page owns its own file-selection state; there is no shared state/store across pages.
- `src/lib/image.ts` — canvas-based image re-encode (`compressImage`), used by `ImageCompress`. No PDF involved.
- `src/lib/qr.ts` — thin wrapper around the `qrcode` npm package (has a browser build via its `browser` package.json field), used by `QrGenerator`.
- `src/lib/text.ts` — pure text stats (`countText`: words/chars/sentences/paragraphs), used by `WordCounter`. No dependency.
- `src/components/FileDropzone.tsx` — shared drag-and-drop/click file input for single-PDF tools. `ImageToPdf` has its own inline picker since it accepts images, not PDFs.
- `src/components/ToastProvider.tsx` — app-wide toast context (`useToast().success(msg)` / `.error(msg)`). Every tool's success/failure path reports through this, not inline `<p>` error text. Wraps the whole app in `App.tsx`.
- `src/components/ThemeToggle.tsx` — light/dark toggle; persists to `localStorage['theme']`. The initial class is set by an inline script in `index.html` `<head>` (before React mounts) to avoid a flash of the wrong theme.
- `src/lib/useDocumentMeta.ts` — sets `document.title` + the meta-description tag per page (no router-integrated head library; this is deliberately minimal since it's a small, fixed set of routes).
- `src/components/AdSlot.tsx` — placeholder ad slot (dashed box). Swap its inner div for a real ad network embed (e.g. AdSense `<ins>`) when a publisher ID exists.
- `src/components/Layout.tsx` — the router's persistent shell (logo, "All tools" link to `/#tools`, theme toggle, footer) via `<Outlet />`.
- `src/App.tsx` — route table; adding a new tool means adding a page component here and a route.
- `index.html` — canonical URL, Open Graph/Twitter tags, and `WebApplication` JSON-LD all hardcoded here (single-page site, no per-route SSR/prerendering). `og:image` points at `/og-image.png`, which does not exist yet — add a real 1200×630 image before relying on link-preview cards.
- `public/sitemap.xml` / `public/robots.txt` — static, hand-maintained, one `<url>` per route. Currently point at the real `https://mergedoc.vercel.app` domain — update both if the domain changes.
- `vercel.json` — SPA rewrite (`/(.*) -> /index.html`) so direct navigation to a route like `/merge` doesn't 404 on Vercel.

### compress caveat

`compressPdf` in `src/lib/pdf.ts` only re-serializes with `useObjectStreams: true` (structural dedup of fonts/streams). It does not rasterize/re-encode images, so it won't meaningfully shrink image-heavy PDFs. A real size-reduction pipeline would reuse `renderPagesToImages` from `src/lib/pdfjs.ts` to rasterize pages and re-encode as JPEG, then rebuild the PDF from those images.
