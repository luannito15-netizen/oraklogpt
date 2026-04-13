'use client'

import { useState, useEffect } from 'react'
import type { EventCardData } from '@/components/ui/event-card'

interface LiveActivityTickerProps {
  events: EventCardData[]
}

const USERS = ['Dany444', 'Rafa21', 'Luan77', 'Pedro_B', 'Carol.M', 'Thiago99', 'BrunoFX', 'Ana_K', 'Marcos_R', 'Ju.Lima']
const SIDES = ['SIM', 'NÃO']

function generateMessages(events: EventCardData[]): string[] {
  if (events.length === 0) return ['Mercado ao vivo — registre sua posição']
  const msgs: string[] = []
  for (let i = 0; i < 8; i++) {
    const event = events[i % events.length]
    const user = USERS[i % USERS.length]
    const side = SIDES[i % 2]
    const title = event.title.length > 40 ? event.title.slice(0, 40) + '…' : event.title
    msgs.push(`${user} escolheu ${side} em "${title}"`)
  }
  return msgs
}

export function LiveActivityTicker({ events }: LiveActivityTickerProps) {
  const messages = generateMessages(events)
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % messages.length)
        setVisible(true)
      }, 300)
    }, 4000)
    return () => clearInterval(id)
  }, [messages.length])

  return (
    <div className="flex items-center gap-2.5 overflow-hidden rounded-full bg-[var(--surface)] px-4 py-2 ring-1 ring-[var(--border)]">
      {/* Live dot */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      {/* Message */}
      <span
        className="truncate text-[11px] text-[var(--text-muted)] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {messages[idx]}
      </span>
    </div>
  )
}
