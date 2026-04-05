import type { OnboardingData } from "@/components/onboarding/utils";

const ONBOARDING_DRAFT_STORAGE_KEY = "biosahifa_onboarding_draft";

function isBrowser() {
  return typeof window !== "undefined";
}

export function persistOnboardingDraft(data: OnboardingData) {
  if (!isBrowser()) {
    return;
  }

  const serializableDraft: OnboardingData = {
    ...data,
    logo: data.logo?.startsWith("blob:") ? null : data.logo,
  };

  window.localStorage.setItem(
    ONBOARDING_DRAFT_STORAGE_KEY,
    JSON.stringify(serializableDraft),
  );
}

export function readOnboardingDraft(): OnboardingData | null {
  if (!isBrowser()) {
    return null;
  }

  const raw = window.localStorage.getItem(ONBOARDING_DRAFT_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as OnboardingData;
  } catch {
    window.localStorage.removeItem(ONBOARDING_DRAFT_STORAGE_KEY);
    return null;
  }
}

export function clearOnboardingDraft() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(ONBOARDING_DRAFT_STORAGE_KEY);
}
