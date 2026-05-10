'use client';

import { motion } from 'framer-motion';

/* ───────────────────────────────────────────────────────────────
   Caravel — three-masted sailing ship rendered inline as SVG.
   Used in the intro splash. Subtle rocking animation simulates
   waves; respect prefers-reduced-motion via globals.css.
   ─────────────────────────────────────────────────────────────── */
export default function Caravel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
      className="relative"
      style={{ filter: 'drop-shadow(0 16px 28px rgba(0, 60, 100, 0.55))' }}
    >
      <motion.div
        animate={{ rotate: [-1.4, 1.4, -1.4], y: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '50% 78%' }}
      >
        <svg
          width="480"
          height="360"
          viewBox="0 0 480 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          style={{ display: 'block' }}
        >
          <defs>
            {/* Hull gradient — dark wood up top, deeper at the keel */}
            <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#3a2412" />
              <stop offset="55%" stopColor="#1f1208" />
              <stop offset="100%" stopColor="#0a0604" />
            </linearGradient>
            <linearGradient id="hullStripe" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a06a30" />
              <stop offset="100%" stopColor="#5e3c18" />
            </linearGradient>
            {/* Sail gradient — luminous canvas lit by a warm sun */}
            <linearGradient id="sail" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#fff8e8" />
              <stop offset="55%" stopColor="#f0e2b6" />
              <stop offset="100%" stopColor="#c9b07a" />
            </linearGradient>
            <linearGradient id="sailShadow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
            </linearGradient>
          </defs>

          {/* ── Hull — classic caravel curved profile ── */}
          {/* main hull */}
          <path
            d="M 70,250
               C 90,238  150,232  240,232
               C 330,232  390,238  410,250
               L 380,302
               C 360,316  300,322  240,322
               C 180,322  120,316  100,302 Z"
            fill="url(#hull)"
            stroke="#0a0604"
            strokeWidth="1.5"
          />
          {/* upper deck rail (sterncastle / forecastle) */}
          <path
            d="M 80,252
               L 100,232
               L 380,232
               L 400,252 Z"
            fill="#3a2412"
            stroke="#0a0604"
            strokeWidth="1"
          />
          {/* hull stripe (decorative band) */}
          <path
            d="M 75,260
               C 95,252  150,248  240,248
               C 330,248  385,252  405,260
               L 402,272
               C 380,265  320,261  240,261
               C 160,261  100,265  78,272 Z"
            fill="url(#hullStripe)"
            opacity="0.85"
          />
          {/* portholes */}
          {[125, 165, 205, 245, 285, 325, 365].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="282" r="5"   fill="#000" />
              <circle cx={x} cy="282" r="3.2" fill="#f7c860" opacity="0.85" />
            </g>
          ))}
          {/* sterncastle (raised aft platform) */}
          <path
            d="M 350,232
               L 350,210
               L 408,210
               L 410,232 Z"
            fill="#3a2412"
            stroke="#0a0604"
            strokeWidth="1"
          />
          <rect x="358" y="216" width="14" height="12" fill="#f7c860" opacity="0.55" />
          <rect x="384" y="216" width="14" height="12" fill="#f7c860" opacity="0.55" />
          {/* forecastle (raised fore platform) */}
          <path
            d="M 70,232
               L 70,216
               L 110,216
               L 100,232 Z"
            fill="#3a2412"
            stroke="#0a0604"
            strokeWidth="1"
          />

          {/* ── Bowsprit (forward jib pole) ── */}
          <path d="M 70,238 L 14,210" stroke="#1f1208" strokeWidth="4" strokeLinecap="round" />
          {/* small jib sail */}
          <path
            d="M 22,212 L 60,232 L 60,216 Z"
            fill="url(#sail)"
            stroke="#7a6230"
            strokeWidth="0.8"
            opacity="0.95"
          />

          {/* ── Three masts — fore, main, mizzen ── */}
          {/* Foremast */}
          <line x1="138" y1="232" x2="138" y2="60" stroke="#1f1208" strokeWidth="4" strokeLinecap="round" />
          <line x1="120" y1="76"  x2="156" y2="76" stroke="#1f1208" strokeWidth="2" />
          {/* foresail */}
          <path
            d="M 102,80
               C 110,110  130,140  138,160
               C 146,140  166,110  174,80
               C 162,76  150,76  138,76
               C 126,76  114,76  102,80 Z"
            fill="url(#sail)"
            stroke="#7a6230"
            strokeWidth="1"
          />
          <path
            d="M 102,80
               C 110,110  130,140  138,160
               C 146,140  166,110  174,80"
            fill="url(#sailShadow)"
          />
          {/* canvas seams */}
          <path d="M 138,80 L 138,158" stroke="#7a6230" strokeWidth="0.6" opacity="0.55" />
          <path d="M 118,82 C 124,116 134,144 138,158" stroke="#7a6230" strokeWidth="0.5" opacity="0.40" />
          <path d="M 158,82 C 152,116 142,144 138,158" stroke="#7a6230" strokeWidth="0.5" opacity="0.40" />

          {/* Mainmast (taller, center) */}
          <line x1="240" y1="232" x2="240" y2="22" stroke="#1f1208" strokeWidth="5" strokeLinecap="round" />
          <line x1="216" y1="44"  x2="264" y2="44" stroke="#1f1208" strokeWidth="2.4" />
          {/* mainsail (large square sail, slightly billowed) */}
          <path
            d="M 188,48
               C 198,90  226,140  240,170
               C 254,140  282,90  292,48
               C 274,44  256,44  240,44
               C 224,44  206,44  188,48 Z"
            fill="url(#sail)"
            stroke="#7a6230"
            strokeWidth="1.1"
          />
          <path
            d="M 188,48
               C 198,90  226,140  240,170
               C 254,140  282,90  292,48"
            fill="url(#sailShadow)"
          />
          <path d="M 240,48 L 240,168" stroke="#7a6230" strokeWidth="0.6" opacity="0.55" />
          <path d="M 212,52 C 220,98 234,148 240,168" stroke="#7a6230" strokeWidth="0.55" opacity="0.40" />
          <path d="M 268,52 C 260,98 246,148 240,168" stroke="#7a6230" strokeWidth="0.55" opacity="0.40" />
          {/* crow's nest */}
          <path d="M 230,42 L 250,42 L 248,32 L 232,32 Z" fill="#3a2412" stroke="#0a0604" strokeWidth="1" />
          {/* small flag at top */}
          <path d="M 240,22 L 264,28 L 240,34 Z" fill="#c83030" stroke="#7a1818" strokeWidth="0.8" />

          {/* Mizzenmast (rear, lateen-style triangular sail) */}
          <line x1="332" y1="232" x2="332" y2="78" stroke="#1f1208" strokeWidth="3.5" strokeLinecap="round" />
          {/* lateen yard (diagonal spar) */}
          <line x1="312" y1="160" x2="378" y2="92" stroke="#1f1208" strokeWidth="2.2" />
          {/* triangular lateen sail */}
          <path
            d="M 332,164
               L 374,96
               L 332,120 Z"
            fill="url(#sail)"
            stroke="#7a6230"
            strokeWidth="1"
          />
          <path
            d="M 332,164
               L 374,96
               L 332,120 Z"
            fill="url(#sailShadow)"
          />
          <path d="M 332,124 L 372,98" stroke="#7a6230" strokeWidth="0.5" opacity="0.45" />
          <path d="M 332,144 L 358,120" stroke="#7a6230" strokeWidth="0.5" opacity="0.45" />

          {/* ── Rigging — thin lines connecting masts to hull ── */}
          <g stroke="#a08660" strokeWidth="0.7" opacity="0.55" fill="none">
            {/* foremast to bowsprit */}
            <line x1="138" y1="60"  x2="14"  y2="212" />
            <line x1="138" y1="76"  x2="40"  y2="218" />
            {/* foremast to deck */}
            <line x1="138" y1="60"  x2="100" y2="232" />
            <line x1="138" y1="60"  x2="176" y2="232" />
            {/* mainmast forward stays */}
            <line x1="240" y1="22"  x2="138" y2="60" />
            <line x1="240" y1="44"  x2="180" y2="232" />
            <line x1="240" y1="44"  x2="300" y2="232" />
            {/* mainmast aft stays */}
            <line x1="240" y1="22"  x2="332" y2="78" />
            {/* mizzenmast stays */}
            <line x1="332" y1="78"  x2="290" y2="232" />
            <line x1="332" y1="78"  x2="380" y2="232" />
          </g>

          {/* ── Faint cyan rim glow on sails (ties into portfolio palette) ── */}
          <path
            d="M 188,48
               C 198,90  226,140  240,170
               C 254,140  282,90  292,48"
            fill="none"
            stroke="#7df9ff"
            strokeWidth="0.7"
            opacity="0.30"
          />
          <path
            d="M 102,80
               C 110,110  130,140  138,160
               C 146,140  166,110  174,80"
            fill="none"
            stroke="#7df9ff"
            strokeWidth="0.6"
            opacity="0.25"
          />
        </svg>
      </motion.div>

      {/* Faint reflection in the water below the ship */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 top-[78%] w-[420px] h-[80px]
                   pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(40,80,120,0.55), transparent 65%)',
          filter: 'blur(3px)',
          transform: 'translate(-50%, 0) scaleY(-0.55)',
          opacity: 0.45,
        }}
      />
    </motion.div>
  );
}
