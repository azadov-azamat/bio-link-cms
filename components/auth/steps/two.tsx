"use client";

import { OnboardingData } from "../utils";
import { Icons } from "@/components/icons";

interface Step2Props {
  data: OnboardingData;
  onChange: (key: keyof OnboardingData, value: string[]) => void;
}

export function Step2({ data, onChange }: Step2Props) {
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
                <Icons.CheckIconAuth />
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
}
