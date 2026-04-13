import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Badge } from '@/components/ui/badge'
import type { BadgeTone } from '@/components/ui/badge'

const meta: Meta<typeof Badge> = {
  title: 'ORAKLO / Badge',
  component: Badge,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--bg)', padding: '2rem', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    tone:  { control: 'select', options: ['sim', 'nao', 'hot', 'super-hot', 'last-call', 'breve', 'open', 'closed', 'resolved', 'canceled', 'accent', 'muted'] },
    pulse: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

// ── Stories individuais ──────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  args: { tone: 'open', children: 'Aberto', pulse: false },
}

// ── Grupos temáticos ─────────────────────────────────────────────────────────

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 24 }}>
    <p style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
      {label}
    </p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {children}
    </div>
  </div>
)

/** Lados de previsão — SIM e NÃO */
export const Resultado: StoryObj = {
  name: 'Resultado — SIM / NÃO',
  render: () => (
    <Row label="Resultado">
      <Badge tone="sim">SIM</Badge>
      <Badge tone="nao">NÃO</Badge>
    </Row>
  ),
}

/** Urgência — escala HOT completa + BREVE */
export const Urgencia: StoryObj = {
  name: 'Urgência',
  render: () => (
    <Row label="Urgência (crescente)">
      <Badge tone="breve">Breve</Badge>
      <Badge tone="hot">HOT</Badge>
      <Badge tone="super-hot">Super Hot</Badge>
      <Badge tone="last-call" pulse>Last Call</Badge>
    </Row>
  ),
}

/** Status do evento */
export const StatusEvento: StoryObj = {
  name: 'Status do evento',
  render: () => (
    <Row label="Status">
      <Badge tone="open">Aberto</Badge>
      <Badge tone="closed">Encerrado</Badge>
      <Badge tone="resolved">Resolvido</Badge>
      <Badge tone="canceled">Cancelado</Badge>
    </Row>
  ),
}

/** Genéricos */
export const Genericos: StoryObj = {
  name: 'Genéricos — accent / muted',
  render: () => (
    <Row label="Genéricos">
      <Badge tone="accent">Destaque</Badge>
      <Badge tone="muted">Secundário</Badge>
    </Row>
  ),
}

/** Painel completo — todos os tones */
export const TodosOsTones: StoryObj = {
  name: 'Todos os tones',
  render: () => {
    const all: Array<[BadgeTone, string, boolean?]> = [
      ['sim',        'SIM'],
      ['nao',        'NÃO'],
      ['hot',        'HOT',       true],
      ['super-hot',  'Super Hot', true],
      ['last-call',  'Last Call', true],
      ['breve',      'Breve'],
      ['open',       'Aberto'],
      ['closed',     'Encerrado'],
      ['resolved',   'Resolvido'],
      ['canceled',   'Cancelado'],
      ['accent',     'Destaque'],
      ['muted',      'Secundário'],
    ]
    return (
      <div style={{ background: 'var(--bg)', padding: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {all.map(([tone, label, pulse]) => (
            <Badge key={tone} tone={tone} pulse={pulse}>{label}</Badge>
          ))}
        </div>
      </div>
    )
  },
}

/** Uso em contexto — card simulado com badges */
export const EmContexto: StoryObj = {
  name: 'Em contexto',
  render: () => (
    <div style={{ maxWidth: 380, background: 'var(--surface-elevated)', borderRadius: 20, border: '1px solid var(--border)', padding: '1.25rem' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        <Badge tone="open">Aberto</Badge>
        <Badge tone="last-call" pulse>Last Call</Badge>
      </div>
      <p style={{ color: 'var(--text)', fontWeight: 800, marginBottom: 12 }}>
        O Flamengo vai vencer o Corinthians neste domingo?
      </p>
      <div style={{ display: 'flex', gap: 6 }}>
        <Badge tone="sim">SIM</Badge>
        <Badge tone="nao">NÃO</Badge>
        <Badge tone="breve" style={{ marginLeft: 'auto' }}>3 dias</Badge>
      </div>
    </div>
  ),
}
