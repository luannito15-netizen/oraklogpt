import Image from "next/image";
import Link from "next/link";

import mulherChart from "../../../../assets/illustrations/image.png";
import { PublicNav, PublicFooter } from "@/components/ui/public-nav";
import { AdBanner } from "@/components/ui/ad-banner";

const mockRanking = [
  { pos: 1,  name: "Fernanda A.",   acertos: 47, total: 54, retorno: "R$ 4.320,00",  taxa: "87%", badge: "🥇" },
  { pos: 2,  name: "Ricardo M.",    acertos: 41, total: 50, retorno: "R$ 3.180,00",  taxa: "82%", badge: "🥈" },
  { pos: 3,  name: "Camila S.",     acertos: 38, total: 48, retorno: "R$ 2.640,00",  taxa: "79%", badge: "🥉" },
  { pos: 4,  name: "Marcos P.",     acertos: 35, total: 46, retorno: "R$ 1.920,00",  taxa: "76%", badge: ""   },
  { pos: 5,  name: "Ana L.",        acertos: 33, total: 44, retorno: "R$ 1.750,00",  taxa: "75%", badge: ""   },
  { pos: 6,  name: "Bruno T.",      acertos: 31, total: 43, retorno: "R$ 1.480,00",  taxa: "72%", badge: ""   },
  { pos: 7,  name: "Juliana R.",    acertos: 29, total: 41, retorno: "R$ 1.220,00",  taxa: "71%", badge: ""   },
  { pos: 8,  name: "Carlos E.",     acertos: 27, total: 39, retorno: "R$ 980,00",    taxa: "69%", badge: ""   },
  { pos: 9,  name: "Priscila N.",   acertos: 25, total: 38, retorno: "R$ 840,00",    taxa: "66%", badge: ""   },
  { pos: 10, name: "Gustavo F.",    acertos: 23, total: 36, retorno: "R$ 720,00",    taxa: "64%", badge: ""   },
];

const periods = ["Esta semana", "Este mês", "Todo o tempo"];
const categories = ["Todos", "Economia", "Clima", "Esportes", "Política"];

export default function RankingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <PublicNav />

      {/* ── Header ── */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface-elevated)] px-6 py-16 lg:px-8">
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-[var(--oraklo-color-primary)] opacity-[0.06] blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">Comunidade</p>
            <h1 className="mt-2 font-[family-name:var(--font-anton)] text-4xl text-[var(--text)] lg:text-5xl">
              Ranking de<br />previsores
            </h1>
            <p className="mt-3 max-w-md text-sm text-[var(--text-secondary)]">
              Os usuários com melhor taxa de acerto no ORAKLO. Dados atualizados após cada resolução.
            </p>
          </div>

          {/* Top 3 summary */}
          <div className="hidden lg:flex items-end gap-3">
            {/* 2nd */}
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-[var(--surface-elevated)] px-5 py-4 ring-1 ring-[var(--border)]" style={{ height: 130 }}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-elevated)] text-lg">🥈</div>
              <p className="text-xs font-semibold text-[var(--text-secondary)]">{mockRanking[1].name.split(" ")[0]}</p>
              <p className="text-xs text-[var(--text-muted)]">{mockRanking[1].taxa}</p>
            </div>
            {/* 1st */}
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-[var(--oraklo-color-primary)]/15 px-5 pb-4 pt-2 ring-2 ring-[var(--oraklo-color-primary)]/40 shadow-[0_0_24px_rgba(123,47,247,0.2)]" style={{ height: 155 }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--oraklo-color-primary)]/20 text-2xl">🥇</div>
              <p className="text-sm font-bold text-[var(--text)]">{mockRanking[0].name.split(" ")[0]}</p>
              <p className="text-xs font-semibold text-[var(--oraklo-color-primary-glow)]">{mockRanking[0].taxa}</p>
            </div>
            {/* 3rd */}
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-[var(--surface-elevated)] px-5 py-4 ring-1 ring-[var(--border)]" style={{ height: 115 }}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-elevated)] text-lg">🥉</div>
              <p className="text-xs font-semibold text-[var(--text-secondary)]">{mockRanking[2].name.split(" ")[0]}</p>
              <p className="text-xs text-[var(--text-muted)]">{mockRanking[2].taxa}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">

          {/* Ranking table */}
          <div>
            {/* Filters */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                {periods.map((p, i) => (
                  <button key={p}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      i === 0
                        ? "bg-[var(--oraklo-color-primary)]/20 text-[var(--oraklo-color-primary-glow)] ring-1 ring-[var(--oraklo-color-primary)]/30"
                        : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                    }`}>
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {categories.map((c, i) => (
                  <button key={c}
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] transition-all ${
                      i === 0
                        ? "bg-[var(--surface-elevated)] text-[var(--text)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                    }`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl bg-[var(--surface-elevated)] ring-1 ring-[var(--border)]">
              {/* Header */}
              <div className="grid grid-cols-[40px_1fr_80px_80px_100px] items-center gap-4 border-b border-[var(--border)] px-5 py-3">
                {["#", "Usuário", "Acertos", "Taxa", "Retorno"].map((h) => (
                  <p key={h} className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">{h}</p>
                ))}
              </div>

              {mockRanking.map((user, i) => (
                <div key={i}
                  className={`grid grid-cols-[40px_1fr_80px_80px_100px] items-center gap-4 px-5 py-4 transition-colors hover:bg-[var(--surface)] ${
                    i < mockRanking.length - 1 ? "border-b border-[var(--border)]" : ""
                  }`}>
                  <span className={`text-sm font-bold ${
                    user.pos <= 3
                      ? "text-[var(--oraklo-color-primary-glow)]"
                      : "text-[var(--text-muted)]"
                  }`}>
                    {user.badge || user.pos}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--oraklo-color-primary)] to-[var(--oraklo-color-primary-glow)] text-[10px] font-bold text-[var(--text)]">
                      {user.name[0]}
                    </div>
                    <span className="text-sm font-medium text-[var(--text)]">{user.name}</span>
                  </div>
                  <span className="text-sm text-[var(--text-secondary)]">{user.acertos}/{user.total}</span>
                  <span className={`text-sm font-bold ${
                    parseFloat(user.taxa) >= 80 ? "text-emerald-400" :
                    parseFloat(user.taxa) >= 70 ? "text-[var(--text)]" : "text-[var(--text-secondary)]"
                  }`}>
                    {user.taxa}
                  </span>
                  <span className="text-sm font-semibold text-[var(--text-secondary)]">{user.retorno}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[10px] text-[var(--text-muted)] text-center">
              Dados simulados. Ranking real será disponibilizado no lançamento.
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Você no ranking */}
            <div className="rounded-2xl bg-[var(--surface-elevated)] p-5 ring-1 ring-[var(--border)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">Sua posição</p>
              <div className="mt-4 flex flex-col items-center gap-3 py-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--oraklo-color-primary)]/15 ring-2 ring-[var(--oraklo-color-primary)]/20 text-xl font-bold text-[var(--oraklo-color-primary)]">
                  —
                </div>
                <p className="text-sm font-semibold text-[var(--text-secondary)]">Entre para o ranking</p>
                <p className="text-xs text-[var(--text-muted)]">Registre sua primeira previsão</p>
                <Link href="/mercados"
                  className="mt-2 inline-flex items-center rounded-full bg-[var(--oraklo-color-primary)] px-5 py-2 text-xs font-bold uppercase tracking-[0.06em] text-white shadow-[0_0_12px_rgba(123,47,247,0.3)] transition-all hover:bg-[var(--oraklo-color-primary-hover)]">
                  Começar agora
                </Link>
              </div>
            </div>

            {/* Banner publicitário — sidebar */}
            <AdBanner size="rectangle" />

            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0714] via-transparent to-transparent z-10" />
              <Image src={mulherChart} alt="Previsora de destaque" className="h-64 w-full object-cover object-top" />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <p className="text-xs font-bold text-[var(--text)]">
                  "Analisei o cenário e acertei 47 das últimas 54."
                </p>
                <p className="mt-1 text-[10px] text-[var(--text-muted)]">Fernanda A. · 1ª colocada</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
