---
protected_branches: ["archive"]
---

# Branching strategy

Personal solo project. No feature-branch/PR workflow — commits go straight to `master`.

## Deploy workflow

Every push to `master` is followed by a manual `vercel --prod --yes` deploy from the terminal — don't rely solely on Vercel's GitHub-integration auto-deploy, run the CLI deploy too.
