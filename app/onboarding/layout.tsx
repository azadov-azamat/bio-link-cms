import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BioSahifa - Onboarding",
  description: "Profil sahifangizni yaratish uchun onboarding bosqichlarini yakunlang",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
