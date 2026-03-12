'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CarouselSection() {
  const steps = [
    {
      icon: "🔐",
      title: "Tizimga kiring",
      text: "Email yoki telefon raqami orqali tez ro'yxatdan o'ting",
    },
    {
      icon: "🖼️",
      title: "Logotip yuklang",
      text: "Kompaniya logotipi yoki shaxsiy rasmingizni qo'shing",
    },
    {
      icon: "✏️",
      title: "Sarlavha va tavsif",
      text: "Kim ekanligingizni qisqacha va aniq ifodalang",
    },
    {
      icon: "🔗",
      title: "Ijtimoiy tarmoqlar",
      text: "Barcha tarmoqlarga havolalarni bir joyga yig'ing",
    },
    {
      icon: "🕐",
      title: "Ish vaqtini belgilang",
      text: "Dushanba–Juma: 9:00–18:00 formatida ko'rsating",
    },
    {
      icon: "📍",
      title: "Manzil havolalari",
      text: "Google, Yandex, 2GIS xarita havolalarini joylashtiring",
    },
    {
      icon: "🚀",
      title: "Sahifani chop eting",
      text: "Bir tugma bosamiz — sahifangiz darhol onlayn!",
    },
    {
      icon: "📲",
      title: "Havolani ulashing",
      text: "biosahifa.uz/ismingiz — barcha joyda ulashing",
    },
  ];

  const CARD_WIDTH = 240 + 16; // card width + gap
  const TOTAL_WIDTH = CARD_WIDTH * steps.length;

  const offsetRef = useRef(0);
  const speedRef = useRef(1); // px per frame, normal tezlik
  const targetSpeedRef = useRef(1);
  const rafRef = useRef(null);
  const trackRef = useRef(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const animate = () => {
      // Speed smoothly interpolate qiladi (easing)
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.06;

      offsetRef.current += speedRef.current;

      // Infinite loop: birinchi set tugaganda reset
      if (offsetRef.current >= TOTAL_WIDTH) {
        offsetRef.current -= TOTAL_WIDTH;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [TOTAL_WIDTH]);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    targetSpeedRef.current = 0; // asta sekin to'xtaydi
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    targetSpeedRef.current = 1; // asta sekin qayta boshlaydi
  };

  // Ikki nusxa — seamless loop uchun
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
          <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">
            Qanday ishlaydi
          </p>
          <h2
            className="text-[40px] lg:text-[52px] font-black tracking-tight text-zinc-900"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Platformadan qanday
            <br />
            <span className="italic text-zinc-400">foydalaniladi</span>
          </h2>
        </motion.div>
      </div>

      <div
        className="relative cursor-default"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-4 will-change-transform"
          style={{ width: "max-content" }}
        >
          {doubled.map((step, i) => (
            <div
              key={i}
              className="w-60 shrink-0 bg-zinc-50 border border-zinc-100 rounded-2xl p-6
                         hover:bg-white hover:border-zinc-200 hover:shadow-md transition-colors"
            >
              <div className="text-3xl mb-4">{step.icon}</div>
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                {String((i % steps.length) + 1).padStart(2, "0")}
              </div>
              <h3 className="text-[15px] font-bold text-zinc-900 mb-2">
                {step.title}
              </h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}