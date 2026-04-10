import Image from "next/image";
import Link from "next/link";

import logoOraklo from "../../../assets/icons/logo-oraklo.svg";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/mercados",      label: "Mercados"      },
  { href: "/ranking",       label: "Ranking"       },
  { href: "/faq",           label: "Ajuda"         },
];

export function PublicNav() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--th-bg-elevated)]/90 border-b border-[var(--th-border)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href="/" className="inline-flex shrink-0 items-center">
          <Image
            src={logoOraklo}
            alt="ORAKLO"
            priority
            className="h-8 w-auto logo-invert"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href}
              className="text-sm font-medium transition-colors text-[var(--th-mid)] hover:text-[var(--th-text)]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login"
            className="hidden items-center rounded-full border border-[var(--th-border)] px-4 py-2 text-sm font-semibold transition-colors sm:inline-flex text-[var(--th-mid)] hover:border-[var(--oraklo-color-primary)] hover:text-[var(--th-text)]">
            Entrar
          </Link>
          <Link href="/dashboard"
            className="inline-flex items-center rounded-full bg-[var(--oraklo-color-primary)] px-5 py-2 text-sm font-bold text-white shadow-[0_0_16px_rgba(123,47,247,0.35)] transition-all hover:bg-[var(--oraklo-color-primary-hover)]">
            Acessar
          </Link>
        </div>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-[var(--th-border)] bg-[var(--th-bg)] px-6 py-10 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[auto_1fr_auto]">
        <div>
          <Image src={logoOraklo} alt="ORAKLO" className="h-7 w-auto logo-invert opacity-50" />
          <p className="mt-3 max-w-[200px] text-xs leading-5 text-[var(--th-dim)]">
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
            <Link key={l.href} href={l.href} className="text-xs text-[var(--th-dim)] transition-colors hover:text-[var(--th-mid)]">{l.label}</Link>
          ))}
        </nav>
        <p className="text-xs text-[var(--th-dim)] md:pt-1">© 2025 ORAKLO.</p>
      </div>
    </footer>
  );
}
