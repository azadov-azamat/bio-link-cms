import type { FastifyInstance } from "fastify";

import type { DatabaseStore } from "../lib/db.js";
import { getSessionFromRequest } from "../lib/session.js";

export async function registerMediaRoutes(
  app: FastifyInstance,
  store: DatabaseStore,
) {
  app.post("/api/v1/media", async (request, reply) => {
    const session = await getSessionFromRequest(request, store);

    if (!session) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    const file = await request.file();

    if (!file) {
      return reply.code(400).send({ message: "Media file is required" });
    }

    if (!file.mimetype.startsWith("image/")) {
      return reply.code(400).send({ message: "Only image uploads are supported" });
    }

    const buffer = await file.toBuffer();
    const media = await store.createMedia({
      userId: session.user.id,
      mimeType: file.mimetype,
      fileName: file.filename,
      data: buffer,
    });

    return reply.code(201).send(media);
  });
}
