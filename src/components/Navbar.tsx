'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: 'about',          label: 'About' },
  { href: 'skills',         label: 'Skills' },
  { href: 'experience',     label: 'Experience' },
  { href: 'projects',       label: 'Projects' },
  { href: 'certifications', label: 'Certs' },
  { href: 'contact',        label: 'Contact' },
];

/* ─── Active section via IntersectionObserver ────────────── */
function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    links.forEach(({ href }) => {
      const el = document.getElementById(href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ─── Single bubble item — label always visible ──────────── */
function Bubble({
  href, label, active, index,
}: {
  href: string; label: string; active: boolean; index: number;
}) {
  return (
    <motion.a
      href={`#${href}`}
      initial={{ x: 60, opacity: 0, scale: 0.4 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 22,
        delay: index * 0.07,
      }}
      // subtle per-bubble float
      style={{ originX: 1 }}
      className="group flex items-center gap-3 justify-end"
      aria-label={label}
    >
      {/* Always-visible label */}
      <motion.span
        animate={active
          ? { opacity: 1, textShadow: '0 0 12px rgba(0,212,255,0.9), 0 0 24px rgba(0,212,255,0.5)' }
          : { opacity: 1, textShadow: '0 0 0px rgba(0,212,255,0)' }
        }
        transition={{ duration: 0.4 }}
        className={`font-display text-[11px] tracking-[0.25em] uppercase transition-colors duration-300
                    ${active ? 'text-glow-cyan' : 'text-white/28 group-hover:text-white/60'}`}
      >
        {label}
      </motion.span>

      {/* Bubble */}
      <motion.div
        animate={active
          ? { scale: [1, 1.1, 1], transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } }
          : { scale: 1 }
        }
        // continuous gentle float (unique period per item)
        whileHover={{ scale: 1.12 }}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center shrink-0
                    transition-all duration-300 cursor-pointer
                    ${active
                      ? 'bg-glow-cyan/25 border-2 border-glow-cyan shadow-[0_0_22px_rgba(0,212,255,0.75),inset_0_0_14px_rgba(0,212,255,0.2)]'
                      : 'glass border border-glow-cyan/20 group-hover:border-glow-cyan/55 group-hover:shadow-[0_0_14px_rgba(0,212,255,0.4)]'
                    }`}
      >
        {/* inner core dot */}
        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                          ${active
                            ? 'bg-glow-cyan shadow-[0_0_10px_rgba(0,212,255,1)]'
                            : 'bg-glow-ice/40 group-hover:bg-glow-cyan/70'}`}
        />
        {/* glint */}
        <div className="absolute top-2.5 left-3.5 w-1.5 h-1 rounded-full bg-white/30 blur-[1px] pointer-events-none" />
        {/* active ring ripple */}
        {active && (
          <motion.div
            animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border border-glow-cyan/60 pointer-events-none"
          />
        )}
      </motion.div>
    </motion.a>
  );
}

/* ─── Side bubble navigation ─────────────────────────────── */
function SideNav({ active }: { active: string }) {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3 }}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-4"
      aria-label="Section navigation"
    >
      {/* Connector line */}
      <div
        aria-hidden
        className="absolute right-[22px] top-6 bottom-6 w-px
                   bg-gradient-to-b from-transparent via-glow-cyan/25 to-transparent pointer-events-none"
      />

      {links.map((l, i) => (
        <Bubble key={l.href} href={l.href} label={l.label} active={active === l.href} index={i} />
      ))}

      {/* CV download bubble */}
      <motion.a
        href="/cv/Miguel-Briseno-DevOps-CV.pdf"
        download
        initial={{ x: 60, opacity: 0, scale: 0.4 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, delay: links.length * 0.07 }}
        className="group flex items-center gap-3 justify-end mt-1"
        aria-label="Download CV"
      >
        <span className="font-display text-[11px] tracking-[0.25em] uppercase
                          text-white/28 group-hover:text-glow-ice transition-colors duration-300">
          CV
        </span>
        <div className="relative w-12 h-12 rounded-full flex items-center justify-center shrink-0 cursor-pointer
                        bg-gradient-to-br from-glow-cyan/30 to-glow-atlantis/20
                        border border-glow-cyan/40
                        shadow-[0_0_14px_rgba(0,212,255,0.4)]
                        group-hover:shadow-[0_0_26px_rgba(0,212,255,0.7)] transition-shadow">
          <svg viewBox="0 0 20 20" width="15" height="15" fill="none"
            stroke="currentColor" strokeWidth="2" className="text-glow-ice">
            <path d="M10 3v10M6 9l4 4 4-4" />
            <path d="M4 17h12" />
          </svg>
          <div className="absolute top-2.5 left-3.5 w-1.5 h-1 rounded-full bg-white/25 blur-[1px]" />
        </div>
      </motion.a>
    </motion.nav>
  );
}

/* ─── Top bar ─────────────────────────────────────────────── */
function TopBar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{
        opacity: 0,
        // flies toward top-right corner so the eye follows it to the side nav
        x: '38%',
        y: -52,
        scale: 0.82,
        transition: { duration: 0.55, ease: [0.4, 0, 0.8, 1] },
      }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <nav className="max-w-6xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
        <a href="#home" className="font-display tracking-[0.3em] text-glow-ice text-base md:text-lg group">
          <span className="text-glow-cyan">MA</span>
          <span className="text-white/90 group-hover:text-glow-cyan transition-colors">BF</span>
        </a>
        <ul className="hidden md:flex items-center gap-7 text-base font-display tracking-[0.2em] uppercase">
          {links.map((l) => (
            <li key={l.href}>
              <a href={`#${l.href}`} className="text-white/75 hover:text-glow-cyan transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/cv/Miguel-Briseno-DevOps-CV.pdf"
          download
          className="hidden md:inline-block px-4 py-2 rounded-full text-xs font-display
                     tracking-[0.2em] uppercase text-abyss-900
                     bg-gradient-to-r from-glow-cyan to-glow-ice
                     shadow-[0_0_18px_rgba(0,212,255,0.45)]
                     hover:shadow-[0_0_28px_rgba(0,212,255,0.7)] transition-shadow"
        >
          CV
        </a>
        <button
          aria-label="Toggle menu"
          className="md:hidden text-glow-ice w-10 h-10 flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-glow-cyan/20 overflow-hidden"
          >
            <ul className="px-5 py-4 flex flex-col gap-3 text-sm font-display tracking-[0.2em] uppercase">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={`#${l.href}`} onClick={() => setOpen(false)}
                    className="block py-1 text-white/85 hover:text-glow-cyan transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/cv/Miguel-Briseno-DevOps-CV.pdf" download
                  className="inline-block mt-2 px-4 py-2 rounded-full text-xs text-abyss-900
                             bg-gradient-to-r from-glow-cyan to-glow-ice">
                  Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ─── Mobile floating nav (when scrolled) ────────────────── */
function MobileScrolledNav({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <>
      <button
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-5 z-50 md:hidden w-12 h-12 rounded-full
                   bg-gradient-to-br from-glow-cyan/40 to-glow-atlantis/30
                   border border-glow-cyan/50 shadow-[0_0_18px_rgba(0,212,255,0.5)]
                   flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-glow-ice">
          {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-5 z-50 md:hidden glass-strong rounded-2xl
                       border border-glow-cyan/30 overflow-hidden"
          >
            <ul className="px-5 py-4 flex flex-col gap-3 text-sm font-display tracking-[0.2em] uppercase">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={`#${l.href}`} onClick={() => setOpen(false)}
                    className="block py-1 text-white/85 hover:text-glow-cyan transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Root ───────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!scrolled && <TopBar key="topbar" open={open} setOpen={setOpen} />}
      </AnimatePresence>
      <AnimatePresence>
        {scrolled && <SideNav key="sidenav" active={active} />}
      </AnimatePresence>
      {scrolled && <MobileScrolledNav open={open} setOpen={setOpen} />}
    </>
  );
}
