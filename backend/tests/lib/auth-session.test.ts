import { describe, expect, it } from "@jest/globals";

import {
  buildFrontendCallbackUrl,
  createAccessToken,
  verifyAccessToken,
} from "../../src/lib/auth.js";
import { getSessionFromRequest } from "../../src/lib/session.js";
import { createMockStore, makeSession } from "../helpers/mock-store.js";

describe("auth and session helpers", () => {
  it("creates and verifies access token", async () => {
    const token = await createAccessToken({
      userId: "user-99",
      telegramId: "telegram-99",
    });

    const payload = await verifyAccessToken(token);

    expect(payload).toEqual({
      userId: "user-99",
      telegramId: "telegram-99",
    });
  });

  it("builds frontend callback url with auth payload", () => {
    const url = new URL(
      buildFrontendCallbackUrl({
        authStatus: "success",
        accessToken: "token-1",
        userId: "user-1",
        telegramId: "55",
      }),
    );

    expect(url.pathname).toBe("/auth/callback");
    expect(url.searchParams.get("authStatus")).toBe("success");
    expect(url.searchParams.get("accessToken")).toBe("token-1");
    expect(url.searchParams.get("userId")).toBe("user-1");
    expect(url.searchParams.get("telegramId")).toBe("55");
  });

  it("resolves request session from bearer token", async () => {
    const store = createMockStore();
    const token = await createAccessToken({
      userId: "user-1",
      telegramId: "77",
    });
    const session = makeSession();

    store.findUserSessionById.mockResolvedValue(session);

    const result = await getSessionFromRequest(
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cookies: {},
      } as never,
      store as never,
    );

    expect(result).toEqual(session);
  });

  it("returns null for invalid bearer token", async () => {
    const store = createMockStore();

    const result = await getSessionFromRequest(
      {
        headers: {
          authorization: "Bearer invalid-token",
        },
        cookies: {},
      } as never,
      store as never,
    );

    expect(result).toBeNull();
  });
});
