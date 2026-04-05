import type { FastifyInstance } from "fastify";

import type { DatabaseStore } from "../lib/db.js";
import { getSessionFromRequest } from "../lib/session.js";

export async function registerProfileRoutes(
  app: FastifyInstance,
  store: DatabaseStore,
) {
  app.get("/api/v1/profiles/me", async (request, reply) => {
    const session = await getSessionFromRequest(request, store);

    if (!session) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    const profile = await store.getProfileByUserId(session.user.id);

    if (!profile) {
      return reply.code(404).send({ message: "Profile not found" });
    }

    return profile;
  });
}
