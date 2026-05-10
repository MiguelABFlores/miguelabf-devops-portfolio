'use client';

/* ────────────────────────────────────────────────────────────────
   ToolLogos - row of brand icons for the homelab stack.

   Each icon is a SELF-HOSTED brand-color SVG served from
   /public/icons/. This eliminates the 9 external CDN requests
   (formerly cdn.simpleicons.org) that were the single biggest
   contributor to the splash's initial-load delay. Local files are
   served by the same Cloudflare-edge-cached nginx as the rest of
   the site - effectively instant.

   Icons were pre-colorized at download time via the CDN's color
   parameter, so no runtime tinting is needed. To add or update an
   icon: re-download with the desired color.
     curl https://cdn.simpleicons.org/<slug>/<hex> > public/icons/<slug>.svg
   ──────────────────────────────────────────────────────────────── */

const tools = [
  { slug: 'kubernetes', name: 'Kubernetes' },
  { slug: 'argo',       name: 'Argo CD' },
  { slug: 'docker',     name: 'Docker' },
  { slug: 'helm',       name: 'Helm' },
  { slug: 'github',     name: 'GitHub' },
  { slug: 'prometheus', name: 'Prometheus' },
  { slug: 'grafana',    name: 'Grafana' },
  { slug: 'cloudflare', name: 'Cloudflare' },
  { slug: 'linux',      name: 'Linux' },
];

export default function ToolLogos() {
  return (
    <div className="mt-5 md:mt-7 max-w-2xl mx-auto">
      {/* Eyebrow label */}
      <div
        className="font-display text-[10px] md:text-xs tracking-[0.45em] uppercase
                   text-glow-cyan/80 mb-4 flex items-center justify-center gap-3"
        style={{ textShadow: '0 0 10px rgba(0,212,255,0.45)' }}
      >
        <span
          aria-hidden
          style={{
            display: 'block',
            width: '54px',
            height: '1.5px',
            background: 'linear-gradient(to right, transparent, rgba(125,249,255,0.85))',
            boxShadow: '0 0 6px rgba(0,212,255,0.5)',
          }}
        />
        Built With
        <span
          aria-hidden
          style={{
            display: 'block',
            width: '54px',
            height: '1.5px',
            background: 'linear-gradient(to left, transparent, rgba(125,249,255,0.85))',
            boxShadow: '0 0 6px rgba(0,212,255,0.5)',
          }}
        />
      </div>

      {/* Icon row */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {tools.map((tool) => (
          <div key={tool.slug} className="group flex flex-col items-center gap-1.5">
            <div
              className="w-12 h-12 rounded-full glass border border-glow-cyan/35
                         flex items-center justify-center
                         shadow-[0_0_12px_rgba(0,212,255,0.18)]
                         hover:border-glow-cyan/70
                         hover:shadow-[0_0_22px_rgba(0,212,255,0.45)]
                         hover:-translate-y-0.5
                         transition-all"
              title={tool.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/icons/${tool.slug}.svg`}
                alt={tool.name}
                width={24}
                height={24}
                className="w-6 h-6 select-none pointer-events-none"
                draggable={false}
              />
            </div>
            <span className="text-[9px] tracking-[0.15em] uppercase font-display
                             text-white/55 group-hover:text-glow-ice transition-colors">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
