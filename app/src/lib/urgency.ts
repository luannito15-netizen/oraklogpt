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
  hot:   { badge: 'bg-red-500/20 text-red-400 ring-red-500/30',        dot: 'bg-red-500' },
  short: { badge: 'bg-amber-500/20 text-amber-400 ring-amber-500/30',  dot: 'bg-amber-500' },
  mid:   { badge: 'bg-sky-500/20 text-sky-400 ring-sky-500/30',        dot: 'bg-sky-400' },
  long:  { badge: 'bg-white/10 text-white/40 ring-white/10',           dot: 'bg-white/30' },
}
