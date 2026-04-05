import type { FastifyInstance } from "fastify";
import type { Update } from "telegraf/types";

import type { BotApp } from "../bot-app/index.js";

export async function registerTelegramRoutes(
  app: FastifyInstance,
  botApp: BotApp,
) {
  app.post("/api/v1/telegram/webhook", async (request, reply) => {
    reply.code(200).send({ ok: true });

    void botApp.handleUpdate(request.body as Update).catch((error) => {
      request.log.error({ err: error }, "Telegram update handling failed");
    });
  });
}
