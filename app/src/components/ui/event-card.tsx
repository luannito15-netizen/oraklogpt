"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getUrgencyTier, URGENCY_COLORS, getHotIntensity, HOT_INTENSITY_COLORS } from "@/lib/urgency";
import { IconCoins, IconClock, CategoryIcon } from "@/components/ui/icons";
import { FlameIcon3D } from "@/components/ui/flame-icon";
import { DigitalCountdown } from "@/components/ui/digital-countdown";

export type EventStatus = "open" | "closed" | "resolved" | "canceled";

export interface EventCardData {
  id: string;
  title: string;
  category: string;
  status: EventStatus;
  simPercent: number; // % do volume no lado SIM (0–100)
  volume: number;     // total volume in BRL
  deadline: string;
  deadlineDays: number;
  deadlineAt: string; // ISO 8601
  source: string;
  yesAmount: number;
  noAmount: number;
  totalVolume: number;
  yesPercent: number;
  noPercent: number;
  imageUrl: string | null;
}

/** Cotação decimal: quanto o usuário recebe por R$1 participado (já com taxa de 5%) */
function cotacao(percent: number): string {
  if (percent <= 0) return "—";
  return (0.95 / (percent / 100)).toFixed(2);
}

/** Compact BRL volume formatting */
function formatVolumeCompact(value: number): string {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return `R$ ${(value / 1_000).toFixed(1)}K`;
  return `R$ ${value.toLocaleString("pt-BR")}`;
}

// ─── Variante compacta (landing page) ────────────────────────────────────────

interface EventCardCompactProps {
  event: EventCardData;
  onOpen?: (event: EventCardData) => void;
}

export function EventCardCompact({ event, onOpen }: EventCardCompactProps) {
  const nao = 100 - event.simPercent;

  const inner = (
    <>
      {/* Category + source */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          {/* event-card-badge reads --_cat set by [data-cat] on the wrapper */}
          <span className="event-card-badge inline-flex items-center gap-1 self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]">
            <CategoryIcon category={event.category} className="h-3 w-3 shrink-0" />
            {event.category}
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">{event.source}</span>
        </div>
      </div>

      {/* Question */}
      <p className="mt-3 text-sm font-black leading-snug text-[var(--text)]">
        {event.title}
      </p>

      {/* SIM / NÃO */}
      <div className="mt-4 flex gap-2">
        <div className="flex flex-1 items-center justify-between gap-1 rounded-xl bg-emerald-500/15 px-3 py-2 ring-1 ring-emerald-500/25 transition-all duration-200 group-hover:bg-emerald-500/25 group-hover:ring-emerald-500/50">
          <span className="text-xs font-bold text-emerald-400">SIM</span>
          <span className="text-xs font-bold text-[var(--text)]">{cotacao(event.simPercent)}</span>
          <span className="text-[10px] text-emerald-400">▲</span>
        </div>
        <div className="flex flex-1 items-center justify-between gap-1 rounded-xl bg-orange-500/15 px-3 py-2 ring-1 ring-orange-500/25 transition-all duration-200 group-hover:bg-orange-500/25 group-hover:ring-orange-500/50">
          <span className="text-xs font-bold text-orange-400">NÃO</span>
          <span className="text-xs font-bold text-[var(--text)]">{cotacao(nao)}</span>
          <span className="text-[10px] text-orange-400">▼</span>
        </div>
      </div>

      {/* Distribution bar — category gradient */}
      <div className="mt-3">
        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface)]">
          {/* width is runtime data — no CSS-only alternative exists */}
          <div
            className="event-card-bar h-full rounded-full transition-all duration-500"
            style={{ width: `${event.simPercent}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-[var(--text-muted)]">
          <span>{event.simPercent}%</span>
          <span>{nao}%</span>
        </div>
      </div>
    </>
  );

  const sharedClass =
    "group block rounded-2xl bg-[var(--surface-elevated)] p-4 ring-1 ring-[var(--border)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] hover:ring-[var(--accent)] hover:shadow-[0_0_24px_rgba(168,85,247,0.20)] text-left w-full";

  if (onOpen) {
    return (
      <button type="button" onClick={() => onOpen(event)} className={sharedClass} data-cat={event.category}>
        {inner}
      </button>
    );
  }

  return (
    <Link href={`/events/${event.id}`} className={sharedClass} data-cat={event.category}>
      {inner}
    </Link>
  );
}

// ─── Variante padrão (mercados page) ─────────────────────────────────────────

interface EventCardProps {
  event: EventCardData;
  onOpen?: (event: EventCardData) => void;
}

export function EventCard({ event, onOpen }: EventCardProps) {
  const nao       = 100 - event.simPercent;
  const tier      = getUrgencyTier(event.deadlineDays);
  const intensity = tier === "hot" ? getHotIntensity(event.deadlineAt) : null;
  const [hoveredSide, setHoveredSide] = useState<"sim" | "nao" | null>(null);

  // data-cat on the wrapper sets --_cat via globals.css [data-cat] selectors.
  // All .event-card-* classes resolve color-mix(var(--_cat)) from there.

  const inner = (
    <>
      {/* Organic radial glow blob — top-right, clipped by card overflow-hidden */}
      <div aria-hidden className="event-card-glow pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full blur-3xl opacity-50" />

      {/* Thumbnail or category accent strip */}
      {event.imageUrl ? (
        <div className="relative h-28 w-full overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-elevated)]/90 to-transparent" />
        </div>
      ) : (
        <div className="event-card-strip h-[2px] w-full" />
      )}

      {/* Card body */}
      <div className="relative z-10 p-5">
        {/* Category pill + urgency badge + source */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="event-card-badge inline-flex items-center gap-1 shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]">
              <CategoryIcon category={event.category} className="h-3 w-3 shrink-0" />
              {event.category}
            </span>
            {tier === "hot" && intensity && (
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide ring-1 animate-pulse ${HOT_INTENSITY_COLORS[intensity].badge}`}>
                <FlameIcon3D className="h-3 w-3" />
                {intensity === "last-call" ? "LAST CALL" : intensity === "super-hot" ? "SUPER HOT" : "HOT"}
              </span>
            )}
            {tier === "short" && (
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide ring-1 ${URGENCY_COLORS["short"].badge}`}>
                BREVE
              </span>
            )}
          </div>
          <span className="truncate text-right text-[10px] text-[var(--text-muted)]">{event.source}</span>
        </div>

        {/* Question */}
        <p className="text-base font-black leading-snug text-[var(--text)] line-clamp-2 group-hover:text-[var(--ring)] transition-colors">
          {event.title}
        </p>

        {/* Separator */}
        <div className="my-3 border-t border-[var(--border)]/50" />

        {/* SIM / NÃO */}
        <div
          className="relative flex gap-2"
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* SIM — border-l-2 é o indicador de seleção */}
          <div
            className={`event-card-sim flex flex-1 flex-col items-start gap-1 rounded-xl bg-[var(--surface)] px-3 py-2.5 ring-1 ring-[var(--border)]/70 border-l-2${hoveredSide === "nao" ? " sim-border-off" : ""}`}
            onMouseEnter={() => setHoveredSide("sim")}
          >
            <div className="flex w-full items-center justify-between">
              <span className="event-card-sim-accent text-xs font-bold">SIM</span>
              <span className="text-xs font-bold text-[var(--text)]">{cotacao(event.simPercent)}</span>
              <span className="event-card-sim-accent text-[10px]">▲</span>
            </div>
            <span className="text-[11px] font-semibold text-[var(--text-secondary)]">{event.simPercent}%</span>
          </div>

          {/* NÃO — border-r-2 aparece ao hover */}
          <div
            className={`event-card-nao flex flex-1 flex-col items-start gap-1 rounded-xl px-3 py-2.5 ring-1 ring-[var(--border)]/40${hoveredSide === "nao" ? " nao-border-on" : ""}`}
            onMouseEnter={() => setHoveredSide("nao")}
          >
            <div className="flex w-full items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-secondary)]">NÃO</span>
              <span className="text-xs font-bold text-[var(--text)]">{cotacao(nao)}</span>
              <span className="text-[10px] text-[var(--text-muted)]">▼</span>
            </div>
            <span className="text-[11px] font-semibold text-[var(--text-muted)]">{nao}%</span>
          </div>
        </div>

        {/* Progress bar — single category gradient */}
        <div className="mt-3.5">
          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface)]">
            {/* width is runtime data — no CSS-only alternative exists */}
            <div
              className="event-card-bar h-full rounded-full"
              style={{ width: `${event.simPercent}%` }}
            />
          </div>
        </div>

        {/* Footer — volume + deadline */}
        <div className={`mt-3.5 border-t border-[var(--border)]/50 pt-3 ${tier === "hot" && intensity ? "flex flex-col gap-2" : "flex items-center justify-between"}`}>
          <span className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
            <IconCoins className="h-3.5 w-3.5" />
            {formatVolumeCompact(event.totalVolume)} participado
          </span>
          {tier === "hot" && intensity ? (
            <DigitalCountdown deadlineAt={event.deadlineAt} />
          ) : (
            <span className={`flex items-center gap-1 text-[10px] font-semibold ${tier === "short" ? "text-amber-400" : "text-[var(--text-muted)]"}`}>
              <IconClock className="h-3.5 w-3.5" />
              {`Encerra em ${event.deadline}`}
            </span>
          )}
        </div>
      </div>
    </>
  );

  const sharedClass =
    tier === "hot" && intensity
      ? `group relative block rounded-2xl overflow-hidden ring-1 text-left w-full event-card-bg event-card-hot ${HOT_INTENSITY_COLORS[intensity].ring} ${HOT_INTENSITY_COLORS[intensity].glow}`
      : "group relative block rounded-2xl overflow-hidden ring-1 ring-[var(--border)]/60 text-left w-full event-card-bg event-card";

  if (onOpen) {
    return (
      <button type="button" onClick={() => onOpen(event)} className={sharedClass} data-cat={event.category}>
        {inner}
      </button>
    );
  }

  return (
    <Link href={`/events/${event.id}`} className={sharedClass} data-cat={event.category}>
      {inner}
    </Link>
  );
}
