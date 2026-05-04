'use client';

import { useEffect, useState } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certs' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
                  ${scrolled ? 'glass-strong' : 'bg-transparent'}`}
    >
      <nav className="max-w-6xl mx-auto px-5 md:px-10 py-3 md:py-4 flex items-center justify-between">
        <a href="#home" className="font-display tracking-[0.3em] text-glow-ice text-sm md:text-base group">
          <span className="text-glow-cyan">M</span>
          <span className="text-white/90 group-hover:text-glow-cyan transition-colors">·BF</span>
        </a>
        <ul className="hidden md:flex items-center gap-7 text-sm font-display tracking-[0.2em] uppercase">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-white/75 hover:text-glow-cyan transition-colors"
              >
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
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>
      {open && (
        <div className="md:hidden glass-strong border-t border-glow-cyan/20">
          <ul className="px-5 py-4 flex flex-col gap-3 text-sm font-display tracking-[0.2em] uppercase">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-1 text-white/85 hover:text-glow-cyan transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/cv/Miguel-Briseno-DevOps-CV.pdf"
                download
                className="inline-block mt-2 px-4 py-2 rounded-full text-xs text-abyss-900
                           bg-gradient-to-r from-glow-cyan to-glow-ice"
              >
                Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
