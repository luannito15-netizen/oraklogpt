import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScreenLayout } from "@/components/ui/screen-layout";

export default function AdminPage() {
  return (
    <ScreenLayout
      eyebrow="Admin"
      title="Painel administrativo"
      description="Espaco inicial para operacao de eventos, validacao e acompanhamento do ciclo de vida."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <Badge tone="info">Operacao</Badge>
          <h2 className="mt-3 text-lg font-semibold">Eventos em draft</h2>
          <p className="mt-2 text-sm text-[color-mix(in_srgb,var(--oraklo-color-text)_68%,white)]">
            Placeholder para lista de eventos antes da publicacao.
          </p>
        </Card>

        <Card>
          <Badge tone="neutral">Validacao</Badge>
          <h2 className="mt-3 text-lg font-semibold">Eventos aguardando resultado</h2>
          <p className="mt-2 text-sm text-[color-mix(in_srgb,var(--oraklo-color-text)_68%,white)]">
            Placeholder para fluxo de fechamento, resolucao e cancelamento.
          </p>
        </Card>
      </div>
    </ScreenLayout>
  );
}
