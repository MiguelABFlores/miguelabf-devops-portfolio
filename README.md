# miguelabf-devops-portfolio

This repository uses a **`production` / `development`** branch model.

- **`production`** — live site; deploys to the cluster (Harbor `:latest`+`:sha`, ArgoCD).
- **`development`** — integration / daily work (builds `:dev-<sha>` only).

`main` is intentionally empty and **unused** — do not push here.
See `CONTRIBUTING.md` on the `development` branch for the full workflow.
