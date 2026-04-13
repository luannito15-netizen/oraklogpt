"use client";

import { useState, useMemo } from "react";
import type { EventCardData } from "@/components/ui/event-card";
import { EventCard } from "@/components/ui/event-card";
import { EventDrawer } from "@/components/ui/event-drawer";
import { PublicNav, PublicFooter } from "@/components/ui/public-nav";
import { AdBanner } from "@/components/ui/ad-banner";
import { MercadosHotHero } from "./mercados-hot-hero"
import { LiveActivityTicker } from "./live-activity-ticker"
import { getHotIntensity } from "@/lib/urgency";

const categories = ["Todos", "Economia", "Clima", "Esportes", "Política"];
const sortOptions = [
  { value: "volume",   label: "Volume"      },
  { value: "prazo",    label: "Prazo"       },
  { value: "sim",      label: "Cotação SIM" },
  { value: "nao",      label: "Cotação NÃO" },
];

function parseDias(deadline: string): number {
  return parseInt(deadline) || 0;
}

function formatVolumeCompact(value: number): string {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return `R$ ${(value / 1_000).toFixed(1)}K`;
  return `R$ ${value.toLocaleString("pt-BR")}`;
}

// ─── Section header ────────────────────────────────────────────────────────────

function SectionHeader({
  label,
  count,
  variant,
}: {
  label: string;
  count: number;
  variant: "hot" | "short" | "mid" | "long";
}) {
  const styles: Record<string, string> = {
    hot:   "border-red-500/60 text-red-400",
    short: "border-amber-500/60 text-amber-400",
    mid:   "border-[var(--border)] text-[var(--text-muted)]",
    long:  "border-[var(--border)] text-[var(--text-muted)]",
  };

  return (
    <div className={`flex items-center gap-3 border-l-2 pl-3 ${styles[variant]}`}>
      <span className="text-xs font-black uppercase tracking-[0.1em]">{label}</span>
      <span className="text-[10px] font-semibold opacity-60">
        {count} {count === 1 ? "evento" : "eventos"}
      </span>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

interface MercadosClientProps {
  events: EventCardData[];
}

export function MercadosClient({ events }: MercadosClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery]           = useState("");
  const [sortBy, setSortBy]                     = useState("volume");
  const [drawerEvent, setDrawerEvent]           = useState<EventCardData | null>(null);

  // Dynamic stats from events prop
  const totalVolume = events.reduce((s, e) => s + e.totalVolume, 0);
  const openCount   = events.length;

  const stats = [
    { label: "Volume total",    value: formatVolumeCompact(totalVolume) },
    { label: "Eventos abertos", value: String(openCount) },
    { label: "Participações",   value: "1.240 *" },
    { label: "Usuários ativos", value: "318 *"   },
  ];

  const filtered = useMemo(() => {
    let result = events;

    if (selectedCategory !== "Todos") {
      result = result.filter((e) => e.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((e) => e.title.toLowerCase().includes(q));
    }

    return [...result].sort((a, b) => {
      if (sortBy === "volume") return b.volume - a.volume;
      if (sortBy === "prazo")  return parseDias(a.deadline) - parseDias(b.deadline);
      if (sortBy === "sim")    return b.simPercent - a.simPercent;
      if (sortBy === "nao")    return a.simPercent - b.simPercent;
      return 0;
    });
  }, [events, selectedCategory, searchQuery, sortBy]);

  // Urgency buckets — split after filtering + sorting
  const hot   = filtered.filter((e) => e.deadlineDays <= 0);
  const short = filtered.filter((e) => e.deadlineDays >= 1 && e.deadlineDays <= 3);
  const mid   = filtered.filter((e) => e.deadlineDays >= 4 && e.deadlineDays <= 14);
  const long  = filtered.filter((e) => e.deadlineDays > 14);

  // First HOT gets the hero treatment; the rest go into the grid section
  const hotHero  = hot[0] ?? null;
  const hotRest  = hot.slice(1);

  return (
    <div className="min-h-screen bg-[var(--th-bg)]">
      <PublicNav />

      {/* ── Page header ── */}
      <div className="relative overflow-hidden border-b border-[var(--th-border)] bg-[var(--th-bg-elevated)] px-6 py-12 lg:px-8">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[var(--oraklo-color-primary)] opacity-[0.06] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--th-dim)]">ORAKLO</p>
              <h1 className="mt-2 font-[family-name:var(--font-anton)] text-4xl text-[var(--th-text)] lg:text-5xl">
                Mercados
              </h1>
              <p className="mt-2 text-sm text-[var(--th-mid)]">
                Eventos abertos para previsão — registre sua posição antes do prazo.
              </p>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-2.5 rounded-full bg-emerald-500/10 px-4 py-2 ring-1 ring-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-bold text-emerald-400">Mercado ao vivo</span>
            </div>
          </div>

          {/* Stats row — dynamic */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-[var(--th-overlay-5)] px-4 py-3 ring-1 ring-[var(--th-ring)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--th-dim)]">{s.label}</p>
                <p className="mt-1 font-[family-name:var(--font-anton)] text-xl text-[var(--th-text)]">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">

          {/* Sidebar — categories + sort */}
          <aside className="lg:w-52 lg:shrink-0">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--th-dim)]">Categorias</p>
            <div className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
              {categories.map((cat) => {
                const count = cat === "Todos"
                  ? events.length
                  : events.filter((e) => e.category === cat).length;
                const active = selectedCategory === cat;
                return (
                  <button key={cat} onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl px-3 py-2 text-left text-sm font-semibold transition-all ${
                      active
                        ? "bg-[var(--accent)]/15 text-[var(--ring)] ring-1 ring-[var(--accent)]/50"
                        : "text-[var(--th-low)] hover:bg-[var(--surface-elevated)] hover:text-[var(--th-hi)]"
                    }`}>
                    {cat}
                    <span className="ml-2 text-[10px] text-[var(--th-dim)]">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 hidden lg:block">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--th-dim)]">Ordenar por</p>
              {sortOptions.map((opt) => (
                <button key={opt.value} onClick={() => setSortBy(opt.value)}
                  className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition-all ${
                    sortBy === opt.value
                      ? "bg-[var(--accent)]/15 text-[var(--ring)] font-semibold ring-1 ring-[var(--accent)]/50"
                      : "text-[var(--th-low)] hover:bg-[var(--surface-elevated)] hover:text-[var(--th-mid)]"
                  }`}>
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Banner publicitário — sidebar */}
            <div className="mt-8 hidden lg:block">
              <AdBanner size="rectangle" />
            </div>
          </aside>

          {/* Event grid */}
          <div className="flex-1 min-w-0">
            {/* Search bar */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--th-dim)]" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="m10 10 2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  placeholder="Buscar evento..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-xl bg-[var(--input-bg)] pl-8 pr-4 text-sm text-[var(--text)] outline-none ring-1 ring-[var(--border)] transition-all placeholder:text-[var(--text-muted)] focus:ring-[var(--ring)]"
                />
              </div>
              <div className="hidden sm:flex">
                <LiveActivityTicker events={events} />
              </div>
              <p className="text-xs text-[var(--th-dim)]">
                {filtered.length} {filtered.length === 1 ? "evento" : "eventos"}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                <p className="text-sm font-semibold text-[var(--th-low)]">Nenhum evento encontrado</p>
                <p className="text-xs text-[var(--th-dim)]">Tente ajustar os filtros ou a busca.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-8">

                {/* ── HOT bucket ── */}
                {hot.length > 0 && (
                  <section className="flex flex-col gap-4">
                    <SectionHeader
                      label={(() => {
                        const intensity = hot[0]?.deadlineAt ? getHotIntensity(hot[0].deadlineAt) : null
                        if (intensity === "last-call") return "LAST CALL — Menos de 1 hora"
                        if (intensity === "super-hot") return "SUPER HOT — Menos de 6 horas"
                        return "HOT — Encerra hoje"
                      })()}
                      count={hot.length}
                      variant="hot"
                    />
                    {/* Hero for first HOT event */}
                    {hotHero && (
                      <MercadosHotHero event={hotHero} onOpen={setDrawerEvent} />
                    )}
                    {/* Remaining HOT events as regular cards */}
                    {hotRest.length > 0 && (
                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {hotRest.map((event) => (
                          <EventCard key={event.id} event={event} onOpen={setDrawerEvent} />
                        ))}
                      </div>
                    )}
                  </section>
                )}

                {/* ── SHORT bucket ── */}
                {short.length > 0 && (
                  <section className="flex flex-col gap-4">
                    <SectionHeader label="Encerra em breve" count={short.length} variant="short" />
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {short.map((event) => (
                        <EventCard key={event.id} event={event} onOpen={setDrawerEvent} />
                      ))}
                    </div>
                  </section>
                )}

                {/* ── MID bucket ── */}
                {mid.length > 0 && (
                  <section className="flex flex-col gap-4">
                    <SectionHeader label="Esta semana" count={mid.length} variant="mid" />
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {mid.map((event) => (
                        <EventCard key={event.id} event={event} onOpen={setDrawerEvent} />
                      ))}
                    </div>
                  </section>
                )}

                {/* ── LONG bucket ── */}
                {long.length > 0 && (
                  <section className="flex flex-col gap-4">
                    <SectionHeader label="Próximas semanas" count={long.length} variant="long" />
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {long.map((event) => (
                        <EventCard key={event.id} event={event} onOpen={setDrawerEvent} />
                      ))}
                    </div>
                  </section>
                )}

              </div>
            )}
          </div>
        </div>
      </div>

      <PublicFooter />

      <EventDrawer event={drawerEvent} onClose={() => setDrawerEvent(null)} />
    </div>
  );
}
