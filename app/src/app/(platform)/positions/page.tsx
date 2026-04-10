import Link from "next/link";

export default function PositionsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-anton)] text-2xl text-white">Minhas posições</h1>
          <p className="mt-0.5 text-xs text-white/30">Histórico e posições abertas</p>
        </div>
        <Link href="/events"
          className="flex items-center gap-2 rounded-xl bg-[var(--oraklo-color-primary)] px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_14px_rgba(123,47,247,0.3)] transition-all hover:bg-[var(--oraklo-color-primary-hover)]">
          + Nova previsão
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-[#140d24] ring-1 ring-white/8">
        <div className="grid grid-cols-[2fr_70px_80px_80px_110px_80px_90px] items-center gap-3 border-b border-white/6 px-5 py-3">
          {["Evento", "Lado", "Valor", "Cotação", "Retorno est.", "Prazo", "Status"].map((h) => (
            <p key={h} className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/20">{h}</p>
          ))}
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--oraklo-color-primary)]/10 ring-1 ring-[var(--oraklo-color-primary)]/20">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 14L7.5 9.5 11 13 17 6" stroke="var(--oraklo-color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/40">Nenhuma posição ainda</p>
            <p className="mt-1.5 max-w-xs text-xs leading-5 text-white/20">
              Registre sua primeira previsão nos mercados abertos e acompanhe seus resultados aqui.
            </p>
          </div>
          <Link href="/events"
            className="mt-1 inline-flex items-center gap-2 rounded-xl bg-[var(--oraklo-color-primary)] px-5 py-2.5 text-xs font-bold text-white shadow-[0_0_14px_rgba(123,47,247,0.3)] transition-all hover:bg-[var(--oraklo-color-primary-hover)]">
            Explorar mercados
          </Link>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Posições abertas",  value: "0" },
          { label: "Total investido",   value: "R$ 0" },
          { label: "Retorno potencial", value: "R$ 0" },
          { label: "Taxa de acerto",    value: "—"    },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-[#140d24] p-4 ring-1 ring-white/8">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/20">{s.label}</p>
            <p className="mt-1.5 font-[family-name:var(--font-anton)] text-xl text-white">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
