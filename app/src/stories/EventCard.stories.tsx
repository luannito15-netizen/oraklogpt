import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { EventCard, EventCardCompact } from '@/components/ui/event-card'
import type { EventCardData } from '@/components/ui/event-card'

// ── Shared mock helpers ────────────────────────────────────────────────────────

const now = Date.now()

/** Build a deadlineAt ISO string N hours from now */
const hoursFromNow = (h: number) => new Date(now + h * 60 * 60 * 1000).toISOString()

/** Build a deadlineAt ISO string N days from now */
const daysFromNow = (d: number) => new Date(now + d * 24 * 60 * 60 * 1000).toISOString()

// ── Base mocks ─────────────────────────────────────────────────────────────────

const base: EventCardData = {
  id: 'evt-economia-1',
  title: 'O Banco Central vai cortar a taxa Selic na próxima reunião do COPOM?',
  category: 'Economia',
  status: 'open',
  simPercent: 64,
  volume: 48700,
  deadline: '12 dias',
  deadlineDays: 12,
  deadlineAt: daysFromNow(12),
  source: 'Banco Central',
  yesAmount: 31168,
  noAmount: 17532,
  totalVolume: 48700,
  yesPercent: 64,
  noPercent: 36,
  imageUrl: null,
}

const esportes: EventCardData = {
  id: 'evt-esportes-1',
  title: 'Flamengo vai vencer o Corinthians no Maracanã neste domingo?',
  category: 'Esportes',
  status: 'open',
  simPercent: 71,
  volume: 83200,
  deadline: '3 dias',
  deadlineDays: 3,
  deadlineAt: daysFromNow(3),
  source: 'Brasileirão',
  yesAmount: 59072,
  noAmount: 24128,
  totalVolume: 83200,
  yesPercent: 71,
  noPercent: 29,
  imageUrl: null,
}

const politica: EventCardData = {
  id: 'evt-politica-1',
  title: 'Lula vai aprovar a reforma tributária no primeiro semestre?',
  category: 'Política',
  status: 'open',
  simPercent: 42,
  volume: 120500,
  deadline: '45 dias',
  deadlineDays: 45,
  deadlineAt: daysFromNow(45),
  source: 'Agência Senado',
  yesAmount: 50610,
  noAmount: 69890,
  totalVolume: 120500,
  yesPercent: 42,
  noPercent: 58,
  imageUrl: null,
}

const clima: EventCardData = {
  id: 'evt-clima-1',
  title: 'A temperatura em São Paulo vai ultrapassar 35°C esta semana?',
  category: 'Clima',
  status: 'open',
  simPercent: 55,
  volume: 9800,
  deadline: '5 dias',
  deadlineDays: 5,
  deadlineAt: daysFromNow(5),
  source: 'INMET',
  yesAmount: 5390,
  noAmount: 4410,
  totalVolume: 9800,
  yesPercent: 55,
  noPercent: 45,
  imageUrl: null,
}

// HOT urgency variants — deadlineAt must be within 24h for getHotIntensity to activate

const hot: EventCardData = {
  ...esportes,
  id: 'evt-hot',
  deadlineDays: 1,
  deadline: 'hoje',
  deadlineAt: hoursFromNow(14),   // 14h → HOT tier
}

const superHot: EventCardData = {
  ...esportes,
  id: 'evt-super-hot',
  title: 'Brasil vai marcar no primeiro tempo da final?',
  deadlineDays: 1,
  deadline: 'hoje',
  deadlineAt: hoursFromNow(4),    // 4h → SUPER HOT tier
}

const lastCall: EventCardData = {
  ...esportes,
  id: 'evt-last-call',
  title: 'IBOVESPA vai fechar acima dos 130.000 pontos hoje?',
  category: 'Economia',
  deadlineDays: 1,
  deadline: 'hoje',
  deadlineAt: hoursFromNow(0.4),  // ~24 min → LAST CALL tier
}

const withImage: EventCardData = {
  ...base,
  id: 'evt-with-image',
  imageUrl: 'https://picsum.photos/seed/oraklo-econ/800/300',
}

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta: Meta<typeof EventCard> = {
  title: 'ORAKLO / EventCard',
  component: EventCard,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof EventCard>

// ── Stories ────────────────────────────────────────────────────────────────────

/** Estado padrão — Economia, prazo médio, sem imagem */
export const Padrao: Story = {
  name: 'Padrão',
  args: { event: base },
}

/** Prazo curto (BREVE) — badge âmbar, texto de deadline amarelado */
export const Breve: Story = {
  name: 'Breve (3 dias)',
  args: { event: esportes },
}

/** HOT — encerra em ~14h, ring vermelho */
export const Hot: Story = {
  name: 'HOT — Encerra hoje',
  args: { event: hot },
}

/** SUPER HOT — encerra em ~4h, ring laranja pulsante */
export const SuperHot: Story = {
  name: 'SUPER HOT — Encerra em horas',
  args: { event: superHot },
}

/** LAST CALL — encerra em minutos, máxima urgência */
export const LastCall: Story = {
  name: 'LAST CALL — Último momento',
  args: { event: lastCall },
}

/** Com imagem de capa */
export const ComImagem: Story = {
  name: 'Com imagem',
  args: { event: withImage },
}

/** Categoria Política */
export const Politica: Story = {
  name: 'Categoria: Política',
  args: { event: politica },
}

/** Categoria Clima */
export const Clima: Story = {
  name: 'Categoria: Clima',
  args: { event: clima },
}

/** Com handler onOpen (renderiza como button, sem navegação) */
export const ComDrawer: Story = {
  name: 'Com onOpen (drawer)',
  args: {
    event: base,
    onOpen: (e) => alert(`Abrir drawer: ${e.title}`),
  },
}

// ── Variante Compact ───────────────────────────────────────────────────────────

export const Compact: StoryObj<typeof EventCardCompact> = {
  name: 'Compact (landing)',
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <EventCardCompact event={base} />
    </div>
  ),
}

export const CompactComDrawer: StoryObj<typeof EventCardCompact> = {
  name: 'Compact com onOpen',
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <EventCardCompact
        event={politica}
        onOpen={(e) => alert(`Abrir drawer: ${e.title}`)}
      />
    </div>
  ),
}

// ── Grid com todas as categorias ───────────────────────────────────────────────

export const TodasCategorias: StoryObj = {
  name: 'Todas as categorias',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1rem',
      }}
    >
      {[base, esportes, politica, clima].map((ev) => (
        <EventCard key={ev.id} event={ev} />
      ))}
    </div>
  ),
  parameters: { layout: 'fullscreen' },
}

/** Painel de urgência — todas as intensidades lado a lado */
export const UrgenciaCompleta: StoryObj = {
  name: 'Urgência completa',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1rem',
      }}
    >
      <EventCard event={lastCall} />
      <EventCard event={superHot} />
      <EventCard event={hot} />
      <EventCard event={esportes} />  {/* BREVE */}
    </div>
  ),
  parameters: { layout: 'fullscreen' },
}
