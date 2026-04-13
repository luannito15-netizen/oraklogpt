"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

export interface MarketUpdate {
  event_id: string;
  last_price_sim: number;   // 0–1
  volume_total: number;
  participant_count: number;
}

export function useMarketRealtime(
  eventId: string,
  onUpdate: (update: MarketUpdate) => void
) {
  // Ref keeps the latest callback without making it a useEffect dep —
  // prevents the channel from being torn down and rebuilt on every render.
  const onUpdateRef = useRef(onUpdate);
  useEffect(() => {
    onUpdateRef.current = onUpdate;
  });

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`market_state:${eventId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "market_state",
          filter: `event_id=eq.${eventId}`,
        },
        (payload) => {
          onUpdateRef.current(payload.new as MarketUpdate);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId]); // only eventId — callback is stable via ref
}
