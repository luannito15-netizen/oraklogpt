import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScreenLayout } from "@/components/ui/screen-layout";

const eventPlaceholders = [
  { id: "evento-clima", titulo: "Vai chover em Fortaleza no fim de semana?", status: "Aberto" },
  { id: "evento-economia", titulo: "IPCA mensal fica abaixo de 0,40%?", status: "Aberto" },
  { id: "evento-esportes", titulo: "Time brasileiro vence final continental?", status: "Em observacao" },
];

export default function EventsPage() {
  return (
    <ScreenLayout
      eyebrow="Eventos"
      title="Eventos disponiveis"
      description="Listagem inicial em modo mock. Sem logica de negocio nesta etapa."
    >
      <div className="space-y-4">
        {eventPlaceholders.map((event) => (
          <Card key={event.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <Badge tone="primary">Cotacao</Badge>
              <h2 className="text-lg font-semibold">{event.titulo}</h2>
              <p className="text-sm text-[color-mix(in_srgb,var(--oraklo-color-text)_68%,white)]">
                Status: {event.status}
              </p>
            </div>
            <Link
              href={`/events/${event.id}`}
              className="inline-flex h-10 items-center justify-center rounded-[var(--oraklo-radius-sm)] border border-[color-mix(in_srgb,var(--oraklo-color-text)_16%,white)] px-4 text-sm font-semibold transition-colors hover:bg-[color-mix(in_srgb,var(--oraklo-color-bg)_72%,white)]"
            >
              Ver evento
            </Link>
          </Card>
        ))}
      </div>
    </ScreenLayout>
  );
}
