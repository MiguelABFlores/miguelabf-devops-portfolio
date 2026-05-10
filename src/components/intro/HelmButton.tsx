'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

/* ───────────────────────────────────────────────────────────────
   HelmButton — ship's wheel CTA. Rotates slowly always; on hover
   the rotation speeds up. On click, fires onClick.
   ─────────────────────────────────────────────────────────────── */
type Props = {
  onClick: () => void;
  label?: string;
};

export default function HelmButton({ onClick, label = 'Take the Helm' }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 1.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`${label} — enter the portfolio`}
      className="group flex flex-col items-center gap-3 cursor-pointer
                 focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-glow-cyan/80 focus-visible:ring-offset-4
                 focus-visible:ring-offset-abyss-900 rounded-full"
    >
      {/* ── Wheel ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: hover ? 6 : 18,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="relative"
        style={{
          filter: hover
            ? 'drop-shadow(0 0 28px rgba(0,212,255,0.7)) drop-shadow(0 0 12px rgba(125,249,255,0.5))'
            : 'drop-shadow(0 0 18px rgba(0,212,255,0.45)) drop-shadow(0 0 6px rgba(125,249,255,0.3))',
          transition: 'filter 0.4s ease',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <radialGradient id="hub" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"  stopColor="#7df9ff" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#00d4ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0a3552" stopOpacity="0.0" />
            </radialGradient>
            <linearGradient id="wood" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5e3c18" />
              <stop offset="100%" stopColor="#2a1808" />
            </linearGradient>
          </defs>

          {/* outer rim (wood) */}
          <circle cx="60" cy="60" r="50" stroke="url(#wood)" strokeWidth="6" fill="none" />
          {/* inner rim (cyan accent) */}
          <circle cx="60" cy="60" r="50" stroke="#7df9ff" strokeWidth="1" fill="none" opacity="0.55" />
          {/* 8 handles around the rim (the protruding grip pegs) */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const x1 = 60 + Math.cos(angle) * 50;
            const y1 = 60 + Math.sin(angle) * 50;
            const x2 = 60 + Math.cos(angle) * 60;
            const y2 = 60 + Math.sin(angle) * 60;
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="url(#wood)" strokeWidth="6" strokeLinecap="round" />
                <circle cx={x2} cy={y2} r="4" fill="#3a2412"
                  stroke="#7df9ff" strokeOpacity="0.55" strokeWidth="0.7" />
              </g>
            );
          })}
          {/* 8 spokes from hub to rim */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const x = 60 + Math.cos(angle) * 47;
            const y = 60 + Math.sin(angle) * 47;
            return (
              <line key={i}
                x1="60" y1="60" x2={x} y2={y}
                stroke="url(#wood)" strokeWidth="3.5" strokeLinecap="round"
              />
            );
          })}
          {/* central hub — glowing core */}
          <circle cx="60" cy="60" r="14" fill="url(#hub)" />
          <circle cx="60" cy="60" r="7"  fill="#7df9ff" opacity="0.85" />
          <circle cx="60" cy="60" r="3"  fill="white"   opacity="0.9" />
        </svg>
      </motion.div>

      {/* ── Label ── */}
      <span
        className={`font-display text-xs md:text-sm tracking-[0.35em] uppercase
                    transition-colors duration-300
                    ${hover ? 'text-glow-cyan' : 'text-glow-ice/85'}`}
      >
        {label} <span aria-hidden>→</span>
      </span>
    </motion.button>
  );
}
