"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getMyProfile } from "@/lib/api";
import { persistAuthSession } from "@/lib/auth-session";
import { useI18n } from "@/components/i18n-provider";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const finalizeAuth = async () => {
      const authStatus = searchParams.get("authStatus");
      const accessToken = searchParams.get("accessToken");
      const userId = searchParams.get("userId");
      const telegramId = searchParams.get("telegramId");
      const message = searchParams.get("message");

      if (authStatus !== "success" || !accessToken || !userId) {
        if (!cancelled) {
          setError(message || t.authCallback.genericError);
        }
        return;
      }

      persistAuthSession({
        accessToken,
        userId,
        telegramId,
        authProvider: "telegram",
      });

      // window.history.replaceState({}, "", "/auth/callback");

      let targetRoute = "/onboarding";

      try {
        const profile = await getMyProfile();
        console.log("profile", profile);
        targetRoute = profile ? "/dashboard" : "/onboarding";
      } catch {
        targetRoute = "/onboarding";
      }

      if (!cancelled) {
        router.replace(targetRoute);
      }
    };

    void finalizeAuth();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams, t.authCallback.genericError]);

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-5">
      <div className="w-full max-w-md rounded-4xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1
          className="text-[28px] font-black tracking-tight text-zinc-900"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {error ? t.authCallback.errorTitle : t.authCallback.loadingTitle}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-zinc-500">
          {error ? error : t.authCallback.loadingDescription}
        </p>
        {error && (
          <button
            onClick={() => router.replace("/auth")}
            className="mt-6 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white"
          >
            {t.authCallback.retry}
          </button>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <AuthCallbackContent />
    </Suspense>
  );
}
