import Link from "next/link";
import { PublicNav, PublicFooter } from "@/components/ui/public-nav";

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-[var(--th-bg)]">
      <PublicNav />

      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--th-dim)]">ORAKLO</p>
        <h1 className="mt-2 font-[family-name:var(--font-anton)] text-4xl text-[var(--th-text)]">
          Política de privacidade
        </h1>
        <p className="mt-3 text-sm text-[var(--th-low)]">Última atualização: abril de 2025</p>

        <div className="mt-12 space-y-10 text-sm leading-7 text-[var(--th-mid)]">
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-xl text-[var(--th-text)]">1. Dados coletados</h2>
            <p>
              Ao criar sua conta, coletamos nome, endereço de e-mail e senha (armazenada com criptografia
              bcrypt). Durante o uso da plataforma, registramos suas posições, participações e histórico
              de previsões.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-xl text-[var(--th-text)]">2. Como usamos seus dados</h2>
            <p>
              Utilizamos seus dados para operar a plataforma, exibir seu desempenho no ranking, calcular
              retornos e enviar comunicações relevantes sobre a sua conta. Não vendemos seus dados a terceiros.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-xl text-[var(--th-text)]">3. Armazenamento e segurança</h2>
            <p>
              Seus dados são armazenados em servidores seguros. Senhas são criptografadas e nunca armazenadas
              em texto puro. Utilizamos HTTPS para toda a comunicação entre cliente e servidor.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-xl text-[var(--th-text)]">4. Cookies</h2>
            <p>
              Utilizamos cookies estritamente necessários para manter sua sessão autenticada. Não utilizamos
              cookies de rastreamento ou publicidade de terceiros.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-xl text-[var(--th-text)]">5. Seus direitos</h2>
            <p>
              Em conformidade com a LGPD (Lei Geral de Proteção de Dados), você tem direito a acessar,
              corrigir ou solicitar a exclusão dos seus dados a qualquer momento. Para exercer esses
              direitos, entre em contato pela{" "}
              <Link href="/faq" className="text-[var(--oraklo-color-primary-glow)] hover:underline">
                página de ajuda
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-xl text-[var(--th-text)]">6. Alterações nesta política</h2>
            <p>
              Podemos atualizar esta política periodicamente. Em caso de mudanças relevantes, notificaremos
              os usuários por e-mail ou aviso na plataforma.
            </p>
          </section>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
