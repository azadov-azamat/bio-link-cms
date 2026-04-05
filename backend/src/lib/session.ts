import type { FastifyReply, FastifyRequest } from "fastify";

import type { DatabaseStore, SessionWithUser } from "./db.js";
import { verifyAccessToken } from "./auth.js";

export const SESSION_COOKIE = "biosahifa_session";

export function setSessionCookie(reply: FastifyReply, session: SessionWithUser) {
  reply.setCookie(SESSION_COOKIE, session.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: false,
    expires: new Date(session.expiresAt),
  });
}

export async function getSessionFromRequest(
  request: FastifyRequest,
  store: DatabaseStore,
) {
  const authorizationHeader = request.headers.authorization;

  if (authorizationHeader?.startsWith("Bearer ")) {
    const token = authorizationHeader.slice("Bearer ".length).trim();

    if (token) {
      try {
        const payload = await verifyAccessToken(token);

        if (payload.userId) {
          const userSession = await store.findUserSessionById(payload.userId);

          if (userSession) {
            return userSession;
          }
        }
      } catch {
        return null;
      }
    }
  }

  const token = request.cookies[SESSION_COOKIE];

  if (!token) {
    return null;
  }

  return store.findSessionByToken(token);
}
