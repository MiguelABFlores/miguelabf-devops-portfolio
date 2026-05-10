'use client';

/* ────────────────────────────────────────────────────────────────
   ToolLogos - row of brand icons for the homelab stack.

   Each icon:
   - Real brand-color SVG served from the simple-icons CDN
     (https://cdn.simpleicons.org/<slug>/<color>)
   - Wrapped in a 48x48 dark-glass circle with a cyan border + glow
     to fit the splash aesthetic
   - Tiny label below for accessibility / unrecognized brands

   Layout: a wrapping flex row centered horizontally. On wide
   screens all 9 icons fit on one line. On narrow screens they
   wrap to 2-3 rows naturally.
   ──────────────────────────────────────────────────────────────── */

const tools = [
  { slug: 'kubernetes', name: 'Kubernetes', color: '326CE5' },
  { slug: 'argo',       name: 'Argo CD',    color: 'EF7B4D' },
  { slug: 'docker',     name: 'Docker',     color: '2496ED' },
  // Helm's primary brand color is the very dark navy 0F1689, which is
  // invisible on our dark-glass icon background. Switching to 277A9F,
  // Helm's official secondary teal, keeps it on-brand while staying
  // visible.
  { slug: 'helm',       name: 'Helm',       color: '277A9F' },
  { slug: 'github',     name: 'GitHub',     color: 'FFFFFF' },
  { slug: 'prometheus', name: 'Prometheus', color: 'E6522C' },
  { slug: 'grafana',    name: 'Grafana',    color: 'F46800' },
  { slug: 'cloudflare', name: 'Cloudflare', color: 'F38020' },
  { slug: 'linux',      name: 'Linux',      color: 'FCC624' },
];

export default function ToolLogos() {
  return (
    <div className="mt-8 max-w-2xl mx-auto">
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
                src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color}`}
                alt={tool.name}
                width={24}
                height={24}
                className="w-6 h-6 select-none pointer-events-none"
                loading="lazy"
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
