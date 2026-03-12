'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Icons } from './icons';

interface Template {
  name: string;
  desc: string;
  user: string;
  handle: string;
  bio: string;
  bg: string;
  headerBg: string;
  textColor: string;
  subText: string;
  btnBg: string;
  btnText: string;
  secondBtn: string;
  border: string;
  avatarBg: string;
  avatarText: string;
}

export function TemplatesSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const templates: Template[] = [
    {
      name: 'Minimal Oq',
      desc: 'Toza, minimal dizayn',
      user: 'Aziza Karimova',
      handle: 'aziza.design',
      bio: 'UX/UI Designer',
      bg: 'bg-white',
      headerBg: 'bg-zinc-100',
      textColor: 'text-zinc-900',
      subText: 'text-zinc-500',
      btnBg: 'bg-zinc-900',
      btnText: 'text-white',
      secondBtn: 'bg-zinc-100 text-zinc-700',
      border: 'border border-zinc-200',
      avatarBg: 'bg-zinc-200',
      avatarText: 'text-zinc-700',
    },
    {
      name: 'Qora Premium',
      desc: 'Elegant qora uslub',
      user: 'Jasur Toshmatov',
      handle: 'jasur.pro',
      bio: 'Fotograf & Videograf',
      bg: 'bg-zinc-950',
      headerBg: 'bg-zinc-800',
      textColor: 'text-white',
      subText: 'text-zinc-400',
      btnBg: 'bg-white',
      btnText: 'text-zinc-900',
      secondBtn: 'bg-zinc-800 text-zinc-300',
      border: 'border border-zinc-800',
      avatarBg: 'bg-zinc-700',
      avatarText: 'text-white',
    },
    {
      name: 'Rang Gradient',
      desc: 'Quvnoq rang sxemasi',
      user: 'Malika Umarova',
      handle: 'malika.uz',
      bio: 'SMM ekspert & Blogger',
      bg: 'bg-gradient-to-br from-violet-50 to-pink-50',
      headerBg: 'bg-gradient-to-r from-violet-500 to-pink-500',
      textColor: 'text-violet-900',
      subText: 'text-violet-500',
      btnBg: 'bg-gradient-to-r from-violet-500 to-pink-500',
      btnText: 'text-white',
      secondBtn: 'bg-violet-100 text-violet-700',
      border: 'border border-violet-100',
      avatarBg: 'bg-violet-200',
      avatarText: 'text-violet-800',
    },
    {
      name: 'Biznes Uslubi',
      desc: 'Korporativ, jiddiy ko\'rinish',
      user: 'NexaCorp',
      handle: 'nexacorp',
      bio: 'IT kompaniya · Toshkent',
      bg: 'bg-slate-50',
      headerBg: 'bg-slate-800',
      textColor: 'text-slate-900',
      subText: 'text-slate-500',
      btnBg: 'bg-slate-800',
      btnText: 'text-white',
      secondBtn: 'bg-slate-200 text-slate-700',
      border: 'border border-slate-200',
      avatarBg: 'bg-slate-300',
      avatarText: 'text-slate-700',
    },
    {
      name: 'Kreativ',
      desc: 'San\'atkorlar uchun mo\'ljallangan',
      user: 'Studio Saodat',
      handle: 'saodat.art',
      bio: 'Grafik dizayner & Illustrator',
      bg: 'bg-amber-50',
      headerBg: 'bg-gradient-to-r from-amber-400 to-orange-500',
      textColor: 'text-amber-900',
      subText: 'text-amber-600',
      btnBg: 'bg-amber-500',
      btnText: 'text-white',
      secondBtn: 'bg-amber-100 text-amber-800',
      border: 'border border-amber-200',
      avatarBg: 'bg-amber-200',
      avatarText: 'text-amber-800',
    },
    {
      name: 'Soft Pastel',
      desc: 'Yumshoq va iliq ranglar',
      user: 'Nilufar Beauty',
      handle: 'nilufar.beauty',
      bio: 'Kosmetolog & Vizajist',
      bg: 'bg-rose-50',
      headerBg: 'bg-gradient-to-r from-rose-300 to-pink-300',
      textColor: 'text-rose-900',
      subText: 'text-rose-500',
      btnBg: 'bg-rose-400',
      btnText: 'text-white',
      secondBtn: 'bg-rose-100 text-rose-700',
      border: 'border border-rose-100',
      avatarBg: 'bg-rose-200',
      avatarText: 'text-rose-700',
    },
    {
      name: 'Dark Glass',
      desc: 'Zamonavoy glassmorphism',
      user: 'Cyber Pro',
      handle: 'cyberpro',
      bio: 'Kiberxavfsizlik mutaxassisi',
      bg: 'bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900',
      headerBg: 'bg-white/5 backdrop-blur',
      textColor: 'text-white',
      subText: 'text-purple-300',
      btnBg: 'bg-white/10 backdrop-blur border border-white/20',
      btnText: 'text-white',
      secondBtn: 'bg-white/5 text-white/70 border border-white/10',
      border: 'border border-white/10',
      avatarBg: 'bg-purple-500/30',
      avatarText: 'text-white',
    },
    {
      name: 'Bold Creator',
      desc: 'Kontent yaratuvchilar uchun',
      user: 'UzContent',
      handle: 'uzcontent',
      bio: 'YouTuber · 200K obunachi',
      bg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      headerBg: 'bg-black/20',
      textColor: 'text-white',
      subText: 'text-yellow-100',
      btnBg: 'bg-black',
      btnText: 'text-white',
      secondBtn: 'bg-white/20 text-white',
      border: 'border border-yellow-300/30',
      avatarBg: 'bg-white/30',
      avatarText: 'text-orange-900',
    },
  ];

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(templates.length - 2.2) * 280}px`]);
  const xSpring = useSpring(x, { stiffness: 80, damping: 20 });

  return (
    <section
      id="shablonlar"
      ref={sectionRef}
      style={{ height: `${templates.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">Shablonlar</p>
            <h2 className="text-[40px] lg:text-[52px] font-black tracking-tight text-zinc-900" style={{ fontFamily: "'Georgia', serif" }}>
              Tayyor shablonlar
            </h2>
            <p className="mt-3 text-[17px] text-zinc-500">
              Turli uslubdagi sahifalardan birini tanlang va o'zingizga moslashtiring
            </p>
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            style={{ x: xSpring }}
            className="flex gap-6 pl-[max(40px,calc((100vw-1280px)/2+40px))]"
          >
            {templates.map((t, i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-[260px] h-[480px] rounded-[32px] overflow-hidden shadow-2xl ${t.bg} ${t.border} flex flex-col`}
              >
                {/* Phone header */}
                <div className={`${t.headerBg} h-28 flex items-end pb-3 px-4 relative`}>
                  <div className="absolute top-4 left-0 right-0 flex justify-center gap-1">
                    <div className="w-8 h-1 rounded-full bg-white/30" />
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${t.avatarBg} flex items-center justify-center text-[18px] font-black ${t.avatarText} shadow-md`}>
                    {t.user[0]}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                  <div className={`text-[14px] font-bold mb-0.5 ${t.textColor}`}>{t.user}</div>
                  <div className={`text-[11px] mb-1 ${t.subText}`}>@{t.handle}</div>
                  <div className={`text-[11px] mb-4 ${t.subText}`}>{t.bio}</div>

                  {/* Buttons */}
                  <div className="space-y-2 mb-4">
                    {['Bog\'lanish', 'Portfolio ko\'rish'].map((btn, bi) => (
                      <div
                        key={bi}
                        className={`w-full py-2.5 px-4 rounded-xl text-center text-[11px] font-semibold ${
                          bi === 0 ? `${t.btnBg} ${t.btnText}` : t.secondBtn
                        }`}
                      >
                        {btn}
                      </div>
                    ))}
                  </div>

                  {/* Social icons */}
                  <div className="flex gap-2 justify-center mb-4">
                    {[<Icons.Instagram key="i" />, <Icons.Telegram key="t" />, <Icons.Facebook key="f" />].map((Icon, ii) => (
                      <div
                        key={ii}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.secondBtn}`}
                      >
                        {Icon}
                      </div>
                    ))}
                  </div>

                  {/* Label */}
                  <div className="text-center">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${t.subText}`}>{t.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="text-center mt-8">
          <p className="text-[12px] text-zinc-400 font-medium">↓ Davom etish uchun aylantiring</p>
        </div>
      </div>
    </section>
  );
}
