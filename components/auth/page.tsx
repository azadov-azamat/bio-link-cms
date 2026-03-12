"use client";

import { motion } from "framer-motion";
import { Icons } from "@/components/icons";

interface AuthPageProps {
  onAuth: () => void;
}

export function AuthPage({ onAuth }: AuthPageProps) {
  return (
    <div className="min-h-screen bg-[#FAFAF9] flex">
      {/* Left — Auth Card */}
      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-100"
        >
          {/* Back link */}
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-zinc-400 hover:text-zinc-600 mb-8 transition-colors"
          >
            <Icons.ArrowLeft />
            Bosh sahifaga qaytish
          </a>

          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <Icons.BrandIcon />
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
                icon: <Icons.GoogleIcon />,
                label: "Google orqali kirish",
                bg: "bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50",
              },
              {
                icon: <Icons.FacebookIconAuth />,
                label: "Facebook orqali kirish",
                bg: "bg-[#1877F2] hover:bg-[#166FE5] text-white border border-transparent",
              },
              {
                icon: <Icons.TelegramIcon />,
                label: "Telegram orqali kirish",
                bg: "bg-[#2AABEE] hover:bg-[#239DD8] text-white border border-transparent",
              },
            ].map(({ icon, label, bg }) => (
              <button
                key={label}
                onClick={onAuth}
                className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[14px] font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${bg}`}
              >
                <span className="w-5 h-5 flex items-center justify-center shrink-0">
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
          <div className="bg-white rounded-4xl p-5 shadow-2xl mx-auto w-55">
            <div className="h-16 rounded-2xl bg-linear-to-r from-violet-500 to-pink-500 mb-0 flex items-end pb-2 px-3">
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
                  className={`w-full py-2 px-3 rounded-xl text-center text-[11px] font-semibold mb-1.5 ${i === 0 ? "bg-linear-to-r from-violet-500 to-pink-500 text-white" : "bg-zinc-100 text-zinc-600"}`}
                >
                  {b}
                </div>
              ))}
              <div className="flex gap-1.5 justify-center mt-2">
                {[Icons.Instagram, Icons.Telegram, Icons.Youtube].map(
                  (Ic, idx) => (
                    <div
                      key={idx}
                      className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-[13px]"
                    >
                      <Ic />
                    </div>
                  ),
                )}
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
}
