const GUEST_ONBOARDING_STORAGE_KEY = "biosahifa_guest_onboarding";

export interface PersistedGuestOnboardingSession {
  startedAt: string;
}

function isBrowser() {
  return typeof window !== "undefined";
}

export function persistGuestOnboardingSession(
  session: PersistedGuestOnboardingSession = {
    startedAt: new Date().toISOString(),
  },
) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(
    GUEST_ONBOARDING_STORAGE_KEY,
    JSON.stringify(session),
  );
}

export function readGuestOnboardingSession(): PersistedGuestOnboardingSession | null {
  if (!isBrowser()) {
    return null;
  }

  const raw = window.localStorage.getItem(GUEST_ONBOARDING_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as PersistedGuestOnboardingSession;
  } catch {
    window.localStorage.removeItem(GUEST_ONBOARDING_STORAGE_KEY);
    return null;
  }
}

export function clearGuestOnboardingSession() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(GUEST_ONBOARDING_STORAGE_KEY);
}
