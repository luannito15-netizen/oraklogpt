"use client";

import { useState, useEffect } from "react";

interface DigitalCountdownProps {
  deadlineAt: string; // ISO 8601
  className?: string;
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export function DigitalCountdown({ deadlineAt, className = "" }: DigitalCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(deadlineAt));

  useEffect(() => {
    setTimeLeft(calcTimeLeft(deadlineAt));
    const id = setInterval(() => setTimeLeft(calcTimeLeft(deadlineAt)), 1000);
    return () => clearInterval(id);
  }, [deadlineAt]);

  const { hours, minutes, seconds, expired } = timeLeft;

  if (expired) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-black/60 px-4 py-2 ${className}`}>
        <span className="font-mono text-sm font-black tracking-widest text-red-400">ENCERRADO</span>
      </div>
    );
  }

  return (
    <div className={`flex items-stretch gap-1 ${className}`}>
      <DigitBlock value={pad(hours)} label="HRS" />
      <Colon />
      <DigitBlock value={pad(minutes)} label="MIN" />
      <Colon />
      <DigitBlock value={pad(seconds)} label="SEG" />
    </div>
  );
}

function DigitBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex gap-0.5">
        {value.split("").map((d, i) => (
          <div
            key={i}
            className="flex h-8 w-6 items-center justify-center rounded-md bg-black/70 ring-1 ring-white/10 backdrop-blur-sm"
          >
            <span className="font-mono text-base font-black leading-none tabular-nums text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]">
              {d}
            </span>
          </div>
        ))}
      </div>
      <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/40">{label}</span>
    </div>
  );
}

function Colon() {
  return (
    <div className="flex flex-col items-center justify-center pb-3">
      <span className="font-mono text-base font-black text-amber-300/60 animate-pulse">:</span>
    </div>
  );
}

function calcTimeLeft(deadlineAt: string) {
  const diff = new Date(deadlineAt).getTime() - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };
  const totalSeconds = Math.floor(diff / 1000);
  return {
    hours:   Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: false,
  };
}
