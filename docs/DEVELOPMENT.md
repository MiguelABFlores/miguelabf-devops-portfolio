# Development guide

## Prerequisites

- Node.js ≥ 18 (tested with 20 and 25)
- npm ≥ 9

## Setup

```bash
npm install
npm run dev
# http://localhost:3000
```

Hot-reload works for everything under `src/`. The ocean canvas re-initializes on save.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build → `out/` |
| `npm run lint` | ESLint via `next lint` |
| `npm start` | Serves the prod build (use only for debugging) |

For a local prod-mode preview after build:

```bash
npm run build
npx serve out
```

## Editing content

All data lives in `src/data/`. To add a new job, edit `experience.ts`. To swap a project, edit `projects.ts`. The components read from these arrays directly — no rebuild config needed.

## Adding a new section

1. Add data file under `src/data/` (optional)
2. Create `src/components/MySection.tsx`. Reuse `<Section eyebrow="…" title="…">` for the heading style.
3. Import and render it in `src/app/page.tsx` between the existing sections.
4. Add a nav link in `src/components/Navbar.tsx`.

## Tweaking the ocean

| File | What it controls |
|---|---|
| `src/components/ocean/AtlanteanCity.tsx` | The blurred city silhouette at the seafloor (SVG paths, dome lights) |
| `src/components/ocean/LightRays.tsx` + `globals.css` (`.light-rays`, `.caustics`) | God-rays and surface caustics |
| `src/components/ocean/Bubbles.tsx` | Canvas particle system (count, speed, hue) |
| `src/components/ocean/Creatures.tsx` | Jellyfish + fish SVG components with CSS animation hooks |
| `tailwind.config.ts` | Custom palette (`abyss`, `glow`) + keyframes |

## Styling conventions

- Tailwind utility-first — no separate CSS modules
- Reusable patterns live in `globals.css` as classes (`.glass`, `.glass-strong`, `.chip`, `.chip-magenta`, `.glow-text`, `.section-title`)
- Custom palette tokens: `abyss-{500..950}` (background tones) and `glow-{cyan,ice,coral,atlantis,gold}` (accents)
- Fonts: Orbitron for display headings, Inter for body — wired via CSS variables in `layout.tsx`

## Accessibility

- All ocean layers are `aria-hidden` and `pointer-events-none`
- `prefers-reduced-motion` short-circuits the canvas + slows CSS animations to ~instant
- Section headings are real `<h2>` elements; landmarks (`<header>`, `<main>`, `<footer>`) are present
- Test in DevTools → Rendering → Emulate CSS media feature → `prefers-reduced-motion: reduce`

## Performance budget

- First Load JS: keep under 150 KB (currently ~131 KB)
- LCP target: < 2s on 4G
- The canvas particle count auto-scales with viewport area in `Bubbles.tsx`; tune the `26000` divisor if needed

## Common edits

**Change the tagline.** `src/components/Hero.tsx`, the `<motion.p>` block under the title.

**Change the color palette.** `tailwind.config.ts` → `theme.extend.colors`.

**Add a new tech chip variant.** `globals.css` → add `.chip-yourcolor`. Reference it from any section.

**Replace the photo.** Drop a square JPG at `public/miguel-photo.jpg`. The About component falls back to `miguel-photo-placeholder.svg` if missing.

**Update CV.** Replace `public/cv/Miguel-Briseno-DevOps-CV.pdf` (keep the filename).
