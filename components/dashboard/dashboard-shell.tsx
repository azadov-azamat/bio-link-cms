"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BarChart3, LayoutTemplate, Sparkles, UserRound } from "lucide-react";

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
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f6f6f4_0%,_#efefeb_100%)] py-6">
      <LayoutContainer className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="overflow-hidden rounded-[34px] border border-zinc-200 bg-zinc-950 text-white shadow-[0_32px_120px_-52px_rgba(15,23,42,0.8)]">
          <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.24),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0))] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Icons.BrandIcon />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/45">
                  BioSahifa
                </p>
                <h1
                  className="text-2xl font-black tracking-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Site Studio
                </h1>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-white/70">
              Profil, template va keyingi analytics oqimini bitta joydan
              boshqaradigan ijodiy ish paneli.
            </p>
          </div>

          <nav className="space-y-2 p-4">
            {NAV_ITEMS.map(({ href, label, description, icon: Icon }) => {
              const active = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "group flex items-start gap-3 rounded-[26px] border px-4 py-4 transition-all",
                    active
                      ? "border-white/15 bg-white text-zinc-950 shadow-[0_20px_50px_-30px_rgba(255,255,255,0.55)]"
                      : "border-transparent bg-white/5 text-white/78 hover:border-white/10 hover:bg-white/10",
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl",
                      active
                        ? "bg-zinc-950 text-white"
                        : "bg-white/10 text-white/85 group-hover:bg-white/15",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{label}</div>
                    <div
                      className={cn(
                        "mt-1 text-xs leading-5",
                        active ? "text-zinc-500" : "text-white/45",
                      )}
                    >
                      {description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 pt-0">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                <Sparkles className="h-3.5 w-3.5" />
                Workspace
              </div>
              <p className="mt-4 text-sm leading-6 text-white/70">
                My Sites bo‘limida sayt preview ustida ishlab, keyin analytics va
                account bo‘limlarini ulab boramiz.
              </p>
            </div>
          </div>
        </aside>

        <main className="space-y-6">{children}</main>
      </LayoutContainer>
    </div>
  );
}
