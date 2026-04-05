import type { FastifyInstance } from "fastify";

import type { DatabaseStore } from "../lib/db.js";

export async function registerTemplateRoutes(
  app: FastifyInstance,
  store: DatabaseStore,
) {
  app.get("/api/v1/templates", async () => {
    return store.getTemplates();
  });
}
