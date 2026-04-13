import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PublicNav, PublicFooter } from '@/components/ui/public-nav'

const meta: Meta<typeof PublicNav> = {
  title: 'ORAKLO / PublicNav',
  component: PublicNav,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof PublicNav>

// ── Página fictícia para preencher o espaço abaixo da nav ─────────────────────

const PageShell = ({ children }: { children?: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
    {children}
    <div
      style={{
        padding: '3rem 2rem',
        maxWidth: 900,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          style={{
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            height: 80,
            opacity: 0.4 + n * 0.1,
          }}
        />
      ))}
    </div>
  </div>
)

// ── Stories ───────────────────────────────────────────────────────────────────

/** Nenhum item ativo — pathname "/" */
export const Padrao: Story = {
  name: 'Padrão (home)',
  parameters: {
    nextjs: {
      navigation: { pathname: '/' },
    },
  },
  render: () => (
    <PageShell>
      <PublicNav />
    </PageShell>
  ),
}

/** Item Mercados ativo */
export const ItemAtivo: Story = {
  name: 'Item ativo — Mercados',
  parameters: {
    nextjs: {
      navigation: { pathname: '/mercados' },
    },
  },
  render: () => (
    <PageShell>
      <PublicNav />
    </PageShell>
  ),
}

/** Item Como funciona ativo */
export const ItemComoFunciona: Story = {
  name: 'Item ativo — Como funciona',
  parameters: {
    nextjs: {
      navigation: { pathname: '/como-funciona' },
    },
  },
  render: () => (
    <PageShell>
      <PublicNav />
    </PageShell>
  ),
}

/** Nav + Footer — visão da estrutura pública completa */
export const ComFooter: Story = {
  name: 'Nav + Footer',
  parameters: {
    nextjs: {
      navigation: { pathname: '/mercados' },
    },
  },
  render: () => (
    <div style={{ background: 'var(--bg)', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PublicNav />
      <div style={{ flex: 1, padding: '3rem 2rem', maxWidth: 900, margin: '0 auto', width: '100%' }}>
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            style={{
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              height: 80,
              marginBottom: 12,
              opacity: 0.3 + n * 0.1,
            }}
          />
        ))}
      </div>
      <PublicFooter />
    </div>
  ),
}
