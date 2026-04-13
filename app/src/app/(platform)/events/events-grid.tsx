"use client";

import { useState, useMemo } from "react";
import { EventCard, type EventCardData } from "@/components/ui/event-card";
import { EventHotHero } from "@/components/ui/event-hot-hero";
import { EventDrawer } from "@/components/ui/event-drawer";
import { URGENCY_COLORS } from "@/lib/urgency";

const categories = ["Todos", "Economia", "Clima", "Esportes", "Política"];

const sortOptions = [
  { value: "volume",   label: "Maior volume"    },
  { value: "deadline", label: "Encerra em breve" },
  { value: "sim-high", label: "SIM mais alto"   },
  { value: "nao-high", label: "NÃO mais alto"   },
];

interface EventsGridProps {
  initialEvents: EventCardData[];
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({ label, dotClass, accent }: { label: string; dotClass: string; accent?: boolean }) {
  return (
    <div className={`flex items-center gap-2 mb-4 ${accent ? "pl-3 border-l-2 border-red-500/60" : ""}`}>
      <span className={`h-2 w-2 rounded-full ${dotClass}`} />
      <h2 className={`text-sm font-bold uppercase tracking-[0.1em] ${accent ? "text-red-400" : "text-[var(--text-secondary)]"}`}>{label}</h2>
    </div>
  );
}

// ─── Grid / List renderers ────────────────────────────────────────────────────

function EventGrid({
  events,
  onOpen,
}: {
  events: EventCardData[];
  onOpen: (e: EventCardData) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {events.map((e) => (
        <EventCard key={e.id} event={e} onOpen={onOpen} />
      ))}
    </div>
  );
}

function EventList({
  events,
  onOpen,
}: {
  events: EventCardData[];
  onOpen: (e: EventCardData) => void;
}) {
  return (
    <div className="space-y-2">
      {events.map((e) => (
        <button
          key={e.id}
          type="button"
          onClick={() => onOpen(e)}
          className="flex w-full items-center gap-4 rounded-2xl bg-[var(--surface)] px-5 py-4 text-left ring-1 ring-[var(--border)] transition-all hover:ring-[var(--accent)]/40"
        >
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">{e.category}</p>
            <p className="mt-0.5 truncate text-sm font-semibold text-[var(--text-secondary)]">{e.title}</p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <div className="text-center">
              <p className="text-[9px] text-[var(--text-muted)]">SIM</p>
              <p className="text-sm font-bold text-emerald-400">{e.simPercent}%</p>
            </div>
            <div className="text-center">
              <p className="text-[9px] text-[var(--text-muted)]">NÃO</p>
              <p className="text-sm font-bold text-orange-400">{100 - e.simPercent}%</p>
            </div>
            <div className="text-center hidden sm:block">
              <p className="text-[9px] text-[var(--text-muted)]">Volume</p>
              <p className="text-xs font-semibold text-[var(--text-muted)]">R$ {(e.volume / 1000).toFixed(1)}k</p>
            </div>
            <div className="text-center hidden md:block">
              <p className="text-[9px] text-[var(--text-muted)]">Encerra</p>
              <p className="text-xs font-semibold text-[var(--text-muted)]">{e.deadline}</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[var(--border)]">
              <path d="M3.5 7h7M8 4l2.5 3L8 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function EventsGrid({ initialEvents }: EventsGridProps) {
  const [search, setSearch]           = useState("");
  const [category, setCategory]       = useState("Todos");
  const [sort, setSort]               = useState("volume");
  const [view, setView]               = useState<"grid" | "list">("grid");
  const [drawerEvent, setDrawerEvent] = useState<EventCardData | null>(null);

  const isFiltering = search !== "" || category !== "Todos";

  const { sorted, hot, short, mid, long } = useMemo(() => {
    let result = [...initialEvents];

    // Filter
    if (category !== "Todos") result = result.filter((e) => e.category === category);
    if (search) result = result.filter((e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
    );

    // Sort
    const sorted = result.sort((a, b) => {
      switch (sort) {
        case "volume":   return b.volume - a.volume;
        case "deadline": return a.deadlineDays - b.deadlineDays;
        case "sim-high": return b.simPercent - a.simPercent;
        case "nao-high": return a.simPercent - b.simPercent;
        default:         return 0;
      }
    });

    // Group
    const hot   = sorted.filter((e) => e.deadlineDays <= 1);
    const short = sorted.filter((e) => e.deadlineDays > 1  && e.deadlineDays <= 3);
    const mid   = sorted.filter((e) => e.deadlineDays > 3  && e.deadlineDays <= 14);
    const long  = sorted.filter((e) => e.deadlineDays > 14);

    return { sorted, hot, short, mid, long };
  }, [initialEvents, search, category, sort]);

  const totalVolume = initialEvents.reduce((s, e) => s + e.volume, 0);

  if (initialEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-[var(--surface)] py-20 text-center ring-1 ring-[var(--border)]">
        <p className="text-sm font-semibold text-[var(--text-muted)]">Nenhum evento disponível no momento.</p>
      </div>
    );
  }

  const renderCollection = (events: EventCardData[]) =>
    view === "grid"
      ? <EventGrid events={events} onOpen={setDrawerEvent} />
      : <EventList events={events} onOpen={setDrawerEvent} />;

  return (
    <>
      <div className="space-y-5">

        {/* ── Page header ── */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-anton)] text-2xl text-[var(--text)]">Mercados</h1>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              {initialEvents.length} eventos abertos · R$ {(totalVolume / 1000).toFixed(1)}k em volume
            </p>
          </div>
          {/* View toggle */}
          <div className="flex items-center gap-1 rounded-xl bg-[var(--surface)] p-1 ring-1 ring-[var(--border)]">
            <button type="button" aria-label="Visualização em grade" onClick={() => setView("grid")}
              className={`rounded-lg p-2 transition-all ${view === "grid" ? "bg-[var(--accent)]/20 text-[var(--text)] ring-1 ring-[var(--accent)]/50" : "text-[var(--text-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-secondary)]"}`}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="4.5" height="4.5" rx="1" fill="currentColor"/>
                <rect x="7.5" y="1" width="4.5" height="4.5" rx="1" fill="currentColor"/>
                <rect x="1" y="7.5" width="4.5" height="4.5" rx="1" fill="currentColor"/>
                <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" fill="currentColor"/>
              </svg>
            </button>
            <button type="button" aria-label="Visualização em lista" onClick={() => setView("list")}
              className={`rounded-lg p-2 transition-all ${view === "list" ? "bg-[var(--accent)]/20 text-[var(--text)] ring-1 ring-[var(--accent)]/50" : "text-[var(--text-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-secondary)]"}`}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M1 3h11M1 6.5h11M1 10h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="grid grid-cols-3 divide-x divide-[var(--border)] overflow-hidden rounded-2xl bg-[var(--surface)] ring-1 ring-[var(--border)]">
          {[
            { label: "Eventos abertos", value: initialEvents.length.toString() },
            { label: "Volume total",    value: `R$ ${(totalVolume / 1000).toFixed(1)}k` },
            { label: "Participações",   value: "1.240" },
          ].map((s) => (
            <div key={s.label} className="px-5 py-3.5 text-center">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">{s.label}</p>
              <p className="mt-1 font-[family-name:var(--font-anton)] text-xl text-[var(--text)]">{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Filters bar ── */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative min-w-[200px] flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3"/>
              <path d="m9 9 2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              type="search" placeholder="Buscar evento..."
              className="h-9 w-full rounded-xl bg-[var(--input-bg)] pl-8 pr-3 text-xs text-[var(--text)] outline-none ring-1 ring-[var(--border)] placeholder:text-[var(--text-muted)] focus:ring-[var(--ring)]"/>
          </div>

          {/* Category pills */}
          <div className="fade-edges-x flex gap-1.5 overflow-x-auto pb-0.5 sm:flex-wrap">
            {categories.map((cat) => (
              <button type="button" key={cat} onClick={() => setCategory(cat)}
                className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] transition-all ${
                  category === cat
                    ? "bg-[var(--accent)]/20 text-[var(--ring)] ring-1 ring-[var(--accent)]/50"
                    : "text-[var(--text-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-secondary)]"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative ml-auto">
            <select aria-label="Ordenar eventos" value={sort} onChange={(e) => setSort(e.target.value)}
              className="h-9 appearance-none rounded-xl bg-[var(--input-bg)] pl-3 pr-7 text-[10px] font-semibold text-[var(--text-muted)] outline-none ring-1 ring-[var(--border)] transition-all focus:ring-[var(--ring)] hover:bg-[var(--surface)]">
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-[var(--surface)]">{o.label}</option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3.5L5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Active filter chips */}
        {isFiltering && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-[var(--text-muted)]">Filtros ativos:</span>
            {category !== "Todos" && (
              <button type="button" aria-label={`Remover filtro: ${category}`} onClick={() => setCategory("Todos")}
                className="flex items-center gap-1.5 rounded-full bg-[var(--accent)]/10 px-2.5 py-1 text-[10px] font-semibold text-[var(--ring)] ring-1 ring-[var(--accent)]/25">
                {category}
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true"><path d="M2 2l4 4M6 2L2 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </button>
            )}
            {search && (
              <button type="button" aria-label={`Remover busca: ${search}`} onClick={() => setSearch("")}
                className="flex items-center gap-1.5 rounded-full bg-[var(--surface)] px-2.5 py-1 text-[10px] font-semibold text-[var(--text-muted)] ring-1 ring-[var(--border)]">
                &ldquo;{search}&rdquo;
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true"><path d="M2 2l4 4M6 2L2 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </button>
            )}
            <button type="button" onClick={() => { setCategory("Todos"); setSearch(""); }}
              className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Limpar tudo
            </button>
          </div>
        )}

        {/* ── Results ── */}
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-[var(--surface)] py-16 text-center ring-1 ring-[var(--border)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-elevated)]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[var(--text-muted)]">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="m13 13 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-muted)]">Nenhum evento encontrado</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">Tente ajustar os filtros ou busca</p>
            </div>
            <button type="button" onClick={() => { setCategory("Todos"); setSearch(""); }}
              className="rounded-xl bg-[var(--surface-elevated)] px-4 py-2 text-xs font-semibold text-[var(--text-muted)] ring-1 ring-[var(--border)] hover:ring-[var(--ring)] hover:text-[var(--text-secondary)] transition-colors">
              Limpar filtros
            </button>
          </div>
        ) : isFiltering ? (
          /* Flat list when filtering — no urgency sections */
          renderCollection(sorted)
        ) : (
          /* Grouped sections when browsing */
          <div className="space-y-8">
            {hot.length > 0 && (
              <section>
                <SectionHeader label="Em Alta" dotClass={`${URGENCY_COLORS.hot.dot} animate-pulse`} accent />
                <EventHotHero event={hot[0]} onOpen={setDrawerEvent} />
                {hot.length > 1 && (
                  <div className="mt-3">
                    {renderCollection(hot.slice(1))}
                  </div>
                )}
              </section>
            )}

            {short.length > 0 && (
              <section>
                <SectionHeader label="Encerra em breve" dotClass={URGENCY_COLORS.short.dot} />
                {renderCollection(short)}
              </section>
            )}

            {mid.length > 0 && (
              <section>
                <SectionHeader label="Esta semana" dotClass={URGENCY_COLORS.mid.dot} />
                {renderCollection(mid)}
              </section>
            )}

            {long.length > 0 && (
              <section>
                <SectionHeader label="Próximas semanas" dotClass={URGENCY_COLORS.long.dot} />
                {renderCollection(long)}
              </section>
            )}
          </div>
        )}

        {/* Result count */}
        {sorted.length > 0 && (
          <p className="text-center text-[10px] text-[var(--text-muted)]">
            Exibindo {sorted.length} de {initialEvents.length} eventos
          </p>
        )}
      </div>

      {/* Drawer — fora do scroll container */}
      <EventDrawer event={drawerEvent} onClose={() => setDrawerEvent(null)} />
    </>
  );
}
