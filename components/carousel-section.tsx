'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function CarouselSection() {
  const containerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const steps = [
    { icon: '🔐', title: 'Tizimga kiring', text: 'Email yoki telefon raqami orqali tez ro\'yxatdan o\'ting' },
    { icon: '🖼️', title: 'Logotip yuklang', text: 'Kompaniya logotipi yoki shaxsiy rasmingizni qo\'shing' },
    { icon: '✏️', title: 'Sarlavha va tavsif', text: 'Kim ekanligingizni qisqacha va aniq ifodalang' },
    { icon: '🔗', title: 'Ijtimoiy tarmoqlar', text: 'Barcha tarmoqlarga havolalarni bir joyga yig\'ing' },
    { icon: '🕐', title: 'Ish vaqtini belgilang', text: 'Dushanba–Juma: 9:00–18:00 formatida ko\'rsating' },
    { icon: '📍', title: 'Manzil havolalari', text: 'Google, Yandex, 2GIS xarita havolalarini joylashtiring' },
    { icon: '🚀', title: 'Sahifani chop eting', text: 'Bir tugma bosamiz — sahifangiz darhol onlayn!' },
    { icon: '📲', title: 'Havolani ulashing', text: 'biosahifa.uz/ismingiz — barcha joyda ulashing' },
  ];

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
          <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">Qanday ishlaydi</p>
          <h2 className="text-[40px] lg:text-[52px] font-black tracking-tight text-zinc-900" style={{ fontFamily: "'Georgia', serif" }}>
            Platformadan qanday<br />
            <span className="italic text-zinc-400">foydalaniladi</span>
          </h2>
        </motion.div>
      </div>

      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex gap-4"
          style={{
            animation: paused ? 'none' : 'scroll-x 28s linear infinite',
            width: 'max-content',
          }}
        >
          {doubled.map((step, i) => (
            <div
              key={i}
              className="w-[240px] flex-shrink-0 bg-zinc-50 border border-zinc-100 rounded-2xl p-6 hover:bg-white hover:border-zinc-200 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-4">{step.icon}</div>
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                {String((i % steps.length) + 1).padStart(2, '0')}
              </div>
              <h3 className="text-[15px] font-bold text-zinc-900 mb-2">{step.title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      <style>{`
        @keyframes scroll-x {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
