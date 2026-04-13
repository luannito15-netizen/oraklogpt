"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logoOraklo from "../../../assets/icons/logo-oraklo.svg";
import {
  IconDashboard,
  IconClock,
  IconTrendingUp,
  IconStar,
  IconAdmin,
  IconHelp,
  IconChevronRight,
  IconChevronDown,
  IconSearch,
  IconBell,
  IconPlus,
} from "@/components/ui/icons";

const primaryNav = [
  {
    href: "/dashboard",
    label: "Visão geral",
    icon: <IconDashboard />,
  },
  {
    href: "/events",
    label: "Mercados",
    icon: <IconClock />,
    badge: "6",
  },
  {
    href: "/positions",
    label: "Minhas posições",
    icon: <IconTrendingUp />,
  },
  {
    href: "/ranking",
    label: "Ranking",
    icon: <IconStar />,
  },
];

const secondaryNav = [
  {
    href: "/admin",
    label: "Admin",
    icon: <IconAdmin />,
  },
  {
    href: "/faq",
    label: "Ajuda",
    icon: <IconHelp />,
  },
];

function NavItem({ href, label, icon, badge, pathname }: {
  href: string; label: string; icon: ReactNode; badge?: string; pathname: string;
}) {
  const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
  return (
    <Link href={href}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-150 ${
        isActive
          ? "font-bold text-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--accent)_20%,transparent)] shadow-[0_0_12px_rgba(168,85,247,0.15)]"
          : "font-semibold text-[var(--text-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-secondary)]"
      }`}>
      <span className={isActive ? "text-[var(--accent)]" : "text-inherit"}>{icon}</span>
      <span className="flex-1">{label}</span>
      {badge && (
        <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
          isActive
            ? "bg-[color-mix(in_srgb,var(--accent)_25%,transparent)] text-[var(--ring)]"
            : "bg-[var(--border)] text-[var(--text-muted)]"
        }`}>{badge}</span>
      )}
    </Link>
  );
}

export default function PlatformLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Breadcrumb label map
  const crumbMap: Record<string, string> = {
    dashboard: "Visão geral",
    events:    "Mercados",
    positions: "Minhas posições",
    ranking:   "Ranking",
    admin:     "Admin",
  };
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    label: crumbMap[seg] ?? seg,
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto grid min-h-screen max-w-[1440px] md:grid-cols-[220px_1fr]">

        {/* ══════════════════ SIDEBAR ══════════════════ */}
        <aside className="hidden flex-col border-r border-[var(--border)] bg-[var(--surface)] md:flex">
          {/* Logo */}
          <div className="flex items-center gap-2 px-5 py-5">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logoOraklo} alt="ORAKLO" className="h-7 w-auto logo-invert"/>
            </Link>
            <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-emerald-400 ring-1 ring-emerald-500/20">
              Beta
            </span>
          </div>

          {/* User greeting */}
          <div className="px-4 py-3 border-b border-[var(--border)]">
            <p className="text-[10px] text-[var(--text-muted)]">Bem-vindo de volta</p>
            <p className="text-sm font-black text-[var(--text)]">Usuário</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Última visita: hoje</p>
          </div>

          {/* Primary nav */}
          <nav className="flex-1 space-y-0.5 px-3 pt-2">
            <p className="mb-2 px-3 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--text-muted)] opacity-60">
              Plataforma
            </p>
            {primaryNav.map((item) => (
              <NavItem key={item.href} pathname={pathname} {...item} />
            ))}

            <div className="my-4 border-t border-[var(--border)]" />

            <p className="mb-2 px-3 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--text-muted)] opacity-60">
              Suporte
            </p>
            {secondaryNav.map((item) => (
              <NavItem key={item.href} pathname={pathname} {...item} />
            ))}
          </nav>

          {/* Live indicator */}
          <div className="mx-3 mb-3 flex items-center gap-2 rounded-xl bg-emerald-500/8 px-3 py-2 ring-1 ring-emerald-500/15">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" style={{ animationDuration: "1.5s" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] font-bold text-emerald-400">6 mercados ao vivo</span>
          </div>

          {/* User */}
          <div className="border-t border-[var(--border)] p-3">
            <button type="button" aria-label="Conta do usuário" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-[var(--surface-elevated)]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,transparent)] text-[11px] font-black text-[var(--ring)]">
                U
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-[var(--text-secondary)]">Usuário</p>
                <p className="truncate text-[10px] text-[var(--text-muted)]">Ver perfil</p>
              </div>
            </button>
          </div>
        </aside>

        {/* ══════════════════ MAIN ══════════════════ */}
        <div className="flex min-w-0 flex-col">

          {/* ── Top bar ── */}
          <header className="glass-dark sticky top-0 z-30 flex items-center gap-4 border-b border-[var(--border)] bg-[var(--bg)]/80 px-6 py-3 sm:px-8">
            {/* Breadcrumb */}
            <nav className="hidden items-center gap-1.5 text-xs md:flex">
              <Link href="/dashboard" className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]">
                ORAKLO
              </Link>
              {crumbs.map((c) => (
                <span key={c.href} className="flex items-center gap-1.5">
                  <IconChevronRight className="h-3 w-3 text-[var(--border)]" />
                  {c.isLast
                    ? <span className="font-semibold text-[var(--text-secondary)]">{c.label}</span>
                    : <Link href={c.href} className="text-[var(--text-muted)] hover:text-[var(--text-secondary)]">{c.label}</Link>
                  }
                </span>
              ))}
            </nav>

            {/* Search */}
            <div className="relative flex-1 md:max-w-xs">
              <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
              <input type="search" placeholder="Buscar eventos... (⌘K)"
                className="h-8 w-full rounded-lg bg-[var(--surface)] pl-8 pr-3 text-xs text-[var(--text)] outline-none ring-1 ring-[var(--border)] transition-all placeholder:text-[var(--text-muted)] focus:ring-[var(--ring)]"/>
            </div>

            <div className="ml-auto flex items-center gap-2">
              {/* Notifications */}
              <button type="button" aria-label="Notificações" className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text-secondary)]">
                <IconBell className="h-[18px] w-[18px]" />
              </button>

              {/* Quick action */}
              <Link href="/events"
                className="hidden items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-bold text-[var(--accent-fg)] shadow-[0_0_20px_rgba(168,85,247,0.30)] transition-all hover:opacity-90 hover:shadow-[0_0_32px_rgba(168,85,247,0.45)] active:scale-[0.97] sm:flex">
                <IconPlus className="h-3.5 w-3.5" />
                Nova previsão
              </Link>

              {/* Mock badge */}
              <span className="hidden rounded-lg bg-amber-500/15 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-amber-400 ring-1 ring-amber-500/20 lg:inline-flex">
                Mock
              </span>
            </div>
          </header>

          {/* ── Page content ── */}
          <main className="flex-1 p-6 sm:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
