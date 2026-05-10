# Contributing

This portfolio uses a simplified GitFlow branch model. Read this before
pushing changes — the wrong branch can deploy straight to production.

## Branches

| Branch | Purpose | Auto-deploys to |
|---|---|---|
| `main` | Production. Mirrors what's live at miguelabf-devops.com. | ✅ Production cluster (Harbor `:latest` + `:sha-<sha>`, ArgoCD sync) |
| `develop` | Integration. Daily work merges here. | ⚙️ Builds `:dev-<sha>` only — no GitOps update, no ArgoCD sync |
| `feature/<name>` | Short-lived. One branch per change. Off `develop`. | ❌ Build-only on PRs (smoke test) |

## Workflow

### Normal feature work

```bash
# 1. Start from a clean develop
git checkout develop
git pull

# 2. Cut a feature branch
git checkout -b feature/<short-name>     # e.g. feature/intro-splash

# 3. Work, commit small chunks
git add ...
git commit -m "..."

# 4. Push and open a PR → develop
git push -u origin feature/<short-name>
gh pr create --base develop              # or use GitHub UI
```

CI runs on every push to the PR (build-only — verifies the image still
builds cleanly on both `linux/amd64` and `linux/arm64`).

Merge to `develop` when CI is green. CI on `develop` builds and pushes a
`dev-<sha>` image to Harbor — useful if you want to manually deploy it
to a test environment, but it does **not** touch production.

### Releasing to production

```bash
# 1. Open a release PR from develop → main
gh pr create --base main --head develop --title "release: <date or tag>"

# 2. Review the diff one last time, then merge

# 3. Watch GitHub Actions:
#    - build-and-push: builds & pushes :sha-<sha> + :latest to Harbor
#    - update-gitops:  bumps the image tag in homelab-gitops, commits, syncs
#                      ArgoCD, and smoke-tests miguelabf-devops.com
```

### Hotfixes

For urgent fixes that can't wait for `develop`:

```bash
git checkout main
git pull
git checkout -b hotfix/<short-name>
# ... fix, commit ...
git push -u origin hotfix/<short-name>
gh pr create --base main
# After merging, also merge main back into develop:
git checkout develop && git merge main && git push
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

| Event | Build image | Push to Harbor | Update GitOps | ArgoCD sync |
|---|---|---|---|---|
| Push to `main` | ✅ | `:sha-<sha>` + `:latest` | ✅ | ✅ |
| Push to `develop` | ✅ | `:dev-<sha>` only | ❌ | ❌ |
| Pull request | ✅ | ❌ (build only) | ❌ | ❌ |
| `workflow_dispatch` | ✅ | depends on branch | only if main | only if main |

## Branch protection (configured in GitHub Settings → Branches)

- `main`: requires PR, requires `Build & Push to Harbor` status check, no
  direct pushes.
- `develop`: requires PR from feature branches; direct pushes allowed for
  hotfixes only.
- Default branch is `develop` so PRs target it by default.
