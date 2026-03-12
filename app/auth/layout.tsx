import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BioSahifa - Tizimga kirish",
  description: "Hisobingizga kiring va shaxsiy sahifangizni yarating",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
