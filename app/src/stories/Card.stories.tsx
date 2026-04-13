import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Card } from '@/components/ui/card'

const meta: Meta<typeof Card> = {
  title: 'ORAKLO / Card',
  component: Card,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--bg)', padding: '2rem', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    tone:      { control: 'select', options: ['default', 'muted', 'elevated'] },
    padding:   { control: 'select', options: ['none', 'md', 'lg'] },
    accentLine: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

const SampleContent = () => (
  <>
    <p style={{ color: 'var(--text)', fontWeight: 700, marginBottom: 4 }}>
      Título do card
    </p>
    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
      Conteúdo secundário do card. Tokens semânticos resolvem em dark e light.
    </p>
  </>
)

// ── Stories individuais ──────────────────────────────────────────────────────

/** Superfície padrão — surface-elevated, md padding */
export const Padrao: Story = {
  name: 'Padrão (default)',
  args: { tone: 'default', padding: 'md' },
  render: (args) => <Card {...args}><SampleContent /></Card>,
}

/** Superfície recuada — surface (nível abaixo) */
export const Recuado: Story = {
  name: 'Muted (surface recuada)',
  args: { tone: 'muted', padding: 'md' },
  render: (args) => <Card {...args}><SampleContent /></Card>,
}

/** Elevated — sombra mais profunda, mesmo background */
export const Elevado: Story = {
  name: 'Elevated (sombra profunda)',
  args: { tone: 'elevated', padding: 'md' },
  render: (args) => <Card {...args}><SampleContent /></Card>,
}

/** Padding grande */
export const PaddingGrande: Story = {
  name: 'Padding lg',
  args: { tone: 'default', padding: 'lg' },
  render: (args) => <Card {...args}><SampleContent /></Card>,
}

/** Sem padding — para conteúdo full-bleed */
export const SemPadding: Story = {
  name: 'Sem padding (full-bleed)',
  args: { tone: 'default', padding: 'none' },
  render: (args) => (
    <Card {...args}>
      <div style={{ height: 80, background: 'var(--surface)', borderRadius: 'var(--oraklo-radius-lg) var(--oraklo-radius-lg) 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 12 }}>
        área full-bleed
      </div>
      <div style={{ padding: '1.5rem' }}>
        <SampleContent />
      </div>
    </Card>
  ),
}

/** Com accentLine — borda superior violeta brilhante */
export const ComAcento: Story = {
  name: 'Com accent line',
  args: { tone: 'default', padding: 'md', accentLine: true },
  render: (args) => <Card {...args}><SampleContent /></Card>,
}

/** Todas as variações lado a lado */
export const TodasVariacoes: StoryObj = {
  name: 'Todas as variações',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: 900 }}>
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>default</p>
        <Card tone="default"><SampleContent /></Card>
      </div>
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>muted</p>
        <Card tone="muted"><SampleContent /></Card>
      </div>
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>elevated</p>
        <Card tone="elevated"><SampleContent /></Card>
      </div>
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>accent line</p>
        <Card tone="default" accentLine><SampleContent /></Card>
      </div>
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>padding lg</p>
        <Card tone="default" padding="lg"><SampleContent /></Card>
      </div>
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>sem padding</p>
        <Card tone="default" padding="none">
          <div style={{ height: 60, background: 'var(--surface)', borderRadius: 'var(--oraklo-radius-lg)' }} />
        </Card>
      </div>
    </div>
  ),
}
