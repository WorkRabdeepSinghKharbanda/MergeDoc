# SEO brain — keyword & content index

See also `001-site-pages-and-routes.md`.

Raw demand data: `keywords.json` (612 Google Autocomplete seeds, collected 2026-10-01; demand signal, not volume).

## Content map (hub-and-spoke)
Home → Category (8, `src/lib/categories.ts`) → Tool (86) ↔ Landing (10, `toolLandings.ts`) ↔ Alternative (10, `alternatives.ts`) ↔ Blog post (26, `src/lib/posts/*.ts`).
Linking is automatic from config: `src/lib/links.ts` (postsForTool / alternativesForTool / …), `RelatedForRoute` on every tool page, `Breadcrumbs` (BreadcrumbList JSON-LD) everywhere.

## Patterns that matter (from autocomplete)
- Queries cluster on "<tool> alternative", "offline / local / open source / free reddit", and "is <tool> safe for sensitive/confidential documents" → privacy (no-upload) is the USP; lead with it.
- Competitors with alternative pages: iLovePDF, Smallpdf, Sejda, PDF24, Adobe Acrobat online, Diffchecker, JSONLint, Regex101, TinyPNG, QR Code Monkey.

## Adding content (checklist)
1. Post: add to a file in `src/lib/posts/` (`BlogPost` type in `blogTypes.ts`); 1300–1700 words, title ≤60 chars, description 110–165, 5–7 FAQs, ≥5 valid internal links, valid `category` slug + `relatedTools`.
2. Alternative: add to `ALTERNATIVES` in `src/lib/alternatives.ts`. Nominative use, no prices/exact competitor limits, honest `stillBetter`.
3. `npm run build` prerenders every route + regenerates `sitemap.xml` automatically. Regenerate `public/llms.txt` blog/alternatives lists by hand.
4. Honesty limits for copy: compress PDF = re-serialize only; redact = visual cover; sign PDF = image; CSV = naive split; strength meter = heuristic; passphrase word list is small (~93 words).
5. Don't forget: markdown subset has no tables/nesting/fences; backticks in template literals must be escaped.
