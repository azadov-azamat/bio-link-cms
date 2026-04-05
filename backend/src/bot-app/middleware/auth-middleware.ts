import type { MiddlewareFn } from "telegraf";

import type { DatabaseStore } from "../../lib/db.js";
import type { User } from "../../models/user.js";
import type { TelegramBotContext } from "../types/context.js";
import { getTelegramAuthState } from "../utils/auth-state.js";

const UPDATE_CACHE_TTL_MS = 60_000;
const USER_CACHE_TTL_MS = 30_000;

const processedUpdates = new Map<number, number>();
const userCache = new Map<
  string,
  {
    expiresAt: number;
    user: User | null;
  }
>();

function cleanupProcessedUpdates(now: number) {
  for (const [updateId, expiresAt] of processedUpdates.entries()) {
    if (expiresAt <= now) {
      processedUpdates.delete(updateId);
    }
  }
}

function cleanupUserCache(now: number) {
  for (const [telegramUserId, cached] of userCache.entries()) {
    if (cached.expiresAt <= now) {
      userCache.delete(telegramUserId);
    }
  }
}

export function setCachedTelegramUser(
  telegramUserId: string,
  user: User | null,
  ttlMs = USER_CACHE_TTL_MS,
) {
  userCache.set(telegramUserId, {
    expiresAt: Date.now() + ttlMs,
    user,
  });
}

export function createTelegramDedupMiddleware(): MiddlewareFn<TelegramBotContext> {
  return async (ctx, next) => {
    const now = Date.now();
    cleanupProcessedUpdates(now);

    const updateId = ctx.update.update_id;

    if (processedUpdates.has(updateId)) {
      return;
    }

    processedUpdates.set(updateId, now + UPDATE_CACHE_TTL_MS);
    await next();
  };
}

export function createTelegramAuthMiddleware(
  store: DatabaseStore,
): MiddlewareFn<TelegramBotContext> {
  return async (ctx, next) => {
    const now = Date.now();
    cleanupUserCache(now);

    const telegramUserId = ctx.from ? String(ctx.from.id) : null;
    const telegramAuth = getTelegramAuthState(ctx);

    if (!telegramUserId) {
      telegramAuth.telegramUserId = null;
      telegramAuth.user = null;
      await next();
      return;
    }

    const cached = userCache.get(telegramUserId);
    let user = cached && cached.expiresAt > now ? cached.user : null;

    if (!cached || cached.expiresAt <= now) {
      user = await store.findTelegramUserByTelegramId(telegramUserId);
      setCachedTelegramUser(telegramUserId, user);
    }

    telegramAuth.telegramUserId = telegramUserId;
    telegramAuth.user = user;

    await next();
  };
}
