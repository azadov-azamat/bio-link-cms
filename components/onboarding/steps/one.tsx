"use client";

import { JSX } from "react";
import { Icons } from "@/components/icons";
import { OnboardingData } from "../utils";

interface Step1Props {
  data: OnboardingData;
  onChange: (key: keyof OnboardingData, value: string) => void;
  options: string[];
}

const ICONS: Array<() => JSX.Element> = [
  Icons.Instagram,
  Icons.Telegram,
  Icons.Facebook,
  Icons.Youtube,
  Icons.Google,
  Icons.FriendRef,
  Icons.More,
];

export const Step1 = ({ data, onChange, options }: Step1Props) => {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map((label, index) => {
        const Icon = ICONS[index] ?? Icons.More;
        const selected = data.source === label;
        return (
          <button
            key={label}
            onClick={() => onChange("source", label)}
            className={`p-4 rounded-2xl border-2 text-left transition-all hover:-translate-y-0.5 ${
              selected
                ? "border-zinc-900 bg-zinc-900 text-white shadow-lg"
                : "border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-sm text-zinc-700"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                selected ? "bg-white/20" : "bg-zinc-100"
              }`}
            >
              <Icon />
            </div>
            <div className="text-[13px] font-semibold">{label}</div>
          </button>
        );
      })}
    </div>
  );
};
