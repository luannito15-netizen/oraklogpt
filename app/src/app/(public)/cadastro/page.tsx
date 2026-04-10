"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logoOraklo from "../../../../assets/icons/logo-oraklo.svg";

// ── Helpers ───────────────────────────────────────────────────────

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8)          score++;
  if (password.length >= 12)         score++;
  if (/[A-Z]/.test(password))        score++;
  if (/[0-9]/.test(password))        score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Muito fraca", color: "bg-red-500" };
  if (score === 2) return { score, label: "Fraca",       color: "bg-orange-500" };
  if (score === 3) return { score, label: "Razoável",    color: "bg-amber-400" };
  if (score === 4) return { score, label: "Boa",         color: "bg-emerald-400" };
  return                  { score, label: "Forte",       color: "bg-emerald-500" };
}

function validate(fields: {
  name: string;
  email: string;
  password: string;
  confirm: string;
  terms: boolean;
}) {
  const errors: Record<string, string> = {};
  if (!fields.name.trim() || fields.name.trim().length < 2)
    errors.name = "Nome deve ter pelo menos 2 caracteres";
  if (!/^\S+@\S+\.\S+$/.test(fields.email))
    errors.email = "Email inválido";
  if (fields.password.length < 8)
    errors.password = "Senha deve ter pelo menos 8 caracteres";
  else if (!/[A-Z]/.test(fields.password))
    errors.password = "Senha deve conter ao menos uma letra maiúscula";
  else if (!/[0-9]/.test(fields.password))
    errors.password = "Senha deve conter ao menos um número";
  if (fields.confirm !== fields.password)
    errors.confirm = "As senhas não coincidem";
  if (!fields.terms)
    errors.terms = "Você deve aceitar os termos para continuar";
  return errors;
}

// ── Eye icon ──────────────────────────────────────────────────────

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

// ── Field component ───────────────────────────────────────────────

function Field({
  id, label, type = "text", placeholder, value, onChange, error, suffix,
}: {
  id: string; label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; error?: string; suffix?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-[var(--th-mid)]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={id}
          className={`h-11 w-full rounded-xl bg-[var(--th-overlay-5)] px-4 pr-${suffix ? "11" : "4"} text-sm text-[var(--th-text)] outline-none ring-1 transition-all placeholder:text-[var(--th-dim)] focus:ring-[var(--oraklo-color-primary)]/60 ${
            error ? "ring-red-500/60" : "ring-[var(--th-ring)] hover:ring-[var(--th-ring)]"
          }`}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>
        )}
      </div>
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────

export default function CadastroPage() {
  const router = useRouter();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [terms,    setTerms]    = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);

  const [errors,    setErrors]    = useState<Record<string, string>>({});
  const [apiError,  setApiError]  = useState("");
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    const validationErrors = validate({ name, email, password, confirm, terms });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/api/v1/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.message ?? "Erro ao criar conta. Tente novamente.");
        return;
      }

      // Persist token for authenticated session (MVP: localStorage)
      if (data.data?.token) {
        localStorage.setItem("oraklo_token", data.data.token);
        localStorage.setItem("oraklo_user", JSON.stringify(data.data.user));
      }

      setSubmitted(true);
      setTimeout(() => router.push("/dashboard"), 1800);
    } catch {
      // API offline — allow navigation in mock/dev mode
      setSubmitted(true);
      setTimeout(() => router.push("/dashboard"), 1800);
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--th-bg)]">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-500/30">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14l6 6 12-12" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="font-[family-name:var(--font-anton)] text-2xl text-[var(--th-text)]">Conta criada!</p>
            <p className="mt-1 text-sm text-[var(--th-low)]">Redirecionando para o dashboard…</p>
          </div>
          <div className="h-1 w-48 overflow-hidden rounded-full bg-[var(--th-overlay-8)]">
            <div className="h-full animate-[grow_1.8s_ease-out_forwards] rounded-full bg-[var(--oraklo-color-primary)]" />
          </div>
        </div>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[var(--th-bg)]">
      <div className="grid min-h-screen lg:grid-cols-[1fr_520px]">

        {/* ── Left panel — branding ── */}
        <div className="relative hidden overflow-hidden bg-[var(--th-bg-sub)] lg:flex lg:flex-col">
          {/* Glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--oraklo-color-primary)] opacity-[0.07] blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[var(--oraklo-color-primary)] opacity-[0.12] blur-[80px]" />

          {/* Logo */}
          <div className="relative z-10 p-10">
            <Link href="/">
              <Image src={logoOraklo} alt="ORAKLO" className="h-8 w-auto brightness-0 invert" />
            </Link>
          </div>

          {/* Copy */}
          <div className="relative z-10 flex flex-1 flex-col justify-center px-12 pb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--oraklo-color-primary-glow)]/60">
              Mercado de previsões
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-anton)] text-4xl leading-[1.08] text-[var(--th-text)] xl:text-5xl">
              Sua opinião<br />tem valor real<br />
              <span className="text-[var(--oraklo-color-primary-glow)]">aqui.</span>
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--th-low)]">
              Registre previsões sobre eventos reais e acompanhe seus resultados em tempo real.
            </p>

            {/* Social proof */}
            <div className="mt-10 space-y-3">
              {[
                { icon: "🔐", text: "Senha criptografada com bcrypt" },
                { icon: "🎯", text: "Resultados validados por fontes oficiais" },
                { icon: "📊", text: "Acompanhe seu desempenho no dashboard" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--th-overlay-5)] text-sm">
                    {item.icon}
                  </span>
                  <span className="text-xs text-[var(--th-low)]">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="mt-10 flex gap-8">
              {[
                { value: "6", label: "Mercados ativos" },
                { value: "5%", label: "Taxa da plataforma" },
                { value: "100%", label: "Transparente" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-[family-name:var(--font-anton)] text-2xl text-[var(--th-text)]">{s.value}</p>
                  <p className="text-[10px] text-[var(--th-dim)]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: already have account */}
          <div className="relative z-10 border-t border-[var(--th-border)] px-12 py-6">
            <p className="text-xs text-[var(--th-dim)]">
              Já tem conta?{" "}
              <Link href="/login" className="font-semibold text-[var(--oraklo-color-primary-glow)] hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>

        {/* ── Right panel — form ── */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-12">

          {/* Mobile logo */}
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link href="/">
              <Image src={logoOraklo} alt="ORAKLO" className="h-7 w-auto brightness-0 invert" />
            </Link>
            <Link href="/login" className="text-xs text-[var(--th-low)] hover:text-[var(--th-mid)]">
              Já tenho conta →
            </Link>
          </div>

          <div className="mx-auto w-full max-w-sm">
            {/* Header */}
            <div className="mb-8">
              <h2 className="font-[family-name:var(--font-anton)] text-2xl text-[var(--th-text)]">
                Criar conta
              </h2>
              <p className="mt-1 text-sm text-[var(--th-low)]">
                Preencha os dados abaixo para começar
              </p>
            </div>

            {/* API error banner */}
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
              {/* Name */}
              <Field
                id="name" label="Nome completo" placeholder="João Silva"
                value={name} onChange={setName} error={errors.name}
              />

              {/* Email */}
              <Field
                id="email" label="Email" type="email" placeholder="joao@email.com"
                value={email} onChange={setEmail} error={errors.email}
              />

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-xs font-semibold text-[var(--th-mid)]">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
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

                {/* Strength bar */}
                {password && (
                  <div className="space-y-1 pt-0.5">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i <= strength.score ? strength.color : "bg-[var(--th-overlay-8)]"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-[var(--th-dim)]">
                      Força: <span className="font-semibold text-[var(--th-mid)]">{strength.label}</span>
                    </p>
                  </div>
                )}

                {errors.password && (
                  <p className="text-[11px] text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Confirm password */}
              <div className="space-y-1.5">
                <label htmlFor="confirm" className="block text-xs font-semibold text-[var(--th-mid)]">
                  Confirmar senha
                </label>
                <div className="relative">
                  <input
                    id="confirm"
                    type={showConf ? "text" : "password"}
                    placeholder="Repita a senha"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    className={`h-11 w-full rounded-xl bg-[var(--th-overlay-5)] px-4 pr-11 text-sm text-[var(--th-text)] outline-none ring-1 transition-all placeholder:text-[var(--th-dim)] focus:ring-[var(--oraklo-color-primary)]/60 ${
                      errors.confirm ? "ring-red-500/60" : "ring-[var(--th-ring)] hover:ring-[var(--th-ring)]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConf((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--th-dim)] transition-colors hover:text-[var(--th-mid)]"
                  >
                    <EyeIcon open={showConf} />
                  </button>
                </div>
                {/* Match indicator */}
                {confirm && !errors.confirm && (
                  <p className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Senhas coincidem
                  </p>
                )}
                {errors.confirm && (
                  <p className="text-[11px] text-red-400">{errors.confirm}</p>
                )}
              </div>

              {/* Terms */}
              <div className="pt-1">
                <label className="flex cursor-pointer items-start gap-3">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={terms}
                      onChange={(e) => setTerms(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className={`flex h-4 w-4 items-center justify-center rounded ring-1 transition-all peer-focus-visible:outline-none ${
                      terms
                        ? "bg-[var(--oraklo-color-primary)] ring-[var(--oraklo-color-primary)]"
                        : errors.terms
                          ? "bg-transparent ring-red-500/50"
                          : "bg-transparent ring-[var(--th-ring)]"
                    }`}>
                      {terms && (
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs leading-5 text-[var(--th-low)]">
                    Li e aceito os{" "}
                    <Link href="/termos" className="text-[var(--oraklo-color-primary-glow)] hover:underline">
                      termos de uso
                    </Link>{" "}
                    e a{" "}
                    <Link href="/privacidade" className="text-[var(--oraklo-color-primary-glow)] hover:underline">
                      política de privacidade
                    </Link>
                  </span>
                </label>
                {errors.terms && (
                  <p className="mt-1.5 text-[11px] text-red-400">{errors.terms}</p>
                )}
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
                    Criando conta…
                  </>
                ) : (
                  "Criar conta"
                )}
              </button>
            </form>

            {/* Divider + login link */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 border-t border-[var(--th-border)]" />
              <span className="text-[10px] text-[var(--th-dim)]">ou</span>
              <div className="flex-1 border-t border-[var(--th-border)]" />
            </div>
            <p className="mt-5 text-center text-xs text-[var(--th-dim)]">
              Já tem conta?{" "}
              <Link href="/login" className="font-semibold text-[var(--oraklo-color-primary-glow)] hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
