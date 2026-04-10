"use client";

import { ProbabilityChart, generateMockHistory } from "@/components/ui/probability-chart";
import { useMemo } from "react";

export function EventChart({ simPercent }: { simPercent: number }) {
  const data = useMemo(() => generateMockHistory(simPercent), [simPercent]);

  return (
    <div className="rounded-2xl bg-[#1a0f2e] p-5 ring-1 ring-white/8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/30">
            Cotação ao longo do tempo
          </p>
          <p className="mt-0.5 text-xs text-white/50">Últimas 18h</p>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="flex items-center gap-1.5 text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            SIM
          </span>
          <span className="flex items-center gap-1.5 text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            NÃO
          </span>
        </div>
      </div>
      <ProbabilityChart data={data} />
    </div>
  );
}
