"use client";

import { useTheme } from "@/lib/theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[var(--th-overlay-8)] text-[var(--th-mid)] hover:text-[var(--th-hi)] ${className}`}
    >
      {theme === "dark" ? (
        /* Sun */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M12.95 3.05l-1.06 1.06M4.11 11.89l-1.06 1.06"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ) : (
        /* Moon */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M13.5 9.5A6 6 0 016.5 2.5a6 6 0 000 11A6 6 0 0013.5 9.5z"
            stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
