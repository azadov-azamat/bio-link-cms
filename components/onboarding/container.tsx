"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/icons";
import { INITIAL_DATA, OnboardingData, THEME_TEMPLATES, toSlug } from "@/components/auth/utils";
import { PreviewCard } from "@/components/auth/preview-card";
import { Step1 } from "@/components/auth/steps/one";
import { Step2 } from "@/components/auth/steps/two";

const STEPS = [
  {
    id: 1,
    title: "Qaysi manba orqali bilib oldingiz?",
    desc: "Bizneslari topib, qaysi manbadan bilib oldingiz?",
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

const Step3 = ({
  data,
  onChange,
}: {
  data: OnboardingData;
  onChange: (key: keyof OnboardingData, value: string) => void;
}) => {
  const templates = Object.keys(THEME_TEMPLATES);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {templates.map((name) => {
        const selected = data.template === name;
        const t = THEME_TEMPLATES[name as keyof typeof THEME_TEMPLATES];
        return (
          <button
            key={name}
            onClick={() => onChange("template", name)}
            className={`relative rounded-2xl overflow-hidden border-2 transition-all hover:-translate-y-1 h-32 ${
              selected
                ? "border-zinc-900 shadow-xl scale-[1.02]"
                : "border-transparent hover:border-zinc-200"
            }`}
          >
            {selected && (
              <div className="absolute inset-0 border-2 border-zinc-900 rounded-2xl" />
            )}
            <div className={`h-1/2 ${t.header}`} />
            <div className={`h-1/2 ${t.bg} flex items-center justify-center`}>
              <div
                className={`text-[10px] font-bold text-center px-2 ${t.text}`}
              >
                {name}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

const Step4 = ({
  data,
  onChange,
}: {
  data: OnboardingData;
  onChange: (key: keyof OnboardingData, value: string | null) => void;
}) => {
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
      <div className="space-y-5">
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
                crossOrigin="anonymous"
              />
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-3 group-hover:bg-zinc-200 transition-colors text-zinc-400">
                  <Icons.UploadIcon />
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

const Step5 = ({
  data,
  onChange,
}: {
  data: OnboardingData;
  onChange: (key: keyof OnboardingData, value: Record<string, string>) => void;
}) => {
  const fields = [
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

  const socialEmojis: Record<string, string> = {
    Instagram: "📸",
    Telegram: "✈️",
    Facebook: "👤",
    YouTube: "▶️",
    TikTok: "🎵",
    LinkedIn: "💼",
    Website: "🌐",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-3">
        {fields.map(({ key, label, placeholder }) => (
          <div
            key={key}
            className="flex items-center gap-3 bg-white border border-zinc-200 rounded-2xl px-4 py-3 focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-100 transition-all"
          >
            <span className="text-lg">{socialEmojis[key]}</span>
            <span className="text-[13px] font-semibold text-zinc-700 w-20 shrink-0">
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

      <div className="flex flex-col items-center justify-center bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-5">
          Ko'rinish
        </p>
        <PreviewCard data={data} />
      </div>
    </div>
  );
};

const Step6 = ({
  data,
  onChange,
}: {
  data: OnboardingData;
  onChange: (key: keyof OnboardingData, value: string) => void;
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-3">
        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            Ish vaqti
          </label>
          <input
            type="text"
            value={data.workHours}
            onChange={(e) => onChange("workHours", e.target.value)}
            placeholder="9:00 - 18:00"
            className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            Telefon 1
          </label>
          <input
            type="tel"
            value={data.phone1}
            onChange={(e) => onChange("phone1", e.target.value)}
            placeholder="+998 90 123-45-67"
            className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            Telefon 2
          </label>
          <input
            type="tel"
            value={data.phone2}
            onChange={(e) => onChange("phone2", e.target.value)}
            placeholder="+998 90 987-65-43"
            className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            Google Maps
          </label>
          <input
            type="url"
            value={data.googleMaps}
            onChange={(e) => onChange("googleMaps", e.target.value)}
            placeholder="Google Maps havolasi"
            className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            Qo'shimcha eslatma
          </label>
          <textarea
            value={data.note}
            onChange={(e) => onChange("note", e.target.value)}
            rows={2}
            placeholder="Qo'shimcha ma'lumot..."
            className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all resize-none"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-5">
          Ko'rinish
        </p>
        <PreviewCard data={data} />
      </div>
    </div>
  );
};

const OnboardingWizard = ({ onFinish }: { onFinish: () => void }) => {
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
          <div className="flex items-center gap-2 shrink-0">
            <Icons.BrandIcon />
            <span className="text-[15px] font-bold text-zinc-900 hidden sm:block">
              BioSahifa
            </span>
          </div>

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

          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
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
                {s.id < step && <Icons.CheckIconAuth />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-5 py-10">
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

        <div className="flex items-center justify-between pt-8 mt-8 border-t border-zinc-100">
          <button
            onClick={goPrev}
            disabled={step === 1}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-zinc-200 text-[14px] font-semibold text-zinc-600 hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Icons.ArrowLeft />
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

const SuccessScreen = ({ onDashboard }: { onDashboard: () => void }) => {
  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 flex items-center justify-center text-3xl">
            🎉
          </div>
        </div>
        <h1 className="text-[32px] font-black text-zinc-900 mb-3">
          Tabriklayapman!
        </h1>
        <p className="text-[15px] text-zinc-500 mb-8 leading-relaxed">
          Sahifangiz tayyor. Endi dashboard'da tahrirlash va boshqarish mumkin.
        </p>
        <button
          onClick={onDashboard}
          className="w-full px-6 py-3 bg-zinc-900 text-white text-[14px] font-bold rounded-2xl shadow-lg shadow-zinc-900/15 hover:bg-zinc-700 transition-all hover:-translate-y-0.5"
        >
          Dashboard'ga o'tish
        </button>
      </motion.div>
    </div>
  );
};

export function OnboardingContainer() {
  const [screen, setScreen] = useState<"onboarding" | "success">("onboarding");

  return (
    <AnimatePresence mode="wait">
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
          <SuccessScreen onDashboard={() => setScreen("onboarding")} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
