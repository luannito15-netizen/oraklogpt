import Link from "next/link";
import Image from "next/image";
import { getUrgencyTier, URGENCY_COLORS, getHotIntensity, HOT_INTENSITY_COLORS } from "@/lib/urgency";

export type EventStatus = "open" | "closed" | "resolved" | "canceled";

export interface EventCardData {
  id: string;
  title: string;
  category: string;
  status: EventStatus;
  simPercent: number; // % do volume no lado SIM (0–100) — maps from yes_percent
  volume: number;     // total volume in BRL — maps from total_volume
  deadline: string;
  deadlineDays: number; // integer: 0 = today/HOT, 1 = 1 day, etc.
  deadlineAt: string;   // ISO 8601 string from DB (deadline_at)
  source: string;
  // Raw volume breakdown from v_events_with_state
  yesAmount: number;
  noAmount: number;
  totalVolume: number;
  yesPercent: number;
  noPercent: number;
  imageUrl: string | null;
}

/** Retorno decimal: quanto o usuário recebe por R$1 participado (já com taxa de 5%) */
function cotacao(percent: number): string {
  if (percent <= 0) return "—";
  return (0.95 / (percent / 100)).toFixed(2);
}

/**
 * CSS variable token for category pill background.
 * Applied via inline style — Tailwind cannot resolve arbitrary CSS vars at build time,
 * so this is the only correct approach for dynamic per-category theming.
 */
const categoryToken: Record<string, string> = {
  Esportes: "var(--cat-football)",
  Política: "var(--cat-politics)",
  Economia: "var(--cat-economy)",
  Clima:    "var(--cat-geo)",
};

/** Compact BRL volume formatting (K / M suffix) */
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
          <span
            className="self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white"
            style={{ background: categoryToken[event.category] ?? "var(--surface-elevated)" }}
          >
            {event.category}
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">{event.source}</span>
        </div>
      </div>

      {/* Question */}
      <p className="mt-3 text-sm font-black leading-snug text-[var(--text)]">
        {event.title}
      </p>

      {/* SIM / NÃO buttons */}
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

      {/* Distribution bar */}
      <div className="mt-3">
        <div className="flex h-1.5 overflow-hidden rounded-full">
          <div className="bg-emerald-500 transition-all duration-500" style={{ width: `${event.simPercent}%` }} />
          <div className="flex-1 bg-orange-500/70" />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-[var(--text-muted)]">
          <span>{event.simPercent}%</span>
          <span>{nao}%</span>
        </div>
      </div>
    </>
  );

  const sharedClass =
    "group block rounded-2xl bg-[var(--surface-elevated)] p-4 ring-1 ring-[var(--border)] transition-all transition-shadow duration-200 hover:scale-[1.02] active:scale-[0.99] hover:ring-[var(--accent)] hover:shadow-[0_0_24px_rgba(168,85,247,0.20)] text-left w-full";

  if (onOpen) {
    return (
      <button type="button" onClick={() => onOpen(event)} className={sharedClass}>
        {inner}
      </button>
    );
  }

  return (
    <Link href={`/events/${event.id}`} className={sharedClass}>
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
  const nao = 100 - event.simPercent;
  const tier = getUrgencyTier(event.deadlineDays);
  const intensity = tier === "hot" ? getHotIntensity(event.deadlineAt) : null;

  const inner = (
    <>
      {/* Thumbnail or category accent strip */}
      {event.imageUrl ? (
        <div className="relative h-28 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] to-transparent" />
        </div>
      ) : (
        /* Category accent strip — uses CSS token, not Tailwind hardcoded colors */
        <div
          className="h-1.5 w-full rounded-t-2xl"
          style={{
            background: `linear-gradient(to right, ${categoryToken[event.category] ?? "var(--border)"}, color-mix(in srgb, ${categoryToken[event.category] ?? "var(--border)"} 60%, transparent))`,
          }}
        />
      )}

      {/* Card body */}
      <div className="p-5">
        {/* Category pill + urgency badge + source */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white"
              style={{ background: categoryToken[event.category] ?? "var(--surface-elevated)" }}
            >
              {event.category}
            </span>
            {tier === "hot" && intensity && (
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide ring-1 animate-pulse ${HOT_INTENSITY_COLORS[intensity].badge}`}>
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

        {/* Question — line-clamp-2 so both football team names are visible */}
        <p className="text-base font-black leading-snug text-[var(--text)] line-clamp-2 group-hover:text-[var(--ring)] transition-colors">
          {event.title}
        </p>

        {/* Separator */}
        <div className="my-3 border-t border-[var(--border)]" />

        {/* SIM / NÃO */}
        <div className="flex gap-2">
          <div className="flex flex-1 flex-col items-start gap-1 rounded-xl bg-emerald-500/15 px-3 py-2.5 ring-1 ring-emerald-500/25 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]">
            <div className="flex w-full items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">SIM</span>
              <span className="text-xs font-bold text-[var(--text)]">{cotacao(event.simPercent)}</span>
              <span className="text-[10px] text-emerald-400">▲</span>
            </div>
            <span className="text-[11px] font-semibold text-[var(--text-secondary)]">{event.simPercent}%</span>
          </div>
          <div className="flex flex-1 flex-col items-start gap-1 rounded-xl bg-orange-500/15 px-3 py-2.5 ring-1 ring-orange-500/25 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]">
            <div className="flex w-full items-center justify-between">
              <span className="text-xs font-bold text-orange-400">NÃO</span>
              <span className="text-xs font-bold text-[var(--text)]">{cotacao(nao)}</span>
              <span className="text-[10px] text-orange-400">▼</span>
            </div>
            <span className="text-[11px] font-semibold text-[var(--text-secondary)]">{nao}%</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3.5">
          <div className="flex h-1.5 overflow-hidden rounded-full bg-orange-500/60">
            <div className="bg-emerald-500 transition-all duration-500" style={{ width: `${event.simPercent}%` }} />
          </div>
        </div>

        {/* Footer — volume compact + deadline colored by tier */}
        <div className="mt-3.5 flex items-center justify-between border-t border-[var(--border)] pt-3">
          <span className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {formatVolumeCompact(event.totalVolume)} participado
          </span>
          {tier === "hot" && intensity ? (
            <span className={`flex items-center gap-1 text-[10px] font-bold ${HOT_INTENSITY_COLORS[intensity].text}`}>
              <span
                className="inline-block h-1.5 w-1.5 rounded-full animate-pulse shrink-0"
                style={{ background: "currentColor" }}
              />
              {intensity === "last-call" ? "Último momento!" : intensity === "super-hot" ? "Encerra em horas" : "Encerra hoje"}
            </span>
          ) : (
            <span
              className={`flex items-center gap-1 text-[10px] font-semibold ${
                tier === "short" ? "text-amber-400" : "text-[var(--text-muted)]"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {tier === "hot" ? "Encerra hoje" : `Encerra em ${event.deadline}`}
            </span>
          )}
        </div>
      </div>
    </>
  );

  const sharedClass =
    tier === "hot" && intensity
      ? `group block rounded-2xl bg-[var(--surface-elevated)] overflow-hidden ring-1 transition-all duration-200 text-left w-full ${HOT_INTENSITY_COLORS[intensity].ring} ${HOT_INTENSITY_COLORS[intensity].glow}`
      : "group block rounded-2xl bg-[var(--surface-elevated)] overflow-hidden ring-1 ring-[var(--border)] transition-all duration-200 text-left w-full hover:ring-[var(--accent)] hover:shadow-[0_0_28px_rgba(168,85,247,0.18)]";

  if (onOpen) {
    return (
      <button type="button" onClick={() => onOpen(event)} className={sharedClass}>
        {inner}
      </button>
    );
  }

  return (
    <Link href={`/events/${event.id}`} className={sharedClass}>
      {inner}
    </Link>
  );
}
