import type { HTMLAttributes, ReactNode } from "react";

interface ScreenLayoutProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  containerClassName?: string;
  title?: string;
  description?: string;
  /** Short uppercase label rendered above the title in accent color */
  eyebrow?: string;
  actions?: ReactNode;
}

export function ScreenLayout({
  children,
  className,
  containerClassName,
  title,
  description,
  eyebrow,
  actions,
  ...props
}: ScreenLayoutProps) {
  const sectionClasses = ["w-full px-6 py-10 sm:px-8 lg:px-12 lg:py-12", className]
    .filter(Boolean)
    .join(" ");

  const containerClasses = ["mx-auto w-full max-w-6xl", containerClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClasses} {...props}>
      <div className={containerClasses}>
        {title ? (
          <header className="mb-8 flex flex-col gap-4 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1.5">
              {eyebrow ? (
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
                  {eyebrow}
                </p>
              ) : null}

              <h1 className="text-3xl font-black text-[var(--text)] sm:text-4xl">
                {title}
              </h1>

              {description ? (
                <p className="max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                  {description}
                </p>
              ) : null}
            </div>

            {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
          </header>
        ) : null}

        {children}
      </div>
    </section>
  );
}
