import Link from "next/link";
import { PublicNav, PublicFooter } from "@/components/ui/public-nav";
import { AdBanner } from "@/components/ui/ad-banner";

const sections = [
  {
    title: "Sobre o ORAKLO",
    items: [
      {
        q: "O que é o ORAKLO?",
        a: "ORAKLO é o primeiro mercado brasileiro de previsões sobre eventos reais. Você registra sua posição (SIM ou NÃO) sobre eventos verificáveis, como resultados econômicos, climáticos ou esportivos, e recebe retorno financeiro se acertar.",
      },
      {
        q: "ORAKLO é aposta?",
        a: "Não. ORAKLO é um mercado de previsões baseado em opinião informada e validação objetiva. Não usamos sorte, não somos cassino. Cada evento tem critério objetivo de resolução e fonte oficial pública.",
      },
      {
        q: "Como o ORAKLO é diferente de sites de apostas?",
        a: "A diferença é estrutural. Em apostas, a casa sempre ganha. No ORAKLO, os retornos são calculados com base na distribuição real de posições — como um mercado. A plataforma cobra apenas uma taxa fixa de 5% por participação.",
      },
    ],
  },
  {
    title: "Como participar",
    items: [
      {
        q: "Como funciona uma previsão?",
        a: "Você escolhe um evento aberto, seleciona SIM ou NÃO, informa o valor e confirma. A cotação reflete quantas pessoas estão em cada lado. Se o resultado confirmar sua posição, você recebe o retorno calculado.",
      },
      {
        q: "Qual o valor mínimo de participação?",
        a: "R$ 1,00. Não há limite máximo nesta fase.",
      },
      {
        q: "Posso mudar minha previsão depois de confirmar?",
        a: "Não. Após a confirmação, a participação é definitiva. Por isso exibimos todas as informações — valor, taxa, cotação, retorno estimado e critério — antes da confirmação.",
      },
    ],
  },
  {
    title: "Cotação e retorno",
    items: [
      {
        q: "Como é calculada a cotação?",
        a: "A cotação é dinâmica e reflete a distribuição de volume entre SIM e NÃO. Quanto mais pessoas em um lado, menor o retorno daquele lado. A fórmula básica é: 0,95 ÷ probabilidade implícita. O desconto de 5% é a taxa da plataforma.",
      },
      {
        q: "O retorno é garantido?",
        a: "Não. O retorno é estimado com base na cotação no momento da entrada. A cotação pode mudar antes do encerramento do evento — mas sua cotação de entrada fica travada no momento da confirmação.",
      },
      {
        q: "Quando recebo meu retorno?",
        a: "Após a resolução do evento, o retorno é calculado e creditado em até 24h. A data de resolução é informada no evento antes da participação.",
      },
    ],
  },
  {
    title: "Eventos e validação",
    items: [
      {
        q: "Quem define o resultado dos eventos?",
        a: "O resultado é definido exclusivamente com base na fonte oficial previamente declarada no evento — IBGE, Banco Central, CBF, INMET, etc. Não há interpretação subjetiva.",
      },
      {
        q: "E se o evento for cancelado?",
        a: "Eventos só são cancelados em caso de erro grave, impossibilidade de validação ou indisponibilidade da fonte oficial. Em caso de cancelamento, a política de reembolso é aplicada.",
      },
      {
        q: "Posso sugerir um evento?",
        a: "Em breve. Estamos desenvolvendo a funcionalidade de sugestão de eventos pela comunidade. Todos os eventos passam por critérios rigorosos antes de serem publicados.",
      },
    ],
  },
  {
    title: "Conta e segurança",
    items: [
      {
        q: "Preciso verificar minha identidade?",
        a: "Sim. Para saques e operações acima de determinados limites, a verificação de identidade é obrigatória por exigência regulatória.",
      },
      {
        q: "Como os meus dados são protegidos?",
        a: "Seguimos as melhores práticas de segurança e estamos em conformidade com a LGPD. Dados financeiros são criptografados e nunca compartilhados com terceiros sem consentimento.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <PublicNav />

      {/* Header */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface-elevated)] px-6 py-16 text-center lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-[var(--oraklo-color-primary)] opacity-[0.07] blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">Ajuda</p>
          <h1 className="mt-2 font-[family-name:var(--font-anton)] text-4xl text-[var(--text)] lg:text-5xl">
            Perguntas frequentes
          </h1>
          <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
            Tudo que você precisa saber sobre o ORAKLO antes de registrar sua primeira previsão.
          </p>

          {/* Search */}
          <div className="relative mx-auto mt-8 max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.4" />
              <path d="m10 10 2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input type="search" placeholder="Buscar pergunta..."
              className="h-12 w-full rounded-full bg-[var(--surface)] pl-10 pr-5 text-sm text-[var(--text)] outline-none ring-1 ring-[var(--border)] transition-all placeholder:text-[var(--text-muted)] focus:ring-[var(--oraklo-color-primary)]" />
          </div>
        </div>
      </div>

      {/* FAQ sections */}
      <div className="mx-auto max-w-3xl px-6 py-14 lg:px-8">
        <div className="space-y-12">
          {sections.map((section, idx) => (
            <div key={section.title}>
              {/* Banner após a 2ª seção ("Como participar") */}
              {idx === 2 && <AdBanner size="leaderboard" className="mb-12" />}
              <h2 className="mb-6 font-[family-name:var(--font-anton)] text-lg text-[var(--oraklo-color-primary-glow)]">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <details key={i}
                    className="group rounded-2xl bg-[var(--surface-elevated)] ring-1 ring-[var(--border)] transition-all open:ring-[var(--oraklo-color-primary)]/30">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
                      <span className="text-sm font-semibold text-[var(--text)] group-open:text-[var(--text)]">
                        {item.q}
                      </span>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-muted)] transition-all group-open:rotate-45 group-open:bg-[var(--oraklo-color-primary)]/20 group-open:text-[var(--oraklo-color-primary-glow)]">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                          <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </summary>
                    <div className="border-t border-[var(--border)] px-5 pb-5 pt-4">
                      <p className="text-sm leading-6 text-[var(--text-secondary)]">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 rounded-2xl bg-[var(--surface-elevated)] p-8 text-center ring-1 ring-[var(--border)]">
          <p className="font-[family-name:var(--font-anton)] text-xl text-[var(--text)]">
            Ainda tem dúvidas?
          </p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Entre em contato com nosso suporte ou explore os eventos diretamente.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/mercados"
              className="inline-flex items-center rounded-full bg-[var(--oraklo-color-primary)] px-6 py-2.5 text-sm font-bold text-white shadow-[0_0_16px_rgba(123,47,247,0.35)] transition-all hover:bg-[var(--oraklo-color-primary-hover)]">
              Explorar mercados
            </Link>
            <Link href="mailto:contato@oraklo.com.br"
              className="inline-flex items-center rounded-full border border-[var(--border)] px-6 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition-all hover:border-[var(--border)] hover:text-[var(--text)]">
              Falar com suporte
            </Link>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
