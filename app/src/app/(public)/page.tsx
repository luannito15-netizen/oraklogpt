import Image from "next/image";
import Link from "next/link";

import logoOraklo    from "../../../assets/icons/logo-oraklo.svg";
import iconeBola     from "../../../assets/icons/ICONE BOLA DE CRISTAL.svg";
import iconeChek     from "../../../assets/icons/ICONE CHEK.svg";
import iconeEstrela  from "../../../assets/icons/ICONE ESTRELA.svg";
import iconeX        from "../../../assets/icons/ICONE X.svg";
import icone1        from "../../../assets/icons/ICONE 1.svg";
import heroHomem     from "../../../assets/illustrations/hero-homem.png";
import metodoMulher  from "../../../assets/illustrations/metodo-mulher.png";
import { getOpenEvents } from "@/lib/events";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AdBanner } from "@/components/ui/ad-banner";
import { EventsHeroSection } from "./events-hero-section";

const navItems = [
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/mercados",      label: "Mercados"      },
  { href: "/ranking",       label: "Ranking"       },
  { href: "/faq",           label: "Ajuda"         },
];

const steps = [
  { icon: iconeEstrela, title: "Escolha um evento real",     description: 'Ex: "Vai chover em SP no sábado?"' },
  { icon: iconeBola,    title: "Veja as cotações",           description: "Quanto mais gente em um lado, menor o retorno dele." },
  { icon: iconeChek,    title: "Confirme sua previsão",      description: "É só escolher Sim ou Não e confirmar." },
  { icon: iconeX,       title: "Espere o resultado oficial", description: "Quando o evento acabar, a validação é feita por uma fonte oficial." },
];

export default async function PublicHomePage() {
  const events = await getOpenEvents();
  return (
    <div className="min-h-screen">

      {/* ══════════════════════════════════════
          HERO — único fundo claro
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--oraklo-color-bg)]" style={{ minHeight: 680 }}>

        {/* ── Glow sutil removido para não interferir nas cores dos cards ── */}

        {/* ════════════════════════════════════
            ÍCONES — posicionados conforme home.png
            Crystal ball: inferior esquerdo, grande, parcialmente cortado
            ICONE 1: centro, entre copy e personagem
            ICONE CHEK: superior direito, acima do ombro do personagem
            ICONE ESTRELA: borda direita, altura média
        ════════════════════════════════════ */}

        {/* Bola de cristal — inferior esquerdo, parcialmente saindo da borda */}
        <div
          className="animate-float-slow pointer-events-none absolute z-10"
          style={{ bottom: "-4%", left: "-2%", animationDelay: "0s" }}
        >
          <Image src={iconeBola} alt="" aria-hidden
            className="h-[200px] w-[200px] drop-shadow-2xl lg:h-[260px] lg:w-[260px]" />
        </div>

        {/* ICONE 1 — flutuando no centro-alto, entre copy e personagem */}
        <div
          className="animate-float-drift pointer-events-none absolute z-10"
          style={{ left: "44%", top: "24%", animationDelay: "1.4s" }}
        >
          <Image src={icone1} alt="" aria-hidden
            className="h-[110px] w-[110px] drop-shadow-2xl lg:h-[140px] lg:w-[140px]" />
        </div>

        {/* ICONE CHEK — superior direito, acima do ombro */}
        <div
          className="animate-float-spin pointer-events-none absolute z-10"
          style={{ right: "7%", top: "9%", animationDelay: "0.5s" }}
        >
          <Image src={iconeChek} alt="" aria-hidden
            className="h-[72px] w-[72px] drop-shadow-xl lg:h-[88px] lg:w-[88px]" />
        </div>

        {/* ICONE ESTRELA — borda direita, altura média */}
        <div
          className="animate-float-down pointer-events-none absolute z-10"
          style={{ right: "1%", top: "46%", animationDelay: "2.8s" }}
        >
          <Image src={iconeEstrela} alt="" aria-hidden
            className="h-[42px] w-[42px] drop-shadow-lg lg:h-[52px] lg:w-[52px]" />
        </div>

        {/* ICONE X — esquerda, altura média, pequeno (detalhe) */}
        <div
          className="animate-float-up pointer-events-none absolute z-10 opacity-70"
          style={{ left: "1%", top: "38%", animationDelay: "4s" }}
        >
          <Image src={iconeX} alt="" aria-hidden
            className="h-[36px] w-[36px] drop-shadow-md" />
        </div>

        {/* ── Nav ── */}
        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 lg:px-8">
          <Link href="/" className="inline-flex shrink-0 items-center">
            <Image src={logoOraklo} alt="ORAKLO" priority className="h-8 w-auto" />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}
                className="text-sm font-medium text-[var(--oraklo-color-text)] transition-colors hover:text-[var(--oraklo-color-primary)]">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link href="/cadastro"
              className="hidden items-center rounded-full border border-[var(--oraklo-color-border-strong)] px-4 py-2 text-sm font-semibold text-[var(--oraklo-color-text)] transition-colors hover:border-[var(--oraklo-color-primary)] hover:text-[var(--oraklo-color-primary)] sm:inline-flex">
              Criar conta
            </Link>
            <Link href="/dashboard"
              className="inline-flex items-center rounded-full bg-[var(--oraklo-color-primary)] px-5 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(123,47,247,0.35)] transition-all hover:bg-[var(--oraklo-color-primary-hover)] hover:shadow-[0_0_30px_rgba(123,47,247,0.55)]">
              Acessar
            </Link>
          </div>
        </header>

        {/* ── Hero grid ── */}
        <div className="relative z-10 mx-auto grid max-w-7xl items-end px-6 lg:grid-cols-[1fr_560px] lg:px-8">

          {/* Left: copy */}
          <div className="max-w-xl space-y-7 pb-10 pt-10 lg:pb-0 lg:pt-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--oraklo-color-border)] bg-[var(--surface-elevated)] px-3.5 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-[var(--oraklo-color-text-muted)]">
                Mercado aberto · {events.length} {events.length === 1 ? "evento ao vivo" : "eventos ao vivo"}
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-anton)] text-5xl leading-[1.02] text-[var(--oraklo-color-text)] sm:text-6xl lg:text-[5.5rem]">
              Todo mundo<br />da pitaco.<br />
              <span className="text-[var(--oraklo-color-primary)]">Aqui vale<br />dinheiro.</span>
            </h1>

            <p className="max-w-md text-base leading-7 text-[var(--oraklo-color-text-muted)]">
              Bem-vindo ao primeiro mercado brasileiro de pitacos que valem dinheiro.
              Sua previsão é levada a sério — e pode te dar retorno de verdade.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/cadastro"
                className="inline-flex items-center rounded-full bg-[var(--oraklo-color-primary)] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white shadow-[0_0_24px_rgba(123,47,247,0.4)] transition-all hover:shadow-[0_0_36px_rgba(123,47,247,0.6)]">
                Começar a prever
              </Link>
              <Link href="/mercados"
                className="inline-flex items-center rounded-full border border-[var(--oraklo-color-border-strong)] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-[var(--oraklo-color-text)] transition-colors hover:border-[var(--oraklo-color-primary)] hover:text-[var(--oraklo-color-primary)]">
                Ver mercados
              </Link>
            </div>

            <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--oraklo-color-text-subtle)]">
              *Consulte os termos de uso para mais informações.
            </p>
          </div>

          {/* Right: hero image */}
          <div className="relative hidden h-[760px] lg:block">
            <Image src={heroHomem} alt="Pessoa usando a plataforma ORAKLO" fill priority
              className="object-contain object-bottom" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          EVENTS STRIP — dark
      ══════════════════════════════════════ */}
      <section className="bg-[var(--bg)] px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">Eventos em destaque</p>
              <p className="mt-0.5 text-sm font-semibold text-[var(--text-secondary)]">Registre sua posição agora</p>
            </div>
            <Link href="/mercados" className="text-xs font-bold text-[var(--oraklo-color-primary-glow)] hover:text-[var(--text)] transition-colors">
              Ver todos →
            </Link>
          </div>
          <EventsHeroSection events={events.slice(0, 3)} />
        </div>
      </section>

      {/* Banner publicitário — entre seções */}
      <div className="bg-[var(--bg)] px-6 py-6 lg:px-8">
        <AdBanner size="leaderboard" className="mx-auto" />
      </div>

      {/* ══════════════════════════════════════
          COMO FUNCIONA — dark
      ══════════════════════════════════════ */}
      <section id="como-funciona" className="relative overflow-hidden bg-[var(--bg)] px-6 py-20 lg:px-8 lg:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--oraklo-color-primary)] opacity-[0.06] blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="absolute inset-0 rounded-2xl bg-[var(--oraklo-color-primary)] opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl">
              <Image src={metodoMulher} alt="Pessoa consultando previsões no ORAKLO" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="space-y-9">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--oraklo-color-primary-glow)]/60">Como funciona</p>
              <h2 className="mt-2 font-[family-name:var(--font-anton)] text-3xl text-[var(--text)] lg:text-4xl">
                Simples como opinar.<br />Sério como decidir.
              </h2>
            </div>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--oraklo-color-primary)]/15 ring-1 ring-[var(--oraklo-color-primary)]/25">
                    <Image src={step.icon} alt="" aria-hidden className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-anton)] text-sm tracking-wide text-[var(--oraklo-color-primary-glow)]">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--border)] pt-7">
              <p className="text-sm font-semibold text-[var(--oraklo-color-primary-glow)]">Se acertar, você recebe retorno em dinheiro.</p>
              <Link href="/como-funciona"
                className="mt-5 inline-flex items-center rounded-full bg-[var(--oraklo-color-primary)] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white shadow-[0_0_24px_rgba(123,47,247,0.4)] transition-all hover:bg-[var(--oraklo-color-primary-hover)]">
                Saiba mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
          <Image src={logoOraklo} alt="ORAKLO" className="h-6 w-auto logo-invert opacity-40" />
          <nav className="flex flex-wrap gap-5">
            {[
              { href: "/como-funciona", label: "Como funciona" },
              { href: "/mercados",      label: "Mercados"      },
              { href: "/ranking",       label: "Ranking"       },
              { href: "/faq",           label: "Ajuda / FAQ"   },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">{l.label}</Link>
            ))}
          </nav>
          <p className="text-xs text-[var(--text-muted)]">© 2025 ORAKLO. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
