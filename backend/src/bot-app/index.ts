import { Telegraf } from "telegraf";
import type { Update } from "telegraf/types";

import { registerContactHandler } from "./handlers/contact.js";
import { registerStartHandler } from "./handlers/start.js";
import {
  createTelegramAuthMiddleware,
  createTelegramDedupMiddleware,
} from "./middleware/auth-middleware.js";
import type { BotApp, CreateBotAppOptions } from "./types/runtime.js";
import {
  getBotTransport,
  getTelegramWebhookUrl,
  isBotRuntimeConfigured,
} from "./utils/runtime.js";

export { isBotRuntimeConfigured };
export type { BotApp } from "./types/runtime.js";

export function createBotApp(options: CreateBotAppOptions): BotApp {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();

  if (!token) {
    throw new Error(
      "Telegram bot config incomplete. TELEGRAM_BOT_TOKEN is required.",
    );
  }

  const { logger, store } = options;
  const bot = new Telegraf(token);
  const transport = getBotTransport();
  let started = false;

  bot.use(createTelegramDedupMiddleware());
  bot.use(createTelegramAuthMiddleware(store));

  registerStartHandler(bot, store);
  registerContactHandler(bot, store);

  return {
    async handleUpdate(update: Update) {
      await bot.handleUpdate(update);
    },
    async startBot() {
      if (started) {
        return;
      }

      if (transport === "polling") {
        await bot.telegram.deleteWebhook({ drop_pending_updates: true }).catch(() => {});
        await bot.launch();
        logger.info("Telegram bot started in polling mode.");
      } else {
        logger.info("Telegram bot initialized in webhook mode.");
      }

      started = true;
    },
    async registerWebhookIfNeeded() {
      if (transport !== "webhook") {
        return;
      }

      await bot.telegram.setWebhook(getTelegramWebhookUrl());
      logger.info("Telegram webhook registered.");
    },
    async stopBot(reason: string) {
      if (!started) {
        return;
      }

      if (transport === "polling") {
        try {
          await bot.stop(reason);
        } catch {}
      } else {
        await bot.telegram.deleteWebhook({ drop_pending_updates: true }).catch(() => {});
      }

      started = false;
      logger.info({ reason }, "Telegram bot stopped.");
    },
  };
}
