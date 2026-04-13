import type { HTMLAttributes } from "react";

/**
 * Vocabulary aligns to real ORAKLO signals:
 * - Result sides: sim | nao
 * - Urgency:      hot | super-hot | last-call | breve
 * - Event status: open | closed | resolved | canceled
 * - Generic:      accent | muted
 */
export type BadgeTone =
  | "sim"
  | "nao"
  | "hot"
  | "super-hot"
  | "last-call"
  | "breve"
  | "open"
  | "closed"
  | "resolved"
  | "canceled"
  | "accent"
  | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Adds animate-pulse — for live urgency badges (hot / last-call) */
  pulse?: boolean;
}

const toneStyles: Record<BadgeTone, string> = {
  sim:
    "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
  nao:
    "bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30",
  hot:
    "bg-red-500/15 text-red-400 ring-1 ring-red-500/40",
  "super-hot":
    "bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/40",
  "last-call":
    "bg-red-600/20 text-red-300 ring-1 ring-red-500/60",
  breve:
    "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30",
  open:
    "bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)] ring-1 ring-[color-mix(in_srgb,var(--accent)_30%,transparent)]",
  closed:
    "bg-[var(--surface)] text-[var(--text-muted)] ring-1 ring-[var(--border)]",
  resolved:
    "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
  canceled:
    "bg-[var(--surface)] text-[var(--text-muted)] ring-1 ring-[var(--border)] opacity-60",
  accent:
    "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)] ring-1 ring-[color-mix(in_srgb,var(--accent)_25%,transparent)]",
  muted:
    "bg-[var(--surface)] text-[var(--text-muted)] ring-1 ring-[var(--border)]",
};

export function Badge({
  tone = "muted",
  pulse = false,
  className,
  ...props
}: BadgeProps) {
  const classes = [
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em]",
    toneStyles[tone],
    pulse ? "animate-pulse" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes} {...props} />;
}
