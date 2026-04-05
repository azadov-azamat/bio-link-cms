import "dotenv/config";

import { ConnectionRefusedError } from "sequelize";

import { createApp } from "./app.js";
import { createBotApp, isBotRuntimeConfigured, type BotApp } from "./bot-app/index.js";
import { DatabaseStore } from "./lib/db.js";

const port = Number(process.env.PORT || 4000);
const frontendOrigin =
  process.env.FRONTEND_ORIGIN || "http://localhost:3000";

const store = new DatabaseStore();
const bootstrapLogger = console;

try {
  await store.initialize();
} catch (error) {
  if (error instanceof ConnectionRefusedError) {
    bootstrapLogger.error(
      [
        "Postgres ulanmadi.",
        "1. `cd backend && docker compose up -d` ni ishga tushiring",
        "2. so'ng `yarn migrate` bajaring",
        "3. kerak bo'lsa `backend/.env` dagi DATABASE_URL ni tekshiring",
      ].join("\n"),
    );
  } else {
    bootstrapLogger.error(error);
  }

  process.exit(1);
}

let botApp: BotApp | null = null;
let app = await createApp({
  store,
  logger: true,
  frontendOrigin,
});

if (isBotRuntimeConfigured()) {
  try {
    botApp = createBotApp({
      store,
      logger: app.log,
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
} else {
  app.log.warn(
    "Telegram bot disabled: TELEGRAM_BOT_TOKEN missing or TELEGRAM_WEBHOOK_URL is not a real public HTTPS URL.",
  );
}

if (botApp) {
  app = await createApp({
    store,
    botApp,
    logger: true,
    frontendOrigin,
  });
}

try {
  await app.listen({ port, host: "0.0.0.0" });
  if (botApp) {
    await botApp.startBot();
    await botApp.registerWebhookIfNeeded();
  }
} catch (error) {
  app.log.error(error);
  await app.close().catch(() => {});
  process.exit(1);
}

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => {
    void app.close().finally(() => process.exit(0));
  });
}
