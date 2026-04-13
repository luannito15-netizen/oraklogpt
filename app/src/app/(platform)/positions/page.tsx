import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

interface Position {
  id: string;
  event_id: string;
  side: "SIM" | "NAO";
  value_gross: number;
  cotacao: number;
  estimated_return: number;
  status: "open" | "won" | "lost" | "canceled";
  created_at: string;
  events: { title: string; deadline_at: string } | null;
}

async function getPositions(): Promise<Position[]> {
  // Service role key bypasses RLS — this is a Server Component, never sent to the client.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("positions")
    .select(`
      id,
      event_id,
      side,
      value_gross,
      cotacao,
      estimated_return,
      status,
      created_at,
      events ( title, deadline_at )
    `)
    .eq("user_id", MOCK_USER_ID)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[positions] query error:", error.message);
    return [];
  }

  return (data ?? []) as Position[];
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Compact formatter for summary cards — R$ 1,2M / R$ 342,5K / R$ 45,00 */
function formatBRLCompact(value: number): string {
  if (value >= 1_000_000_000) {
    return `R$ ${(value / 1_000_000_000).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}B`;
  }
  if (value >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`;
  }
  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}K`;
  }
  return formatBRL(value);
}

const STATUS_LABEL: Record<Position["status"], string> = {
  open:     "Aberta",
  won:      "Ganha",
  lost:     "Perdida",
  canceled: "Cancelada",
};

const STATUS_CLASS: Record<Position["status"], string> = {
  open:     "text-amber-400",
  won:      "text-emerald-400",
  lost:     "text-red-400",
  canceled: "text-[var(--text-muted)]",
};

export default async function PositionsPage() {
  const positions = await getPositions();

  const openPositions    = positions.filter((p) => p.status === "open");
  const totalInvested    = openPositions.reduce((s, p) => s + p.value_gross, 0);
  const totalEstimated   = openPositions.reduce((s, p) => s + p.estimated_return, 0);
  const won              = positions.filter((p) => p.status === "won").length;
  const resolved         = positions.filter((p) => p.status === "won" || p.status === "lost").length;
  const accuracy         = resolved > 0 ? Math.round((won / resolved) * 100) : null;

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-anton)] text-2xl text-[var(--text)]">Minhas posições</h1>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">Histórico e posições abertas</p>
        </div>
        <Link
          href="/events"
          className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-xs font-bold text-[var(--accent-fg)] shadow-[0_0_14px_rgba(168,85,247,0.25)] transition-all hover:opacity-90"
        >
          + Nova previsão
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-[var(--surface)] ring-1 ring-[var(--border)]">
        <div className="grid grid-cols-[2fr_70px_80px_80px_110px_80px_90px] items-center gap-3 border-b border-[var(--border)] px-5 py-3">
          {["Evento", "Lado", "Valor", "Cotação", "Retorno est.", "Prazo", "Status"].map((h) => (
            <p key={h} className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">{h}</p>
          ))}
        </div>

        {positions.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/20">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 14L7.5 9.5 11 13 17 6" stroke="var(--ring)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-muted)]">Nenhuma posição ainda</p>
              <p className="mt-1.5 max-w-xs text-xs leading-5 text-[var(--text-muted)]">
                Registre sua primeira previsão nos mercados abertos e acompanhe seus resultados aqui.
              </p>
            </div>
            <Link
              href="/events"
              className="mt-1 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-xs font-bold text-[var(--accent-fg)] shadow-[0_0_14px_rgba(168,85,247,0.25)] transition-all hover:opacity-90"
            >
              Explorar mercados
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {positions.map((p) => {
              const deadline = p.events?.deadline_at
                ? new Date(p.events.deadline_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
                : "—";

              return (
                <div
                  key={p.id}
                  className="grid grid-cols-[2fr_70px_80px_80px_110px_80px_90px] items-center gap-3 px-5 py-3.5"
                >
                  <p className="truncate text-xs font-semibold text-[var(--text-secondary)]">
                    {p.events?.title ?? p.event_id}
                  </p>
                  <span
                    className={`text-xs font-bold ${
                      p.side === "SIM" ? "text-emerald-400" : "text-orange-400"
                    }`}
                  >
                    {p.side}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">
                    {formatBRL(p.value_gross)}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">{p.cotacao}x</span>
                  <span className="text-xs font-semibold text-emerald-400">
                    {formatBRL(p.estimated_return)}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{deadline}</span>
                  <span className={`text-xs font-semibold ${STATUS_CLASS[p.status]}`}>
                    {STATUS_LABEL[p.status]}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Posições abertas",  value: String(openPositions.length) },
          { label: "Total investido",   value: formatBRLCompact(totalInvested) },
          { label: "Retorno potencial", value: formatBRLCompact(totalEstimated) },
          { label: "Taxa de acerto",    value: accuracy !== null ? `${accuracy}%` : "—" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-[var(--surface)] p-4 ring-1 ring-[var(--border)]">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">{s.label}</p>
            <p className="mt-1.5 font-[family-name:var(--font-anton)] text-xl text-[var(--text)]">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
