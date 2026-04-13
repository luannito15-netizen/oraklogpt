"use server";

import { createClient } from "@supabase/supabase-js";

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

// Service role key bypasses RLS — safe because this file only runs on the server ("use server").
function getServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export interface PositionReceiptData {
  positionId: string;
  cotacao: number;
  estimatedReturn: number;
  fee: number;
}

export type PlacePositionResult =
  | { success: true; data: PositionReceiptData }
  | { success: false; error: string };

export async function placePosition(
  eventId: string,
  uiSide: "SIM" | "NAO",
  amount: number
): Promise<PlacePositionResult> {
  // Schema CHECK constraint: side IN ('SIM','NAO') — keep as-is, no conversion.
  const supabase = getServerClient();

  // Call the place_position DB function which atomically inserts the position
  // and updates market_state + market_history in a single transaction.
  const { data, error } = await supabase.rpc("place_position", {
    p_user_id:     MOCK_USER_ID,
    p_event_id:    eventId,
    p_side:        uiSide,
    p_value_gross: amount,
  });

  if (error) {
    console.error("[place-position] rpc error:", error.message);
    return {
      success: false,
      error: "Não foi possível registrar sua posição. Tente novamente.",
    };
  }

  // The RPC returns a JSON object with position receipt fields.
  // We cast through unknown because supabase-js types the RPC return as `unknown`.
  const rpc = data as {
    position_id: string;
    cotacao: number;
    estimated_return: number;
    fee: number;
  };

  return {
    success: true,
    data: {
      positionId:     rpc.position_id,
      cotacao:        rpc.cotacao,
      estimatedReturn: rpc.estimated_return,
      fee:            rpc.fee,
    },
  };
}
