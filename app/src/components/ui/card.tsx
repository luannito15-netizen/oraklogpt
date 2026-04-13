import type { HTMLAttributes } from "react";

type CardTone = "default" | "muted" | "elevated";
type CardPadding = "none" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
  padding?: CardPadding;
  /** Adds the purple accent glow line on top (card-glow-accent from globals.css) */
  accentLine?: boolean;
}

const toneStyles: Record<CardTone, string> = {
  default:  "bg-[var(--surface-elevated)]",
  muted:    "bg-[var(--surface)]",
  elevated: "bg-[var(--surface-elevated)] shadow-[var(--oraklo-shadow-elevated)]",
};

const paddingStyles: Record<CardPadding, string> = {
  none: "",
  md:   "p-6",
  lg:   "p-8",
};

export function Card({
  tone = "default",
  padding = "md",
  accentLine = false,
  className,
  children,
  ...props
}: CardProps) {
  const classes = [
    "rounded-[var(--oraklo-radius-lg)] border border-[var(--border)] shadow-[var(--oraklo-shadow-soft)]",
    toneStyles[tone],
    paddingStyles[padding],
    accentLine ? "card-glow-accent" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
