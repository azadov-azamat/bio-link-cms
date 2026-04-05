'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from './icons';
import { useI18n } from './i18n-provider';
import { useHomeEntry } from './use-home-entry';

export function HowItWorksSection() {
  const { t } = useI18n();

  return (
    <section id="qanday-ishlaydi" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">{t.howItWorks.eyebrow}</p>
          <h2 className="text-[40px] lg:text-[52px] font-black tracking-tight text-zinc-900" style={{ fontFamily: "'Georgia', serif" }}>
            {t.howItWorks.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.howItWorks.steps.map((step, i) => (
            <motion.div key={step.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="relative">
              {i < t.howItWorks.steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-zinc-100 z-0" style={{ width: 'calc(100% - 40px)', left: 'calc(100% + 12px)' }} />
              )}
              <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 hover:border-zinc-200 hover:shadow-md transition-all relative z-10">
                <div className="text-3xl mb-4">{step.icon}</div>
                <div className="text-[11px] font-black text-zinc-300 uppercase tracking-widest mb-2">{step.n}</div>
                <h3 className="text-[16px] font-bold text-zinc-900 mb-2">{step.title}</h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  const { t } = useI18n();
  const { hasStoredSession, isBootstrappingGuest, openEntry } = useHomeEntry();

  return (
    <section id="cta" className="py-24 bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #6EE7B7, transparent 60%), radial-gradient(circle at 70% 50%, #A5B4FC, transparent 60%)' }} />
      <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-[42px] lg:text-[60px] font-black text-white leading-tight mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            {t.cta.titleLine1}<br />
            <span className="italic text-zinc-400">{t.cta.titleItalic}</span><br />
            {t.cta.titleLine3}
          </h2>
          <p className="text-[17px] text-zinc-400 mb-10 leading-relaxed">
            {t.cta.descriptionLine1}<br />
            {t.cta.descriptionLine2}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => void openEntry()}
              disabled={isBootstrappingGuest}
              className="px-8 py-4 bg-white text-zinc-900 text-[15px] font-bold rounded-2xl hover:bg-zinc-100 transition-all shadow-xl hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {hasStoredSession
                ? t.navbar.login
                : isBootstrappingGuest
                  ? `${t.cta.primary}...`
                  : t.cta.primary}
            </button>
            <button className="px-8 py-4 bg-white/10 text-white text-[15px] font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5">{t.cta.secondary}</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useI18n();

  return (
    <section id="faq" className="py-24 bg-[#FAFAF9]">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">{t.faq.eyebrow}</p>
          <h2 className="text-[40px] lg:text-[52px] font-black tracking-tight text-zinc-900" style={{ fontFamily: "'Georgia', serif" }}>{t.faq.title}</h2>
        </motion.div>

        <div className="space-y-3">
          {t.faq.items.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className={`bg-white rounded-2xl border transition-all overflow-hidden ${open === i ? 'border-zinc-200 shadow-md' : 'border-zinc-100'}`}>
              <button className="w-full px-6 py-5 text-left flex items-center justify-between gap-4" onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-[15px] font-semibold text-zinc-900">{faq.q}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-zinc-400"><Icons.ChevronDown /></motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                    <div className="px-6 pb-5 text-[14px] text-zinc-500 leading-relaxed border-t border-zinc-50 pt-4">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="py-16 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4"><Icons.Logo /><span className="text-[17px] font-bold">BioSahifa</span></div>
            <p className="text-[14px] text-zinc-400 leading-relaxed max-w-75">{t.footer.description}</p>
            <div className="flex gap-3 mt-6">
              {[<Icons.Instagram key="i" />, <Icons.Telegram key="t" />, <Icons.Facebook key="f" />, <Icons.Youtube key="y" />].map((Icon, i) => (
                <div key={i} className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer">{Icon}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest mb-4">{t.footer.platformTitle}</div>
            <div className="space-y-3">{t.footer.platformLinks.map((l) => (<div key={l} className="text-[14px] text-zinc-400 hover:text-white cursor-pointer transition-colors">{l}</div>))}</div>
          </div>

          <div>
            <div className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest mb-4">{t.footer.companyTitle}</div>
            <div className="space-y-3">{t.footer.companyLinks.map((l) => (<div key={l} className="text-[14px] text-zinc-400 hover:text-white cursor-pointer transition-colors">{l}</div>))}</div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-zinc-500">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
