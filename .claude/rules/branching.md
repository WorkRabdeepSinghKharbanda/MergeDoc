---
protected_branches: ["archive"]
---

# Branching strategy

Personal solo project. No feature-branch/PR workflow — commits go straight to `master`.

## Deploy workflow

Every push to `master` is followed by a manual `vercel --prod --yes` deploy from the terminal — don't rely solely on Vercel's GitHub-integration auto-deploy, run the CLI deploy too.

## Feature brain

Full feature/tool inventory and product-level state (monetization, SEO, privacy, mobile, bug-audit history) lives at `.claude/brain/FEATURES.md` — read it at the start of any new session before starting work, alongside CLAUDE.md.
