import Link from "next/link";
import { EventCard } from "@/components/ui/event-card";
import { DashboardChart } from "./dashboard-chart";
import { getOpenEvents } from "@/lib/events";

const metrics = [
  {
    label: "Saldo disponível",
    value: "R$ 0,00",
    sub: "Sem movimentação",
    delta: null,
    accent: "var(--accent)",
    accentRgb: "168,85,247",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="5" width="16" height="12" rx="2"/>
        <path d="M2 9h16"/>
        <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
    action: null,
  },
  {
    label: "Posições abertas",
    value: "0",
    sub: "Nenhuma ativa",
    delta: null,
    accent: "#3b82f6",
    accentRgb: "59,130,246",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14L7 9l3.5 3L14 7l3 2"/>
      </svg>
    ),
    action: { label: "Ver mercados", href: "/events" },
  },
  {
    label: "Retorno total",
    value: "R$ 0,00",
    sub: "—",
    delta: null,
    accent: "#10b981",
    accentRgb: "16,185,129",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14l5-5 3.5 3.5L17 5"/>
        <path d="M12 5h5v5"/>
      </svg>
    ),
    action: null,
  },
  {
    label: "Taxa de acerto",
    value: "—",
    sub: "Sem histórico",
    delta: null,
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="7"/>
        <circle cx="10" cy="10" r="3.5"/>
        <circle cx="10" cy="10" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
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
          className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.06em] text-[var(--accent-fg)] shadow-[0_0_20px_rgba(168,85,247,0.30)] transition-all hover:opacity-90 hover:shadow-[0_0_32px_rgba(168,85,247,0.45)] active:scale-[0.97]">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          Nova previsão
        </Link>
      </div>

      {/* ── Metrics ── */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="metric-card relative overflow-hidden rounded-2xl bg-[var(--surface)] p-5 ring-1 ring-[var(--border)] transition-all duration-200 hover:ring-[var(--border)]"
            style={{ "--_card-accent": m.accent } as React.CSSProperties}
          >
            {/* Top accent bar */}
            <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: m.accent }} />

            {/* Background glow */}
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl opacity-[0.08]"
              style={{ background: m.accent }}
            />

            {/* Icon + label row */}
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">{m.label}</p>
              <span style={{ color: m.accent }}>{m.icon}</span>
            </div>

            {/* Value */}
            <p className="mt-3 font-[family-name:var(--font-anton)] text-3xl text-[var(--text)]">{m.value}</p>

            {/* Sub + action row */}
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-[10px] text-[var(--text-muted)]">{m.sub}</p>
              {m.action && (
                <Link href={m.action.href} className="text-[10px] font-bold hover:underline" style={{ color: m.accent }}>
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
          <div className="relative overflow-hidden rounded-2xl p-5 ring-1" style={{
            background: "radial-gradient(ellipse 120% 90% at 85% -10%, color-mix(in srgb, var(--accent) 18%, transparent) 0%, var(--surface-elevated) 60%)",
            borderColor: "color-mix(in srgb, var(--accent) 25%, transparent)"
          } as React.CSSProperties}>
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--accent)] opacity-10 blur-2xl"/>
            <span className="inline-block rounded-full bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[var(--ring)]">
              Comece agora
            </span>
            <p className="mt-3 text-sm font-black leading-snug text-[var(--text)]">
              Sua primeira previsão espera por você
            </p>
            <p className="mt-1.5 text-xs leading-5 text-[var(--text-muted)]">
              Explore os mercados abertos e valide sua análise antes do prazo.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/events" className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-2.5 text-xs font-bold text-[var(--accent-fg)] shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all hover:opacity-90 hover:shadow-[0_0_32px_rgba(168,85,247,0.5)]">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Ver mercados abertos
              </Link>
              <Link href="/como-funciona" className="flex items-center justify-center py-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
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
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-elevated)] ring-1 ring-[var(--border)]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-muted)]">
                      <path d="M10 6v4l2.5 2.5" strokeLinecap="round"/>
                      <circle cx="10" cy="10" r="7.5"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-secondary)]">Sem atividade ainda</p>
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
        <div className="flex flex-col items-center justify-center gap-4 px-5 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-elevated)] ring-1 ring-[var(--border)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-muted)]">
              <rect x="3" y="6" width="18" height="14" rx="2"/>
              <path d="M8 12h8M8 15.5h5" strokeLinecap="round"/>
              <path d="M8 3l2 3M16 3l-2 3" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--text-secondary)]">Nenhuma posição registrada</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Explore os mercados e registre sua primeira previsão</p>
          </div>
          <Link href="/events" className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-xs font-bold text-[var(--accent-fg)] shadow-[0_0_16px_rgba(168,85,247,0.25)] transition-all hover:opacity-90">
            Explorar mercados →
          </Link>
        </div>
      </div>

      {/* ── Trending ── */}
      <div>
        <div className="mb-4 flex items-center gap-4">
          <div>
            <p className="text-sm font-black text-[var(--text)]">Mercados em destaque</p>
            <p className="text-[10px] text-[var(--text-muted)]">{openEvents.length} eventos abertos</p>
          </div>
          <div className="h-px flex-1 bg-[var(--border)]" />
          <Link href="/events" className="text-[10px] font-bold text-[var(--ring)] hover:underline shrink-0">
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
