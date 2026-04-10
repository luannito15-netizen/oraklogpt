import type { HTMLAttributes } from "react";

type BadgeTone = "neutral" | "primary" | "info";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneStyles: Record<BadgeTone, string> = {
  neutral:
    "bg-[color-mix(in_srgb,var(--oraklo-color-text)_8%,white)] text-[var(--oraklo-color-text)]",
  primary:
    "bg-[color-mix(in_srgb,var(--oraklo-color-primary)_14%,white)] text-[var(--oraklo-color-primary-hover)]",
  info:
    "bg-[color-mix(in_srgb,var(--oraklo-color-bg)_65%,white)] text-[color-mix(in_srgb,var(--oraklo-color-text)_72%,white)]",
};

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  const classes = [
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em]",
    toneStyles[tone],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes} {...props} />;
}
