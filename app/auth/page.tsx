"use client";

import { useState, useRef, useCallback, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// TYPES
// ============================================================
interface OnboardingData {
  source: string;
  platforms: string[];
  template: string;
  logo: string | null;
  title: string;
  description: string;
  socials: Record<string, string>;
  workHours: string;
  phone1: string;
  phone2: string;
  googleMaps: string;
  yandexMaps: string;
  twoGis: string;
  note: string;
}

type Screen = "auth" | "onboarding" | "success";

// ============================================================
// ICONS
// ============================================================
const BrandIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="10" fill="#111" />
    <path d="M8 10h10a6 6 0 010 12H8V10z" fill="white" opacity="0.9" />
    <circle cx="22" cy="16" r="3" fill="#6EE7B7" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
      fill="#34A853"
    />
    <path
      d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      fill="#EA4335"
    />
  </svg>
);

const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#2AABEE" />
    <path
      d="M17.5 7L5 11.5l4 1.5 1.5 4.5 2.5-2.5 3.5 2.5L17.5 7z"
      fill="white"
      stroke="white"
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#1877F2" />
    <path
      d="M15 8h-2a1 1 0 00-1 1v2h3l-.5 3H12v6h-3v-6H7v-3h2V9a4 4 0 014-4h2v3z"
      fill="white"
    />
  </svg>
);

const socialIcons: Record<string, JSX.Element> = {
  Instagram: <span className="text-lg">📸</span>,
  Telegram: <span className="text-lg">✈️</span>,
  Facebook: <span className="text-lg">👤</span>,
  YouTube: <span className="text-lg">▶️</span>,
  TikTok: <span className="text-lg">🎵</span>,
  LinkedIn: <span className="text-lg">💼</span>,
  Website: <span className="text-lg">🌐</span>,
};

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2.5 7l3 3 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M10 4L6 8l4 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ============================================================
// HELPERS
// ============================================================
const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

const INITIAL_DATA: OnboardingData = {
  source: "",
  platforms: [],
  template: "",
  logo: null,
  title: "",
  description: "",
  socials: {},
  workHours: "",
  phone1: "",
  phone2: "",
  googleMaps: "",
  yandexMaps: "",
  twoGis: "",
  note: "",
};

// ============================================================
// MINI PROFILE PREVIEW
// ============================================================
interface PreviewCardProps {
  data: OnboardingData;
  compact?: boolean;
}

const PreviewCard = ({ data, compact = false }: PreviewCardProps) => {
  const activeSocials = Object.entries(data.socials).filter(([, v]) =>
    v.trim(),
  );
  const template = data.template;

  const themes: Record<
    string,
    {
      bg: string;
      header: string;
      btn: string;
      btnText: string;
      text: string;
      sub: string;
    }
  > = {
    "Minimal oq": {
      bg: "bg-white",
      header: "bg-zinc-100",
      btn: "bg-zinc-900",
      btnText: "text-white",
      text: "text-zinc-900",
      sub: "text-zinc-400",
    },
    "Qora premium": {
      bg: "bg-zinc-950",
      header: "bg-zinc-800",
      btn: "bg-white",
      btnText: "text-zinc-900",
      text: "text-white",
      sub: "text-zinc-400",
    },
    Gradient: {
      bg: "bg-gradient-to-br from-violet-50 to-pink-50",
      header: "bg-gradient-to-r from-violet-500 to-pink-500",
      btn: "bg-gradient-to-r from-violet-500 to-pink-500",
      btnText: "text-white",
      text: "text-violet-900",
      sub: "text-violet-400",
    },
    Biznes: {
      bg: "bg-slate-50",
      header: "bg-slate-800",
      btn: "bg-slate-800",
      btnText: "text-white",
      text: "text-slate-900",
      sub: "text-slate-400",
    },
    Kreativ: {
      bg: "bg-amber-50",
      header: "bg-gradient-to-r from-amber-400 to-orange-500",
      btn: "bg-amber-500",
      btnText: "text-white",
      text: "text-amber-900",
      sub: "text-amber-500",
    },
    "Soft pastel": {
      bg: "bg-rose-50",
      header: "bg-gradient-to-r from-rose-300 to-pink-300",
      btn: "bg-rose-400",
      btnText: "text-white",
      text: "text-rose-900",
      sub: "text-rose-400",
    },
    "Dark glass": {
      bg: "bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900",
      header: "bg-white/5",
      btn: "bg-white/10",
      btnText: "text-white",
      text: "text-white",
      sub: "text-purple-300",
    },
    "Bold social": {
      bg: "bg-gradient-to-br from-yellow-400 to-orange-500",
      header: "bg-black/20",
      btn: "bg-black",
      btnText: "text-white",
      text: "text-white",
      sub: "text-yellow-100",
    },
  };

  const t = themes[template] || themes["Minimal oq"];

  return (
    <div
      className={`${t.bg} rounded-2xl overflow-hidden border border-white/10 shadow-xl ${compact ? "w-40" : "w-56"}`}
    >
      <div
        className={`${t.header} ${compact ? "h-14" : "h-20"} flex items-end pb-2 px-3`}
      >
        {data.logo ? (
          <img
            src={data.logo}
            alt="logo"
            className={`${compact ? "w-8 h-8" : "w-10 h-10"} rounded-xl object-cover shadow`}
          />
        ) : (
          <div
            className={`${compact ? "w-8 h-8 text-sm" : "w-10 h-10 text-base"} rounded-xl bg-white/20 flex items-center justify-center font-black ${t.text}`}
          >
            {data.title ? data.title[0].toUpperCase() : "?"}
          </div>
        )}
      </div>
      <div className={`${compact ? "p-2.5" : "p-3"}`}>
        <div
          className={`${compact ? "text-[11px]" : "text-[13px]"} font-bold ${t.text} truncate`}
        >
          {data.title || "Sarlavha..."}
        </div>
        {!compact && (
          <div className={`text-[10px] ${t.sub} mb-3 line-clamp-2`}>
            {data.description || "Tavsif..."}
          </div>
        )}
        <div
          className={`${compact ? "py-1.5" : "py-2"} px-3 rounded-xl ${t.btn} ${t.btnText} text-[10px] font-semibold text-center mb-1.5`}
        >
          Bog'lanish
        </div>
        {!compact && activeSocials.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {activeSocials.slice(0, 4).map(([key]) => (
              <div
                key={key}
                className={`w-6 h-6 rounded-lg ${t.btn} flex items-center justify-center text-[10px]`}
              >
                {key[0]}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// AUTH PAGE
// ============================================================
interface AuthPageProps {
  onAuth: () => void;
}

const AuthPage = ({ onAuth }: AuthPageProps) => {
  return (
    <div className="min-h-screen bg-[#FAFAF9] flex">
      {/* Left — Auth Card */}
      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[400px]"
        >
          {/* Back link */}
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-[13px] text-zinc-400 hover:text-zinc-600 mb-8 transition-colors"
          >
            <ArrowLeftIcon />
            Bosh sahifaga qaytish
          </a>

          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <BrandIcon />
            <span className="text-[17px] font-bold text-zinc-900">
              BioSahifa
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[32px] font-black text-zinc-900 tracking-tight mb-2"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Tizimga kirish
          </h1>
          <p className="text-[15px] text-zinc-500 mb-8 leading-relaxed">
            Hisobingizga kiring va shaxsiy sahifangizni yaratishni boshlang.
          </p>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            {[
              {
                icon: <GoogleIcon />,
                label: "Google orqali kirish",
                bg: "bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50",
              },
              {
                icon: <FacebookIcon />,
                label: "Facebook orqali kirish",
                bg: "bg-[#1877F2] hover:bg-[#166FE5] text-white border border-transparent",
              },
              {
                icon: <TelegramIcon />,
                label: "Telegram orqali kirish",
                bg: "bg-[#2AABEE] hover:bg-[#239DD8] text-white border border-transparent",
              },
            ].map(({ icon, label, bg }) => (
              <button
                key={label}
                onClick={onAuth}
                className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[14px] font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${bg}`}
              >
                <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {icon}
                </span>
                <span className="flex-1 text-center">{label}</span>
              </button>
            ))}
          </div>

          {/* Terms */}
          <p className="mt-6 text-[12px] text-zinc-400 leading-relaxed text-center">
            Davom etish orqali siz{" "}
            <a href="#" className="text-zinc-600 underline underline-offset-2">
              foydalanish shartlari
            </a>{" "}
            va{" "}
            <a href="#" className="text-zinc-600 underline underline-offset-2">
              maxfiylik siyosatiga
            </a>{" "}
            rozilik bildirasiz.
          </p>
        </motion.div>
      </div>

      {/* Right — Preview Panel (desktop only) */}
      <div className="hidden lg:flex flex-1 bg-zinc-900 items-center justify-center relative overflow-hidden">
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, #6EE7B7, transparent 50%), radial-gradient(circle at 70% 70%, #A5B4FC, transparent 50%)",
          }}
        />
        <div className="relative z-10 text-center px-10">
          <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-6">
            Namuna sahifa
          </p>
          {/* Sample profile preview */}
          <div className="bg-white rounded-[32px] p-5 shadow-2xl mx-auto w-[220px]">
            <div className="h-16 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 mb-0 flex items-end pb-2 px-3">
              <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center text-white font-black text-base shadow">
                A
              </div>
            </div>
            <div className="pt-3 pb-1 px-1">
              <div className="text-[13px] font-bold text-zinc-900 mb-0.5">
                Aziza Karimova
              </div>
              <div className="text-[11px] text-zinc-400 mb-3">
                UX Designer · Toshkent
              </div>
              {["Bog'lanish", "Portfolio", "Telegram"].map((b, i) => (
                <div
                  key={b}
                  className={`w-full py-2 px-3 rounded-xl text-center text-[11px] font-semibold mb-1.5 ${i === 0 ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white" : "bg-zinc-100 text-zinc-600"}`}
                >
                  {b}
                </div>
              ))}
              <div className="flex gap-1.5 justify-center mt-2">
                {["📸", "✈️", "▶️"].map((ic) => (
                  <div
                    key={ic}
                    className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-[13px]"
                  >
                    {ic}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 bg-zinc-800 rounded-2xl px-5 py-3 inline-block">
            <p className="text-[12px] text-zinc-400 mb-0.5">
              Sizning havolangiz
            </p>
            <p className="text-[14px] font-bold text-white">
              biosahifa.uz/aziza
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// STEP COMPONENTS
// ============================================================

// Step 1 — Source
interface Step1Props {
  data: OnboardingData;
  onChange: (key: keyof OnboardingData, value: string) => void;
}
const Step1 = ({ data, onChange }: Step1Props) => {
  const options = [
    { label: "Instagram", icon: "📸" },
    { label: "Telegram", icon: "✈️" },
    { label: "Facebook", icon: "👤" },
    { label: "YouTube", icon: "▶️" },
    { label: "Google qidiruv", icon: "🔍" },
    { label: "Do'st tavsiyasi", icon: "🤝" },
    { label: "Boshqa", icon: "💬" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map((opt) => (
        <button
          key={opt.label}
          onClick={() => onChange("source", opt.label)}
          className={`p-4 rounded-2xl border-2 text-left transition-all hover:-translate-y-0.5 ${
            data.source === opt.label
              ? "border-zinc-900 bg-zinc-900 text-white shadow-lg"
              : "border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-sm"
          }`}
        >
          <div className="text-2xl mb-2">{opt.icon}</div>
          <div className="text-[13px] font-semibold">{opt.label}</div>
        </button>
      ))}
    </div>
  );
};

// Step 2 — Platforms
interface Step2Props {
  data: OnboardingData;
  onChange: (key: keyof OnboardingData, value: string[]) => void;
}
const Step2 = ({ data, onChange }: Step2Props) => {
  const options = [
    { label: "Instagram bio", icon: "📸" },
    { label: "Telegram profil", icon: "✈️" },
    { label: "TikTok bio", icon: "🎵" },
    { label: "YouTube tavsifi", icon: "▶️" },
    { label: "Facebook sahifa", icon: "👤" },
    { label: "WhatsApp", icon: "💬" },
    { label: "LinkedIn", icon: "💼" },
    { label: "Shaxsiy vizitka", icon: "🪪" },
    { label: "Biznes profili", icon: "🏢" },
    { label: "Boshqa", icon: "✨" },
  ];

  const toggle = (label: string) => {
    const updated = data.platforms.includes(label)
      ? data.platforms.filter((p) => p !== label)
      : [...data.platforms, label];
    onChange("platforms", updated);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map((opt) => {
        const selected = data.platforms.includes(opt.label);
        return (
          <button
            key={opt.label}
            onClick={() => toggle(opt.label)}
            className={`p-4 rounded-2xl border-2 text-left transition-all hover:-translate-y-0.5 relative ${
              selected
                ? "border-zinc-900 bg-zinc-900 text-white shadow-lg"
                : "border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-sm"
            }`}
          >
            {selected && (
              <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <CheckIcon />
              </div>
            )}
            <div className="text-2xl mb-2">{opt.icon}</div>
            <div className="text-[12px] font-semibold leading-tight">
              {opt.label}
            </div>
          </button>
        );
      })}
    </div>
  );
};

// Step 3 — Template
interface Step3Props {
  data: OnboardingData;
  onChange: (key: keyof OnboardingData, value: string) => void;
}
const Step3 = ({ data, onChange }: Step3Props) => {
  const templates = [
    {
      name: "Minimal oq",
      bg: "bg-white",
      header: "bg-zinc-100",
      btn: "bg-zinc-900 text-white",
      text: "text-zinc-900",
    },
    {
      name: "Qora premium",
      bg: "bg-zinc-950",
      header: "bg-zinc-700",
      btn: "bg-white text-zinc-900",
      text: "text-white",
    },
    {
      name: "Gradient",
      bg: "bg-gradient-to-br from-violet-50 to-pink-50",
      header: "bg-gradient-to-r from-violet-500 to-pink-500",
      btn: "bg-gradient-to-r from-violet-500 to-pink-500 text-white",
      text: "text-violet-900",
    },
    {
      name: "Biznes",
      bg: "bg-slate-50",
      header: "bg-slate-800",
      btn: "bg-slate-800 text-white",
      text: "text-slate-900",
    },
    {
      name: "Kreativ",
      bg: "bg-amber-50",
      header: "bg-gradient-to-r from-amber-400 to-orange-500",
      btn: "bg-amber-500 text-white",
      text: "text-amber-900",
    },
    {
      name: "Soft pastel",
      bg: "bg-rose-50",
      header: "bg-gradient-to-r from-rose-300 to-pink-300",
      btn: "bg-rose-400 text-white",
      text: "text-rose-900",
    },
    {
      name: "Dark glass",
      bg: "bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900",
      header: "bg-white/5",
      btn: "bg-white/20 text-white",
      text: "text-white",
    },
    {
      name: "Bold social",
      bg: "bg-gradient-to-br from-yellow-400 to-orange-500",
      header: "bg-black/20",
      btn: "bg-black text-white",
      text: "text-white",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {templates.map((t) => {
        const selected = data.template === t.name;
        return (
          <button
            key={t.name}
            onClick={() => onChange("template", t.name)}
            className={`relative rounded-2xl overflow-hidden border-2 transition-all hover:-translate-y-1 ${
              selected
                ? "border-zinc-900 shadow-xl scale-[1.02]"
                : "border-transparent hover:border-zinc-200"
            }`}
          >
            {selected && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center z-10 shadow">
                <CheckIcon />
              </div>
            )}
            <div className={`${t.bg} h-36 flex flex-col`}>
              <div className={`${t.header} h-12 flex items-end pb-1.5 px-2`}>
                <div className="w-7 h-7 rounded-lg bg-white/30 flex items-center justify-center text-[11px] font-black text-white">
                  A
                </div>
              </div>
              <div className="p-2 flex-1">
                <div
                  className={`text-[10px] font-bold ${t.text} mb-1 truncate`}
                >
                  Aziza
                </div>
                <div
                  className={`w-full py-1 rounded-lg ${t.btn} text-[9px] font-bold text-center mb-1`}
                >
                  Bog'lanish
                </div>
                <div className="flex gap-1">
                  {["IG", "TG"].map((s) => (
                    <div
                      key={s}
                      className={`flex-1 py-0.5 rounded-md ${t.btn} text-[8px] font-bold text-center`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white py-2 px-2 border-t border-zinc-100">
              <p className="text-[11px] font-semibold text-zinc-700 text-center">
                {t.name}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

// Step 4 — Branding
interface Step4Props {
  data: OnboardingData;
  onChange: (key: keyof OnboardingData, value: string | null) => void;
}
const Step4 = ({ data, onChange }: Step4Props) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange("logo", reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <div className="space-y-5">
        {/* Logo Upload */}
        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            Logo / Rasm
          </label>
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-zinc-200 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 transition-all group"
          >
            {data.logo ? (
              <img
                src={data.logo}
                alt="logo"
                className="w-20 h-20 rounded-2xl object-cover shadow-md"
              />
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-3 group-hover:bg-zinc-200 transition-colors text-zinc-400">
                  <UploadIcon />
                </div>
                <p className="text-[13px] font-medium text-zinc-500">
                  Rasm yuklash uchun bosing
                </p>
                <p className="text-[11px] text-zinc-400 mt-1">
                  PNG, JPG, SVG — max 2MB
                </p>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
          {data.logo && (
            <button
              onClick={() => onChange("logo", null)}
              className="mt-2 text-[12px] text-zinc-400 hover:text-red-500 transition-colors"
            >
              O'chirish
            </button>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            Sarlavha <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Masalan: Aziza Karimova yoki MegaZon UZ"
            className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            Tavsif{" "}
            <span className="text-zinc-400 font-normal">(ixtiyoriy)</span>
          </label>
          <textarea
            value={data.description}
            onChange={(e) => onChange("description", e.target.value)}
            rows={3}
            placeholder="Qisqacha o'zingiz haqingizda..."
            className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all resize-none"
          />
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex flex-col items-center justify-center bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-5">
          Ko'rinish
        </p>
        <PreviewCard data={data} />
        {data.title && (
          <div className="mt-4 bg-zinc-900 rounded-xl px-4 py-2.5">
            <p className="text-[11px] text-zinc-400 text-center mb-0.5">
              Havola
            </p>
            <p className="text-[13px] font-bold text-white text-center">
              {toSlug(data.title)}.biosahifa.uz
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Step 5 — Socials
interface Step5Props {
  data: OnboardingData;
  onChange: (key: keyof OnboardingData, value: Record<string, string>) => void;
}
const Step5 = ({ data, onChange }: Step5Props) => {
  const fields: { key: string; label: string; placeholder: string }[] = [
    {
      key: "Instagram",
      label: "Instagram",
      placeholder: "instagram.com/sizning-nom",
    },
    { key: "Telegram", label: "Telegram", placeholder: "t.me/sizning-nom" },
    {
      key: "Facebook",
      label: "Facebook",
      placeholder: "facebook.com/sizning-nom",
    },
    {
      key: "YouTube",
      label: "YouTube",
      placeholder: "youtube.com/@sizning-nom",
    },
    { key: "TikTok", label: "TikTok", placeholder: "tiktok.com/@sizning-nom" },
    {
      key: "LinkedIn",
      label: "LinkedIn",
      placeholder: "linkedin.com/in/sizning-nom",
    },
    { key: "Website", label: "Website", placeholder: "sizning-sayt.uz" },
  ];

  const update = (key: string, value: string) => {
    onChange("socials", { ...data.socials, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-3">
        {fields.map(({ key, label, placeholder }) => (
          <div
            key={key}
            className="flex items-center gap-3 bg-white border border-zinc-200 rounded-2xl px-4 py-3 focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-100 transition-all"
          >
            <span className="w-7 h-7 flex items-center justify-center flex-shrink-0">
              {socialIcons[key]}
            </span>
            <span className="text-[13px] font-semibold text-zinc-700 w-20 flex-shrink-0">
              {label}
            </span>
            <input
              type="url"
              value={data.socials[key] || ""}
              onChange={(e) => update(key, e.target.value)}
              placeholder={placeholder}
              className="flex-1 text-[13px] text-zinc-700 placeholder-zinc-300 bg-transparent focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* Live Preview */}
      <div className="flex flex-col items-center justify-center bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-5">
          Ko'rinish
        </p>
        <PreviewCard data={data} />
      </div>
    </div>
  );
};

// Step 6 — Extra Info
interface Step6Props {
  data: OnboardingData;
  onChange: (key: keyof OnboardingData, value: string) => void;
}
const Step6 = ({ data, onChange }: Step6Props) => {
  const mapFields = [
    {
      key: "googleMaps" as const,
      label: "Google Maps",
      icon: "🗺️",
      placeholder: "maps.google.com/...",
    },
    {
      key: "yandexMaps" as const,
      label: "Yandex Maps",
      icon: "📍",
      placeholder: "yandex.uz/maps/...",
    },
    {
      key: "twoGis" as const,
      label: "2GIS",
      icon: "🏙️",
      placeholder: "2gis.uz/...",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-5">
        {/* Work hours */}
        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            Ish vaqti
          </label>
          <input
            type="text"
            value={data.workHours}
            onChange={(e) => onChange("workHours", e.target.value)}
            placeholder="Masalan: Du–Ju 9:00–18:00, Sha 10:00–15:00"
            className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
          />
        </div>

        {/* Phone numbers */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              key: "phone1" as const,
              label: "Telefon 1",
              placeholder: "+998 90 123 45 67",
            },
            {
              key: "phone2" as const,
              label: "Telefon 2",
              placeholder: "+998 91 123 45 67",
            },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
                {label}
              </label>
              <input
                type="tel"
                value={data[key]}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
              />
            </div>
          ))}
        </div>

        {/* Map links */}
        <div className="space-y-3">
          <label className="block text-[13px] font-semibold text-zinc-700">
            Xarita havolalari
          </label>
          {mapFields.map(({ key, label, icon, placeholder }) => (
            <div
              key={key}
              className="flex items-center gap-3 bg-white border border-zinc-200 rounded-2xl px-4 py-3 focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-100 transition-all"
            >
              <span className="text-lg flex-shrink-0">{icon}</span>
              <span className="text-[12px] font-semibold text-zinc-500 w-20 flex-shrink-0">
                {label}
              </span>
              <input
                type="url"
                value={data[key]}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={placeholder}
                className="flex-1 text-[13px] text-zinc-700 placeholder-zinc-300 bg-transparent focus:outline-none"
              />
            </div>
          ))}
        </div>

        {/* Note */}
        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            Qo'shimcha izoh{" "}
            <span className="text-zinc-400 font-normal">(ixtiyoriy)</span>
          </label>
          <textarea
            value={data.note}
            onChange={(e) => onChange("note", e.target.value)}
            rows={2}
            placeholder="Mehmonlarga qo'shimcha ma'lumot..."
            className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all resize-none"
          />
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex flex-col items-center justify-center bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-5">
          Ko'rinish
        </p>
        <PreviewCard data={data} />
        {(data.workHours || data.phone1) && (
          <div className="mt-4 w-full max-w-[220px] bg-white border border-zinc-100 rounded-2xl p-3 space-y-1.5">
            {data.workHours && (
              <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                <span>🕐</span>
                <span>{data.workHours}</span>
              </div>
            )}
            {data.phone1 && (
              <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                <span>📞</span>
                <span>{data.phone1}</span>
              </div>
            )}
            {(data.googleMaps || data.yandexMaps || data.twoGis) && (
              <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                <span>📍</span>
                <span>Xarita havolalari mavjud</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// SUCCESS SCREEN
// ============================================================
interface SuccessScreenProps {
  data: OnboardingData;
  onDashboard: () => void;
}
const SuccessScreen = ({ data, onDashboard }: SuccessScreenProps) => {
  const slug = toSlug(data.title) || "mening-sahifam";
  const activeSocials = Object.values(data.socials).filter((v) =>
    v.trim(),
  ).length;

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-5 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl"
      >
        {/* Success badge */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-100"
          >
            <span className="text-3xl">🎉</span>
          </motion.div>
          <h1
            className="text-[36px] font-black text-zinc-900 tracking-tight mb-3"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Sahifangiz tayyor
          </h1>
          <p className="text-[16px] text-zinc-500 leading-relaxed max-w-md mx-auto">
            Ma'lumotlaringiz asosida shaxsiy sahifangiz yaratildi. Endi uni
            ko'rishingiz yoki boshqaruv paneliga o'tishingiz mumkin.
          </p>
        </div>

        {/* URL card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-zinc-900 rounded-2xl p-5 text-center mb-6 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, #6EE7B7, transparent 50%), radial-gradient(circle at 70% 50%, #A5B4FC, transparent 50%)",
            }}
          />
          <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-widest mb-2 relative z-10">
            Sizning havolangiz
          </p>
          <p className="text-[22px] font-black text-white relative z-10">
            {slug}.biosahifa.uz
          </p>
          <button className="mt-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-[12px] font-semibold rounded-xl transition-all relative z-10 border border-white/10">
            Nusxa olish
          </button>
        </motion.div>

        {/* Summary + Preview grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-white rounded-2xl p-5 border border-zinc-100 space-y-3"
          >
            <p className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest mb-4">
              Xulosa
            </p>
            {[
              { label: "Shablon", value: data.template || "—" },
              { label: "Sarlavha", value: data.title || "—" },
              {
                label: "Tavsif",
                value: data.description ? "Qo'shilgan ✓" : "Qo'shilmagan",
              },
              {
                label: "Platformalar",
                value:
                  data.platforms.length > 0
                    ? `${data.platforms.length} ta`
                    : "—",
              },
              {
                label: "Ijtimoiy havolalar",
                value: activeSocials > 0 ? `${activeSocials} ta` : "—",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center py-2 border-b border-zinc-50 last:border-0"
              >
                <span className="text-[12px] text-zinc-400">{label}</span>
                <span className="text-[13px] font-semibold text-zinc-700">
                  {value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100 flex items-center justify-center"
          >
            <PreviewCard data={data} />
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3"
        >
          <button className="flex-1 py-3.5 bg-zinc-900 text-white text-[14px] font-bold rounded-2xl hover:bg-zinc-700 transition-all shadow-lg shadow-zinc-900/15 hover:-translate-y-0.5">
            Sahifani ko'rish
          </button>
          <button
            onClick={onDashboard}
            className="flex-1 py-3.5 bg-white text-zinc-800 text-[14px] font-bold rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all hover:-translate-y-0.5"
          >
            Dashboardga o'tish
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ============================================================
// ONBOARDING WIZARD
// ============================================================
interface OnboardingProps {
  onFinish: () => void;
}

const STEPS = [
  {
    id: 1,
    title: "Bizni qayerdan eshitdingiz?",
    desc: "Bu ma'lumot bizga xizmatni yaxshilashga yordam beradi.",
  },
  {
    id: 2,
    title: "Havolangizni qayerga joylashtirmoqchisiz?",
    desc: "Bir yoki bir nechta platformani tanlashingiz mumkin.",
  },
  {
    id: 3,
    title: "Shablonni tanlang",
    desc: "O'zingizga mos dizaynni tanlang. Keyinroq ham o'zgartirishingiz mumkin.",
  },
  {
    id: 4,
    title: "Asosiy ma'lumotlarni kiriting",
    desc: "Bu ma'lumotlar sahifangizning asosiy ko'rinishini belgilaydi.",
  },
  {
    id: 5,
    title: "Ijtimoiy tarmoqlar havolalari",
    desc: "Kerakli havolalarni qo'shing. Istalganlarini bo'sh qoldirishingiz mumkin.",
  },
  {
    id: 6,
    title: "Qo'shimcha ma'lumotlar",
    desc: "Ish vaqti, manzil va aloqa ma'lumotlarini kiriting.",
  },
];

const OnboardingWizard = ({ onFinish }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);

  const update = useCallback(
    <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const canNext = () => {
    if (step === 1) return !!data.source;
    if (step === 2) return data.platforms.length > 0;
    if (step === 3) return !!data.template;
    if (step === 4) return !!data.title.trim();
    return true;
  };

  const goNext = () => {
    if (step < 6) {
      setDirection(1);
      setStep((s) => s + 1);
    } else onFinish();
  };

  const goPrev = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const progress = (step / 6) * 100;
  const currentStep = STEPS[step - 1];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-zinc-100">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center gap-5">
          <div className="flex items-center gap-2 flex-shrink-0">
            <BrandIcon />
            <span className="text-[15px] font-bold text-zinc-900 hidden sm:block">
              BioSahifa
            </span>
          </div>

          {/* Progress bar */}
          <div className="flex-1 mx-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-zinc-400">
                {step}/6-qadam
              </span>
              <span className="text-[11px] font-semibold text-zinc-400">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-zinc-900 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Step dots */}
          <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`rounded-full transition-all duration-300 ${
                  s.id < step
                    ? "w-4 h-4 bg-emerald-400 flex items-center justify-center"
                    : s.id === step
                      ? "w-4 h-4 bg-zinc-900"
                      : "w-2 h-2 bg-zinc-200"
                }`}
              >
                {s.id < step && <CheckIcon />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-5 py-10">
        {/* Step header */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`header-${step}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-zinc-100 rounded-full px-3 py-1 text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-4">
              {step}-qadam
            </div>
            <h2
              className="text-[28px] sm:text-[34px] font-black text-zinc-900 tracking-tight leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {currentStep.title}
            </h2>
            <p className="text-[15px] text-zinc-500 mt-2">{currentStep.desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* Step content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`step-${step}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            {step === 1 && (
              <Step1 data={data} onChange={(k, v) => update(k, v as string)} />
            )}
            {step === 2 && (
              <Step2
                data={data}
                onChange={(k, v) => update(k, v as string[])}
              />
            )}
            {step === 3 && (
              <Step3 data={data} onChange={(k, v) => update(k, v as string)} />
            )}
            {step === 4 && (
              <Step4
                data={data}
                onChange={(k, v) => update(k, v as string | null)}
              />
            )}
            {step === 5 && (
              <Step5
                data={data}
                onChange={(k, v) => update(k, v as Record<string, string>)}
              />
            )}
            {step === 6 && (
              <Step6 data={data} onChange={(k, v) => update(k, v as string)} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-zinc-100">
          <button
            onClick={goPrev}
            disabled={step === 1}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-zinc-200 text-[14px] font-semibold text-zinc-600 hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeftIcon />
            Orqaga
          </button>

          <div className="flex items-center gap-2">
            {step < 6 && (
              <button
                onClick={goNext}
                className="px-3 py-3 rounded-2xl text-[13px] font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                O'tkazib yuborish
              </button>
            )}
            <button
              onClick={goNext}
              disabled={!canNext()}
              className="px-6 py-3 bg-zinc-900 text-white text-[14px] font-bold rounded-2xl shadow-lg shadow-zinc-900/15 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0"
            >
              {step === 6 ? "Yakunlash 🎉" : "Davom etish →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ROOT APP
// ============================================================
export default function App() {
  const [screen, setScreen] = useState<Screen>("auth");
  const [onboardingData, setOnboardingData] =
    useState<OnboardingData>(INITIAL_DATA);

  return (
    <AnimatePresence mode="wait">
      {screen === "auth" && (
        <motion.div
          key="auth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AuthPage onAuth={() => setScreen("onboarding")} />
        </motion.div>
      )}
      {screen === "onboarding" && (
        <motion.div
          key="onboarding"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <OnboardingWizard onFinish={() => setScreen("success")} />
        </motion.div>
      )}
      {screen === "success" && (
        <motion.div
          key="success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SuccessScreen
            data={onboardingData}
            onDashboard={() => setScreen("auth")}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
