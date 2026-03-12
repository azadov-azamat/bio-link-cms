'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from './icons';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
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
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-100" : "bg-transparent"}`}
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
  );
}
