export interface PersistedAuthSession {
  accessToken: string;
  userId: string;
  telegramId: string | null;
  authProvider: "telegram";
}

const AUTH_SESSION_STORAGE_KEY = "biosahifa_auth_session";

function isBrowser() {
  return typeof window !== "undefined";
}

export function persistAuthSession(session: PersistedAuthSession) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function readAuthSession(): PersistedAuthSession | null {
  if (!isBrowser()) {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as PersistedAuthSession;
  } catch {
    window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    return null;
  }
}

export function clearAuthSession() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
}
