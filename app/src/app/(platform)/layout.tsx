"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logoOraklo from "../../../assets/icons/logo-oraklo.svg";

const primaryNav = [
  {
    href: "/dashboard",
    label: "Visão geral",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="5.5" height="5.5" rx="1.5" fill="currentColor"/>
        <rect x="8.5" y="1" width="5.5" height="5.5" rx="1.5" fill="currentColor" opacity=".5"/>
        <rect x="1" y="8.5" width="5.5" height="5.5" rx="1.5" fill="currentColor" opacity=".5"/>
        <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.5" fill="currentColor" opacity=".25"/>
      </svg>
    ),
  },
  {
    href: "/events",
    label: "Mercados",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M7.5 4v4l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    badge: "6",
  },
  {
    href: "/positions",
    label: "Minhas posições",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M2 11L5.5 7.5 8.5 10 13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: "/ranking",
    label: "Ranking",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.5 1l1.7 3.5 3.8.55-2.75 2.68.65 3.77L7.5 9.7l-3.4 1.8.65-3.77L2 5.05l3.8-.55z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const secondaryNav = [
  {
    href: "/admin",
    label: "Admin",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.5 1.5a2 2 0 012 2v.5h2a1 1 0 011 1v7a1 1 0 01-1 1h-8a1 1 0 01-1-1v-7a1 1 0 011-1h2v-.5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5.5 8h4M5.5 10.5h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: "/faq",
    label: "Ajuda",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5.8 5.8a1.7 1.7 0 013.3.6c0 1.1-1.6 1.5-1.6 2.6M7.5 10.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function NavItem({ href, label, icon, badge, pathname }: {
  href: string; label: string; icon: ReactNode; badge?: string; pathname: string;
}) {
  const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
  return (
    <Link href={href}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
        isActive
          ? "bg-[var(--accent)]/15 text-[var(--ring)] ring-1 ring-[var(--accent)]/40"
          : "text-[var(--text-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-secondary)]"
      }`}>
      <span className={isActive ? "text-[var(--ring)]" : "text-inherit"}>{icon}</span>
      <span className="flex-1">{label}</span>
      {badge && (
        <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
          isActive
            ? "bg-[var(--accent)]/25 text-[var(--ring)]"
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

          {/* Primary nav */}
          <nav className="flex-1 space-y-0.5 px-3 pt-2">
            <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Plataforma
            </p>
            {primaryNav.map((item) => (
              <NavItem key={item.href} pathname={pathname} {...item} />
            ))}

            <div className="my-4 border-t border-[var(--border)]" />

            <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Suporte
            </p>
            {secondaryNav.map((item) => (
              <NavItem key={item.href} pathname={pathname} {...item} />
            ))}
          </nav>

          {/* Live indicator */}
          <div className="mx-3 mb-3 rounded-xl bg-emerald-500/8 p-3 ring-1 ring-emerald-500/15">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"/>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"/>
              </span>
              <span className="text-[10px] font-semibold text-emerald-400">6 mercados ao vivo</span>
            </div>
            <p className="mt-1.5 text-[9px] text-[var(--text-muted)]">Atualizado agora há pouco</p>
          </div>

          {/* User */}
          <div className="border-t border-[var(--border)] p-3">
            <button type="button" aria-label="Conta do usuário" className="flex w-full items-center gap-3 rounded-xl p-2 transition-colors hover:bg-[var(--surface-elevated)]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--ring)] text-[11px] font-bold text-white shadow-[0_0_10px_rgba(168,85,247,0.35)]">
                U
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-xs font-semibold text-[var(--text-secondary)]">Usuário</p>
                <p className="truncate text-[10px] text-[var(--text-muted)]">conta@email.com</p>
              </div>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[var(--text-muted)]">
                <path d="M3 4.5L6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
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
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-[var(--border)]">
                    <path d="M2.5 1.5L5.5 4 2.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  {c.isLast
                    ? <span className="font-semibold text-[var(--text-secondary)]">{c.label}</span>
                    : <Link href={c.href} className="text-[var(--text-muted)] hover:text-[var(--text-secondary)]">{c.label}</Link>
                  }
                </span>
              ))}
            </nav>

            {/* Search */}
            <div className="relative flex-1 md:max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="m9.5 9.5 2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input type="search" placeholder="Buscar eventos... (⌘K)"
                className="h-8 w-full rounded-lg bg-[var(--input-bg)] pl-8 pr-3 text-xs text-[var(--text)] outline-none ring-1 ring-[var(--border)] transition-all placeholder:text-[var(--text-muted)] focus:ring-[var(--ring)]"/>
            </div>

            <div className="ml-auto flex items-center gap-2">
              {/* Notifications */}
              <button type="button" aria-label="Notificações" className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text-secondary)]">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.5 1.5A4 4 0 003.5 5.5v3l-1 1.5h10l-1-1.5v-3A4 4 0 007.5 1.5z" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M6 11.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
              </button>

              {/* Quick action */}
              <Link href="/events"
                className="hidden items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-bold text-[var(--accent-fg)] shadow-[0_0_12px_rgba(168,85,247,0.25)] transition-all hover:opacity-90 sm:flex">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
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
