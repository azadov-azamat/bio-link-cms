import type { OnboardingData } from "@/components/onboarding/utils";
import type {
  AuthSessionDTO,
  DashboardDTO,
  MediaDTO,
  OnboardingStepId,
  OnboardingStepPayload,
  ProfileDraftDTO,
  TemplateDTO,
} from "@/lib/profile";
import { readAuthSession } from "@/lib/auth-session";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const authSession = readAuthSession();

  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (authSession?.accessToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${authSession.accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}

export async function ensureGuestSession() {
  return request<{ authenticated: true; kind: "guest" | "oauth" }>(
    "/api/v1/auth/guest",
    {
      method: "POST",
    },
  );
}

export async function getAuthSession(): Promise<AuthSessionDTO> {
  return request<AuthSessionDTO>("/api/v1/auth/session");
}

export async function getTemplates(): Promise<TemplateDTO[]> {
  return request<TemplateDTO[]>("/api/v1/templates");
}

export async function getOnboardingDraft(): Promise<ProfileDraftDTO | null> {
  try {
    return await request<ProfileDraftDTO>("/api/v1/onboarding/me");
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 401 || error.status === 404)
    ) {
      return null;
    }

    throw error;
  }
}

export async function getMyProfile(): Promise<ProfileDraftDTO | null> {
  try {
    return await request<ProfileDraftDTO>("/api/v1/profiles/me");
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 401 || error.status === 404)
    ) {
      return null;
    }

    throw error;
  }
}

async function ensureAuthorizedDraftWrite() {
  if (!readAuthSession()) {
    await ensureGuestSession();
  }
}

export async function uploadMedia(file: File): Promise<MediaDTO> {
  await ensureAuthorizedDraftWrite();

  const body = new FormData();
  body.append("file", file);

  return request<MediaDTO>("/api/v1/media", {
    method: "POST",
    body,
  });
}

export async function saveOnboardingStep(
  stepId: OnboardingStepId,
  payload: OnboardingStepPayload,
): Promise<ProfileDraftDTO> {
  await ensureAuthorizedDraftWrite();

  return request<ProfileDraftDTO>(`/api/v1/onboarding/steps/${stepId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function completeOnboarding(): Promise<ProfileDraftDTO> {
  await ensureAuthorizedDraftWrite();

  return request<ProfileDraftDTO>("/api/v1/onboarding/complete", {
    method: "POST",
    body: JSON.stringify({ completed: true }),
  });
}

export async function getMyDashboard(): Promise<DashboardDTO | null> {
  try {
    return await request<DashboardDTO>("/api/v1/dashboard/me");
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 401 || error.status === 404)
    ) {
      return null;
    }

    throw error;
  }
}
