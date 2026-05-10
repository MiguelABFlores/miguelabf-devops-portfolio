'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroSplash from './IntroSplash';

const STORAGE_KEY = 'mabf:intro-seen';

/* ───────────────────────────────────────────────────────────────
   IntroGate - owns splash visibility.

   First-paint strategy:
   - SSR / static export: initial state is `true`, so the splash
     IS in the static HTML. First-time visitors see it from frame 1
     - no flash of portfolio.
   - Repeat visitors within a session: an inline script in <head>
     (see app/layout.tsx) reads sessionStorage synchronously BEFORE
     paint and adds `mabf-intro-seen` to <html>. globals.css then
     applies `display:none` to `[data-intro-splash]`, hiding the
     splash before React hydrates. No flash of splash either.
   - On hydration, useEffect detects the flag and removes the
     splash from the React tree cleanly.
   ─────────────────────────────────────────────────────────────── */
export default function IntroGate() {
  // Default true so static HTML includes the splash for first visits.
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [diving, setDiving]       = useState(false);

  useEffect(() => {
    // Repeat visit detection - the CSS already hid the splash via the
    // <html> class set by the inline script. This unmounts it cleanly.
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY) === 'true';
      if (seen) setShowIntro(false);
    } catch {
      /* private browsing - keep splash visible */
    }
  }, []);

  /* Lock body scroll while the splash is up. */
  useEffect(() => {
    if (showIntro) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [showIntro]);

  function handleEnter() {
    if (diving) return;
    setDiving(true);
    try { sessionStorage.setItem(STORAGE_KEY, 'true'); } catch { /* noop */ }
    // 1.6s exit + buffer so the dive animation completes cleanly.
    window.setTimeout(() => setShowIntro(false), 1700);
  }

  return (
    <AnimatePresence>
      {showIntro && (
        <>
          <IntroSplash key="splash" onEnter={handleEnter} />
          {diving && <DiveBubbles />}
        </>
      )}
    </AnimatePresence>
  );
}

/* ── DiveBubbles - vertical streak of bubbles rushing UP across
   the screen while the splash dives DOWN. ── */
function DiveBubbles() {
  const bubbles = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    x:        10 + ((i * 67) % 80),
    size:     6 + (i % 4) * 5,
    delay:    i * 0.06,
    duration: 1.0 + (i % 3) * 0.25,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-[101] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      aria-hidden
    >
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: '100vh', opacity: 0, scale: 0.6 }}
          animate={{ y: '-15vh', opacity: [0, 0.85, 0], scale: 1 }}
          transition={{
            duration: b.duration,
            delay:    b.delay,
            ease:     'easeIn',
          }}
          style={{
            position: 'absolute',
            left:     `${b.x}%`,
            width:    `${b.size}px`,
            height:   `${b.size}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), rgba(125,249,255,0.45) 50%, rgba(0,180,220,0.10) 80%, transparent 100%)',
            boxShadow:  '0 0 8px rgba(125,249,255,0.55)',
          }}
        />
      ))}
    </motion.div>
  );
}
