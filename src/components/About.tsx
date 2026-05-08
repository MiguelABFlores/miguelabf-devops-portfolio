'use client';

import Section from './Section';

export default function About() {
  return (
    <Section id="about" eyebrow="Surface Log" title="About Me">
      <div className="grid md:grid-cols-[280px_1fr] gap-10 items-start">
        <div className="relative">
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-glow-cyan/30 via-glow-atlantis/20 to-transparent blur-xl" />
          <div className="relative aspect-square rounded-2xl overflow-hidden glass-strong shadow-glow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/miguel-photo.jpg"
              alt="Miguel Angel Briseño Flores"
              width={560}
              height={560}
              className="object-cover w-full h-full"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                if (!img.src.endsWith('miguel-photo-placeholder.svg')) {
                  img.src = '/miguel-photo-placeholder.svg';
                }
              }}
            />
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6 md:p-8 space-y-5">
          {/* ── eyebrow label ── */}
          <div className="text-[10px] tracking-[0.35em] uppercase font-display text-glow-cyan/80 mb-1">
            Profile
          </div>

          <p className="text-white/88 text-base md:text-lg leading-relaxed">
            DevOps Engineer with experience in CI/CD tools, Kubernetes, containerization,
            Ansible, and cloud services. Passionate about solving tasks with a background
            in <span className="text-glow-ice font-medium">automation</span> — I shine in
            developing automated environments such as pipelines and deployments.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            My most notable strengths are the autonomy and independence to complete tasks,
            plus a love for teaching and sharing solutions with friends and colleagues.
            Currently a Site Reliability Developer at Oracle, working on internal
            applications, server reliability, and security.
          </p>

          {/* ── divider ── */}
          <div className="divider-glow" />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm pt-1">
            {[
              { label: 'Based in',  value: 'Guadalajara, MX',    accent: 'cyan' },
              { label: 'Languages', value: 'English C1 · Spanish', accent: 'magenta' },
              { label: 'Education', value: 'ITESM — Mechatronics', accent: 'cyan' },
            ].map(({ label, value, accent }) => (
              <div key={label}
                className="glass rounded-xl px-4 py-3 border-l-2"
                style={{ borderLeftColor: accent === 'cyan' ? 'rgba(0,212,255,0.55)' : 'rgba(177,78,255,0.55)' }}
              >
                <div className={`text-[10px] uppercase tracking-[0.25em] mb-1 font-display
                                 ${accent === 'cyan' ? 'text-glow-cyan/80' : 'text-glow-atlantis/80'}`}>
                  {label}
                </div>
                <div className="text-white/90 text-sm">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
