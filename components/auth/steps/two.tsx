"use client";

import { JSX } from "react";
import { OnboardingData } from "../utils";
import { Icons } from "@/components/icons";
import { CheckIcon } from "lucide-react";

interface Step2Props {
  data: OnboardingData;
  onChange: (key: keyof OnboardingData, value: string[]) => void;
}

export const Step2 = ({ data, onChange }: Step2Props) => {
  const options: { label: string; Icon: () => JSX.Element }[] = [
    { label: "Instagram bio", Icon: Icons.Instagram },
    { label: "Telegram profil", Icon: Icons.Telegram },
    { label: "TikTok bio", Icon: Icons.TikTok },
    { label: "YouTube tavsifi", Icon: Icons.Youtube },
    { label: "Facebook sahifa", Icon: Icons.Facebook },
    { label: "WhatsApp", Icon: Icons.WhatsApp },
    { label: "LinkedIn", Icon: Icons.LinkedIn },
    { label: "Shaxsiy vizitka", Icon: Icons.Card },
    { label: "Biznes profili", Icon: Icons.Building },
    { label: "Boshqa", Icon: Icons.More },
  ];

  const toggle = (label: string) => {
    const updated = data.platforms.includes(label)
      ? data.platforms.filter((p) => p !== label)
      : [...data.platforms, label];
    onChange("platforms", updated);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map(({ label, Icon }) => {
        const selected = data.platforms.includes(label);
        return (
          <button
            key={label}
            onClick={() => toggle(label)}
            className={`p-4 rounded-2xl border-2 text-left transition-all hover:-translate-y-0.5 relative ${
              selected
                ? "border-zinc-900 bg-zinc-900 text-white shadow-lg"
                : "border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-sm text-zinc-700"
            }`}
          >
            {selected && (
              <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <CheckIcon />
              </div>
            )}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                selected ? "bg-white/20" : "bg-zinc-100"
              }`}
            >
              <Icon />
            </div>
            <div className="text-[12px] font-semibold leading-tight">
              {label}
            </div>
          </button>
        );
      })}
    </div>
  );
};
