'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icons } from './icons';
import { ProfileCard } from './profile-card';

export function HeroSection() {
  const [urlText] = useState('biosahifa.uz/');
  const [typed, setTyped] = useState('');
  const phrase = 'sizning-nomingiz';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= phrase.length) {
        setTyped(phrase.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 90);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden bg-[#FAFAF9] flex items-center pt-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Gradient orbs */}
      <div className="absolute top-32 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #6EE7B7, transparent)' }} />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #A5B4FC, transparent)' }} />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-4 py-2 text-[13px] font-medium text-zinc-600 mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Mini-sayt yaratuvchi platforma
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[48px] sm:text-[56px] lg:text-[64px] font-black leading-[1.05] tracking-tight text-zinc-900 mb-6"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Shaxsiy
            <br />
            <span className="italic text-zinc-400">sahifangizni</span>
            <br />
            bir necha
            <br />
            daqiqada yarating
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-[17px] text-zinc-500 leading-relaxed mb-8 max-w-[460px]"
          >
            Logo, havolalar, ish vaqti, ijtimoiy tarmoqlar va manzil
            ma'lumotlarini qo'shing — va tayyor mini-saytingizni darhol
            ishga tushiring.
          </motion.p>

          {/* URL input visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-0 bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-md shadow-zinc-900/5 mb-8 max-w-[400px]"
          >
            <div className="px-4 py-3.5 text-[14px] font-medium text-zinc-400 border-r border-zinc-100 bg-zinc-50 whitespace-nowrap">
              {urlText}
            </div>
            <div className="px-4 py-3.5 flex-1 text-[14px] font-semibold text-zinc-900">
              {typed}
              <span className="animate-pulse">|</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3"
          >
            <button className="group px-7 py-3.5 bg-zinc-900 text-white text-[15px] font-semibold rounded-2xl shadow-lg shadow-zinc-900/20 hover:bg-zinc-700 hover:-translate-y-0.5 transition-all flex items-center gap-2">
              Bepul boshlash
              <span className="group-hover:translate-x-1 transition-transform">
                <Icons.ArrowRight />
              </span>
            </button>
            <button className="px-7 py-3.5 bg-white text-zinc-800 text-[15px] font-semibold rounded-2xl border border-zinc-200 shadow-sm hover:border-zinc-300 hover:-translate-y-0.5 transition-all">
              Namuna ko'rish
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-5 mt-10"
          >
            {[['500+', 'Foydalanuvchilar'], ['4.9★', 'Reyting'], ['2 min', "O'rtacha sozlash"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-[18px] font-black text-zinc-900">{val}</div>
                <div className="text-[11px] text-zinc-400 font-medium">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right - floating cards */}
        <div className="relative h-[580px] hidden lg:flex items-center justify-center">
          {/* Main card */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute z-10"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <ProfileCard
              theme="light"
              name="Alisher Nazarov"
              handle="alisher.uz"
              bio="UX dizayner va frontend dasturchi. 5 yillik tajriba."
              color="#6366F1"
              accent="#8B5CF6"
              delay={0.5}
            />
          </motion.div>

          {/* Secondary card */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute z-20"
            style={{ left: '62%', top: '20%' }}
          >
            <ProfileCard
              theme="dark"
              name="Zulfiya's Studio"
              handle="zulfiya"
              bio="Kichik biznes uchun brending va dizayn."
              color="#F472B6"
              accent="#EC4899"
              delay={0.7}
            />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-16 left-8 bg-white rounded-2xl px-4 py-3 shadow-xl border border-zinc-100 flex items-center gap-3 z-30"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
              <span className="text-emerald-500">✓</span>
            </div>
            <div>
              <div className="text-[12px] font-bold text-zinc-900">Sahifa tayyor!</div>
              <div className="text-[11px] text-zinc-400">biosahifa.uz/zulfiya</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute top-10 right-12 bg-white rounded-2xl px-4 py-3 shadow-xl border border-zinc-100 flex items-center gap-3 z-30"
          >
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center text-violet-500">
              <Icons.Globe />
            </div>
            <div>
              <div className="text-[12px] font-bold text-zinc-900">Onlayn</div>
              <div className="text-[11px] text-zinc-400">24/7 ishlaydi</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-300"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-zinc-300" />
        <Icons.ChevronDown />
      </motion.div>
    </section>
  );
}
