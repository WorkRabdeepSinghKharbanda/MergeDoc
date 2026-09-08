---
protected_branches: ["archive"]
---

# Branching strategy

Personal solo project. No feature-branch/PR workflow — commits go straight to `master`.

## Deploy workflow

Every push to `master` is followed by a manual `vercel --prod --yes` deploy from the terminal — don't rely solely on Vercel's GitHub-integration auto-deploy, run the CLI deploy too.

## Content growth

SEO/content pages (blog posts, keyword landing guides) compound over months, not days — keep
adding a batch of new posts/guides periodically rather than treating the current set as final.

## Feature brain

Full feature/tool inventory lives at `.claude/brain/feature/` — one numbered file per tool (`001-{name}.md`, `002-{name}.md`, ...), with `000-index.md` as the entry point listing all of them. Read the index at the start of any new session before starting work, alongside CLAUDE.md. `src/lib/tools.ts` is still the code-level source of truth — if the brain disagrees, `tools.ts` wins and the brain should be regenerated to match.
