import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScreenLayout } from "@/components/ui/screen-layout";

type EventDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;

  return (
    <ScreenLayout
      eyebrow="Detalhe do evento"
      title={`Evento: ${id}`}
      description="Estrutura inicial da tela de decisao. Componentes e textos ainda em modo placeholder."
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-4">
          <Badge tone="info">Contexto</Badge>
          <h2 className="text-xl font-semibold">Pergunta principal do evento</h2>
          <p className="text-sm leading-6 text-[color-mix(in_srgb,var(--oraklo-color-text)_68%,white)]">
            Bloco reservado para descricao, criterio de validacao e fonte oficial.
          </p>
        </Card>

        <Card className="space-y-4">
          <Badge tone="primary">Registrar previsao</Badge>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" className="w-full">
              SIM
            </Button>
            <Button variant="secondary" className="w-full">
              NAO
            </Button>
          </div>
          <Input id="amount" label="Valor da participacao" placeholder="R$ 0,00" />
          <p className="text-xs text-[color-mix(in_srgb,var(--oraklo-color-text)_62%,white)]">
            Retorno estimado: placeholder
          </p>
          <Button className="w-full">Confirmar posicao</Button>
        </Card>
      </div>
    </ScreenLayout>
  );
}
