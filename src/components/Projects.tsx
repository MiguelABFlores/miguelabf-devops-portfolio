'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import { projects } from '@/data/projects';

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.05c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17a10.94 10.94 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.79.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  );
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Salvage" title="Featured Projects">
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.a
            key={p.repo}
            href={p.repo}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.05 }}
            className={`group relative block rounded-2xl p-6 transition-all overflow-hidden
                       ${
                         p.featured
                           ? 'glass-strong md:col-span-2 hover:shadow-glow'
                           : 'glass hover:shadow-glow'
                       } hover:-translate-y-0.5 hover:border-glow-cyan/40`}
          >
            {p.featured && (
              <div className="absolute top-4 right-4 text-[10px] tracking-[0.3em] font-display
                              uppercase text-abyss-900 bg-gradient-to-r from-glow-cyan to-glow-ice
                              px-2.5 py-1 rounded-full shadow-glow">
                Featured
              </div>
            )}
            <div className="flex items-start gap-4">
              {p.emoji && (
                <div className="text-3xl md:text-4xl select-none mt-0.5">{p.emoji}</div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg md:text-xl text-white group-hover:text-glow-ice transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-white/75 text-sm leading-relaxed">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-glow-cyan/90 text-xs tracking-[0.2em] font-display uppercase">
                  <GitHubIcon />
                  View on GitHub →
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
