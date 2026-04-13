import Link from "next/link";
import { EventCard } from "@/components/ui/event-card";
import { DashboardChart } from "./dashboard-chart";
import { getOpenEvents } from "@/lib/events";

const metrics = [
  {
    label: "Saldo disponível",
    value: "R$ 0,00",
    sub: "Sem movimentação",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="4" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M1.5 7h13" stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="4.5" cy="10" r="0.8" fill="currentColor"/>
      </svg>
    ),
    color: "text-[var(--text-secondary)]",
    action: null,
  },
  {
    label: "Posições abertas",
    value: "0",
    sub: "Nenhuma ativa",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 11L5.5 7.5 8.5 10 14 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "text-[var(--text-secondary)]",
    action: { label: "Ver mercados", href: "/events" },
  },
  {
    label: "Retorno total",
    value: "R$ 0,00",
    sub: "—",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2v12M4 6l4-4 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "text-emerald-400",
    action: null,
  },
  {
    label: "Taxa de acerto",
    value: "—",
    sub: "Sem histórico",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5L6.5 12 13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "text-[var(--text-secondary)]",
    action: null,
  },
];

export default async function DashboardPage() {
  const openEvents = await getOpenEvents();
  const trendingEvents = openEvents.slice(0, 3);
  return (
    <div className="space-y-6">

      {/* ── Page title ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-anton)] text-2xl text-[var(--text)]">Visão geral</h1>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">Quinta, 10 de abril de 2025</p>
        </div>
        <Link href="/events"
          className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.06em] text-[var(--accent-fg)] shadow-[0_0_16px_rgba(168,85,247,0.30)] transition-all hover:opacity-90 hover:shadow-[0_0_24px_rgba(168,85,247,0.45)]">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          Nova previsão
        </Link>
      </div>

      {/* ── Metrics ── */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label}
            className="card-glow-accent relative overflow-hidden rounded-2xl bg-[var(--surface)] p-5 ring-1 ring-[var(--border)]">
            <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[var(--accent)] opacity-[0.06] blur-2xl"/>
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">{m.label}</p>
              <span className="text-[var(--text-muted)]">{m.icon}</span>
            </div>
            <p className={`mt-2 font-[family-name:var(--font-anton)] text-2xl ${m.color}`}>{m.value}</p>
            <div className="mt-1.5 flex items-center justify-between gap-2">
              <p className="text-[10px] text-[var(--text-muted)]">{m.sub}</p>
              {m.action && (
                <Link href={m.action.href}
                  className="text-[10px] font-bold text-[var(--ring)] hover:underline">
                  {m.action.label} →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Main 2-col ── */}
      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">

        {/* Portfolio chart */}
        <div className="relative overflow-hidden rounded-2xl bg-[var(--surface)] p-6 ring-1 ring-[var(--border)]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-[0.04] blur-3xl"/>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">Retorno acumulado</p>
              <p className="mt-1 font-[family-name:var(--font-anton)] text-3xl text-[var(--text)]">R$ 0,00</p>
            </div>
            <div className="flex gap-3 text-[10px] text-[var(--text-muted)]">
              <button type="button" className="rounded-lg bg-[var(--surface-elevated)] px-3 py-1 font-semibold text-[var(--text-secondary)] ring-1 ring-[var(--border)]">7d</button>
              <button type="button" className="px-2 py-1 hover:text-[var(--text-secondary)] transition-colors">30d</button>
              <button type="button" className="px-2 py-1 hover:text-[var(--text-secondary)] transition-colors">Tudo</button>
            </div>
          </div>
          <div className="mt-5">
            <DashboardChart/>
          </div>
        </div>

        {/* Activity / onboarding */}
        <div className="flex flex-col gap-4">
          {/* Onboarding CTA */}
          <div className="relative overflow-hidden rounded-2xl bg-[var(--surface-elevated)] p-5 ring-1 ring-[var(--border)]">
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[var(--accent)] opacity-10 blur-2xl"/>
            <p className="text-xs font-bold text-[var(--text-secondary)]">Comece agora</p>
            <p className="mt-1.5 text-xs leading-5 text-[var(--text-muted)]">
              Explore os mercados abertos e registre sua primeira previsão.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/events"
                className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-2.5 text-xs font-bold text-[var(--accent-fg)] shadow-[0_0_14px_rgba(168,85,247,0.30)] transition-all hover:opacity-90">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                Ver mercados abertos
              </Link>
              <Link href="/como-funciona"
                className="flex items-center justify-center py-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
                Como funciona →
              </Link>
            </div>
          </div>

          {/* Activity feed */}
          <div className="flex-1 rounded-2xl bg-[var(--surface)] p-5 ring-1 ring-[var(--border)]">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">Atividade recente</p>
            </div>
            <div className="mt-6 space-y-1">
              {/* Empty state */}
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-elevated)]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[var(--text-muted)]">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-muted)]">Sem atividade</p>
                  <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">Suas previsões aparecem aqui</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Positions table ── */}
      <div className="rounded-2xl bg-[var(--surface)] ring-1 ring-[var(--border)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <p className="text-sm font-semibold text-[var(--text-secondary)]">Minhas posições</p>
          <Link href="/positions" className="text-[10px] font-bold text-[var(--ring)] hover:underline">
            Ver tudo →
          </Link>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[2fr_80px_80px_100px_100px_80px] items-center gap-3 border-b border-[var(--border)] px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
          <span>Evento</span>
          <span>Lado</span>
          <span>Valor</span>
          <span>Cotação</span>
          <span>Retorno est.</span>
          <span>Status</span>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center gap-3 px-5 py-10 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-elevated)]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[var(--text-muted)]">
              <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M5.5 8h5M5.5 10.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--text-muted)]">Nenhuma posição registrada</p>
            <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">Explore os mercados para começar</p>
          </div>
          <Link href="/events"
            className="mt-1 rounded-xl bg-[var(--surface-elevated)] px-4 py-2 text-xs font-semibold text-[var(--text-muted)] ring-1 ring-[var(--border)] transition-colors hover:ring-[var(--ring)] hover:text-[var(--text-secondary)]">
            Ver mercados →
          </Link>
        </div>
      </div>

      {/* ── Trending ── */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--text-secondary)]">Mercados em destaque</p>
            <p className="text-[10px] text-[var(--text-muted)]">{openEvents.length} eventos abertos</p>
          </div>
          <Link href="/events" className="text-[10px] font-bold text-[var(--ring)] hover:underline">
            Ver todos →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {trendingEvents.map((e) => <EventCard key={e.id} event={e}/>)}
        </div>
      </div>

    </div>
  );
}
