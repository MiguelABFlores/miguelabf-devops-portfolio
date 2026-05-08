'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center px-6 md:px-10 pt-24"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-glow-ice text-xs md:text-sm tracking-[0.5em] uppercase mb-6 font-display"
        >
          Guadalajara · MX
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] text-white glow-text"
        >
          Miguel Angel
          <br />
          <span
            className="bg-gradient-to-r from-glow-cyan via-glow-ice to-glow-atlantis bg-clip-text text-transparent"
            style={{ WebkitTextFillColor: 'transparent' }}
          >
            Briseño Flores
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-2xl text-glow-ice/90 font-display tracking-[0.25em] uppercase"
        >
          DevOps Engineer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-white/75 leading-relaxed"
        >
          I build and operate production-grade infrastructure — self-hosted Kubernetes
          clusters, GitOps pipelines, private container registries, and full observability
          stacks. Former SRE at Oracle, now focused on DevOps engineering. The site
          you&apos;re reading runs on my own cluster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/cv/Miguel-Briseno-DevOps-CV.pdf"
            download
            className="group relative px-6 py-3 rounded-full font-display text-sm tracking-[0.2em] uppercase
                       text-abyss-900 bg-gradient-to-r from-glow-cyan to-glow-ice
                       shadow-glow hover:shadow-[0_0_36px_rgba(0,212,255,0.6)] transition-all
                       hover:-translate-y-0.5"
          >
            Download CV
          </a>
          <a
            href="#contact"
            className="group relative px-6 py-3 rounded-full font-display text-sm tracking-[0.2em] uppercase
                       glass text-glow-ice hover:border-glow-cyan/50 hover:text-white transition-all
                       hover:-translate-y-0.5"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-glow-ice/60 text-xs tracking-[0.4em] font-display"
        >
          <div className="flex flex-col items-center gap-2">
            <span>SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-glow-ice/60 to-transparent animate-float-slow" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
