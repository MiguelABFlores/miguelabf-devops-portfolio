'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, eyebrow, title, children, className = '' }: Props) {
  return (
    <section id={id} className={`relative py-24 px-6 md:px-10 max-w-6xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mb-12"
      >
        {eyebrow && (
          <div className="text-glow-cyan/80 text-xs tracking-[0.3em] uppercase mb-3 font-display">
            {eyebrow}
          </div>
        )}
        <h2 className="section-title font-display text-3xl md:text-5xl text-white glow-text">
          {title}
        </h2>
      </motion.div>
      {children}
    </section>
  );
}
