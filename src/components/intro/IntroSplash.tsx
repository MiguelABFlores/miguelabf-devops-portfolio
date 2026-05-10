'use client';

import { motion } from 'framer-motion';
import Submarine from './Submarine';
import HelmButton from './HelmButton';
import { SkyLife, AbyssLife } from './SplashLife';
import ToolLogos from './ToolLogos';

/* ───────────────────────────────────────────────────────────────
   IntroSplash - full-screen overlay shown before the portfolio.

   Scene composition (back → front):
   1. Sky+sea continuous gradient (no hard horizon line)
   2. Star field with twinkle
   3. Aurora swirls drifting in the upper sky
   4. Realistic textured moon (no glow halo, just soft atmospheric bloom)
   5. SVG-based volumetric god-ray wedges from the moon (replaces
      the old repeating-linear-gradient that caused right-side banding)
   6. Distant Atlantean spires silhouette
   7. Soft horizon mist band with two animated fog layers (the
      "smooth gradient haze" the user picked)
   8. Wave layers tucked under the mist so there's no hard sea/sky line
   9. Bioluminescent spores drifting upward
   10. Submarine + welcome copy + helm CTA

   `data-intro-splash` is read by globals.css to hide this element
   via display:none on repeat-visit (set in layout's inline script).
   ─────────────────────────────────────────────────────────────── */
type Props = {
  onEnter: () => void;
};

export default function IntroSplash({ onEnter }: Props) {
  return (
    <motion.div
      key="intro-splash"
      data-intro-splash
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        y: '-110vh',
        scale: 1.4,
        opacity: 0,
        transition: { duration: 1.6, ease: [0.5, 0, 0.75, 0] },
      }}
      className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden splash-scroll"
      aria-label="Welcome to the portfolio"
      role="dialog"
      style={{
        /* One continuous gradient with a wide blend zone around 60-72%
           so sky and sea fade through each other (no hard horizon). */
        background: `
          radial-gradient(ellipse at 76% 22%, rgba(28,80,128,0.45), transparent 55%),
          linear-gradient(180deg,
            #050818 0%,
            #08152e 18%,
            #0c2244 38%,
            #0d2a48 56%,
            #0a2640 70%,
            #061a30 85%,
            #020a18 100%)
        `,
      }}
    >
      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 1 - Star field                                     */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 64 }).map((_, i) => {
          const left = (i * 73) % 100;
          const top  = (i * 41) % 50;
          const size = 0.8 + (i % 4) * 0.6;
          const delay = (i % 7) * 0.5;
          const dur   = 3 + (i % 5);
          return (
            <div key={i}
              className="absolute rounded-full bg-glow-ice"
              style={{
                left:    `${left}%`,
                top:     `${top}%`,
                width:   `${size}px`,
                height:  `${size}px`,
                opacity: 0.25 + (i % 4) * 0.18,
                boxShadow: '0 0 4px rgba(125,249,255,0.6)',
                animation: `lurePulse ${dur}s ease-in-out ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 2 - Aurora swirls (toned down so the right side    */}
      {/* doesn't look "glitchy" anymore)                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 top-0 h-[55%] pointer-events-none mix-blend-screen"
        aria-hidden
      >
        <div
          className="absolute"
          style={{
            top: '8%', left: '-10%', width: '70%', height: '34%',
            background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.18), rgba(125,249,255,0.06) 35%, transparent 70%)',
            filter: 'blur(48px)',
            animation: 'auroraDrift 22s ease-in-out infinite',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '14%', left: '36%', width: '60%', height: '28%',
            background: 'radial-gradient(ellipse at center, rgba(177,78,255,0.14), rgba(177,78,255,0.04) 40%, transparent 70%)',
            filter: 'blur(54px)',
            animation: 'auroraDrift 28s ease-in-out -10s infinite reverse',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 3 - Realistic textured moon                        */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="absolute pointer-events-none" aria-hidden
        style={{ left: '78%', top: '15%' }}>
        {/* very subtle atmospheric bloom (small, low-opacity - not   */}
        {/* the dramatic halo of before)                              */}
        <div
          style={{
            width: '180px', height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(220,240,255,0.18), rgba(180,220,250,0.06) 35%, transparent 70%)',
            filter: 'blur(14px)',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <RealisticMoon />
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 4 - Volumetric god-rays (SVG-based, no banding)    */}
      {/* ═══════════════════════════════════════════════════════ */}
      <SvgGodRays />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 4.5 - Sky life: bird flocks + shooting stars      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <SkyLife />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 5 - Distant Atlantean spires (horizon silhouette) */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        aria-hidden
        style={{ top: '54%', height: '14%' }}
      >
        <svg
          viewBox="0 0 1440 200" preserveAspectRatio="none"
          width="100%" height="100%"
          style={{ display: 'block', opacity: 0.45, filter: 'blur(0.8px)' }}
        >
          <defs>
            <linearGradient id="spireGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0a1f38" stopOpacity="0.0" />
              <stop offset="40%"  stopColor="#0a1f38" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#040a18" stopOpacity="1.0" />
            </linearGradient>
          </defs>
          <path
            d="M0,200 L0,150
               L60,150  L80,120 L100,150
               L150,150 L165,108 L180,150
               L240,150 L260,90 L268,72 L276,90 L296,150
               L360,150 L380,128 L420,128 L420,108 L460,108 L460,128 L500,128 L520,150
               L600,150 L612,120 L624,90 L640,76 L656,90 L668,120 L680,150
               L760,150 L780,118 L820,118 L840,150
               L900,150 L920,124 L944,124 L944,98 L968,98 L968,124 L992,124 L1010,150
               L1080,150 L1100,108 L1120,82 L1140,108 L1160,150
               L1240,150 L1260,128 L1300,128 L1320,150
               L1380,150 L1400,118 L1420,150 L1440,150 L1440,200 Z"
            fill="url(#spireGrad)"
          />
          {[
            [80, 124, 0.85], [165, 114, 0.95], [268, 78, 1], [400, 116, 0.8],
            [440, 114, 0.7], [620, 96, 1], [640, 80, 1], [660, 96, 0.9],
            [800, 122, 0.85], [932, 110, 0.85], [956, 100, 0.95],
            [1110, 90, 0.9], [1280, 132, 0.8], [1410, 124, 0.85],
          ].map(([x, y, op], i) => (
            <circle key={i} cx={x as number} cy={y as number} r="1.6"
              fill="#7df9ff" opacity={op as number}
              style={{ filter: 'drop-shadow(0 0 4px #00d4ff)' }}
            />
          ))}
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 6 - SOFT HORIZON HAZE BAND (the smooth blend)     */}
      {/* Three stacked soft fog layers crossing the horizon.     */}
      {/* This is what hides the hard sea/sky line.               */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        aria-hidden
        style={{
          top: '52%', height: '22%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(140,200,225,0.08) 30%, rgba(180,225,240,0.18) 55%, rgba(140,200,225,0.10) 80%, transparent 100%)',
          filter: 'blur(14px)',
        }}
      />
      <div
        className="absolute inset-x-0 pointer-events-none"
        aria-hidden
        style={{
          top: '58%', height: '14%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(125,249,255,0.10) 50%, transparent 100%)',
          filter: 'blur(20px)',
          animation: 'mistDrift 26s ease-in-out infinite',
        }}
      />
      <div
        className="absolute inset-x-0 pointer-events-none"
        aria-hidden
        style={{
          top: '60%', height: '10%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(190,225,240,0.14) 50%, transparent 100%)',
          filter: 'blur(28px)',
          animation: 'mistDrift 18s ease-in-out -8s infinite reverse',
        }}
      />
      {/* sub-mist drifting fog tendrils for organic motion */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        aria-hidden
        style={{
          top: '63%', height: '8%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(160,210,230,0.12) 50%, transparent 100%)',
          filter: 'blur(24px)',
          animation: 'mistDrift 14s ease-in-out -4s infinite',
        }}
      />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 7 - Wave layers (tucked further down so the       */}
      {/* horizon mist hides their tops; no hard sea/sky line).   */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div
        aria-hidden
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: '68%', height: '32%' }}
      >
        {/* far wave (deeply blurred, very low contrast) */}
        <svg
          viewBox="0 0 1440 140" preserveAspectRatio="none"
          width="100%" height="80"
          style={{
            position: 'absolute', top: 0, left: 0,
            animation: 'waveDrift 20s ease-in-out infinite',
            opacity: 0.4,
            filter: 'blur(2px)',
          }}
        >
          <path
            d="M0,70 C160,100 320,40 520,68 C720,96 880,38 1080,68 C1280,98 1400,42 1440,70 L1440,140 L0,140 Z"
            fill="#0a3050"
          />
        </svg>
        <svg
          viewBox="0 0 1440 140" preserveAspectRatio="none"
          width="100%" height="100"
          style={{
            position: 'absolute', top: 14, left: 0,
            animation: 'waveDrift 14s ease-in-out -4s infinite reverse',
            opacity: 0.78,
          }}
        >
          <path
            d="M0,70 C200,32 400,108 600,70 C800,32 1000,108 1200,70 C1340,46 1410,90 1440,70 L1440,140 L0,140 Z"
            fill="#0a2848"
          />
          <path
            d="M0,70 C200,32 400,108 600,70 C800,32 1000,108 1200,70 C1340,46 1410,90 1440,70"
            stroke="#7df9ff" strokeOpacity="0.18" strokeWidth="0.8" fill="none"
          />
        </svg>
        <svg
          viewBox="0 0 1440 140" preserveAspectRatio="none"
          width="100%" height="120"
          style={{
            position: 'absolute', top: 36, left: 0,
            animation: 'waveDrift 9s ease-in-out -1s infinite',
          }}
        >
          <path
            d="M0,60 C200,108 400,18 600,60 C800,102 1000,16 1200,60 C1340,86 1410,42 1440,60 L1440,140 L0,140 Z"
            fill="#08203c"
          />
          <path
            d="M0,60 C200,108 400,18 600,60 C800,102 1000,16 1200,60 C1340,86 1410,42 1440,60"
            stroke="#7df9ff" strokeOpacity="0.32" strokeWidth="1.1" fill="none"
          />
        </svg>
        <svg
          viewBox="0 0 1440 140" preserveAspectRatio="none"
          width="100%" height="140"
          style={{
            position: 'absolute', top: 78, left: 0,
            animation: 'waveDrift 6s ease-in-out -2s infinite reverse',
          }}
        >
          <path
            d="M0,40 C160,90 320,4 520,46 C720,88 880,2 1080,46 C1260,84 1380,18 1440,40 L1440,140 L0,140 Z"
            fill="#020e1a"
          />
          <path
            d="M0,40 C160,90 320,4 520,46 C720,88 880,2 1080,46 C1260,84 1380,18 1440,40"
            stroke="#7df9ff" strokeOpacity="0.55" strokeWidth="1.4" fill="none"
          />
          {[80, 240, 410, 590, 770, 950, 1140, 1320].map((x, i) => (
            <circle key={i} cx={x} cy={i % 2 ? 18 : 70} r="1.4"
              fill="#fff" opacity="0.7"
              style={{ filter: 'drop-shadow(0 0 4px #7df9ff)' }}
            />
          ))}
        </svg>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ABYSS FILL - eliminates the hard horizontal line where  */}
        {/* the foreground wave SVG used to end.                    */}
        {/*                                                         */}
        {/* Two-part construction prevents banding:                 */}
        {/*  1. A 6px overlap (top: 212 vs wave-end at 218) hides   */}
        {/*     any sub-pixel anti-aliasing edge from the SVG.      */}
        {/*  2. A simple two-stop gradient (no intermediate stops)  */}
        {/*     produces a single smooth interpolation, which       */}
        {/*     monitors render without visible step-banding.       */}
        {/*  3. A faint SVG-noise dither overlay scatters any       */}
        {/*     remaining 8-bit-color banding into uniform grain.   */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-x-0 pointer-events-none"
          style={{
            top: 212,           // 6px overlap with wave 4 bottom
            bottom: 0,
            background: 'linear-gradient(180deg, #020e1a 0%, #00040a 100%)',
          }}
        />
        {/* Anti-banding dither - a tiny inline SVG noise pattern */}
        <div
          className="absolute inset-x-0 pointer-events-none mix-blend-overlay opacity-40"
          style={{
            top: 212,
            bottom: 0,
            backgroundImage:
              `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.10 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
            backgroundSize: '240px 240px',
          }}
        />
        {/* Subtle deep-light shimmer drifting in the abyss for life.
            Top is aligned with the abyss fill (212) so there's no
            secondary edge introduced. The radial gradients fade to
            transparent well before reaching the top, so the
            mix-blend-screen produces no visible boundary. */}
        <div
          className="absolute inset-x-0 pointer-events-none mix-blend-screen"
          style={{
            top: 212,
            bottom: 0,
            background: `
              radial-gradient(ellipse at 28% 65%, rgba(125,249,255,0.06), transparent 55%),
              radial-gradient(ellipse at 72% 80%, rgba(125,249,255,0.04), transparent 60%)
            `,
            animation: 'mistDrift 22s ease-in-out infinite',
          }}
        />

        {/* Abyss life: distant whale + fish schools, swimming
            below the wave foam in the deep. */}
        <AbyssLife />
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 8 - Bioluminescent spores                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => {
          const left   = (i * 89) % 100;
          const size   = 2 + (i % 5);
          const dur    = 14 + (i % 6) * 3;
          const delay  = -((i * 1.7) % dur);
          const isMagenta = i % 4 === 0;
          return (
            <div key={i}
              className="absolute rounded-full"
              style={{
                left:    `${left}%`,
                bottom:  '-20px',
                width:   `${size}px`,
                height:  `${size}px`,
                background: isMagenta
                  ? 'radial-gradient(circle, rgba(220,160,255,0.95), rgba(177,78,255,0.4) 50%, transparent 90%)'
                  : 'radial-gradient(circle, rgba(220,250,255,0.95), rgba(125,249,255,0.4) 50%, transparent 90%)',
                boxShadow: isMagenta
                  ? '0 0 8px rgba(177,78,255,0.7)'
                  : '0 0 8px rgba(125,249,255,0.7)',
                animation: `splashSpore ${dur}s linear ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* CONTENT - Eyebrow + Submarine + copy + helm              */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen
                      px-6 py-6 md:py-10 text-center">

        {/* ── Eyebrow (no emoji, larger text + lines) ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-sm md:text-base tracking-[0.55em] uppercase
                     text-glow-cyan mb-8 flex items-center gap-5"
          style={{ textShadow: '0 0 14px rgba(0,212,255,0.55)' }}
        >
          {/* left line - bigger and more visible than before */}
          <span
            aria-hidden
            className="block"
            style={{
              width: '88px',
              height: '2px',
              background: 'linear-gradient(to right, transparent, rgba(125,249,255,0.95))',
              boxShadow: '0 0 8px rgba(0,212,255,0.6)',
            }}
          />
          <span>Surface · Departure</span>
          <span
            aria-hidden
            className="block"
            style={{
              width: '88px',
              height: '2px',
              background: 'linear-gradient(to left, transparent, rgba(125,249,255,0.95))',
              boxShadow: '0 0 8px rgba(0,212,255,0.6)',
            }}
          />
        </motion.div>

        {/* ── Submarine ── */}
        <Submarine />

        {/* ── Welcome copy (no em-dashes anywhere) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: 'easeOut' }}
          className="max-w-2xl mt-6 md:mt-2"
        >
          <h1 className="font-display text-2xl md:text-4xl text-white glow-text-soft leading-tight">
            You&apos;re about to enter a portfolio
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-glow-cyan via-glow-ice to-glow-atlantis
                             bg-clip-text text-transparent"
                  style={{ WebkitTextFillColor: 'transparent' }}>
              hosted on infrastructure I built myself.
            </span>
          </h1>

          <p className="mt-5 md:mt-6 text-sm md:text-base text-white/85 leading-relaxed max-w-xl mx-auto">
            You&apos;re looking at a website that runs on my own
            {' '}<span className="text-glow-ice">group of computers at home</span>.
            They <span className="text-glow-ice">work like a team</span>: if one stops
            working, another takes over right away, so
            {' '}<span className="text-glow-ice">the site never goes offline</span>.
            {' '}<span className="text-glow-ice">Updates ship by themselves</span>, and the
            system keeps an eye on itself to catch problems before they happen. Reliable,
            safe, and built to grow.
          </p>
        </motion.div>

        {/* ── Tool logos row (Built With) ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
        >
          <ToolLogos />
        </motion.div>

        {/* ── Helm CTA ── */}
        <div className="mt-8 md:mt-10">
          <HelmButton onClick={onEnter} label="Take the Helm" />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mt-6 text-[10px] md:text-xs tracking-[0.3em] uppercase
                     font-display text-white/55"
        >
          Dive in to view the portfolio
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RealisticMoon - textured sphere with maria, terminator shadow,
   subtle craters. No oversized halo, just a clean light source.
   ═══════════════════════════════════════════════════════════════ */
function RealisticMoon() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        display: 'block',
      }}
      aria-hidden
    >
      <defs>
        {/* Base lunar surface - bluish-grey with subtle warmth */}
        <radialGradient id="moon-base" cx="0.42" cy="0.38" r="0.62">
          <stop offset="0%"   stopColor="#f4f8fc" />
          <stop offset="55%"  stopColor="#cdd6dc" />
          <stop offset="100%" stopColor="#7d8b94" />
        </radialGradient>
        {/* Terminator (shadow on the dark side) */}
        <radialGradient id="moon-terminator" cx="0.95" cy="0.55" r="0.85">
          <stop offset="35%" stopColor="#000" stopOpacity="0" />
          <stop offset="80%" stopColor="#020a14" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#020a14" stopOpacity="0.85" />
        </radialGradient>
        {/* Soft inner sheen */}
        <radialGradient id="moon-sheen" cx="0.32" cy="0.28" r="0.4">
          <stop offset="0%"   stopColor="#fff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        {/* Clip to a circle so maria don't bleed past the moon */}
        <clipPath id="moon-clip">
          <circle cx="60" cy="60" r="42" />
        </clipPath>
      </defs>

      {/* Body */}
      <circle cx="60" cy="60" r="42" fill="url(#moon-base)" />

      {/* Maria (dark patches - recognizable lunar pattern) */}
      <g clipPath="url(#moon-clip)" opacity="0.55">
        {/* Mare Imbrium-ish (upper left) */}
        <ellipse cx="46" cy="44" rx="14" ry="10" fill="#5a6770" />
        {/* Mare Serenitatis (upper center-right) */}
        <ellipse cx="68" cy="46" rx="9" ry="7" fill="#5a6770" opacity="0.85" />
        {/* Mare Tranquillitatis (mid-right) */}
        <ellipse cx="74" cy="58" rx="8" ry="6" fill="#5a6770" opacity="0.9" />
        {/* Mare Nubium (lower-mid) */}
        <ellipse cx="56" cy="72" rx="11" ry="6" fill="#5a6770" opacity="0.8" />
        {/* Mare Humorum (lower-left) */}
        <ellipse cx="44" cy="74" rx="6" ry="5" fill="#5a6770" opacity="0.75" />
        {/* small Mare Crisium (right edge) */}
        <ellipse cx="80" cy="52" rx="4" ry="3.5" fill="#5a6770" opacity="0.85" />
      </g>

      {/* Subtle crater dots */}
      <g clipPath="url(#moon-clip)" opacity="0.5">
        {[
          [54, 38, 1.4], [62, 56, 1], [72, 68, 0.9], [44, 60, 1.1],
          [50, 52, 0.7], [66, 36, 0.8], [78, 60, 0.9], [40, 48, 0.7],
          [58, 64, 0.6], [70, 50, 0.7], [52, 80, 1.0], [46, 68, 0.8],
        ].map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill="#3d474e" />
            <circle cx={(x as number) - 0.4} cy={(y as number) - 0.4} r={(r as number) * 0.45}
              fill="#fff" opacity="0.3" />
          </g>
        ))}
      </g>

      {/* Sheen highlight on upper-left */}
      <circle cx="60" cy="60" r="42" fill="url(#moon-sheen)" />

      {/* Terminator shadow on the dark side (right) */}
      <circle cx="60" cy="60" r="42" fill="url(#moon-terminator)" />

      {/* Crisp outer rim */}
      <circle cx="60" cy="60" r="42" fill="none"
        stroke="rgba(220,235,250,0.35)" strokeWidth="0.6" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SvgGodRays - three soft wedges emanating from below the moon.
   Replaces the previous repeating-linear-gradient that produced
   visible bands on the right half of the screen. Heavily blurred
   and screen-blended for a clean volumetric-light feel.
   ═══════════════════════════════════════════════════════════════ */
function SvgGodRays() {
  return (
    <svg
      className="absolute pointer-events-none mix-blend-screen"
      style={{
        right: '0',
        top: '8%',
        width: '60%',
        height: '70%',
        opacity: 0.6,
        filter: 'blur(18px)',
      }}
      viewBox="0 0 600 600"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="rayA" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%"   stopColor="#7df9ff" stopOpacity="0.0" />
          <stop offset="20%"  stopColor="#7df9ff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rayB" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%"   stopColor="#7df9ff" stopOpacity="0.0" />
          <stop offset="25%"  stopColor="#7df9ff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rayC" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%"   stopColor="#7df9ff" stopOpacity="0.0" />
          <stop offset="22%"  stopColor="#7df9ff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* widest, leftmost wedge */}
      <path d="M 380,40 L 100,600 L 320,600 Z" fill="url(#rayA)" />
      {/* middle wedge */}
      <path d="M 400,50 L 240,600 L 460,600 Z" fill="url(#rayB)" />
      {/* narrowest, rightmost wedge */}
      <path d="M 420,60 L 420,600 L 580,600 Z" fill="url(#rayC)" />
    </svg>
  );
}
