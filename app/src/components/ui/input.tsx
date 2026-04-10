import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export function Input({ label, hint, id, className, ...props }: InputProps) {
  const classes = [
    "h-11 w-full rounded-[var(--oraklo-radius-sm)] border border-[color-mix(in_srgb,var(--oraklo-color-text)_16%,white)] bg-white px-3 text-sm text-[var(--oraklo-color-text)] outline-none transition-colors placeholder:text-[color-mix(in_srgb,var(--oraklo-color-text)_55%,white)] focus:border-[var(--oraklo-color-primary)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-1.5">
      {label ? (
        id ? (
          <label htmlFor={id} className="text-sm font-medium text-[var(--oraklo-color-text)]">
            {label}
          </label>
        ) : (
          <span className="text-sm font-medium text-[var(--oraklo-color-text)]">{label}</span>
        )
      ) : null}

      <input id={id} className={classes} {...props} />

      {hint ? <p className="text-xs text-[color-mix(in_srgb,var(--oraklo-color-text)_60%,white)]">{hint}</p> : null}
    </div>
  );
}
