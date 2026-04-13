"use client";

import { useState } from "react";
import { useMarketRealtime } from "@/lib/hooks/use-market-realtime";
import { EventChart } from "./event-chart";
import type { EventCardData } from "@/components/ui/event-card";
import type { MarketUpdate } from "@/lib/hooks/use-market-realtime";

interface EventDetailClientProps {
  event: EventCardData;
}

function cotacao(percent: number): string {
  if (percent <= 0) return "—";
  return (0.95 / (percent / 100)).toFixed(2);
}

export function EventDetailClient({ event }: EventDetailClientProps) {
  const [simPercent, setSimPercent] = useState(event.simPercent);
  const [volume, setVolume] = useState(event.volume);
  const [participantCount, setParticipantCount] = useState<number | null>(null);

  const naoPercent = 100 - simPercent;

  function handleUpdate(update: MarketUpdate) {
    setSimPercent(Math.round(update.last_price_sim * 100));
    setVolume(Math.round(update.volume_total));
    setParticipantCount(update.participant_count);
  }

  useMarketRealtime(event.id, handleUpdate);

  return (
    <>
      {/* SIM/NÃO distribution cards */}
      <div className="mt-6 flex gap-3">
        <div className="flex flex-1 items-center justify-between rounded-xl bg-emerald-500/15 px-4 py-3 ring-1 ring-emerald-500/25">
          <div>
            <p className="text-xs font-bold text-emerald-400">SIM</p>
            <p className="mt-0.5 text-lg font-black text-white">
              {cotacao(simPercent)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-emerald-400">▲</p>
            <p className="text-xs font-semibold text-white/50">{simPercent}%</p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between rounded-xl bg-orange-500/15 px-4 py-3 ring-1 ring-orange-500/25">
          <div>
            <p className="text-xs font-bold text-orange-400">NÃO</p>
            <p className="mt-0.5 text-lg font-black text-white">
              {cotacao(naoPercent)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-orange-400">▼</p>
            <p className="text-xs font-semibold text-white/50">{naoPercent}%</p>
          </div>
        </div>
      </div>

      {/* Distribution bar */}
      <div className="mt-4">
        <div className="flex h-1.5 overflow-hidden rounded-full">
          <div
            className="bg-emerald-500 transition-all duration-500"
            style={{ width: `${simPercent}%` }}
          />
          <div className="flex-1 bg-orange-500/60" />
        </div>
      </div>

      {/* Volume / Deadline / Source metadata */}
      <div className="mt-5 grid grid-cols-3 gap-4 border-t border-white/8 pt-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">Volume</p>
          <p className="mt-1 text-sm font-bold text-white">
            R$ {volume.toLocaleString("pt-BR")}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">Encerra</p>
          <p className="mt-1 text-sm font-bold text-white">em {event.deadline}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">
            {participantCount !== null ? "Participantes" : "Fonte"}
          </p>
          <p className="mt-1 text-sm font-bold text-white">
            {participantCount !== null ? participantCount.toLocaleString("pt-BR") : event.source}
          </p>
        </div>
      </div>

      {/* Live chart — subscribes independently to market_history INSERTs */}
      <EventChart eventId={event.id} initialPrice={simPercent / 100} />
    </>
  );
}
