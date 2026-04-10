import Image from "next/image";
import Link from "next/link";

import logoOraklo from "../../../assets/icons/logo-oraklo.svg";
import heroVisualPrimary from "../../../assets/illustrations/home.png";
import heroVisualSecondary from "../../../assets/illustrations/site2.png";
import heroVisualContext from "../../../assets/images/image.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenLayout } from "@/components/ui/screen-layout";

const institutionalBlocks = [
  {
    title: "Posicao com responsabilidade",
    description:
      "Cada decisao nasce com contexto, leitura de cenario e duas etapas de confirmacao antes do registro.",
  },
  {
    title: "Validacao transparente",
    description:
      "Eventos sao estruturados com criterio objetivo e fonte oficial para manter consistencia operacional.",
  },
  {
    title: "Design de produto confiavel",
    description:
      "A experiencia combina ritmo editorial, tipografia forte e interface limpa para facilitar a leitura.",
  },
];

const navItems = [
  { href: "#visao", label: "Visao" },
  { href: "#metodo", label: "Metodo" },
  { href: "/events", label: "Eventos" },
];

export default function PublicHomePage() {
  return (
    <ScreenLayout className="relative overflow-hidden py-6 sm:py-8 lg:py-10" containerClassName="max-w-7xl">
      <div className="pointer-events-none absolute inset-x-0 top-[-260px] h-[520px] bg-[radial-gradient(circle_at_top,var(--oraklo-color-primary-glow)_0%,transparent_68%)] opacity-25" />

      <div className="relative space-y-12 lg:space-y-16">
        <header className="flex items-center justify-between gap-4 rounded-[var(--oraklo-radius-lg)] border border-[color-mix(in_srgb,var(--oraklo-color-text)_12%,white)] bg-white/70 px-4 py-3 shadow-[var(--oraklo-shadow-soft)] backdrop-blur-sm sm:px-6 sm:py-4">
          <Link href="/" className="inline-flex items-center">
            <Image
              src={logoOraklo}
              alt="Logo ORAKLO"
              priority
              className="h-8 w-auto sm:h-10"
            />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[color-mix(in_srgb,var(--oraklo-color-text)_72%,white)] transition-colors hover:text-[var(--oraklo-color-text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <form action="/login">
              <Button type="submit" size="sm" variant="ghost">
                Entrar
              </Button>
            </form>
            <form action="/dashboard">
              <Button type="submit" size="sm">
                Acessar
              </Button>
            </form>
          </div>
        </header>

        <section id="visao" className="grid gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div className="space-y-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[color-mix(in_srgb,var(--oraklo-color-text)_62%,white)]">
              Mercado de previsoes com criterio
            </p>

            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--oraklo-color-text)] sm:text-5xl lg:text-6xl">
              A nova camada de leitura publica para decisoes em eventos reais.
            </h1>

            <p className="max-w-xl text-base leading-7 text-[color-mix(in_srgb,var(--oraklo-color-text)_74%,white)] sm:text-lg">
              ORAKLO une contexto, participacao e validacao oficial em uma experiencia com linguagem clara e presenca de
              marca.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <form action="/login">
                <Button type="submit" size="lg" className="min-w-44">
                  Registrar previsao
                </Button>
              </form>
              <form action="/events">
                <Button type="submit" size="lg" variant="secondary" className="min-w-44">
                  Explorar eventos
                </Button>
              </form>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[640px]">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--oraklo-color-primary-glow)] opacity-35 blur-3xl" />
            <div className="absolute -left-10 bottom-14 h-36 w-36 rounded-full bg-[var(--oraklo-color-primary)] opacity-20 blur-3xl" />

            <Card className="relative overflow-hidden border-[color-mix(in_srgb,var(--oraklo-color-primary)_30%,white)] p-0">
              <Image
                src={heroVisualPrimary}
                alt="Composicao principal da plataforma ORAKLO"
                priority
                className="h-full w-full object-cover"
              />
            </Card>

            <Card className="absolute -bottom-10 -left-8 hidden w-[48%] overflow-hidden border-[color-mix(in_srgb,var(--oraklo-color-text)_20%,white)] p-0 md:block">
              <Image
                src={heroVisualSecondary}
                alt="Visao complementar da experiencia ORAKLO"
                className="h-full w-full object-cover"
              />
            </Card>

            <Card className="absolute -right-7 top-12 hidden w-[44%] overflow-hidden border-[color-mix(in_srgb,var(--oraklo-color-primary)_26%,white)] p-0 md:block">
              <Image
                src={heroVisualContext}
                alt="Contexto visual de dados e decisao"
                className="h-full w-full object-cover"
              />
            </Card>
          </div>
        </section>

        <section id="metodo" className="grid gap-4 md:grid-cols-3">
          {institutionalBlocks.map((block) => (
            <Card key={block.title} className="space-y-3" padding="lg">
              <h2 className="text-xl font-semibold tracking-tight text-[var(--oraklo-color-text)]">{block.title}</h2>
              <p className="text-sm leading-6 text-[color-mix(in_srgb,var(--oraklo-color-text)_72%,white)]">
                {block.description}
              </p>
            </Card>
          ))}
        </section>
      </div>
    </ScreenLayout>
  );
}
