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
      <div className="mt-4 flex flex-col gap-2">
        <div className="pulse-sim-pill flex items-center justify-between px-5 py-3">
          <span className="pulse-sim-label text-xs font-black tracking-widest">SIM</span>
          <span className="pulse-cotacao text-xs font-black">{cotacao(event.simPercent)}×</span>
        </div>
        <div className="pulse-nao-pill flex items-center justify-between px-5 py-3">
          <span className="pulse-nao-label text-xs font-black tracking-widest">NÃO</span>
          <span className="pulse-cotacao text-xs font-black">{cotacao(nao)}×</span>
        </div>
      </div>

      {/* Distribution bar — category gradient */}
      <div className="mt-3">
        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface)]">
          {/* eslint-disable-next-line react/forbid-component-props -- runtime-computed width, cannot use static Tailwind class */}
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

  const inner = (
    <>
      {/* Ambient glow */}
      <div aria-hidden className="pulse-card-glow pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full blur-3xl opacity-10" />

      {/* Image or accent strip */}
      {event.imageUrl ? (
        <div className="relative h-32 w-full overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#150b15] via-[rgba(21,11,21,0.5)] to-transparent" />
        </div>
      ) : (
        <div className="event-card-strip h-[3px] w-full" />
      )}

      {/* Card body */}
      <div className="relative z-10 flex flex-col gap-4 p-5">

        {/* Category + urgency + source */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
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
          <span className="pulse-card-source shrink-0 text-right text-[10px]">
            {event.source}
          </span>
        </div>

        {/* Title */}
        <p className="pulse-card-title line-clamp-2 text-base font-black leading-snug">
          {event.title}
        </p>

        {/* SIM pill */}
        <div className="pulse-sim-pill w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="pulse-sim-label text-sm font-black tracking-widest">SIM</span>
              <span className="pulse-sim-pct text-[10px] font-semibold">{event.simPercent}%</span>
            </div>
            <span className="pulse-cotacao text-2xl font-black">{cotacao(event.simPercent)}×</span>
          </div>
        </div>

        {/* NÃO pill */}
        <div className="pulse-nao-pill w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="pulse-nao-label text-sm font-black tracking-widest">NÃO</span>
              <span className="pulse-nao-pct text-[10px] font-semibold">{nao}%</span>
            </div>
            <span className="pulse-cotacao text-2xl font-black">{cotacao(nao)}×</span>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="pulse-bar-track h-1.5 overflow-hidden rounded-full">
            {/* eslint-disable-next-line react/forbid-component-props -- runtime-computed width, cannot use static Tailwind class */}
            <div className="event-card-bar h-full rounded-full" style={{ width: `${event.simPercent}%` }} />
          </div>
          <div className="mt-1 flex justify-between text-[9px] font-bold">
            <span className="pulse-bar-sim-pct">SIM {event.simPercent}%</span>
            <span className="pulse-bar-nao-pct">NÃO {nao}%</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pulse-card-footer flex items-center justify-between border-t pt-3">
          <span className="pulse-card-volume flex items-center gap-1 text-[10px]">
            <IconCoins className="h-3.5 w-3.5" />
            {formatVolumeCompact(event.totalVolume)} participado
          </span>
          {tier === "hot" && intensity ? (
            <DigitalCountdown deadlineAt={event.deadlineAt} />
          ) : (
            <span className={`flex items-center gap-1 text-[10px] font-semibold ${tier === "short" ? "text-amber-400" : "pulse-card-deadline"}`}>
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
      ? `group relative block rounded-2xl overflow-hidden text-left w-full pulse-card event-card-bg ${HOT_INTENSITY_COLORS[intensity].ring}`
      : "group relative block rounded-2xl overflow-hidden text-left w-full pulse-card event-card-bg";

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
