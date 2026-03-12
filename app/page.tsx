'use client'

// import { useState, useRef, useEffect } from 'react'
// import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
// import { ChevronDown, Menu, X, ChevronLeft, ChevronRight, Check } from 'lucide-react'
// import Navbar from '@/components/navbar'
// import Hero from '@/components/hero'
// import Trust from '@/components/trust'
// import Features from '@/components/features'
// import TemplateCarousel from '@/components/template-carousel'
// import HowItWorks from '@/components/how-it-works'
// import CTA from '@/components/cta'
// import FAQ from '@/components/faq'
// import Footer from '@/components/footer'

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-white">
//       <Navbar />
//       <Hero />
//       <Trust />
//       <Features />
//       <TemplateCarousel />
//       <HowItWorks />
//       <CTA />
//       <FAQ />
//       <Footer />
//     </main>
//   )
// }
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// ============================================================
// ICONS (inline SVG components)
// ============================================================
const Icons = {
  Logo: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="10" fill="#111" />
      <path d="M8 10h10a6 6 0 010 12H8V10z" fill="white" opacity="0.9" />
      <circle cx="22" cy="16" r="3" fill="#6EE7B7" />
    </svg>
  ),
  Menu: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6h16M3 11h16M3 16h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>,
  X: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>,
  ChevronDown: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Globe: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" /><path d="M10 2c0 0-3 3-3 8s3 8 3 8M10 2c0 0 3 3 3 8s-3 8-3 8M2 10h16" stroke="currentColor" strokeWidth="1.5" /></svg>,
  Link: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 12l4-4M6 10l-1.5 1.5a3.5 3.5 0 004.95 4.95L11 14.9M14 10l1.5-1.5a3.5 3.5 0 00-4.95-4.95L9 5.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  Clock: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  MapPin: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5" /><circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" /></svg>,
  Phone: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 3h3l1.5 3.5-2 1.2a9 9 0 004.8 4.8l1.2-2L17 11.5V14.5A2.5 2.5 0 0114.5 17C8 17 3 12 3 5.5A2.5 2.5 0 015.5 3H5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Palette: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 100 16 4 4 0 000-8 4 4 0 010-8z" stroke="currentColor" strokeWidth="1.5" /><circle cx="6" cy="8" r="1.2" fill="currentColor" /><circle cx="14" cy="8" r="1.2" fill="currentColor" /><circle cx="10" cy="6" r="1.2" fill="currentColor" /></svg>,
  Zap: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Smartphone: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="5" y="2" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="10" cy="16" r="0.8" fill="currentColor" /></svg>,
  Image: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="7" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M2 14l4-4 3 3 3-3 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Instagram: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>,
  Telegram: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Twitter: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 4s-2.7 1-4.2 1.3A6.1 6.1 0 004 9v1A14.5 14.5 0 012 5s-4 9 5 13a15.8 15.8 0 01-9 2c9 5 20 0 20-11.5 0-.28-.03-.55-.08-.82C19.14 6.55 22 4 22 4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Facebook: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Youtube: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 8s-.3-2-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C15.6 4 12 4 12 4s-3.6 0-5.8.2c-.6 0-1.9 0-3 1.2C2.3 6 2 8 2 8S1.8 10.3 1.8 12.6v2.1c0 2.3.2 4.6.2 4.6s.3 2 1.2 2.7c1.1 1.1 2.6 1.1 3.3 1.1C8.7 23.2 12 23.2 12 23.2s3.6 0 5.8-.3c.6 0 1.9 0 3-1.2.9-.7 1.2-2.7 1.2-2.7s.2-2.3.2-4.6v-2.2C22.2 10.2 22 8 22 8z" stroke="currentColor" strokeWidth="1.8" /><polygon points="10,8.5 15,12 10,15.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" /></svg>,
};

// ============================================================
// NAVBAR
// ============================================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const links = [
    { label: "Imkoniyatlar", id: "imkoniyatlar" },
    { label: "Shablonlar", id: "shablonlar" },
    { label: "Qanday ishlaydi", id: "qanday-ishlaydi" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-100" : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 group">
            <Icons.Logo />
            <span className="text-[17px] font-bold tracking-tight text-zinc-900">BioSahifa</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="px-4 py-2 text-[14px] text-zinc-600 hover:text-zinc-900 font-medium rounded-lg hover:bg-zinc-50 transition-all"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-[14px] font-medium text-zinc-700 hover:text-zinc-900 transition-colors">
              Kirish
            </button>
            <button
              onClick={() => scrollTo("cta")}
              className="px-5 py-2.5 text-[14px] font-semibold bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition-all shadow-md shadow-zinc-900/10 hover:shadow-lg hover:shadow-zinc-900/20 hover:-translate-y-0.5"
            >
              Boshlash
            </button>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-white border-t border-zinc-100"
            >
              <div className="px-5 py-4 flex flex-col gap-1">
                {links.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="px-4 py-3 text-left text-[15px] font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-all"
                  >
                    {l.label}
                  </button>
                ))}
                <div className="flex gap-3 pt-3 border-t border-zinc-100 mt-2">
                  <button className="flex-1 py-3 text-[14px] font-medium text-zinc-700 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-all">
                    Kirish
                  </button>
                  <button
                    onClick={() => scrollTo("cta")}
                    className="flex-1 py-3 text-[14px] font-semibold bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition-all"
                  >
                    Boshlash
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

// ============================================================
// MOCK PROFILE CARD (reusable in hero)
// ============================================================
function ProfileCard({ theme = "light", name, handle, bio, color, accent, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-[220px] rounded-[28px] overflow-hidden shadow-2xl ${theme === "dark" ? "bg-zinc-900" : "bg-white"
        }`}
      style={{ border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)" }}
    >
      {/* Top gradient bar */}
      <div className="h-20 w-full" style={{ background: `linear-gradient(135deg, ${color}, ${accent})` }} />
      <div className="px-5 pb-5">
        {/* Avatar */}
        <div className="relative -mt-8 mb-3">
          <div
            className="w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center text-2xl font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${color}, ${accent})` }}
          >
            {name[0]}
          </div>
        </div>
        <div className={`text-[14px] font-bold mb-0.5 ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>{name}</div>
        <div className={`text-[11px] mb-2 ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>@{handle}</div>
        <div className={`text-[11px] leading-relaxed mb-4 ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>{bio}</div>

        {/* Buttons */}
        {["Bog'lanish", "Portfolio", "Telegram"].map((btn, i) => (
          <div
            key={i}
            className={`w-full py-2 px-3 mb-1.5 rounded-xl text-center text-[11px] font-semibold ${i === 0
              ? "text-white"
              : theme === "dark"
                ? "bg-white/10 text-white/80"
                : "bg-zinc-100 text-zinc-600"
              }`}
            style={i === 0 ? { background: `linear-gradient(135deg, ${color}, ${accent})` } : {}}
          >
            {btn}
          </div>
        ))}

        {/* Social */}
        <div className="flex gap-2 mt-3 justify-center">
          {[<Icons.Instagram key="i" />, <Icons.Telegram key="t" />, <Icons.Youtube key="y" />].map((Icon, i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-lg flex items-center justify-center ${theme === "dark" ? "bg-white/10 text-white/60" : "bg-zinc-100 text-zinc-500"
                }`}
            >
              {Icon}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// HERO SECTION
// ============================================================
function HeroSection() {
  const [urlText] = useState("biosahifa.uz/");
  const [typed, setTyped] = useState("");
  const phrase = "sizning-nomingiz";

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
          backgroundImage: "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Gradient orbs */}
      <div className="absolute top-32 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #6EE7B7, transparent)" }} />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #A5B4FC, transparent)" }} />

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
            {[["500+", "Foydalanuvchilar"], ["4.9★", "Reyting"], ["2 min", "O'rtacha sozlash"]].map(([val, label]) => (
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
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-10"
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
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
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute z-20"
            style={{ left: "62%", top: "20%" }}
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

// ============================================================
// TRUST SECTION
// ============================================================
function TrustSection() {
  const brands = [
    { name: "TechHub UZ", abbr: "TH" },
    { name: "Bestbrands", abbr: "BB" },
    { name: "Oʻzbekiston Branding", abbr: "UB" },
    { name: "SMMexperts", abbr: "SM" },
    { name: "Digital Agency", abbr: "DA" },
    { name: "CraftStudio", abbr: "CS" },
  ];

  return (
    <section className="py-16 bg-white border-y border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[13px] font-medium text-zinc-400 uppercase tracking-widest mb-10"
        >
          Bizneslar, mutaxassislar va brendlar uchun qulay sahifa yaratuvchi platforma
        </motion.p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {brands.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 px-5 py-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-zinc-200 hover:bg-white transition-all cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-200 flex items-center justify-center text-[11px] font-black text-zinc-600">
                {b.abbr}
              </div>
              <span className="text-[13px] font-semibold text-zinc-600">{b.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURES SECTION
// ============================================================
function FeaturesSection() {
  const features = [
    { Icon: Icons.Image, title: "Logo va brend ko'rinishi", desc: "Logotipingizni yuklang, rang va shrift tanlab, o'zingizga xos ko'rinish yarating.", accent: "#F0FDF4", border: "#86EFAC" },
    { Icon: Icons.Link, title: "Ijtimoiy tarmoqlar havolalari", desc: "Instagram, Telegram, YouTube va boshqa tarmoqlarga havolalar qo'shing.", accent: "#EFF6FF", border: "#93C5FD" },
    { Icon: Icons.Clock, title: "Ish vaqti ko'rsatish", desc: "Har kunlik ish jadvali, bayram va ta'til kunlarini batafsil ko'rsating.", accent: "#FFF7ED", border: "#FCA5A5" },
    { Icon: Icons.MapPin, title: "Manzil havolalari", desc: "Google Maps, Yandex Maps va 2GIS havolalarini bir joyga jamlang.", accent: "#FDF4FF", border: "#D8B4FE" },
    { Icon: Icons.Phone, title: "Telefon raqamlar", desc: "Bir yoki bir nechta aloqa raqamlarini qo'shing, tezkor qo'ng'iroq tugmasi bilan.", accent: "#F0FDFA", border: "#6EE7B7" },
    { Icon: Icons.Globe, title: "Shaxsiy havola", desc: "biosahifa.uz/ismingiz ko'rinishida o'zingizning maxsus havolangizni oling.", accent: "#FAFAFA", border: "#D1D5DB" },
    { Icon: Icons.Zap, title: "Tez sozlash", desc: "Ro'yxatdan o'tish va sozlashni 2-3 daqiqada yakunlang. Murakkab texnik bilim shart emas.", accent: "#FEFCE8", border: "#FDE047" },
    { Icon: Icons.Smartphone, title: "Mobilga mos dizayn", desc: "Barcha qurilmalarda, jumladan smartfon va planshetlarda mukammal ko'rinadi.", accent: "#EFF6FF", border: "#93C5FD" },
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
          <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">Imkoniyatlar</p>
          <h2 className="text-[40px] lg:text-[52px] font-black tracking-tight text-zinc-900 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
            Hamma narsa bir joyda
          </h2>
          <p className="mt-4 text-[17px] text-zinc-500 max-w-[500px] mx-auto leading-relaxed">
            Sahifangizni to'liq boshqarish uchun kerakli barcha vositalar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ Icon, title, desc, accent, border }, i) => (
            <motion.div
              key={title}
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
              <h3 className="text-[15px] font-bold text-zinc-900 mb-2 leading-snug">{title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AUTOPLAY CAROUSEL
// ============================================================
function CarouselSection() {
  const containerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const steps = [
    { icon: "🔐", title: "Tizimga kiring", text: "Email yoki telefon raqami orqali tez ro'yxatdan o'ting" },
    { icon: "🖼️", title: "Logotip yuklang", text: "Kompaniya logotipi yoki shaxsiy rasmingizni qo'shing" },
    { icon: "✏️", title: "Sarlavha va tavsif", text: "Kim ekanligingizni qisqacha va aniq ifodalang" },
    { icon: "🔗", title: "Ijtimoiy tarmoqlar", text: "Barcha tarmoqlarga havolalarni bir joyga yig'ing" },
    { icon: "🕐", title: "Ish vaqtini belgilang", text: "Dushanba–Juma: 9:00–18:00 formatida ko'rsating" },
    { icon: "📍", title: "Manzil havolalari", text: "Google, Yandex, 2GIS xarita havolalarini joylashtiring" },
    { icon: "🚀", title: "Sahifani chop eting", text: "Bir tugma bosamiz — sahifangiz darhol onlayn!" },
    { icon: "📲", title: "Havolani ulashing", text: "biosahifa.uz/ismingiz — barcha joyda ulashing" },
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
            animation: paused ? "none" : "scroll-x 28s linear infinite",
            width: "max-content",
          }}
        >
          {doubled.map((step, i) => (
            <div
              key={i}
              className="w-[240px] flex-shrink-0 bg-zinc-50 border border-zinc-100 rounded-2xl p-6 hover:bg-white hover:border-zinc-200 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-4">{step.icon}</div>
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                {String(i % steps.length + 1).padStart(2, "0")}
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

// ============================================================
// TEMPLATES SECTION (Pinned Horizontal Scroll)
// ============================================================
function TemplatesSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const templates = [
    {
      name: "Minimal Oq",
      desc: "Toza, minimal dizayn",
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
      desc: "Elegant qora uslub",
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
      gradient: "from-zinc-700 to-zinc-900",
    },
    {
      name: "Rang Gradient",
      desc: "Quvnoq rang sxemasi",
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
      desc: "Korporativ, jiddiy ko'rinish",
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
      desc: "San'atkorlar uchun mo'ljallangan",
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
      desc: "Yumshoq va iliq ranglar",
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
      desc: "Zamonaviy glassmorphism",
      user: "Cyber Pro",
      handle: "cyberpro",
      bio: "Kiberxavfsizlik mutaxassisi",
      bg: "bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900",
      headerBg: "bg-white/5 backdrop-blur",
      textColor: "text-white",
      subText: "text-purple-300",
      btnBg: "bg-white/10 backdrop-blur border border-white/20",
      btnText: "text-white",
      secondBtn: "bg-white/5 text-white/70 border border-white/10",
      border: "border border-white/10",
      avatarBg: "bg-purple-500/30",
      avatarText: "text-white",
    },
    {
      name: "Bold Creator",
      desc: "Kontent yaratuvchilar uchun",
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

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(templates.length - 2.2) * 280}px`]);
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
                    {["Bog'lanish", "Portfolio ko'rish"].map((btn, bi) => (
                      <div
                        key={bi}
                        className={`w-full py-2.5 px-4 rounded-xl text-center text-[11px] font-semibold ${bi === 0 ? `${t.btnBg} ${t.btnText}` : t.secondBtn
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

// ============================================================
// HOW IT WORKS
// ============================================================
function HowItWorksSection() {
  const steps = [
    { n: "01", title: "Ro'yxatdan o'ting", desc: "Email yoki telefon raqamingiz bilan tezda ro'yxatdan o'ting. 1 daqiqa ham ketmaydi.", icon: "📝" },
    { n: "02", title: "Ma'lumotlaringizni kiriting", desc: "Logo, sarlavha, tavsif, telefon, manzil va barcha kerakli ma'lumotlarni qo'shing.", icon: "📋" },
    { n: "03", title: "Dizaynni tanlang", desc: "Ko'plab tayyor shablonlardan birini tanlang va ranglar, fontlarni o'zingizga moslang.", icon: "🎨" },
    { n: "04", title: "Havolangizni ulashing", desc: "biosahifa.uz/ismingiz — bu havolani Instagram bio, kartochka yoki WhatsApp'ga qo'ying.", icon: "🔗" },
  ];

  return (
    <section id="qanday-ishlaydi" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">Jarayon</p>
          <h2 className="text-[40px] lg:text-[52px] font-black tracking-tight text-zinc-900" style={{ fontFamily: "'Georgia', serif" }}>
            Qanday ishlaydi
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-zinc-100 z-0" style={{ width: "calc(100% - 40px)", left: "calc(100% + 12px)" }} />
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

// ============================================================
// FINAL CTA
// ============================================================
function CTASection() {
  return (
    <section id="cta" className="py-24 bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 30% 50%, #6EE7B7, transparent 60%), radial-gradient(circle at 70% 50%, #A5B4FC, transparent 60%)",
      }} />
      <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[42px] lg:text-[60px] font-black text-white leading-tight mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            Bugunoq o'z<br />
            <span className="italic text-zinc-400">sahifangizni</span><br />
            yarating
          </h2>
          <p className="text-[17px] text-zinc-400 mb-10 leading-relaxed">
            Biznesingiz yoki shaxsiy brendingiz uchun zamonaviy mini-saytni<br />
            bir necha daqiqada ishga tushiring.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-zinc-900 text-[15px] font-bold rounded-2xl hover:bg-zinc-100 transition-all shadow-xl hover:-translate-y-0.5">
              Boshlash
            </button>
            <button className="px-8 py-4 bg-white/10 text-white text-[15px] font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5">
              Demo ko'rish
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================
function FAQSection() {
  const [open, setOpen] = useState(null);

  const faqs = [
    { q: "Bu platforma nima uchun kerak?", a: "BioSahifa sizga o'z biznesingiz yoki shaxsiy brendingiz uchun professional mini-veb-sayt yaratish imkonini beradi. Barcha aloqa ma'lumotlari, havolalar va ish vaqti bitta sahifada — tez topiladi, qulay ulashiladi." },
    { q: "Sahifani yaratish qancha vaqt oladi?", a: "O'rtacha 2–3 daqiqa. Ro'yxatdan o'tish, ma'lumot kiritish va sahifani nashr etish — barchasi juda oddiy va tezkor jarayon." },
    { q: "Telefon va ijtimoiy tarmoqlarni qo'sha olamanmi?", a: "Ha, albatta. Instagram, Telegram, YouTube, Facebook, TikTok va boshqa barcha ijtimoiy tarmoq havolalarini, shuningdek telefon raqamlarini qo'shish mumkin." },
    { q: "Manzil havolalarini joylashtira olamanmi?", a: "Ha. Google Maps, Yandex Maps va 2GIS xarita havolalarini sahifangizga qo'shishingiz mumkin. Mijozlaringiz bir bosganda sizning joylashuvingizga yo'l topa oladi." },
    { q: "Dizaynni keyin o'zgartirish mumkinmi?", a: "Albatta. Sahifangizni istalgan vaqt tahrirlashingiz — shablon almashtirish, rang va matnlarni yangilash mumkin. O'zgarishlar darhol kuchga kiradi." },
    { q: "Sahifam mobil qurilmalarda ishlaydimi?", a: "Ha, barcha shablonlar to'liq mobil moslashtirilgan. Smartfon, planshet va kompyuterda bir xil sifatli ko'rinadi." },
  ];

  return (
    <section id="faq" className="py-24 bg-[#FAFAF9]">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="text-[40px] lg:text-[52px] font-black tracking-tight text-zinc-900" style={{ fontFamily: "'Georgia', serif" }}>
            Ko'p so'raladigan savollar
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${open === i ? "border-zinc-200 shadow-md" : "border-zinc-100"}`}
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-[15px] font-semibold text-zinc-900">{faq.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0 text-zinc-400"
                >
                  <Icons.ChevronDown />
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pb-5 text-[14px] text-zinc-500 leading-relaxed border-t border-zinc-50 pt-4">
                      {faq.a}
                    </div>
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

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="py-16 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Icons.Logo />
              <span className="text-[17px] font-bold">BioSahifa</span>
            </div>
            <p className="text-[14px] text-zinc-400 leading-relaxed max-w-[300px]">
              Bizneslar va shaxslar uchun professional mini-veb-sayt yaratuvchi platforma.
            </p>
            <div className="flex gap-3 mt-6">
              {[<Icons.Instagram key="i" />, <Icons.Telegram key="t" />, <Icons.Facebook key="f" />, <Icons.Youtube key="y" />].map((Icon, i) => (
                <div key={i} className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer">
                  {Icon}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Platforma</div>
            <div className="space-y-3">
              {["Imkoniyatlar", "Shablonlar", "Narxlar", "Blog"].map((l) => (
                <div key={l} className="text-[14px] text-zinc-400 hover:text-white cursor-pointer transition-colors">{l}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Yordam</div>
            <div className="space-y-3">
              {["Qo'llanma", "FAQ", "Bog'lanish", "Maxfiylik"].map((l) => (
                <div key={l} className="text-[14px] text-zinc-400 hover:text-white cursor-pointer transition-colors">{l}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-zinc-600">
          <span>© 2025 BioSahifa. Barcha huquqlar himoyalangan.</span>
          <span>O'zbekiston · biosahifa.uz</span>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.fontFamily = "'system-ui', '-apple-system', 'sans-serif'";
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <CarouselSection />
      <TemplatesSection />
      <HowItWorksSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </div>
  );
}