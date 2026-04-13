'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCountdown } from '@/lib/hooks/use-countdown'
import { getUrgencyTier } from '@/lib/urgency'
import type { EventCardData } from '@/components/ui/event-card'

interface EventHotHeroProps {
  event: EventCardData
  onOpen?: (event: EventCardData) => void
}

/** Retorno decimal: quanto o apostador recebe por R$1 apostado (já com taxa de 5%) */
function cotacao(percent: number): string {
  if (percent <= 0) return '—'
  return (0.95 / (percent / 100)).toFixed(2)
}

function CountdownDisplay({ deadlineAt }: { deadlineAt: string }) {
  const cd = useCountdown(deadlineAt)

  if (cd.expired) {
    return <span className="font-mono text-sm font-bold text-red-400">ENCERRADO</span>
  }

  const hh = String(cd.hours).padStart(2, '0')
  const mm = String(cd.minutes).padStart(2, '0')
  const ss = String(cd.seconds).padStart(2, '0')

  if (cd.days >= 1) {
    return (
      <span className="font-mono text-sm font-bold text-red-400">
        {cd.days}d {hh}:{mm}:{ss}
      </span>
    )
  }

  return (
    <span className="font-mono text-sm font-bold text-red-400">
      {hh}:{mm}:{ss}
    </span>
  )
}

export function EventHotHero({ event, onOpen }: EventHotHeroProps) {
  const nao = 100 - event.simPercent
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tier = getUrgencyTier(event.deadlineDays)

  const cta = onOpen ? (
    <button
      type="button"
      onClick={() => onOpen(event)}
      className="bg-[var(--accent)] hover:opacity-90 text-[var(--accent-fg)] font-bold rounded-xl px-6 py-2.5 text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
    >
      PARTICIPAR &rarr;
    </button>
  ) : (
    <Link
      href={`/events/${event.id}`}
      className="bg-[var(--accent)] hover:opacity-90 text-[var(--accent-fg)] font-bold rounded-xl px-6 py-2.5 text-sm transition-all hover:scale-[1.02] active:scale-[0.98] inline-block"
    >
      PARTICIPAR &rarr;
    </Link>
  )

  return (
    <div className="relative overflow-hidden bg-[var(--surface-elevated)] ring-1 ring-red-500/30 rounded-2xl p-6">
      {/* Background image panel (desktop only) */}
      {event.imageUrl && (
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block overflow-hidden rounded-r-2xl">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="400px"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface-elevated)] to-transparent" />
        </div>
      )}

      {/* Top row: HOT badge + category + countdown */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="bg-red-500/25 text-red-300 ring-1 ring-red-400/60 font-black rounded-full px-2.5 py-0.5 text-[10px] uppercase animate-pulse">
            HOT
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
            {event.category}
          </span>
        </div>
        <CountdownDisplay deadlineAt={event.deadlineAt} />
      </div>

      {/* Title */}
      <p className="text-2xl font-black text-[var(--text)] leading-snug mt-4 max-w-2xl line-clamp-2">
        {event.title}
      </p>

      {/* SIM / NÃO cards */}
      <div className="mt-5 flex gap-3">
        <div className="flex flex-1 flex-col gap-1 rounded-xl bg-emerald-500/15 py-4 px-5 ring-1 ring-emerald-500/25">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-emerald-400">SIM</span>
            <span className="text-sm font-bold text-[var(--text)]">{cotacao(event.simPercent)}</span>
            <span className="text-xs text-emerald-400">▲</span>
          </div>
          <span className="text-xs font-semibold text-emerald-400/70">{event.simPercent}%</span>
        </div>
        <div className="flex flex-1 flex-col gap-1 rounded-xl bg-orange-500/15 py-4 px-5 ring-1 ring-orange-500/25">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-orange-400">NÃO</span>
            <span className="text-sm font-bold text-[var(--text)]">{cotacao(nao)}</span>
            <span className="text-xs text-orange-400">▼</span>
          </div>
          <span className="text-xs font-semibold text-orange-400/70">{nao}%</span>
        </div>
      </div>

      {/* Footer: volume + source + CTA */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
          <span>Volume R$ {event.volume.toLocaleString('pt-BR')}</span>
          {event.source && (
            <>
              <span className="h-3 w-px bg-[var(--border)]" />
              <span>Fonte: {event.source}</span>
            </>
          )}
        </div>
        {cta}
      </div>
    </div>
  )
}
