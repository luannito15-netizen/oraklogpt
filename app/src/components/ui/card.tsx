import type { HTMLAttributes } from "react";

type CardTone = "default" | "muted";
type CardPadding = "none" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
  padding?: CardPadding;
}

const toneStyles: Record<CardTone, string> = {
  default: "bg-white",
  muted: "bg-[color-mix(in_srgb,var(--oraklo-color-bg)_84%,white)]",
};

const paddingStyles: Record<CardPadding, string> = {
  none: "",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  tone = "default",
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  const classes = [
    "rounded-[var(--oraklo-radius-lg)] border border-[color-mix(in_srgb,var(--oraklo-color-text)_12%,white)] shadow-[var(--oraklo-shadow-soft)]",
    toneStyles[tone],
    paddingStyles[padding],
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
