"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "./icons";
import { Locale } from "@/lib/i18n";
import { useI18n } from "./i18n-provider";

const languages: { code: Locale; label: string }[] = [
  { code: "uz", label: "O‘zbekcha" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];

export function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`container rounded-2xl transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-zinc-900/8 border border-zinc-200/80"
            : "bg-white/70 backdrop-blur-sm border border-white/60 shadow-sm"
        }`}
      >
        <div className="px-5 h-14 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2.5"
          >
            <Icons.Logo />
            <span className="text-[16px] font-bold tracking-tight text-zinc-900">
              BioSahifa
            </span>
          </button>

          <div className="hidden md:flex items-center gap-0.5">
            {t.navbar.links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="px-3.5 py-2 text-[13.5px] text-zinc-500 hover:text-zinc-900 font-medium rounded-xl hover:bg-zinc-100 transition-all"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50 p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLocale(lang.code)}
                  className={`px-2.5 py-1 text-[12px] font-semibold rounded-lg transition-all ${
                    locale === lang.code
                      ? "bg-white text-zinc-900 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                  aria-label={`${t.navbar.languageLabel}: ${lang.label}`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={() => router.push("/auth")}
              className="px-4 py-2 text-[13.5px] font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all"
            >
              {t.navbar.login}
            </button>
            <button
              onClick={() => router.push("/auth?screen=onboarding")}
              className="px-4 py-2 text-[13.5px] font-semibold bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition-all shadow-md shadow-zinc-900/15"
            >
              {t.navbar.start}
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-xl hover:bg-zinc-100 transition-colors text-zinc-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-zinc-100 rounded-b-2xl"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {t.navbar.links.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="px-4 py-2.5 text-left text-[14px] font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-all"
                  >
                    {l.label}
                  </button>
                ))}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-100 mt-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLocale(lang.code)}
                      className={`py-2 text-[12px] font-semibold rounded-xl border transition-all ${
                        locale === lang.code
                          ? "border-zinc-900 bg-zinc-900 text-white"
                          : "border-zinc-200 text-zinc-600 bg-white hover:bg-zinc-50"
                      }`}
                    >
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 pt-3 border-t border-zinc-100 mt-1">
                  <button
                    onClick={() => {
                      router.push("/auth");
                      setMobileOpen(false);
                    }}
                    className="flex-1 py-2.5 text-[13.5px] font-medium text-zinc-700 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-all"
                  >
                    {t.navbar.login}
                  </button>
                  <button
                    onClick={() => {
                      router.push("/auth?screen=onboarding");
                      setMobileOpen(false);
                    }}
                    className="flex-1 py-2.5 text-[13.5px] font-semibold bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition-all"
                  >
                    {t.navbar.start}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
