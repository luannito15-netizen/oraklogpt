"use client";

import { useState } from "react";
import type { EventCardData } from "@/components/ui/event-card";
import { placePosition } from "@/lib/actions/place-position";
import type { PositionReceiptData } from "@/lib/actions/place-position";
import { ComprovantePrevisao } from "@/components/ui/comprovante-previsao";

const PLATFORM_FEE = 0.05;
const MIN_VALUE = 1;

function cotacao(percent: number) {
  if (percent <= 0) return 0;
  return parseFloat((0.95 / (percent / 100)).toFixed(2));
}

interface DecisionPanelProps {
  event: EventCardData;
}

export function DecisionPanel({ event }: DecisionPanelProps) {
  const [side, setSide] = useState<"SIM" | "NAO" | null>(null);
  const [rawValue, setRawValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [comprovanteData, setComprovanteData] = useState<PositionReceiptData | null>(null);

  const naoPercent = 100 - event.simPercent;
  const simCot = cotacao(event.simPercent);
  const naoCot = cotacao(naoPercent);
  const activeCot = side === "SIM" ? simCot : naoCot;

  const numValue = parseFloat(rawValue.replace(",", ".")) || 0;
  const fee = numValue * PLATFORM_FEE;
  const net = numValue - fee;
  const estimatedReturn = activeCot > 0 ? net * activeCot : 0;
  const profit = estimatedReturn - numValue;

  const canConfirm = side !== null && numValue >= MIN_VALUE;

  function handleClose() {
    setConfirmed(false);
    setComprovanteData(null);
    setSide(null);
  }

  return (
    <div className="sticky top-6 space-y-4">

      {/* ── Side selector ─────────────────────────────────── */}
      <div className="rounded-2xl bg-[#1a0f2e] p-5 ring-1 ring-white/10">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
          Escolha um lado
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {/* SIM */}
          <button
            onClick={() => setSide("SIM")}
            className={`group flex flex-col gap-2 rounded-xl p-4 ring-1 transition-all hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 ${
              side === "SIM"
                ? "bg-emerald-500/20 ring-emerald-500"
                : "bg-emerald-500/10 ring-emerald-500/20 hover:ring-emerald-500/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">SIM</span>
              <span className="text-[10px] text-emerald-400">▲</span>
            </div>
            <span className="text-xl font-black text-white">{simCot}</span>
            <span className="text-[10px] text-white/40">{event.simPercent}% no lado</span>
          </button>

          {/* NÃO */}
          <button
            onClick={() => setSide("NAO")}
            className={`group flex flex-col gap-2 rounded-xl p-4 ring-1 transition-all hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 ${
              side === "NAO"
                ? "bg-orange-500/20 ring-orange-500"
                : "bg-orange-500/10 ring-orange-500/20 hover:ring-orange-500/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-400">NÃO</span>
              <span className="text-[10px] text-orange-400">▼</span>
            </div>
            <span className="text-xl font-black text-white">{naoCot}</span>
            <span className="text-[10px] text-white/40">{naoPercent}% no lado</span>
          </button>
        </div>

        {/* Distribution bar */}
        <div className="mt-4">
          <div className="flex h-1.5 overflow-hidden rounded-full">
            <div className="bg-emerald-500 transition-all" style={{ width: `${event.simPercent}%` }} />
            <div className="flex-1 bg-orange-500/60" />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-white/30">
            <span>{event.simPercent}%</span>
            <span>{naoPercent}%</span>
          </div>
        </div>
      </div>

      {/* ── "Valide sua previsão" card ─────────────────────── */}
      <div className="rounded-2xl bg-[#1a0f2e] p-5 ring-1 ring-white/10">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
          Valide sua previsão
        </p>

        {side ? (
          <p className="mt-2 text-sm text-white/80">
            Você escolheu{" "}
            <strong className={side === "SIM" ? "text-emerald-400" : "text-orange-400"}>
              {side} ({activeCot})
            </strong>
          </p>
        ) : (
          <p className="mt-2 text-sm text-white/40">Escolha um lado acima</p>
        )}

        {/* Value input */}
        <div className="mt-4 space-y-1.5">
          <label htmlFor="amount" className="text-xs font-semibold text-white/60">
            Valor da participação
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-white/40">
              R$
            </span>
            <input
              id="amount"
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              value={rawValue}
              onChange={(e) => setRawValue(e.target.value)}
              className="h-12 w-full rounded-xl bg-white/8 pl-9 pr-3 text-sm font-bold text-white outline-none ring-1 ring-white/15 transition-all placeholder:text-white/25 focus:bg-white/12 focus:ring-[var(--oraklo-color-primary)]"
            />
          </div>
          {numValue > 0 && numValue < MIN_VALUE && (
            <p className="text-[10px] text-orange-400">Mínimo: R$ {MIN_VALUE},00</p>
          )}
        </div>

        {/* You can review below */}
        {side && numValue >= MIN_VALUE && (
          <p className="mt-2 text-[10px] text-white/35">
            Você pode revisar abaixo antes de confirmar.
          </p>
        )}

        {/* Summary */}
        {side && numValue >= MIN_VALUE && (
          <div className="mt-4 space-y-2 rounded-xl bg-white/5 p-3 text-xs">
            <div className="flex justify-between">
              <span className="text-white/45">Valor</span>
              <span className="font-semibold text-white">R$ {numValue.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/45">Taxa (5%)</span>
              <span className="text-white/45">− R$ {fee.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/45">Cotação {side}</span>
              <span className="font-semibold text-white">{activeCot}×</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2">
              <span className="font-semibold text-white">Retorno estimado</span>
              <span className="font-bold text-emerald-400">
                R$ {estimatedReturn.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/45">Lucro potencial</span>
              <span className={`font-bold ${profit >= 0 ? "text-emerald-400" : "text-orange-400"}`}>
                {profit >= 0 ? "+" : ""}R$ {profit.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          disabled={!canConfirm || loading}
          onClick={async () => {
            if (!side) return;
            setLoading(true);
            setSubmitError(null);
            const result = await placePosition(event.id, side, numValue);
            setLoading(false);
            if (result.success) {
              setComprovanteData(result.data);
              setConfirmed(true);
            } else {
              setSubmitError(result.error);
            }
          }}
          className="mt-4 w-full rounded-xl bg-amber-500 py-3 text-sm font-bold uppercase tracking-[0.06em] text-white transition-all active:scale-[0.97] transition-transform duration-100 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {loading ? "Aguardando..." : "Validar minha previsão"}
        </button>
        {submitError && (
          <p className="mt-2 text-center text-[11px] text-red-400">{submitError}</p>
        )}

        <p className="mt-3 text-center text-[10px] text-white/25">
          Ao confirmar, você concorda com os termos de uso.
        </p>
      </div>

      {/* ── Transparency checklist ─────────────────────────── */}
      <div className="rounded-2xl bg-[#1a0f2e] p-4 ring-1 ring-white/10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/35">
          Antes de confirmar, você viu
        </p>
        <ul className="mt-3 space-y-2">
          {[
            "Pergunta do evento",
            "Lado escolhido",
            "Valor da participação",
            "Taxa aplicada (5%)",
            "Cotação atual",
            "Retorno estimado",
            "Fonte de validação",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-white/40">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className="shrink-0">
                <path d="M2 5l2.5 2.5L8 3" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Comprovante modal overlay ──────────────────────── */}
      {confirmed && comprovanteData && side && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md" onClick={handleClose} />

          {/* Modal wrapper */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Outer card — single unit, two columns inside */}
            <div className="relative w-full max-w-[780px] max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl shadow-black/60 flex flex-col sm:flex-row ring-1 ring-white/10">

              {/* Close button — floated above entire card */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Fechar"
                className="absolute top-4 right-4 z-20 rounded-full bg-black/40 p-2 text-white/50 hover:bg-black/60 hover:text-white transition-colors backdrop-blur-sm"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* LEFT — Comprovante */}
              <div className="flex-1 min-w-0 bg-[#130a24]">
                <ComprovantePrevisao
                  eventTitle={event.title}
                  eventCategory={event.category}
                  eventSource={event.source}
                  eventDeadline={event.deadline}
                  positionId={comprovanteData!.positionId}
                  side={side}
                  amount={numValue}
                  fee={comprovanteData!.fee}
                  cotacao={comprovanteData!.cotacao}
                  estimatedReturn={comprovanteData!.estimatedReturn}
                  registeredAt={new Date()}
                />
              </div>

              {/* RIGHT — Banner */}
              <div className="w-full sm:w-[260px] shrink-0 bg-gradient-to-b from-[#3b0d8f] via-[#2a0a6b] to-[#1a0f2e] flex flex-col justify-between p-7 border-t sm:border-t-0 sm:border-l border-white/[0.07]">

                {/* Top content */}
                <div className="space-y-4">
                  <span className="inline-block rounded-full bg-violet-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-300">
                    Para você
                  </span>
                  <p className="text-xl font-black text-white leading-snug">
                    Mais eventos aguardam sua previsão
                  </p>
                  <p className="text-sm text-white/50 leading-relaxed">
                    Explore outros mercados abertos e expanda seu histórico de previsões.
                  </p>
                </div>

                {/* Middle decoration */}
                <div className="my-8 hidden sm:block">
                  {/* Abstract decorative grid of "event preview" placeholders */}
                  <div className="space-y-2">
                    {[
                      { label: "Eleições 2026", pct: 63 },
                      { label: "Copa do Brasil", pct: 41 },
                      { label: "IBGE — Inflação", pct: 55 },
                    ].map(({ label, pct }) => (
                      <div key={label} className="rounded-xl bg-white/5 px-3 py-2.5 ring-1 ring-white/8">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-semibold text-white/70 truncate pr-2">{label}</span>
                          <span className="text-[11px] font-bold text-violet-300 shrink-0">{pct}%</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                          {/* eslint-disable-next-line react/forbid-component-props -- runtime-computed width, cannot use static Tailwind class */}
                          <div className="h-full rounded-full bg-violet-400/60" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-center text-[10px] text-white/25">Eventos ilustrativos</p>
                </div>

                {/* Bottom CTA */}
                <div className="space-y-3">
                  <a
                    href="/events"
                    className="block w-full rounded-2xl bg-violet-600 py-3 text-center text-sm font-bold text-white hover:bg-violet-500 active:scale-[0.98] transition-all"
                  >
                    Explorar mercados
                  </a>
                  <a
                    href="/events"
                    className="block text-center text-xs text-white/35 hover:text-white/60 transition-colors"
                  >
                    Ver todas as previsões →
                  </a>
                </div>

              </div>

            </div>
          </div>
        </>
      )}

    </div>
  );
}
