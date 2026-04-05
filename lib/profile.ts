import type { OnboardingData } from "@/components/onboarding/utils";

export type ProfileStatus = "draft" | "ready";
export type OnboardingStepId =
  | "source"
  | "platforms"
  | "template"
  | "basic"
  | "socials"
  | "contacts";

export interface TemplateDTO {
  id: string;
  key: string;
  name: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface MediaDTO {
  id: string;
  url: string;
  mimeType: string;
  fileName: string | null;
}

export interface ProfileDraftDTO extends OnboardingData {
  slug: string;
  status: ProfileStatus;
}

export interface DashboardDTO {
  profile: ProfileDraftDTO;
  isGuest: boolean;
  claimRequired: boolean;
}

export interface AuthSessionDTO {
  authenticated: boolean;
  kind: "guest" | "oauth" | null;
  provider: string | null;
  userId: string | null;
  telegramId: string | null;
}

export interface SourceStepPayload {
  source: string;
}

export interface PlatformsStepPayload {
  platforms: string[];
}

export interface TemplateStepPayload {
  templateId: string | null;
}

export interface BasicStepPayload {
  title: string;
  description: string;
  logoMediaId: string | null;
}

export interface SocialsStepPayload {
  socials: Record<string, string>;
  websites: Array<{ name: string; url: string }>;
}

export interface ContactsStepPayload {
  workHours: string;
  phones: string[];
  googleMaps: string;
}

export type OnboardingStepPayload =
  | SourceStepPayload
  | PlatformsStepPayload
  | TemplateStepPayload
  | BasicStepPayload
  | SocialsStepPayload
  | ContactsStepPayload;
