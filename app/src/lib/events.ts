import { supabase } from "./supabase/client";
import type { EventCardData } from "@/components/ui/event-card";

// image_url excluded: view must be recreated after ALTER TABLE (run migration 004b)
const VIEW_COLUMNS =
  "id, title, status, category, source, deadline_at, yes_amount, no_amount, total_volume, yes_percent, no_percent";

function toEventCardData(row: Record<string, unknown>): EventCardData {
  const deadlineAtRaw = row.deadline_at as string;
  const deadlineAt = new Date(deadlineAtRaw);
  const now = new Date();
  const diffMs = deadlineAt.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const deadlineDays = Math.max(0, diffDays);
  const deadline =
    diffDays <= 0 ? "hoje" : diffDays === 1 ? "1 dia" : `${diffDays} dias`;

  const yesPercent = (row.yes_percent as number) ?? 50;
  const noPercent = (row.no_percent as number) ?? 50;
  const totalVolume = (row.total_volume as number) ?? 0;

  return {
    id: row.id as string,
    title: row.title as string,
    category: row.category as string,
    status: row.status as "open" | "closed" | "resolved" | "canceled",
    // UI fields — keep existing names so components need no changes
    simPercent: Math.round(yesPercent),
    volume: Math.round(totalVolume),
    deadline,
    deadlineDays,
    deadlineAt: deadlineAtRaw,
    source: row.source as string,
    // Raw breakdown fields
    yesAmount: (row.yes_amount as number) ?? 0,
    noAmount: (row.no_amount as number) ?? 0,
    totalVolume,
    yesPercent,
    noPercent,
    imageUrl: null,
  };
}

export async function getOpenEvents(): Promise<EventCardData[]> {
  const { data, error } = await supabase
    .from("v_events_with_state")
    .select(VIEW_COLUMNS)
    .eq("status", "open")
    .order("deadline_at", { ascending: true });

  if (error) throw error;
  if (!data) return [];

  return data.map((row) => toEventCardData(row as Record<string, unknown>));
}

export async function getEventById(id: string): Promise<EventCardData | null> {
  const { data, error } = await supabase
    .from("v_events_with_state")
    .select(VIEW_COLUMNS)
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) return null;

  return toEventCardData(data as Record<string, unknown>);
}
