"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Icons } from "./icons";

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
  gradient?: string;
}

export function TemplatesSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const templates = [
    {
      name: "Minimal Oq",
      user: "Aziza Karimova",
      handle: "aziza.design",
      bio: "UX/UI Designer",
      bg: "bg-white",
      headerBg: "bg-zinc-100",
      textColor: "text-zinc-900",
      subText: "text-zinc-500",
      btnBg: "bg-zinc-900",
      btnText: "text-white",
      secondBtn: "bg-zinc-100 text-zinc-700",
      border: "border border-zinc-200",
      avatarBg: "bg-zinc-200",
      avatarText: "text-zinc-700",
    },
    {
      name: "Qora Premium",
      user: "Jasur Toshmatov",
      handle: "jasur.pro",
      bio: "Fotograf & Videograf",
      bg: "bg-zinc-950",
      headerBg: "bg-zinc-800",
      textColor: "text-white",
      subText: "text-zinc-400",
      btnBg: "bg-white",
      btnText: "text-zinc-900",
      secondBtn: "bg-zinc-800 text-zinc-300",
      border: "border border-zinc-800",
      avatarBg: "bg-zinc-700",
      avatarText: "text-white",
    },
    {
      name: "Rang Gradient",
      user: "Malika Umarova",
      handle: "malika.uz",
      bio: "SMM ekspert & Blogger",
      bg: "bg-gradient-to-br from-violet-50 to-pink-50",
      headerBg: "bg-gradient-to-r from-violet-500 to-pink-500",
      textColor: "text-violet-900",
      subText: "text-violet-500",
      btnBg: "bg-gradient-to-r from-violet-500 to-pink-500",
      btnText: "text-white",
      secondBtn: "bg-violet-100 text-violet-700",
      border: "border border-violet-100",
      avatarBg: "bg-violet-200",
      avatarText: "text-violet-800",
    },
    {
      name: "Biznes Uslubi",
      user: "NexaCorp",
      handle: "nexacorp",
      bio: "IT kompaniya · Toshkent",
      bg: "bg-slate-50",
      headerBg: "bg-slate-800",
      textColor: "text-slate-900",
      subText: "text-slate-500",
      btnBg: "bg-slate-800",
      btnText: "text-white",
      secondBtn: "bg-slate-200 text-slate-700",
      border: "border border-slate-200",
      avatarBg: "bg-slate-300",
      avatarText: "text-slate-700",
    },
    {
      name: "Kreativ",
      user: "Studio Saodat",
      handle: "saodat.art",
      bio: "Grafik dizayner & Illustrator",
      bg: "bg-amber-50",
      headerBg: "bg-gradient-to-r from-amber-400 to-orange-500",
      textColor: "text-amber-900",
      subText: "text-amber-600",
      btnBg: "bg-amber-500",
      btnText: "text-white",
      secondBtn: "bg-amber-100 text-amber-800",
      border: "border border-amber-200",
      avatarBg: "bg-amber-200",
      avatarText: "text-amber-800",
    },
    {
      name: "Soft Pastel",
      user: "Nilufar Beauty",
      handle: "nilufar.beauty",
      bio: "Kosmetolog & Vizajist",
      bg: "bg-rose-50",
      headerBg: "bg-gradient-to-r from-rose-300 to-pink-300",
      textColor: "text-rose-900",
      subText: "text-rose-500",
      btnBg: "bg-rose-400",
      btnText: "text-white",
      secondBtn: "bg-rose-100 text-rose-700",
      border: "border border-rose-100",
      avatarBg: "bg-rose-200",
      avatarText: "text-rose-700",
    },
    {
      name: "Dark Glass",
      user: "Cyber Pro",
      handle: "cyberpro",
      bio: "Kiberxavfsizlik mutaxassisi",
      bg: "bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900",
      headerBg: "bg-white/5",
      textColor: "text-white",
      subText: "text-purple-300",
      btnBg: "bg-white/10 border border-white/20",
      btnText: "text-white",
      secondBtn: "bg-white/5 text-white/70 border border-white/10",
      border: "border border-white/10",
      avatarBg: "bg-purple-500/30",
      avatarText: "text-white",
    },
    {
      name: "Bold Creator",
      user: "UzContent",
      handle: "uzcontent",
      bio: "YouTuber · 200K obunachi",
      bg: "bg-gradient-to-br from-yellow-400 to-orange-500",
      headerBg: "bg-black/20",
      textColor: "text-white",
      subText: "text-yellow-100",
      btnBg: "bg-black",
      btnText: "text-white",
      secondBtn: "bg-white/20 text-white",
      border: "border border-yellow-300/30",
      avatarBg: "bg-white/30",
      avatarText: "text-orange-900",
    },
  ];

  const CARD_WIDTH = 260;
  const GAP = 24;
  const CARD_STEP = CARD_WIDTH + GAP;

  // scroll progress → center index (0 dan templates.length-1 gacha)
  const activeIndexMotion = useTransform(
    scrollYProgress,
    [0, 1],
    [0, templates.length - 1],
  );

  // scroll progress → translateX
  // Birinchi karta o'rtada turishi uchun offset hisobi:
  // center = window/2 - CARD_WIDTH/2
  // keyin har bir scroll stepda CARD_STEP ga chapga siljiydi
  const [viewportW, setViewportW] = useState(1280);
  useEffect(() => {
    const update = () => setViewportW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const startX = viewportW / 2 - CARD_WIDTH / 2;
  const endX = startX - (templates.length - 1) * CARD_STEP;

  const rawX = useTransform(scrollYProgress, [0, 1], [startX, endX]);
  const x = useSpring(rawX, { stiffness: 80, damping: 20 });

  // Active index (rounded) — scale effekti uchun
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    return activeIndexMotion.on("change", (v) => {
      setActiveIndex(Math.round(v));
    });
  }, [activeIndexMotion]);

  return (
    <section
      id="shablonlar"
      ref={sectionRef}
      style={{ height: `${templates.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-[#FAFAF9]">
        {/* Header */}
        <div className="text-center mb-12 px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">
              Shablonlar
            </p>
            <h2
              className="text-[40px] lg:text-[52px] font-black tracking-tight text-zinc-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Tayyor shablonlar
            </h2>
            <p className="mt-3 text-[16px] text-zinc-500">
              Turli uslubdagi sahifalardan birini tanlang va o'zingizga
              moslashtiring
            </p>
          </motion.div>
        </div>

        {/* Cards track */}
        <div className="relative h-125 overflow-visible">
          <motion.div
            className="absolute top-0 flex items-center"
            style={{ x, gap: GAP }}
          >
            {templates.map((t, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.div
                  key={i}
                  animate={{
                    scale: isActive ? 1.12 : 0.88,
                    opacity: isActive ? 1 : 0.55,
                    y: isActive ? -8 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  style={{ width: CARD_WIDTH, flexShrink: 0 }}
                  className={`h-115 rounded-4xl overflow-hidden shadow-2xl ${t.bg} ${t.border} flex flex-col`}
                >
                  {/* Phone header bar */}
                  <div
                    className={`${t.headerBg} h-28 flex items-end pb-3 px-4 relative`}
                  >
                    <div className="absolute top-3 left-0 right-0 flex justify-center">
                      <div className="w-8 h-1 rounded-full bg-white/30" />
                    </div>
                    <div
                      className={`w-12 h-12 rounded-2xl ${t.avatarBg} flex items-center justify-center text-[18px] font-black ${t.avatarText} shadow-md`}
                    >
                      {t.user[0]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col">
                    <div
                      className={`text-[14px] font-bold mb-0.5 ${t.textColor}`}
                    >
                      {t.user}
                    </div>
                    <div className={`text-[11px] mb-0.5 ${t.subText}`}>
                      @{t.handle}
                    </div>
                    <div className={`text-[11px] mb-4 ${t.subText}`}>
                      {t.bio}
                    </div>

                    <div className="space-y-2 mb-4">
                      {["Bog'lanish", "Portfolio ko'rish"].map((btn, bi) => (
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

                    <div className="flex gap-2 justify-center mb-3">
                      {[
                        <Icons.Instagram key="i" />,
                        <Icons.Telegram key="t" />,
                        <Icons.Facebook key="f" />,
                      ].map((s, ind) => (
                        <div
                          key={ind}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${t.secondBtn}`}
                        >
                          {s}
                        </div>
                      ))}
                    </div>

                    <div className="text-center mt-auto">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest ${t.subText}`}
                      >
                        {t.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {templates.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-zinc-900" : "w-1.5 bg-zinc-300"
              }`}
            />
          ))}
        </div>

        <p className="text-center text-[12px] text-zinc-400 mt-4">
          ↓ Davom etish uchun aylantiring
        </p>
      </div>
    </section>
  );
}