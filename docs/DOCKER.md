# Running in Docker

The portfolio is a fully static site (Next.js `output: 'export'`) served by nginx in a small Alpine container.

## Quick start (docker compose)

```bash
docker compose up -d --build
# open http://localhost:8080
```

Stop and remove:

```bash
docker compose down
```

## Quick start (plain docker)

```bash
# build
docker build -t miguelabf/portfolio:latest .

# run
docker run -d --name portfolio -p 8080:80 --restart unless-stopped miguelabf/portfolio:latest

# logs
docker logs -f portfolio

# stop / remove
docker rm -f portfolio
```

## What's inside the image

Multi-stage build:

| Stage | Base | Purpose |
|---|---|---|
| `builder` | `node:20-alpine` | `npm ci` + `npm run build` to produce the static `out/` directory |
| `runner` | `nginx:1.27-alpine` | Serves `/usr/share/nginx/html` with a tuned config |

The runtime image is **only nginx + the static files** — no Node.js, no source code. Final image is small (~50 MB).

## nginx tweaks (see [`docker/nginx.conf`](../docker/nginx.conf))

- gzip enabled for text assets
- `_next/static/*` cached 1 year (immutable hashed filenames)
- Other static assets cached 30 days, PDFs 1 day
- Security headers: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- Static-export-friendly fallback: `try_files $uri $uri/ $uri.html /index.html`
- Custom 404 served from `/404.html` (Next.js generates this automatically)

## Healthcheck

Both the Dockerfile and docker-compose define a healthcheck that hits `http://localhost/` every 30s. View status with:

```bash
docker inspect --format='{{.State.Health.Status}}' miguelabf-portfolio
```

## Pushing to a registry

```bash
# Docker Hub
docker tag miguelabf/portfolio:latest <your-user>/portfolio:latest
docker push <your-user>/portfolio:latest

# GitHub Container Registry
docker tag miguelabf/portfolio:latest ghcr.io/miguelabflores/portfolio:latest
echo $GH_TOKEN | docker login ghcr.io -u MiguelABFlores --password-stdin
docker push ghcr.io/miguelabflores/portfolio:latest
```

## Production notes

- The container listens on **port 80**. Put a TLS-terminating reverse proxy in front (Cloudflare, Traefik, AWS ALB) — don't expose nginx directly to the internet on 443.
- For Kubernetes deployment, the image is a drop-in: any Deployment + Service + Ingress combo works. Set `livenessProbe` and `readinessProbe` to `httpGet /` on port 80.
- For zero-downtime updates, build a new tag (`:v1.2.3`) and roll it out — the static export means no warm-up time.
