export type BotTransport = "webhook" | "polling";

function hasUsableWebhookUrl() {
  const raw = process.env.TELEGRAM_WEBHOOK_URL?.trim();

  if (!raw || raw.includes("your-public-backend-url")) {
    return false;
  }

  try {
    const parsed = new URL(raw);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function getBotTransport(): BotTransport {
  const configured = process.env.BOT_TRANSPORT?.trim().toLowerCase();

  if (configured === "polling" && process.env.NODE_ENV !== "production") {
    return "polling";
  }

  return "webhook";
}

export function isBotRuntimeConfigured() {
  if (!process.env.TELEGRAM_BOT_TOKEN?.trim()) {
    return false;
  }

  return hasUsableWebhookUrl();
}

export function getTelegramWebhookUrl() {
  const baseUrl = process.env.TELEGRAM_WEBHOOK_URL?.trim()?.replace(/\/$/, "");

  if (!baseUrl) {
    throw new Error("TELEGRAM_WEBHOOK_URL is required");
  }

  return `${baseUrl}/api/v1/telegram/webhook`;
}
