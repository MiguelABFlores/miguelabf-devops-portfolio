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
                className={`block glass-strong rounded-2xl p-5 border-l-2 hover:-translate-y-0.5
                           transition-all h-full group
                           ${c.inProgress
                             ? 'border-l-glow-atlantis/50 hover:border-l-glow-atlantis/80 hover:shadow-[0_0_24px_rgba(177,78,255,0.25)]'
                             : 'border-l-glow-cyan/40 hover:border-l-glow-cyan/70 hover:shadow-glow'
                           }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    aria-hidden
                    className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0
                               font-display text-glow-ice text-xl transition-shadow
                               ${c.inProgress
                                 ? 'bg-gradient-to-br from-glow-atlantis/22 to-glow-cyan/15 border border-glow-atlantis/35 shadow-[inset_0_0_22px_rgba(177,78,255,0.22),0_0_14px_rgba(177,78,255,0.15)] group-hover:shadow-[inset_0_0_28px_rgba(177,78,255,0.35),0_0_22px_rgba(177,78,255,0.25)]'
                                 : 'bg-gradient-to-br from-glow-cyan/25 to-glow-atlantis/20 border border-glow-cyan/35 shadow-[inset_0_0_22px_rgba(0,212,255,0.25),0_0_14px_rgba(0,212,255,0.18)] group-hover:shadow-[inset_0_0_28px_rgba(0,212,255,0.38),0_0_22px_rgba(0,212,255,0.28)]'
                               }`}
                  >
                    {c.badge}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-[10px] tracking-[0.28em] uppercase font-display mb-1
                                     ${c.inProgress ? 'text-glow-atlantis/75' : 'text-glow-cyan/75'}`}>
                      {c.issuer}
                    </div>
                    <div className="font-display text-glow-ice text-base leading-tight">
                      {c.title}
                    </div>
                    {c.inProgress && (
                      <div className="mt-2 inline-flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-glow-atlantis opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-glow-atlantis" />
                        </span>
                        <span className="text-glow-atlantis/90 text-[11px] tracking-[0.2em] uppercase font-display">
                          In Progress
                        </span>
                      </div>
                    )}
                    {c.url && !c.inProgress && (
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
