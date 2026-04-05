"use client";

import { ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getAuthSession, getMyDashboard } from "@/lib/api";

export default function DashboardAccountPage() {
  const router = useRouter();
  const sessionQuery = useQuery({
    queryKey: ["auth-session"],
    queryFn: getAuthSession,
  });
  const dashboardQuery = useQuery({
    queryKey: ["dashboard"],
    queryFn: getMyDashboard,
  });

  const session = sessionQuery.data;
  const dashboard = dashboardQuery.data;

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-zinc-200 bg-white p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
              <UserRound className="h-3.5 w-3.5" />
              Account
            </div>
            <h1
              className="mt-4 text-4xl font-black tracking-tight text-zinc-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Profil va claim boshqaruvi
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
              Telegram yoki boshqa provider bilan kirilganini shu yerdan
              tekshirasiz. Guest profil bo‘lsa uni claim qilib haqiqiy akkauntga
              bog‘lash oqimi shu bo‘limdan davom etadi.
            </p>
          </div>

          <button
            onClick={() => router.push("/auth?screen=claim")}
            className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Claim flow’ni ochish
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
            Auth provider
          </p>
          <h2 className="mt-2 text-2xl font-black text-zinc-900">
            {session?.provider ?? "Guest"}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            {session?.authenticated
              ? "Sessiya aktiv. Frontend bearer token bilan ishlamoqda."
              : "Sessiya hali topilmadi yoki guest holatda."}
          </p>
        </article>

        <article className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
            <Sparkles className="h-5 w-5" />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
            User ID
          </p>
          <h2 className="mt-2 break-all text-sm font-bold text-zinc-900">
            {session?.userId ?? "Mavjud emas"}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Claim yoki support debugging uchun shu identifikator ishlatiladi.
          </p>
        </article>

        <article className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
            <UserRound className="h-5 w-5" />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
            Current site
          </p>
          <h2 className="mt-2 text-2xl font-black text-zinc-900">
            {dashboard?.profile.title || "Profil hali yo‘q"}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Guest yoki OAuth user bo‘lsangiz ham dashboard’dagi aktiv sahifa shu
            hisoblanadi.
          </p>
        </article>
      </section>
    </div>
  );
}
