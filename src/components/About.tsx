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

        <div className="space-y-5 text-white/85 text-base md:text-lg leading-relaxed">
          <p>
            DevOps Engineer with experience in CI/CD tools, Kubernetes, containerization,
            Ansible, and cloud services. Passionate about solving tasks with a background
            in <span className="text-glow-ice">automation</span> — I shine in developing
            automated environments such as pipelines and deployments.
          </p>
          <p>
            My most notable strengths are the autonomy and independence to complete tasks,
            plus a love for teaching and sharing solutions with friends and colleagues.
            Currently a Site Reliability Developer at Oracle, working on internal
            applications, server reliability, and security.
          </p>

          <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div className="glass rounded-xl px-4 py-3">
              <div className="text-glow-ice/70 text-[10px] uppercase tracking-[0.25em] mb-1">Based in</div>
              <div className="text-white">Guadalajara, MX</div>
            </div>
            <div className="glass rounded-xl px-4 py-3">
              <div className="text-glow-ice/70 text-[10px] uppercase tracking-[0.25em] mb-1">Languages</div>
              <div className="text-white">English C1 · Spanish</div>
            </div>
            <div className="glass rounded-xl px-4 py-3">
              <div className="text-glow-ice/70 text-[10px] uppercase tracking-[0.25em] mb-1">Education</div>
              <div className="text-white">ITESM — Mechatronics</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
