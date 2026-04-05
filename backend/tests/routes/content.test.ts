import { afterEach, describe, expect, it, jest } from "@jest/globals";
import FormData from "form-data";

import { createApp } from "../../src/app.js";
import { createMockStore, makeDashboard, makeMedia, makeProfile, makeSession, makeTemplate } from "../helpers/mock-store.js";

describe("content routes", () => {
  const apps: Array<Awaited<ReturnType<typeof createApp>>> = [];

  afterEach(async () => {
    await Promise.all(apps.splice(0).map((app) => app.close()));
  });

  it("returns templates list", async () => {
    const store = createMockStore();
    store.getTemplates.mockResolvedValue([makeTemplate()]);

    const app = await createApp({
      store: store as never,
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/templates",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveLength(1);
  });

  it("uploads image media for authenticated user", async () => {
    const store = createMockStore();
    store.findSessionByToken.mockResolvedValue(makeSession());
    store.createMedia.mockResolvedValue(makeMedia());

    const app = await createApp({
      store: store as never,
      logger: false,
    });
    apps.push(app);

    const form = new FormData();
    form.append("file", Buffer.from("fake-image"), {
      filename: "logo.png",
      contentType: "image/png",
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/media",
      headers: {
        ...form.getHeaders(),
        cookie: "biosahifa_session=session-token",
      },
      payload: form.getBuffer(),
    });

    expect(response.statusCode).toBe(201);
    expect(store.createMedia).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "user-1",
        mimeType: "image/png",
        fileName: "logo.png",
      }),
    );
  });

  it("returns dashboard and profile for authenticated user", async () => {
    const store = createMockStore();
    store.findSessionByToken.mockResolvedValue(makeSession());
    store.getDashboardByUserId.mockResolvedValue(makeDashboard());
    store.getProfileByUserId.mockResolvedValue(makeProfile());

    const app = await createApp({
      store: store as never,
      logger: false,
    });
    apps.push(app);

    const [dashboardResponse, profileResponse] = await Promise.all([
      app.inject({
        method: "GET",
        url: "/api/v1/dashboard/me",
        headers: { cookie: "biosahifa_session=session-token" },
      }),
      app.inject({
        method: "GET",
        url: "/api/v1/profiles/me",
        headers: { cookie: "biosahifa_session=session-token" },
      }),
    ]);

    expect(dashboardResponse.statusCode).toBe(200);
    expect(profileResponse.statusCode).toBe(200);
    expect(dashboardResponse.json().profile.title).toBe("Aziz Karimov");
    expect(profileResponse.json().slug).toBe("aziz-karimov");
  });

  it("accepts telegram webhook and forwards update to bot app", async () => {
    const store = createMockStore();
    const botApp = {
      handleUpdate: jest.fn(async (_payload: unknown) => undefined),
      startBot: jest.fn(async () => undefined),
      registerWebhookIfNeeded: jest.fn(async () => undefined),
      stopBot: jest.fn(async () => undefined),
    };

    const app = await createApp({
      store: store as never,
      botApp: botApp as never,
      logger: false,
    });
    apps.push(app);

    const payload = { update_id: 101, message: { text: "/start" } };

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/telegram/webhook",
      payload,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ ok: true });
    expect(botApp.handleUpdate).toHaveBeenCalledWith(payload);
  });
});
