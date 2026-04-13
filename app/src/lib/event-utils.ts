/** Cotação decimal: quanto o usuário recebe por R$1 participado (já com taxa de 5%) */
export function cotacao(percent: number): string {
  if (percent <= 0) return "—";
  return (0.95 / (percent / 100)).toFixed(2);
}

/** Compact BRL volume formatting */
export function formatVolumeCompact(value: number): string {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return `R$ ${(value / 1_000).toFixed(1)}K`;
  return `R$ ${value.toLocaleString("pt-BR")}`;
}
