# Site pages & routes added 2026-10-03 (SSG + content build-out)

## New routes (all prerendered to dist/<route>.html, listed in generated sitemap.xml)
- `/alternatives` — hub (`src/pages/Alternatives.tsx`, ItemList JSON-LD)
- `/alternatives/<slug>` ×10 — `src/pages/AlternativePage.tsx`, data in `src/lib/alternatives.ts` (FAQPage + BreadcrumbList)
- `/blog` — grouped by category; `/blog/<slug>` ×26 — `BlogPost.tsx` (BlogPosting + FAQPage + BreadcrumbList, og:type article)

## Content files
- `src/lib/posts/expanded-1.ts`, `expanded-2.ts` (16 original posts, expanded), `new.ts` (10 new); aggregated by `src/lib/blog.ts`.
- Types: `blogTypes.ts`, `alternativeTypes.ts`.

## Components / helpers
- `components/RelatedForRoute.tsx` (in Layout: breadcrumb + guides + alternatives + sibling tools on every tool page), `Breadcrumbs.tsx`, `LinkCards.tsx`, `Prose.tsx` (client-side nav for internal links in Markdown).
- `lib/links.ts` cross-reference helpers; `lib/routes.ts` single route list for prerender + sitemap.

## Build
`scripts/prerender.mjs`, `src/entry-server.tsx`; see CLAUDE.md "SEO / prerender (SSG)". 144 routes at last build.
