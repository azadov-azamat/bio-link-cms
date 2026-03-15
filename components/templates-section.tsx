"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Icons } from "./icons";
import { useI18n } from "./i18n-provider";
import { TEMPLATE_STYLE_PRESETS } from "./template-presets";

export function TemplatesSection() {
  const { t } = useI18n();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const templates = t.templates.items.map((item, i) => ({ ...item, ...TEMPLATE_STYLE_PRESETS[i] }));

  const CARD_WIDTH = 260;
  const GAP = 24;
  const CARD_STEP = CARD_WIDTH + GAP;

  const activeIndexMotion = useTransform(scrollYProgress, [0, 1], [0, templates.length - 1]);

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

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => activeIndexMotion.on("change", (v) => setActiveIndex(Math.round(v))), [activeIndexMotion]);

  const renderTemplateCard = (tItem: (typeof templates)[number], i: number, mobile = false) => {
    const isActive = i === activeIndex;
    const relativeIndex = i - activeIndex;

    return (
      <motion.div
        key={`${tItem.handle}-${i}`}
        animate={
          mobile
            ? {
                scale: isActive ? 1 : 0.95,
                opacity: relativeIndex < 0 ? 0 : relativeIndex > 2 ? 0 : isActive ? 1 : 0.72,
                y: relativeIndex < 0 ? -140 : relativeIndex * 16,
              }
            : { scale: isActive ? 1.12 : 0.88, opacity: isActive ? 1 : 0.55, y: isActive ? -8 : 0 }
        }
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        style={{ width: CARD_WIDTH, flexShrink: 0, zIndex: templates.length - i }}
        className={`h-115 rounded-4xl overflow-hidden shadow-2xl ${tItem.bg} ${tItem.border} flex flex-col absolute left-1/2 -translate-x-1/2`}
      >
        <div className={`${tItem.headerBg} h-28 flex items-end pb-3 px-4 relative`}>
          <div className="absolute top-3 left-0 right-0 flex justify-center"><div className="w-8 h-1 rounded-full bg-white/30" /></div>
          <div className={`w-12 h-12 rounded-2xl ${tItem.avatarBg} flex items-center justify-center text-[18px] font-black ${tItem.avatarText} shadow-md`}>{tItem.user[0]}</div>
        </div>

        <div className="flex-1 p-4 flex flex-col">
          <div className={`text-[14px] font-bold mb-0.5 ${tItem.textColor}`}>{tItem.user}</div>
          <div className={`text-[11px] mb-0.5 ${tItem.subText}`}>@{tItem.handle}</div>
          <div className={`text-[11px] mb-4 ${tItem.subText}`}>{tItem.bio}</div>

          <div className="space-y-2 mb-4">
            {[t.templates.ctaPrimary, t.templates.ctaSecondary].map((btn, bi) => (
              <div key={bi} className={`w-full py-2.5 px-4 rounded-xl text-center text-[11px] font-semibold ${bi === 0 ? `${tItem.btnBg} ${tItem.btnText}` : tItem.secondBtn}`}>
                {btn}
              </div>
            ))}
          </div>

          <div className="flex gap-2 justify-center mb-3">
            {[<Icons.Instagram key="i" />, <Icons.Telegram key="t" />, <Icons.Facebook key="f" />].map((s, ind) => (
              <div key={ind} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${tItem.secondBtn}`}>{s}</div>
            ))}
          </div>

          <div className="text-center mt-auto"><span className={`text-[10px] font-bold uppercase tracking-widest ${tItem.subText}`}>{tItem.name}</span></div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="shablonlar" ref={sectionRef} style={{ height: `${templates.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-[#FAFAF9]">
        <div className="text-center mb-12 px-5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">{t.templates.eyebrow}</p>
            <h2 className="text-[40px] lg:text-[52px] font-black tracking-tight text-zinc-900" style={{ fontFamily: "'Georgia', serif" }}>{t.templates.title}</h2>
            <p className="mt-3 text-[16px] text-zinc-500">{t.templates.subtitle}</p>
          </motion.div>
        </div>

        <div className="relative h-125 overflow-visible hidden md:block">
          <motion.div className="absolute top-0 flex items-center" style={{ x, gap: GAP }}>
            {templates.map((tItem, i) => {
              return (
                <motion.div key={`${tItem.handle}-${i}`} style={{ width: CARD_WIDTH, flexShrink: 0 }} className="relative h-115">
                  {renderTemplateCard(tItem, i)}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="relative h-125 overflow-hidden md:hidden px-2">
          {templates.map((tItem, i) => renderTemplateCard(tItem, i, true))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {templates.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-zinc-900' : 'w-1.5 bg-zinc-300'}`} />
          ))}
        </div>

        <p className="text-center text-[12px] text-zinc-400 mt-4">{t.templates.scrollHint}</p>
      </div>
    </section>
  );
}
