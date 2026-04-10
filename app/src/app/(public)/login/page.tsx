"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logoOraklo from "../../../../assets/icons/logo-oraklo.svg";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 2l12 12M6.5 6.6A2 2 0 0010.4 10M4.2 4.3C2.3 5.5 1 8 1 8s2.5 5 7 5c1.4 0 2.7-.4 3.8-1M7 3.1C7.3 3 7.7 3 8 3c4.5 0 7 5 7 5s-.7 1.4-2 2.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors,   setErrors]   = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [loading,  setLoading]  = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Email inválido";
    if (!password)                      e.password = "Senha obrigatória";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setApiError("");
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/api/v1/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setApiError(data.message ?? "Credenciais inválidas");
        return;
      }

      if (data.data?.token) {
        localStorage.setItem("oraklo_token", data.data.token);
        localStorage.setItem("oraklo_user", JSON.stringify(data.data.user));
      }
      router.push("/dashboard");
    } catch {
      // API offline — mock login em dev
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--th-bg)]">
      <div className="grid min-h-screen lg:grid-cols-[1fr_480px]">

        {/* ── Left — branding ── */}
        <div className="relative hidden overflow-hidden bg-[var(--th-bg-sub)] lg:flex lg:flex-col">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--oraklo-color-primary)] opacity-[0.07] blur-[120px]" />

          {/* Logo */}
          <div className="relative z-10 p-10">
            <Link href="/">
              <Image src={logoOraklo} alt="ORAKLO" className="h-8 w-auto brightness-0 invert" />
            </Link>
          </div>

          {/* Copy */}
          <div className="relative z-10 flex flex-1 flex-col justify-center px-12 pb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--oraklo-color-primary-glow)]/60">
              Bem-vindo de volta
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-anton)] text-4xl leading-[1.08] text-[var(--th-text)] xl:text-5xl">
              Continue<br />prevendo.<br />
              <span className="text-[var(--oraklo-color-primary-glow)]">Continue ganhando.</span>
            </h1>
            <p className="mt-5 max-w-xs text-sm leading-7 text-[var(--th-low)]">
              Acesse sua conta e acompanhe suas posições abertas nos mercados ao vivo.
            </p>

            {/* Live indicator */}
            <div className="mt-10 inline-flex items-center gap-2 rounded-xl bg-emerald-500/8 px-4 py-3 ring-1 ring-emerald-500/15">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-emerald-400">6 mercados ao vivo agora</span>
            </div>
          </div>

          <div className="relative z-10 border-t border-[var(--th-border)] px-12 py-6">
            <p className="text-xs text-[var(--th-dim)]">
              Não tem conta?{" "}
              <Link href="/cadastro" className="font-semibold text-[var(--oraklo-color-primary-glow)] hover:underline">
                Criar agora
              </Link>
            </p>
          </div>
        </div>

        {/* ── Right — form ── */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-12">

          {/* Mobile logo */}
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link href="/">
              <Image src={logoOraklo} alt="ORAKLO" className="h-7 w-auto brightness-0 invert" />
            </Link>
            <Link href="/cadastro" className="text-xs text-[var(--th-low)] hover:text-[var(--th-mid)]">
              Criar conta →
            </Link>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div className="mb-8">
              <h2 className="font-[family-name:var(--font-anton)] text-2xl text-[var(--th-text)]">
                Entrar
              </h2>
              <p className="mt-1 text-sm text-[var(--th-low)]">Acesse sua conta ORAKLO</p>
            </div>

            {/* API error */}
            {apiError && (
              <div className="mb-5 flex items-start gap-3 rounded-xl bg-red-500/10 px-4 py-3 ring-1 ring-red-500/25">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0 text-red-400">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M7 4.5v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p className="text-xs text-red-400">{apiError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-semibold text-[var(--th-mid)]">
                  Email
                </label>
                <input
                  id="email" type="email" placeholder="voce@email.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className={`h-11 w-full rounded-xl bg-[var(--th-overlay-5)] px-4 text-sm text-[var(--th-text)] outline-none ring-1 transition-all placeholder:text-[var(--th-dim)] focus:ring-[var(--oraklo-color-primary)]/60 ${
                    errors.email ? "ring-red-500/60" : "ring-[var(--th-ring)] hover:ring-[var(--th-ring)]"
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-400">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-xs font-semibold text-[var(--th-mid)]">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className={`h-11 w-full rounded-xl bg-[var(--th-overlay-5)] px-4 pr-11 text-sm text-[var(--th-text)] outline-none ring-1 transition-all placeholder:text-[var(--th-dim)] focus:ring-[var(--oraklo-color-primary)]/60 ${
                      errors.password ? "ring-red-500/60" : "ring-[var(--th-ring)] hover:ring-[var(--th-ring)]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--th-dim)] transition-colors hover:text-[var(--th-mid)]"
                  >
                    <EyeIcon open={showPass} />
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-red-400">{errors.password}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--oraklo-color-primary)] text-sm font-bold text-white shadow-[0_0_20px_rgba(123,47,247,0.35)] transition-all hover:bg-[var(--oraklo-color-primary-hover)] hover:shadow-[0_0_28px_rgba(123,47,247,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 24" strokeLinecap="round"/>
                    </svg>
                    Entrando…
                  </>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 border-t border-[var(--th-border)]" />
              <span className="text-[10px] text-[var(--th-dim)]">ou</span>
              <div className="flex-1 border-t border-[var(--th-border)]" />
            </div>

            <p className="mt-5 text-center text-xs text-[var(--th-dim)]">
              Não tem conta?{" "}
              <Link href="/cadastro" className="font-semibold text-[var(--oraklo-color-primary-glow)] hover:underline">
                Criar conta grátis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
