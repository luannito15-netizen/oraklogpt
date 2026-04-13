"use client";

import { useEffect, useCallback } from "react";
import type { EventCardData } from "@/components/ui/event-card";
import { DecisionPanel } from "@/components/ui/decision-panel";
import { IconX, IconInfo } from "@/components/ui/icons";

const categoryStyle: Record<string, { bg: string; text: string }> = {
  Clima:    { bg: "bg-sky-500",     text: "text-white" },
  Economia: { bg: "bg-violet-600",  text: "text-white" },
  Esportes: { bg: "bg-emerald-500", text: "text-white" },
  Política: { bg: "bg-amber-500",   text: "text-white" },
};

function getCategoryStyle(cat: string) {
  return categoryStyle[cat] ?? { bg: "bg-[var(--border)]", text: "text-[var(--text)]" };
}

interface EventDrawerProps {
  event: EventCardData | null;
  onClose: () => void;
}

export function EventDrawer({ event, onClose }: EventDrawerProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!event) return;
    document.addEventListener("keydown", handleKeyDown);
    // Prevent scroll on body while drawer is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [event, handleKeyDown]);

  if (!event) return null;

  const catStyle = getCategoryStyle(event.category);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--bg)] ring-1 ring-[var(--border)] shadow-2xl shadow-black/60"
          role="dialog"
          aria-modal="true"
          aria-label={event.title}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-[var(--border)] bg-[var(--bg)] px-5 py-4">
            <div className="min-w-0 flex-1">
              <span
                className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${catStyle.bg} ${catStyle.text}`}
              >
                {event.category}
              </span>
              <p className="mt-2 text-sm font-semibold leading-snug text-[var(--text)] line-clamp-3">
                {event.title}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-4 right-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--text-muted)] ring-1 ring-[var(--border)] transition-all hover:bg-[var(--surface-elevated)] hover:text-[var(--text)]"
            >
              <IconX className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-4 px-5 py-5">
            {/* Critério de validação */}
            <div className="rounded-2xl bg-[var(--surface)] p-5 ring-1 ring-[var(--border)]">
              <h2 className="text-sm font-semibold text-[var(--text)]">Critério de validação</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                O resultado será apurado com base em dados oficiais divulgados por{" "}
                <strong className="text-[var(--text)]">{event.source}</strong>. A resolução
                ocorre em até 24h após a divulgação do resultado oficial.
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-[var(--input-bg)] px-3 py-2.5 ring-1 ring-[var(--border)]">
                <IconInfo className="h-4 w-4 shrink-0 text-[var(--ring)]" />
                <span className="text-xs text-[var(--text-muted)]">
                  Fonte oficial:{" "}
                  <span className="font-semibold text-[var(--text-secondary)]">{event.source}</span>
                </span>
              </div>
            </div>

            {/* Decision panel */}
            <DecisionPanel event={event} />
          </div>
        </div>
      </div>
    </>
  );
}
