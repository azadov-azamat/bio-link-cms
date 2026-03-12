"use client";

import { Icons } from "../icons";
import { OnboardingData, THEME_TEMPLATES } from "./utils";

interface PreviewCardProps {
  data: OnboardingData;
  compact?: boolean;
}

// Icons mapping for socials
const SOCIAL_ICONS: Record<string, () => any> = {
  Instagram: Icons.Instagram,
  Telegram:  Icons.Telegram,
  Facebook:  Icons.Facebook,
  YouTube:   Icons.Youtube,
  TikTok:    Icons.TikTok,
  LinkedIn:  Icons.LinkedIn,
  Website:   Icons.Globe,
};

export function PreviewCard({ data, compact = false }: PreviewCardProps) {
  const activeSocials = Object.entries(data.socials).filter(([, v]) => v.trim());
  const template = data.template;
  const t = THEME_TEMPLATES[template as keyof typeof THEME_TEMPLATES] || THEME_TEMPLATES["Minimal oq"];

  return (
    <div className={`${t.bg} rounded-2xl overflow-hidden border border-white/10 shadow-xl ${compact ? "w-40" : "w-56"}`}>
      <div className={`${t.header} ${compact ? "h-14" : "h-20"} flex items-end pb-2 px-3`}>
        {data.logo ? (
          <img
            src={data.logo}
            alt="logo"
            className={`${compact ? "w-8 h-8" : "w-10 h-10"} rounded-xl object-cover shadow`}
            crossOrigin="anonymous"
          />
        ) : (
          <div className={`${compact ? "w-8 h-8 text-sm" : "w-10 h-10 text-base"} rounded-xl bg-white/20 flex items-center justify-center font-black ${t.text}`}>
            {data.title ? data.title[0].toUpperCase() : "?"}
          </div>
        )}
      </div>

      <div className={`${compact ? "p-2.5" : "p-3"}`}>
        <div className={`${compact ? "text-[11px]" : "text-[13px]"} font-bold ${t.text} truncate`}>
          {data.title || "Sarlavha..."}
        </div>
        {!compact && (
          <div className={`text-[10px] ${t.sub} mb-3 line-clamp-2`}>
            {data.description || "Tavsif..."}
          </div>
        )}
        <div className={`${compact ? "py-1.5" : "py-2"} px-3 rounded-xl ${t.btn} ${t.btnText} text-[10px] font-semibold text-center mb-1.5`}>
          Bog'lanish
        </div>

        {!compact && activeSocials.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {activeSocials.slice(0, 4).map(([key]) => {
              const Icon = SOCIAL_ICONS[key];
              return (
                <div
                  key={key}
                  className={`w-6 h-6 rounded-lg ${t.btn} ${t.btnText} flex items-center justify-center`}
                >
                  {Icon ? (
                    <span className="scale-[0.6] opacity-90">
                      <Icon />
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold">{key[0]}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
