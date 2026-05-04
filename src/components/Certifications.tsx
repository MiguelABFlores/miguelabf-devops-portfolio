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
                className="block glass rounded-2xl p-5 hover:border-glow-cyan/40 hover:-translate-y-0.5 transition-all h-full"
              >
                <div className="flex items-center gap-4">
                  <div
                    aria-hidden
                    className="w-14 h-14 rounded-xl flex items-center justify-center
                               bg-gradient-to-br from-glow-cyan/20 to-glow-atlantis/20
                               border border-glow-cyan/30 font-display text-glow-ice
                               shadow-[inset_0_0_18px_rgba(0,212,255,0.2)]"
                  >
                    {c.badge}
                  </div>
                  <div>
                    <div className="font-display text-white text-base leading-tight">
                      {c.title}
                    </div>
                    <div className="text-white/60 text-xs mt-1">{c.issuer}</div>
                    {c.url && (
                      <div className="mt-2 text-glow-cyan/90 text-[11px] tracking-[0.2em] uppercase">
                        Verify →
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
