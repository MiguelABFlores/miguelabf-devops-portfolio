'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import { certifications } from '@/data/certifications';

export default function Certifications() {
  return (
    <Section id="certifications" eyebrow="Sigils" title="Certifications & Education">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((c, i) => {
          const Wrapper: any = c.url ? 'a' : 'div';
          const wrapperProps = c.url
            ? { href: c.url, target: '_blank', rel: 'noopener noreferrer' }
            : {};
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Wrapper
                {...wrapperProps}
                className="block glass-strong rounded-2xl p-5 border-l-2 border-l-glow-cyan/40
                           hover:border-l-glow-cyan/70 hover:shadow-glow hover:-translate-y-0.5
                           transition-all h-full group"
              >
                <div className="flex items-center gap-4">
                  <div
                    aria-hidden
                    className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0
                               bg-gradient-to-br from-glow-cyan/25 to-glow-atlantis/20
                               border border-glow-cyan/35 font-display text-glow-ice text-xl
                               shadow-[inset_0_0_22px_rgba(0,212,255,0.25),0_0_14px_rgba(0,212,255,0.18)]
                               group-hover:shadow-[inset_0_0_28px_rgba(0,212,255,0.38),0_0_22px_rgba(0,212,255,0.28)]
                               transition-shadow"
                  >
                    {c.badge}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] tracking-[0.28em] uppercase font-display text-glow-cyan/75 mb-1">
                      {c.issuer}
                    </div>
                    <div className="font-display text-glow-ice text-base leading-tight">
                      {c.title}
                    </div>
                    {c.url && (
                      <div className="mt-2 text-glow-cyan/80 text-[11px] tracking-[0.2em] uppercase
                                      group-hover:text-glow-cyan transition-colors">
                        Verify credential →
                      </div>
                    )}
                  </div>
                </div>
              </Wrapper>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
