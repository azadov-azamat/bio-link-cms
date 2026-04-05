import { z } from "zod";

export const onboardingStepIds = [
  "source",
  "platforms",
  "template",
  "basic",
  "socials",
  "contacts",
] as const;

export type OnboardingStepId = (typeof onboardingStepIds)[number];

const websiteSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const onboardingStepSchemas = {
  source: z.object({
    source: z.string(),
  }),
  platforms: z.object({
    platforms: z.array(z.string()),
  }),
  template: z.object({
    templateId: z.string().uuid().nullable().optional(),
  }),
  basic: z.object({
    title: z.string(),
    description: z.string(),
    logoMediaId: z.string().uuid().nullable().optional(),
  }),
  socials: z.object({
    socials: z.record(z.string()),
    websites: z.array(websiteSchema),
  }),
  contacts: z.object({
    workHours: z.string(),
    phones: z.array(z.string()),
    googleMaps: z.string(),
  }),
} as const;

export const completeOnboardingSchema = z.object({
  completed: z.literal(true).optional(),
});

export type SourceStepInput = z.infer<(typeof onboardingStepSchemas)["source"]>;
export type PlatformsStepInput = z.infer<(typeof onboardingStepSchemas)["platforms"]>;
export type TemplateStepInput = z.infer<(typeof onboardingStepSchemas)["template"]>;
export type BasicStepInput = z.infer<(typeof onboardingStepSchemas)["basic"]>;
export type SocialsStepInput = z.infer<(typeof onboardingStepSchemas)["socials"]>;
export type ContactsStepInput = z.infer<(typeof onboardingStepSchemas)["contacts"]>;

export type OnboardingStepPayload =
  | SourceStepInput
  | PlatformsStepInput
  | TemplateStepInput
  | BasicStepInput
  | SocialsStepInput
  | ContactsStepInput;

export interface TemplateRecord {
  id: string;
  key: string;
  name: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface MediaRecord {
  id: string;
  url: string;
  mimeType: string;
  fileName: string | null;
}

export interface ProfileRecord {
  source: string;
  platforms: string[];
  template: string;
  templateId: string;
  logo: string | null;
  logoMediaId: string | null;
  title: string;
  description: string;
  socials: Record<string, string>;
  websites: Array<{ name: string; url: string }>;
  workHours: string;
  phones: string[];
  googleMaps: string;
  slug: string;
  status: "draft" | "ready";
}

export interface DashboardResponse {
  profile: ProfileRecord;
  isGuest: boolean;
  claimRequired: boolean;
}

export interface AuthSessionResponse {
  authenticated: boolean;
  kind: "guest" | "oauth" | null;
  provider: string | null;
  userId: string | null;
  telegramId: string | null;
}
