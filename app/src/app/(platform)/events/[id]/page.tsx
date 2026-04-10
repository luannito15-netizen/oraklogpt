import { mockEvents } from "@/lib/mock-events";
import { DecisionPanel } from "./decision-panel";
import { EventChart } from "./event-chart";

type EventDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = mockEvents.find((e) => e.id === id) ?? mockEvents[0];
  const naoPercent = 100 - event.simPercent;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[var(--oraklo-color-text-subtle)]">
        <a href="/events" className="hover:text-[var(--oraklo-color-primary)]">Eventos</a>
        <span>/</span>
        <span className="truncate text-[var(--oraklo-color-text-muted)]">{event.title}</span>
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

        {/* Left: event info */}
        <div className="space-y-5">
          {/* Event card */}
          {/* Event card — dark */}
          <div className="rounded-2xl bg-[#1a0f2e] p-6 ring-1 ring-white/10">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <span className="rounded-full bg-sky-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                {event.category}
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-emerald-400 ring-1 ring-emerald-500/30">
                Aberto
              </span>
            </div>

            <h1 className="mt-4 font-[family-name:var(--font-anton)] text-2xl leading-snug text-white lg:text-3xl">
              {event.title}
            </h1>

            {/* SIM/NÃO distribution */}
            <div className="mt-6 flex gap-3">
              <div className="flex flex-1 items-center justify-between rounded-xl bg-emerald-500/15 px-4 py-3 ring-1 ring-emerald-500/25">
                <div>
                  <p className="text-xs font-bold text-emerald-400">SIM</p>
                  <p className="mt-0.5 text-lg font-black text-white">
                    {(0.95 / (event.simPercent / 100)).toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-emerald-400">▲</p>
                  <p className="text-xs font-semibold text-white/50">{event.simPercent}%</p>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-between rounded-xl bg-orange-500/15 px-4 py-3 ring-1 ring-orange-500/25">
                <div>
                  <p className="text-xs font-bold text-orange-400">NÃO</p>
                  <p className="mt-0.5 text-lg font-black text-white">
                    {(0.95 / (naoPercent / 100)).toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-orange-400">▼</p>
                  <p className="text-xs font-semibold text-white/50">{naoPercent}%</p>
                </div>
              </div>
            </div>

            {/* Bar */}
            <div className="mt-4">
              <div className="flex h-1.5 overflow-hidden rounded-full">
                <div className="bg-emerald-500 transition-all" style={{ width: `${event.simPercent}%` }} />
                <div className="flex-1 bg-orange-500/60" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-4 border-t border-white/8 pt-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">Volume</p>
                <p className="mt-1 text-sm font-bold text-white">R$ {event.volume.toLocaleString("pt-BR")}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">Encerra</p>
                <p className="mt-1 text-sm font-bold text-white">em {event.deadline}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">Fonte</p>
                <p className="mt-1 text-sm font-bold text-white">{event.source}</p>
              </div>
            </div>
          </div>

          {/* Critério de validação */}
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

          {/* Probability chart */}
          <EventChart simPercent={event.simPercent} />
        </div>

        {/* Right: decision panel */}
        <DecisionPanel event={event} />
      </div>
    </div>
  );
}
