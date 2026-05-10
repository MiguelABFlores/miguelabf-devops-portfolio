'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroSplash from './IntroSplash';

const STORAGE_KEY = 'mabf:intro-seen';

/* ───────────────────────────────────────────────────────────────
   IntroGate — owns the splash visibility state.

   - On first mount, reads sessionStorage. If the user already
     dismissed the splash this session, we never render it.
   - While we don't yet know (showIntro === null), render nothing
     so we don't flash the splash on returning visits within the
     same session.
   - On dismiss (helm click), play the dive animation, set the
     sessionStorage flag, and unmount the splash.

   The portfolio underneath renders independently from this
   component — so the dive reveals real content, not a loader.
   ─────────────────────────────────────────────────────────────── */
export default function IntroGate() {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);
  const [diving, setDiving]       = useState(false);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY) === 'true';
      setShowIntro(!seen);
    } catch {
      // Private browsing / SSR / disabled storage — show splash anyway
      setShowIntro(true);
    }
  }, []);

  /* Lock body scroll while the splash is up so the portfolio doesn't
     become reachable via scroll while the overlay covers it. */
  useEffect(() => {
    if (showIntro) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [showIntro]);

  function handleEnter() {
    if (diving) return;        // prevent double-trigger
    setDiving(true);
    try { sessionStorage.setItem(STORAGE_KEY, 'true'); } catch { /* noop */ }

    // After the dive animation finishes, unmount the splash.
    // 1.6s exit + small buffer to ensure motion completes.
    window.setTimeout(() => setShowIntro(false), 1700);
  }

  return (
    <AnimatePresence>
      {showIntro && (
        <>
          <IntroSplash key="splash" onEnter={handleEnter} />
          {/* Bubble streak — only rendered while diving, layered over
              the splash to sell the downward acceleration. */}
          {diving && <DiveBubbles />}
        </>
      )}
    </AnimatePresence>
  );
}

/* ── DiveBubbles — vertical streak of bubbles rushing UP across
   the screen while the splash dives DOWN. Pure visual polish. ── */
function DiveBubbles() {
  // Eight bubbles, varied size + horizontal position, staggered.
  const bubbles = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    x:        10 + ((i * 67) % 80),       // 10–90% horizontal
    size:     6 + (i % 4) * 5,            // 6–21px
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
