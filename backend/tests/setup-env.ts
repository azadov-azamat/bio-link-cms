process.env.NODE_ENV = "test";
process.env.FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
process.env.FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || "http://localhost:3000";
process.env.JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || "test-secret-value-123456789";
process.env.TELEGRAM_WEBHOOK_URL =
  process.env.TELEGRAM_WEBHOOK_URL || "https://backend.example.com";
process.env.TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || "123456:test-token";
process.env.TELEGRAM_BOT_USERNAME =
  process.env.TELEGRAM_BOT_USERNAME || "biosahifa_test_bot";
process.env.BOT_TRANSPORT = process.env.BOT_TRANSPORT || "webhook";
