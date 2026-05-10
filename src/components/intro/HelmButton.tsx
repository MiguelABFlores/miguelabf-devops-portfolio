'use client';

import { motion } from 'framer-motion';

/* ───────────────────────────────────────────────────────────────
   HelmButton - Atlantean rune-disk CTA.

   Visibility hooks (so a non-techy visitor or a kid on an iPad
   IMMEDIATELY understands this is the clickable thing):
     1. Two expanding "tap-pulse" rings emanate from the wheel
        continuously - reads as a touch-target indicator.
     2. The label "Take the Helm" is larger, slightly glowing,
        and animates on a soft loop.
     3. A bouncing chevron sits below the label pointing at the
        wheel as a literal "click here" affordance.
     4. The wheel itself is faster + bigger appearance animation
        and the inner portal core pulses more visibly.

   Glitch-prevention (preserved from earlier round):
     - Rotation is a CONSTANT-duration CSS keyframe so Framer never
       has to re-time the spin mid-flight (no hover-induced jump).
     - Scale + filter live on the circular wheel div, not on the
       rectangular button bounding box, so no square outline flashes.
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
      transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
      aria-label={`${label} - enter the portfolio`}
      className="group inline-flex flex-col items-center gap-3 cursor-pointer
                 bg-transparent border-0 p-0 select-none
                 focus-visible:outline-none"
    >
      {/* ── Wheel disk (circular hover surface) ───────────────── */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
        className="relative w-[130px] h-[130px] rounded-full
                   group-focus-visible:ring-2
                   group-focus-visible:ring-glow-cyan/85
                   group-focus-visible:ring-offset-4
                   group-focus-visible:ring-offset-abyss-900"
        style={{
          filter:
            'drop-shadow(0 0 26px rgba(0,212,255,0.65)) drop-shadow(0 0 10px rgba(125,249,255,0.45))',
        }}
      >
        {/* ── Tap-pulse rings (visual "click me" cue) ── */}
        {/* Two staggered expanding cyan rings. They emanate from
            the wheel center and fade out, repeating forever, so the
            button never sits idle without telegraphing interactivity. */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: '2px solid rgba(125,249,255,0.7)',
            animation: 'tapPulse 1.8s ease-out infinite',
            willChange: 'transform, opacity',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: '2px solid rgba(125,249,255,0.55)',
            animation: 'tapPulse 1.8s ease-out 0.9s infinite',
            willChange: 'transform, opacity',
          }}
        />

        {/* Continuous wheel rotation (pure CSS) */}
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

        {/* Counter-rotating inner ring */}
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

        {/* Pulsing portal core - more visible than before */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full"
            style={{
              width: '42px',
              height: '42px',
              background:
                'radial-gradient(circle at 50% 50%, #fff 0%, #7df9ff 45%, rgba(0,212,255,0.0) 75%)',
              animation: 'lurePulse 1.6s ease-in-out infinite',
              filter: 'drop-shadow(0 0 18px #00d4ff)',
            }}
          />
        </div>
      </motion.div>

      {/* ── Label (bigger, with subtle glow loop) ─────────────── */}
      <motion.span
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="font-display text-sm md:text-base tracking-[0.4em] uppercase
                   text-glow-ice group-hover:text-glow-cyan
                   transition-colors duration-300"
        style={{ textShadow: '0 0 14px rgba(0,212,255,0.65)' }}
      >
        {label} <span aria-hidden>→</span>
      </motion.span>

      {/* ── Bouncing chevron hint ("click here") ──────────────── */}
      <div
        aria-hidden
        className="text-glow-cyan/80"
        style={{
          animation: 'helmHintBounce 1.6s ease-in-out infinite',
          willChange: 'transform',
        }}
      >
        <svg
          width="22" height="14" viewBox="0 0 22 14"
          fill="none" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.65))' }}
        >
          <path d="M 2,3 L 11,11 L 20,3" />
        </svg>
      </div>
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

      <circle cx="65" cy="65" r={rOuter} stroke="url(#rim-grad)" strokeWidth="2.4" fill="none" />
      <circle cx="65" cy="65" r={rRim} stroke="#7df9ff" strokeOpacity="0.25" strokeWidth="0.7" fill="none" />

      {Array.from({ length: 8 }).map((_, i) => {
        const a  = (i * Math.PI * 2) / 8;
        const x1 = 65 + Math.cos(a) * (rOuter - 1);
        const y1 = 65 + Math.sin(a) * (rOuter - 1);
        const x2 = 65 + Math.cos(a) * 64;
        const y2 = 65 + Math.sin(a) * 64;
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

      <circle cx="65" cy="65" r="22" stroke="#7df9ff" strokeOpacity="0.7" strokeWidth="1" fill="none" />
    </svg>
  );
}

/* ── Inner counter-rotating rune ring ── */
function InnerRunes() {
  return (
    <svg
      viewBox="0 0 130 130"
      width="130" height="130"
      fill="none"
      aria-hidden
      style={{ display: 'block' }}
    >
      <circle cx="65" cy="65" r="32" stroke="#7df9ff" strokeOpacity="0.4" strokeWidth="0.7" fill="none" />
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
