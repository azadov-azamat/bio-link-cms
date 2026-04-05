import { describe, expect, it, jest } from "@jest/globals";

import { syncTelegramUserFromContact, sendAuthorizeButton } from "../../src/bot-app/services/auth-service.js";
import { getTelegramAuthState } from "../../src/bot-app/utils/auth-state.js";
import { botMessages } from "../../src/bot-app/helpers/messages.js";
import { createMockStore } from "../helpers/mock-store.js";

describe("bot auth service", () => {
  it("sends authorize button with backend auth uuid", async () => {
    const store = createMockStore();
    store.createTelegramAuthToken.mockResolvedValue({
      authUuid: "auth-uuid-1",
    });

    const reply = jest.fn(async (..._args: unknown[]) => undefined);
    const ctx = {
      reply,
    } as never;

    await sendAuthorizeButton(store as never, ctx, "user-1");

    expect(store.createTelegramAuthToken).toHaveBeenCalledWith("user-1");
    expect(reply).toHaveBeenCalledWith(
      botMessages.authorize,
      expect.objectContaining({
        reply_markup: {
          inline_keyboard: [
            [
              expect.objectContaining({
                text: botMessages.authorizeButton,
                url: expect.stringContaining("authUuid=auth-uuid-1"),
              }),
            ],
          ],
        },
      }),
    );
  });

  it("syncs telegram contact into user profile state", async () => {
    const store = createMockStore();
    const reply = jest.fn(async (..._args: unknown[]) => undefined);
    const user = {
      id: "user-telegram",
      provider: "telegram",
    };
    store.upsertTelegramUser.mockResolvedValue(user);

    const ctx = {
      state: {},
      from: {
        id: 9001,
        username: "aziz",
        first_name: "Aziz",
        last_name: "Karimov",
      },
      reply,
    } as never;

    const authState = getTelegramAuthState(ctx);
    authState.telegramUserId = "9001";

    const result = await syncTelegramUserFromContact(store as never, ctx, {
      phone_number: "+998901234567",
    } as never);

    expect(result).toBe(user);
    expect(store.upsertTelegramUser).toHaveBeenCalledWith({
      telegramUserId: "9001",
      phone: "+998901234567",
      telegramUsername: "aziz",
      firstName: "Aziz",
      lastName: "Karimov",
    });
    expect(getTelegramAuthState(ctx).user).toBe(user);
    expect(reply).toHaveBeenCalledWith(
      botMessages.phoneAccepted,
      expect.any(Object),
    );
  });
});
