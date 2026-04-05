import type { FastifyInstance, FastifyRequest } from "fastify";

import { isBotRuntimeConfigured } from "../bot-app/index.js";
import { buildFrontendCallbackUrl, createAccessToken } from "../lib/auth.js";
import type { DatabaseStore } from "../lib/db.js";
import { getSessionFromRequest, setSessionCookie } from "../lib/session.js";

export async function registerAuthRoutes(
  app: FastifyInstance,
  store: DatabaseStore,
) {
  app.post("/api/v1/auth/guest", async (request, reply) => {
    const existingSession = await getSessionFromRequest(request, store);

    if (existingSession) {
      setSessionCookie(reply, existingSession);
      return {
        authenticated: true as const,
        kind: existingSession.user.kind,
      };
    }

    const session = await store.createGuestSession();
    setSessionCookie(reply, session);

    return {
      authenticated: true as const,
      kind: session.user.kind,
    };
  });

  app.get("/api/v1/auth/session", async (request) => {
    const session = await getSessionFromRequest(request, store);

    if (!session) {
      return {
        authenticated: false as const,
        kind: null,
        provider: null,
        userId: null,
        telegramId: null,
      };
    }

    return (
      (await store.getAuthSessionByUserId(session.user.id)) || {
        authenticated: false as const,
        kind: null,
        provider: null,
        userId: null,
        telegramId: null,
      }
    );
  });

  app.get<{
    Querystring: {
      authUuid?: string;
    };
  }>("/api/v1/auth/telegram/authorize", async (request, reply) => {
    if (!isBotRuntimeConfigured()) {
      return reply.redirect(
        buildFrontendCallbackUrl({
          authStatus: "error",
          message: "Telegram auth is not configured on the backend",
        }),
      );
    }

    const authUuid = request.query.authUuid?.trim();

    if (!authUuid) {
      return reply.redirect(
        buildFrontendCallbackUrl({
          authStatus: "error",
          message: "Telegram authorization UUID is missing",
        }),
      );
    }

    try {
      const result = await store.consumeTelegramAuthToken(authUuid);
      const accessToken = await createAccessToken({
        userId: result.userId,
        telegramId: result.telegramId,
      });

      return reply.redirect(
        buildFrontendCallbackUrl({
          authStatus: "success",
          accessToken,
          userId: result.userId,
          telegramId: result.telegramId,
        }),
      );
    } catch (error) {
      return reply.redirect(
        buildFrontendCallbackUrl({
          authStatus: "error",
          message:
            error instanceof Error
              ? error.message
              : "Telegram authorization failed",
        }),
      );
    }
  });
}
