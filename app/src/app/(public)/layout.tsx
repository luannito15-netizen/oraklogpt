import type { ReactNode } from "react";

// Layout compartilhado para todas as páginas públicas.
// A home page renderiza seu próprio header/footer inline.
// As demais páginas usam este layout com nav e footer comuns.
export default function PublicLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
