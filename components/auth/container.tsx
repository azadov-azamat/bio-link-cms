"use client";

import { useRouter } from "next/navigation";
import { AuthPage } from "./page";

export function AuthContainer() {
  const router = useRouter();

  return <AuthPage onAuth={() => router.push("/onboarding")} />;
}
