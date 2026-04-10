import type { ReactNode } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/events", label: "Eventos" },
  { href: "/admin", label: "Admin" },
];

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--oraklo-color-bg)] text-[var(--oraklo-color-text)]">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr]">
        <aside className="border-b border-[color-mix(in_srgb,var(--oraklo-color-text)_12%,white)] p-6 md:border-b-0 md:border-r">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[color-mix(in_srgb,var(--oraklo-color-text)_58%,white)]">
              ORAKLO
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">Plataforma</h2>
          </div>

          <nav className="mt-8 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[var(--oraklo-radius-sm)] px-3 py-2 text-sm font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--oraklo-color-text)_6%,white)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <header className="flex items-center justify-between border-b border-[color-mix(in_srgb,var(--oraklo-color-text)_12%,white)] px-6 py-4 sm:px-8">
            <p className="text-sm text-[color-mix(in_srgb,var(--oraklo-color-text)_65%,white)]">
              Ambiente interno
            </p>
            <Badge tone="info">Modo mock</Badge>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
