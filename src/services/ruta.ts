/**
 * Mi ruta: la checklist de la etapa en la que está el piloto.
 *
 * Todo lanza. supabase-js no lanza por su cuenta, y sin revisar el error una
 * falla de red salía en pantalla como «completa tu perfil» y mandaba al
 * onboarding a alguien que ya lo había hecho.
 */

import { supabase } from "@/integrations/supabase/client"

export type PilotStage =
  | "student_ppl"
  | "ppl"
  | "cpl_in_progress"
  | "cpl_ready"
  | "hour_building"
  | "instructor"
  | "airline_candidate"

export interface Checklist {
  id: number
  stage: PilotStage
  name: string
  description: string | null
}

export interface ChecklistItem {
  id: number
  checklist_id: number
  key: string
  title: string
  description: string | null
  category: string | null
  order_index: number
}

export interface RutaDelPiloto {
  /** `null` cuando no hay etapa: ahí la pantalla manda al onboarding. */
  etapa: PilotStage | null
  /** `null` cuando la etapa no tiene checklist todavía. */
  checklist: Checklist | null
  items: ChecklistItem[]
  completados: Set<number>
}

const SIN_ETAPA: RutaDelPiloto = { etapa: null, checklist: null, items: [], completados: new Set() }

/**
 * La etapa, su checklist y lo que el piloto ya marcó.
 *
 * Se corta apenas falta algo: sin etapa no hay checklist que buscar, y sin
 * checklist no hay ítems.
 */
export async function traerRuta(userId: string): Promise<RutaDelPiloto> {
  const { data: estado, error: errorEtapa } = await supabase
    .from("pilot_state")
    .select("stage")
    .eq("user_id", userId)
    .maybeSingle()
  if (errorEtapa) throw errorEtapa

  const etapa = (estado as { stage?: PilotStage } | null)?.stage ?? null
  if (!etapa) return SIN_ETAPA

  const { data: fila, error: errorChecklist } = await supabase
    .from("checklists")
    .select("*")
    .eq("stage", etapa)
    .order("order_index")
    .limit(1)
    .maybeSingle()
  if (errorChecklist) throw errorChecklist

  const checklist = (fila as Checklist | null) ?? null
  if (!checklist) return { ...SIN_ETAPA, etapa }

  const [itemsRes, progresoRes] = await Promise.all([
    supabase.from("checklist_items").select("*").eq("checklist_id", checklist.id).order("order_index"),
    supabase.from("checklist_progress").select("item_id").eq("user_id", userId),
  ])
  if (itemsRes.error) throw itemsRes.error
  if (progresoRes.error) throw progresoRes.error

  return {
    etapa,
    checklist,
    items: (itemsRes.data ?? []) as ChecklistItem[],
    completados: new Set(((progresoRes.data ?? []) as { item_id: number }[]).map((p) => p.item_id)),
  }
}

/** Marca un ítem como hecho. Lanza para que la pantalla pueda deshacerlo. */
export async function marcarItem(userId: string, itemId: number): Promise<void> {
  const { error } = await supabase.from("checklist_progress").insert({ user_id: userId, item_id: itemId })
  if (error) throw error
}

/** Lo desmarca. Lanza igual, por la misma razón. */
export async function desmarcarItem(userId: string, itemId: number): Promise<void> {
  const { error } = await supabase
    .from("checklist_progress")
    .delete()
    .eq("user_id", userId)
    .eq("item_id", itemId)
  if (error) throw error
}
