"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useI18n } from "./i18n-provider";
import { TemplateCard } from "./onboarding/template-card";
import { TEMPLATE_NAMES } from "./onboarding/utils";

export function TemplatesSection() {
  const { t } = useI18n();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const templates = t.templates.items;

  const CARD_WIDTH = 260;
  const GAP = 24;
  const CARD_STEP = CARD_WIDTH + GAP;

  const activeIndexMotion = useTransform(scrollYProgress, [0, 1], [0, templates.length - 1]);

  const [viewportW, setViewportW] = useState(1280);
  const [viewportH, setViewportH] = useState(900);
  useEffect(() => {
    const update = () => {
      setViewportW(window.innerWidth);
      setViewportH(window.innerHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const mobileCardWidth = Math.max(220, Math.min(320, viewportW - 56));
  const mobileCardHeight = Math.max(360, Math.min(460, Math.round(viewportH * 0.52)));
  const mobileStageHeight = mobileCardHeight + 40;

  const startX = viewportW / 2 - CARD_WIDTH / 2;
  const endX = startX - (templates.length - 1) * CARD_STEP;

  const rawX = useTransform(scrollYProgress, [0, 1], [startX, endX]);
  const x = useSpring(rawX, { stiffness: 80, damping: 20 });

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => activeIndexMotion.on("change", (v) => setActiveIndex(Math.round(v))), [activeIndexMotion]);

  const renderTemplateCard = (_tItem: (typeof templates)[number], i: number, mobile = false) => {
    const isActive = i === activeIndex;
    const relativeIndex = i - activeIndex;
    const cardWidth = mobile ? mobileCardWidth : CARD_WIDTH;
    const cardHeight = mobile ? mobileCardHeight : undefined;
    const templateName = TEMPLATE_NAMES[i] ?? TEMPLATE_NAMES[0];

    return (
      <motion.div
        key={`${templateName}-${i}`}
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
        style={{ width: cardWidth, height: cardHeight, flexShrink: 0, zIndex: templates.length - i }}
        className={`absolute left-1/2 -translate-x-1/2 ${mobile ? "" : "h-115"}`}
      >
        <TemplateCard
          templateName={templateName}
          variant="showcase"
          className="w-full h-full shadow-2xl"
          showTemplateName
        />
      </motion.div>
    );
  };

  return (
    <section id="shablonlar" ref={sectionRef} style={{ height: `${templates.length * 100}svh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden bg-[#FAFAF9] py-5 md:h-screen md:justify-center md:py-0">
        <div className="text-center mb-6 px-5 shrink-0 md:mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">{t.templates.eyebrow}</p>
            <h2 className="text-[30px] leading-[0.95] sm:text-[34px] md:text-[40px] lg:text-[52px] font-black tracking-tight text-zinc-900" style={{ fontFamily: "'Georgia', serif" }}>{t.templates.title}</h2>
            <p className="mt-3 max-w-[22rem] mx-auto text-[14px] sm:text-[15px] md:text-[16px] text-zinc-500">{t.templates.subtitle}</p>
          </motion.div>
        </div>

        <div className="relative h-125 overflow-visible hidden md:block">
          <motion.div className="absolute top-0 flex items-center" style={{ x, gap: GAP }}>
            {templates.map((tItem, i) => {
              return (
                <motion.div key={`${TEMPLATE_NAMES[i] ?? i}-${i}`} style={{ width: CARD_WIDTH, flexShrink: 0 }} className="relative h-115">
                  {renderTemplateCard(tItem, i)}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="relative overflow-hidden px-4 shrink-0 md:hidden" style={{ height: mobileStageHeight }}>
          {templates.map((tItem, i) => renderTemplateCard(tItem, i, true))}
        </div>

        <div className="shrink-0 mt-4 md:mt-8">
          <div className="flex justify-center gap-2">
            {templates.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-zinc-900' : 'w-1.5 bg-zinc-300'}`} />
            ))}
          </div>

          <p className="text-center text-[11px] md:text-[12px] text-zinc-400 mt-3 md:mt-4">{t.templates.scrollHint}</p>
        </div>
      </div>
    </section>
  );
}
