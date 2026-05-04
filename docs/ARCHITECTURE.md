# Architecture

A short tour of how the site is put together.

## High-level

```
┌──────────────────────────────────────────────────────┐
│                    Browser                           │
│  ┌────────────────────────────────────────────────┐  │
│  │  Static HTML + CSS + JS (Next.js export)       │  │
│  │  React (client-only animations)                │  │
│  │  Canvas + SVG ocean background                 │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
                       ▲
                       │ HTTPS
                       │
┌──────────────────────────────────────────────────────┐
│         Static host (Cloudflare / S3 / nginx)        │
│         Serves out/ from `next build`                │
└──────────────────────────────────────────────────────┘
```

There is **no backend**. Contact form is a `mailto:` link, and the CV is a PDF served from `/public/cv/`.

## Build pipeline

```
src/  +  public/  ──▶  next build  ──▶  out/
                             │
                             ▼
                       static export
                       (HTML + JS + CSS + assets)
```

`next.config.mjs` sets `output: 'export'` and `images.unoptimized: true`, which makes the build emit a flat directory of files suitable for any static host.

## Component layers

The page is composed of two stacked layers:

1. **`OceanBackground`** — `position: fixed; z-index: -10`. Owns the ocean visuals.
2. **`main` content** — `position: relative`. Owns the actual portfolio sections.

```
<OceanBackground>          ← fixed, behind everything
  ├ <LightRays/>           ← CSS gradients (god rays + caustics)
  ├ <AtlanteanCity/>       ← blurred SVG silhouette at the seafloor
  ├ <Creatures/>           ← jellyfish + fish SVGs with CSS keyframes
  ├ <Bubbles/>             ← canvas particle system
  └ <DeepVignette/>        ← gradient overlay toward black
<Navbar/>                  ← fixed top, glass on scroll
<main>
  <Hero/>
  <About/>
  <Skills/>
  <Experience/>
  <Projects/>
  <Certifications/>
  <Contact/>
</main>
<Footer/>
```

## Data flow

All copy is in `src/data/*.ts` and imported directly by section components. There's no fetching, no state management library — this is a static site.

```
src/data/skills.ts       ──▶  <Skills/>
src/data/experience.ts   ──▶  <Experience/>
src/data/projects.ts     ──▶  <Projects/>
src/data/certifications.ts ──▶ <Certifications/>
```

## Animations

| Layer | Mechanism | Cost |
|---|---|---|
| Hero & section reveal | Framer Motion (`whileInView`) | Cheap; one IntersectionObserver per element |
| Light rays / caustics | CSS `@keyframes rays` | GPU-composited, free |
| Atlantean city drift | CSS `@keyframes driftSlow` | GPU-composited, free |
| Jellyfish + fish | CSS keyframes | GPU-composited, free |
| Bubbles + silt motes | Canvas 2D, `requestAnimationFrame` | ~60–70 particles, throttled |

All animation paths short-circuit when the user has `prefers-reduced-motion`.

## Why not Three.js / WebGL?

The brief was "medium" animation. Three.js would have given a navigable 3D city but at the cost of bundle size (~150 KB+), a steeper authoring loop for the Atlantis silhouette, and worse mobile battery life. Layered SVG + canvas particles ships in ~131 KB total first-load JS and runs at 60fps on a phone.

## Why static export?

- Deploys anywhere (Cloudflare, S3, GitHub Pages, plain nginx)
- No runtime cost — no Node process to keep up
- Great cache behavior — every asset is hashed and immutable
- Survives traffic spikes trivially
- Matches the DevOps theme: simple, declarative, reproducible

## Tradeoffs accepted

- No SSR / dynamic content (we don't need any)
- No image optimization (Next/Image disabled — fine for a portfolio with a handful of assets)
- No contact form backend (mailto is friction-free for the audience)
