"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  LayoutTemplate,
  Link2,
  MapPin,
  MessageCircleMore,
  Paintbrush2,
  Phone,
  Sparkles,
  Type,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { TemplateCard } from "@/components/onboarding/template-card";
import { getMyDashboard, getTemplates, saveOnboardingStep, uploadMedia } from "@/lib/api";
import type {
  OnboardingStepId,
  OnboardingStepPayload,
  ProfileDraftDTO,
  TemplateDTO,
} from "@/lib/profile";
import { TEMPLATE_NAMES } from "@/components/onboarding/utils";
import { cn } from "@/lib/utils";

type EditableField =
  | "template"
  | "logo"
  | "title"
  | "description"
  | "phones"
  | "socials"
  | "maps";

type PreviewTarget = {
  id: EditableField;
  label: string;
  icon: typeof Type;
  className: string;
};

const PREVIEW_TARGETS: PreviewTarget[] = [
  {
    id: "logo",
    label: "Logo",
    icon: Upload,
    className: "left-[8%] top-[5%] h-[16%] w-[24%]",
  },
  {
    id: "title",
    label: "Title",
    icon: Type,
    className: "left-[27%] top-[6%] h-[13%] w-[55%]",
  },
  {
    id: "description",
    label: "Description",
    icon: MessageCircleMore,
    className: "left-[12%] top-[20%] h-[16%] w-[76%]",
  },
  {
    id: "template",
    label: "Template",
    icon: Paintbrush2,
    className: "left-[11%] top-[39%] h-[13%] w-[78%]",
  },
  {
    id: "phones",
    label: "Contact",
    icon: Phone,
    className: "left-[12%] top-[57%] h-[13%] w-[76%]",
  },
  {
    id: "socials",
    label: "Socials",
    icon: Link2,
    className: "left-[10%] top-[74%] h-[11%] w-[80%]",
  },
  {
    id: "maps",
    label: "Map",
    icon: MapPin,
    className: "left-[14%] top-[86%] h-[8%] w-[72%]",
  },
];

const COMMON_SOCIAL_KEYS = [
  "Instagram",
  "Telegram",
  "Facebook",
  "YouTube",
] as const;

function getSafeTemplateName(profile: ProfileDraftDTO) {
  return TEMPLATE_NAMES.includes(
    profile.template as (typeof TEMPLATE_NAMES)[number],
  )
    ? profile.template
    : TEMPLATE_NAMES[0];
}

function getStepForField(field: EditableField): OnboardingStepId {
  switch (field) {
    case "template":
      return "template";
    case "logo":
    case "title":
    case "description":
      return "basic";
    case "phones":
    case "maps":
      return "contacts";
    case "socials":
      return "socials";
  }
}

function buildPayload(profile: ProfileDraftDTO, stepId: OnboardingStepId): OnboardingStepPayload {
  switch (stepId) {
    case "template":
      return { templateId: profile.templateId || null };
    case "basic":
      return {
        title: profile.title,
        description: profile.description,
        logoMediaId: profile.logoMediaId,
      };
    case "contacts":
      return {
        workHours: profile.workHours,
        phones: profile.phones,
        googleMaps: profile.googleMaps,
      };
    case "socials":
      return {
        socials: profile.socials,
        websites: profile.websites,
      };
    case "source":
      return { source: profile.source };
    case "platforms":
      return { platforms: profile.platforms };
  }
}

function countActiveSocials(profile: ProfileDraftDTO) {
  return Object.values(profile.socials).filter((value) => value.trim()).length;
}

function countActiveWebsites(profile: ProfileDraftDTO) {
  return profile.websites.filter((item) => item.url.trim()).length;
}

function DashboardEmptyState() {
  const router = useRouter();

  return (
    <section className="rounded-[32px] border border-zinc-200 bg-white p-8 shadow-sm">
      <h1
        className="text-3xl font-black tracking-tight text-zinc-900"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        Hozircha sayt tayyor emas
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
        Avval onboarding bosqichlarini yakunlang. Shundan keyin bu yerda
        yaratilgan profilingiz studio ko‘rinishida paydo bo‘ladi.
      </p>
      <button
        onClick={() => router.push("/onboarding")}
        className="mt-6 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white"
      >
        Onboarding’ga o‘tish
      </button>
    </section>
  );
}

export default function DashboardMySitesPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const [selectedField, setSelectedField] = useState<EditableField>("title");
  const [profileDraft, setProfileDraft] = useState<ProfileDraftDTO | null>(null);

  const dashboardQuery = useQuery({
    queryKey: ["dashboard"],
    queryFn: getMyDashboard,
  });
  const templatesQuery = useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates,
  });

  useEffect(() => {
    if (dashboardQuery.data?.profile) {
      setProfileDraft(dashboardQuery.data.profile);
    }
  }, [dashboardQuery.data]);

  const saveMutation = useMutation({
    mutationFn: async ({
      field,
      profile,
    }: {
      field: EditableField;
      profile: ProfileDraftDTO;
    }) => {
      if (!profile) {
        throw new Error("Profil topilmadi");
      }

      const stepId = getStepForField(field);
      return saveOnboardingStep(stepId, buildPayload(profile, stepId));
    },
    onSuccess: (profile) => {
      setProfileDraft(profile);
      queryClient.setQueryData(["dashboard"], (current: Awaited<ReturnType<typeof getMyDashboard>>) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          profile,
        };
      });
    },
  });

  const mediaMutation = useMutation({
    mutationFn: uploadMedia,
    onSuccess: async (media) => {
      setProfileDraft((current) =>
        current
          ? {
              ...current,
              logo: media.url,
              logoMediaId: media.id,
            }
          : current,
      );
    },
  });

  const profile = profileDraft;
  const dashboard = dashboardQuery.data;
  const templates = templatesQuery.data ?? [];

  const stats = useMemo(() => {
    if (!profile) {
      return null;
    }

    return [
      {
        label: "Platformalar",
        value: profile.platforms.length,
        accent: "from-sky-500/15 to-cyan-500/5 text-sky-700",
      },
      {
        label: "Social linklar",
        value: countActiveSocials(profile),
        accent: "from-emerald-500/15 to-lime-500/5 text-emerald-700",
      },
      {
        label: "Websaytlar",
        value: countActiveWebsites(profile),
        accent: "from-fuchsia-500/15 to-pink-500/5 text-fuchsia-700",
      },
      {
        label: "Telefonlar",
        value: profile.phones.filter((item) => item.trim()).length,
        accent: "from-amber-500/15 to-orange-500/5 text-amber-700",
      },
    ];
  }, [profile]);

  const saveSelectedField = async () => {
    if (!profileDraft) {
      return;
    }

    await saveMutation.mutateAsync({
      field: selectedField,
      profile: profileDraft,
    });
  };

  const handleLogoPick = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const media = await mediaMutation.mutateAsync(file);
    const nextDraft = profileDraft
      ? {
          ...profileDraft,
          logo: media.url,
          logoMediaId: media.id,
        }
      : null;

    if (nextDraft) {
      setProfileDraft(nextDraft);
      await saveMutation.mutateAsync({
        field: "logo",
        profile: nextDraft,
      });
    }

    event.target.value = "";
  };

  if (dashboardQuery.isLoading) {
    return (
      <section className="rounded-[32px] border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-zinc-500">Dashboard yuklanmoqda...</p>
      </section>
    );
  }

  if (dashboardQuery.isError) {
    return (
      <section className="rounded-[32px] border border-red-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-900">
          Dashboard ochilmadi
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          {dashboardQuery.error instanceof Error
            ? dashboardQuery.error.message
            : "Noma’lum xatolik yuz berdi."}
        </p>
      </section>
    );
  }

  if (!dashboard || !profile || !stats) {
    return <DashboardEmptyState />;
  }

  const safeTemplateName = getSafeTemplateName(profile);
  const publicLink = `${profile.slug}.biosahifa.uz`;
  const currentTemplate =
    templates.find((item) => item.id === profile.templateId) ?? null;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_440px]">
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)]">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.24),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_36%),linear-gradient(135deg,_#18181b_0%,_#27272a_100%)] px-8 py-10 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              <LayoutTemplate className="h-3.5 w-3.5" />
              My sites
            </div>
            <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1
                  className="text-4xl font-black tracking-tight sm:text-5xl"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Sayt studio
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72 sm:text-base">
                  Chap tomonda sahifangizning workspace kartasi, o‘ng tomonda esa
                  live preview va inspector bor. Preview ichidagi belgilangan
                  elementlarga bosib, joyida kerakli blokni o‘zgartira olasiz.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/85">
                <Sparkles className="h-4 w-4" />
                1 ta aktiv site
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {stats.map(({ label, value, accent }) => (
            <article
              key={label}
              className={cn(
                "rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm",
              )}
            >
              <div
                className={cn(
                  "inline-flex rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]",
                  accent,
                )}
              >
                {label}
              </div>
              <div className="mt-4 text-4xl font-black tracking-tight text-zinc-900">
                {value}
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <article className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  My sites
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-900">
                  Profil ro‘yxati
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Hozircha sizda bitta aktiv sahifa bor. Keyinchalik bu bo‘lim
                  multi-site boshqaruviga aylanishi uchun tayyor.
                </p>
              </div>

              <button
                onClick={() => router.push("/onboarding")}
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700"
              >
                Continue onboarding
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <button className="mt-6 w-full rounded-[28px] border border-zinc-200 bg-[linear-gradient(180deg,_#ffffff,_#f6f7f8)] p-5 text-left shadow-[0_18px_50px_-40px_rgba(15,23,42,0.4)] transition hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-zinc-100">
                  {profile.logo ? (
                    <img
                      src={profile.logo}
                      alt={profile.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-black text-zinc-700">
                      {profile.title[0]?.toUpperCase() || "B"}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-lg font-bold text-zinc-900">
                      {profile.title || "Untitled profile"}
                    </h3>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      {profile.status}
                    </span>
                    {dashboard.isGuest && (
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700">
                        Guest
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-zinc-500">{publicLink}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                      {profile.template}
                    </span>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                      {countActiveSocials(profile)} socials
                    </span>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                      {profile.platforms.length} platforms
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </article>

          <article className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
              Public link
            </p>
            <div className="mt-3 rounded-[24px] bg-zinc-950 px-4 py-4 text-sm font-semibold text-white">
              {publicLink}
            </div>
            <div className="mt-4 space-y-3">
              <button
                onClick={() => setSelectedField("title")}
                className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 px-4 py-3 text-left text-sm font-semibold text-zinc-700"
              >
                Preview studio
                <ExternalLink className="h-4 w-4" />
              </button>
              <button
                onClick={() => router.push("/auth?screen=claim")}
                className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 px-4 py-3 text-left text-sm font-semibold text-zinc-700"
              >
                Claim account
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        </section>
      </div>

      <aside className="space-y-6 xl:sticky xl:top-6 xl:h-fit">
        <section className="rounded-[32px] border border-zinc-200 bg-white p-5 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                Live preview
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-900">
                Template inspector
              </h2>
            </div>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
              {currentTemplate?.name ?? profile.template}
            </span>
          </div>

          <div className="mt-6 rounded-[30px] bg-[linear-gradient(180deg,_#f4f4f5,_#e7e5e4)] p-4">
            <div className="mx-auto rounded-[34px] border border-zinc-300/70 bg-white/60 p-3 shadow-inner">
              <div className="relative mx-auto w-[292px]">
                <TemplateCard
                  templateName={safeTemplateName}
                  data={profile}
                  variant="preview"
                  className="!h-[34rem] !max-w-none"
                />

                <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/25" />
                {PREVIEW_TARGETS.map(({ id, label, icon: Icon, className }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedField(id)}
                    className={cn(
                      "absolute rounded-2xl border transition-all",
                      className,
                      selectedField === id
                        ? "border-sky-500 bg-sky-500/12 shadow-[0_0_0_1px_rgba(14,165,233,0.4)]"
                        : "border-transparent bg-zinc-950/0 hover:border-white/55 hover:bg-white/12",
                    )}
                    aria-label={`${label} ni tahrirlash`}
                  >
                    <span
                      className={cn(
                        "absolute -right-2 -top-2 flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-[10px] font-semibold shadow-sm",
                        selectedField === id
                          ? "bg-sky-500 text-white"
                          : "bg-white text-zinc-700",
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {PREVIEW_TARGETS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setSelectedField(id)}
                className={cn(
                  "rounded-2xl border px-3 py-2 text-xs font-semibold transition",
                  selectedField === id
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                Inspector
              </p>
              <h3 className="mt-2 text-xl font-black tracking-tight text-zinc-900">
                {PREVIEW_TARGETS.find((item) => item.id === selectedField)?.label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Previewdagi tanlangan blok shu yerdan boshqariladi. O‘zgartirish
                kiritib, saqlashni bossangiz live preview darhol yangilanadi.
              </p>
            </div>

            {saveMutation.isSuccess && !saveMutation.isPending ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Saved
              </span>
            ) : null}
          </div>

          <div className="mt-6 space-y-4">
            {selectedField === "title" ? (
              <>
                <label className="block">
                  <span className="text-sm font-semibold text-zinc-700">
                    Sarlavha
                  </span>
                  <input
                    value={profile.title}
                    onChange={(event) =>
                      setProfileDraft((current) =>
                        current
                          ? { ...current, title: event.target.value }
                          : current,
                      )
                    }
                    className="mt-2 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
                    placeholder="Profil sarlavhasi"
                  />
                </label>
              </>
            ) : null}

            {selectedField === "description" ? (
              <label className="block">
                <span className="text-sm font-semibold text-zinc-700">Bio</span>
                <textarea
                  value={profile.description}
                  onChange={(event) =>
                    setProfileDraft((current) =>
                      current
                        ? { ...current, description: event.target.value }
                        : current,
                    )
                  }
                  rows={5}
                  className="mt-2 w-full resize-none rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
                  placeholder="Qisqa bio yoki tavsif"
                />
              </label>
            ) : null}

            {selectedField === "template" ? (
              <label className="block">
                <span className="text-sm font-semibold text-zinc-700">
                  Template
                </span>
                <select
                  value={profile.templateId}
                  onChange={(event) => {
                    const next = templates.find((item) => item.id === event.target.value);
                    setProfileDraft((current) =>
                      current
                        ? {
                            ...current,
                            templateId: event.target.value,
                            template: next?.name ?? current.template,
                          }
                        : current,
                    );
                  }}
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
                >
                  {templates.map((item: TemplateDTO) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            {selectedField === "logo" ? (
              <div className="rounded-[28px] border border-dashed border-zinc-300 bg-zinc-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-zinc-700 shadow-sm">
                    <Upload className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900">
                      Logo upload
                    </p>
                    <p className="mt-1 text-sm leading-6 text-zinc-500">
                      Logo alohida media request bilan yuboriladi va shu profilga
                      `mediaId` sifatida ulanadi.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={mediaMutation.isPending}
                  className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Upload className="h-4 w-4" />
                  {mediaMutation.isPending ? "Uploading..." : "Logoni tanlash"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoPick}
                />
              </div>
            ) : null}

            {selectedField === "phones" ? (
              <div className="space-y-3">
                {profile.phones.map((phone, index) => (
                  <label key={`${index}-${selectedField}`} className="block">
                    <span className="text-sm font-semibold text-zinc-700">
                      Telefon {index + 1}
                    </span>
                    <input
                      value={phone}
                      onChange={(event) =>
                        setProfileDraft((current) =>
                          current
                            ? {
                                ...current,
                                phones: current.phones.map((item, itemIndex) =>
                                  itemIndex === index ? event.target.value : item,
                                ),
                              }
                            : current,
                        )
                      }
                      className="mt-2 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
                      placeholder="+998 90 123 45 67"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="text-sm font-semibold text-zinc-700">
                    Ish vaqti
                  </span>
                  <input
                    value={profile.workHours}
                    onChange={(event) =>
                      setProfileDraft((current) =>
                        current
                          ? { ...current, workHours: event.target.value }
                          : current,
                      )
                    }
                    className="mt-2 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
                    placeholder="09:00 - 18:00"
                  />
                </label>
              </div>
            ) : null}

            {selectedField === "socials" ? (
              <div className="space-y-3">
                {COMMON_SOCIAL_KEYS.map((key) => (
                  <label key={key} className="block">
                    <span className="text-sm font-semibold text-zinc-700">
                      {key}
                    </span>
                    <input
                      value={profile.socials[key] ?? ""}
                      onChange={(event) =>
                        setProfileDraft((current) =>
                          current
                            ? {
                                ...current,
                                socials: {
                                  ...current.socials,
                                  [key]: event.target.value,
                                },
                              }
                            : current,
                        )
                      }
                      className="mt-2 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
                      placeholder={`${key} link`}
                    />
                  </label>
                ))}
              </div>
            ) : null}

            {selectedField === "maps" ? (
              <label className="block">
                <span className="text-sm font-semibold text-zinc-700">
                  Xarita havolasi
                </span>
                <input
                  value={profile.googleMaps}
                  onChange={(event) =>
                    setProfileDraft((current) =>
                      current
                        ? { ...current, googleMaps: event.target.value }
                        : current,
                    )
                  }
                  className="mt-2 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
                  placeholder="Google Maps link"
                />
              </label>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={saveSelectedField}
              disabled={saveMutation.isPending || mediaMutation.isPending}
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saveMutation.isPending ? "Saqlanmoqda..." : "O‘zgarishni saqlash"}
            </button>
            <button
              onClick={() => router.push("/onboarding")}
              className="rounded-2xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700"
            >
              To‘liq tahrirlash
            </button>
          </div>

          {saveMutation.isError ? (
            <p className="mt-4 text-sm text-red-600">
              {saveMutation.error instanceof Error
                ? saveMutation.error.message
                : "Saqlashda xatolik yuz berdi."}
            </p>
          ) : null}
        </section>
      </aside>
    </div>
  );
}
