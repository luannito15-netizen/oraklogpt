import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import homemImg   from "../../../assets/illustrations/hero-homem.png";
import mulherImg  from "../../../assets/illustrations/metodo-mulher.png";
import modeloImg  from "../../../assets/illustrations/modelo de previsão.png";

type AdSize = "leaderboard" | "rectangle" | "strip";

interface AdBannerProps {
  size?: AdSize;
  className?: string;
  /** Override default headline */
  headline?: string;
  /** Override default subtext */
  subtext?: string;
  /** Override default CTA label */
  cta?: string;
  /** Override default link */
  href?: string;
  /** Override default image */
  image?: StaticImageData;
}

/* ── Default copy & image per size ────────────────────────────── */
const defaults: Record<AdSize, {
  headline: string;
  subtext:  string;
  cta:      string;
  href:     string;
  image:    StaticImageData;
  imgClass: string;
}> = {
  leaderboard: {
    headline: "Preveja. Acerte. Lucre.",
    subtext:  "O mercado brasileiro de previsões sobre eventos reais.",
    cta:      "Começar agora",
    href:     "/cadastro",
    image:    homemImg,
    imgClass: "absolute -right-2 bottom-0 h-[110%] w-auto object-contain object-bottom drop-shadow-xl",
  },
  rectangle: {
    headline: "Método comprovado",
    subtext:  "Taxa de acerto acima de 80% com análise de dados reais.",
    cta:      "Ver eventos",
    href:     "/mercados",
    image:    mulherImg,
    imgClass: "absolute -right-4 bottom-0 h-[75%] w-auto object-contain object-bottom",
  },
  strip: {
    headline: "Cadastre-se grátis e receba R$5 de bônus",
    subtext:  "Válido para novas contas até o lançamento oficial.",
    cta:      "Criar conta",
    href:     "/cadastro",
    image:    modeloImg,
    imgClass: "absolute right-0 top-0 h-full w-auto object-contain object-right opacity-30 rounded-r-xl",
  },
};

export function AdBanner({
  size      = "leaderboard",
  className = "",
  headline,
  subtext,
  cta,
  href,
  image,
}: AdBannerProps) {
  const d = defaults[size];
  const resolvedImage    = image    ?? d.image;
  const resolvedHeadline = headline ?? d.headline;
  const resolvedSubtext  = subtext  ?? d.subtext;
  const resolvedCta      = cta      ?? d.cta;
  const resolvedHref     = href     ?? d.href;

  /* ── Leaderboard — thin horizontal strip ────────────────────── */
  if (size === "leaderboard") {
    return (
      <Link href={resolvedHref} aria-label={resolvedHeadline}
        className={`relative mx-auto flex w-full max-w-[728px] overflow-hidden rounded-xl
          bg-gradient-to-r from-[#3b1270] via-[#5a1eb0] to-[#7b2ff7]
          shadow-[0_0_24px_rgba(123,47,247,0.35)] transition-opacity hover:opacity-90 ${className}`}
        style={{ height: 90 }}
      >
        {/* Subtle noise overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E\")" }}
        />

        {/* Copy */}
        <div className="relative z-10 flex flex-col justify-center gap-0.5 pl-5 pr-4" style={{ maxWidth: 420 }}>
          <p className="font-[family-name:var(--font-anton)] text-xl leading-tight text-white">
            {resolvedHeadline}
          </p>
          <p className="text-[11px] text-white/70 leading-snug">{resolvedSubtext}</p>
          <span className="mt-1 inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white ring-1 ring-white/20">
            {resolvedCta} →
          </span>
        </div>

        {/* Image */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <Image
            src={resolvedImage}
            alt=""
            aria-hidden
            className={d.imgClass}
          />
        </div>

        {/* "Ad" label */}
        <span className="absolute bottom-1.5 right-2 text-[8px] font-bold uppercase tracking-[0.1em] text-white/30">
          Publi
        </span>
      </Link>
    );
  }

  /* ── Rectangle — sidebar card ───────────────────────────────── */
  if (size === "rectangle") {
    return (
      <Link href={resolvedHref} aria-label={resolvedHeadline}
        className={`relative mx-auto flex w-full max-w-[300px] overflow-hidden rounded-2xl
          bg-gradient-to-br from-[#3b1270] via-[#5a1eb0] to-[#7b2ff7]
          shadow-[0_0_24px_rgba(123,47,247,0.3)] transition-opacity hover:opacity-90 ${className}`}
        style={{ height: 250 }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E\")" }}
        />

        {/* Glow blob */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#c084fc] opacity-20 blur-2xl" />

        {/* Image — sits right, bleeds bottom */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <Image
            src={resolvedImage}
            alt=""
            aria-hidden
            className="absolute bottom-0 right-0 h-[72%] w-auto object-contain object-bottom"
          />
        </div>

        {/* Copy — bottom-left */}
        <div className="relative z-10 mt-auto flex flex-col gap-1.5 p-5">
          <p className="font-[family-name:var(--font-anton)] text-2xl leading-tight text-white">
            {resolvedHeadline}
          </p>
          <p className="text-[11px] text-white/70 leading-snug max-w-[160px]">{resolvedSubtext}</p>
          <span className="mt-2 inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white ring-1 ring-white/20">
            {resolvedCta} →
          </span>
        </div>

        <span className="absolute bottom-1.5 right-2 text-[8px] font-bold uppercase tracking-[0.1em] text-white/30">
          Publi
        </span>
      </Link>
    );
  }

  /* ── Strip — full-width thin bar ────────────────────────────── */
  return (
    <Link href={resolvedHref} aria-label={resolvedHeadline}
      className={`relative flex w-full overflow-hidden rounded-xl
        bg-gradient-to-r from-[#3b1270] via-[#5a1eb0] to-[#7b2ff7]
        shadow-[0_0_20px_rgba(123,47,247,0.3)] transition-opacity hover:opacity-90 ${className}`}
      style={{ height: 80 }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E\")" }}
      />

      {/* Image — right side, transparent overlay style */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        <Image
          src={resolvedImage}
          alt=""
          aria-hidden
          className="absolute right-0 top-0 h-full w-auto object-contain object-right opacity-25"
        />
      </div>

      {/* Copy */}
      <div className="relative z-10 flex items-center gap-6 px-6">
        <div>
          <p className="font-[family-name:var(--font-anton)] text-lg leading-tight text-white">
            {resolvedHeadline}
          </p>
          <p className="text-[11px] text-white/65">{resolvedSubtext}</p>
        </div>
        <span className="hidden sm:inline-flex shrink-0 items-center rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-white ring-1 ring-white/20">
          {resolvedCta} →
        </span>
      </div>

      <span className="absolute bottom-1.5 right-2 text-[8px] font-bold uppercase tracking-[0.1em] text-white/30">
        Publi
      </span>
    </Link>
  );
}
