'use client';

import { motion } from 'framer-motion';

/* ───────────────────────────────────────────────────────────────
   Caravel — Atlantean-style three-master.

   Visual language matches the rest of the portfolio: dark
   silhouette with cyan/magenta bioluminescent glow accents,
   translucent jellyfish-bell sails, glowing rune patterns on
   the hull, lantern orb at the masthead instead of a flag.
   Subtle rocking simulates waves.
   ─────────────────────────────────────────────────────────────── */
export default function Caravel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
      className="relative"
      style={{
        filter: `
          drop-shadow(0 0 36px rgba(0,212,255,0.32))
          drop-shadow(0 0 14px rgba(125,249,255,0.20))
          drop-shadow(0 24px 32px rgba(0,20,40,0.55))
        `,
      }}
    >
      <motion.div
        animate={{ rotate: [-1.6, 1.6, -1.6], y: [0, -7, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '50% 80%', willChange: 'transform' }}
      >
        <svg
          width="500"
          height="380"
          viewBox="0 0 500 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          style={{ display: 'block' }}
        >
          <defs>
            {/* Hull — deep abyssal gradient with subtle teal sheen */}
            <linearGradient id="atl-hull" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#0d2b4a" />
              <stop offset="55%" stopColor="#06182e" />
              <stop offset="100%" stopColor="#020a18" />
            </linearGradient>
            {/* Hull rim — glowing cyan trim */}
            <linearGradient id="atl-rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7df9ff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.45" />
            </linearGradient>
            {/* Sail — translucent jellyfish-bell tissue with cyan glow */}
            <radialGradient id="atl-sail" cx="0.5" cy="0.3" r="0.7">
              <stop offset="0%"   stopColor="#dffaff" stopOpacity="0.88" />
              <stop offset="40%"  stopColor="#7df9ff" stopOpacity="0.55" />
              <stop offset="80%"  stopColor="#00d4ff" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#0a3552" stopOpacity="0.10" />
            </radialGradient>
            {/* Mizzen sail — magenta-tinted variant */}
            <radialGradient id="atl-sail-mag" cx="0.5" cy="0.3" r="0.7">
              <stop offset="0%"   stopColor="#f5e2ff" stopOpacity="0.85" />
              <stop offset="40%"  stopColor="#d6a8ff" stopOpacity="0.50" />
              <stop offset="80%"  stopColor="#b14eff" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#3a1850" stopOpacity="0.10" />
            </radialGradient>
            {/* Lantern orb */}
            <radialGradient id="atl-lantern" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"  stopColor="#fff" stopOpacity="1" />
              <stop offset="40%" stopColor="#7df9ff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ═══════════════════════════════════════════════════ */}
          {/* HULL                                                */}
          {/* ═══════════════════════════════════════════════════ */}
          {/* main hull silhouette */}
          <path
            d="M 80,260
               C 100,246  166,238  250,238
               C 334,238  400,246  420,260
               L 392,316
               C 372,332  310,338  250,338
               C 190,338  128,332  108,316 Z"
            fill="url(#atl-hull)"
            stroke="url(#atl-rim)"
            strokeWidth="1.4"
            strokeOpacity="0.85"
          />
          {/* upper deck wedge (sterncastle/forecastle joining) */}
          <path
            d="M 88,260
               L 110,238
               L 390,238
               L 412,260 Z"
            fill="#0a1f38"
            stroke="url(#atl-rim)"
            strokeWidth="1"
            strokeOpacity="0.55"
          />
          {/* glowing rim line — full hull contour */}
          <path
            d="M 80,260
               C 100,246  166,238  250,238
               C 334,238  400,246  420,260"
            stroke="#7df9ff"
            strokeOpacity="0.65"
            strokeWidth="1.2"
            fill="none"
          />
          {/* belly waterline glow */}
          <path
            d="M 108,316 C 150,328 200,332 250,332 C 300,332 350,328 392,316"
            stroke="#7df9ff"
            strokeOpacity="0.32"
            strokeWidth="1.4"
            fill="none"
          />

          {/* Atlantean rune band along the hull */}
          <g opacity="0.85" style={{ filter: 'drop-shadow(0 0 4px #00d4ff)' }}>
            {/* horizontal trim line */}
            <line x1="118" y1="278" x2="382" y2="278"
              stroke="#00d4ff" strokeOpacity="0.5" strokeWidth="0.8" />
            {/* repeated rune motifs */}
            {[140, 178, 216, 254, 292, 330, 368].map((cx, i) => (
              <g key={i} transform={`translate(${cx} 278)`}>
                <path d="M -8,0 L 0,-7 L 8,0 L 0,7 Z"
                  stroke="#7df9ff" strokeWidth="0.9" fill="none" opacity="0.85" />
                <circle cx="0" cy="0" r="1.4" fill="#7df9ff" opacity="0.95" />
              </g>
            ))}
          </g>

          {/* Glowing portholes */}
          {[140, 178, 216, 254, 292, 330, 368].map((cx, i) => (
            <g key={i}>
              <circle cx={cx} cy="298" r="6" fill="#02101e"
                stroke="#7df9ff" strokeOpacity="0.55" strokeWidth="0.9" />
              <circle cx={cx} cy="298" r="3.2"
                fill="#7df9ff" opacity="0.85"
                style={{ filter: 'drop-shadow(0 0 3px #00d4ff)' }} />
            </g>
          ))}

          {/* Sterncastle (raised aft platform) */}
          <path
            d="M 360,238
               L 360,212
               L 416,212
               L 420,238 Z"
            fill="#0a1f38"
            stroke="url(#atl-rim)"
            strokeWidth="1"
            strokeOpacity="0.55"
          />
          {/* sterncastle window */}
          <rect x="372" y="220" width="14" height="12"
            fill="#7df9ff" opacity="0.55"
            style={{ filter: 'drop-shadow(0 0 4px #00d4ff)' }} />
          <rect x="394" y="220" width="14" height="12"
            fill="#7df9ff" opacity="0.55"
            style={{ filter: 'drop-shadow(0 0 4px #00d4ff)' }} />

          {/* Forecastle */}
          <path
            d="M 80,238
               L 80,220
               L 116,220
               L 110,238 Z"
            fill="#0a1f38"
            stroke="url(#atl-rim)"
            strokeWidth="1"
            strokeOpacity="0.55"
          />

          {/* Bowsprit + jib */}
          <path d="M 80,246 L 18,212"
            stroke="#06182e" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 80,246 L 18,212"
            stroke="#7df9ff" strokeOpacity="0.4" strokeWidth="0.8" strokeLinecap="round" />
          {/* small jib sail */}
          <path
            d="M 26,214 L 70,238 L 70,222 Z"
            fill="url(#atl-sail)"
            stroke="#7df9ff"
            strokeOpacity="0.65"
            strokeWidth="0.8"
          />

          {/* ═══════════════════════════════════════════════════ */}
          {/* MASTS + SAILS                                       */}
          {/* ═══════════════════════════════════════════════════ */}

          {/* ── Foremast ── */}
          <line x1="148" y1="238" x2="148" y2="64"
            stroke="#06182e" strokeWidth="3.6" strokeLinecap="round" />
          <line x1="148" y1="238" x2="148" y2="64"
            stroke="#00d4ff" strokeOpacity="0.18" strokeWidth="0.7" strokeLinecap="round" />
          {/* yard */}
          <line x1="124" y1="80" x2="172" y2="80"
            stroke="#06182e" strokeWidth="2" />
          {/* foresail */}
          <path
            d="M 110,84
               C 120,114  140,144  148,166
               C 156,144  176,114  186,84
               C 174,80  162,80  148,80
               C 134,80  122,80  110,84 Z"
            fill="url(#atl-sail)"
            stroke="#7df9ff"
            strokeOpacity="0.65"
            strokeWidth="1"
          />
          {/* canvas seams */}
          <path d="M 148,84 L 148,164"
            stroke="#7df9ff" strokeOpacity="0.30" strokeWidth="0.6" />
          <path d="M 128,86 C 134,118 142,148 148,164"
            stroke="#7df9ff" strokeOpacity="0.22" strokeWidth="0.5" />
          <path d="M 168,86 C 162,118 154,148 148,164"
            stroke="#7df9ff" strokeOpacity="0.22" strokeWidth="0.5" />
          {/* sail glow rim */}
          <path
            d="M 110,84
               C 120,114  140,144  148,166
               C 156,144  176,114  186,84"
            fill="none" stroke="#7df9ff" strokeOpacity="0.55" strokeWidth="0.7"
          />

          {/* ── Mainmast ── */}
          <line x1="250" y1="238" x2="250" y2="22"
            stroke="#06182e" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="250" y1="238" x2="250" y2="22"
            stroke="#00d4ff" strokeOpacity="0.20" strokeWidth="0.8" strokeLinecap="round" />
          {/* main yard */}
          <line x1="222" y1="46" x2="278" y2="46"
            stroke="#06182e" strokeWidth="2.4" />
          {/* mainsail (large) */}
          <path
            d="M 196,50
               C 206,94  234,148  250,178
               C 266,148  294,94  304,50
               C 286,46  268,46  250,46
               C 232,46  214,46  196,50 Z"
            fill="url(#atl-sail)"
            stroke="#7df9ff"
            strokeOpacity="0.7"
            strokeWidth="1.1"
          />
          {/* canvas seams */}
          <path d="M 250,50 L 250,176"
            stroke="#7df9ff" strokeOpacity="0.32" strokeWidth="0.65" />
          <path d="M 222,54 C 230,102 244,156 250,176"
            stroke="#7df9ff" strokeOpacity="0.22" strokeWidth="0.55" />
          <path d="M 278,54 C 270,102 256,156 250,176"
            stroke="#7df9ff" strokeOpacity="0.22" strokeWidth="0.55" />
          {/* sail glow rim */}
          <path
            d="M 196,50
               C 206,94  234,148  250,178
               C 266,148  294,94  304,50"
            fill="none" stroke="#7df9ff" strokeOpacity="0.65" strokeWidth="0.8"
          />
          {/* small Atlantean sigil on mainsail */}
          <g transform="translate(250, 110)" opacity="0.6">
            <circle r="14" stroke="#7df9ff" strokeWidth="0.6" fill="none" />
            <circle r="9"  stroke="#7df9ff" strokeWidth="0.5" fill="none" />
            <circle r="4"  fill="#7df9ff" opacity="0.65" />
            <line x1="0" y1="-14" x2="0" y2="14"
              stroke="#7df9ff" strokeWidth="0.5" />
            <line x1="-14" y1="0" x2="14" y2="0"
              stroke="#7df9ff" strokeWidth="0.5" />
          </g>

          {/* crow's nest */}
          <path d="M 240,42 L 260,42 L 258,32 L 242,32 Z"
            fill="#06182e" stroke="#7df9ff" strokeOpacity="0.55" strokeWidth="0.9" />
          {/* lantern orb at the masthead (replaces flag) */}
          <circle cx="250" cy="20" r="8" fill="url(#atl-lantern)"
            style={{ filter: 'drop-shadow(0 0 12px #00d4ff)' }}
          />
          <circle cx="250" cy="20" r="3" fill="#fff" opacity="0.95" />

          {/* ── Mizzenmast (lateen, magenta-tinted sail) ── */}
          <line x1="346" y1="238" x2="346" y2="86"
            stroke="#06182e" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="346" y1="238" x2="346" y2="86"
            stroke="#b14eff" strokeOpacity="0.15" strokeWidth="0.6" strokeLinecap="round" />
          {/* lateen yard */}
          <line x1="324" y1="170" x2="396" y2="98"
            stroke="#06182e" strokeWidth="2.2" />
          {/* triangular lateen sail */}
          <path
            d="M 346,176
               L 392,102
               L 346,128 Z"
            fill="url(#atl-sail-mag)"
            stroke="#d6a8ff"
            strokeOpacity="0.55"
            strokeWidth="0.9"
          />
          <path
            d="M 346,128 L 390,104"
            stroke="#d6a8ff" strokeOpacity="0.35" strokeWidth="0.5" />
          <path
            d="M 346,148 L 374,124"
            stroke="#d6a8ff" strokeOpacity="0.35" strokeWidth="0.5" />

          {/* ═══════════════════════════════════════════════════ */}
          {/* RIGGING                                             */}
          {/* ═══════════════════════════════════════════════════ */}
          <g stroke="#7df9ff" strokeWidth="0.5" opacity="0.32" fill="none">
            {/* foremast stays */}
            <line x1="148" y1="64"  x2="20"  y2="214" />
            <line x1="148" y1="76"  x2="48"  y2="220" />
            <line x1="148" y1="64"  x2="108" y2="238" />
            <line x1="148" y1="64"  x2="188" y2="238" />
            {/* mainmast forward stays */}
            <line x1="250" y1="22"  x2="148" y2="64" />
            <line x1="250" y1="46"  x2="190" y2="238" />
            <line x1="250" y1="46"  x2="312" y2="238" />
            {/* mainmast aft stays */}
            <line x1="250" y1="22"  x2="346" y2="86" />
            {/* mizzenmast stays */}
            <line x1="346" y1="86"  x2="304" y2="238" />
            <line x1="346" y1="86"  x2="396" y2="238" />
          </g>

          {/* ═══════════════════════════════════════════════════ */}
          {/* DECK LANTERNS                                        */}
          {/* ═══════════════════════════════════════════════════ */}
          <circle cx="92" cy="226" r="2.5" fill="#fff"
            style={{ filter: 'drop-shadow(0 0 6px #00d4ff)' }} />
          <circle cx="408" cy="226" r="2.5" fill="#fff"
            style={{ filter: 'drop-shadow(0 0 6px #00d4ff)' }} />

          {/* ═══════════════════════════════════════════════════ */}
          {/* WAKE — short streaks under the hull                 */}
          {/* ═══════════════════════════════════════════════════ */}
          <g stroke="#7df9ff" strokeOpacity="0.35" strokeWidth="0.9" fill="none">
            <path d="M 78,338 Q 110,348 158,344" />
            <path d="M 102,346 Q 160,358 232,352" opacity="0.65" />
            <path d="M 240,346 Q 320,358 392,346" opacity="0.7" />
            <path d="M 330,338 Q 380,348 422,338" opacity="0.5" />
          </g>
        </svg>
      </motion.div>

      {/* Soft cyan reflection glow under the hull */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          top: '78%',
          width:  '460px',
          height: '90px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.40), rgba(125,249,255,0.18) 35%, transparent 70%)',
          filter: 'blur(8px)',
          opacity: 0.55,
          transform: 'translate(-50%, 0) scaleY(-0.6)',
        }}
      />
    </motion.div>
  );
}
