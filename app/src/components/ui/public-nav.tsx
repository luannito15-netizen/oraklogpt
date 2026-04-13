"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logoOraklo from "../../../assets/icons/logo-oraklo.svg";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/mercados",      label: "Mercados"      },
  { href: "/ranking",       label: "Ranking"       },
  { href: "/faq",           label: "Ajuda"         },
];

export function PublicNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-md glass-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="inline-flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
        >
          <Image
            src={logoOraklo}
            alt="ORAKLO"
            priority
            className="h-7 w-auto logo-invert"
          />
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                  active
                    ? "bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] text-[var(--accent)] ring-1 ring-[color-mix(in_srgb,var(--accent)_22%,transparent)]"
                    : "text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Entrar — ghost pill, hover accent tint */}
          <Link
            href="/login"
            className="hidden items-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-all sm:inline-flex hover:border-[color-mix(in_srgb,var(--accent)_45%,transparent)] hover:bg-[color-mix(in_srgb,var(--accent)_6%,transparent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            Entrar
          </Link>

          {/* Acessar — CTA solid, always-purple */}
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-full bg-[var(--oraklo-color-primary)] px-5 py-2 text-sm font-bold text-white shadow-[0_0_18px_rgba(168,85,247,0.32)] transition-all hover:brightness-110 hover:shadow-[0_0_28px_rgba(168,85,247,0.50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            Acessar
          </Link>
        </div>

      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-10 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[auto_1fr_auto]">

        <div>
          <Image
            src={logoOraklo}
            alt="ORAKLO"
            className="h-7 w-auto logo-invert opacity-40"
          />
          <p className="mt-3 max-w-[200px] text-xs leading-5 text-[var(--text-muted)]">
            O primeiro mercado brasileiro de previsões sobre eventos reais.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-10 gap-y-3 md:justify-center md:pt-1">
          {[
            { href: "/como-funciona", label: "Como funciona" },
            { href: "/mercados",      label: "Mercados"      },
            { href: "/ranking",       label: "Ranking"       },
            { href: "/faq",           label: "FAQ"           },
            { href: "/login",         label: "Acessar"       },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-[var(--text-muted)] opacity-60 md:pt-1">© 2025 ORAKLO.</p>

      </div>
    </footer>
  );
}
