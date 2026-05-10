'use client';

import { motion } from 'framer-motion';
import Caravel from './Caravel';
import HelmButton from './HelmButton';

/* ───────────────────────────────────────────────────────────────
   IntroSplash — full-screen overlay shown before the portfolio.

   Scene composition (back → front):
   1. Deep indigo→teal sky gradient
   2. Star field (slow twinkle)
   3. Aurora swirls (cyan + magenta) drifting across upper sky
   4. Distant moon with corona halo
   5. Volumetric god-rays angled from the moon
   6. Distant Atlantean spires emerging from horizon mist
   7. Mist band at horizon (parallax drift)
   8. Animated multi-layer waves with foam highlights
   9. Floating bioluminescent spores drifting upward
   10. Caravel + welcome copy + helm CTA

   `data-intro-splash` is read by globals.css to suppress this
   element via display:none on repeat-visit (set in layout's
   inline script).
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
        /* DIVE — overlay shoots upward + zooms slightly while fading */
        y: '-110vh',
        scale: 1.4,
        opacity: 0,
        transition: { duration: 1.6, ease: [0.5, 0, 0.75, 0] },
      }}
      className="fixed inset-0 z-[100] overflow-hidden"
      aria-label="Welcome to the portfolio"
      role="dialog"
      style={{
        background: `
          radial-gradient(ellipse at 72% 18%, rgba(28,80,128,0.55), transparent 55%),
          linear-gradient(180deg,
            #050818 0%,
            #08152e 22%,
            #0d2748 44%,
            #0a3050 60%,
            #051a2d 78%,
            #020a18 100%)
        `,
      }}
    >
      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 1 — Star field                                     */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 56 }).map((_, i) => {
          const left = (i * 73) % 100;
          const top  = (i * 41) % 50; // upper half only
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
      {/* LAYER 2 — Aurora swirls (upper sky)                     */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 top-0 h-[55%] pointer-events-none mix-blend-screen"
        aria-hidden
      >
        <div
          className="absolute"
          style={{
            top: '8%', left: '-10%', width: '70%', height: '34%',
            background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.25), rgba(125,249,255,0.10) 35%, transparent 70%)',
            filter: 'blur(28px)',
            animation: 'auroraDrift 18s ease-in-out infinite',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '14%', left: '36%', width: '60%', height: '28%',
            background: 'radial-gradient(ellipse at center, rgba(177,78,255,0.22), rgba(177,78,255,0.06) 40%, transparent 70%)',
            filter: 'blur(32px)',
            animation: 'auroraDrift 24s ease-in-out -8s infinite reverse',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '4%', left: '55%', width: '50%', height: '22%',
            background: 'radial-gradient(ellipse at center, rgba(125,249,255,0.18), transparent 65%)',
            filter: 'blur(22px)',
            animation: 'auroraDrift 14s ease-in-out -3s infinite',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 3 — Distant moon with corona                      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="absolute pointer-events-none" aria-hidden
        style={{ left: '74%', top: '13%' }}>
        {/* outer corona */}
        <div
          style={{
            width: '380px', height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(125,249,255,0.20), rgba(0,212,255,0.08) 35%, transparent 70%)',
            filter: 'blur(12px)',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {/* mid halo */}
        <div
          style={{
            width: '180px', height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(225,245,255,0.55), rgba(125,249,255,0.20) 45%, transparent 75%)',
            filter: 'blur(4px)',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {/* moon body */}
        <div
          style={{
            width: '88px', height: '88px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 36%, #f6fdff 0%, #d4eff7 40%, #88c0d4 80%, #4a7d92 100%)',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 60px rgba(125,249,255,0.45), inset -8px -10px 22px rgba(20,40,60,0.55)',
          }}
        />
        {/* moon craters */}
        {[
          [-18, -6, 8], [4, 12, 5], [12, -16, 4], [-8, 18, 6], [20, 0, 3],
        ].map(([dx, dy, r], i) => (
          <div key={i}
            style={{
              position: 'absolute',
              left: `${dx}px`, top: `${dy}px`,
              width: `${r}px`, height: `${r}px`,
              borderRadius: '50%',
              background: 'rgba(40,75,95,0.35)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 4 — Volumetric god-rays from the moon             */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div
        className="absolute pointer-events-none mix-blend-screen"
        aria-hidden
        style={{
          left: '60%', top: '8%', width: '50%', height: '60%',
          background: `
            repeating-linear-gradient(
              196deg,
              transparent 0px, transparent 90px,
              rgba(125,249,255,0.05) 120px, rgba(125,249,255,0.10) 138px,
              transparent 168px, transparent 256px
            )`,
          filter: 'blur(2px)',
          opacity: 0.7,
        }}
      />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 5 — Distant Atlantean spires (horizon silhouette) */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        aria-hidden
        style={{ top: '50%', height: '18%' }}
      >
        <svg
          viewBox="0 0 1440 200" preserveAspectRatio="none"
          width="100%" height="100%"
          style={{ display: 'block', opacity: 0.55, filter: 'blur(0.6px)' }}
        >
          <defs>
            <linearGradient id="spireGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0a1f38" stopOpacity="0.0" />
              <stop offset="40%"  stopColor="#0a1f38" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#040a18" stopOpacity="1.0" />
            </linearGradient>
          </defs>
          {/* Far Atlantean cityline — domes, spires, towers */}
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
          {/* tiny pinpoint lights on the spires (cyan glow) */}
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
      {/* LAYER 6 — Horizon mist band (parallax drift)            */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        aria-hidden
        style={{
          top: '57%', height: '12%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(180,220,235,0.18) 35%, rgba(140,200,225,0.30) 60%, transparent 100%)',
          filter: 'blur(8px)',
          animation: 'mistDrift 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute inset-x-0 pointer-events-none"
        aria-hidden
        style={{
          top: '60%', height: '10%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(125,249,255,0.18) 50%, transparent 100%)',
          filter: 'blur(14px)',
          animation: 'mistDrift 14s ease-in-out -6s infinite reverse',
        }}
      />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 7 — Multi-layer animated waves                    */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div
        aria-hidden
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: '64%', height: '36%' }}
      >
        {/* far wave layer */}
        <svg
          viewBox="0 0 1440 140" preserveAspectRatio="none"
          width="100%" height="80"
          style={{
            position: 'absolute', top: 0, left: 0,
            animation: 'waveDrift 18s ease-in-out infinite',
            opacity: 0.55,
          }}
        >
          <path
            d="M0,70 C160,100 320,40 520,68 C720,96 880,38 1080,68 C1280,98 1400,42 1440,70 L1440,140 L0,140 Z"
            fill="#0a3050"
          />
        </svg>
        {/* mid-far wave */}
        <svg
          viewBox="0 0 1440 140" preserveAspectRatio="none"
          width="100%" height="100"
          style={{
            position: 'absolute', top: 14, left: 0,
            animation: 'waveDrift 13s ease-in-out -4s infinite reverse',
            opacity: 0.85,
          }}
        >
          <path
            d="M0,70 C200,32 400,108 600,70 C800,32 1000,108 1200,70 C1340,46 1410,90 1440,70 L1440,140 L0,140 Z"
            fill="#0a2848"
          />
          {/* foam highlight on this layer */}
          <path
            d="M0,70 C200,32 400,108 600,70 C800,32 1000,108 1200,70 C1340,46 1410,90 1440,70"
            stroke="#7df9ff" strokeOpacity="0.18" strokeWidth="0.8" fill="none"
          />
        </svg>
        {/* mid-near wave */}
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
            stroke="#7df9ff" strokeOpacity="0.34" strokeWidth="1.1" fill="none"
          />
        </svg>
        {/* foreground wave with strong foam crests */}
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
          {/* crest sparkles */}
          {[80, 240, 410, 590, 770, 950, 1140, 1320].map((x, i) => (
            <circle key={i} cx={x} cy={i % 2 ? 18 : 70} r="1.4"
              fill="#fff" opacity="0.7"
              style={{ filter: 'drop-shadow(0 0 4px #7df9ff)' }}
            />
          ))}
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LAYER 8 — Bioluminescent spores drifting upward         */}
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
      {/* CONTENT — Caravel + copy + helm                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen
                      px-6 py-12 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-[10px] md:text-xs tracking-[0.45em] uppercase
                     text-glow-cyan/85 mb-6 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-glow-cyan/70" />
          ⚓  Surface · Departure
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-glow-cyan/70" />
        </motion.div>

        {/* Caravel */}
        <Caravel />

        {/* Welcome copy */}
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
            This page is served by a <span className="text-glow-ice">5-node Kubernetes cluster</span>
            {' '}running in my homelab — provisioned with kubeadm on Proxmox, managed via
            {' '}<span className="text-glow-ice">GitOps with ArgoCD</span>, deployed from a
            {' '}<span className="text-glow-ice">self-hosted Harbor registry</span>, monitored
            {' '}with <span className="text-glow-ice">Prometheus + Grafana</span>, and served
            {' '}through a <span className="text-glow-ice">Cloudflare Tunnel</span> with zero
            open inbound ports.
          </p>
        </motion.div>

        {/* Helm CTA */}
        <div className="mt-10 md:mt-12">
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
