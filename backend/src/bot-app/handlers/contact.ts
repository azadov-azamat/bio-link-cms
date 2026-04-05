import type { Telegraf } from "telegraf";

import type { DatabaseStore } from "../../lib/db.js";
import { botMessages } from "../helpers/messages.js";
import {
  sendAuthorizeButton,
  syncTelegramUserFromContact,
} from "../services/auth-service.js";
import { getTelegramAuthState } from "../utils/auth-state.js";

export function registerContactHandler(bot: Telegraf, store: DatabaseStore) {
  bot.on("contact", async (ctx) => {
    const contact = ctx.message.contact;
    const telegramUserId = getTelegramAuthState(ctx).telegramUserId;

    if (!telegramUserId || !ctx.from) {
      await ctx.reply(botMessages.unknownUser);
      return;
    }

    if (contact.user_id && String(contact.user_id) !== telegramUserId) {
      await ctx.reply(botMessages.ownContactOnly);
      return;
    }

    const user = await syncTelegramUserFromContact(store, ctx, contact);
    await sendAuthorizeButton(store, ctx, user.id);
  });
}
