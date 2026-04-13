import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

// Shared singleton — use for read-only queries where a single connection is fine.
export const supabase = supabaseCreateClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Factory — use when you need an isolated client instance (e.g. Realtime channels
// that must be torn down independently on unmount).
export function createClient() {
  return supabaseCreateClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
