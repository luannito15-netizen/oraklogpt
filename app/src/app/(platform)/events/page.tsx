"use client";

import { useState, useMemo } from "react";
import { EventCard } from "@/components/ui/event-card";
import { mockEvents } from "@/lib/mock-events";

const categories = ["Todos", "Economia", "Clima", "Esportes", "Política"];

const sortOptions = [
  { value: "volume",   label: "Maior volume"   },
  { value: "deadline", label: "Encerra em breve"},
  { value: "sim-high", label: "SIM mais alto"  },
  { value: "nao-high", label: "NÃO mais alto"  },
];

export default function EventsPage() {
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("Todos");
  const [sort, setSort]         = useState("volume");
  const [view, setView]         = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let result = [...mockEvents];
    if (category !== "Todos") result = result.filter((e) => e.category === category);
    if (search) result = result.filter((e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "volume")   result.sort((a, b) => b.volume - a.volume);
    if (sort === "sim-high") result.sort((a, b) => b.simPercent - a.simPercent);
    if (sort === "nao-high") result.sort((a, b) => a.simPercent - b.simPercent);
    return result;
  }, [search, category, sort]);

  const totalVolume = mockEvents.reduce((s, e) => s + e.volume, 0);

  return (
    <div className="space-y-5">

      {/* ── Page header ── */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-anton)] text-2xl text-white">Mercados</h1>
          <p className="mt-0.5 text-xs text-white/30">
            {mockEvents.length} eventos abertos · R$ {(totalVolume / 1000).toFixed(1)}k em volume
          </p>
        </div>
        {/* View toggle */}
        <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1 ring-1 ring-white/8">
          <button onClick={() => setView("grid")}
            className={`rounded-lg p-2 transition-all ${view === "grid" ? "bg-white/10 text-white" : "text-white/25 hover:text-white/50"}`}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1" y="1" width="4.5" height="4.5" rx="1" fill="currentColor"/>
              <rect x="7.5" y="1" width="4.5" height="4.5" rx="1" fill="currentColor"/>
              <rect x="1" y="7.5" width="4.5" height="4.5" rx="1" fill="currentColor"/>
              <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" fill="currentColor"/>
            </svg>
          </button>
          <button onClick={() => setView("list")}
            className={`rounded-lg p-2 transition-all ${view === "list" ? "bg-white/10 text-white" : "text-white/25 hover:text-white/50"}`}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 3h11M1 6.5h11M1 10h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="grid grid-cols-3 divide-x divide-white/6 overflow-hidden rounded-2xl bg-[#140d24] ring-1 ring-white/8">
        {[
          { label: "Eventos abertos", value: mockEvents.length.toString() },
          { label: "Volume total",    value: `R$ ${(totalVolume / 1000).toFixed(1)}k` },
          { label: "Participações",   value: "1.240" },
        ].map((s) => (
          <div key={s.label} className="px-5 py-3.5 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/20">{s.label}</p>
            <p className="mt-1 font-[family-name:var(--font-anton)] text-xl text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Filters bar ── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative min-w-[200px] flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3"/>
            <path d="m9 9 2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            type="search" placeholder="Buscar evento..."
            className="h-9 w-full rounded-xl bg-white/5 pl-8 pr-3 text-xs text-white outline-none ring-1 ring-white/8 placeholder:text-white/20 focus:ring-[var(--oraklo-color-primary)]/50"/>
        </div>

        {/* Category pills */}
        <div className="fade-edges-x flex gap-1.5 overflow-x-auto pb-0.5 sm:flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] transition-all ${
                category === cat
                  ? "bg-[var(--oraklo-color-primary)]/20 text-[var(--oraklo-color-primary-glow)] ring-1 ring-[var(--oraklo-color-primary)]/30"
                  : "text-white/30 hover:bg-white/5 hover:text-white/60"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="relative ml-auto">
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="h-9 appearance-none rounded-xl bg-white/5 pl-3 pr-7 text-[10px] font-semibold text-white/50 outline-none ring-1 ring-white/8 transition-all focus:ring-[var(--oraklo-color-primary)]/50 hover:bg-white/8">
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-[#1a0f2e]">{o.label}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/25" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 3.5L5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Active filter chips */}
      {(category !== "Todos" || search) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-white/25">Filtros ativos:</span>
          {category !== "Todos" && (
            <button onClick={() => setCategory("Todos")}
              className="flex items-center gap-1.5 rounded-full bg-[var(--oraklo-color-primary)]/15 px-2.5 py-1 text-[10px] font-semibold text-[var(--oraklo-color-primary-glow)] ring-1 ring-[var(--oraklo-color-primary)]/25">
              {category}
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 2l4 4M6 2L2 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </button>
          )}
          {search && (
            <button onClick={() => setSearch("")}
              className="flex items-center gap-1.5 rounded-full bg-white/8 px-2.5 py-1 text-[10px] font-semibold text-white/50 ring-1 ring-white/10">
              "{search}"
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 2l4 4M6 2L2 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </button>
          )}
          <button onClick={() => { setCategory("Todos"); setSearch(""); }}
            className="text-[10px] text-white/25 hover:text-white/50 transition-colors">
            Limpar tudo
          </button>
        </div>
      )}

      {/* ── Results ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#140d24] py-16 text-center ring-1 ring-white/8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white/20">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="m13 13 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/40">Nenhum evento encontrado</p>
            <p className="mt-1 text-xs text-white/20">Tente ajustar os filtros ou busca</p>
          </div>
          <button onClick={() => { setCategory("Todos"); setSearch(""); }}
            className="rounded-xl bg-white/5 px-4 py-2 text-xs font-semibold text-white/40 ring-1 ring-white/8 hover:bg-white/8 hover:text-white/60 transition-colors">
            Limpar filtros
          </button>
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((e) => <EventCard key={e.id} event={e}/>)}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((e) => (
            <a key={e.id} href={`/events/${e.id}`}
              className="flex items-center gap-4 rounded-2xl bg-[#140d24] px-5 py-4 ring-1 ring-white/8 transition-all hover:ring-[var(--oraklo-color-primary)]/30">
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/25">{e.category}</p>
                <p className="mt-0.5 truncate text-sm font-semibold text-white/80">{e.title}</p>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <div className="text-center">
                  <p className="text-[9px] text-white/20">SIM</p>
                  <p className="text-sm font-bold text-emerald-400">{e.simPercent}%</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-white/20">NÃO</p>
                  <p className="text-sm font-bold text-orange-400">{100 - e.simPercent}%</p>
                </div>
                <div className="text-center hidden sm:block">
                  <p className="text-[9px] text-white/20">Volume</p>
                  <p className="text-xs font-semibold text-white/50">
                    R$ {(e.volume / 1000).toFixed(1)}k
                  </p>
                </div>
                <div className="text-center hidden md:block">
                  <p className="text-[9px] text-white/20">Encerra</p>
                  <p className="text-xs font-semibold text-white/50">{e.deadline}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white/15">
                  <path d="M3.5 7h7M8 4l2.5 3L8 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Result count */}
      {filtered.length > 0 && (
        <p className="text-center text-[10px] text-white/20">
          Exibindo {filtered.length} de {mockEvents.length} eventos
        </p>
      )}
    </div>
  );
}
