/**
 * ORAKLO Icon System
 * ──────────────────
 * Rules:
 *  • viewBox 0 0 20 20 (20×20 grid)
 *  • strokeWidth 1.5 throughout
 *  • stroke="currentColor" — never fixed hex colors
 *  • fill="none" for outline icons; partial fill for dimensional accents
 *  • aria-hidden="true" by default (decorative); override where meaningful
 *  • Default render size: h-5 w-5 (20px) — override via className
 */

interface IconProps {
  className?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

const base = "shrink-0"

// ─── Navigation ──────────────────────────────────────────────────────────────

/** Dashboard — 4 rounded squares, depth via opacity */
export function IconDashboard({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="7" height="7" rx="1.5" fill="currentColor" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" fill="currentColor" opacity=".45" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity=".45" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity=".2" />
    </svg>
  )
}

/** Markets / Clock */
export function IconClock({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
      <path d="M10 6v4.5l2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Positions / Trending Up */
export function IconTrendingUp({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2 14L7 9l3.5 3L17 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 5h4v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity=".5"
      />
    </svg>
  )
}

/** Ranking / Star */
export function IconStar({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M10 2l2.1 4.3 4.7.68-3.4 3.32.8 4.68L10 12.35l-4.2 2.63.8-4.68L3.2 6.98l4.7-.68L10 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity=".15"
      />
    </svg>
  )
}

/** Admin / Clipboard */
export function IconAdmin({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <rect x="4" y="5" width="12" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 5V4a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 10h6M7 13.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Help / Question circle */
export function IconHelp({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 7.5a2.5 2.5 0 014.5 1.5c0 1.5-2 2-2 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="14" r=".75" fill="currentColor" />
    </svg>
  )
}

// ─── UI Controls ─────────────────────────────────────────────────────────────

/** Chevron Right — breadcrumb separator */
export function IconChevronRight({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-4 w-4"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Chevron Down — dropdowns, user menu */
export function IconChevronDown({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-4 w-4"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Search / Magnifying glass */
export function IconSearch({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Bell / Notifications */
export function IconBell({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M10 2a6 6 0 00-6 6v3.5l-1.5 2h15L16 11.5V8a6 6 0 00-6-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/** Plus — add / new action */
export function IconPlus({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** X — close / dismiss */
export function IconX({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Info — information circle */
export function IconInfo({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9.5v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r=".75" fill="currentColor" />
    </svg>
  )
}

/** Check — success / checklist */
export function IconCheck({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M4 10l4.5 4.5L16 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Domain ──────────────────────────────────────────────────────────────────

/** Coins / Volume — market participation amount */
export function IconCoins({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-4 w-4"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6.5v7M7 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Flame — HOT urgency indicator */
export function IconFlame({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
    </svg>
  )
}

// ─── Categories ──────────────────────────────────────────────────────────────

/** Esportes — trophy cup */
export function IconEsportes({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6 2h8v6a4 4 0 01-8 0V2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M2 3h4M14 3h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 12v3M7 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="8" r="1.5" fill="currentColor" fillOpacity=".35" />
    </svg>
  )
}

/** Política — government building with columns */
export function IconPolitica({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path d="M2 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="3" y="13" width="14" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 13V9M8 13V9M12 13V9M15 13V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M2 9h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 3l8 6H2l8-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity=".12"
      />
    </svg>
  )
}

/** Economia — bar chart with upward trend */
export function IconEconomia({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path d="M2 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="3" y="10" width="3" height="6" rx="0.75" fill="currentColor" fillOpacity=".25" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8.5" y="7" width="3" height="9" rx="0.75" fill="currentColor" fillOpacity=".4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="4" width="3" height="12" rx="0.75" fill="currentColor" fillOpacity=".6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 9l4-3.5 5.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".55" />
    </svg>
  )
}

/** Clima — cloud with sun */
export function IconClima({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="7.5" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 7a3 3 0 000 6h8a2.5 2.5 0 10-.5-4.97A3 3 0 005 7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14.5 4.5v1M17.5 7.5h-1M16.5 5.5l-.7.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".55" />
    </svg>
  )
}

// ─── Category dispatcher ──────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  "Esportes": IconEsportes,
  "Política": IconPolitica,
  "Economia": IconEconomia,
  "Clima":    IconClima,
};

export function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const Icon = CATEGORY_ICONS[category];
  if (!Icon) return null;
  return <Icon className={className} />;
}

// ─── Theme ───────────────────────────────────────────────────────────────────

/** Sun — light mode */
export function IconSun({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 2v1.5M10 16.5V18M2 10h1.5M16.5 10H18M4.1 4.1l1.05 1.05M14.85 14.85l1.05 1.05M15.9 4.1l-1.05 1.05M5.15 14.85l-1.05 1.05"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Moon — dark mode */
export function IconMoon({ className, ...props }: IconProps) {
  return (
    <svg
      className={`${base} ${className ?? "h-5 w-5"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M17 11.5A7.5 7.5 0 018.5 3a7.5 7.5 0 100 14A7.5 7.5 0 0017 11.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
