import { getEventById } from "@/lib/events";
import { DecisionPanel } from "@/components/ui/decision-panel";
import { EventDetailClient } from "./event-detail-client";

type EventDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#140d24] py-20 text-center ring-1 ring-white/8">
        <p className="text-sm font-semibold text-white/40">Evento não encontrado</p>
        <a
          href="/events"
          className="rounded-xl bg-white/5 px-4 py-2 text-xs font-semibold text-white/40 ring-1 ring-white/8 hover:bg-white/8 hover:text-white/60 transition-colors"
        >
          Ver todos os eventos
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb — static */}
      <div className="flex items-center gap-2 text-xs text-[var(--oraklo-color-text-subtle)]">
        <a href="/events" className="hover:text-[var(--oraklo-color-primary)]">Eventos</a>
        <span>/</span>
        <span className="truncate text-[var(--oraklo-color-text-muted)]">{event.title}</span>
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

        {/* Left: event info */}
        <div className="space-y-5">
          {/* Static event card shell */}
          <div className="rounded-2xl bg-[#1a0f2e] p-6 ring-1 ring-white/10">
            {/* Category + status badges — static */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <span className="rounded-full bg-sky-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                {event.category}
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-emerald-400 ring-1 ring-emerald-500/30">
                Aberto
              </span>
            </div>

            {/* Title — static */}
            <h1 className="mt-4 font-[family-name:var(--font-anton)] text-2xl leading-snug text-white lg:text-3xl">
              {event.title}
            </h1>

            {/* Dynamic parts: SIM/NÃO cards, bar, metadata row, chart */}
            <EventDetailClient event={event} />
          </div>

          {/* Critério de validação — static */}
          <div className="rounded-2xl bg-[#1a0f2e] p-5 ring-1 ring-white/10">
            <h2 className="text-sm font-semibold text-white">Critério de validação</h2>
            <p className="mt-2 text-sm leading-6 text-white/55">
              O resultado será apurado com base em dados oficiais divulgados por{" "}
              <strong className="text-white">{event.source}</strong>. A resolução ocorre em até 24h após a divulgação do resultado oficial.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2.5 ring-1 ring-white/8">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="shrink-0">
                <circle cx="6" cy="6" r="5" stroke="#a78bfa" strokeWidth="1.5" />
                <path d="M6 4v3M6 8.5v.5" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-xs text-white/45">
                Fonte oficial: <span className="font-semibold text-white/70">{event.source}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: decision panel — unchanged */}
        <DecisionPanel event={event} />
      </div>
    </div>
  );
}
