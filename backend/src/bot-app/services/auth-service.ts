import type { Contact } from "telegraf/types";

import type { DatabaseStore } from "../../lib/db.js";
import { getTelegramWebhookBaseUrl } from "../../lib/auth.js";
import { botMessages } from "../helpers/messages.js";
import {
  createAuthorizeKeyboard,
  createContactRequestKeyboard,
  createRemoveKeyboard,
} from "../helpers/keyboards.js";
import { setCachedTelegramUser } from "../middleware/auth-middleware.js";
import type { TelegramBotContext } from "../types/context.js";
import { getTelegramAuthState } from "../utils/auth-state.js";

export async function requestPhone(ctx: TelegramBotContext) {
  await ctx.reply(botMessages.requestPhone, createContactRequestKeyboard());
}

export async function sendAuthorizeButton(
  store: DatabaseStore,
  ctx: TelegramBotContext,
  userId: string,
) {
  const authToken = await store.createTelegramAuthToken(userId);
  const authorizeUrl = new URL(
    "/api/v1/auth/telegram/authorize",
    getTelegramWebhookBaseUrl(),
  );

  authorizeUrl.searchParams.set("authUuid", authToken.authUuid);

  await ctx.reply(
    botMessages.authorize,
    createAuthorizeKeyboard(authorizeUrl.toString()),
  );
}

export async function syncTelegramUserFromContact(
  store: DatabaseStore,
  ctx: TelegramBotContext,
  contact: Contact,
) {
  const telegramAuth = getTelegramAuthState(ctx);
  const telegramUserId = telegramAuth.telegramUserId;
  const from = ctx.from;

  if (!telegramUserId || !from) {
    throw new Error(botMessages.unknownUser);
  }

  const user = await store.upsertTelegramUser({
    telegramUserId,
    phone: contact.phone_number,
    telegramUsername: from.username || null,
    firstName: from.first_name || null,
    lastName: from.last_name || null,
  });

  telegramAuth.user = user;
  setCachedTelegramUser(telegramUserId, user);

  await ctx.reply(botMessages.phoneAccepted, createRemoveKeyboard());

  return user;
}
