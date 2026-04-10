"use client";

import { useState } from "react";

interface DataPoint {
  time: string;
  sim: number; // 0–100
}

interface ProbabilityChartProps {
  data: DataPoint[];
  height?: number;
}

const W = 600;
const H = 200;
const PAD = { top: 16, right: 52, bottom: 28, left: 8 };

function toSVGPoints(data: DataPoint[], key: "sim" | "nao") {
  const n = data.length;
  return data
    .map((d, i) => {
      const x = PAD.left + (i / (n - 1)) * (W - PAD.left - PAD.right);
      const val = key === "sim" ? d.sim : 100 - d.sim;
      const y = PAD.top + ((100 - val) / 100) * (H - PAD.top - PAD.bottom);
      return `${x},${y}`;
    })
    .join(" ");
}

function toAreaPath(data: DataPoint[], key: "sim" | "nao") {
  const n = data.length;
  const pts = data.map((d, i) => {
    const x = PAD.left + (i / (n - 1)) * (W - PAD.left - PAD.right);
    const val = key === "sim" ? d.sim : 100 - d.sim;
    const y = PAD.top + ((100 - val) / 100) * (H - PAD.top - PAD.bottom);
    return { x, y };
  });
  const bottom = H - PAD.bottom;
  const start = pts[0];
  const end = pts[pts.length - 1];
  return (
    `M${start.x},${bottom} ` +
    pts.map((p) => `L${p.x},${p.y}`).join(" ") +
    ` L${end.x},${bottom} Z`
  );
}

const Y_TICKS = [0, 25, 50, 75, 100];

export function ProbabilityChart({ data, height = H }: ProbabilityChartProps) {
  const [hover, setHover] = useState<number | null>(null);
  const n = data.length;

  const hoverX =
    hover !== null
      ? PAD.left + (hover / (n - 1)) * (W - PAD.left - PAD.right)
      : null;
  const hoverSim = hover !== null ? data[hover].sim : null;
  const hoverNao = hover !== null ? 100 - data[hover].sim : null;

  return (
    <div className="relative select-none">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height }}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="simGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="naoGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {Y_TICKS.map((t) => {
          const y = PAD.top + ((100 - t) / 100) * (H - PAD.top - PAD.bottom);
          return (
            <g key={t}>
              <line
                x1={PAD.left}
                y1={y}
                x2={W - PAD.right}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
              />
              <text
                x={W - PAD.right + 6}
                y={y + 4}
                fontSize="9"
                fill="rgba(255,255,255,0.3)"
              >
                {t}%
              </text>
            </g>
          );
        })}

        {/* Area fills */}
        <path d={toAreaPath(data, "sim")} fill="url(#simGrad)" />
        <path d={toAreaPath(data, "nao")} fill="url(#naoGrad)" />

        {/* Lines */}
        <polyline
          points={toSVGPoints(data, "sim")}
          fill="none"
          stroke="#4ade80"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <polyline
          points={toSVGPoints(data, "nao")}
          fill="none"
          stroke="#fb923c"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray="5 3"
        />

        {/* Time labels */}
        {data
          .filter((_, i) => i % Math.floor(n / 5) === 0 || i === n - 1)
          .map((d, idx) => {
            const origIdx = data.indexOf(d);
            const x = PAD.left + (origIdx / (n - 1)) * (W - PAD.left - PAD.right);
            return (
              <text
                key={idx}
                x={x}
                y={H - 4}
                fontSize="9"
                fill="rgba(255,255,255,0.25)"
                textAnchor="middle"
              >
                {d.time}
              </text>
            );
          })}

        {/* Hover interaction area */}
        {data.map((_, i) => {
          const x = PAD.left + (i / (n - 1)) * (W - PAD.left - PAD.right);
          return (
            <rect
              key={i}
              x={x - W / (2 * n)}
              y={0}
              width={W / n}
              height={H}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
            />
          );
        })}

        {/* Hover line + dots */}
        {hoverX !== null && hover !== null && (
          <>
            <line
              x1={hoverX}
              y1={PAD.top}
              x2={hoverX}
              y2={H - PAD.bottom}
              stroke="rgba(255,255,255,0.2)"
              strokeDasharray="3 3"
            />
            {/* SIM dot */}
            {(() => {
              const sy = PAD.top + ((100 - data[hover].sim) / 100) * (H - PAD.top - PAD.bottom);
              return (
                <circle cx={hoverX} cy={sy} r={4} fill="#4ade80" stroke="#0d0714" strokeWidth="2" />
              );
            })()}
            {/* NÃO dot */}
            {(() => {
              const ny = PAD.top + (data[hover].sim / 100) * (H - PAD.top - PAD.bottom);
              return (
                <circle cx={hoverX} cy={ny} r={3.5} fill="#fb923c" stroke="#0d0714" strokeWidth="2" />
              );
            })()}
          </>
        )}
      </svg>

      {/* Hover tooltip */}
      {hover !== null && hoverSim !== null && (
        <div className="pointer-events-none absolute left-4 top-2 rounded-xl bg-white/8 px-3 py-2 text-xs backdrop-blur-sm ring-1 ring-white/10">
          <p className="text-white/40">{data[hover].time}</p>
          <div className="mt-1 flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="font-bold text-emerald-400">SIM {hoverSim}%</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              <span className="font-bold text-orange-400">NÃO {hoverNao}%</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Mock data generator ────────────────────────────────────────────────────

export function generateMockHistory(
  basePercent: number,
  points = 48
): DataPoint[] {
  const times: string[] = [];
  for (let i = 0; i < points; i++) {
    const h = 6 + Math.floor((i * 18) / points);
    const m = Math.floor(((i * 18 * 60) / points) % 60);
    times.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }

  let current = basePercent + (Math.random() - 0.5) * 20;
  return times.map((time) => {
    current = Math.max(5, Math.min(95, current + (Math.random() - 0.48) * 4));
    return { time, sim: Math.round(current) };
  });
}
