import type { FastifyInstance } from "fastify";

import type { DatabaseStore } from "../lib/db.js";
import { getSessionFromRequest } from "../lib/session.js";

export async function registerDashboardRoutes(
  app: FastifyInstance,
  store: DatabaseStore,
) {
  app.get("/api/v1/dashboard/me", async (request, reply) => {
    const session = await getSessionFromRequest(request, store);

    if (!session) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    const dashboard = await store.getDashboardByUserId(session.user.id);

    if (!dashboard) {
      return reply.code(404).send({ message: "Dashboard not found" });
    }

    return dashboard;
  });
}
