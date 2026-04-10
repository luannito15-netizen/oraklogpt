import Link from "next/link";
import { PublicNav, PublicFooter } from "@/components/ui/public-nav";

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[var(--th-bg)]">
      <PublicNav />

      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--th-dim)]">ORAKLO</p>
        <h1 className="mt-2 font-[family-name:var(--font-anton)] text-4xl text-[var(--th-text)]">
          Termos de uso
        </h1>
        <p className="mt-3 text-sm text-[var(--th-low)]">Última atualização: abril de 2025</p>

        <div className="mt-12 space-y-10 text-sm leading-7 text-[var(--th-mid)]">
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-xl text-[var(--th-text)]">1. Aceitação dos termos</h2>
            <p>
              Ao criar uma conta ou utilizar a plataforma ORAKLO, você concorda com estes Termos de Uso.
              Caso não concorde com alguma disposição, não utilize nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-xl text-[var(--th-text)]">2. O que é o ORAKLO</h2>
            <p>
              O ORAKLO é um mercado brasileiro de previsões sobre eventos reais. Os usuários registram
              posições (SIM ou NÃO) em eventos verificáveis e acompanham seus resultados após a resolução
              oficial do evento. A plataforma não constitui aposta ou jogo de azar.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-xl text-[var(--th-text)]">3. Elegibilidade</h2>
            <p>
              Para utilizar o ORAKLO você deve ter pelo menos 18 anos e estar de acordo com a legislação
              vigente em seu país de residência. Ao se cadastrar, você declara atender a esses requisitos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-xl text-[var(--th-text)]">4. Taxas da plataforma</h2>
            <p>
              O ORAKLO cobra uma taxa fixa de 5% sobre cada participação registrada. Essa taxa é descontada
              no momento do registro da posição e é claramente exibida antes da confirmação.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-xl text-[var(--th-text)]">5. Resolução de eventos</h2>
            <p>
              Todos os eventos são resolvidos com base em fontes oficiais indicadas na descrição de cada
              mercado (ex.: IBGE, Banco Central, CBF). O ORAKLO não interfere no resultado dos eventos
              e não é responsável por atrasos ou mudanças nas fontes externas.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-xl text-[var(--th-text)]">6. Uso aceitável</h2>
            <p>
              É proibido utilizar a plataforma para qualquer finalidade ilegal, fraudulenta ou que viole
              direitos de terceiros. O ORAKLO pode suspender ou encerrar contas que violem estes termos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-xl text-[var(--th-text)]">7. Contato</h2>
            <p>
              Para dúvidas ou solicitações relacionadas a estes termos, entre em contato pelo nosso canal
              de suporte disponível na{" "}
              <Link href="/faq" className="text-[var(--oraklo-color-primary-glow)] hover:underline">
                página de ajuda
              </Link>.
            </p>
          </section>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
