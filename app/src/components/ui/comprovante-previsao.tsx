"use client";

import { useState } from "react";
import Image from "next/image";
import logoOraklo from "../../../assets/icons/logo-oraklo.svg";

interface ComprovantePrevisaoProps {
  // Event data
  eventTitle: string;
  eventCategory: string;
  eventSource: string;
  eventDeadline: string; // already formatted, e.g. "2 dias"

  // Position data (from RPC response)
  positionId: string;
  side: "SIM" | "NAO";
  amount: number; // value_gross in BRL
  fee: number;
  cotacao: number; // e.g. 1.85
  estimatedReturn: number; // in BRL

  // Timing
  registeredAt: Date;
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatCotacao(value: number): string {
  return (
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "×"
  );
}

function formatDateTime(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "jan", "fev", "mar", "abr", "mai", "jun",
    "jul", "ago", "set", "out", "nov", "dez",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} ${month} ${year} · ${hours}:${minutes}`;
}

function truncateId(id: string): string {
  if (id.length <= 8) return id;
  return `#${id.slice(0, 4)}...${id.slice(-4)}`;
}

function buildShareText(props: ComprovantePrevisaoProps): string {
  return [
    `ORAKLO — Comprovante de Previsão`,
    ``,
    `Evento: ${props.eventTitle}`,
    `Previsão: ${props.side}`,
    `Valor: ${formatBRL(props.amount)}`,
    `Cotação: ${formatCotacao(props.cotacao)}`,
    `Retorno estimado: ${formatBRL(props.estimatedReturn)}`,
    `ID: ${truncateId(props.positionId)}`,
    ``,
    `Previsão registrada e auditável pelo ORAKLO.`,
  ].join("\n");
}

// ── Inline SVG icons ──────────────────────────────────────────────────────────

function IconWallet() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-white/30">
      <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1 6h12" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="10" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

function IconPercent() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-white/30">
      <circle cx="4" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="10" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11 3L3 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconTrend() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-white/30">
      <path d="M1 10l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 4h3v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-white/30">
      <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3 3l1.5 1.5M9.5 9.5L11 11M11 3l-1.5 1.5M4.5 9.5L3 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-white/30">
      <rect x="1" y="2.5" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1 6h12M4.5 1v3M9.5 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-white/30">
      <path d="M7 1l5 2v4c0 3-2.5 5.5-5 6-2.5-.5-5-3-5-6V3L7 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mr-1.5 shrink-0">
      <circle cx="9" cy="2" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="9" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="2" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7.5 2.75L3.5 5.25M7.5 9.25L3.5 6.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ComprovantePrevisao(props: ComprovantePrevisaoProps) {
  const {
    eventTitle,
    eventCategory,
    eventSource,
    eventDeadline,
    positionId,
    side,
    amount,
    fee,
    cotacao,
    estimatedReturn,
    registeredAt,
  } = props;

  const [shareLabel, setShareLabel] = useState("Compartilhar");

  async function handleShare() {
    const text = buildShareText(props);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Comprovante ORAKLO", text });
        return;
      } catch {
        // fall through to clipboard
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setShareLabel("Copiado!");
      setTimeout(() => setShareLabel("Compartilhar"), 2000);
    }
  }

  const isSim = side === "SIM";

  return (
    <div className="overflow-hidden h-full flex flex-col bg-[#130a24]">
      {/* ── Card ──────────────────────────────────────────────── */}

        {/* Header strip */}
        <div className="bg-gradient-to-br from-[#2d1060] to-[#1a0f2e] px-6 py-6 border-b border-white/10">
          <Image
            src={logoOraklo}
            alt="ORAKLO"
            sizes="(max-width: 768px) 160px, 200px"
            className="h-8 w-auto brightness-0 invert"
            priority
          />
          <p className="mt-2 text-sm font-semibold text-violet-400 tracking-wide">
            Comprovante de Previsão
          </p>
          <p className="mt-0.5 text-xs text-white/40 tabular-nums">
            {formatDateTime(registeredAt)}
          </p>
        </div>

        {/* Body */}
        <div className="px-5 pt-5 pb-0">

          {/* Event block */}
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
            Evento
          </p>
          <p className="mt-1.5 text-xl font-black text-white leading-tight line-clamp-2">
            {eventTitle}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full ring-1 ring-white/15 px-2 py-0.5 text-[10px] text-white/50 uppercase tracking-wide">
              {eventCategory}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-white/50">
            Encerra em {eventDeadline}
          </p>

          {/* Side badge */}
          <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
            Previsão Registrada
          </p>
          <div
            className={`mt-2 w-full rounded-xl py-3 flex items-center justify-center gap-3 ${
              isSim
                ? "bg-emerald-500/20 ring-1 ring-emerald-500/40"
                : "bg-orange-500/20 ring-1 ring-orange-500/40"
            }`}
          >
            {isSim ? (
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none" className={isSim ? "text-emerald-400" : "text-orange-400"}>
                <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <path d="M8 14l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none" className="text-orange-400">
                <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <path d="M9 9l10 10M19 9L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
            <span
              className={`text-xl font-black tracking-widest ${
                isSim ? "text-emerald-400" : "text-orange-400"
              }`}
            >
              {side}
            </span>
          </div>

        </div>

        {/* Dashed separator */}
        <div className="mx-5 mt-5 border-t border-dashed border-white/15" />

        {/* Financial breakdown */}
        <div className="px-5 py-4 space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-xs text-white/45">
              <IconWallet />
              Valor registrado
            </span>
            <span className="text-xs font-semibold text-white tabular-nums">
              {formatBRL(amount)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-xs text-white/45">
              <IconPercent />
              Taxa plataforma
            </span>
            <span className="text-xs text-white/45 tabular-nums">
              {formatBRL(fee)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-xs text-white/45">
              <IconTrend />
              Cotação
            </span>
            <span className="text-xs font-semibold text-[#a78bfa] tabular-nums">
              {formatCotacao(cotacao)}
            </span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-white/10">
            <span className="flex items-center gap-2 text-xs text-white/80 font-semibold">
              <IconSparkle />
              Retorno estimado
            </span>
            <span className="text-base font-black text-emerald-400 tabular-nums">
              {formatBRL(estimatedReturn)}
            </span>
          </div>
        </div>

        {/* Dashed separator */}
        <div className="mx-5 border-t border-dashed border-white/15" />

        {/* Event metadata */}
        <div className="px-5 py-4 space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-xs text-white/45">
              <IconCalendar />
              Prazo do evento
            </span>
            <span className="text-xs font-semibold text-white">
              em {eventDeadline}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-xs text-white/45">
              <IconShield />
              Fonte de validação
            </span>
            <span className="text-xs font-semibold text-white uppercase tracking-wide">
              {eventSource}
            </span>
          </div>
        </div>

        {/* Bottom strip — status, ID, tagline, and action buttons */}
        <div className="border-t border-white/[0.08] px-5 py-4">
          {/* Status pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 ring-1 ring-amber-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-medium text-amber-400">Aguardando resultado</span>
          </div>

          {/* Position ID */}
          <p className="mt-3 font-mono text-xs text-white/40">
            <span className="text-violet-500/70">#</span>
            {truncateId(positionId).replace(/^#/, "")}
          </p>

          {/* Tagline */}
          <p className="mt-3 text-center text-[11px] italic text-white/30 leading-relaxed">
            &ldquo;Previsão registrada e auditável pelo ORAKLO.&rdquo;
          </p>

          {/* Action buttons */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleShare}
              className="w-full rounded-xl py-2.5 text-xs font-semibold text-white/70 ring-1 ring-white/15 transition-all hover:ring-white/30 hover:text-white flex items-center justify-center"
            >
              <IconShare />
              {shareLabel}
            </button>
          </div>

          <a
            href="/events"
            className="mt-2 block text-center text-sm text-white/40 hover:text-white/70 underline underline-offset-4 transition-colors"
          >
            Ver outras previsões →
          </a>
        </div>

    </div>
  );
}
