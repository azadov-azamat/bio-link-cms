'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from './i18n-provider';

export function CarouselSection() {
  const { t } = useI18n();
  const steps = t.carousel.steps;

  const CARD_WIDTH = 240 + 16;
  const TOTAL_WIDTH = CARD_WIDTH * steps.length;

  const offsetRef = useRef<number>(0);
  const speedRef = useRef<number>(1);
  const targetSpeedRef = useRef<number>(1);
  const rafRef = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animate = () => {
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.06;
      offsetRef.current += speedRef.current;

      if (offsetRef.current >= TOTAL_WIDTH) {
        offsetRef.current -= TOTAL_WIDTH;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [TOTAL_WIDTH]);

  const doubled = [...steps, ...steps];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">{t.carousel.eyebrow}</p>
          <h2 className="text-[40px] lg:text-[52px] font-black tracking-tight text-zinc-900" style={{ fontFamily: "'Georgia', serif" }}>
            {t.carousel.titleLine1}
            <br />
            <span className="italic text-zinc-400">{t.carousel.titleItalic}</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative cursor-default" onMouseEnter={() => (targetSpeedRef.current = 0)} onMouseLeave={() => (targetSpeedRef.current = 1)}>
        <div ref={trackRef} className="flex gap-4 will-change-transform" style={{ width: 'max-content' }}>
          {doubled.map((step, i) => (
            <div
              key={i}
              className="w-60 shrink-0 bg-zinc-50 border border-zinc-100 rounded-2xl p-6 hover:bg-white hover:border-zinc-200 hover:shadow-md transition-colors"
            >
              <div className="text-3xl mb-4">{step.icon}</div>
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{String((i % steps.length) + 1).padStart(2, '0')}</div>
              <h3 className="text-[15px] font-bold text-zinc-900 mb-2">{step.title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
