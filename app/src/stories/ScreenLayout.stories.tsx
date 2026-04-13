import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ScreenLayout } from '@/components/ui/screen-layout'

const meta: Meta<typeof ScreenLayout> = {
  title: 'ORAKLO / ScreenLayout',
  component: ScreenLayout,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ScreenLayout>

const PlaceholderContent = () => (
  <div
    style={{
      background: 'var(--surface)',
      border: '1px dashed var(--border)',
      borderRadius: 16,
      height: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
      fontSize: 13,
    }}
  >
    conteúdo da página
  </div>
)

const SampleActions = () => (
  <>
    <button
      style={{
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '0.5rem 1rem',
        color: 'var(--text-secondary)',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      Filtrar
    </button>
    <button
      style={{
        background: 'var(--accent)',
        border: 'none',
        borderRadius: 10,
        padding: '0.5rem 1rem',
        color: '#fff',
        fontSize: 13,
        fontWeight: 700,
        cursor: 'pointer',
      }}
    >
      + Novo evento
    </button>
  </>
)

// ── Stories ──────────────────────────────────────────────────────────────────

/** Completo — eyebrow, título, descrição */
export const Completo: Story = {
  name: 'Completo',
  args: {
    eyebrow: 'Plataforma',
    title: 'Mercados',
    description: 'Acompanhe e participe das previsões abertas. Cada decisão move a cotação em tempo real.',
  },
  render: (args) => (
    <ScreenLayout {...args}>
      <PlaceholderContent />
    </ScreenLayout>
  ),
}

/** Com ações no header */
export const ComAcoes: Story = {
  name: 'Com ações',
  args: {
    eyebrow: 'Admin',
    title: 'Eventos',
    description: 'Gerencie todos os eventos da plataforma.',
    actions: <SampleActions />,
  },
  render: (args) => (
    <ScreenLayout {...args}>
      <PlaceholderContent />
    </ScreenLayout>
  ),
}

/** Só título, sem eyebrow nem descrição */
export const SoTitulo: Story = {
  name: 'Só título',
  args: { title: 'Posições' },
  render: (args) => (
    <ScreenLayout {...args}>
      <PlaceholderContent />
    </ScreenLayout>
  ),
}

/** Sem header — apenas container centrado */
export const SemHeader: Story = {
  name: 'Sem header (só container)',
  args: {},
  render: (args) => (
    <ScreenLayout {...args}>
      <PlaceholderContent />
    </ScreenLayout>
  ),
}

/** Demonstra hierarquia tipográfica: eyebrow → h1 → descrição */
export const Hierarquia: StoryObj = {
  name: 'Hierarquia tipográfica',
  render: () => (
    <div style={{ background: 'var(--bg)', padding: '2rem', minHeight: '100vh' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 32 }}>
        Comparação: antes vs depois
      </p>

      {/* Antes — simulado */}
      <div style={{ marginBottom: 48 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 12, textTransform: 'uppercase' }}>antes (semibold + tracking-tight)</p>
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 24, marginBottom: 16 }}>
          <p style={{ color: '#B8AECA', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Plataforma</p>
          <h1 style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>Mercados</h1>
          <p style={{ fontSize: 14, color: '#B8AECA', marginTop: 8 }}>Acompanhe as previsões abertas.</p>
        </div>
      </div>

      {/* Depois — componente real */}
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 12, textTransform: 'uppercase' }}>depois (font-black + accent eyebrow)</p>
        <ScreenLayout
          eyebrow="Plataforma"
          title="Mercados"
          description="Acompanhe e participe das previsões abertas. Cada decisão move a cotação em tempo real."
          style={{ padding: 0 }}
          containerClassName="max-w-none"
        >
          <div />
        </ScreenLayout>
      </div>
    </div>
  ),
}
