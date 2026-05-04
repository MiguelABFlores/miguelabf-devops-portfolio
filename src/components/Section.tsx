'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
};

/* depth "coordinates" per section — purely decorative */
const depthMap: Record<string, string> = {
  about:          '12°N · 86°W · −120m',
  skills:         '12°N · 86°W · −340m',
  experience:     '12°N · 86°W · −680m',
  projects:       '12°N · 86°W · −950m',
  certifications: '12°N · 86°W · −1200m',
  contact:        '12°N · 86°W · −1480m',
};

export default function Section({ id, eyebrow, title, children, className = '' }: Props) {
  const depth = depthMap[id];

  return (
    <section id={id} className={`relative py-24 px-6 md:px-10 max-w-6xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mb-14"
      >
        {/* ── Eyebrow row ── */}
        {eyebrow && (
          <div className="flex items-center gap-3 mb-4">
            {/* left spark */}
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-glow-cyan shadow-[0_0_6px_rgba(0,212,255,0.9)]"
              />
              <div className="w-8 h-px bg-gradient-to-r from-glow-cyan/80 to-glow-cyan/20" />
            </div>

            <span className="font-display text-[10px] tracking-[0.45em] uppercase text-glow-cyan/90">
              {eyebrow}
            </span>

            <div className="flex items-center gap-1">
              <div className="w-8 h-px bg-gradient-to-l from-glow-cyan/80 to-glow-cyan/20" />
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: 1.2 }}
                className="w-1.5 h-1.5 rounded-full bg-glow-cyan shadow-[0_0_6px_rgba(0,212,255,0.9)]"
              />
            </div>

            {/* depth coordinate */}
            {depth && (
              <span className="ml-auto font-display text-[9px] tracking-[0.3em] text-white/25 hidden sm:inline">
                {depth}
              </span>
            )}
          </div>
        )}

        {/* ── Title row ── */}
        <div className="relative flex items-center gap-5">
          {/* scanner bracket left */}
          <div className="shrink-0 flex flex-col gap-1" aria-hidden>
            <div className="flex items-end gap-0.5">
              <div className="w-px h-5 bg-glow-cyan/70" />
              <div className="w-3 h-px bg-glow-cyan/70" />
            </div>
            <div className="w-px h-2 bg-glow-cyan/20 ml-0" />
            <div className="flex items-start gap-0.5">
              <div className="w-px h-5 bg-glow-cyan/70" />
              <div className="w-3 h-px bg-glow-cyan/70" />
            </div>
          </div>

          <div className="flex-1">
            <h2
              className="font-display text-3xl md:text-5xl font-bold leading-[1.05] text-white
                         drop-shadow-[0_0_24px_rgba(0,212,255,0.45)]"
            >
              {/* shimmer gradient on text */}
              <span
                className="bg-gradient-to-r from-white via-glow-ice to-white bg-[length:200%_100%]
                           bg-clip-text text-transparent animate-shimmer inline-block"
              >
                {title}
              </span>
            </h2>

            {/* animated underline */}
            <div className="mt-2.5 flex items-center gap-2">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                style={{ originX: 0 }}
                className="h-[2px] w-20 bg-gradient-to-r from-glow-cyan via-glow-atlantis to-transparent
                           shadow-[0_0_10px_rgba(0,212,255,0.6)] rounded-full"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                style={{ originX: 0 }}
                className="h-px w-10 bg-gradient-to-r from-glow-atlantis/60 to-transparent rounded-full"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="w-1 h-1 rounded-full bg-glow-atlantis/70"
              />
            </div>
          </div>

          {/* scanner bracket right */}
          <div className="shrink-0 flex flex-col gap-1 self-stretch justify-between hidden sm:flex" aria-hidden>
            <div className="flex items-start justify-end gap-0.5">
              <div className="w-3 h-px bg-glow-cyan/30 mt-0" />
              <div className="w-px h-5 bg-glow-cyan/30" />
            </div>
            <div className="flex items-end justify-end gap-0.5">
              <div className="w-3 h-px bg-glow-cyan/30" />
              <div className="w-px h-5 bg-glow-cyan/30" />
            </div>
          </div>
        </div>

        {/* ── Bottom scan line ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-5 flex items-center gap-2 pl-8"
          aria-hidden
        >
          <div className="flex-1 h-px bg-gradient-to-r from-glow-cyan/20 via-glow-cyan/8 to-transparent" />
          <div className="w-1 h-1 rounded-full bg-glow-ice/30" />
          <div className="w-6 h-px bg-glow-ice/15" />
        </motion.div>
      </motion.div>

      {children}
    </section>
  );
}
