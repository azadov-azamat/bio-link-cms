import type { Update } from "telegraf/types";

import type { DatabaseStore } from "../../lib/db.js";

export interface BotAppLogger {
  info(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  error(...args: unknown[]): void;
}

export interface CreateBotAppOptions {
  store: DatabaseStore;
  logger: BotAppLogger;
}

export interface BotApp {
  handleUpdate(update: Update): Promise<void>;
  startBot(): Promise<void>;
  stopBot(reason: string): Promise<void>;
  registerWebhookIfNeeded(): Promise<void>;
}
