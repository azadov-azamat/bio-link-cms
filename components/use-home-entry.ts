"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ensureGuestSession } from "@/lib/api";
import { persistGuestOnboardingSession, readGuestOnboardingSession } from "@/lib/guest-session";
import { useAuthStatus } from "./use-auth-status";

export function useHomeEntry() {
  const router = useRouter();
  const [hasGuestDraft, setHasGuestDraft] = useState(false);
  const [isBootstrappingGuest, setIsBootstrappingGuest] = useState(false);
  const { hydrated, hasLocalToken, isAuthenticated, isChecking } = useAuthStatus();

  useEffect(() => {
    setHasGuestDraft(Boolean(readGuestOnboardingSession()));
  }, []);

  const enterRoute = useMemo(() => {
    if (isAuthenticated) {
      return "/dashboard";
    }

    return "/onboarding";
  }, [isAuthenticated]);

  const openEntry = useCallback(async () => {
    if (isAuthenticated) {
      router.push(enterRoute);
      return;
    }

    if (hasGuestDraft) {
      router.push("/onboarding");
      return;
    }

    if (isBootstrappingGuest) {
      return;
    }

    setIsBootstrappingGuest(true);

    try {
      await ensureGuestSession();
      persistGuestOnboardingSession();
      setHasGuestDraft(true);
      router.push("/onboarding");
    } finally {
      setIsBootstrappingGuest(false);
    }
  }, [enterRoute, hasGuestDraft, isAuthenticated, isBootstrappingGuest, router]);

  return {
    hydrated,
    hasLocalToken,
    hasAuthSession: isAuthenticated,
    hasGuestDraft,
    isCheckingAuth: isChecking,
    isBootstrappingGuest,
    openEntry,
  };
}
