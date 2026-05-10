'use client';

import { motion } from 'framer-motion';
import Caravel from './Caravel';
import HelmButton from './HelmButton';

/* ───────────────────────────────────────────────────────────────
   IntroSplash — fixed full-screen overlay shown before the
   portfolio is revealed. Sky gradient + waterline + caravel +
   welcome copy + helm CTA. The dive transition is handled by
   the parent via AnimatePresence (`exit` prop).
   ─────────────────────────────────────────────────────────────── */
type Props = {
  onEnter: () => void;
};

export default function IntroSplash({ onEnter }: Props) {
  return (
    <motion.div
      key="intro-splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        /* DIVE — overlay shoots upward + zooms slightly while
           fading, simulating the camera plunging downward. */
        y: '-110vh',
        scale: 1.4,
        opacity: 0,
        transition: { duration: 1.6, ease: [0.5, 0, 0.75, 0] },
      }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] overflow-hidden"
      aria-label="Welcome to the portfolio"
      role="dialog"
      style={{
        /* Sky → waterline gradient. Top is dawn-cyan, middle is the
           sea horizon, bottom hands off to the portfolio's deep blue. */
        background: `
          linear-gradient(180deg,
            #042438 0%,
            #0a3a5c 28%,
            #0d4a72 50%,
            #0a2c48 68%,
            #051a2d 100%)
        `,
      }}
    >
      {/* ── Distant stars / atmospheric specks ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 28 }).map((_, i) => {
          const left = (i * 53) % 100;
          const top  = (i * 37) % 45;
          const size = 1 + (i % 3) * 0.5;
          return (
            <div key={i}
              className="absolute rounded-full bg-glow-ice"
              style={{
                left:    `${left}%`,
                top:     `${top}%`,
                width:   `${size}px`,
                height:  `${size}px`,
                opacity: 0.25 + (i % 4) * 0.15,
                animation: `lurePulse ${3 + (i % 4)}s ease-in-out ${(i % 5) * 0.4}s infinite`,
              }}
            />
          );
        })}
      </div>

      {/* ── God-rays from above (subtle) ── */}
      <div
        className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
        aria-hidden
        style={{
          background: `
            repeating-linear-gradient(
              92deg,
              transparent 0px, transparent 80px,
              rgba(125,249,255,0.05) 110px, rgba(125,249,255,0.10) 130px,
              transparent 160px, transparent 240px
            )`,
          mixBlendMode: 'screen',
          opacity: 0.55,
        }}
      />

      {/* ── Distant sun glow ── */}
      <div
        className="absolute pointer-events-none"
        aria-hidden
        style={{
          left: '72%',
          top:  '12%',
          width:  '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,210,140,0.35), rgba(255,180,90,0.10) 40%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* ── Animated wave layers at the waterline ── */}
      <div
        aria-hidden
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: '62%', height: '30%' }}
      >
        {/* far wave layer */}
        <svg
          viewBox="0 0 1440 120" preserveAspectRatio="none"
          width="100%" height="80"
          style={{
            position: 'absolute', top: 0, left: 0,
            animation: 'waveDrift 14s ease-in-out infinite',
            opacity: 0.55,
          }}
        >
          <path
            d="M0,60 C120,90 280,30 480,60 C680,90 840,30 1040,60 C1240,90 1400,30 1440,60 L1440,120 L0,120 Z"
            fill="#0a3a5c"
          />
        </svg>
        {/* mid wave layer */}
        <svg
          viewBox="0 0 1440 120" preserveAspectRatio="none"
          width="100%" height="100"
          style={{
            position: 'absolute', top: 18, left: 0,
            animation: 'waveDrift 9s ease-in-out -3s infinite reverse',
            opacity: 0.75,
          }}
        >
          <path
            d="M0,60 C160,30 320,90 520,60 C720,30 880,90 1080,60 C1280,30 1400,90 1440,60 L1440,120 L0,120 Z"
            fill="#0a2c48"
          />
        </svg>
        {/* foreground wave layer */}
        <svg
          viewBox="0 0 1440 120" preserveAspectRatio="none"
          width="100%" height="120"
          style={{
            position: 'absolute', top: 50, left: 0,
            animation: 'waveDrift 6s ease-in-out -1s infinite',
          }}
        >
          <path
            d="M0,40 C200,80 400,10 600,40 C800,70 1000,10 1200,40 C1340,60 1420,30 1440,40 L1440,120 L0,120 Z"
            fill="#051a2d"
          />
          {/* foam highlight */}
          <path
            d="M0,40 C200,80 400,10 600,40 C800,70 1000,10 1200,40 C1340,60 1420,30 1440,40"
            stroke="#7df9ff" strokeOpacity="0.45" strokeWidth="1.2" fill="none"
          />
        </svg>
      </div>

      {/* ── Content stack ── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen
                      px-6 py-12 text-center">

        {/* ── Eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-[10px] md:text-xs tracking-[0.45em] uppercase
                     text-glow-cyan/85 mb-6"
        >
          ⚓ Surface · Departure
        </motion.div>

        {/* ── Caravel ── */}
        <Caravel />

        {/* ── Welcome copy ── */}
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

          {/*
            Alt copy options if Miguel wants to swap later:

            CONCISE:
            "This site runs on a 5-node Kubernetes cluster I built. GitOps with
            ArgoCD, Harbor registry, Prometheus + Grafana, Cloudflare Tunnel.
            Take the helm and dive in."

            INVITING:
            "What you're about to see runs on infrastructure I built myself.
            No vendor magic — just a homelab Kubernetes cluster, GitOps, and a
            portfolio describing the platform that's serving it. Ready?"
          */}
        </motion.div>

        {/* ── Helm CTA ── */}
        <div className="mt-10 md:mt-12">
          <HelmButton onClick={onEnter} label="Take the Helm" />
        </div>

        {/* ── Sub-hint ── */}
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
