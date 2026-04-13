"use client";

// Portfolio sparkline — pure SVG, no deps
const W = 600;
const H = 120;
const PAD = { top: 12, right: 8, bottom: 24, left: 8 };

// Mock portfolio value over 30 days (empty → flat at 0)
const mockPortfolioData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: 0,
}));

const labels = ["Dia 1", "Dia 7", "Dia 14", "Dia 21", "Dia 30"];
const labelIdxs = [0, 6, 13, 20, 29];

export function DashboardChart() {
  const maxVal = Math.max(...mockPortfolioData.map((d) => d.value), 1);
  const n = mockPortfolioData.length;

  const pts = mockPortfolioData.map((d, i) => {
    const x = PAD.left + (i / (n - 1)) * (W - PAD.left - PAD.right);
    const y = PAD.top + ((maxVal - d.value) / maxVal) * (H - PAD.top - PAD.bottom);
    return { x, y };
  });

  const lineD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaD =
    `M${pts[0].x},${H - PAD.bottom} ` +
    pts.map((p) => `L${p.x},${p.y}`).join(" ") +
    ` L${pts[pts.length - 1].x},${H - PAD.bottom} Z`;

  const isEmpty = mockPortfolioData.every((d) => d.value === 0);

  if (isEmpty) {
    return (
      <div className="flex h-48 flex-col items-center justify-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-20" style={{ animationDuration: "2s" }} />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--accent)_30%,transparent)]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--accent)" strokeWidth="1.5">
              <path d="M3 14l4-5 3.5 3 4-6 3 2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <p className="text-xs font-semibold text-[var(--text-muted)]">Nenhuma previsão ainda</p>
        <p className="text-[10px] text-[var(--text-muted)] max-w-[200px] text-center">Registre sua primeira previsão para ver seu histórico aqui</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Y grid */}
      <div className="absolute inset-0 flex flex-col justify-between pb-6 pt-3 pointer-events-none">
        {[100, 75, 50, 25, 0].map((v) => (
          <div key={v} className="flex items-center gap-2">
            <span className="w-10 text-right text-[9px] text-[var(--text-muted)] hidden">R${v}</span>
            <div className="flex-1 border-t border-[var(--border)]" />
          </div>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 120 }}>
        <defs>
          <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = PAD.top + t * (H - PAD.top - PAD.bottom);
          return (
            <line
              key={t}
              x1={PAD.left}
              y1={y}
              x2={W - PAD.right}
              y2={y}
              stroke="rgba(68,53,88,0.3)"
            />
          );
        })}

        {/* Area + line */}
        <path d={areaD} fill="url(#portfolioGrad)" />
        <path d={lineD} fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* End dot — only shown when there's data */}
        <circle
          cx={pts[pts.length - 1].x}
          cy={pts[pts.length - 1].y}
          r="4"
          fill="#a855f7"
          stroke="#0B0710"
          strokeWidth="2"
        />

        {/* X labels */}
        {labelIdxs.map((idx, li) => (
          <text
            key={li}
            x={pts[idx].x}
            y={H - 4}
            fontSize="9"
            fill="rgba(184,174,202,0.5)"
            textAnchor="middle"
          >
            {labels[li]}
          </text>
        ))}
      </svg>
    </div>
  );
}
