import { jest } from "@jest/globals";

import type {
  AuthSessionResponse,
  DashboardResponse,
  MediaRecord,
  ProfileRecord,
  TemplateRecord,
} from "../../src/types/profile.js";
import type { SessionWithUser } from "../../src/lib/db.js";

export type MockStore = ReturnType<typeof createMockStore>;

export function createMockStore() {
  return {
    initialize: jest.fn(async () => undefined),
    close: jest.fn(async () => undefined),
    createGuestSession: jest.fn<() => Promise<SessionWithUser>>(),
    findSessionByToken: jest.fn<(token: string) => Promise<SessionWithUser | null>>(),
    findUserSessionById: jest.fn<(userId: string) => Promise<SessionWithUser | null>>(),
    getAuthSessionByUserId: jest.fn<
      (userId: string) => Promise<AuthSessionResponse | null>
    >(),
    consumeTelegramAuthToken: jest.fn<
      (authUuid: string) => Promise<{ userId: string; telegramId: string }>
    >(),
    getTemplates: jest.fn<() => Promise<TemplateRecord[]>>(),
    createMedia: jest.fn<
      (params: {
        userId: string;
        mimeType: string;
        fileName: string | null;
        data: Buffer;
      }) => Promise<MediaRecord>
    >(),
    getProfileByUserId: jest.fn<(userId: string) => Promise<ProfileRecord | null>>(),
    saveOnboardingStep: jest.fn<
      (
        userId: string,
        stepId: string,
        payload: unknown,
      ) => Promise<ProfileRecord>
    >(),
    completeOnboarding: jest.fn<(userId: string) => Promise<ProfileRecord>>(),
    getDashboardByUserId: jest.fn<
      (userId: string) => Promise<DashboardResponse | null>
    >(),
    createTelegramAuthToken: jest.fn<
      (userId: string) => Promise<{ authUuid: string }>
    >(),
    upsertTelegramUser: jest.fn<(params: unknown) => Promise<unknown>>(),
    findTelegramUserByTelegramId: jest.fn<
      (telegramUserId: string) => Promise<unknown | null>
    >(),
  };
}

export function makeSession(overrides: Partial<SessionWithUser> = {}): SessionWithUser {
  return {
    token: "session-token",
    expiresAt: "2030-01-01T00:00:00.000Z",
    user: {
      id: "user-1",
      kind: "guest",
      provider: null,
      providerUserId: null,
    },
    ...overrides,
  };
}

export function makeProfile(
  overrides: Partial<ProfileRecord> = {},
): ProfileRecord {
  return {
    source: "Telegram",
    platforms: ["Telegram profil"],
    template: "Dark glass",
    templateId: "11111111-1111-4111-8111-111111111111",
    logo: "data:image/png;base64,ZmFrZQ==",
    logoMediaId: "22222222-2222-4222-8222-222222222222",
    title: "Aziz Karimov",
    description: "BioSahifa foydalanuvchisi",
    socials: {
      Telegram: "t.me/aziz",
      Instagram: "instagram.com/aziz",
    },
    websites: [{ name: "Portfolio", url: "https://example.com" }],
    workHours: "09:00 - 18:00",
    phones: ["+998901234567"],
    googleMaps: "https://maps.google.com/example",
    slug: "aziz-karimov",
    status: "draft",
    ...overrides,
  };
}

export function makeDashboard(
  overrides: Partial<DashboardResponse> = {},
): DashboardResponse {
  return {
    profile: makeProfile(),
    isGuest: true,
    claimRequired: true,
    ...overrides,
  };
}

export function makeTemplate(
  overrides: Partial<TemplateRecord> = {},
): TemplateRecord {
  return {
    id: "11111111-1111-4111-8111-111111111111",
    key: "dark-glass",
    name: "Dark glass",
    description: "Dark elegant template",
    sortOrder: 1,
    isActive: true,
    ...overrides,
  };
}

export function makeMedia(
  overrides: Partial<MediaRecord> = {},
): MediaRecord {
  return {
    id: "22222222-2222-4222-8222-222222222222",
    url: "data:image/png;base64,ZmFrZQ==",
    mimeType: "image/png",
    fileName: "logo.png",
    ...overrides,
  };
}
