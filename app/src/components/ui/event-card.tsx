import Link from "next/link";
import Image from "next/image";
import { getUrgencyTier, URGENCY_COLORS } from "@/lib/urgency";

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

/** Retorno decimal: quanto o apostador recebe por R$1 apostado (já com taxa de 5%) */
function cotacao(percent: number) {
  if (percent <= 0) return "—";
  return (0.95 / (percent / 100)).toFixed(2);
}

const categoryStyle: Record<string, { bg: string; text: string }> = {
  Clima:    { bg: "bg-sky-500",     text: "text-white" },
  Economia: { bg: "bg-violet-600",  text: "text-white" },
  Esportes: { bg: "bg-emerald-500", text: "text-white" },
  Política: { bg: "bg-amber-500",   text: "text-white" },
};

function getCategoryStyle(cat: string) {
  return categoryStyle[cat] ?? { bg: "bg-[var(--th-overlay-12)]", text: "text-[var(--th-text)]" };
}

// ─── Variante compacta (landing page) ────────────────────────────────────────

interface EventCardCompactProps {
  event: EventCardData;
  onOpen?: (event: EventCardData) => void;
}

export function EventCardCompact({ event, onOpen }: EventCardCompactProps) {
  const nao = 100 - event.simPercent;
  const catStyle = getCategoryStyle(event.category);

  const inner = (
    <>
      {/* Category + source */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <span className={`self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${catStyle.bg} ${catStyle.text}`}>
            {event.category}
          </span>
          <span className="text-[10px] text-white/30">{event.source}</span>
        </div>
      </div>

      {/* Question */}
      <p className="mt-3 text-sm font-black leading-snug text-[var(--th-text)]">
        {event.title}
      </p>

      {/* SIM / NÃO buttons */}
      <div className="mt-4 flex gap-2">
        <div className="flex flex-1 items-center justify-between gap-1 rounded-xl bg-emerald-500/15 px-3 py-2 ring-1 ring-emerald-500/25 transition-all duration-200 group-hover:bg-emerald-500/25 group-hover:ring-emerald-500/50">
          <span className="text-xs font-bold text-emerald-400">SIM</span>
          <span className="text-xs font-bold text-[var(--th-text)]">{cotacao(event.simPercent)}</span>
          <span className="text-[10px] text-emerald-400">▲</span>
        </div>
        <div className="flex flex-1 items-center justify-between gap-1 rounded-xl bg-orange-500/15 px-3 py-2 ring-1 ring-orange-500/25 transition-all duration-200 group-hover:bg-orange-500/25 group-hover:ring-orange-500/50">
          <span className="text-xs font-bold text-orange-400">NÃO</span>
          <span className="text-xs font-bold text-[var(--th-text)]">{cotacao(nao)}</span>
          <span className="text-[10px] text-orange-400">▼</span>
        </div>
      </div>

      {/* Distribution bar */}
      <div className="mt-3">
        <div className="flex h-1.5 overflow-hidden rounded-full">
          <div className="bg-emerald-500 transition-all duration-500" style={{ width: `${event.simPercent}%` }} />
          <div className="flex-1 bg-orange-500/70" />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-[var(--th-low)]">
          <span>{event.simPercent}%</span>
          <span>{nao}%</span>
        </div>
      </div>
    </>
  );

  const sharedClass =
    "group block rounded-2xl bg-[var(--th-bg-card)] p-4 ring-1 ring-[var(--th-ring)] transition-all transition-shadow duration-200 hover:scale-[1.02] active:scale-[0.99] hover:ring-[var(--oraklo-color-primary)] hover:shadow-[0_0_24px_rgb(123_47_247/0.25)] text-left w-full";

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

// ─── Variante padrão (plataforma) ────────────────────────────────────────────

interface EventCardProps {
  event: EventCardData;
  onOpen?: (event: EventCardData) => void;
}

export function EventCard({ event, onOpen }: EventCardProps) {
  const nao = 100 - event.simPercent;
  const catStyle = getCategoryStyle(event.category);
  const tier = getUrgencyTier(event.deadlineDays);

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
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f2e] to-transparent" />
        </div>
      ) : (
        <div className={`h-1.5 w-full rounded-t-2xl ${
          event.category === 'Esportes' ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' :
          event.category === 'Economia' ? 'bg-gradient-to-r from-sky-600 to-sky-400' :
          event.category === 'Política' ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
          'bg-gradient-to-r from-violet-600 to-violet-400'
        }`} />
      )}

      {/* Card body padding */}
      <div className="p-5">
        {/* Category + urgency badge + source */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${catStyle.bg} ${catStyle.text}`}>
              {event.category}
            </span>
            {(tier === "hot" || tier === "short") && (
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide ring-1 ${URGENCY_COLORS[tier].badge}`}>
                {tier === "hot" ? "HOT" : "BREVE"}
              </span>
            )}
          </div>
          <span className="truncate text-right text-[10px] text-[var(--th-low)]">{event.source}</span>
        </div>

        {/* Question */}
        <p className="text-base font-black leading-snug text-[var(--th-text)] line-clamp-3 group-hover:text-[var(--oraklo-color-primary-glow)] transition-colors">
          {event.title}
        </p>

        {/* Separator above SIM/NÃO */}
        <div className="my-3 border-t border-white/[0.06]" />

        {/* SIM / NÃO */}
        <div className="flex gap-2">
          <div className="flex flex-1 flex-col items-start gap-1 rounded-xl bg-emerald-500/15 px-3 py-2.5 ring-1 ring-emerald-500/25 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]">
            <div className="flex w-full items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">SIM</span>
              <span className="text-xs font-bold text-[var(--th-text)]">{cotacao(event.simPercent)}</span>
              <span className="text-[10px] text-emerald-400">▲</span>
            </div>
            <span className="text-[11px] font-semibold text-[var(--th-mid)]">{event.simPercent}%</span>
          </div>
          <div className="flex flex-1 flex-col items-start gap-1 rounded-xl bg-orange-500/15 px-3 py-2.5 ring-1 ring-orange-500/25 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]">
            <div className="flex w-full items-center justify-between">
              <span className="text-xs font-bold text-orange-400">NÃO</span>
              <span className="text-xs font-bold text-[var(--th-text)]">{cotacao(nao)}</span>
              <span className="text-[10px] text-orange-400">▼</span>
            </div>
            <span className="text-[11px] font-semibold text-[var(--th-mid)]">{nao}%</span>
          </div>
        </div>

        {/* Bar */}
        <div className="mt-3.5">
          <div className={`flex h-1.5 overflow-hidden rounded-full [--sim-w:${event.simPercent}%]`}>
            <div className="bg-emerald-500 transition-all duration-500 w-[var(--sim-w)]" />
            <div className="flex-1 bg-orange-500/60" />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3.5 flex items-center justify-between border-t border-[var(--th-border)] pt-3">
          <span className="flex items-center gap-1 text-[10px] text-[var(--th-low)]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            R$ {event.volume.toLocaleString("pt-BR")} participado
          </span>
          <span className={`flex items-center gap-1 text-[10px] ${tier === "hot" ? "text-red-400 font-bold" : "text-white/50"}`}>
            {tier === "hot" && (
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse shrink-0" />
            )}
            {tier !== "hot" && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            )}
            {tier === "hot" ? "em " : "Encerra em "}{event.deadline}
          </span>
        </div>
      </div>
    </>
  );

  const sharedClass =
    "group block rounded-2xl bg-[var(--th-bg-card)] overflow-hidden ring-1 ring-[var(--th-ring)] transition-all transition-shadow duration-200 hover:ring-[var(--oraklo-color-primary)] hover:shadow-[0_0_28px_rgb(123_47_247/0.2)] text-left w-full";

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
