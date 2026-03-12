'use client';

import { motion } from 'framer-motion';
import { Icons } from './icons';
import { useI18n } from './i18n-provider';

export function FeaturesSection() {
  const { t } = useI18n();

  const features = [
    { Icon: Icons.Image, accent: '#F0FDF4', border: '#86EFAC' },
    { Icon: Icons.Link, accent: '#EFF6FF', border: '#93C5FD' },
    { Icon: Icons.Clock, accent: '#FFF7ED', border: '#FCA5A5' },
    { Icon: Icons.MapPin, accent: '#FDF4FF', border: '#D8B4FE' },
    { Icon: Icons.Phone, accent: '#F0FDFA', border: '#6EE7B7' },
    { Icon: Icons.Globe, accent: '#FAFAFA', border: '#D1D5DB' },
    { Icon: Icons.Zap, accent: '#FEFCE8', border: '#FDE047' },
    { Icon: Icons.Smartphone, accent: '#EFF6FF', border: '#93C5FD' },
  ];

  return (
    <section id="imkoniyatlar" className="py-24 bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">{t.features.eyebrow}</p>
          <h2 className="text-[40px] lg:text-[52px] font-black tracking-tight text-zinc-900 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
            {t.features.title}
          </h2>
          <p className="mt-4 text-[17px] text-zinc-500 max-w-[500px] mx-auto leading-relaxed">
            {t.features.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ Icon, accent, border }, i) => (
            <motion.div
              key={t.features.items[i].title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white rounded-2xl p-6 border border-zinc-100 hover:border-zinc-200 hover:shadow-lg hover:shadow-zinc-900/5 transition-all cursor-default"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-zinc-700 group-hover:scale-110 transition-transform"
                style={{ background: accent, border: `1.5px solid ${border}` }}
              >
                <Icon />
              </div>
              <h3 className="text-[15px] font-bold text-zinc-900 mb-2 leading-snug">{t.features.items[i].title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">{t.features.items[i].desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
