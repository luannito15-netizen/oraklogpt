import Link from "next/link";
import type { EventCardData } from "@/components/ui/event-card";
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

// ── FeaturedEventCard ────────────────────────────────────────────────────────
function FeaturedEventCard({ event }: { event: EventCardData }) {
  const nao = 100 - event.simPercent;
  const cotSim = event.simPercent > 0 ? (0.95 / (event.simPercent / 100)).toFixed(2) : "—";
  const cotNao = nao > 0 ? (0.95 / (nao / 100)).toFixed(2) : "—";

  const pct = event.simPercent;
  const sparkPath = `M0,20 C10,${20 - pct * 0.1} 20,${10 + pct * 0.05} 30,${15 - pct * 0.08} C40,${20 - pct * 0.1} 50,${8 + pct * 0.06} 60,${12 - pct * 0.07} C70,${18 - pct * 0.09} 80,${5 + pct * 0.05} 90,${10 - pct * 0.05} L90,30 L0,30 Z`;

  return (
    <Link
      href={`/events/${event.id}`}
      className="group relative overflow-hidden rounded-2xl bg-[var(--surface)] p-5 ring-1 ring-[var(--border)] transition-all duration-200 hover:ring-[color-mix(in_srgb,var(--accent)_40%,transparent)] hover:-translate-y-1 block"
    >
      {/* Category + deadline */}
      <div className="flex items-center justify-between mb-3">
        <span className="rounded-full bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[var(--ring)]">
          {event.category}
        </span>
        <span className="text-[10px] text-[var(--text-muted)]">{event.deadline}</span>
      </div>

      {/* Title */}
      <p className="text-sm font-black leading-snug text-[var(--text)] line-clamp-2 mb-4">
        {event.title}
      </p>

      {/* Sparkline chart area */}
      <div className="relative h-14 w-full mb-4 overflow-hidden rounded-xl">
        <svg viewBox="0 0 90 30" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id={`spark-fill-${event.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={sparkPath} fill={`url(#spark-fill-${event.id})`} />
          <path d={sparkPath.split("L")[0]} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.7" />
        </svg>
        {/* Overlay % display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-black text-[var(--text)] drop-shadow-lg">{event.simPercent}%</span>
        </div>
      </div>

      {/* SIM / NÃO cotações */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-emerald-500/10 px-3 py-2 ring-1 ring-emerald-500/20">
          <p className="text-[9px] font-bold text-emerald-400 uppercase">SIM</p>
          <p className="text-base font-black text-[var(--text)]">{cotSim}×</p>
          <p className="text-[9px] text-emerald-400">{event.simPercent}%</p>
        </div>
        <div className="rounded-xl bg-orange-500/10 px-3 py-2 ring-1 ring-orange-500/20">
          <p className="text-[9px] font-bold text-orange-400 uppercase">NÃO</p>
          <p className="text-base font-black text-[var(--text)]">{cotNao}×</p>
          <p className="text-[9px] text-orange-400">{nao}%</p>
        </div>
      </div>
    </Link>
  );
}

// ── HeroSection ──────────────────────────────────────────────────────────────
function HeroSection({ events }: { events: EventCardData[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[var(--surface-elevated)] ring-1 ring-[var(--border)] p-6 lg:p-8">
      {/* Background glows */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent)] opacity-[0.07] blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-0 h-48 w-48 rounded-full bg-blue-500 opacity-[0.04] blur-3xl" />

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
            <FeaturedEventCard key={event.id} event={event} />
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
    { label: "Saldo disponível", value: "R$ 0,00", accent: "#a855f7" },
    { label: "Posições abertas", value: "0", accent: "#3b82f6" },
    { label: "Retorno total", value: "R$ 0,00", accent: "#10b981" },
    { label: "Taxa de acerto", value: "—", accent: "#f59e0b" },
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
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">{s.label}</p>
          <p className="mt-2 font-[family-name:var(--font-anton)] text-2xl text-[var(--text)]">{s.value}</p>
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
          <p className="text-sm font-black text-[var(--text)]">Market Overview</p>
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
