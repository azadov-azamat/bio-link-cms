import { afterEach, describe, expect, it } from "@jest/globals";
import { URL } from "node:url";

import { createApp } from "../../src/app.js";
import { createAccessToken } from "../../src/lib/auth.js";
import { SESSION_COOKIE } from "../../src/lib/session.js";
import { createMockStore, makeSession } from "../helpers/mock-store.js";

describe("auth routes", () => {
  const apps: Array<Awaited<ReturnType<typeof createApp>>> = [];

  afterEach(async () => {
    await Promise.all(apps.splice(0).map((app) => app.close()));
  });

  it("creates a guest session and sets cookie", async () => {
    const store = createMockStore();
    store.findSessionByToken.mockResolvedValue(null);
    store.createGuestSession.mockResolvedValue(makeSession());

    const app = await createApp({
      store: store as never,
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/auth/guest",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      authenticated: true,
      kind: "guest",
    });
    expect(response.cookies[0]?.name).toBe(SESSION_COOKIE);
    expect(store.createGuestSession).toHaveBeenCalledTimes(1);
  });

  it("returns auth session from bearer token", async () => {
    const store = createMockStore();
    const session = makeSession({
      user: {
        id: "oauth-user",
        kind: "oauth",
        provider: "telegram",
        providerUserId: "9001",
      },
    });
    const accessToken = await createAccessToken({
      userId: "oauth-user",
      telegramId: "9001",
    });

    store.findUserSessionById.mockResolvedValue(session);
    store.getAuthSessionByUserId.mockResolvedValue({
      authenticated: true,
      kind: "oauth",
      provider: "telegram",
      userId: "oauth-user",
      telegramId: "9001",
    });

    const app = await createApp({
      store: store as never,
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/auth/session",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      authenticated: true,
      kind: "oauth",
      provider: "telegram",
      userId: "oauth-user",
      telegramId: "9001",
    });
  });

  it("redirects telegram authorize success with access token payload", async () => {
    const store = createMockStore();
    store.consumeTelegramAuthToken.mockResolvedValue({
      userId: "user-telegram",
      telegramId: "7007",
    });

    const app = await createApp({
      store: store as never,
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/auth/telegram/authorize?authUuid=uuid-1",
    });

    expect(response.statusCode).toBe(302);

    const location = response.headers.location;
    expect(location).toBeTruthy();

    const url = new URL(location!);
    expect(url.pathname).toBe("/auth/callback");
    expect(url.searchParams.get("authStatus")).toBe("success");
    expect(url.searchParams.get("userId")).toBe("user-telegram");
    expect(url.searchParams.get("telegramId")).toBe("7007");
    expect(url.searchParams.get("accessToken")).toBeTruthy();
  });

  it("redirects telegram authorize errors to callback", async () => {
    const store = createMockStore();
    const app = await createApp({
      store: store as never,
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/auth/telegram/authorize",
    });

    expect(response.statusCode).toBe(302);
    const url = new URL(response.headers.location!);
    expect(url.searchParams.get("authStatus")).toBe("error");
    expect(url.searchParams.get("message")).toMatch(/UUID is missing/i);
  });
});
