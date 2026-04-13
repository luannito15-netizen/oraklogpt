import Link from "next/link";
import type { EventCardData } from "@/components/ui/event-card";
import { EventCard } from "@/components/ui/event-card";
import { getOpenEvents } from "@/lib/events";

// ── TickerStrip ──────────────────────────────────────────────────────────────
function TickerStrip({ events }: { events: EventCardData[] }) {
  const items = [...events, ...events];

  return (
    <div className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg)] py-2.5">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[var(--bg)] to-transparent" />

      <div className="ticker-scroll flex gap-8 whitespace-nowrap">
        {items.map((event, i) => {
          const nao = 100 - event.simPercent;
          return (
            <div key={`${event.id}-${i}`} className="flex items-center gap-3 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
              <span className="text-xs font-semibold text-[var(--text-secondary)] max-w-[160px] truncate">
                {event.title}
              </span>
              <span className="text-[10px] font-bold text-emerald-400">SIM {event.simPercent}%</span>
              <span className="text-[10px] font-bold text-orange-400">NÃO {nao}%</span>
              <span className="text-[var(--border)] text-xs">|</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── HeroSection ──────────────────────────────────────────────────────────────
function HeroSection({ events }: { events: EventCardData[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[var(--surface-elevated)] ring-1 ring-[var(--border)] p-6 lg:p-8">
      {/* Background glows */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent)] opacity-[0.07] blur-3xl" />

      {/* Headline */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-400">Ao vivo agora</span>
        </div>
        <h1 className="font-[family-name:var(--font-anton)] text-3xl lg:text-4xl text-[var(--text)] leading-tight">
          Mercados<br />em destaque
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)] max-w-sm">
          Registre sua previsão antes do prazo e acompanhe em tempo real.
        </p>
      </div>

      {/* Featured event cards */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center rounded-2xl bg-[var(--surface)] ring-1 ring-[var(--border)]">
          <p className="text-sm text-[var(--text-muted)]">Nenhum evento em destaque</p>
        </div>
      )}
    </div>
  );
}

// ── StatsRow ─────────────────────────────────────────────────────────────────
function StatsRow({ openCount }: { openCount: number }) {
  const stats = [
    {
      label: "Saldo disponível",
      value: "R$ 0,00",
      micro: "Sem movimentação",
      accent: "#a855f7",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="16" height="12" rx="2"/>
          <path d="M2 9h16"/>
          <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
    {
      label: "Posições abertas",
      value: "0",
      micro: "Nenhuma ativa",
      accent: "#3b82f6",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 14L7 9l3.5 3.5L14 7l3 2.5"/>
        </svg>
      ),
    },
    {
      label: "Retorno total",
      value: "R$ 0,00",
      micro: "Desde o início",
      accent: "#10b981",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 14l5-5 3.5 3.5L17 5"/>
          <path d="M12 5h5v5"/>
        </svg>
      ),
    },
    {
      label: "Taxa de acerto",
      value: "—",
      micro: "Sem histórico",
      accent: "#f59e0b",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="10" cy="10" r="7.5"/>
          <circle cx="10" cy="10" r="3.5"/>
          <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
  ];

  // openCount is available for future use (e.g., badge on "Posições abertas")
  void openCount;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="relative overflow-hidden rounded-2xl bg-[var(--surface)] px-4 py-4 ring-1 ring-[var(--border)] transition-all duration-150 hover:-translate-y-0.5"
        >
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl" style={{ background: s.accent }} />
          {/* Glow */}
          <div
            className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full blur-xl opacity-[0.12]"
            style={{ background: s.accent }}
          />
          {/* Icon + label */}
          <div className="flex items-center gap-2">
            <span style={{ color: s.accent }}>{s.icon}</span>
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">{s.label}</p>
          </div>
          {/* Value */}
          <p className="mt-2 font-[family-name:var(--font-anton)] text-2xl text-[var(--text)]">{s.value}</p>
          {/* Microcopy */}
          <p className="mt-1 text-[10px] text-[var(--text-muted)]">{s.micro}</p>
        </div>
      ))}
    </div>
  );
}

// ── MarketOverview ────────────────────────────────────────────────────────────
function MarketOverview({ events }: { events: EventCardData[] }) {
  return (
    <div className="rounded-2xl bg-[var(--surface)] ring-1 ring-[var(--border)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
        <div className="flex items-center gap-3">
          <p className="text-sm font-black text-[var(--text)]">Visão do mercado</p>
          <span className="rounded-full bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] px-2 py-0.5 text-[9px] font-bold text-[var(--ring)]">
            AO VIVO
          </span>
        </div>
        <Link href="/events" className="text-[10px] font-bold text-[var(--ring)] hover:underline">
          Ver todos →
        </Link>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[2fr_80px_80px_80px_100px] items-center gap-3 border-b border-[var(--border)]/50 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
        <span>Evento</span>
        <span className="text-right">SIM%</span>
        <span className="text-right">Cot. SIM</span>
        <span className="text-right">Cot. NÃO</span>
        <span className="text-right">Prazo</span>
      </div>

      {/* Rows */}
      {events.length > 0 ? (
        events.map((event, i) => {
          const nao = 100 - event.simPercent;
          const cotSim = event.simPercent > 0 ? (0.95 / (event.simPercent / 100)).toFixed(2) : "—";
          const cotNao = nao > 0 ? (0.95 / (nao / 100)).toFixed(2) : "—";
          const isUp = event.simPercent >= 50;

          return (
            <Link
              href={`/events/${event.id}`}
              key={event.id}
              className={`grid grid-cols-[2fr_80px_80px_80px_100px] items-center gap-3 px-5 py-3.5 transition-colors hover:bg-[var(--surface-elevated)] ${
                i < events.length - 1 ? "border-b border-[var(--border)]/30" : ""
              }`}
            >
              {/* Event info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-[10px] font-black text-[var(--ring)]">
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-[var(--text)]">{event.title}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{event.category}</p>
                </div>
              </div>

              {/* SIM% with trend */}
              <div className="text-right">
                <span className={`text-xs font-bold ${isUp ? "text-emerald-400" : "text-orange-400"}`}>
                  {isUp ? "▲" : "▼"} {event.simPercent}%
                </span>
              </div>

              {/* Cot SIM */}
              <div className="text-right">
                <span className="text-xs font-bold text-[var(--text)]">{cotSim}×</span>
              </div>

              {/* Cot NÃO */}
              <div className="text-right">
                <span className="text-xs font-bold text-[var(--text)]">{cotNao}×</span>
              </div>

              {/* Deadline */}
              <div className="text-right">
                <span className="text-[10px] text-[var(--text-muted)]">{event.deadline}</span>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
          <p className="text-xs text-[var(--text-muted)]">Nenhum evento disponível</p>
          <Link href="/events" className="text-[10px] font-bold text-[var(--ring)] hover:underline">
            Ver mercados →
          </Link>
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function DashboardPage() {
  const openEvents = await getOpenEvents();
  const trendingEvents = openEvents.slice(0, 3);
  const featuredEvents = openEvents.slice(0, 2);

  return (
    <div className="space-y-0 -mx-6 -mt-6 lg:-mx-8 lg:-mt-8">

      {/* ── Ticker strip ── */}
      <TickerStrip events={openEvents} />

      {/* ── Page content ── */}
      <div className="space-y-6 px-6 pt-6 pb-8 lg:px-8">

        {/* ── Hero section ── */}
        <HeroSection events={featuredEvents} />

        {/* ── Stats row ── */}
        <StatsRow openCount={openEvents.length} />

        {/* ── Market overview table ── */}
        <MarketOverview events={trendingEvents} />

      </div>
    </div>
  );
}
