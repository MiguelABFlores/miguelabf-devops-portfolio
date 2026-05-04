'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: 'about',          label: 'About' },
  { href: 'skills',         label: 'Skills' },
  { href: 'experience',     label: 'Experience' },
  { href: 'projects',       label: 'Projects' },
  { href: 'certifications', label: 'Certs' },
  { href: 'contact',        label: 'Contact' },
];

/* ─── Active section tracker ─────────────────────────────── */
function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
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

/* ─── Single bubble nav item ─────────────────────────────── */
function Bubble({
  href, label, active, index,
}: {
  href: string; label: string; active: boolean; index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={`#${href}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 3.5 + index * 0.4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.55,
      }}
      className="relative flex items-center justify-end group"
      aria-label={label}
    >
      {/* Label pill — slides in from right */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 8, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 'auto' }}
            exit={{ opacity: 0, x: 8, width: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mr-2 whitespace-nowrap font-display text-xs
                       tracking-[0.2em] uppercase text-glow-ice pointer-events-none"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* The bubble */}
      <motion.div
        animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
        transition={active ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        className={`w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300 cursor-pointer
                    ${active
                      ? 'bg-glow-cyan/25 border-2 border-glow-cyan shadow-[0_0_18px_rgba(0,212,255,0.7),inset_0_0_12px_rgba(0,212,255,0.2)]'
                      : 'glass border border-glow-cyan/25 hover:border-glow-cyan/60 hover:shadow-[0_0_14px_rgba(0,212,255,0.45)]'
                    }`}
      >
        {/* Inner bubble highlight */}
        <div className={`w-2 h-2 rounded-full transition-all duration-300
                          ${active
                            ? 'bg-glow-cyan shadow-[0_0_8px_rgba(0,212,255,1)]'
                            : 'bg-glow-ice/50 group-hover:bg-glow-cyan'}`}
        />
        {/* Tiny top glint */}
        <div className="absolute top-2 left-3 w-1.5 h-1 rounded-full bg-white/30 blur-[1px]" />
      </motion.div>
    </motion.a>
  );
}

/* ─── Side bubble navigation ─────────────────────────────── */
function SideNav({ active }: { active: string }) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-3"
      aria-label="Section navigation"
    >
      {/* Connector line */}
      <div className="absolute right-[18px] top-5 bottom-5 w-px
                      bg-gradient-to-b from-transparent via-glow-cyan/30 to-transparent
                      pointer-events-none" />

      {links.map((l, i) => (
        <Bubble key={l.href} href={l.href} label={l.label} active={active === l.href} index={i} />
      ))}

      {/* CV bubble — distinct */}
      <motion.a
        href="/cv/Miguel-Briseno-DevOps-CV.pdf"
        download
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2.8 }}
        className="mt-1 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
                   bg-gradient-to-br from-glow-cyan/40 to-glow-atlantis/30
                   border border-glow-cyan/50
                   shadow-[0_0_16px_rgba(0,212,255,0.5)]
                   hover:shadow-[0_0_28px_rgba(0,212,255,0.8)] transition-shadow group"
        aria-label="Download CV"
      >
        <svg viewBox="0 0 20 20" width="14" height="14" fill="none"
          stroke="currentColor" strokeWidth="2" className="text-glow-ice">
          <path d="M10 3v10M6 9l4 4 4-4" />
          <path d="M4 17h12" />
        </svg>
        {/* Tooltip */}
        <span className="absolute right-12 whitespace-nowrap font-display text-xs
                         tracking-[0.2em] uppercase text-glow-ice
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Download CV
        </span>
      </motion.a>
    </motion.nav>
  );
}

/* ─── Top bar (visible only at top of page) ──────────────── */
function TopBar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
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

/* ─── Mobile floating button (when scrolled) ─────────────── */
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
      <AnimatePresence>
        {!scrolled && <TopBar key="topbar" open={open} setOpen={setOpen} />}
      </AnimatePresence>
      <AnimatePresence>
        {scrolled && <SideNav key="sidenav" active={active} />}
      </AnimatePresence>
      {scrolled && <MobileScrolledNav open={open} setOpen={setOpen} />}
    </>
  );
}
