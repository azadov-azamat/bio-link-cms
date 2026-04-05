"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { readAuthSession } from "@/lib/auth-session";
import { ensureGuestSession } from "@/lib/api";
import { persistGuestOnboardingSession, readGuestOnboardingSession } from "@/lib/guest-session";

export function useHomeEntry() {
  const router = useRouter();
  const [hasAuthSession, setHasAuthSession] = useState(false);
  const [hasGuestDraft, setHasGuestDraft] = useState(false);
  const [isBootstrappingGuest, setIsBootstrappingGuest] = useState(false);

  useEffect(() => {
    setHasAuthSession(Boolean(readAuthSession()));
    setHasGuestDraft(Boolean(readGuestOnboardingSession()));
  }, []);

  const hasStoredSession = hasAuthSession || hasGuestDraft;

  const enterRoute = useMemo(() => {
    if (hasAuthSession) {
      return "/dashboard";
    }

    return "/onboarding";
  }, [hasAuthSession]);

  const openEntry = useCallback(async () => {
    if (hasStoredSession) {
      router.push(enterRoute);
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
  }, [enterRoute, hasStoredSession, isBootstrappingGuest, router]);

  return {
    hasStoredSession,
    hasAuthSession,
    hasGuestDraft,
    isBootstrappingGuest,
    openEntry,
  };
}
