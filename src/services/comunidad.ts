/**
 * Comunidad: los canales y la señal de actividad de cada uno.
 *
 * Los mensajes de un canal abierto no están aquí: viven en
 * `hooks/useMensajesCanal.ts`, que además maneja la suscripción en vivo. Aquí
 * está lo que necesitan las dos pantallas para pintarse.
 */

import { supabase } from "@/integrations/supabase/client"
import type { ChannelType } from "@/lib/communityChannels"

export interface Channel {
  id: number
  slug: string
  name: string
  description: string | null
  type: ChannelType
  emoji: string | null
  member_count: number
  order_index: number
}

export interface MessageMeta {
  channel_id: number
  created_at: string
}

export interface ChannelActivity {
  messages: number
  lastAt: string
}

/**
 * Muestra de mensajes para calcular señal de actividad por canal. Con el
 * volumen actual entra completa; si algún día se supera, el conteo sigue
 * siendo «al menos esto», nunca un número inventado.
 */
export const MESSAGE_SAMPLE = 2000

export interface PortadaComunidad {
  canales: Channel[]
  actividad: Record<number, ChannelActivity>
  etapa: string | null
  aerolineaObjetivo: string | null
  /** Sin la lista de canales no hay pantalla que pintar: eso sí es un fallo. */
  fallo: boolean
}

/** Cuántos mensajes tiene cada canal en la muestra y cuál es el más reciente. */
export function agruparActividad(filas: MessageMeta[]): Record<number, ChannelActivity> {
  const mapa: Record<number, ChannelActivity> = {}
  for (const fila of filas) {
    const actual = mapa[fila.channel_id]
    if (actual) {
      actual.messages += 1
      if (Date.parse(fila.created_at) > Date.parse(actual.lastAt)) actual.lastAt = fila.created_at
    } else {
      mapa[fila.channel_id] = { messages: 1, lastAt: fila.created_at }
    }
  }
  return mapa
}

/**
 * Todo lo de la portada en una tanda.
 *
 * Si fallan los mensajes, la pantalla se pinta igual y los canales salen sin
 * señal de actividad: es un adorno, no el contenido. Si falla la lista de
 * canales no hay nada que mostrar, y eso sí sale como fallo.
 */
export async function traerPortadaComunidad(userId: string | undefined): Promise<PortadaComunidad> {
  const [canalesRes, mensajesRes, pilotRes] = await Promise.all([
    supabase.from("community_channels").select("*").order("order_index"),
    supabase
      .from("community_messages")
      .select("channel_id, created_at")
      .order("created_at", { ascending: false })
      .limit(MESSAGE_SAMPLE),
    userId
      ? supabase.from("pilot_state").select("stage, target_airline").eq("user_id", userId).maybeSingle()
      : Promise.resolve({ data: null, error: null }),
  ])

  if (canalesRes.error) {
    return { canales: [], actividad: {}, etapa: null, aerolineaObjetivo: null, fallo: true }
  }

  const piloto = pilotRes.data as { stage: string | null; target_airline: string | null } | null
  return {
    canales: (canalesRes.data ?? []) as Channel[],
    actividad: mensajesRes.error ? {} : agruparActividad((mensajesRes.data ?? []) as MessageMeta[]),
    etapa: piloto?.stage ?? null,
    aerolineaObjetivo: piloto?.target_airline ?? null,
    fallo: false,
  }
}

/** Un canal por su nombre en la URL. Lanza si no existe, y la pantalla lo avisa. */
export async function traerCanalPorSlug(slug: string): Promise<Channel> {
  const { data, error } = await supabase.from("community_channels").select("*").eq("slug", slug).single()
  if (error) throw error
  return data as Channel
}
