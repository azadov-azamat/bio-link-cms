'use client';

import { motion } from 'framer-motion';
import { useI18n } from './i18n-provider';

export function TrustSection() {
  const { t } = useI18n();
  const brands = [
    { name: 'TechHub UZ', abbr: 'TH' },
    { name: 'Bestbrands', abbr: 'BB' },
    { name: "Oʻzbekiston Branding", abbr: 'UB' },
    { name: 'SMMexperts', abbr: 'SM' },
    { name: 'Digital Agency', abbr: 'DA' },
    { name: 'CraftStudio', abbr: 'CS' },
  ];

  return (
    <section className="py-16 bg-white border-y border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[13px] font-medium text-zinc-400 uppercase tracking-widest mb-10"
        >
          {t.trust.caption}
        </motion.p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {brands.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 px-5 py-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-zinc-200 hover:bg-white transition-all cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-200 flex items-center justify-center text-[11px] font-black text-zinc-600">
                {b.abbr}
              </div>
              <span className="text-[13px] font-semibold text-zinc-600">{b.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
