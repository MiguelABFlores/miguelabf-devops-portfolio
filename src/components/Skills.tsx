'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import { skillGroups } from '@/data/skills';

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Toolkit" title="Skills & Stack">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="glass rounded-2xl p-5 hover:border-glow-cyan/40 transition-colors group"
          >
            <div
              className={`text-xs tracking-[0.25em] uppercase font-display mb-4 ${
                group.accent === 'magenta' ? 'text-glow-atlantis' : 'text-glow-cyan'
              }`}
            >
              {group.title}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className={group.accent === 'magenta' ? 'chip chip-magenta' : 'chip'}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
