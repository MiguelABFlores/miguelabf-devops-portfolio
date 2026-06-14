# Contributing

This portfolio uses a simplified GitFlow branch model. Read this before
pushing changes — the wrong branch can deploy straight to production.

## Branches

| Branch | Purpose | Auto-deploys to |
|---|---|---|
| `production` | Production. Mirrors what's live at miguelabf-devops.com. | ✅ Production — builds `portfolio/production:latest` + `:sha-<sha>`, bumps GitOps (`apps/portfolio`, app `portfolio-prod`, ns `portfolio-prod`); ArgoCD auto-syncs |
| `development` | Integration. Daily work merges here. | 🔁 Dev preview — builds `portfolio/development:latest` + `:dev-<sha>`, bumps GitOps (`apps/portfolio-dev`, app `portfolio-dev`, ns `portfolio-dev`); ArgoCD auto-syncs to `portfolio-dev.192.168.0.240.nip.io` |
| `feature/<name>` | Short-lived. One branch per change. Off `development`. | ❌ Build-only on PRs (smoke test) |

> **Note:** the old `main` / `develop` branches are retired. `production`
> replaces `main`; `development` replaces `develop`. Do not push to `main`.

## Workflow

### Normal feature work

```bash
# 1. Start from a clean development
git checkout development
git pull

# 2. Cut a feature branch
git checkout -b feature/<short-name>     # e.g. feature/intro-splash

# 3. Work, commit small chunks
git add ...
git commit -m "..."

# 4. Push and open a PR → development
git push -u origin feature/<short-name>
gh pr create --base development          # or use GitHub UI
```

CI runs on every push to the PR (build-only — verifies the image still
builds cleanly on `linux/amd64`, matching the cluster).

Merge to `development` when CI is green. CI on `development` builds and pushes a
`dev-<sha>` image to Harbor and auto-deploys it to the dev preview at
`portfolio-dev.192.168.0.240.nip.io` (namespace `portfolio-dev`). It does
**not** touch production.

### Releasing to production

```bash
# 1. Open a release PR from development → production
gh pr create --base production --head development --title "release: <date or tag>"

# 2. Review the diff one last time, then merge

# 3. Watch GitHub Actions:
#    - build-and-push: builds & pushes :sha-<sha> + :latest to Harbor
#    - update-gitops:  bumps the image tag in homelab-gitops (apps/portfolio)
#                      and commits. ArgoCD auto-syncs the portfolio-prod app
#                      on its own — CI no longer runs `argocd app sync`.
```

### Hotfixes

For urgent fixes that can't wait for `development`:

```bash
git checkout production
git pull
git checkout -b hotfix/<short-name>
# ... fix, commit ...
git push -u origin hotfix/<short-name>
gh pr create --base production
# After merging, also merge production back into development:
git checkout development && git merge production && git push
```

## Commit style

Conventional Commits (loosely):

```
feat:    new feature
fix:     bug fix
chore:   tooling, deps, config
docs:    documentation only
ci:      CI/CD pipeline changes
content: content/copy updates (CV, profile text, etc.)
refactor: code restructure with no behavior change
```

Subject line ≤ 72 chars. Body is optional but encouraged for non-trivial
changes — explain *why*, not *what*.

## Local development

```bash
npm install
npm run dev            # http://localhost:3000

# Or full Docker (matches what's deployed to the cluster):
docker compose up -d --build    # http://localhost:8080
```

## CI matrix at a glance

| Event | Build image | Push to Harbor | Update GitOps | ArgoCD |
|---|---|---|---|---|
| Push to `production` | ✅ | `portfolio/production` `:sha-<sha>` + `:latest` | ✅ `apps/portfolio` | auto-syncs `portfolio-prod` |
| Push to `development` | ✅ | `portfolio/development` `:dev-<sha>` + `:latest` | ✅ `apps/portfolio-dev` | auto-syncs `portfolio-dev` |
| Pull request | ✅ | ❌ (build only) | ❌ | ❌ |
| `workflow_dispatch` | ✅ | depends on branch | branch's app dir | auto-syncs branch's app |

## Branch protection (configured in GitHub Settings → Branches)

- `production`: requires PR, requires `Build & Push to Harbor` status check, no
  direct pushes.
- `development`: requires PR from feature branches; direct pushes allowed for
  hotfixes only.
- Default branch is `development` so PRs target it by default.
