'use client';

import { motion } from 'framer-motion';

/* ───────────────────────────────────────────────────────────────
   HelmButton - Atlantean rune disk CTA.

   Design language matches the portfolio palette: cyan/magenta
   bioluminescent glow, concentric rotating rings, glowing
   portal-like core, geometric rune segments around the rim.

   Glitch fix: the wheel rotation is a CONSTANT-duration CSS
   animation (not duration-changing Framer transition), so the
   timeline never gets re-evaluated mid-flight. Hover effects
   apply to the circular wheel only - never to the rectangular
   button bounding box - so no square outline can flash.
   ─────────────────────────────────────────────────────────────── */
type Props = {
  onClick: () => void;
  label?: string;
};

export default function HelmButton({ onClick, label = 'Take the Helm' }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.4, ease: 'easeOut' }}
      aria-label={`${label} - enter the portfolio`}
      className="group inline-flex flex-col items-center gap-3 cursor-pointer
                 bg-transparent border-0 p-0 select-none
                 focus-visible:outline-none"
    >
      {/* ── Wheel disk - circular hover surface ─────────────────
          Scale + filter live HERE (not on the button) so the
          hover effect is bound to a perfect circle. The disk is
          intrinsically square (130×130) but `rounded-full` makes
          it visually circular AND the focus ring (when keyboard
          focused) stays a circle. */}
      <motion.div
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
        className="relative w-[130px] h-[130px] rounded-full
                   group-focus-visible:ring-2
                   group-focus-visible:ring-glow-cyan/85
                   group-focus-visible:ring-offset-4
                   group-focus-visible:ring-offset-abyss-900
                   group-hover:[--helm-glow:0.85]"
        style={{
          // Static glow filter - never changes mid-render,
          // intensified via group-hover variable on the inner SVG.
          filter:
            'drop-shadow(0 0 22px rgba(0,212,255,0.55)) drop-shadow(0 0 8px rgba(125,249,255,0.35))',
        }}
      >
        {/* Continuous rotation - pure CSS animation so framer
            never has to retime the spin. */}
        <div
          className="absolute inset-0"
          style={{
            animation: 'wheelSpin 22s linear infinite',
            willChange: 'transform',
            transformOrigin: '50% 50%',
          }}
        >
          <RuneWheel />
        </div>

        {/* Counter-rotating inner ring (different speed/direction)
            for visual depth. */}
        <div
          className="absolute inset-0"
          style={{
            animation: 'wheelSpin 14s linear reverse infinite',
            willChange: 'transform',
            transformOrigin: '50% 50%',
          }}
        >
          <InnerRunes />
        </div>

        {/* Pulsing portal core - does NOT rotate so the central
            light feels stable like a beacon. */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full"
            style={{
              width: '36px',
              height: '36px',
              background:
                'radial-gradient(circle at 50% 50%, #fff 0%, #7df9ff 40%, rgba(0,212,255,0.0) 75%)',
              animation: 'lurePulse 2.6s ease-in-out infinite',
              filter: 'drop-shadow(0 0 14px #00d4ff)',
            }}
          />
        </div>
      </motion.div>

      {/* ── Label ─────────────────────────────────────────────── */}
      <span
        className="font-display text-xs md:text-sm tracking-[0.35em] uppercase
                   text-glow-ice/85 group-hover:text-glow-cyan
                   transition-colors duration-300"
      >
        {label} <span aria-hidden>→</span>
      </span>
    </motion.button>
  );
}

/* ── Outer rotating wheel - geometric rune segments + tick marks ── */
function RuneWheel() {
  const rOuter = 60;
  const rRim   = 54;
  const rInner = 44;

  return (
    <svg
      viewBox="0 0 130 130"
      width="130" height="130"
      fill="none"
      aria-hidden
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="rim-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#7df9ff" stopOpacity="0.95" />
          <stop offset="50%"  stopColor="#00d4ff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0a3552" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="rune-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#7df9ff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#b14eff" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* outer rim (cyan glow) */}
      <circle cx="65" cy="65" r={rOuter} stroke="url(#rim-grad)" strokeWidth="2.4" fill="none" />
      {/* inner faint ring */}
      <circle cx="65" cy="65" r={rRim} stroke="#7df9ff" strokeOpacity="0.25" strokeWidth="0.7" fill="none" />

      {/* 8 rune-tip handles around the outside (the protruding peg
          equivalents - but now triangular Atlantean shapes) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a  = (i * Math.PI * 2) / 8;
        const x1 = 65 + Math.cos(a) * (rOuter - 1);
        const y1 = 65 + Math.sin(a) * (rOuter - 1);
        const x2 = 65 + Math.cos(a) * 64;
        const y2 = 65 + Math.sin(a) * 64;
        // small triangle tip
        const tx = 65 + Math.cos(a) * 64;
        const ty = 65 + Math.sin(a) * 64;
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="url(#rim-grad)" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx={tx} cy={ty} r="2.4" fill="#7df9ff" opacity="0.95" />
          </g>
        );
      })}

      {/* 8 spokes - drawn as dual lines for a hollow-rune feel */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 8;
        const x = 65 + Math.cos(a) * rInner;
        const y = 65 + Math.sin(a) * rInner;
        return (
          <line key={i}
            x1="65" y1="65" x2={x} y2={y}
            stroke="url(#rune-grad)" strokeWidth="1.8" strokeLinecap="round"
          />
        );
      })}

      {/* 16 tick marks on the rim (every 22.5°) */}
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 16;
        const x1 = 65 + Math.cos(a) * (rOuter - 4);
        const y1 = 65 + Math.sin(a) * (rOuter - 4);
        const x2 = 65 + Math.cos(a) * (rOuter + 0.5);
        const y2 = 65 + Math.sin(a) * (rOuter + 0.5);
        return (
          <line key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#7df9ff" strokeWidth="0.7" strokeOpacity={i % 2 ? 0.4 : 0.85}
          />
        );
      })}

      {/* central hub ring */}
      <circle cx="65" cy="65" r="22" stroke="#7df9ff" strokeOpacity="0.7" strokeWidth="1" fill="none" />
    </svg>
  );
}

/* ── Inner counter-rotating rune ring - geometric Atlantean glyphs ── */
function InnerRunes() {
  return (
    <svg
      viewBox="0 0 130 130"
      width="130" height="130"
      fill="none"
      aria-hidden
      style={{ display: 'block' }}
    >
      {/* faint inner ring */}
      <circle cx="65" cy="65" r="32" stroke="#7df9ff" strokeOpacity="0.4" strokeWidth="0.7" fill="none" />
      {/* 4 cardinal runes (diamonds) */}
      {Array.from({ length: 4 }).map((_, i) => {
        const a  = (i * Math.PI * 2) / 4 - Math.PI / 4;
        const cx = 65 + Math.cos(a) * 32;
        const cy = 65 + Math.sin(a) * 32;
        return (
          <g key={i} transform={`translate(${cx} ${cy}) rotate(${(a * 180) / Math.PI})`}
            style={{ animation: `runePulse 3.4s ease-in-out ${i * 0.4}s infinite` }}>
            <path d="M -5,0 L 0,-5 L 5,0 L 0,5 Z"
              stroke="#7df9ff" strokeWidth="0.9" fill="none" />
            <circle cx="0" cy="0" r="1.4" fill="#7df9ff" />
          </g>
        );
      })}
      {/* 4 diagonal runes (small triangles) */}
      {Array.from({ length: 4 }).map((_, i) => {
        const a  = (i * Math.PI * 2) / 4;
        const cx = 65 + Math.cos(a) * 32;
        const cy = 65 + Math.sin(a) * 32;
        return (
          <g key={i} transform={`translate(${cx} ${cy})`}
            style={{ animation: `runePulse 3.0s ease-in-out ${i * 0.55}s infinite` }}>
            <circle cx="0" cy="0" r="2" stroke="#b14eff" strokeOpacity="0.85" strokeWidth="0.8" fill="none" />
            <circle cx="0" cy="0" r="0.9" fill="#b14eff" opacity="0.85" />
          </g>
        );
      })}
    </svg>
  );
}
