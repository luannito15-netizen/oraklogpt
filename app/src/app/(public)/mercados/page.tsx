import { getOpenEvents } from "@/lib/events";
import { MercadosClient } from "./mercados-client";

export default async function MercadosPage() {
  const events = await getOpenEvents();
  return <MercadosClient events={events} />;
}
