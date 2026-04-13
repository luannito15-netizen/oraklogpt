import Image from "next/image";
import Link from "next/link";

import iconeBola    from "../../../../assets/icons/ICONE BOLA DE CRISTAL.svg";
import iconeChek    from "../../../../assets/icons/ICONE CHEK.svg";
import iconeEstrela from "../../../../assets/icons/ICONE ESTRELA.svg";
import iconeX       from "../../../../assets/icons/ICONE X.svg";
import heroHomem    from "../../../../assets/illustrations/hero-homem.png";
import mulherChart  from "../../../../assets/illustrations/image.png";
import { PublicNav, PublicFooter } from "@/components/ui/public-nav";
import { EventCardCompact } from "@/components/ui/event-card";
import type { EventCardData } from "@/components/ui/event-card";

const exampleEvent: EventCardData = {
  id: "ipca-abaixo-0-40",
  title: "IPCA de abril fica abaixo de 0,40%?",
  category: "Economia",
  status: "open",
  simPercent: 42,
  volume: 12800,
  deadline: "18 dias",
  source: "IBGE",
};

const steps = [
  {
    number: "01",
    icon: iconeEstrela,
    title: "Escolha um evento real",
    body: "Navegue pelos mercados abertos. Cada evento tem uma pergunta objetiva, fonte oficial e data de resolução. Nenhuma informação fica implícita.",
    detail: 'Exemplo: "O IPCA de abril fica abaixo de 0,40%?" — fonte: IBGE, resolução: 09/05.',
  },
  {
    number: "02",
    icon: iconeBola,
    title: "Veja as cotações",
    body: "A cotação reflete a distribuição real de posições. Quanto mais volume em um lado, menor o retorno daquele lado — exatamente como um mercado.",
    detail: "SIM 2,64× · NÃO 1,48× — valores atualizados em tempo real até o encerramento.",
  },
  {
    number: "03",
    icon: iconeChek,
    title: "Confirme sua previsão",
    body: "Escolha SIM ou NÃO, informe o valor, revise taxa, cotação e retorno estimado. Só depois confirme. Nenhuma surpresa.",
    detail: "Taxa fixa de 5% aplicada no momento da entrada, independente do resultado.",
  },
  {
    number: "04",
    icon: iconeX,
    title: "Espere o resultado oficial",
    body: "Quando o prazo encerra, o evento aguarda o resultado da fonte oficial. Após a divulgação, a resolução ocorre em até 24h.",
    detail: "Resultado apurado exclusivamente pela fonte declarada. Sem interpretação subjetiva.",
  },
];

const principles = [
  { title: "Objetividade", desc: "Cada evento tem critério claro e verificável. Nada fica subjetivo ou ambíguo." },
  { title: "Transparência", desc: "Você vê cotação, taxa e retorno antes de confirmar. Sem letras pequenas." },
  { title: "Verificabilidade", desc: "Toda resolução usa fonte pública oficial. Qualquer pessoa pode conferir." },
  { title: "Racionalidade", desc: "A plataforma não estimula impulso. Cada decisão é sua e consciente." },
];

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-[var(--th-bg)]">
      <PublicNav />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[var(--th-bg-elevated)] px-6 py-20 lg:px-8 lg:py-28">
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[var(--oraklo-color-primary)] opacity-[0.06] blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="space-y-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--oraklo-color-primary-glow)]/60">
              Como funciona
            </p>
            <h1 className="font-[family-name:var(--font-anton)] text-4xl text-[var(--th-text)] lg:text-6xl">
              Simples como<br />opinar. Sério<br />
              <span className="text-[var(--oraklo-color-primary)]">como decidir.</span>
            </h1>
            <p className="max-w-md text-base leading-7 text-[var(--th-mid)]">
              ORAKLO é o primeiro mercado brasileiro onde sua leitura de cenário vira uma posição real — com cotação, critério e retorno financeiro.
            </p>
            <Link href="/mercados"
              className="inline-flex items-center rounded-full bg-[var(--oraklo-color-primary)] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white shadow-[0_0_24px_rgba(123,47,247,0.4)] transition-all hover:bg-[var(--oraklo-color-primary-hover)]">
              Ver mercados abertos
            </Link>
          </div>

          <div className="relative mx-auto hidden h-[480px] w-full lg:block">
            <div className="absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[var(--oraklo-color-primary)] opacity-25 blur-3xl" />
            <Image src={heroHomem} alt="Pessoa usando o ORAKLO" fill className="object-contain object-bottom" />
          </div>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl text-[var(--th-text)] lg:text-4xl">
              O processo em 4 etapas
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step, i) => (
              <div key={i}
                className="relative overflow-hidden rounded-2xl bg-[var(--th-bg-card)] p-7 ring-1 ring-[var(--th-ring)]">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--oraklo-color-primary)] opacity-[0.07] blur-2xl" />

                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--oraklo-color-primary)]/15 ring-1 ring-[var(--oraklo-color-primary)]/25">
                    <Image src={step.icon} alt="" aria-hidden className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-[family-name:var(--font-anton)] text-3xl text-[var(--th-dim)]">{step.number}</span>
                      <h3 className="font-[family-name:var(--font-anton)] text-lg text-[var(--oraklo-color-primary-glow)]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-6 text-[var(--th-mid)]">{step.body}</p>
                    <div className="rounded-xl bg-[var(--th-overlay-5)] px-3 py-2 ring-1 ring-[var(--th-ring)]">
                      <p className="text-xs text-[var(--th-low)]">{step.detail}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual example ── */}
      <section className="bg-[var(--th-bg-elevated)] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="absolute inset-0 rounded-2xl bg-[var(--oraklo-color-primary)] opacity-15 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl ring-2 ring-[var(--oraklo-color-primary)]/50">
              <Image src={mulherChart} alt="Pessoa acompanhando previsões no ORAKLO" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-[family-name:var(--font-anton)] text-2xl text-[var(--th-text)] lg:text-3xl">
              Sua leitura tem valor.<br />
              <span className="text-[var(--oraklo-color-primary)]">E pode ser comprovada.</span>
            </h2>
            <p className="text-sm leading-7 text-[var(--th-mid)]">
              No ORAKLO, cada previsão registrada cria um histórico real. Com o tempo, você tem dados concretos sobre a qualidade das suas análises — e retorno financeiro quando acerta.
            </p>

            {/* Sample event */}
            <div className="pt-2">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--th-dim)]">Exemplo de evento</p>
              <EventCardCompact event={exampleEvent} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl text-[var(--th-text)]">Os princípios do produto</h2>
            <p className="mt-3 text-sm text-[var(--th-low)]">O que guia cada decisão de design e de negócio no ORAKLO.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <div key={i} className="rounded-2xl bg-[var(--th-bg-card)] p-6 ring-1 ring-[var(--th-ring)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--oraklo-color-primary)]/15">
                  <span className="font-[family-name:var(--font-anton)] text-lg text-[var(--oraklo-color-primary)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-anton)] text-base text-[var(--th-text)]">{p.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[var(--th-low)]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-[var(--th-bg-elevated)] px-6 py-20 text-center lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--oraklo-color-primary)] opacity-[0.08] blur-3xl" />
        <div className="relative mx-auto max-w-lg space-y-6">
          <h2 className="font-[family-name:var(--font-anton)] text-3xl text-[var(--th-text)] lg:text-4xl">
            Pronto para registrar<br />sua primeira previsão?
          </h2>
          <p className="text-sm text-[var(--th-low)]">Explore os eventos abertos e comece agora.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/login"
              className="inline-flex items-center rounded-full bg-[var(--oraklo-color-primary)] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white shadow-[0_0_24px_rgba(123,47,247,0.4)] transition-all hover:bg-[var(--oraklo-color-primary-hover)]">
              Começar agora
            </Link>
            <Link href="/faq"
              className="inline-flex items-center rounded-full border border-[var(--th-border)] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-[var(--th-mid)] transition-all hover:border-[var(--th-border)] hover:text-[var(--th-text)]">
              Ver FAQ
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
