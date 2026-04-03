"use client";

import { JSX } from "react";
import { Icons } from "@/components/icons";
import { useI18n } from "@/components/i18n-provider";
import { TEMPLATE_STYLE_PRESETS } from "@/components/template-presets";
import { cn } from "@/lib/utils";
import { OnboardingData, TEMPLATE_NAMES, toSlug } from "./utils";

type TemplateVariant = "picker" | "preview" | "compact" | "showcase";

type TemplateCardProps = {
  templateName: string;
  data?: Partial<OnboardingData>;
  selected?: boolean;
  onClick?: () => void;
  variant?: TemplateVariant;
  className?: string;
  showTemplateName?: boolean;
};

type TemplateSocialKey =
  | "Instagram"
  | "Telegram"
  | "Facebook"
  | "YouTube"
  | "TikTok"
  | "LinkedIn"
  | "Website";

type FeaturedItem = {
  key: TemplateSocialKey;
  label: string;
};

type TemplateLayout =
  | "minimal"
  | "premium"
  | "spotlight"
  | "business"
  | "creative"
  | "soft"
  | "glass"
  | "bold";

const SOCIAL_ICONS: Record<TemplateSocialKey, () => JSX.Element> = {
  Instagram: Icons.Instagram,
  Telegram: Icons.Telegram,
  Facebook: Icons.Facebook,
  YouTube: Icons.Youtube,
  TikTok: Icons.TikTok,
  LinkedIn: Icons.LinkedIn,
  Website: Icons.Globe,
};

const DEFAULT_SOCIALS: TemplateSocialKey[] = [
  "Instagram",
  "Telegram",
  "Facebook",
];
const DEFAULT_FEATURED_ITEMS: FeaturedItem[] = [
  { key: "Instagram", label: "Instagram" },
  { key: "Website", label: "Portfolio" },
];
const SOCIAL_ACCENTS: Record<TemplateSocialKey, string> = {
  Instagram: "bg-rose-100 text-rose-600",
  Telegram: "bg-sky-100 text-sky-600",
  Facebook: "bg-blue-100 text-blue-600",
  YouTube: "bg-red-100 text-red-600",
  TikTok: "bg-zinc-200 text-zinc-900",
  LinkedIn: "bg-indigo-100 text-indigo-600",
  Website: "bg-emerald-100 text-emerald-700",
};
const TEMPLATE_LAYOUTS: TemplateLayout[] = [
  "minimal",
  "premium",
  "spotlight",
  "business",
  "creative",
  "soft",
  "glass",
  "bold",
];

const getTemplateIndex = (templateName: string) => {
  const index = TEMPLATE_NAMES.indexOf(
    templateName as (typeof TEMPLATE_NAMES)[number],
  );

  return index >= 0 ? index : 0;
};

const trimProtocol = (value: string) =>
  value.replace(/^https?:\/\//, "").replace(/\/$/, "");

const getAccentClasses = (key: TemplateSocialKey) =>
  SOCIAL_ACCENTS[key] ?? "bg-zinc-100 text-zinc-600";

export function TemplateCard({
  templateName,
  data,
  selected = false,
  onClick,
  variant = "picker",
  className,
  showTemplateName = false,
}: TemplateCardProps) {
  const { t } = useI18n();
  const templateIndex = getTemplateIndex(templateName);
  const preset = TEMPLATE_STYLE_PRESETS[templateIndex];
  const templateItem = t.templates.items[templateIndex] ?? t.templates.items[0];
  const layout = TEMPLATE_LAYOUTS[templateIndex] ?? TEMPLATE_LAYOUTS[0];
  const useMockDetails = variant !== "preview";

  const title = data?.title?.trim() || templateItem.user;
  const generatedHandle = data?.title?.trim() ? toSlug(data.title) : "";
  const handle = generatedHandle || templateItem.handle;
  const description = data?.description?.trim() || templateItem.bio;
  const activePhones =
    data?.phones?.map((phone) => phone.trim()).filter(Boolean).slice(0, 3) ?? [];
  const displayPhones =
    activePhones.length > 0
      ? activePhones
      : useMockDetails
        ? ["+998 90 123 45 67", "+998 71 200 10 10"].slice(
            0,
            layout === "business" || layout === "bold" ? 2 : 1,
          )
        : [];
  const activeWebsites =
    data?.websites?.filter((website) => website.url.trim()) ?? [];
  const firstWebsite = activeWebsites[0];
  const primaryLabel = t.templates.ctaPrimary;
  const secondaryLabel =
    firstWebsite?.name.trim() ||
    (firstWebsite?.url.trim() ? trimProtocol(firstWebsite.url.trim()) : "") ||
    (data?.googleMaps?.trim() ? t.onboarding.googleMaps : "") ||
    t.templates.ctaSecondary;
  const activeSocials = Object.entries(data?.socials ?? {})
    .filter(([, value]) => value.trim())
    .map(([key]) => key as TemplateSocialKey);
  const socialKeys =
    activeSocials.length > 0 ? activeSocials : DEFAULT_SOCIALS;
  const socialPreviewKeys = socialKeys.slice(0, 3);
  const extraSocialCount = Math.max(socialKeys.length - 3, 0);
  const avatarLabel = title[0]?.toUpperCase() || templateItem.user[0];
  const workHours = data?.workHours?.trim() || (useMockDetails ? "09:00 - 18:00" : "");
  const hasMaps = !!data?.googleMaps?.trim() || useMockDetails;
  const featuredItems: FeaturedItem[] = [
    ...activeWebsites.slice(0, 2).map((website) => ({
      key: "Website" as const,
      label: website.name.trim() || trimProtocol(website.url.trim()),
    })),
    ...activeSocials.slice(0, 2).map((key) => ({
      key,
      label: key,
    })),
  ].slice(0, 2);
  const finalFeaturedItems =
    featuredItems.length > 0 ? featuredItems : DEFAULT_FEATURED_ITEMS;

  const outerClasses = cn(
    variant === "compact"
      ? "w-40 h-72"
      : variant === "preview"
        ? "w-full max-w-[15rem] h-90"
        : variant === "showcase"
          ? "w-full h-full"
          : "h-90",
    className,
  );

  const renderAvatar = (sizeClasses = "w-8 h-8 text-[12px]", framed = false) => {
    const avatarContent = data?.logo ? (
      <img
        src={data.logo}
        alt={title}
        className={cn(sizeClasses, "rounded-[inherit] object-cover")}
        crossOrigin="anonymous"
      />
    ) : (
      <div
        className={cn(
          sizeClasses,
          "rounded-[inherit] flex items-center justify-center font-black",
          preset.avatarBg,
          preset.avatarText,
        )}
      >
        {avatarLabel}
      </div>
    );

    if (!framed) return avatarContent;

    return (
      <div className="rounded-[1.25rem] bg-white/20 p-1 shadow-lg backdrop-blur-sm">
        {avatarContent}
      </div>
    );
  };

  const renderTitleBlock = (align: "left" | "center" = "left", large = false) => (
    <div className={cn(align === "center" && "text-center")}>
      <div
        className={cn(
          large ? "text-[13px]" : "text-[10px]",
          "font-bold leading-tight truncate",
          preset.textColor,
        )}
      >
        {title}
      </div>
      <div
        className={cn(
          large ? "text-[10px]" : "text-[8px]",
          "mt-0.5 truncate",
          preset.subText,
        )}
      >
        @{handle}
      </div>
      <div
        className={cn(
          large ? "text-[9px]" : "text-[8px]",
          "mt-1 line-clamp-2",
          preset.subText,
        )}
      >
        {description}
      </div>
    </div>
  );

  const renderButton = (label: string, primary = false, wide = true) => (
    <div
      className={cn(
        wide && "w-full",
        "rounded-xl px-2 py-1.5 text-center text-[8px] font-semibold truncate",
        primary ? `${preset.btnBg} ${preset.btnText}` : preset.secondBtn,
      )}
    >
      {label}
    </div>
  );

  const renderSocialBadge = (
    key: TemplateSocialKey,
    options?: {
      containerClassName?: string;
      innerClassName?: string;
      iconScaleClassName?: string;
      showLabel?: boolean;
    },
  ) => {
    const Icon = SOCIAL_ICONS[key];

    return (
      <div
        className={cn(
          "rounded-xl flex items-center justify-center gap-1 overflow-hidden",
          preset.secondBtn,
          options?.containerClassName,
        )}
      >
        <div
          className={cn(
            "w-[22px] h-[22px] rounded-md flex items-center justify-center",
            getAccentClasses(key),
            options?.innerClassName,
          )}
        >
          <span className={cn("scale-[0.45]", options?.iconScaleClassName)}>
            <Icon />
          </span>
        </div>
        {options?.showLabel && (
          <span className={cn("text-[7px] font-semibold truncate", preset.textColor)}>
            {key}
          </span>
        )}
      </div>
    );
  };

  const renderFeatureGrid = (dense = false) => (
    <div className={cn("grid grid-cols-2 gap-1", dense && "gap-1.5")}>
      {finalFeaturedItems.map(({ key, label }, index) => (
        <div
          key={`${key}-${index}`}
          className={cn(
            "rounded-lg px-1.5 py-1 flex items-center gap-1 overflow-hidden",
            preset.secondBtn,
          )}
        >
          <div
            className={cn(
              "w-4 h-4 rounded-md flex items-center justify-center shrink-0",
              getAccentClasses(key),
            )}
          >
            <span className="scale-[0.35]">
              {SOCIAL_ICONS[key]()}
            </span>
          </div>
          <span className={cn("text-[7px] font-semibold truncate", preset.textColor)}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );

  const renderSocialRow = (labeled = false) => (
    <div className="flex gap-1 justify-center">
      {socialPreviewKeys.map((key) => (
        <div key={key} className={labeled ? "min-w-0 flex-1" : ""}>
          {renderSocialBadge(key, {
            containerClassName: labeled
              ? "h-8 px-1.5 justify-start"
              : "w-8 h-8",
            showLabel: labeled,
          })}
        </div>
      ))}

      {extraSocialCount > 0 && (
        <div
          className={cn(
            labeled ? "h-8 px-2 flex-1" : "w-8 h-8",
            "rounded-xl flex items-center justify-center text-[8px] font-bold",
            preset.secondBtn,
            preset.textColor,
          )}
        >
          +{extraSocialCount}
        </div>
      )}
    </div>
  );

  const renderPhoneBlock = () => {
    if (displayPhones.length === 0) return null;

    if (displayPhones.length === 1) {
      return (
        <div
          className={cn(
            "rounded-xl px-2 py-1.5 flex items-center gap-1.5 overflow-hidden",
            preset.btnBg,
            preset.btnText,
          )}
        >
          <span className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <span className="scale-[0.4]">
              <Icons.Phone />
            </span>
          </span>
          <div className="min-w-0">
            <div className="text-[6px] uppercase tracking-[0.18em] opacity-70">
              {t.onboarding.phone}
            </div>
            <div className="text-[8px] font-semibold truncate">
              {displayPhones[0]}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-1">
        {displayPhones.map((phone, index) => (
          <div
            key={`${phone}-${index}`}
            className={cn(
              "min-w-0 rounded-lg px-1.5 py-1 inline-flex items-center gap-1",
              preset.secondBtn,
              index === 2 && "col-span-2",
            )}
          >
            <span
              className={cn(
                "w-4 h-4 rounded-md flex items-center justify-center shrink-0 text-[7px] font-bold",
                preset.btnBg,
                preset.btnText,
              )}
            >
              {index + 1}
            </span>
            <span className={cn("text-[7px] font-semibold truncate", preset.textColor)}>
              {phone}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderMapChip = () => {
    if (!hasMaps) return null;

    return (
      <div
        className={cn(
          "rounded-lg px-1.5 py-1 inline-flex items-center gap-1 self-start max-w-full",
          preset.secondBtn,
        )}
      >
        <span
          className={cn(
            "w-4 h-4 rounded-md flex items-center justify-center shrink-0",
            preset.btnBg,
            preset.btnText,
          )}
        >
          <span className="scale-[0.35]">
            <Icons.MapPin />
          </span>
        </span>
        <span className={cn("text-[7px] font-semibold truncate", preset.textColor)}>
          {t.onboarding.googleMaps}
        </span>
      </div>
    );
  };

  const renderWorkHoursBadge = () => {
    if (!workHours) return null;

    return (
      <div
        className={cn(
          "rounded-full px-2 py-1 inline-flex items-center gap-1 text-[7px] font-semibold",
          preset.secondBtn,
        )}
      >
        <span className={cn("scale-[0.35]", preset.textColor)}>
          <Icons.Clock />
        </span>
        <span className={preset.textColor}>{workHours}</span>
      </div>
    );
  };

  const renderTemplateLabel = (align: "left" | "center" = "left") =>
    showTemplateName ? (
      <div className={cn("mt-auto pt-2", align === "center" && "text-center")}>
        <span className={cn("text-[9px] font-bold uppercase tracking-[0.22em]", preset.subText)}>
          {templateItem.name}
        </span>
      </div>
    ) : null;

  const renderMinimalLayout = () => (
    <div className={cn("h-full flex flex-col", preset.bg)}>
      <div className={cn("h-24 px-2.5 pb-2 flex items-end relative", preset.headerBg)}>
        <div className="absolute top-2 left-0 right-0 flex justify-center">
          <div className="w-6 h-1 rounded-full bg-white/30" />
        </div>
        <div className="absolute top-2.5 right-2.5">{renderWorkHoursBadge()}</div>
        {renderAvatar("w-8 h-8 text-[12px]")}
      </div>

      <div className="flex-1 p-2.5 flex flex-col">
        {renderTitleBlock()}
        <div className="space-y-1 mt-2 mb-2">
          {renderButton(primaryLabel, true)}
          {renderButton(secondaryLabel)}
        </div>
        <div className="mb-2">{renderPhoneBlock()}</div>
        <div className="mb-2">{renderMapChip()}</div>
        <div className="mb-2">{renderFeatureGrid()}</div>
        <div className="mt-auto">
          {renderSocialRow()}
          {renderTemplateLabel("center")}
        </div>
      </div>
    </div>
  );

  const renderPremiumLayout = () => (
    <div className={cn("h-full flex flex-col", preset.bg)}>
      <div className={cn("px-3 pt-3 pb-6 relative", preset.headerBg)}>
        <div className="flex items-start justify-between gap-2">
          <div
            className={cn(
              "text-[8px] font-semibold uppercase tracking-[0.24em]",
              preset.subText,
            )}
          >
            Premium
          </div>
          {renderWorkHoursBadge()}
        </div>
      </div>

      <div className="px-3 -mt-4 relative z-10 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="min-w-0 flex-1">{renderTitleBlock()}</div>
          {renderAvatar("w-12 h-12 text-[16px]", true)}
        </div>

        <div className="grid grid-cols-2 gap-1.5 mb-2">
          <div className={cn("rounded-2xl p-2", preset.secondBtn)}>
            <div className={cn("text-[6px] uppercase tracking-[0.18em]", preset.subText)}>
              Socials
            </div>
            <div className={cn("text-[12px] font-black mt-1", preset.textColor)}>
              {socialKeys.length}
            </div>
          </div>
          <div className={cn("rounded-2xl p-2", preset.secondBtn)}>
            <div className={cn("text-[6px] uppercase tracking-[0.18em]", preset.subText)}>
              Links
            </div>
            <div className={cn("text-[12px] font-black mt-1", preset.textColor)}>
              {finalFeaturedItems.length}
            </div>
          </div>
        </div>

        <div className="mb-2">{renderPhoneBlock()}</div>
        <div className="mb-2">{renderFeatureGrid()}</div>
        <div className="grid grid-cols-2 gap-1 mb-2">
          {renderButton(primaryLabel, true)}
          {renderButton(secondaryLabel)}
        </div>
        <div className="mt-auto">
          {renderSocialRow()}
          {renderTemplateLabel("center")}
        </div>
      </div>
    </div>
  );

  const renderSpotlightLayout = () => (
    <div className={cn("h-full flex flex-col relative overflow-hidden", preset.bg)}>
      <div className={cn("h-28 relative", preset.headerBg)}>
        <div className="absolute inset-x-0 top-3 flex justify-center">
          {renderWorkHoursBadge()}
        </div>
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
          {renderAvatar("w-[52px] h-[52px] text-[17px]", true)}
        </div>
      </div>

      <div className="flex-1 px-3 pb-3 pt-8 flex flex-col">
        {renderTitleBlock("center", true)}
        <div className="mt-2 mb-2">{renderButton(primaryLabel, true)}</div>
        <div className="flex flex-wrap justify-center gap-1 mb-2">
          {finalFeaturedItems.map(({ key, label }, index) => (
            <div
              key={`${key}-${index}`}
              className={cn(
                "rounded-full px-2 py-1 inline-flex items-center gap-1",
                preset.secondBtn,
              )}
            >
              <span
                className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center",
                  getAccentClasses(key),
                )}
              >
                <span className="scale-[0.3]">{SOCIAL_ICONS[key]()}</span>
              </span>
              <span className={cn("text-[7px] font-semibold", preset.textColor)}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="mb-2 self-center">{renderMapChip()}</div>
        <div className="mb-2">{renderPhoneBlock()}</div>
        <div className="mt-auto">
          {renderSocialRow()}
          {renderTemplateLabel("center")}
        </div>
      </div>
    </div>
  );

  const renderBusinessLayout = () => (
    <div className={cn("h-full flex flex-col", preset.bg)}>
      <div className="p-3 flex items-start justify-between gap-2">
        <div>
          <div className={cn("text-[7px] uppercase tracking-[0.2em]", preset.subText)}>
            Business
          </div>
          <div className={cn("text-[11px] font-black mt-1", preset.textColor)}>
            {title}
          </div>
        </div>
        {renderWorkHoursBadge()}
      </div>

      <div className="px-3 pb-3 flex-1 flex flex-col">
        <div className="grid grid-cols-[auto_1fr] gap-2 items-start mb-2.5">
          {renderAvatar("w-10 h-10 text-[14px]")}
          <div>
            <div className={cn("text-[8px] truncate", preset.subText)}>@{handle}</div>
            <div className={cn("text-[8px] line-clamp-2 mt-1", preset.subText)}>
              {description}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 mb-2">
          <div className={cn("rounded-xl p-2", preset.secondBtn)}>
            <div className={cn("text-[6px] uppercase tracking-[0.18em]", preset.subText)}>
              Phones
            </div>
            <div className={cn("text-[10px] font-bold mt-1", preset.textColor)}>
              {displayPhones.length}
            </div>
          </div>
          <div className={cn("rounded-xl p-2", preset.secondBtn)}>
            <div className={cn("text-[6px] uppercase tracking-[0.18em]", preset.subText)}>
              Map
            </div>
            <div className={cn("text-[10px] font-bold mt-1", preset.textColor)}>
              {hasMaps ? "Active" : "Hidden"}
            </div>
          </div>
        </div>

        <div className="mb-2">{renderPhoneBlock()}</div>
        <div className="mb-2">{renderFeatureGrid(true)}</div>
        <div className="grid grid-cols-2 gap-1 mb-2">
          {renderButton(primaryLabel, true)}
          {renderButton(secondaryLabel)}
        </div>
        <div className="mt-auto">
          {renderSocialRow(true)}
          {renderTemplateLabel("center")}
        </div>
      </div>
    </div>
  );

  const renderCreativeLayout = () => (
    <div className={cn("h-full flex flex-col relative overflow-hidden", preset.bg)}>
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute bottom-10 left-3 w-14 h-14 rounded-full bg-white/20 blur-xl" />

      <div className="p-3 flex items-start justify-between gap-2">
        <div
          className={cn(
            "rounded-full px-2 py-1 text-[7px] font-semibold rotate-[-6deg]",
            preset.secondBtn,
          )}
        >
          Creative
        </div>
        {renderWorkHoursBadge()}
      </div>

      <div className="px-3 flex-1 flex flex-col">
        <div className="flex justify-end -mt-1 mb-1">{renderAvatar("w-11 h-11 text-[15px]", true)}</div>
        <div className="rotate-[-2deg] mb-2">{renderTitleBlock()}</div>
        <div className="grid grid-cols-[1.1fr_0.9fr] gap-1.5 mb-2">
          <div className="rotate-[-2deg]">{renderButton(primaryLabel, true)}</div>
          <div className="rotate-[2deg]">{renderButton(secondaryLabel)}</div>
        </div>
        <div className="mb-2 rotate-[1deg]">{renderPhoneBlock()}</div>
        <div className="mb-2 rotate-[-1deg]">{renderFeatureGrid()}</div>
        <div className="mt-auto rotate-[1deg]">
          {renderSocialRow()}
          {renderTemplateLabel("center")}
        </div>
      </div>
    </div>
  );

  const renderSoftLayout = () => (
    <div className={cn("h-full p-2.5", preset.bg)}>
      <div className={cn("h-full rounded-[1.75rem] p-3 flex flex-col", preset.secondBtn)}>
        <div className="flex justify-center mb-2">
          <div className="rounded-[1.5rem] bg-white/50 p-1.5">{renderAvatar("w-10 h-10 text-[14px]")}</div>
        </div>
        {renderTitleBlock("center")}
        <div className="flex flex-wrap justify-center gap-1 mt-2 mb-2">
          {workHours && renderWorkHoursBadge()}
          {hasMaps && renderMapChip()}
        </div>
        <div className="mb-2">{renderPhoneBlock()}</div>
        <div className="mb-2">{renderFeatureGrid()}</div>
        <div className="grid grid-cols-2 gap-1 mb-2">
          {renderButton(primaryLabel, true)}
          {renderButton(secondaryLabel)}
        </div>
        <div className="mt-auto">
          {renderSocialRow()}
          {renderTemplateLabel("center")}
        </div>
      </div>
    </div>
  );

  const renderGlassLayout = () => (
    <div className={cn("h-full flex flex-col relative overflow-hidden", preset.bg, preset.border)}>
      <div className="absolute -top-8 right-0 w-24 h-24 rounded-full bg-fuchsia-400/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="p-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {renderAvatar("w-9 h-9 text-[13px]")}
          <div>
            <div className={cn("text-[10px] font-bold", preset.textColor)}>{title}</div>
            <div className={cn("text-[8px]", preset.subText)}>@{handle}</div>
          </div>
        </div>
        {renderWorkHoursBadge()}
      </div>

      <div className="px-3 pb-3 flex-1 flex flex-col">
        <div className="rounded-[1.4rem] bg-white/5 border border-white/10 backdrop-blur-sm p-2.5 mb-2">
          <div className={cn("text-[8px] line-clamp-2", preset.subText)}>{description}</div>
        </div>
        <div className="rounded-[1.4rem] bg-white/5 border border-white/10 backdrop-blur-sm p-2 mb-2">
          {renderPhoneBlock()}
        </div>
        <div className="rounded-[1.4rem] bg-white/5 border border-white/10 backdrop-blur-sm p-2 mb-2">
          {renderFeatureGrid()}
        </div>
        <div className="grid grid-cols-2 gap-1 mb-2">
          {renderButton(primaryLabel, true)}
          {renderButton(secondaryLabel)}
        </div>
        <div className="mt-auto">
          {renderSocialRow()}
          {renderTemplateLabel("center")}
        </div>
      </div>
    </div>
  );

  const renderBoldLayout = () => (
    <div className={cn("h-full flex flex-col", preset.bg)}>
      <div className={cn("px-3 pt-3 pb-2", preset.headerBg)}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className={cn("text-[7px] uppercase tracking-[0.2em]", preset.subText)}>
              Creator
            </div>
            <div className={cn("text-[12px] font-black leading-none mt-1", preset.textColor)}>
              @{handle}
            </div>
          </div>
          {renderAvatar("w-10 h-10 text-[14px]", true)}
        </div>
      </div>

      <div className="px-3 pb-3 flex-1 flex flex-col">
        <div className={cn("text-[12px] font-black leading-tight mt-2", preset.textColor)}>
          {title}
        </div>
        <div className={cn("text-[8px] line-clamp-2 mt-1 mb-2", preset.subText)}>
          {description}
        </div>
        <div className="grid grid-cols-3 gap-1 mb-2">
          {socialPreviewKeys.map((key) => (
            <div key={key}>{renderSocialBadge(key, { containerClassName: "h-9" })}</div>
          ))}
        </div>
        <div className="mb-2">{renderPhoneBlock()}</div>
        <div className="mb-2">{renderMapChip()}</div>
        <div className="mb-2">{renderFeatureGrid()}</div>
        <div className="space-y-1 mt-auto">
          {renderButton(primaryLabel, true)}
          {renderButton(secondaryLabel)}
          {renderTemplateLabel("center")}
        </div>
      </div>
    </div>
  );

  const content = (
    <div className={cn("h-full rounded-[inherit] overflow-hidden", preset.border)}>
      {layout === "minimal" && renderMinimalLayout()}
      {layout === "premium" && renderPremiumLayout()}
      {layout === "spotlight" && renderSpotlightLayout()}
      {layout === "business" && renderBusinessLayout()}
      {layout === "creative" && renderCreativeLayout()}
      {layout === "soft" && renderSoftLayout()}
      {layout === "glass" && renderGlassLayout()}
      {layout === "bold" && renderBoldLayout()}
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          outerClasses,
          "relative rounded-3xl border overflow-hidden transition-all hover:-translate-y-1 p-0",
          selected
            ? "border-zinc-900 shadow-xl scale-[1.02]"
            : "border-zinc-200 hover:border-zinc-300",
        )}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      className={cn(
        outerClasses,
        "relative rounded-3xl border overflow-hidden border-zinc-200 shadow-sm",
      )}
    >
      {content}
    </div>
  );
}
