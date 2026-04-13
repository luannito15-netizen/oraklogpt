'use client'

import Image from 'next/image'
import { useCountdown } from '@/lib/hooks/use-countdown'
import type { EventCardData } from '@/components/ui/event-card'

interface MercadosHotHeroProps {
  event: EventCardData
  onOpen?: (event: EventCardData) => void
}

/** Retorno decimal: quanto o usuário recebe por R$1 participado (já com taxa de 5%) */
function cotacao(percent: number): string {
  if (percent <= 0) return '—'
  return (0.95 / (percent / 100)).toFixed(2)
}

function formatVolumeCompact(value: number): string {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000)     return `R$ ${(value / 1_000).toFixed(1)}K`
  return `R$ ${value.toLocaleString('pt-BR')}`
}

function LiveCountdown({ deadlineAt }: { deadlineAt: string }) {
  const cd = useCountdown(deadlineAt)

  if (cd.expired) {
    return (
      <div className="flex flex-col items-center">
        <span className="font-mono text-3xl font-black text-red-400 tabular-nums tracking-tight">
          ENCERRADO
        </span>
      </div>
    )
  }

  const hh = String(cd.hours).padStart(2, '0')
  const mm = String(cd.minutes).padStart(2, '0')
  const ss = String(cd.seconds).padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-mono text-3xl font-black text-red-400 tabular-nums tracking-tight leading-none">
        {hh}:{mm}:{ss}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-red-400/60">
        restante
      </span>
    </div>
  )
}

export function MercadosHotHero({ event, onOpen }: MercadosHotHeroProps) {
  const nao = 100 - event.simPercent

  return (
    <div className="relative overflow-hidden rounded-2xl border-l-4 border-red-500 bg-[var(--surface-elevated)] ring-1 ring-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.12)]">
      {/* Blurred background image overlay */}
      {event.imageUrl && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={event.imageUrl}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.07] blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface-elevated)] via-[var(--surface-elevated)]/80 to-[var(--surface-elevated)]/60" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-0">

        {/* LEFT — category + title + subtitle */}
        <div className="flex flex-col justify-center gap-2 sm:flex-1 sm:pr-8">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-red-300 ring-1 ring-red-400/50">
              HOT
            </span>
            <span className="rounded-full bg-[var(--surface)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
              {event.category}
            </span>
          </div>
          <p className="text-xl font-black leading-snug text-[var(--text)] line-clamp-2 lg:text-2xl">
            {event.title}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            <span className="text-xs font-bold text-red-400">Encerra hoje</span>
          </div>
        </div>

        {/* CENTER — countdown */}
        <div className="flex items-center justify-center sm:px-8 sm:border-x sm:border-red-500/20">
          <LiveCountdown deadlineAt={event.deadlineAt} />
        </div>

        {/* RIGHT — SIM/NÃO + volume + CTA */}
        <div className="flex flex-col gap-3 sm:flex-1 sm:items-end sm:pl-8">
          {/* SIM / NÃO large display */}
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="flex flex-1 flex-col items-center gap-0.5 rounded-xl bg-emerald-500/15 px-4 py-2.5 ring-1 ring-emerald-500/25 sm:flex-initial sm:min-w-[80px]">
              <span className="text-xs font-bold text-emerald-400">SIM</span>
              <span className="text-lg font-black text-[var(--text)] leading-none">{cotacao(event.simPercent)}</span>
              <span className="text-[10px] font-semibold text-emerald-400/70">{event.simPercent}%</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-0.5 rounded-xl bg-orange-500/15 px-4 py-2.5 ring-1 ring-orange-500/25 sm:flex-initial sm:min-w-[80px]">
              <span className="text-xs font-bold text-orange-400">NÃO</span>
              <span className="text-lg font-black text-[var(--text)] leading-none">{cotacao(nao)}</span>
              <span className="text-[10px] font-semibold text-orange-400/70">{nao}%</span>
            </div>
          </div>

          {/* Volume */}
          <p className="text-[10px] font-semibold text-[var(--text-muted)] sm:text-right">
            {formatVolumeCompact(event.totalVolume)} participado
          </p>

          {/* CTA */}
          <button
            type="button"
            onClick={() => onOpen?.(event)}
            className="w-full rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-black text-black transition-all hover:bg-amber-400 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            Prever agora &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
