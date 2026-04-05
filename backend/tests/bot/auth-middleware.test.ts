import { describe, expect, it, jest } from "@jest/globals";

import {
  createTelegramAuthMiddleware,
  createTelegramDedupMiddleware,
} from "../../src/bot-app/middleware/auth-middleware.js";
import { getTelegramAuthState } from "../../src/bot-app/utils/auth-state.js";
import { createMockStore } from "../helpers/mock-store.js";

describe("bot auth middleware", () => {
  it("deduplicates repeated telegram updates", async () => {
    const middleware = createTelegramDedupMiddleware();
    const next = jest.fn(async () => undefined);
    const ctx = {
      update: {
        update_id: 55,
      },
    } as never;

    await middleware(ctx, next);
    await middleware(ctx, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it("hydrates telegram auth state from store", async () => {
    const store = createMockStore();
    const middleware = createTelegramAuthMiddleware(store as never);
    const user = { id: "user-telegram" };
    store.findTelegramUserByTelegramId.mockResolvedValue(user);

    const ctx = {
      state: {},
      from: {
        id: 8080,
      },
    } as never;
    const next = jest.fn(async () => undefined);

    await middleware(ctx, next);

    expect(store.findTelegramUserByTelegramId).toHaveBeenCalledWith("8080");
    expect(getTelegramAuthState(ctx)).toEqual({
      telegramUserId: "8080",
      user,
    });
    expect(next).toHaveBeenCalledTimes(1);
  });
});
