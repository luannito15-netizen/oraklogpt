"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface ChartPoint {
  price_sim: number;   // 0–1
  recorded_at: string; // ISO timestamp
}

interface EventChartProps {
  eventId: string;
  initialPrice: number; // 0–1
}

// SVG viewport dimensions
const W = 600;
const H = 120;
const PAD_LEFT = 38;
const PAD_RIGHT = 12;
const PAD_TOP = 10;
const PAD_BOTTOM = 10;

const CHART_W = W - PAD_LEFT - PAD_RIGHT;
const CHART_H = H - PAD_TOP - PAD_BOTTOM;

function buildPath(points: ChartPoint[]): { linePath: string; fillPath: string } {
  if (points.length < 2) return { linePath: "", fillPath: "" };

  const times = points.map((p) => new Date(p.recorded_at).getTime());
  const tMin = times[0];
  const tMax = times[times.length - 1];
  const tRange = tMax - tMin || 1;

  const coords = points.map((p, i) => {
    const x = PAD_LEFT + (times[i] - tMin) / tRange * CHART_W;
    const y = PAD_TOP + (1 - p.price_sim) * CHART_H;
    return { x, y };
  });

  const line = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(2)} ${c.y.toFixed(2)}`)
    .join(" ");

  const fill =
    line +
    ` L ${coords[coords.length - 1].x.toFixed(2)} ${(PAD_TOP + CHART_H).toFixed(2)}` +
    ` L ${coords[0].x.toFixed(2)} ${(PAD_TOP + CHART_H).toFixed(2)} Z`;

  return { linePath: line, fillPath: fill };
}

export function EventChart({ eventId, initialPrice }: EventChartProps) {
  const [points, setPoints] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  // One stable client instance per component mount — shared by both effects.
  const supabase = useMemo(() => createClient(), []);

  // Fetch initial market_history on mount
  useEffect(() => {
    let cancelled = false;

    async function fetchHistory() {
      const { data, error } = await supabase
        .from("market_history")
        .select("price_sim, volume_at_point, recorded_at")
        .eq("event_id", eventId)
        .order("recorded_at", { ascending: true });

      if (cancelled) return;
      if (!error && data) {
        setPoints(
          data.map((row) => ({
            price_sim: row.price_sim as number,
            recorded_at: row.recorded_at as string,
          }))
        );
      }
      setLoading(false);
    }

    fetchHistory();
    return () => { cancelled = true; };
  }, [eventId, supabase]);

  // Subscribe to new market_history inserts for live chart growth
  useEffect(() => {
    const channel = supabase
      .channel(`chart:${eventId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "market_history",
          filter: `event_id=eq.${eventId}`,
        },
        (payload) => {
          const row = payload.new as { price_sim: number; recorded_at: string };
          setPoints((prev) => [
            ...prev,
            { price_sim: row.price_sim, recorded_at: row.recorded_at },
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId, supabase]);

  // Derive display state
  const hasData = points.length >= 2;
  const currentPrice = hasData
    ? points[points.length - 1].price_sim
    : initialPrice;
  const currentPercent = Math.round(currentPrice * 100);
  const isUp = currentPrice >= 0.5;
  // SVG presentation attributes (not CSS style props) — these are fine
  const color = isUp ? "#10b981" : "#f97316";

  // Compute SVG path
  const { linePath, fillPath } = hasData
    ? buildPath(points)
    : { linePath: "", fillPath: "" };

  // Last dot position
  let dotX = PAD_LEFT + CHART_W;
  let dotY = PAD_TOP + (1 - currentPrice) * CHART_H;
  if (hasData) {
    const times = points.map((p) => new Date(p.recorded_at).getTime());
    const tMin = times[0];
    const tMax = times[times.length - 1];
    const tRange = tMax - tMin || 1;
    const last = points[points.length - 1];
    dotX = PAD_LEFT + ((new Date(last.recorded_at).getTime() - tMin) / tRange) * CHART_W;
    dotY = PAD_TOP + (1 - last.price_sim) * CHART_H;
  }

  return (
    <div className="rounded-2xl bg-[#1a0f2e] p-5 ring-1 ring-white/8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/30">
            Cotação ao longo do tempo
          </p>
          <p className="mt-0.5 text-xs text-white/50">
            {hasData ? `${points.length} pontos` : "Aguardando movimentos"}
          </p>
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

      {/* Chart area */}
      <div className="relative h-40 w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <span className="text-[10px] text-white/20">Carregando histórico...</span>
          </div>
        ) : (
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="h-full w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id={`fill-${eventId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.15" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Y axis gridlines and labels */}
            {[
              { pct: 100, y: PAD_TOP },
              { pct: 50,  y: PAD_TOP + CHART_H / 2 },
              { pct: 0,   y: PAD_TOP + CHART_H },
            ].map(({ pct, y }) => (
              <g key={pct}>
                <line
                  x1={PAD_LEFT}
                  y1={y}
                  x2={W - PAD_RIGHT}
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
                <text
                  x={PAD_LEFT - 4}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="9"
                  fill="rgba(255,255,255,0.25)"
                >
                  {pct}%
                </text>
              </g>
            ))}

            {hasData ? (
              <>
                {/* Fill area */}
                <path
                  d={fillPath}
                  fill={`url(#fill-${eventId})`}
                />
                {/* Line */}
                <path
                  d={linePath}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {/* End dot */}
                <circle cx={dotX} cy={dotY} r="4" fill={color} />
                <circle cx={dotX} cy={dotY} r="7" fill={color} fillOpacity="0.2" />
              </>
            ) : (
              <>
                {/* Flat 50% line when no data */}
                <line
                  x1={PAD_LEFT}
                  y1={PAD_TOP + CHART_H / 2}
                  x2={W - PAD_RIGHT}
                  y2={PAD_TOP + CHART_H / 2}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <text
                  x={W / 2}
                  y={PAD_TOP + CHART_H / 2 - 8}
                  textAnchor="middle"
                  fontSize="9"
                  fill="rgba(255,255,255,0.25)"
                >
                  Aguardando movimentos
                </text>
              </>
            )}
          </svg>
        )}

        {/* Current price badge */}
        {!loading && (
          <div
            className={[
              "absolute right-2 top-1 flex items-center gap-1 rounded-full px-2 py-0.5",
              isUp
                ? "bg-emerald-500/10 ring-1 ring-emerald-500/25"
                : "bg-orange-500/10 ring-1 ring-orange-500/25",
            ].join(" ")}
          >
            <span
              className={[
                "h-1.5 w-1.5 rounded-full",
                isUp ? "bg-emerald-400" : "bg-orange-400",
              ].join(" ")}
            />
            <span
              className={[
                "text-[10px] font-bold",
                isUp ? "text-emerald-400" : "text-orange-400",
              ].join(" ")}
            >
              {currentPercent}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
