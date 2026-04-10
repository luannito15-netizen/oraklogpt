import Link from "next/link";

export type EventStatus = "open" | "closed" | "resolved" | "canceled";

export interface EventCardData {
  id: string;
  title: string;
  category: string;
  status: EventStatus;
  simPercent: number; // % do volume no lado SIM (0–100)
  volume: number;
  deadline: string;
  source: string;
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
}

export function EventCardCompact({ event }: EventCardCompactProps) {
  const nao = 100 - event.simPercent;
  const catStyle = getCategoryStyle(event.category);

  return (
    <Link
      href={`/events/${event.id}`}
      className="group block rounded-2xl bg-[var(--th-bg-card)] p-4 ring-1 ring-[var(--th-ring)] transition-all hover:ring-[var(--oraklo-color-primary)] hover:shadow-[0_0_24px_rgb(123_47_247/0.25)]"
    >
      {/* Category + source */}
      <div className="flex items-center justify-between gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${catStyle.bg} ${catStyle.text}`}>
          {event.category}
        </span>
        <span className="truncate text-right text-[10px] text-[var(--th-low)]">{event.source}</span>
      </div>

      {/* Question */}
      <p className="mt-3 text-sm font-semibold leading-snug text-[var(--th-text)]">
        {event.title}
      </p>

      {/* SIM / NÃO buttons */}
      <div className="mt-4 flex gap-2">
        <div className="flex flex-1 items-center justify-between gap-1 rounded-xl bg-emerald-500/15 px-3 py-2 ring-1 ring-emerald-500/25">
          <span className="text-xs font-bold text-emerald-400">SIM</span>
          <span className="text-xs font-bold text-[var(--th-text)]">{cotacao(event.simPercent)}</span>
          <span className="text-[10px] text-emerald-400">▲</span>
        </div>
        <div className="flex flex-1 items-center justify-between gap-1 rounded-xl bg-orange-500/15 px-3 py-2 ring-1 ring-orange-500/25">
          <span className="text-xs font-bold text-orange-400">NÃO</span>
          <span className="text-xs font-bold text-[var(--th-text)]">{cotacao(nao)}</span>
          <span className="text-[10px] text-orange-400">▼</span>
        </div>
      </div>

      {/* Distribution bar */}
      <div className="mt-3">
        <div className="flex h-1.5 overflow-hidden rounded-full">
          <div className="bg-emerald-500" style={{ width: `${event.simPercent}%` }} />
          <div className="flex-1 bg-orange-500/70" />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-[var(--th-low)]">
          <span>{event.simPercent}%</span>
          <span>{nao}%</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Variante padrão (plataforma) ────────────────────────────────────────────

interface EventCardProps {
  event: EventCardData;
}

export function EventCard({ event }: EventCardProps) {
  const nao = 100 - event.simPercent;
  const catStyle = getCategoryStyle(event.category);

  return (
    <Link
      href={`/events/${event.id}`}
      className="group block rounded-2xl bg-[var(--th-bg-card)] p-5 ring-1 ring-[var(--th-ring)] transition-all hover:ring-[var(--oraklo-color-primary)] hover:shadow-[0_0_28px_rgb(123_47_247/0.2)]"
    >
      {/* Category + source */}
      <div className="flex items-start justify-between gap-3">
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${catStyle.bg} ${catStyle.text}`}>
          {event.category}
        </span>
        <span className="truncate text-right text-[10px] text-[var(--th-low)]">{event.source}</span>
      </div>

      {/* Question */}
      <p className="mt-3 text-sm font-semibold leading-snug text-[var(--th-text)] group-hover:text-[var(--oraklo-color-primary-glow)] transition-colors">
        {event.title}
      </p>

      {/* SIM / NÃO */}
      <div className="mt-4 flex gap-2">
        <div className="flex flex-1 flex-col items-start gap-1 rounded-xl bg-emerald-500/15 px-3 py-2.5 ring-1 ring-emerald-500/25">
          <div className="flex w-full items-center justify-between">
            <span className="text-xs font-bold text-emerald-400">SIM</span>
            <span className="text-xs font-bold text-[var(--th-text)]">{cotacao(event.simPercent)}</span>
            <span className="text-[10px] text-emerald-400">▲</span>
          </div>
          <span className="text-[11px] font-semibold text-[var(--th-mid)]">{event.simPercent}%</span>
        </div>
        <div className="flex flex-1 flex-col items-start gap-1 rounded-xl bg-orange-500/15 px-3 py-2.5 ring-1 ring-orange-500/25">
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
        <div className="flex h-1.5 overflow-hidden rounded-full">
          <div className="bg-emerald-500 transition-all" style={{ width: `${event.simPercent}%` }} />
          <div className="flex-1 bg-orange-500/60" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3.5 flex items-center justify-between border-t border-[var(--th-border)] pt-3">
        <span className="text-[10px] text-[var(--th-low)]">
          R$ {event.volume.toLocaleString("pt-BR")} participado
        </span>
        <span className="text-[10px] text-[var(--th-low)]">
          Encerra em {event.deadline}
        </span>
      </div>
    </Link>
  );
}
