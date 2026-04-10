import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseStyles =
  "inline-flex items-center justify-center rounded-[var(--oraklo-radius-sm)] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oraklo-color-primary)] disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--oraklo-color-primary)] text-white hover:bg-[var(--oraklo-color-primary-hover)]",
  secondary:
    "border border-[color-mix(in_srgb,var(--oraklo-color-text)_16%,white)] bg-white text-[var(--oraklo-color-text)] hover:bg-[color-mix(in_srgb,var(--oraklo-color-bg)_72%,white)]",
  ghost:
    "bg-transparent text-[var(--oraklo-color-text)] hover:bg-[color-mix(in_srgb,var(--oraklo-color-text)_6%,white)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [baseStyles, variantStyles[variant], sizeStyles[size], className]
    .filter(Boolean)
    .join(" ");

  return <button type={type} className={classes} {...props} />;
}
