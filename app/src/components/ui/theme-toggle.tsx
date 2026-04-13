"use client";

import { useTheme } from "@/lib/theme-provider";
import { IconSun, IconMoon } from "@/components/ui/icons";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] ${className}`}
    >
      {theme === "dark" ? (
        <IconSun className="h-[18px] w-[18px]" />
      ) : (
        <IconMoon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
