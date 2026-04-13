'use client'

import { useState } from 'react'
import type { EventCardData } from '@/components/ui/event-card'
import { EventCardCompact } from '@/components/ui/event-card'
import { EventDrawer } from '@/components/ui/event-drawer'

interface EventsHeroSectionProps {
  events: EventCardData[]
}

export function EventsHeroSection({ events }: EventsHeroSectionProps) {
  const [drawerEvent, setDrawerEvent] = useState<EventCardData | null>(null)

  return (
    <>
      <div className="fade-edges-x -mx-2 flex gap-4 overflow-x-auto px-2 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="w-[280px] shrink-0 sm:w-auto">
            <EventCardCompact
              event={event}
              onOpen={setDrawerEvent}
            />
          </div>
        ))}
      </div>

      <EventDrawer
        event={drawerEvent}
        onClose={() => setDrawerEvent(null)}
      />
    </>
  )
}
