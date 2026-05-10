'use client';

import { motion } from 'framer-motion';

/* ───────────────────────────────────────────────────────────────
   Submarine - Atlantean Nautilus-style vessel.

   Long cigar hull with a raised conning tower, periscope, glowing
   cyan portholes, diving planes (front fins), rudder + propeller
   disk at the rear. Half-submerged: the lower hull dims slightly
   to suggest the waterline. Bioluminescent rune line down the
   spine. Ascends/descends gently to fake buoyancy.
   ─────────────────────────────────────────────────────────────── */
export default function Submarine() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
      className="relative"
      style={{
        filter: `
          drop-shadow(0 0 38px rgba(0,212,255,0.32))
          drop-shadow(0 0 16px rgba(125,249,255,0.22))
          drop-shadow(0 28px 36px rgba(0,20,40,0.55))
        `,
      }}
    >
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-0.6, 0.6, -0.6] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '50% 60%', willChange: 'transform' }}
      >
        <svg
          width="640"
          height="280"
          viewBox="0 0 640 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          preserveAspectRatio="xMidYMid meet"
          style={{
            display: 'block',
            maxWidth: '100%',         // shrink-to-fit on narrow screens
            height: 'auto',           // maintain aspect ratio while shrinking
          }}
        >
          <defs>
            {/* Hull body - abyssal teal with subtle highlight */}
            <linearGradient id="sub-hull" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#1c4a6e" />
              <stop offset="40%"  stopColor="#0e2c4c" />
              <stop offset="70%"  stopColor="#06182e" />
              <stop offset="100%" stopColor="#020a18" />
            </linearGradient>
            {/* Hull top sheen - hint of moonlight on the upper surface */}
            <linearGradient id="sub-sheen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#7df9ff" stopOpacity="0.30" />
              <stop offset="60%" stopColor="#7df9ff" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#7df9ff" stopOpacity="0" />
            </linearGradient>
            {/* Cyan glow rim */}
            <linearGradient id="sub-rim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"  stopColor="#00d4ff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#7df9ff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.4" />
            </linearGradient>
            {/* Porthole glow */}
            <radialGradient id="sub-port" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"  stopColor="#fff"     stopOpacity="1" />
              <stop offset="40%" stopColor="#7df9ff"  stopOpacity="0.95" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
            </radialGradient>
            {/* Conning-tower dome - translucent atlantean glass */}
            <radialGradient id="sub-dome" cx="0.5" cy="0.3" r="0.7">
              <stop offset="0%"  stopColor="#dffaff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#7df9ff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0a3552" stopOpacity="0.20" />
            </radialGradient>
            {/* Propeller disk */}
            <radialGradient id="sub-prop" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"  stopColor="#7df9ff" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#00d4ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0a3552" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ═══════════════════════════════════════════════════ */}
          {/* WAKE / BUBBLE TRAIL behind the propeller             */}
          {/* ═══════════════════════════════════════════════════ */}
          <g style={{ filter: 'drop-shadow(0 0 6px rgba(125,249,255,0.55))' }}>
            <circle cx="588" cy="148" r="3"   fill="#7df9ff" opacity="0.7" />
            <circle cx="608" cy="142" r="2.4" fill="#7df9ff" opacity="0.55" />
            <circle cx="618" cy="156" r="2"   fill="#7df9ff" opacity="0.45" />
            <circle cx="628" cy="148" r="1.6" fill="#7df9ff" opacity="0.35" />
            <circle cx="600" cy="158" r="1.8" fill="#7df9ff" opacity="0.5" />
          </g>

          {/* ═══════════════════════════════════════════════════ */}
          {/* TAIL - rudder + propeller mount                      */}
          {/* ═══════════════════════════════════════════════════ */}
          {/* upper rudder fin */}
          <path
            d="M 540,100
               C 550,82  570,72  590,70
               L 588,98
               C 572,100  556,102  540,104 Z"
            fill="url(#sub-hull)"
            stroke="#7df9ff" strokeOpacity="0.5" strokeWidth="0.9"
          />
          {/* lower rudder fin */}
          <path
            d="M 540,168
               C 552,180  566,188  582,194
               L 580,170
               C 568,168  552,168  540,168 Z"
            fill="url(#sub-hull)"
            stroke="#7df9ff" strokeOpacity="0.5" strokeWidth="0.9"
          />
          {/* tail cone */}
          <path
            d="M 540,108
               C 558,112  574,124  580,136
               C 574,152  558,160  540,164 Z"
            fill="url(#sub-hull)"
            stroke="#7df9ff" strokeOpacity="0.4" strokeWidth="0.8"
          />
          {/* propeller hub + spinning disc */}
          <circle cx="582" cy="136" r="14" fill="url(#sub-prop)"
            style={{ filter: 'drop-shadow(0 0 10px #00d4ff)' }} />
          <circle cx="582" cy="136" r="6" fill="#7df9ff" opacity="0.95" />
          <circle cx="582" cy="136" r="2" fill="#fff" />
          {/* prop spokes (suggested via rotation blur) */}
          {[0, 60, 120].map((deg, i) => (
            <line key={i}
              x1={582 + Math.cos((deg * Math.PI) / 180) * 13}
              y1={136 + Math.sin((deg * Math.PI) / 180) * 13}
              x2={582 - Math.cos((deg * Math.PI) / 180) * 13}
              y2={136 - Math.sin((deg * Math.PI) / 180) * 13}
              stroke="#7df9ff" strokeOpacity="0.35" strokeWidth="0.8"
            />
          ))}

          {/* ═══════════════════════════════════════════════════ */}
          {/* MAIN HULL - long cigar shape                         */}
          {/* ═══════════════════════════════════════════════════ */}
          <path
            d="M 30,138
               C 48,114  100,102  180,100
               C 280,98  400,100  500,108
               C 530,112  548,120  554,138
               C 548,156  530,164  500,168
               C 400,176  280,178  180,176
               C 100,174  48,162  30,138 Z"
            fill="url(#sub-hull)"
            stroke="url(#sub-rim)" strokeWidth="1.6"
          />

          {/* hull top sheen overlay */}
          <path
            d="M 30,138
               C 48,114  100,102  180,100
               C 280,98  400,100  500,108
               C 530,112  548,120  554,138
               C 530,128  470,118  380,114
               C 250,108  120,116  30,138 Z"
            fill="url(#sub-sheen)"
          />

          {/* glowing rim line top */}
          <path
            d="M 30,138 C 48,114 100,102 180,100 C 280,98 400,100 500,108 C 530,112 548,120 554,138"
            fill="none" stroke="#7df9ff" strokeOpacity="0.75" strokeWidth="1.2"
          />
          {/* glowing rim line bottom (fainter - underwater) */}
          <path
            d="M 30,138 C 48,162 100,174 180,176 C 280,178 400,176 500,168 C 530,164 548,156 554,138"
            fill="none" stroke="#7df9ff" strokeOpacity="0.32" strokeWidth="1.2"
          />

          {/* spine rune line */}
          <line x1="64" y1="138" x2="540" y2="138"
            stroke="#7df9ff" strokeOpacity="0.45" strokeWidth="0.9"
            strokeDasharray="4 6" />

          {/* ═══════════════════════════════════════════════════ */}
          {/* BOW - pointed nose + headlight                       */}
          {/* ═══════════════════════════════════════════════════ */}
          <path
            d="M 30,138 L 4,134 L 4,142 Z"
            fill="#02101e"
            stroke="#7df9ff" strokeOpacity="0.85" strokeWidth="1"
          />
          {/* headlight glow */}
          <circle cx="14" cy="138" r="6" fill="url(#sub-port)"
            style={{ filter: 'drop-shadow(0 0 10px #7df9ff)' }} />
          <circle cx="14" cy="138" r="2.2" fill="#fff" />
          {/* beam emanating from headlight */}
          <path
            d="M 8,138 L -28,124 L -28,152 Z"
            fill="#7df9ff" opacity="0.18"
            style={{ filter: 'blur(2px)' }}
          />

          {/* ═══════════════════════════════════════════════════ */}
          {/* DIVING PLANES (front fins)                           */}
          {/* ═══════════════════════════════════════════════════ */}
          <path
            d="M 80,124
               C 60,108  40,100  24,102
               C 28,114  46,124  72,128 Z"
            fill="url(#sub-hull)"
            stroke="#7df9ff" strokeOpacity="0.55" strokeWidth="0.9"
          />
          <path
            d="M 80,152
               C 60,168  40,176  24,174
               C 28,162  46,152  72,148 Z"
            fill="url(#sub-hull)"
            stroke="#7df9ff" strokeOpacity="0.4" strokeWidth="0.9"
          />

          {/* ═══════════════════════════════════════════════════ */}
          {/* PORTHOLES - 7 along the upper hull                   */}
          {/* ═══════════════════════════════════════════════════ */}
          {[120, 170, 220, 270, 320, 370, 420].map((cx, i) => (
            <g key={i}>
              {/* outer ring */}
              <circle cx={cx} cy="132" r="9"
                fill="#02101e"
                stroke="url(#sub-rim)" strokeWidth="1.2" />
              {/* glow */}
              <circle cx={cx} cy="132" r="6" fill="url(#sub-port)" />
              {/* core */}
              <circle cx={cx} cy="132" r="3" fill="#fff" opacity="0.9"
                style={{ filter: 'drop-shadow(0 0 4px #7df9ff)' }} />
              {/* rivets / rune dots */}
              <circle cx={cx - 9} cy="132" r="0.9" fill="#7df9ff" opacity="0.5" />
              <circle cx={cx + 9} cy="132" r="0.9" fill="#7df9ff" opacity="0.5" />
              <circle cx={cx} cy="123" r="0.9" fill="#7df9ff" opacity="0.5" />
              <circle cx={cx} cy="141" r="0.9" fill="#7df9ff" opacity="0.5" />
            </g>
          ))}

          {/* ═══════════════════════════════════════════════════ */}
          {/* CONNING TOWER + dome + periscope                     */}
          {/* ═══════════════════════════════════════════════════ */}
          {/* tower base - raised platform */}
          <path
            d="M 240,100
               L 234,68
               C 238,58  242,52  254,48
               L 312,48
               C 324,52  328,58  332,68
               L 326,100 Z"
            fill="url(#sub-hull)"
            stroke="url(#sub-rim)" strokeWidth="1.4"
          />
          {/* tower window strip */}
          <rect x="244" y="72" width="78" height="14" rx="3"
            fill="#02101e"
            stroke="#7df9ff" strokeOpacity="0.55" strokeWidth="0.8" />
          {/* row of small bridge windows */}
          {[252, 266, 280, 294, 308].map((x, i) => (
            <rect key={i} x={x} y="76" width="6" height="6" rx="1"
              fill="#7df9ff" opacity="0.85"
              style={{ filter: 'drop-shadow(0 0 3px #00d4ff)' }} />
          ))}

          {/* tower runes */}
          {[260, 280, 300].map((cx, i) => (
            <g key={i} transform={`translate(${cx} 96)`}>
              <path d="M -4,0 L 0,-4 L 4,0 L 0,4 Z"
                stroke="#7df9ff" strokeWidth="0.7" fill="none" opacity="0.8" />
              <circle cx="0" cy="0" r="1" fill="#7df9ff" opacity="0.9" />
            </g>
          ))}

          {/* atlantean translucent dome on top */}
          <path
            d="M 254,48 C 258,30 280,22 296,30 C 308,36 312,42 312,48 Z"
            fill="url(#sub-dome)"
            stroke="#7df9ff" strokeOpacity="0.65" strokeWidth="0.9"
          />
          <circle cx="284" cy="34" r="3.5" fill="#fff" opacity="0.85"
            style={{ filter: 'drop-shadow(0 0 4px #7df9ff)' }} />

          {/* periscope rising from the dome */}
          <line x1="296" y1="30" x2="296" y2="6"
            stroke="#06182e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="296" y1="30" x2="296" y2="6"
            stroke="#7df9ff" strokeOpacity="0.45" strokeWidth="0.7" />
          <path d="M 290,6 L 308,6 L 308,12 L 290,12 Z"
            fill="#06182e" stroke="#7df9ff" strokeOpacity="0.55" strokeWidth="0.7" />
          <circle cx="306" cy="9" r="1.2" fill="#7df9ff" />

          {/* radio mast */}
          <line x1="270" y1="48" x2="270" y2="20"
            stroke="#06182e" strokeWidth="1.4" />
          <circle cx="270" cy="20" r="1.5" fill="#7df9ff" opacity="0.8" />

          {/* ═══════════════════════════════════════════════════ */}
          {/* BIOLUMINESCENT BELLY STRIPE                          */}
          {/* ═══════════════════════════════════════════════════ */}
          <path
            d="M 60,158 Q 290,170 540,158"
            fill="none"
            stroke="#7df9ff" strokeOpacity="0.18" strokeWidth="3"
            strokeLinecap="round"
          />
          {/* tiny photophores along the belly */}
          {[80, 140, 200, 260, 320, 380, 440, 500].map((x, i) => (
            <circle key={i} cx={x} cy={160 + (i % 2 ? 1 : -1)} r="1.4"
              fill="#7df9ff" opacity={0.55 + (i % 3) * 0.15}
              style={{ filter: 'drop-shadow(0 0 3px #00d4ff)' }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Soft cyan reflection halo on the water */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          top: '78%',
          width:  '560px',
          height: '110px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.42), rgba(125,249,255,0.18) 35%, transparent 70%)',
          filter: 'blur(10px)',
          opacity: 0.55,
          transform: 'translate(-50%, 0) scaleY(-0.6)',
        }}
      />
    </motion.div>
  );
}
