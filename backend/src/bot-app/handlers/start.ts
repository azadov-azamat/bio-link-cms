import type { Telegraf } from "telegraf";

import type { DatabaseStore } from "../../lib/db.js";
import { requestPhone, sendAuthorizeButton } from "../services/auth-service.js";
import { getTelegramAuthState } from "../utils/auth-state.js";

export function registerStartHandler(bot: Telegraf, store: DatabaseStore) {
  bot.start(async (ctx) => {
    const telegramAuth = getTelegramAuthState(ctx);
    const existingUser = telegramAuth.user;

    if (!existingUser || !existingUser.phone) {
      await requestPhone(ctx);
      return;
    }

    await sendAuthorizeButton(store, ctx, existingUser.id);
  });
}
