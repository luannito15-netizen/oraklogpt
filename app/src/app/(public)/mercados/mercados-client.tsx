"use client";

import { useState, useMemo } from "react";
import type { EventCardData } from "@/components/ui/event-card";
import { EventCard } from "@/components/ui/event-card";
import { EventDrawer } from "@/components/ui/event-drawer";
import { PublicNav, PublicFooter } from "@/components/ui/public-nav";
import { AdBanner } from "@/components/ui/ad-banner";
import { MercadosHotHero, HotSectionFlame } from "./mercados-hot-hero";
import { LiveActivityTicker } from "./live-activity-ticker";
import { getUrgencyTier, getHotIntensity } from "@/lib/urgency";
import { IconSearch, CategoryIcon } from "@/components/ui/icons";

const categories = ["Todos", "Economia", "Clima", "Esportes", "Política"];
const sortOptions = [
  { value: "volume", label: "Volume"      },
  { value: "prazo",  label: "Prazo"       },
  { value: "sim",    label: "Cotação SIM" },
  { value: "nao",    label: "Cotação NÃO" },
];

function formatVolumeCompact(value: number): string {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return `R$ ${(value / 1_000).toFixed(1)}K`;
  return `R$ ${value.toLocaleString("pt-BR")}`;
}

// ─── Section header for SHORT / MID / LONG ────────────────────────────────────

function SectionHeader({
  label,
  count,
  variant,
}: {
  label: string;
  count: number;
  variant: "short" | "mid" | "long";
}) {
  const styles: Record<string, string> = {
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

// ─── HOT section heading ──────────────────────────────────────────────────────

function HotSectionHeading({
  intensity,
  count,
}: {
  intensity: "last-call" | "super-hot" | "hot" | null;
  count: number;
}) {
  const label =
    intensity === "last-call" ? "LAST CALL"
    : intensity === "super-hot" ? "SUPER HOT"
    : "MERCADO EM ALTA";

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-red-400">
        <HotSectionFlame className="h-4 w-4 shrink-0" />
        <span className="text-xs font-black uppercase tracking-[0.14em]">{label}</span>
      </div>
      <div className="h-px flex-1 bg-red-500/20" />
      <span className="text-[10px] text-[var(--text-muted)]">
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
      if (sortBy === "prazo")  return a.deadlineDays - b.deadlineDays;
      if (sortBy === "sim")    return b.simPercent - a.simPercent;
      if (sortBy === "nao")    return a.simPercent - b.simPercent;
      return 0;
    });
  }, [events, selectedCategory, searchQuery, sortBy]);

  const hot   = filtered.filter((e) => getUrgencyTier(e.deadlineDays) === "hot");
  const short = filtered.filter((e) => getUrgencyTier(e.deadlineDays) === "short");
  const mid   = filtered.filter((e) => getUrgencyTier(e.deadlineDays) === "mid");
  const long  = filtered.filter((e) => getUrgencyTier(e.deadlineDays) === "long");

  const hotHero = hot[0] ?? null;
  const hotRest = hot.slice(1);

  const hotIntensity = hotHero ? getHotIntensity(hotHero.deadlineAt) : null;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <PublicNav />

      {/* ── Page header ── */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface-elevated)] px-6 py-12 lg:px-8">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[var(--accent)] opacity-[0.06] blur-3xl" />
        <div className="relative mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">ORAKLO</p>
              <h1 className="mt-2 font-[family-name:var(--font-anton)] text-4xl text-[var(--text)] lg:text-5xl">
                Mercados
              </h1>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
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

          {/* Stats row */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-[var(--surface)] px-4 py-3 ring-1 ring-[var(--border)]/50">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">{s.label}</p>
                <p className="mt-1 font-[family-name:var(--font-anton)] text-xl text-[var(--text)]">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOT Hero — full width, outside sidebar constraint ── */}
      {hotHero && (
        <div className="mx-auto max-w-[1200px] px-6 pt-8 lg:px-8">
          <div className="flex flex-col gap-4">
            <HotSectionHeading intensity={hotIntensity} count={hot.length} />
            <MercadosHotHero event={hotHero} onOpen={setDrawerEvent} />
            {hotRest.length > 0 && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {hotRest.map((event) => (
                  <EventCard key={event.id} event={event} onOpen={setDrawerEvent} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Main content — sidebar + grid ── */}
      <div className="mx-auto max-w-[1200px] px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">

          {/* Sidebar */}
          <aside className="lg:w-52 lg:shrink-0">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">Categorias</p>
            <div className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
              {categories.map((cat) => {
                const count = cat === "Todos"
                  ? events.length
                  : events.filter((e) => e.category === cat).length;
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl px-3 py-2 text-left text-sm font-semibold transition-all ${
                      active
                        ? "bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)] ring-1 ring-[color-mix(in_srgb,var(--accent)_25%,transparent)]"
                        : "text-[var(--text-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text)]"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {cat !== "Todos" && <CategoryIcon category={cat} className="h-4 w-4 shrink-0" />}
                      {cat}
                    </span>
                    <span className="ml-2 text-[10px] text-[var(--text-muted)]">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 hidden lg:block">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">Ordenar por</p>
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSortBy(opt.value)}
                  className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition-all ${
                    sortBy === opt.value
                      ? "bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)] font-semibold ring-1 ring-[color-mix(in_srgb,var(--accent)_25%,transparent)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="mt-8 hidden lg:block">
              <AdBanner size="rectangle" />
            </div>
          </aside>

          {/* Event grid */}
          <div className="min-w-0 flex-1">
            {/* Search + activity */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="relative flex-1">
                <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="search"
                  placeholder="Buscar evento..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-xl bg-[var(--surface)] pl-8 pr-4 text-sm text-[var(--text)] outline-none ring-1 ring-[var(--border)] transition-all placeholder:text-[var(--text-muted)] focus:ring-[var(--ring)]"
                />
              </div>
              <div className="hidden sm:flex">
                <LiveActivityTicker events={events} />
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                {filtered.length} {filtered.length === 1 ? "evento" : "eventos"}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                <p className="text-sm font-semibold text-[var(--text-muted)]">Nenhum evento encontrado</p>
                <p className="text-xs text-[var(--text-muted)]">Tente ajustar os filtros ou a busca.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-10">

                {/* ── SHORT bucket ── */}
                {short.length > 0 && (
                  <section className="flex flex-col gap-4">
                    <SectionHeader label="Encerra em breve" count={short.length} variant="short" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {long.map((event) => (
                        <EventCard key={event.id} event={event} onOpen={setDrawerEvent} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Empty grid (all events are HOT) */}
                {short.length === 0 && mid.length === 0 && long.length === 0 && hot.length > 0 && (
                  <p className="text-sm text-[var(--text-muted)]">
                    Todos os eventos ativos estão na seção HOT.
                  </p>
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
