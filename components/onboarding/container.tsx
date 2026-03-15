"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/icons";
import {
  INITIAL_DATA,
  OnboardingData,
  toSlug,
} from "@/components/onboarding/utils";
import { PreviewCard } from "@/components/onboarding/preview-card";
import { Step1 } from "@/components/onboarding/steps/one";
import { Step2 } from "@/components/onboarding/steps/two";
import { useI18n } from "@/components/i18n-provider";
import { PlusIcon, Trash2Icon } from "lucide-react";

const Step3 = ({
  data,
  onChange,
}: {
  data: OnboardingData;
  onChange: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
}) => {
  const templateCards = [
    {
      name: "Minimal oq",
      tag: "Yangi",
      type: "Minimal",
      cardBg: "bg-white",
      cardBorder: "border border-zinc-200",
      titleColor: "text-zinc-900",
      subtitleColor: "text-zinc-400",
      topPreview: "bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500",
      previewShape: "bg-white/30",
      dots: ["bg-zinc-900", "bg-zinc-200", "bg-zinc-200"],
    },
    {
      name: "Qora premium",
      tag: "Trend",
      type: "Interactive",
      cardBg: "bg-zinc-950",
      cardBorder: "border border-zinc-800",
      titleColor: "text-white",
      subtitleColor: "text-zinc-400",
      topPreview: "bg-gradient-to-r from-emerald-500 to-teal-500",
      previewShape: "bg-white/70",
      dots: ["bg-white", "bg-zinc-300", "bg-zinc-700"],
    },
    {
      name: "Gradient",
      tag: "Trend",
      type: "Minimal",
      cardBg: "bg-violet-50",
      cardBorder: "border border-violet-100",
      titleColor: "text-violet-800",
      subtitleColor: "text-violet-400",
      topPreview: "bg-gradient-to-r from-violet-500 via-rose-500 to-pink-600",
      previewShape: "bg-white/55",
      dots: ["bg-violet-500", "bg-zinc-100", "bg-zinc-300"],
    },
    {
      name: "Biznes",
      tag: "Yangi",
      type: "Interactive",
      cardBg: "bg-slate-50",
      cardBorder: "border border-slate-200",
      titleColor: "text-slate-900",
      subtitleColor: "text-slate-400",
      topPreview: "bg-gradient-to-r from-sky-500 to-indigo-500",
      previewShape: "bg-slate-200/90",
      dots: ["bg-slate-800", "bg-zinc-100", "bg-zinc-300"],
    },
    {
      name: "Kreativ",
      tag: "Trend",
      type: "Minimal",
      cardBg: "bg-amber-50",
      cardBorder: "border border-amber-200",
      titleColor: "text-amber-900",
      subtitleColor: "text-amber-500",
      topPreview: "bg-gradient-to-r from-yellow-400 to-orange-500",
      previewShape: "bg-white/70",
      dots: ["bg-amber-500", "bg-zinc-100", "bg-zinc-300"],
    },
    {
      name: "Soft pastel",
      tag: "Trend",
      type: "Interactive",
      cardBg: "bg-rose-50",
      cardBorder: "border border-rose-200",
      titleColor: "text-rose-800",
      subtitleColor: "text-rose-400",
      topPreview: "bg-gradient-to-r from-rose-400 to-fuchsia-500",
      previewShape: "bg-white/60",
      dots: ["bg-rose-500", "bg-zinc-100", "bg-zinc-300"],
    },
    {
      name: "Dark glass",
      tag: "Yangi",
      type: "Minimal",
      cardBg: "bg-gradient-to-br from-purple-950 via-violet-900 to-slate-900",
      cardBorder: "border border-violet-900/40",
      titleColor: "text-white",
      subtitleColor: "text-violet-200/80",
      topPreview: "bg-gradient-to-r from-violet-500 to-sky-500",
      previewShape: "bg-white/65",
      dots: ["bg-violet-500/70", "bg-violet-200", "bg-violet-950"],
    },
    {
      name: "Bold social",
      tag: "Trend",
      type: "Interactive",
      cardBg: "bg-orange-500",
      cardBorder: "border border-orange-400",
      titleColor: "text-white",
      subtitleColor: "text-orange-100",
      topPreview: "bg-gradient-to-r from-rose-400 to-orange-400",
      previewShape: "bg-white/65",
      dots: ["bg-black", "bg-zinc-100", "bg-amber-700"],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
      {templateCards.map((card) => {
        const selected = data.template === card.name;
        return (
          <button
            key={card.name}
            onClick={() => onChange("template", card.name)}
            className={`relative rounded-3xl overflow-hidden text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${card.cardBg} ${card.cardBorder} ${
              selected ? "ring-2 ring-zinc-900" : "ring-1 ring-transparent"
            }`}
          >
            <div className={`h-30 ${card.topPreview} p-3 relative`}>
              <div className="absolute right-3 top-3 bg-white/85 text-zinc-700 text-[10px] px-2.5 py-1 rounded-full font-semibold">
                {card.tag}
              </div>
              <div className={`h-10 w-10 rounded-full ${card.previewShape}`} />
              <div className={`h-3 w-32 rounded-full mt-2 ${card.previewShape}`} />
              <div className={`h-2.5 w-22 rounded-full mt-2 ${card.previewShape}`} />
              <div className="flex gap-2 mt-3">
                <div className={`h-8 w-24 rounded-full ${card.previewShape}`} />
                <div className={`h-8 w-24 rounded-full ${card.previewShape} opacity-70`} />
              </div>
            </div>

            <div className="px-4 py-3.5">
              <p className={`text-[18px] font-semibold leading-tight ${card.titleColor}`}>{card.name}</p>
              <p className={`text-[12px] mt-1 ${card.subtitleColor}`}>{card.type} · Mock template</p>
              <div className="mt-3 flex gap-2">
                {card.dots.map((dotClass, index) => (
                  <span key={`${card.name}-${index}`} className={`h-4 w-4 rounded-full ${dotClass}`} />
                ))}
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
  const { t } = useI18n();
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
            {t.onboarding.uploadTitle}
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
                  {t.onboarding.uploadClick}
                </p>
                <p className="text-[11px] text-zinc-400 mt-1">
                  {t.onboarding.uploadHint}
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
{t.onboarding.remove}
            </button>
          )}
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            {t.onboarding.titleLabel} <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder={t.onboarding.titlePlaceholder}
            className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            {t.onboarding.descriptionLabel}{" "}
            <span className="text-zinc-400 font-normal">({t.onboarding.optional})</span>
          </label>
          <textarea
            value={data.description}
            onChange={(e) => onChange("description", e.target.value)}
            rows={3}
            placeholder={t.onboarding.descriptionPlaceholder}
            className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all resize-none"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-5">
          {t.onboarding.preview}
        </p>
        <PreviewCard data={data} />
        {data.title && (
          <div className="mt-4 bg-zinc-900 rounded-xl px-4 py-2.5">
            <p className="text-[11px] text-zinc-400 text-center mb-0.5">
              {t.onboarding.link}
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
  onChange: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
}) => {
  const { t } = useI18n();
  const socialFields: {
    key: string;
    label: string;
    placeholder: string;
    Icon: () => any;
  }[] = [
    {
      key: "Instagram",
      label: "Instagram",
      placeholder: t.onboarding.socialPlaceholders.Instagram,
      Icon: Icons.Instagram,
    },
    {
      key: "Telegram",
      label: "Telegram",
      placeholder: t.onboarding.socialPlaceholders.Telegram,
      Icon: Icons.Telegram,
    },
    {
      key: "Facebook",
      label: "Facebook",
      placeholder: t.onboarding.socialPlaceholders.Facebook,
      Icon: Icons.Facebook,
    },
    {
      key: "YouTube",
      label: "YouTube",
      placeholder: t.onboarding.socialPlaceholders.YouTube,
      Icon: Icons.Youtube,
    },
    {
      key: "TikTok",
      label: "TikTok",
      placeholder: t.onboarding.socialPlaceholders.TikTok,
      Icon: Icons.TikTok,
    },
    {
      key: "LinkedIn",
      label: "LinkedIn",
      placeholder: t.onboarding.socialPlaceholders.LinkedIn,
      Icon: Icons.LinkedIn,
    },
  ];

  const updateSocial = (key: string, value: string) => {
    onChange("socials", { ...data.socials, [key]: value });
  };

  const updateWebsite = (index: number, patch: Partial<{ name: string; url: string }>) => {
    const websites = data.websites.map((website, websiteIndex) =>
      websiteIndex === index ? { ...website, ...patch } : website,
    );
    onChange("websites", websites);
  };

  const addWebsite = () => {
    onChange("websites", [...data.websites, { name: "", url: "" }]);
  };

  const removeWebsite = (index: number) => {
    const websites = data.websites.filter((_, websiteIndex) => websiteIndex !== index);
    onChange("websites", websites.length ? websites : [{ name: "", url: "" }]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-3">
        {socialFields.map(({ key, label, placeholder, Icon }) => (
          <div
            key={key}
            className="flex items-center gap-3 bg-white border border-zinc-200 rounded-2xl px-4 py-3 focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-100 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0 text-zinc-500">
              <Icon />
            </div>
            <span className="text-[13px] font-semibold text-zinc-700 w-20 shrink-0">
              {label}
            </span>
            <input
              type="url"
              value={data.socials[key] || ""}
              onChange={(e) => updateSocial(key, e.target.value)}
              placeholder={placeholder}
              className="flex-1 text-[13px] text-zinc-700 placeholder-zinc-300 bg-transparent focus:outline-none"
            />
          </div>
        ))}

        <div className="pt-1 space-y-2.5">
          {data.websites.map((website, index) => (
            <div
              key={`website-${index}`}
              className="bg-white border border-zinc-200 rounded-2xl px-4 py-3"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-zinc-700">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500">
                    <Icons.Globe />
                  </div>
                  <span className="text-[13px] font-semibold">Website {index + 1}</span>
                </div>
                {data.websites.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeWebsite(index)}
                    className="text-zinc-400 hover:text-red-500 transition-colors"
                    aria-label={`Remove website ${index + 1}`}
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  value={website.name}
                  onChange={(e) => updateWebsite(index, { name: e.target.value })}
                  placeholder="Website nomi"
                  className="w-full text-[13px] text-zinc-700 placeholder-zinc-300 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-zinc-400"
                />
                <input
                  type="url"
                  value={website.url}
                  onChange={(e) => updateWebsite(index, { url: e.target.value })}
                  placeholder={t.onboarding.socialPlaceholders.Website}
                  className="w-full text-[13px] text-zinc-700 placeholder-zinc-300 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-zinc-400"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addWebsite}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 px-4 py-2.5 text-[13px] font-semibold text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            Website qo'shish
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-5">
          {t.onboarding.preview}
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
  onChange: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
}) => {
  const { t } = useI18n();

  const updatePhone = (index: number, value: string) => {
    const nextPhones = [...data.phones];
    nextPhones[index] = value;
    onChange("phones", nextPhones);
  };

  const addPhone = () => {
    if (data.phones.length >= 3) return;
    onChange("phones", [...data.phones, ""]);
  };

  const removePhone = (index: number) => {
    const nextPhones = data.phones.filter((_, i) => i !== index);
    onChange("phones", nextPhones.length ? nextPhones : [""]);
  };

  const parseWorkHours = (value: string) => {
    const normalized = value.trim();
    if (!normalized) return { start: "", end: "" };

    const [rawStart = "", rawEnd = ""] = normalized.split("-");
    const start = rawStart.trim();
    const end = rawEnd.trim();

    if (!normalized.includes("-")) {
      return { start: normalized, end: "" };
    }

    return { start, end };
  };

  const buildWorkHours = (start: string, end: string) => {
    if (!start && !end) return "";
    if (start && end) return `${start} - ${end}`;
    if (start) return start;
    return `- ${end}`;
  };

  const { start: startTime, end: endTime } = parseWorkHours(data.workHours);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-3">
        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            {t.onboarding.workHours}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="time"
              value={startTime}
              onChange={(e) => onChange("workHours", buildWorkHours(e.target.value, endTime))}
              className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] text-zinc-900 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => onChange("workHours", buildWorkHours(startTime, e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] text-zinc-900 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-[13px] font-semibold text-zinc-700">
              {t.onboarding.phone}
            </label>
            <button
              type="button"
              onClick={addPhone}
              disabled={data.phones.length >= 3}
              className="w-7 h-7 rounded-full border border-zinc-300 text-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>

          {data.phones.map((phone, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => updatePhone(index, e.target.value)}
                placeholder="+998 90 123-45-67"
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
              />
              {data.phones.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePhone(index)}
                  className="w-8 h-8 rounded-full border border-zinc-200 text-zinc-500 hover:text-red-500 hover:border-red-200 transition-colors"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            {t.onboarding.googleMaps}
          </label>
          <input
            type="url"
            value={data.googleMaps}
            onChange={(e) => onChange("googleMaps", e.target.value)}
            placeholder={t.onboarding.mapsPlaceholder}
            className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-5">
          {t.onboarding.preview}
        </p>
        <PreviewCard data={data} />
      </div>
    </div>
  );
};

const OnboardingWizard = ({ onFinish }: { onFinish: () => void }) => {
  const { t } = useI18n();
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

  const STEPS = t.onboarding.steps;
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
                {t.onboarding.progressStep.replace("{step}", String(step)).replace("{total}", "6")}
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
              {t.onboarding.stepBadge.replace("{step}", String(step))}
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
              <Step1
                data={data}
                onChange={(k, v) => update(k, v as string)}
                options={t.onboarding.step1Options}
              />
            )}
            {step === 2 && (
              <Step2
                data={data}
                onChange={(k, v) => update(k, v as string[])}
                options={t.onboarding.step2Options}
              />
            )}
            {step === 3 && (
              <Step3 data={data} onChange={(k, v) => update(k, v)} />
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
                onChange={update}
              />
            )}
            {step === 6 && (
              <Step6 data={data} onChange={update} />
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
            {t.onboarding.back}
          </button>

          <div className="flex items-center gap-2">
            {step < 6 && (
              <button
                onClick={goNext}
                className="px-3 py-3 rounded-2xl text-[13px] font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                {t.onboarding.skip}
              </button>
            )}
            <button
              onClick={goNext}
              disabled={!canNext()}
              className="px-6 py-3 bg-zinc-900 text-white text-[14px] font-bold rounded-2xl shadow-lg shadow-zinc-900/15 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0"
            >
              {step === 6 ? t.onboarding.finish : t.onboarding.continue}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessScreen = ({ onDashboard }: { onDashboard: () => void }) => {
  const { t } = useI18n();
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
          {t.onboarding.successTitle}
        </h1>
        <p className="text-[15px] text-zinc-500 mb-8 leading-relaxed">
          {t.onboarding.successDescription}
        </p>
        <button
          onClick={onDashboard}
          className="w-full px-6 py-3 bg-zinc-900 text-white text-[14px] font-bold rounded-2xl shadow-lg shadow-zinc-900/15 hover:bg-zinc-700 transition-all hover:-translate-y-0.5"
        >
          {t.onboarding.dashboard}
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
