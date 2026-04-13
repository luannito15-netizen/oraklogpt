'use client'

import Image from 'next/image'
import { useCountdown } from '@/lib/hooks/use-countdown'
import { getHotIntensity } from '@/lib/urgency'
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

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
    </svg>
  )
}

function HeroCountdown({
  deadlineAt,
  textColor,
  lastCall = false,
}: {
  deadlineAt: string
  textColor: string
  lastCall?: boolean
}) {
  const cd = useCountdown(deadlineAt)

  if (cd.expired) {
    return (
      <span className={`font-mono text-2xl font-black tracking-tight tabular-nums ${textColor}`}>
        ENCERRADO
      </span>
    )
  }

  const segments = lastCall
    ? [
        { val: pad(cd.minutes), label: 'MIN' },
        { sep: true as const },
        { val: pad(cd.seconds), label: 'SEG' },
      ]
    : [
        { val: pad(cd.hours),   label: 'H' },
        { sep: true as const },
        { val: pad(cd.minutes), label: 'M' },
        { sep: true as const },
        { val: pad(cd.seconds), label: 'S' },
      ]

  const numSize  = lastCall ? 'text-6xl sm:text-7xl' : 'text-5xl sm:text-6xl'
  const sepShift = lastCall ? 'mb-8 text-6xl sm:text-7xl' : 'mb-6 text-5xl sm:text-6xl'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-end gap-1">
        {segments.map((item, i) =>
          'sep' in item ? (
            <span key={i} className={`font-mono font-black leading-none opacity-30 ${textColor} ${sepShift}`}>
              :
            </span>
          ) : (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className={`font-mono font-black tabular-nums leading-none tracking-tight ${textColor} ${numSize}`}>
                {item.val}
              </span>
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] opacity-50 ${textColor}`}>
                {item.label}
              </span>
            </div>
          )
        )}
      </div>
      {!lastCall && (
        <span className={`mt-1 text-[10px] font-bold uppercase tracking-[0.14em] opacity-40 ${textColor}`}>
          restante
        </span>
      )}
    </div>
  )
}

// ─── LAST CALL — visual emergency state ──────────────────────────────────────

function LastCallHero({ event, onOpen }: MercadosHotHeroProps) {
  const nao = 100 - event.simPercent

  return (
    <div className="hot-hero-last-call relative overflow-hidden rounded-3xl ring-2 ring-red-500/55 shadow-[0_0_64px_rgba(239,68,68,0.22)]">
      {event.imageUrl && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image src={event.imageUrl} alt="" fill sizes="100vw"
            className="object-cover opacity-[0.07] blur-sm" />
        </div>
      )}
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 z-[1] h-96 w-96 rounded-full bg-red-600/22 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 z-[1] h-48 w-48 rounded-full bg-red-900/30 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 p-6 sm:p-10">

        {/* Top: LAST CALL badge + category + AO VIVO indicator */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="flex items-center gap-1.5 rounded-full bg-red-600/30 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-200 ring-1 ring-red-500/70 animate-pulse">
            <FlameIcon className="h-3 w-3" />
            LAST CALL
          </span>
          <span className="rounded-full bg-[var(--surface)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
            {event.category}
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            <span className="text-[10px] font-bold text-red-400">AO VIVO</span>
          </div>
        </div>

        {/* Event question */}
        <p className="text-xl font-black leading-tight text-[var(--text)] line-clamp-2 sm:text-2xl">
          {event.title}
        </p>

        {/* Countdown — the hero's focal point */}
        <div className="flex flex-col items-center gap-3 py-4 sm:py-8">
          <p className="mb-2 text-[9px] font-black uppercase tracking-[0.24em] text-red-400/60">
            ÚLTIMO MOMENTO PARA REGISTRAR
          </p>
          <HeroCountdown deadlineAt={event.deadlineAt} textColor="text-red-300" lastCall />
        </div>

        {/* SIM / NÃO + CTA */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-1 gap-3">
            <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-[var(--surface)] px-4 py-4 ring-1 ring-[var(--border)]/50">
              <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)]">SIM</span>
              <span className="text-2xl font-black leading-none text-[var(--text)]">{cotacao(event.simPercent)}</span>
              <span className="text-[10px] text-[var(--text-muted)]">{event.simPercent}%</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-[var(--surface)] px-4 py-4 ring-1 ring-[var(--border)]/50">
              <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)]">NÃO</span>
              <span className="text-2xl font-black leading-none text-[var(--text)]">{cotacao(nao)}</span>
              <span className="text-[10px] text-[var(--text-muted)]">{nao}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
            <span className="text-[10px] text-[var(--text-muted)]">
              {formatVolumeCompact(event.totalVolume)} participado
            </span>
            <button
              type="button"
              onClick={() => onOpen?.(event)}
              className="rounded-xl bg-red-500 px-8 py-3.5 text-sm font-black text-white shadow-[0_0_32px_rgba(239,68,68,0.50)] transition-all hover:bg-red-400 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              Prever agora →
            </button>
          </div>
        </div>

        {/* SIM distribution bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface)]">
          <div
            className="h-full rounded-full bg-red-500/60 transition-all duration-500"
            style={{ width: `${event.simPercent}%` }}
          />
        </div>

      </div>
    </div>
  )
}

// ─── SUPER HOT / HOT — high urgency hero ─────────────────────────────────────

interface HotHeroProps extends MercadosHotHeroProps {
  intensity: 'hot' | 'super-hot'
}

function HotHero({ event, onOpen, intensity }: HotHeroProps) {
  const nao = 100 - event.simPercent
  const isOrange = intensity === 'super-hot'

  // Urgency palette (not reusing HOT_INTENSITY_COLORS — hero needs stronger presence)
  const palette = isOrange
    ? {
        badgeBg:    'bg-orange-500/25 text-orange-200 ring-orange-400/60',
        glow:       'bg-orange-500/18',
        ring:       'ring-2 ring-orange-500/55',
        shadow:     'shadow-[0_0_56px_rgba(249,115,22,0.18)]',
        text:       'text-orange-300',
        sep:        'border-orange-500/15',
        countdownBg:'bg-orange-500/10 ring-orange-500/20',
        ctaBg:      'bg-orange-500 shadow-[0_0_28px_rgba(249,115,22,0.50)] hover:bg-orange-400',
        bar:        'bg-orange-500/60',
        liveDot:    'bg-orange-400',
        liveDotSolid: 'bg-orange-500',
        liveLabel:  'text-orange-300',
        liveText:   'Encerra em horas',
      }
    : {
        badgeBg:    'bg-red-500/22 text-red-300 ring-red-400/55',
        glow:       'bg-red-500/15',
        ring:       'ring-2 ring-red-500/55',
        shadow:     'shadow-[0_0_56px_rgba(239,68,68,0.16)]',
        text:       'text-red-400',
        sep:        'border-red-500/12',
        countdownBg:'bg-red-500/10 ring-red-500/20',
        ctaBg:      'bg-red-500 shadow-[0_0_28px_rgba(239,68,68,0.50)] hover:bg-red-400',
        bar:        'bg-red-500/60',
        liveDot:    'bg-red-400',
        liveDotSolid: 'bg-red-500',
        liveLabel:  'text-red-400',
        liveText:   'Encerra hoje',
      }

  return (
    <div className={`${isOrange ? 'hot-hero-super-hot' : 'hot-hero-hot'} relative overflow-hidden rounded-3xl ${palette.ring} ${palette.shadow}`}>
      {event.imageUrl && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image src={event.imageUrl} alt="" fill sizes="100vw"
            className="object-cover opacity-[0.06] blur-sm" />
        </div>
      )}
      {/* Ambient glow blobs */}
      <div className={`pointer-events-none absolute -right-24 -top-24 z-[1] h-96 w-96 rounded-full blur-3xl ${palette.glow}`} />

      <div className="relative z-10 p-6 sm:p-10">

        {/* Top bar: flame badge + category + source + live */}
        <div className="mb-7 flex flex-wrap items-center gap-2.5">
          <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ring-1 animate-pulse ${palette.badgeBg}`}>
            <FlameIcon className="h-3 w-3" />
            {isOrange ? 'SUPER HOT' : 'HOT'}
          </span>
          <span className="rounded-full bg-[var(--surface)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
            {event.category}
          </span>
          <span className="hidden text-[10px] text-[var(--text-muted)] sm:block">{event.source}</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${palette.liveDot}`} />
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${palette.liveDotSolid}`} />
            </span>
            <span className={`text-[10px] font-bold ${palette.liveLabel}`}>{palette.liveText}</span>
          </div>
        </div>

        {/* Body: title (left) + countdown (right) */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
          <p className="flex-1 text-2xl font-black leading-tight text-[var(--text)] line-clamp-3 sm:text-3xl">
            {event.title}
          </p>
          <div className={`flex shrink-0 items-center justify-center rounded-2xl px-10 py-6 ring-1 ${palette.countdownBg}`}>
            <HeroCountdown deadlineAt={event.deadlineAt} textColor={palette.text} />
          </div>
        </div>

        {/* Separator */}
        <div className={`my-7 border-t ${palette.sep}`} />

        {/* Bottom: SIM | NÃO | volume | CTA */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 gap-3">
            <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-[var(--surface)] px-5 py-4 ring-1 ring-[var(--border)]/50 sm:flex-initial sm:min-w-[120px]">
              <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)]">SIM</span>
              <span className="text-2xl font-black leading-none text-[var(--text)]">{cotacao(event.simPercent)}</span>
              <span className="text-[10px] text-[var(--text-muted)]">{event.simPercent}%</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-[var(--surface)] px-5 py-4 ring-1 ring-[var(--border)]/50 sm:flex-initial sm:min-w-[120px]">
              <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)]">NÃO</span>
              <span className="text-2xl font-black leading-none text-[var(--text)]">{cotacao(nao)}</span>
              <span className="text-[10px] text-[var(--text-muted)]">{nao}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span className="text-[10px] text-[var(--text-muted)]">
              {formatVolumeCompact(event.totalVolume)} participado
            </span>
            <button
              type="button"
              onClick={() => onOpen?.(event)}
              className={`rounded-xl px-8 py-3.5 text-sm font-black text-white transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap ${palette.ctaBg}`}
            >
              Prever agora →
            </button>
          </div>
        </div>

        {/* Distribution bar */}
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface)]">
          <div
            className={`h-full rounded-full transition-all duration-500 ${palette.bar}`}
            style={{ width: `${event.simPercent}%` }}
          />
        </div>

      </div>
    </div>
  )
}

// ─── Public export ────────────────────────────────────────────────────────────

export function MercadosHotHero({ event, onOpen }: MercadosHotHeroProps) {
  const intensity = getHotIntensity(event.deadlineAt)

  if (intensity === 'last-call') return <LastCallHero event={event} onOpen={onOpen} />
  if (intensity === 'super-hot') return <HotHero event={event} onOpen={onOpen} intensity="super-hot" />
  return <HotHero event={event} onOpen={onOpen} intensity="hot" />
}

// ─── Inline SVG for section headers (avoids importing the full component) ─────

export function HotSectionFlame({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
    </svg>
  )
}
