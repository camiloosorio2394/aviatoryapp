import { supabase } from "@/integrations/supabase/client"

/** Resultado guardado de un simulacro TEA. */
export interface MockResult {
  id: number
  taken_at: string
  duration_seconds: number
  total_items: number
  scores: Record<string, number>
  final_level: number | null
  recorded: boolean
}

export async function fetchMockHistory(userId: string, limit = 12): Promise<MockResult[]> {
  const { data, error } = await supabase
    .from("user_icao_mock_results")
    .select("id,taken_at,duration_seconds,total_items,scores,final_level,recorded")
    .eq("user_id", userId)
    .order("taken_at", { ascending: false })
    .limit(limit)
  if (error) {
    console.error("fetchMockHistory", error)
    return []
  }
  return (data ?? []) as MockResult[]
}

export async function saveMockResult(input: {
  userId: string
  durationSeconds: number
  totalItems: number
  scores: Record<string, number>
  finalLevel: number | null
  recorded: boolean
}): Promise<{ ok: boolean }> {
  const { error } = await supabase.from("user_icao_mock_results").insert({
    user_id: input.userId,
    duration_seconds: input.durationSeconds,
    total_items: input.totalItems,
    scores: input.scores,
    final_level: input.finalLevel,
    recorded: input.recorded,
  })
  if (error) {
    console.error("saveMockResult", error)
    return { ok: false }
  }
  return { ok: true }
}
