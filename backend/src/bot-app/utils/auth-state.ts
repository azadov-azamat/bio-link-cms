import type { Context } from "telegraf";

import type { User } from "../../models/user.js";

export interface TelegramAuthState {
  telegramUserId: string | null;
  user: User | null;
}

export function getTelegramAuthState(ctx: Context): TelegramAuthState {
  const state = ctx.state as Context["state"] & {
    telegramAuth?: TelegramAuthState;
  };

  if (!state.telegramAuth) {
    state.telegramAuth = {
      telegramUserId: null,
      user: null,
    };
  }

  return state.telegramAuth;
}
