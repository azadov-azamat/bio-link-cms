"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { clearAuthSession } from "@/lib/auth-session";
import { useAuthStatus } from "@/components/use-auth-status";

export function DashboardAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { hydrated, hasLocalToken, isAuthenticated, isChecking } = useAuthStatus();

  useEffect(() => {
    if (!hydrated || isChecking) {
      return;
    }

    if (!hasLocalToken || !isAuthenticated) {
      clearAuthSession();
      router.replace("/auth");
    }
  }, [hasLocalToken, hydrated, isAuthenticated, isChecking, router]);

  if (!hydrated || isChecking) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,_#f6f6f4_0%,_#efefeb_100%)]">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5">
          <div className="rounded-[28px] border border-zinc-200 bg-white px-6 py-5 text-sm font-medium text-zinc-500 shadow-sm">
            Dashboard yuklanmoqda...
          </div>
        </div>
      </div>
    );
  }

  if (!hasLocalToken || !isAuthenticated) {
    return null;
  }

  return <DashboardShell>{children}</DashboardShell>;
}
