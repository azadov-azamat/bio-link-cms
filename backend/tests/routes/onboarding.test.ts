import { afterEach, describe, expect, it } from "@jest/globals";

import { createApp } from "../../src/app.js";
import { makeProfile, makeSession, createMockStore } from "../helpers/mock-store.js";

describe("onboarding routes", () => {
  const apps: Array<Awaited<ReturnType<typeof createApp>>> = [];

  afterEach(async () => {
    await Promise.all(apps.splice(0).map((app) => app.close()));
  });

  it("returns unauthorized for draft without session", async () => {
    const store = createMockStore();
    const app = await createApp({
      store: store as never,
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/onboarding/me",
    });

    expect(response.statusCode).toBe(401);
  });

  it("saves a valid onboarding step", async () => {
    const store = createMockStore();
    store.findSessionByToken.mockResolvedValue(makeSession());
    store.saveOnboardingStep.mockResolvedValue(
      makeProfile({ title: "Updated title" }),
    );

    const app = await createApp({
      store: store as never,
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/onboarding/steps/basic",
      headers: {
        cookie: "biosahifa_session=session-token",
      },
      payload: {
        title: "Updated title",
        description: "Updated description",
        logoMediaId: "22222222-2222-4222-8222-222222222222",
      },
    });

    expect(response.statusCode).toBe(200);
    expect(store.saveOnboardingStep).toHaveBeenCalledWith(
      "user-1",
      "basic",
      expect.objectContaining({
        title: "Updated title",
      }),
    );
    expect(response.json().title).toBe("Updated title");
  });

  it("rejects invalid onboarding payloads", async () => {
    const store = createMockStore();
    store.findSessionByToken.mockResolvedValue(makeSession());

    const app = await createApp({
      store: store as never,
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/onboarding/steps/template",
      headers: {
        cookie: "biosahifa_session=session-token",
      },
      payload: {
        templateId: "not-a-uuid",
      },
    });

    expect(response.statusCode).toBe(400);
    expect(store.saveOnboardingStep).not.toHaveBeenCalled();
  });

  it("completes onboarding", async () => {
    const store = createMockStore();
    store.findSessionByToken.mockResolvedValue(makeSession());
    store.completeOnboarding.mockResolvedValue(
      makeProfile({ status: "ready" }),
    );

    const app = await createApp({
      store: store as never,
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/onboarding/complete",
      headers: {
        cookie: "biosahifa_session=session-token",
      },
      payload: {
        completed: true,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().status).toBe("ready");
  });
});
