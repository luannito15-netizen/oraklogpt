"use client";

import { useState, useMemo } from "react";
import type { EventCardData } from "@/components/ui/event-card";
import { EventCard } from "@/components/ui/event-card";
import { PublicNav, PublicFooter } from "@/components/ui/public-nav";
import { AdBanner } from "@/components/ui/ad-banner";

const categories = ["Todos", "Economia", "Clima", "Esportes", "Política"];
const sortOptions = [
  { value: "volume",   label: "Volume"      },
  { value: "prazo",    label: "Prazo"       },
  { value: "sim",      label: "Cotação SIM" },
  { value: "nao",      label: "Cotação NÃO" },
];

const stats = [
  { label: "Volume total",    value: "R$ 65.280" },
  { label: "Eventos abertos", value: "6"         },
  { label: "Participações",   value: "1.240"      },
  { label: "Usuários ativos", value: "318"        },
];

function parseDias(deadline: string): number {
  return parseInt(deadline) || 0;
}

interface MercadosClientProps {
  events: EventCardData[];
}

export function MercadosClient({ events }: MercadosClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery]           = useState("");
  const [sortBy, setSortBy]                     = useState("volume");

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

          {/* Stats row */}
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
                        ? "bg-[var(--oraklo-color-primary)]/20 text-[var(--oraklo-color-primary-glow)] ring-1 ring-[var(--oraklo-color-primary)]/30"
                        : "text-[var(--th-low)] hover:bg-[var(--th-overlay-5)] hover:text-[var(--th-hi)]"
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
                      ? "text-[var(--oraklo-color-primary-glow)] font-semibold"
                      : "text-[var(--th-low)] hover:text-[var(--th-mid)]"
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
          <div className="flex-1">
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
                  className="h-10 w-full rounded-xl bg-[var(--th-overlay-5)] pl-8 pr-4 text-sm text-[var(--th-text)] outline-none ring-1 ring-[var(--th-ring)] transition-all placeholder:text-[var(--th-dim)] focus:bg-[var(--th-overlay-8)] focus:ring-[var(--oraklo-color-primary)]"
                />
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
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
