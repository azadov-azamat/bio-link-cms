"use client";

import { Icons } from "../icons";
import { OnboardingData, THEME_TEMPLATES } from "./utils";
import { useI18n } from "../i18n-provider";

interface PreviewCardProps {
  data: OnboardingData;
  compact?: boolean;
}

const SOCIAL_ICONS: Record<string, () => any> = {
  Instagram: Icons.Instagram,
  Telegram: Icons.Telegram,
  Facebook: Icons.Facebook,
  YouTube: Icons.Youtube,
  TikTok: Icons.TikTok,
  LinkedIn: Icons.LinkedIn,
  Website: Icons.Globe,
};

export function PreviewCard({ data, compact = false }: PreviewCardProps) {
  const { t: i18n } = useI18n();
  const activeSocials = Object.entries(data.socials).filter(([, v]) =>
    v.trim(),
  );
  const activePhones = data.phones.filter((phone) => phone.trim());
  const hasContactInfo =
    !!data.workHours.trim() ||
    activePhones.length > 0 ||
    !!data.googleMaps.trim();
  const formattedWorkHours = data.workHours.replace(" - ", " — ");
  const activeWebsites = data.websites.filter((website) => website.url.trim());
  const template = data.template;
  const theme =
    THEME_TEMPLATES[template as keyof typeof THEME_TEMPLATES] ||
    THEME_TEMPLATES["Minimal oq"];

  return (
    <div
      className={`${theme.bg} rounded-2xl overflow-hidden border border-white/10 shadow-xl ${
        compact ? "w-40" : "w-56"
      }`}
    >
      <div
        className={`${theme.header} ${compact ? "h-14" : "h-20"} flex items-end pb-2 px-3`}
      >
        {data.logo ? (
          <img
            src={data.logo}
            alt="logo"
            className={`${compact ? "w-8 h-8" : "w-10 h-10"} rounded-xl object-cover shadow`}
            crossOrigin="anonymous"
          />
        ) : (
          <div
            className={`${compact ? "w-8 h-8 text-sm" : "w-10 h-10 text-base"} rounded-xl bg-white/20 flex items-center justify-center font-black ${theme.text}`}
          >
            {data.title ? data.title[0].toUpperCase() : "?"}
          </div>
        )}
      </div>

      <div className={`${compact ? "p-2.5" : "p-3"}`}>
        <div
          className={`${compact ? "text-[11px]" : "text-[13px]"} font-bold ${theme.text} truncate`}
        >
          {data.title || `${i18n.onboarding.titleLabel}...`}
        </div>
        {!compact && (
          <div className={`text-[10px] ${theme.sub} mb-3 line-clamp-2`}>
            {data.description || `${i18n.onboarding.descriptionLabel}...`}
          </div>
        )}
        <div
          className={`${compact ? "py-1.5" : "py-2"} px-3 rounded-xl ${theme.btn} ${theme.btnText} text-[10px] font-semibold text-center mb-1.5`}
        >
          {i18n.onboarding.contactButton}
        </div>

        {!compact && hasContactInfo && (
          <div className="mt-2 space-y-1.5">
            {data.workHours.trim() && (
              <div
                className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[9px] ${theme.btn} ${theme.btnText}`}
              >
                <span className="scale-[0.55] opacity-90">
                  <Icons.Clock />
                </span>
                <span className="font-semibold tracking-wide">
                  {formattedWorkHours}
                </span>
              </div>
            )}

            {activePhones.slice(0, 2).map((phone) => (
              <div
                key={phone}
                className={`flex items-center gap-1.5 text-[9px] ${theme.sub}`}
              >
                <span className="scale-[0.55] opacity-80">
                  <Icons.Phone />
                </span>
                <span className="truncate">{phone}</span>
              </div>
            ))}

            {data.googleMaps.trim() && (
              <div
                className={`flex items-center gap-1.5 text-[9px] ${theme.sub}`}
              >
                <span className="scale-[0.55] opacity-80">
                  <Icons.MapPin />
                </span>
                <span className="truncate">{i18n.onboarding.googleMaps}</span>
              </div>
            )}
          </div>
        )}

        {!compact && activeWebsites.length > 0 && (
          <div className="mt-2 mb-2 space-y-1.5">
            {activeWebsites.slice(0, 2).map((website, index) => (
              <div
                key={`${website.url}-${index}`}
                className={`w-full rounded-lg ${theme.btn} ${theme.btnText} px-2.5 py-1.5 flex items-center gap-1.5`}
              >
                <span className="shrink-0 scale-[0.7] opacity-90">
                  <Icons.Globe />
                </span>
                <span className="text-[9px] font-semibold truncate">
                  {website.name.trim() || website.url}
                </span>
              </div>
            ))}
          </div>
        )}

        {!compact && activeSocials.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap justify-center">
            {activeSocials.map(([key]) => {
              const Icon = SOCIAL_ICONS[key];
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
