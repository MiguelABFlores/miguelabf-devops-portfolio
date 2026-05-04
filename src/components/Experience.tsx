'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './Section';
import { experience, type Job } from '@/data/experience';

/* ─── Company logos ─────────────────────────────────────────── */
function CompanyLogo({ slug }: { slug: string }) {
  const base = 'w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border';

  if (slug === 'oracle') return (
    <div className={`${base} bg-[#1a0600] border-[#C74634]/40`}>
      <svg viewBox="0 0 80 24" width="52" height="16">
        <ellipse cx="12" cy="12" rx="12" ry="12" fill="#C74634" />
        <ellipse cx="12" cy="12" rx="6" ry="12" fill="#1a0600" />
        <text x="28" y="17" fontSize="13" fontFamily="sans-serif" fontWeight="700" fill="#C74634" letterSpacing="0.5">ORACLE</text>
      </svg>
    </div>
  );

  if (slug === 'griddynamics') return (
    <div className={`${base} bg-[#001830] border-[#0078d4]/40`}>
      <svg viewBox="0 0 48 48" width="40" height="40">
        {/* Grid of dots */}
        {[0,1,2].map(row => [0,1,2].map(col => (
          <circle key={`${row}-${col}`} cx={10 + col * 14} cy={10 + row * 14} r={col === 1 && row === 1 ? 4 : 3}
            fill={col === 1 && row === 1 ? '#0078d4' : '#0078d4'} opacity={col === 1 && row === 1 ? 1 : 0.55} />
        )))}
      </svg>
    </div>
  );

  if (slug === 'elain') return (
    <div className={`${base} bg-[#0d1f10] border-[#4caf50]/40`}>
      <svg viewBox="0 0 48 48" width="38" height="38">
        {/* simple cat silhouette */}
        <ellipse cx="24" cy="29" rx="13" ry="11" fill="#4caf50" opacity="0.85"/>
        <circle cx="24" cy="19" r="9" fill="#4caf50" opacity="0.85"/>
        {/* ears */}
        <polygon points="16,14 13,5 20,12" fill="#4caf50"/>
        <polygon points="32,14 35,5 28,12" fill="#4caf50"/>
        {/* eyes */}
        <ellipse cx="21" cy="18" rx="2" ry="2.5" fill="#0d1f10"/>
        <ellipse cx="27" cy="18" rx="2" ry="2.5" fill="#0d1f10"/>
        {/* nose */}
        <circle cx="24" cy="22" r="1" fill="#0d1f10" opacity="0.6"/>
      </svg>
    </div>
  );

  if (slug === 'assetel') return (
    <div className={`${base} bg-[#001428] border-glow-cyan/30`}>
      <svg viewBox="0 0 48 48" width="38" height="38">
        <text x="24" y="32" textAnchor="middle" fontSize="24" fontFamily="sans-serif"
          fontWeight="800" fill="#00d4ff" opacity="0.9">a</text>
        <circle cx="24" cy="24" r="20" fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity="0.3"/>
      </svg>
    </div>
  );

  return (
    <div className={`${base} bg-abyss-800 border-glow-cyan/20`}>
      <span className="font-display text-glow-cyan text-lg">{slug[0].toUpperCase()}</span>
    </div>
  );
}

/* ─── Sub-project accordion item ───────────────────────────── */
function SubProjectItem({ project, index }: { project: NonNullable<Job['subProjects']>[number]; index: number }) {
  const [open, setOpen] = useState(index === 2); // Main project open by default

  return (
    <div className="border border-glow-cyan/15 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left
                   hover:bg-glow-cyan/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="font-display text-glow-ice text-sm">{project.name}</span>
          <span className="text-white/40 text-xs font-display">{project.period}</span>
        </div>
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor"
          strokeWidth="1.8" className={`text-glow-cyan/70 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <path d="M5 7.5l5 5 5-5" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 space-y-4">
              <p className="text-white/80 text-sm leading-relaxed">{project.description}</p>

              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase font-display text-glow-cyan/70 mb-2">
                  Responsibilities
                </div>
                <ul className="space-y-1.5">
                  {project.responsibilities.map((r) => (
                    <li key={r} className="text-white/75 text-sm flex gap-2">
                      <span className="text-glow-cyan/60 shrink-0">▸</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Job card ──────────────────────────────────────────────── */
function JobCard({ job, index }: { job: Job; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="hidden md:block absolute left-[27px] top-16 bottom-[-3rem] w-px
                      bg-gradient-to-b from-glow-cyan/40 via-glow-cyan/20 to-transparent" />

      <div className="flex gap-5 md:gap-7">
        {/* Logo */}
        <div className="shrink-0 mt-1">
          <CompanyLogo slug={job.companySlug} />
        </div>

        {/* Card */}
        <div className="flex-1 glass rounded-2xl p-6 md:p-7 hover:border-glow-cyan/35 transition-colors">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-display text-xl md:text-2xl text-white leading-tight">
                {job.role}
              </h3>
              <div className="text-glow-cyan font-medium mt-1 text-lg">{job.company}</div>
              <div className="text-white/50 text-xs mt-1 font-display tracking-[0.2em]">
                {job.period} · {job.location}
              </div>
            </div>
          </div>

          {/* Summary — handle multi-paragraph */}
          {job.summary.split('\n\n').map((para, i) => (
            <p key={i} className={`text-white/80 text-sm md:text-[0.95rem] leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>
              {para}
            </p>
          ))}

          {/* Highlights */}
          {job.highlights.length > 0 && (
            <ul className="mt-5 space-y-2">
              {job.highlights.map((h) => (
                <li key={h} className="text-white/75 text-sm flex gap-2">
                  <span className="text-glow-cyan/70 shrink-0">▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Sub-projects (Grid Dynamics) */}
          {job.subProjects && job.subProjects.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="text-[10px] tracking-[0.3em] uppercase font-display text-glow-atlantis/80 mb-3">
                Projects
              </div>
              {job.subProjects.map((sp, i) => (
                <SubProjectItem key={sp.name} project={sp} index={i} />
              ))}
            </div>
          )}

          {/* Tech chips */}
          {!job.subProjects && (
            <div className="mt-5 flex flex-wrap gap-2">
              {job.tech.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          )}
          {job.subProjects && (
            <div className="mt-5">
              <div className="text-[10px] tracking-[0.3em] uppercase font-display text-white/40 mb-2">
                Full stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {job.tech.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────── */
export default function Experience() {
  return (
    <Section id="experience" eyebrow="Voyage" title="Experience">
      <div className="space-y-16">
        {experience.map((job, i) => (
          <JobCard key={`${job.company}-${i}`} job={job} index={i} />
        ))}
      </div>
    </Section>
  );
}
