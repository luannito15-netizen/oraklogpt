import { getOpenEvents } from "@/lib/events";
import { EventsGrid } from "./events-grid";

export default async function EventsPage() {
  const events = await getOpenEvents();
  return <EventsGrid initialEvents={events} />;
}
