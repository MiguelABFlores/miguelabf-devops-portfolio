# Deployment Guide

The site is a fully static export, so any static host works. Three options below — pick one for `miguelabf-devops.com`.

## Option 1 — Cloudflare Pages (recommended, free)

1. Push the repo to GitHub (see main README).
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com) → **Create a project** → connect GitHub.
3. Pick the `personal-portfolio` repo. Build settings:
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
4. Deploy. First build takes ~2 min.
5. **Custom domain**: Project → **Custom domains** → add `miguelabf-devops.com`. Cloudflare walks you through the DNS records (usually a CNAME to `<project>.pages.dev` and an A record for the apex).

Free tier: unlimited bandwidth, unlimited requests, 500 builds/month. Plenty for a portfolio.

## Option 2 — AWS S3 + CloudFront (DevOps-flavored)

A classic pattern: S3 holds the static files, CloudFront fronts them with HTTPS + the custom domain.

```bash
# 1. create bucket
aws s3api create-bucket --bucket miguelabf-portfolio --region us-east-1

# 2. enable static website hosting
aws s3 website s3://miguelabf-portfolio \
  --index-document index.html \
  --error-document 404.html

# 3. block direct public access (CloudFront uses OAC instead)
aws s3api put-public-access-block --bucket miguelabf-portfolio \
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# 4. build + sync
npm run build
aws s3 sync out/ s3://miguelabf-portfolio --delete

# 5. invalidate CloudFront cache after deploys
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"
```

Then in CloudFront:
- Origin: S3 bucket via Origin Access Control (OAC)
- Default root object: `index.html`
- Custom error response: `404 → /404.html, 200`
- Alternate domain name: `miguelabf-devops.com`
- TLS: ACM certificate in `us-east-1` for the domain

A simple Terraform stub lives in [`docs/terraform/`](terraform/) (left as a future exercise — fits well as a "live" demo for your own portfolio).

## Option 3 — Self-hosted Docker

If `miguelabf-devops.com` resolves to a VPS you control:

```bash
# on the server
git clone https://github.com/MiguelABFlores/personal-portfolio.git
cd personal-portfolio
docker compose up -d --build
```

Put a reverse proxy (Caddy or Traefik) in front for TLS. With Caddy:

```caddyfile
miguelabf-devops.com {
  reverse_proxy localhost:8080
}
```

Caddy auto-issues Let's Encrypt certs. Done.

## Option 4 — GitHub Pages

```bash
npm run build
npx gh-pages -d out
```

Push the `gh-pages` branch, enable Pages in repo settings, and add the custom domain there.

## Pre-deploy checklist

- [ ] Replace `public/miguel-photo.jpg` with the real photo (square crop)
- [ ] Confirm `public/cv/Miguel-Briseno-DevOps-CV.pdf` is up-to-date
- [ ] Verify `npm run build` succeeds locally
- [ ] Smoke-test `npx serve out` in a browser
- [ ] DNS points at the chosen host
