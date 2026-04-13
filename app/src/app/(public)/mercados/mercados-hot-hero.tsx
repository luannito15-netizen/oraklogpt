'use client'

import Image from 'next/image'
import { useCountdown } from '@/lib/hooks/use-countdown'
import { getHotIntensity, HOT_INTENSITY_COLORS } from '@/lib/urgency'
import type { EventCardData } from '@/components/ui/event-card'

interface MercadosHotHeroProps {
  event: EventCardData
  onOpen?: (event: EventCardData) => void
}

function cotacao(percent: number): string {
  if (percent <= 0) return '—'
  return (0.95 / (percent / 100)).toFixed(2)
}

function formatVolumeCompact(value: number): string {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000)     return `R$ ${(value / 1_000).toFixed(1)}K`
  return `R$ ${value.toLocaleString('pt-BR')}`
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

// ─── LAST CALL layout ────────────────────────────────────────────────────────

function LastCallHero({ event, onOpen }: MercadosHotHeroProps) {
  const cd = useCountdown(event.deadlineAt)
  const nao = 100 - event.simPercent

  return (
    <div className="relative overflow-hidden rounded-2xl border-l-4 border-red-500 bg-[var(--surface-elevated)] ring-1 ring-red-500/50 animate-glow-red">
      {event.imageUrl && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image src={event.imageUrl} alt="" fill sizes="100vw"
            className="object-cover opacity-[0.06] blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-elevated)] via-[var(--surface-elevated)]/85 to-[var(--surface-elevated)]" />
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-6 p-6 sm:p-8">

        {/* Top bar — badge + title */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="rounded-full bg-red-600/30 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-200 ring-1 ring-red-500/70 animate-pulse">
              LAST CALL
            </span>
            <span className="rounded-full bg-[var(--surface)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
              {event.category}
            </span>
            <span className="ml-auto text-[10px] text-[var(--text-muted)]">{event.source}</span>
          </div>
          <p className="text-2xl font-black leading-tight text-[var(--text)] sm:text-3xl line-clamp-2">
            {event.title}
          </p>
        </div>

        {/* Center — enormous countdown */}
        <div className="flex flex-col items-center gap-3 py-2">
          {cd.expired ? (
            <span className="font-mono text-5xl font-black text-red-400 tracking-tight tabular-nums">
              ENCERRADO
            </span>
          ) : (
            <>
              <div className="flex items-end gap-1 sm:gap-2">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-mono text-5xl font-black text-red-300 tabular-nums leading-none tracking-tight sm:text-6xl">
                    {pad(cd.hours)}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-[0.18em] text-red-400/60">HORAS</span>
                </div>
                <span className="mb-5 font-mono text-5xl font-black text-red-500/60 sm:text-6xl leading-none">:</span>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-mono text-5xl font-black text-red-300 tabular-nums leading-none tracking-tight sm:text-6xl">
                    {pad(cd.minutes)}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-[0.18em] text-red-400/60">MIN</span>
                </div>
                <span className="mb-5 font-mono text-5xl font-black text-red-500/60 sm:text-6xl leading-none">:</span>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-mono text-5xl font-black text-red-300 tabular-nums leading-none tracking-tight sm:text-6xl">
                    {pad(cd.seconds)}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-[0.18em] text-red-400/60">SEG</span>
                </div>
              </div>
              <p className="text-xs font-bold text-red-400/70 uppercase tracking-[0.12em]">
                Último momento para registrar
              </p>
            </>
          )}
        </div>

        {/* SIM / NÃO large pill buttons */}
        <div className="flex gap-3">
          <div className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-emerald-500/15 px-4 py-3.5 ring-1 ring-emerald-500/30">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wide">SIM</span>
            <span className="text-2xl font-black text-[var(--text)] leading-none">{cotacao(event.simPercent)}</span>
            <span className="text-[10px] font-bold text-emerald-400/70">{event.simPercent}%</span>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-orange-500/15 px-4 py-3.5 ring-1 ring-orange-500/30">
            <span className="text-xs font-black text-orange-400 uppercase tracking-wide">NÃO</span>
            <span className="text-2xl font-black text-[var(--text)] leading-none">{cotacao(nao)}</span>
            <span className="text-[10px] font-bold text-orange-400/70">{nao}%</span>
          </div>
        </div>

        {/* Progress bar — prominent with shimmer */}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-orange-500/40">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${event.simPercent}%` }}
          />
          <div
            className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ left: `calc(${event.simPercent}% - 3rem)` }}
          />
        </div>

        {/* Footer — volume + CTA */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)]">
            <span>{formatVolumeCompact(event.totalVolume)} participado</span>
            <span className="opacity-40">·</span>
            <span>{event.source}</span>
          </div>
          <button
            type="button"
            onClick={() => onOpen?.(event)}
            className="w-full rounded-xl bg-amber-500 px-6 py-3 text-sm font-black text-black transition-all hover:bg-amber-400 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            Prever agora &rarr;
          </button>
        </div>

      </div>
    </div>
  )
}

// ─── HOT / SUPER HOT layout ──────────────────────────────────────────────────

function HotHero({ event, onOpen, intensity }: MercadosHotHeroProps & { intensity: 'hot' | 'super-hot' }) {
  const cd = useCountdown(event.deadlineAt)
  const nao = 100 - event.simPercent
  const colors = HOT_INTENSITY_COLORS[intensity]

  const isOrange = intensity === 'super-hot'
  const glowClass = isOrange ? 'animate-glow-orange' : ''

  return (
    <div className={`relative overflow-hidden rounded-2xl border-l-4 bg-[var(--surface-elevated)] ring-1 transition-all duration-300 ${colors.border} ${colors.ring} ${glowClass}`}>
      {event.imageUrl && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image src={event.imageUrl} alt="" fill sizes="100vw"
            className="object-cover opacity-[0.07] blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface-elevated)] via-[var(--surface-elevated)]/80 to-[var(--surface-elevated)]/60" />
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-0">

        {/* LEFT — badges + title + live indicator */}
        <div className="flex flex-col justify-center gap-2.5 sm:flex-1 sm:pr-8">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest ring-1 animate-pulse ${colors.badge}`}>
              {intensity === 'super-hot' ? 'SUPER HOT' : 'HOT'}
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
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isOrange ? 'bg-orange-400' : 'bg-red-400'}`} />
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${isOrange ? 'bg-orange-500' : 'bg-red-500'}`} />
            </span>
            <span className={`text-xs font-bold ${colors.text}`}>
              {intensity === 'super-hot' ? 'Encerra em horas' : 'Encerra hoje'}
            </span>
          </div>
        </div>

        {/* CENTER — countdown */}
        <div className={`flex items-center justify-center sm:px-8 sm:border-x ${isOrange ? 'sm:border-orange-500/20' : 'sm:border-red-500/20'}`}>
          {cd.expired ? (
            <span className={`font-mono text-2xl font-black tabular-nums tracking-tight ${colors.text}`}>
              ENCERRADO
            </span>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-end gap-0.5">
                <div className="flex flex-col items-center gap-1">
                  <span className={`font-mono text-4xl font-black tabular-nums leading-none tracking-tight ${colors.text}`}>
                    {pad(cd.hours)}
                  </span>
                  <span className={`text-[9px] font-black uppercase tracking-[0.14em] opacity-60 ${colors.text}`}>H</span>
                </div>
                <span className={`mb-4 font-mono text-4xl font-black opacity-50 ${colors.text}`}>:</span>
                <div className="flex flex-col items-center gap-1">
                  <span className={`font-mono text-4xl font-black tabular-nums leading-none tracking-tight ${colors.text}`}>
                    {pad(cd.minutes)}
                  </span>
                  <span className={`text-[9px] font-black uppercase tracking-[0.14em] opacity-60 ${colors.text}`}>M</span>
                </div>
                <span className={`mb-4 font-mono text-4xl font-black opacity-50 ${colors.text}`}>:</span>
                <div className="flex flex-col items-center gap-1">
                  <span className={`font-mono text-4xl font-black tabular-nums leading-none tracking-tight ${colors.text}`}>
                    {pad(cd.seconds)}
                  </span>
                  <span className={`text-[9px] font-black uppercase tracking-[0.14em] opacity-60 ${colors.text}`}>S</span>
                </div>
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-[0.1em] opacity-50 ${colors.text}`}>
                restante
              </span>
            </div>
          )}
        </div>

        {/* RIGHT — SIM/NÃO + volume + CTA */}
        <div className="flex flex-col gap-3 sm:flex-1 sm:items-end sm:pl-8">
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

          <p className="text-[10px] font-semibold text-[var(--text-muted)] sm:text-right">
            {formatVolumeCompact(event.totalVolume)} participado
          </p>

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

// ─── Public export ────────────────────────────────────────────────────────────

export function MercadosHotHero({ event, onOpen }: MercadosHotHeroProps) {
  const intensity = getHotIntensity(event.deadlineAt)

  if (intensity === 'last-call') {
    return <LastCallHero event={event} onOpen={onOpen} />
  }

  if (intensity === 'super-hot' || intensity === 'hot') {
    return <HotHero event={event} onOpen={onOpen} intensity={intensity} />
  }

  // Fallback: use the HOT layout with base 'hot' intensity when deadlineAt
  // is > 24h but deadlineDays = 0 (edge case with stale mocks)
  return <HotHero event={event} onOpen={onOpen} intensity="hot" />
}
