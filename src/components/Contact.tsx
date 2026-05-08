'use client';

import { motion } from 'framer-motion';
import Section from './Section';

const links = [
  {
    label: 'Email',
    value: 'miiguelb07@gmail.com',
    href: 'mailto:miiguelb07@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 7 9-7" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/mabrisenof',
    href: 'https://www.linkedin.com/in/mabrisenof/',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73A1.74 1.74 0 1 1 6.5 3.25a1.74 1.74 0 0 1 0 3.48zM20 19h-3v-5.6c0-3.37-4-3.11-4 0V19h-3V8h3v1.77c1.4-2.6 7-2.79 7 2.49V19z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/MiguelABFlores',
    href: 'https://github.com/MiguelABFlores',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.05c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17a10.94 10.94 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.79.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Send a Signal" title="Get in Touch">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl text-white/80 mb-10"
      >
        Looking for a DevOps Engineer who can build pipelines, tame Kubernetes clusters, and
        automate the boring parts? Drop a message — I&apos;ll surface from the deep.
      </motion.p>

      <div className="grid sm:grid-cols-2 gap-4">
        {links.map((l, i) => (
          <motion.a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group glass-strong rounded-2xl p-5 flex items-center gap-4 border-l-2
                       border-l-glow-cyan/35 hover:border-l-glow-cyan/65
                       hover:shadow-glow hover:-translate-y-0.5 transition-all"
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0
                            bg-gradient-to-br from-glow-cyan/22 to-glow-atlantis/16
                            border border-glow-cyan/30
                            shadow-[inset_0_0_16px_rgba(0,212,255,0.18)]
                            text-glow-ice group-hover:text-glow-cyan
                            group-hover:shadow-[inset_0_0_24px_rgba(0,212,255,0.32),0_0_16px_rgba(0,212,255,0.22)]
                            transition-all">
              {l.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] tracking-[0.3em] uppercase font-display text-glow-cyan/80 mb-0.5">
                {l.label}
              </div>
              <div className="text-white/90 truncate group-hover:text-glow-ice transition-colors text-sm">
                {l.value}
              </div>
            </div>
            <span className="text-glow-cyan/55 text-xl group-hover:text-glow-cyan transition-colors">→</span>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex justify-center"
      >
        <a
          href="/cv/Miguel_Angel_Briseno_Flores_DevOps.pdf"
          download
          className="px-6 py-3 rounded-full font-display text-sm tracking-[0.2em] uppercase
                     text-abyss-900 bg-gradient-to-r from-glow-cyan to-glow-ice
                     shadow-glow hover:shadow-[0_0_36px_rgba(0,212,255,0.6)] transition-all
                     hover:-translate-y-0.5"
        >
          Download CV (PDF)
        </a>
      </motion.div>
    </Section>
  );
}
