/**
 * Avisos del piloto y logros desbloqueados.
 *
 * Nada de esto es crítico para que la app funcione: si una consulta falla se
 * avisa por consola y se sigue, porque el próximo evento o la próxima
 * reconexión lo vuelven a intentar. Por eso `console.warn` y no
 * `reportarError`.
 */

import { supabase } from "@/integrations/supabase/client"
import type { RealtimeChannel } from "@supabase/supabase-js"
import type { Notification } from "@/hooks/useNotifications"

/** Cuántos avisos trae la lista. */
export const LIMITE_AVISOS = 30

/** Un logro recién desbloqueado, ya aplanado para mostrarlo. */
export interface LogroDesbloqueado {
  id: number
  name: string
  description: string
  icon: string
}

interface FilaLogro {
  achievement_id: number
  achievements:
    | { name: string; description: string; icon: string }
    | { name: string; description: string; icon: string }[]
    | null
}

/** Los avisos del piloto, del más nuevo al más viejo. `null` si no se pudo. */
export async function traerAvisos(userId: string): Promise<Notification[] | null> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(LIMITE_AVISOS)
  if (error) {
    console.warn("notifications", error.message)
    return null
  }
  return (data ?? []) as Notification[]
}

/** Marca todos como leídos. Devuelve si se pudo. */
export async function marcarTodosLeidos(): Promise<boolean> {
  const { error } = await supabase.rpc("mark_all_notifications_read")
  if (error) {
    console.warn("mark_all_notifications_read", error.message)
    return false
  }
  return true
}

/**
 * Le pide a la base que revise todos los logros del piloto.
 *
 * Los desbloquea ella: cada tabla que los mueve tiene un disparador que evalúa
 * su grupo. Esta pasada completa es para los que cambiaron sin que el piloto
 * escribiera nada (un umbral de aprobación, o el catálogo de un módulo que
 * creció).
 */
export async function revisarLogros(userId: string): Promise<void> {
  const { error } = await supabase.rpc("check_and_unlock_achievements", { p_user_id: userId })
  if (error) console.warn("check_and_unlock_achievements", error.message)
}

/**
 * Los logros desbloqueados que el piloto todavía no ha visto.
 *
 * El `select` con join devuelve el logro suelto o dentro de un arreglo según
 * cómo resuelva PostgREST la relación; las dos formas valen. Los que vengan
 * sin logro se descartan en vez de pintar un toast vacío.
 */
export async function traerLogrosPendientes(userId: string): Promise<LogroDesbloqueado[]> {
  const { data, error } = await supabase
    .from("user_achievements")
    .select("achievement_id, achievements(name, description, icon)")
    .eq("user_id", userId)
    .eq("seen", false)
    .order("unlocked_at", { ascending: false })
  if (error) {
    console.warn("user_achievements", error.message)
    return []
  }
  const pendientes: LogroDesbloqueado[] = []
  for (const fila of (data ?? []) as FilaLogro[]) {
    const logro = Array.isArray(fila.achievements) ? fila.achievements[0] : fila.achievements
    if (!logro) continue
    pendientes.push({ id: fila.achievement_id, ...logro })
  }
  return pendientes
}

/** Deja de mostrar estos logros la próxima vez. */
export async function marcarLogrosVistos(userId: string, ids: number[]): Promise<void> {
  if (ids.length === 0) return
  const { error } = await supabase
    .from("user_achievements")
    .update({ seen: true })
    .eq("user_id", userId)
    .in("achievement_id", ids)
  if (error) console.warn("user_achievements seen", error.message)
}

/**
 * Una sola suscripción de Realtime a los avisos del piloto.
 *
 * `alSuscribir` se llama cada vez que el canal queda suscrito (al entrar y al
 * reconectar), que es lo que hace que no se pierda lo que llegó sin conexión.
 * Devuelve la función para cerrarlo.
 */
export function escucharAvisos(
  userId: string,
  manejadores: { alLlegar: (aviso: Notification) => void; alSuscribir: () => void },
): () => void {
  const canal: RealtimeChannel = supabase
    .channel(`notifs:${userId}`)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${userId}` },
      (payload) => manejadores.alLlegar(payload.new as Notification),
    )
    .subscribe((estado) => {
      if (estado === "SUBSCRIBED") manejadores.alSuscribir()
    })

  return () => {
    void supabase.removeChannel(canal)
  }
}
