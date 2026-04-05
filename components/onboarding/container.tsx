"use client";

import React, { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Icons } from "@/components/icons";
import {
  INITIAL_DATA,
  OnboardingData,
  toSlug,
} from "@/components/onboarding/utils";
import { PreviewCard } from "@/components/onboarding/preview-card";
import { TemplateCard } from "@/components/onboarding/template-card";
import { Step1 } from "@/components/onboarding/steps/one";
import { Step2 } from "@/components/onboarding/steps/two";
import { useI18n } from "@/components/i18n-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, PlusIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { LayoutContainer } from "@/components/layout-container";
import {
  completeOnboarding,
  getOnboardingDraft,
  getTemplates,
  saveOnboardingStep,
  uploadMedia,
} from "@/lib/api";
import {
  persistOnboardingDraft,
  readOnboardingDraft,
} from "@/lib/onboarding-draft-storage";
import type {
  BasicStepPayload,
  ContactsStepPayload,
  OnboardingStepId,
  PlatformsStepPayload,
  ProfileDraftDTO,
  SocialsStepPayload,
  SourceStepPayload,
  TemplateDTO,
  TemplateStepPayload,
} from "@/lib/profile";

const Step3 = ({
  templates,
  data,
  onChange,
  onSelect,
}: {
  templates: TemplateDTO[];
  data: OnboardingData;
  onChange: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
  onSelect?: (nextData: OnboardingData) => void;
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {templates.map((template) => {
        const selected = data.templateId === template.id;

        return (
          <TemplateCard
            key={template.id}
            templateName={template.name}
            data={data}
            selected={selected}
            onClick={() => {
              const nextData = {
                ...data,
                template: template.name,
                templateId: template.id,
              };
              onChange("template", template.name);
              onChange("templateId", template.id);
              onSelect?.(nextData);
            }}
          />
        );
      })}
    </div>
  );
};

const Step4 = ({
  isUploading,
  data,
  onChange,
  onUpload,
  onRemoveLogo,
}: {
  isUploading: boolean;
  data: OnboardingData;
  onChange: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
  onUpload: (file: File) => Promise<void>;
  onRemoveLogo: () => void;
}) => {
  const { t } = useI18n();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onUpload(file);
    e.target.value = "";
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
                  {isUploading ? t.onboarding.saving : t.onboarding.uploadClick}
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
              onClick={onRemoveLogo}
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

const OnboardingWizard = () => {
  const router = useRouter();
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasHydratedLocalDraft, setHasHydratedLocalDraft] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const pendingSaveQueueRef = useRef(
    new Map<OnboardingStepId, OnboardingData>(),
  );
  const flushPromiseRef = useRef<Promise<void> | null>(null);
  const dataRef = useRef(data);
  const pendingLogoFileRef = useRef<File | null>(null);
  const pendingLogoPreviewUrlRef = useRef<string | null>(null);
  const pendingLogoKeyRef = useRef<string | null>(null);

  const mapProfileToData = useCallback((profile: ProfileDraftDTO): OnboardingData => {
    return {
      source: profile.source,
      platforms: profile.platforms,
      template: profile.template,
      templateId: profile.templateId,
      logo: profile.logo,
      logoMediaId: profile.logoMediaId,
      title: profile.title,
      description: profile.description,
      socials: profile.socials,
      websites: profile.websites,
      workHours: profile.workHours,
      phones: profile.phones,
      googleMaps: profile.googleMaps,
    };
  }, []);

  const mergeDraftData = useCallback(
    (base: OnboardingData, local: Partial<OnboardingData> | null): OnboardingData => {
      if (!local) {
        return base;
      }

      return {
        ...base,
        source: local.source?.trim() ? local.source : base.source,
        platforms: local.platforms?.length ? local.platforms : base.platforms,
        template: local.template?.trim() ? local.template : base.template,
        templateId: local.templateId?.trim() ? local.templateId : base.templateId,
        logo: local.logo ?? base.logo,
        logoMediaId: local.logoMediaId ?? base.logoMediaId,
        title: local.title?.trim() ? local.title : base.title,
        description:
          typeof local.description === "string" && local.description.length > 0
            ? local.description
            : base.description,
        socials:
          local.socials && Object.keys(local.socials).length > 0
            ? local.socials
            : base.socials,
        websites:
          local.websites && local.websites.length > 0
            ? local.websites
            : base.websites,
        workHours:
          typeof local.workHours === "string" && local.workHours.length > 0
            ? local.workHours
            : base.workHours,
        phones: local.phones?.length ? local.phones : base.phones,
        googleMaps:
          typeof local.googleMaps === "string" && local.googleMaps.length > 0
            ? local.googleMaps
            : base.googleMaps,
      };
    },
    [],
  );

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    return () => {
      if (pendingLogoPreviewUrlRef.current) {
        URL.revokeObjectURL(pendingLogoPreviewUrlRef.current);
      }
    };
  }, []);

  const templatesQuery = useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates,
  });

  const onboardingDraftQuery = useQuery({
    queryKey: ["onboarding-draft"],
    queryFn: getOnboardingDraft,
  });

  useEffect(() => {
    if (hasHydratedLocalDraft) {
      return;
    }

    const localDraft = readOnboardingDraft();

    if (localDraft) {
      setData((current) => mergeDraftData(current, localDraft));
    }

    setHasHydratedLocalDraft(true);
  }, [hasHydratedLocalDraft, mergeDraftData]);

  useEffect(() => {
    if (!hasHydratedLocalDraft || !onboardingDraftQuery.data) {
      return;
    }

    const apiDraft = mapProfileToData(onboardingDraftQuery.data);
    const localDraft = readOnboardingDraft();
    const mergedDraft = mergeDraftData(apiDraft, localDraft);

    setData(mergedDraft);
    persistOnboardingDraft(mergedDraft);
  }, [
    hasHydratedLocalDraft,
    mapProfileToData,
    mergeDraftData,
    onboardingDraftQuery.data,
  ]);

  useEffect(() => {
    if (!hasHydratedLocalDraft) {
      return;
    }

    persistOnboardingDraft(data);
  }, [data, hasHydratedLocalDraft]);

  const stepMutation = useMutation({
    mutationFn: async (params: {
      stepId: OnboardingStepId;
      payload:
        | SourceStepPayload
        | PlatformsStepPayload
        | TemplateStepPayload
        | BasicStepPayload
        | SocialsStepPayload
        | ContactsStepPayload;
    }) => saveOnboardingStep(params.stepId, params.payload),
    onSuccess: (profile) => {
      queryClient.setQueryData(["onboarding-draft"], profile);
      queryClient.setQueryData(["profile"], profile);
    },
  });

  const completeMutation = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: (profile) => {
      queryClient.setQueryData(["onboarding-draft"], profile);
      queryClient.setQueryData(["profile"], profile);
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const mediaMutation = useMutation({
    mutationFn: uploadMedia,
  });

  const update = useCallback(
    <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const getStepPayload = useCallback(
    (
      currentStep: number,
      currentData: OnboardingData,
    ):
      | SourceStepPayload
      | PlatformsStepPayload
      | TemplateStepPayload
      | BasicStepPayload
      | SocialsStepPayload
      | ContactsStepPayload => {
      if (currentStep === 1) {
        return { source: currentData.source };
      }

      if (currentStep === 2) {
        return { platforms: currentData.platforms };
      }

      if (currentStep === 3) {
        return { templateId: currentData.templateId || null };
      }

      if (currentStep === 4) {
        return {
          title: currentData.title,
          description: currentData.description,
          logoMediaId: currentData.logoMediaId,
        };
      }

      if (currentStep === 5) {
        return {
          socials: currentData.socials,
          websites: currentData.websites,
        };
      }

      return {
        workHours: currentData.workHours,
        phones: currentData.phones,
        googleMaps: currentData.googleMaps,
      };
    },
    [],
  );

  const getStepId = useCallback((currentStep: number): OnboardingStepId => {
    if (currentStep === 1) return "source";
    if (currentStep === 2) return "platforms";
    if (currentStep === 3) return "template";
    if (currentStep === 4) return "basic";
    if (currentStep === 5) return "socials";
    return "contacts";
  }, []);

  const getStepIndexFromStepId = useCallback((stepId: OnboardingStepId) => {
    if (stepId === "source") return 1;
    if (stepId === "platforms") return 2;
    if (stepId === "template") return 3;
    if (stepId === "basic") return 4;
    if (stepId === "socials") return 5;
    return 6;
  }, []);

  const applyUploadedLogo = useCallback((uploadedMedia: { id: string; url: string }) => {
    if (pendingLogoPreviewUrlRef.current) {
      URL.revokeObjectURL(pendingLogoPreviewUrlRef.current);
      pendingLogoPreviewUrlRef.current = null;
    }

    pendingLogoFileRef.current = null;
    pendingLogoKeyRef.current = null;

    setData((prev) => {
      const nextData = {
        ...prev,
        logo: uploadedMedia.url,
        logoMediaId: uploadedMedia.id,
      };
      persistOnboardingDraft(nextData);
      return nextData;
    });
  }, []);

  const ensureUploadedLogo = useCallback(
    async (currentData: OnboardingData) => {
      const pendingFile = pendingLogoFileRef.current;

      if (!pendingFile) {
        return currentData;
      }

      const uploadKey = pendingLogoKeyRef.current;
      const media = await mediaMutation.mutateAsync(pendingFile);

      if (pendingLogoKeyRef.current === uploadKey) {
        applyUploadedLogo(media);
      }

      return {
        ...currentData,
        logo: media.url,
        logoMediaId: media.id,
      };
    },
    [applyUploadedLogo, mediaMutation],
  );

  const flushQueuedSaves = useCallback(async () => {
    if (flushPromiseRef.current) {
      return flushPromiseRef.current;
    }

    flushPromiseRef.current = (async () => {
      if (!pendingSaveQueueRef.current.size) {
        setHasPendingChanges(Boolean(pendingLogoFileRef.current));
        return;
      }

      setIsSyncing(true);

      try {
        while (pendingSaveQueueRef.current.size) {
          const nextEntry = pendingSaveQueueRef.current.entries().next().value as
            | [OnboardingStepId, OnboardingData]
            | undefined;

          if (!nextEntry) {
            break;
          }

          const [stepId, snapshot] = nextEntry;
          pendingSaveQueueRef.current.delete(stepId);

          let nextSnapshot = snapshot;

          if (stepId === "basic") {
            nextSnapshot = await ensureUploadedLogo(snapshot);
          }

          await stepMutation.mutateAsync({
            stepId,
            payload: getStepPayload(
              getStepIndexFromStepId(stepId),
              nextSnapshot,
            ),
          });
        }

        setHasPendingChanges(Boolean(pendingLogoFileRef.current));
      } catch (error) {
        setSubmitError(
          error instanceof Error ? error.message : t.onboarding.saveError,
        );
        setHasPendingChanges(
          Boolean(pendingSaveQueueRef.current.size || pendingLogoFileRef.current),
        );
        throw error;
      } finally {
        setIsSyncing(false);
        flushPromiseRef.current = null;
      }
    })();

    return flushPromiseRef.current;
  }, [
    ensureUploadedLogo,
    getStepIndexFromStepId,
    getStepPayload,
    stepMutation,
    t.onboarding.saveError,
  ]);

  const enqueueStepPersist = useCallback(
    (currentStep: number, currentData: OnboardingData) => {
      const stepId = getStepId(currentStep);

      if (pendingSaveQueueRef.current.has(stepId)) {
        pendingSaveQueueRef.current.delete(stepId);
      }

      pendingSaveQueueRef.current.set(stepId, currentData);
      setHasPendingChanges(true);
      void flushQueuedSaves();
    },
    [flushQueuedSaves, getStepId],
  );

  const canNext = () => {
    if (step === 1) return !!data.source;
    if (step === 2) return data.platforms.length > 0;
    if (step === 3) return !!data.templateId;
    if (step === 4) return !!data.title.trim();
    return true;
  };

  const goNext = async () => {
    if (isFinalizing) return;
    setSubmitError(null);

    enqueueStepPersist(step, dataRef.current);

    if (step < 6) {
      setDirection(1);
      setStep((s) => s + 1);
      return;
    }

    try {
      setIsFinalizing(true);
      await flushQueuedSaves();
      await completeMutation.mutateAsync();
      router.push("/dashboard");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : t.onboarding.saveError,
      );
    } finally {
      setIsFinalizing(false);
    }
  };

  const skipStep = async () => {
    if (step >= 6 || isFinalizing) {
      return;
    }

    setSubmitError(null);
    enqueueStepPersist(step, dataRef.current);
    setDirection(1);
    setStep((current) => current + 1);
  };

  const goPrev = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleSingleSelectStep = (
    targetStep: number,
    currentData: OnboardingData,
  ) => {
    if (step !== targetStep) return;

    setSubmitError(null);
    enqueueStepPersist(targetStep, currentData);
    setDirection(1);
    setStep((current) => (current < 6 ? current + 1 : current));
  };

  const handleLogoUpload = useCallback(
    async (file: File) => {
      setSubmitError(null);

      const previewUrl = URL.createObjectURL(file);

      if (pendingLogoPreviewUrlRef.current) {
        URL.revokeObjectURL(pendingLogoPreviewUrlRef.current);
      }

      pendingLogoPreviewUrlRef.current = previewUrl;
      pendingLogoFileRef.current = file;
      pendingLogoKeyRef.current = `${file.name}-${file.size}-${file.lastModified}`;
      setHasPendingChanges(true);
      setData((prev) => ({
        ...prev,
        logo: previewUrl,
        logoMediaId: null,
      }));
    },
    [],
  );

  const handleRemoveLogo = useCallback(() => {
    if (pendingLogoPreviewUrlRef.current) {
      URL.revokeObjectURL(pendingLogoPreviewUrlRef.current);
      pendingLogoPreviewUrlRef.current = null;
    }

    pendingLogoFileRef.current = null;
    pendingLogoKeyRef.current = null;
    setHasPendingChanges(true);
    setData((prev) => ({
      ...prev,
      logo: null,
      logoMediaId: null,
    }));
  }, []);

  const STEPS = t.onboarding.steps;
  const progress = (step / 6) * 100;
  const currentStep = STEPS[step - 1];
  const isHydrating =
    templatesQuery.isLoading || onboardingDraftQuery.isLoading;
  const isSubmitting = isFinalizing || completeMutation.isPending;
  const backgroundStatusLabel = useMemo(() => {
    if (isFinalizing) {
      return t.onboarding.saving;
    }

    if (mediaMutation.isPending || isSyncing) {
      return "Background save...";
    }

    if (hasPendingChanges) {
      return "Waiting to sync...";
    }

    return "All changes saved";
  }, [
    hasPendingChanges,
    isFinalizing,
    isSyncing,
    mediaMutation.isPending,
    t.onboarding.saving,
  ]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  const renderProgressHeader = () => (
    <div className="flex items-center gap-2 shrink-0">
      <Icons.BrandIcon />
      <span className="text-[15px] font-bold text-zinc-900 hidden sm:block">
        BioSahifa
      </span>
    </div>
  );

  const renderUserMenu = () => (
    <div className="shrink-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300">
            <Avatar className="size-9 border border-zinc-200">
              <AvatarImage src="/placeholder-user.jpg" alt="User profile" />
              <AvatarFallback className="bg-zinc-100 text-zinc-700 text-xs font-semibold">
                U
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onClick={() => router.push("/auth")}
            className="cursor-pointer text-red-600 focus:text-red-700"
          >
            <LogOut className="size-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-zinc-100">
        <LayoutContainer className="h-14 flex items-center gap-5">
          {renderProgressHeader()}

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

          {renderUserMenu()}
        </LayoutContainer>
      </div>

      {/* Content */}
      <LayoutContainer className="flex-1 flex flex-col py-4">
        {isHydrating ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="rounded-[28px] border border-zinc-200 bg-white px-8 py-6 text-sm text-zinc-500 shadow-sm">
              {t.onboarding.loadingProfile}
            </div>
          </div>
        ) : (
          <>
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
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 bg-zinc-100 rounded-full px-3 py-1 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                {t.onboarding.stepBadge.replace("{step}", String(step))}
              </div>
              {step < 6 && (
                <button
                  onClick={skipStep}
                  className="px-3 py-2 rounded-xl text-[13px] font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {t.onboarding.skip}
                </button>
              )}
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
                onChange={(k, v) => {
                  const nextData = { ...data, [k]: v };
                  update(k, v as string);
                  handleSingleSelectStep(1, nextData);
                }}
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
              <Step3
                templates={templatesQuery.data || []}
                data={data}
                onChange={(k, v) => update(k, v)}
                onSelect={(nextData) => handleSingleSelectStep(3, nextData)}
              />
            )}
            {step === 4 && (
              <Step4
                isUploading={mediaMutation.isPending || !!pendingLogoFileRef.current}
                data={data}
                onChange={update}
                onUpload={handleLogoUpload}
                onRemoveLogo={handleRemoveLogo}
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

        {submitError && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </div>
        )}

        <div className="mt-4 text-xs font-medium text-zinc-400">
          {backgroundStatusLabel}
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between pt-8 mt-8 border-t border-zinc-100">
          <button
            onClick={goPrev}
            disabled={step === 1 || isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-zinc-200 text-[14px] font-semibold text-zinc-600 hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Icons.ArrowLeft />
            {t.onboarding.back}
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={goNext}
              disabled={!canNext() || isSubmitting}
              className="w-full sm:w-auto px-6 py-3 bg-zinc-900 text-white text-[14px] font-bold rounded-2xl shadow-lg shadow-zinc-900/15 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0"
            >
              {isSubmitting
                ? t.onboarding.saving
                : step === 6
                  ? t.onboarding.finish
                  : t.onboarding.continue}
            </button>
          </div>
        </div>
          </>
        )}
      </LayoutContainer>
    </div>
  );
};

export function OnboardingContainer() {
  return <OnboardingWizard />;
}
