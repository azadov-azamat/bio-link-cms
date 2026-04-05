import type { FastifyInstance } from "fastify";

import type { DatabaseStore } from "../lib/db.js";
import { getSessionFromRequest } from "../lib/session.js";
import {
  completeOnboardingSchema,
  onboardingStepIds,
  onboardingStepSchemas,
} from "../types/profile.js";

export async function registerOnboardingRoutes(
  app: FastifyInstance,
  store: DatabaseStore,
) {
  app.get("/api/v1/onboarding/me", async (request, reply) => {
    const session = await getSessionFromRequest(request, store);

    if (!session) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    const profile = await store.getProfileByUserId(session.user.id);

    if (!profile) {
      return reply.code(404).send({ message: "Onboarding draft not found" });
    }

    return profile;
  });

  app.post<{
    Params: {
      stepId: string;
    };
  }>("/api/v1/onboarding/steps/:stepId", async (request, reply) => {
    const session = await getSessionFromRequest(request, store);

    if (!session) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    const stepId = request.params.stepId;

    if (!onboardingStepIds.includes(stepId as (typeof onboardingStepIds)[number])) {
      return reply.code(404).send({ message: "Onboarding step not found" });
    }

    const schema = onboardingStepSchemas[stepId as keyof typeof onboardingStepSchemas];
    const parsed = schema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        message: "Validation failed",
        issues: parsed.error.flatten(),
      });
    }

    const profile = await store.saveOnboardingStep(
      session.user.id,
      stepId as (typeof onboardingStepIds)[number],
      parsed.data,
    );

    return reply.code(200).send(profile);
  });

  app.post("/api/v1/onboarding/complete", async (request, reply) => {
    const session = await getSessionFromRequest(request, store);

    if (!session) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    const parsed = completeOnboardingSchema.safeParse(request.body ?? {});

    if (!parsed.success) {
      return reply.code(400).send({
        message: "Validation failed",
        issues: parsed.error.flatten(),
      });
    }

    const profile = await store.completeOnboarding(session.user.id);

    return reply.code(200).send(profile);
  });
}
