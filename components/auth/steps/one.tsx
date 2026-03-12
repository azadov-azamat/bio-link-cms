"use client";

import { OnboardingData } from "../utils";

interface Step1Props {
  data: OnboardingData;
  onChange: (key: keyof OnboardingData, value: string) => void;
}

export function Step1({ data, onChange }: Step1Props) {
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
}
