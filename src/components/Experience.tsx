'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import { experience } from '@/data/experience';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Voyage" title="Experience">
      <div className="relative">
        {/* timeline line */}
        <div
          aria-hidden
          className="absolute left-3 md:left-1/2 top-2 bottom-2 w-px
                     bg-gradient-to-b from-glow-cyan/0 via-glow-cyan/40 to-glow-atlantis/30 md:-translate-x-1/2"
        />
        <div className="space-y-12">
          {experience.map((job, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={`${job.company}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`relative md:grid md:grid-cols-2 md:gap-10 ${
                  left ? '' : 'md:[&>*:first-child]:col-start-2'
                }`}
              >
                {/* node dot */}
                <div
                  aria-hidden
                  className="absolute left-3 md:left-1/2 top-3 w-3 h-3 rounded-full bg-glow-cyan
                             ring-4 ring-glow-cyan/20 -translate-x-1/2 shadow-[0_0_18px_rgba(0,212,255,0.8)]"
                />

                <div
                  className={`pl-10 md:pl-0 ${
                    left ? 'md:pr-10 md:text-right' : 'md:pl-10'
                  }`}
                >
                  <div className="glass rounded-2xl p-5 md:p-6 hover:border-glow-cyan/40 transition-colors">
                    <div className="text-glow-ice/80 text-xs tracking-[0.25em] uppercase font-display mb-2">
                      {job.period}
                    </div>
                    <h3 className="font-display text-xl md:text-2xl text-white">
                      {job.role}
                    </h3>
                    <div className="text-glow-cyan font-medium mt-1">{job.company}</div>
                    <div className="text-white/60 text-xs mt-1">{job.location}</div>
                    <p className="text-white/80 text-sm md:text-[0.95rem] leading-relaxed mt-4">
                      {job.summary}
                    </p>
                    <ul
                      className={`mt-4 space-y-1.5 text-white/75 text-sm ${
                        left ? 'md:text-right' : ''
                      }`}
                    >
                      {job.highlights.map((h) => (
                        <li key={h} className="leading-snug">
                          <span className="text-glow-cyan/80 mr-2">▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div
                      className={`mt-5 flex flex-wrap gap-2 ${
                        left ? 'md:justify-end' : ''
                      }`}
                    >
                      {job.tech.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
