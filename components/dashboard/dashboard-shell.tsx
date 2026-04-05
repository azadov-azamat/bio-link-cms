"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BarChart3, LayoutTemplate, UserRound } from "lucide-react";

import { LayoutContainer } from "@/components/layout-container";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    href: "/dashboard/my-sites",
    label: "My sites",
    description: "Profile studio va preview",
    icon: LayoutTemplate,
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    description: "Trafic va conversion",
    icon: BarChart3,
  },
  {
    href: "/dashboard/account",
    label: "Account",
    description: "Claim va sessiya holati",
    icon: UserRound,
  },
] as const;

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <LayoutContainer className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-75 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900">
              <Icons.BrandIcon />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                BioSahifa
              </p>
              <h1 className="text-lg font-black tracking-tight text-zinc-900" style={{ fontFamily: "'Georgia', serif" }}>
                Studio
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-2 md:hidden">
            <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
              <Icons.Menu />
            </button>
          </div>
        </LayoutContainer>
      </div>

      {/* Main Content */}
      <LayoutContainer className="py-6">
        <div className="grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)]">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24 space-y-1">
              {NAV_ITEMS.map(({ href, label, description, icon: Icon }) => {
                const active = pathname === href;

                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "group flex flex-col gap-1 rounded-2xl px-4 py-3 transition-all border",
                      active
                        ? "border-zinc-900 bg-zinc-900 text-white shadow-md shadow-zinc-900/10"
                        : "border-transparent text-zinc-600 hover:bg-zinc-100 hover:border-zinc-200",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={cn("h-4 w-4", active ? "text-white" : "text-zinc-400 group-hover:text-zinc-600")} />
                      <span className="text-sm font-semibold">{label}</span>
                    </div>
                    <p className={cn("text-xs leading-5 pl-6", active ? "text-white/70" : "text-zinc-400")}>
                      {description}
                    </p>
                  </Link>
                );
              })}
            </nav>

            {/* Workspace Info Card */}
            <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                Workspace
              </p>
              <h3 className="mt-3 text-sm font-bold text-zinc-900">Site Studio</h3>
              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Profil, template va analytics oqimini bitta joydan boshqaring.
              </p>
            </div>
          </aside>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-2">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 whitespace-nowrap transition-all border text-sm font-medium",
                    active
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Main Content Area */}
          <main className="space-y-6">{children}</main>
        </div>
      </LayoutContainer>
    </div>
  );
}
