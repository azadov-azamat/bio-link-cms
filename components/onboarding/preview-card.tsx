"use client";

import { Icons } from "../icons";
import { OnboardingData, THEME_TEMPLATES } from "./utils";
import { useI18n } from "../i18n-provider";

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
  const { t: i18n } = useI18n();
  const activeSocials = Object.entries(data.socials).filter(([, v]) => v.trim());
  const activeWebsites = data.websites.filter((website) => website.url.trim());
  const previewItems = [
    ...activeSocials.map(([key]) => key),
    ...activeWebsites.map((_, index) => `Website-${index}`),
  ];
  const template = data.template;
  const theme = THEME_TEMPLATES[template as keyof typeof THEME_TEMPLATES] || THEME_TEMPLATES["Minimal oq"];

  return (
    <div className={`${theme.bg} rounded-2xl overflow-hidden border border-white/10 shadow-xl ${compact ? "w-40" : "w-56"}`}>
      <div className={`${theme.header} ${compact ? "h-14" : "h-20"} flex items-end pb-2 px-3`}>
        {data.logo ? (
          <img
            src={data.logo}
            alt="logo"
            className={`${compact ? "w-8 h-8" : "w-10 h-10"} rounded-xl object-cover shadow`}
            crossOrigin="anonymous"
          />
        ) : (
          <div className={`${compact ? "w-8 h-8 text-sm" : "w-10 h-10 text-base"} rounded-xl bg-white/20 flex items-center justify-center font-black ${theme.text}`}>
            {data.title ? data.title[0].toUpperCase() : "?"}
          </div>
        )}
      </div>

      <div className={`${compact ? "p-2.5" : "p-3"}`}>
        <div className={`${compact ? "text-[11px]" : "text-[13px]"} font-bold ${theme.text} truncate`}>
          {data.title || `${i18n.onboarding.titleLabel}...`}
        </div>
        {!compact && (
          <div className={`text-[10px] ${theme.sub} mb-3 line-clamp-2`}>
            {data.description || `${i18n.onboarding.descriptionLabel}...`}
          </div>
        )}
        <div className={`${compact ? "py-1.5" : "py-2"} px-3 rounded-xl ${theme.btn} ${theme.btnText} text-[10px] font-semibold text-center mb-1.5`}>
          {i18n.onboarding.contactButton}
        </div>

        {!compact && previewItems.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {previewItems.map((key) => {
              const Icon = key.startsWith("Website-")
                ? Icons.Globe
                : SOCIAL_ICONS[key];
              return (
                <div
                  key={key}
                  className={`w-6 h-6 rounded-lg ${theme.btn} ${theme.btnText} flex items-center justify-center`}
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
