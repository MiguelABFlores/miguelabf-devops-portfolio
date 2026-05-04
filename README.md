# Miguel Briseño — DevOps Engineer Portfolio

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2014-000?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ed?logo=docker&logoColor=white)](./docs/DOCKER.md)

Personal portfolio for **[miguelabf-devops.com](https://miguelabf-devops.com)** — DevOps Engineer based in Guadalajara.

> **Theme.** Atlantean / deep-sea hybrid: animated bubbles and silt motes drifting up, jellyfish + fish swimming across, god-rays piercing from the surface, and a blurred Atlantean city silhouette resting on the seafloor.

## Stack

- **Next.js 14** (App Router, static export — no backend)
- **TypeScript** (strict)
- **Tailwind CSS** with a custom `abyss` / `glow` palette
- **Framer Motion** for section reveals
- **HTML5 Canvas** for the bubble particle system
- **nginx + Docker** for self-hosted deployment

## Quick start

```bash
git clone https://github.com/MiguelABFlores/personal-portfolio.git
cd personal-portfolio
npm install
npm run dev
# http://localhost:3000
```

Production build:

```bash
npm run build
npx serve out
```

Run as a Docker container:

```bash
docker compose up -d --build
# http://localhost:8080
```

## Documentation

| Doc | What's in it |
|---|---|
| [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) | Local dev, scripts, editing content, styling conventions, a11y |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Component layers, build pipeline, design tradeoffs |
| [docs/DOCKER.md](./docs/DOCKER.md) | Multi-stage Dockerfile, nginx config, healthchecks, registry push |
| [docs/DEPLOY.md](./docs/DEPLOY.md) | Cloudflare Pages, AWS S3 + CloudFront, self-hosted Docker, GitHub Pages |

## Project structure

```
.
├── Dockerfile                # multi-stage: node builder → nginx runner
├── docker-compose.yml
├── docker/nginx.conf         # tuned config (gzip, cache, security headers)
├── docs/                     # extra documentation
├── next.config.mjs           # output: 'export'
├── public/
│   ├── cv/                   # downloadable PDF
│   ├── favicon.svg
│   └── miguel-photo*.{jpg,svg}
└── src/
    ├── app/
    │   ├── layout.tsx        # fonts, metadata
    │   ├── page.tsx          # composes the page
    │   └── globals.css
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Hero.tsx
    │   ├── About.tsx
    │   ├── Skills.tsx
    │   ├── Experience.tsx
    │   ├── Projects.tsx
    │   ├── Certifications.tsx
    │   ├── Contact.tsx
    │   ├── Footer.tsx
    │   ├── Section.tsx
    │   └── ocean/
    │       ├── OceanBackground.tsx
    │       ├── AtlanteanCity.tsx
    │       ├── LightRays.tsx
    │       ├── Bubbles.tsx
    │       └── Creatures.tsx
    └── data/
        ├── skills.ts
        ├── experience.ts
        ├── projects.ts
        └── certifications.ts
```

## Replacing the placeholder photo

Drop a square JPG at `public/miguel-photo.jpg`. The About card falls back to the placeholder SVG if the file is missing.

## Updating the CV

Replace `public/cv/Miguel-Briseno-DevOps-CV.pdf` — keep the same filename so the download buttons keep working.

## License

MIT — see [LICENSE](./LICENSE).

## Contact

- 📫 [miiguelb07@gmail.com](mailto:miiguelb07@gmail.com)
- 💼 [linkedin.com/in/mabrisenof](https://www.linkedin.com/in/mabrisenof/)
- 🐙 [github.com/MiguelABFlores](https://github.com/MiguelABFlores)
- 🏆 [AWS Cloud Practitioner](https://www.credly.com/badges/1ffb676b-45b1-4df9-a4c6-14b531ee2443)
