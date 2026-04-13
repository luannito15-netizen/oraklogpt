export type UrgencyTier = 'hot' | 'short' | 'mid' | 'long'

export function getUrgencyTier(deadlineDays: number): UrgencyTier {
  if (deadlineDays <= 1) return 'hot'
  if (deadlineDays <= 3) return 'short'
  if (deadlineDays <= 14) return 'mid'
  return 'long'
}

export const URGENCY_LABELS: Record<UrgencyTier, string> = {
  hot:   'HOT',
  short: 'Encerra em breve',
  mid:   'Esta semana',
  long:  'Próximas semanas',
}

export const URGENCY_COLORS: Record<UrgencyTier, { badge: string; dot: string }> = {
  hot:   { badge: 'bg-red-500/25 text-red-300 ring-red-400/60 font-black',  dot: 'bg-red-500' },
  short: { badge: 'bg-amber-500/20 text-amber-400 ring-amber-500/30 font-semibold', dot: 'bg-amber-500' },
  mid:   { badge: 'bg-sky-500/20 text-sky-400 ring-sky-500/30',              dot: 'bg-sky-400' },
  long:  { badge: 'bg-white/10 text-white/40 ring-white/10',                 dot: 'bg-white/30' },
}

// ─── HOT intensity sub-tiers ──────────────────────────────────────────────────

export type HotIntensity = 'last-call' | 'super-hot' | 'hot'

/**
 * Returns the intensity sub-tier for a HOT event based on exact time remaining.
 * Returns null if the event has more than 24h remaining or is already expired.
 */
export function getHotIntensity(deadlineAt: string): HotIntensity | null {
  const diffMs = new Date(deadlineAt).getTime() - Date.now()
  if (diffMs <= 0) return null
  const diffH = diffMs / (1000 * 60 * 60)
  if (diffH <= 1)  return 'last-call'
  if (diffH <= 6)  return 'super-hot'
  if (diffH <= 24) return 'hot'
  return null
}

export const HOT_INTENSITY_COLORS: Record<HotIntensity, {
  badge:  string
  ring:   string
  glow:   string
  border: string
  text:   string
}> = {
  'last-call': {
    badge:  'bg-red-600/30 text-red-200 ring-red-500/70',
    ring:   'ring-red-500/60 hover:ring-red-400',
    glow:   'hover:shadow-[0_0_40px_rgba(239,68,68,0.35)]',
    border: 'border-red-500',
    text:   'text-red-300',
  },
  'super-hot': {
    badge:  'bg-orange-500/25 text-orange-200 ring-orange-400/60',
    ring:   'ring-orange-500/40 hover:ring-orange-400/70',
    glow:   'hover:shadow-[0_0_32px_rgba(249,115,22,0.28)]',
    border: 'border-orange-500',
    text:   'text-orange-300',
  },
  'hot': {
    badge:  'bg-red-500/20 text-red-300 ring-red-400/50',
    ring:   'ring-red-500/30 hover:ring-red-400/60',
    glow:   'hover:shadow-[0_0_28px_rgba(239,68,68,0.20)]',
    border: 'border-red-500/60',
    text:   'text-red-400',
  },
}
