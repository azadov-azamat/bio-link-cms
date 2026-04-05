import Fastify, { type FastifyBaseLogger } from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";

import type { BotApp } from "./bot-app/index.js";
import type { DatabaseStore } from "./lib/db.js";
import { registerAuthRoutes } from "./routes/auth.js";
import { registerDashboardRoutes } from "./routes/dashboard.js";
import { registerMediaRoutes } from "./routes/media.js";
import { registerOnboardingRoutes } from "./routes/onboarding.js";
import { registerProfileRoutes } from "./routes/profiles.js";
import { registerTemplateRoutes } from "./routes/templates.js";
import { registerTelegramRoutes } from "./routes/telegram.js";

export async function createApp(options: {
  store: DatabaseStore;
  botApp?: BotApp | null;
  logger?: boolean | FastifyBaseLogger;
  frontendOrigin?: string;
}) {
  const app = Fastify({
    logger: options.logger ?? true,
  });

  const frontendOrigin =
    options.frontendOrigin ||
    process.env.FRONTEND_ORIGIN ||
    "http://localhost:3000";

  await app.register(cookie);
  await app.register(multipart, {
    limits: {
      files: 1,
      fileSize: 5 * 1024 * 1024,
    },
  });
  await app.register(cors, {
    origin: (origin, callback) => {
      if (!origin || origin === frontendOrigin) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed"), false);
    },
    credentials: true,
  });

  app.get("/health", async () => ({ ok: true }));

  await registerAuthRoutes(app, options.store);
  await registerTemplateRoutes(app, options.store);
  await registerMediaRoutes(app, options.store);
  await registerOnboardingRoutes(app, options.store);
  await registerProfileRoutes(app, options.store);
  await registerDashboardRoutes(app, options.store);

  if (options.botApp) {
    await registerTelegramRoutes(app, options.botApp);
  }

  app.addHook("onClose", async () => {
    if (options.botApp) {
      await options.botApp.stopBot("fastify-close");
    }

    await options.store.close();
  });

  return app;
}
