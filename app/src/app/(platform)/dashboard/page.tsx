import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScreenLayout } from "@/components/ui/screen-layout";

export default function DashboardPage() {
  return (
    <ScreenLayout
      eyebrow="Dashboard"
      title="Visao geral"
      description="Resumo inicial da plataforma com placeholders para metricas principais."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <Badge tone="neutral">Resumo</Badge>
          <p className="mt-3 text-sm text-[color-mix(in_srgb,var(--oraklo-color-text)_68%,white)]">
            Participacoes ativas
          </p>
          <p className="mt-1 text-3xl font-semibold">--</p>
        </Card>
        <Card>
          <Badge tone="neutral">Resumo</Badge>
          <p className="mt-3 text-sm text-[color-mix(in_srgb,var(--oraklo-color-text)_68%,white)]">
            Eventos em validacao
          </p>
          <p className="mt-1 text-3xl font-semibold">--</p>
        </Card>
        <Card>
          <Badge tone="neutral">Resumo</Badge>
          <p className="mt-3 text-sm text-[color-mix(in_srgb,var(--oraklo-color-text)_68%,white)]">
            Retorno acumulado
          </p>
          <p className="mt-1 text-3xl font-semibold">--</p>
        </Card>
      </div>
    </ScreenLayout>
  );
}
