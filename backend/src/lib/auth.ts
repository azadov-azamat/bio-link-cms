import { SignJWT, jwtVerify } from "jose";

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required`);
  }

  return value;
}

export function getFrontendUrl() {
  return getRequiredEnv("FRONTEND_URL").replace(/\/$/, "");
}

export function getTelegramWebhookBaseUrl() {
  return getRequiredEnv("TELEGRAM_WEBHOOK_URL").replace(/\/$/, "");
}

function getAccessTokenSecret() {
  return new TextEncoder().encode(getRequiredEnv("JWT_ACCESS_SECRET"));
}

export async function createAccessToken(params: {
  userId: string;
  telegramId: string;
}) {
  return new SignJWT({
    authProvider: "telegram",
    telegramId: params.telegramId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(params.userId)
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getAccessTokenSecret());
}

export async function verifyAccessToken(token: string) {
  const result = await jwtVerify(token, getAccessTokenSecret());
  const telegramId =
    typeof result.payload.telegramId === "string"
      ? result.payload.telegramId
      : null;

  return {
    userId: result.payload.sub || null,
    telegramId,
  };
}

export function buildFrontendCallbackUrl(params: {
  authStatus: "success" | "error";
  accessToken?: string;
  userId?: string;
  telegramId?: string;
  message?: string;
}) {
  const url = new URL("/auth/callback", getFrontendUrl());

  url.searchParams.set("authStatus", params.authStatus);

  if (params.accessToken) {
    url.searchParams.set("accessToken", params.accessToken);
  }

  if (params.userId) {
    url.searchParams.set("userId", params.userId);
  }

  if (params.telegramId) {
    url.searchParams.set("telegramId", params.telegramId);
  }

  if (params.message) {
    url.searchParams.set("message", params.message);
  }

  return url.toString();
}
