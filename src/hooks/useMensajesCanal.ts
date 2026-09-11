import { useCallback, useEffect, useRef, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { esTopeDePublicaciones } from "@/lib/topes"

/**
 * Mensajes de un canal de la comunidad: por páginas, en vivo y con sus autores.
 *
 * - Entra con los últimos PAGINA_MENSAJES; «Ver mensajes anteriores» trae la
 *   página previa por fecha (índice channel_id, created_at desc). Antes traía
 *   los 200 más viejos: pasado ese número, nadie veía lo reciente al entrar.
 * - La última página se trae al abrir y otra vez cada vez que Realtime queda
 *   suscrito (al entrar y al reconectar), y se une con lo que había. Si Realtime
 *   no conecta, los mensajes igual llegan.
 * - Cada autor se pide una sola vez (comunidad_autores: nombre, foto y racha).
 *   Antes el efecto dependía de su propio estado y volvía a pedir sin parar las
 *   rachas que RLS no deja leer.
 * - Las reacciones se piden una vez por página cargada, no con cada mensaje.
 */

export const PAGINA_MENSAJES = 50
const COLUMNAS = "id, channel_id, user_id, content, edited_at, created_at"

export interface MensajeCanal {
  id: number
  channel_id: number
  user_id: string
  content: string
  edited_at: string | null
  created_at: string
}

export interface ReaccionCanal {
  message_id: number
  user_id: string
  emoji: string
}

export interface AutorCanal {
  id: string
  username: string | null
  photo_url: string | null
  current_streak: number
}

const mismaReaccion = (a: ReaccionCanal, b: ReaccionCanal) =>
  a.message_id === b.message_id && a.user_id === b.user_id && a.emoji === b.emoji

/** Une dos listas de mensajes sin repetir, en orden de publicación. */
export function unirMensajes(actuales: MensajeCanal[], nuevos: MensajeCanal[]): MensajeCanal[] {
  const porId = new Map(actuales.map((m) => [m.id, m]))
  for (const m of nuevos) porId.set(m.id, m)
  return [...porId.values()].sort(
    (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at) || a.id - b.id,
  )
}

export function useMensajesCanal(canalId: number | null, userId: string | undefined) {
  const [mensajes, setMensajes] = useState<MensajeCanal[]>([])
  const [reacciones, setReacciones] = useState<ReaccionCanal[]>([])
  const [autores, setAutores] = useState<Record<string, AutorCanal>>({})
  const [hayAnteriores, setHayAnteriores] = useState(false)
  const [cargandoAnteriores, setCargandoAnteriores] = useState(false)
  /** Autores ya pedidos, lleguen o no: así nadie se pide dos veces. */
  const autoresPedidos = useRef(new Set<string>())
  /** Mensajes cuyas reacciones ya se trajeron o se siguen en vivo. */
  const cargados = useRef(new Set<number>())

  const traerPagina = useCallback(
    async (antesDe?: string): Promise<MensajeCanal[] | null> => {
      if (canalId === null) return null
      let consulta = supabase.from("community_messages").select(COLUMNAS).eq("channel_id", canalId)
      if (antesDe) consulta = consulta.lt("created_at", antesDe)
      const { data, error } = await consulta.order("created_at", { ascending: false }).limit(PAGINA_MENSAJES)
      if (error) {
        console.warn("community_messages", error.message)
        return null
      }
      return ((data ?? []) as MensajeCanal[]).reverse()
    },
    [canalId],
  )

  /** Pide los autores que falten y, si se indica, las reacciones de esos mensajes. */
  const completar = useCallback(async (pagina: MensajeCanal[], conReacciones: boolean) => {
    const ids = pagina.map((m) => m.id).filter((id) => id > 0 && !cargados.current.has(id))
    ids.forEach((id) => cargados.current.add(id))
    const faltan = [...new Set(pagina.map((m) => m.user_id))].filter((id) => !autoresPedidos.current.has(id))
    faltan.forEach((id) => autoresPedidos.current.add(id))

    const pedidos: Promise<void>[] = []
    if (conReacciones && ids.length > 0) {
      pedidos.push(
        (async () => {
          const { data, error } = await supabase
            .from("community_reactions")
            .select("message_id, user_id, emoji")
            .in("message_id", ids)
          if (error) {
            console.warn("community_reactions", error.message)
            return
          }
          const llegadas = (data ?? []) as ReaccionCanal[]
          setReacciones((prev) => [...prev, ...llegadas.filter((r) => !prev.some((p) => mismaReaccion(p, r)))])
        })(),
      )
    }
    if (faltan.length > 0) {
      pedidos.push(
        (async () => {
          const { data, error } = await supabase.rpc("comunidad_autores", { p_user_ids: faltan })
          if (error) {
            // Se pueden volver a pedir con la próxima página o el próximo mensaje.
            console.warn("comunidad_autores", error.message)
            faltan.forEach((id) => autoresPedidos.current.delete(id))
            return
          }
          setAutores((prev) => {
            const next = { ...prev }
            for (const a of (data ?? []) as AutorCanal[]) next[a.id] = a
            return next
          })
        })(),
      )
    }
    await Promise.all(pedidos)
  }, [])

  useEffect(() => {
    if (canalId === null) return
    let vivo = true
    let primera = true
    cargados.current = new Set()
    autoresPedidos.current = new Set()

    const traerUltimas = async () => {
      const pagina = await traerPagina()
      if (!vivo || !pagina) return
      if (primera) {
        primera = false
        setMensajes(pagina)
        setReacciones([])
        setHayAnteriores(pagina.length === PAGINA_MENSAJES)
      } else {
        setMensajes((prev) => unirMensajes(prev, pagina))
      }
      await completar(pagina, true)
    }

    void traerUltimas()

    const canal = supabase
      .channel(`channel-${canalId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "community_messages", filter: `channel_id=eq.${canalId}` },
        (payload) => {
          const m = payload.new as MensajeCanal
          setMensajes((prev) => unirMensajes(prev, [m]))
          // Un mensaje recién publicado no tiene reacciones: basta con seguirlo y conocer a su autor.
          void completar([m], false)
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "community_messages", filter: `channel_id=eq.${canalId}` },
        (payload) => {
          const id = (payload.old as { id: number }).id
          setMensajes((prev) => prev.filter((m) => m.id !== id))
        },
      )
      // Las reacciones no tienen canal, así que llegan las de toda la comunidad:
      // solo se toman las de mensajes que están en pantalla.
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "community_reactions" }, (payload) => {
        const r = payload.new as ReaccionCanal
        if (!cargados.current.has(r.message_id)) return
        setReacciones((prev) => (prev.some((p) => mismaReaccion(p, r)) ? prev : [...prev, r]))
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "community_reactions" }, (payload) => {
        const r = payload.old as ReaccionCanal
        setReacciones((prev) => prev.filter((p) => !mismaReaccion(p, r)))
      })
      .subscribe((estado) => {
        if (estado === "SUBSCRIBED") void traerUltimas()
      })

    return () => {
      vivo = false
      void supabase.removeChannel(canal)
    }
  }, [canalId, traerPagina, completar])

  /** Trae la página anterior. Devuelve false si la consulta falló. */
  const cargarAnteriores = useCallback(async (): Promise<boolean> => {
    const primero = mensajes.find((m) => m.id > 0)
    if (!primero || cargandoAnteriores) return true
    setCargandoAnteriores(true)
    const pagina = await traerPagina(primero.created_at)
    setCargandoAnteriores(false)
    if (!pagina) return false
    setMensajes((prev) => unirMensajes(prev, pagina))
    setHayAnteriores(pagina.length === PAGINA_MENSAJES)
    await completar(pagina, true)
    return true
  }, [mensajes, cargandoAnteriores, traerPagina, completar])

  /** Publica un mensaje con respuesta inmediata en pantalla. Devuelve el error, o null. */
  const enviar = useCallback(
    async (texto: string): Promise<string | null> => {
      if (canalId === null || !userId) return "Inicia sesión para escribir."
      const provisional: MensajeCanal = {
        id: -Date.now(),
        channel_id: canalId,
        user_id: userId,
        content: texto,
        edited_at: null,
        created_at: new Date().toISOString(),
      }
      setMensajes((prev) => [...prev, provisional])
      const { data, error } = await supabase
        .from("community_messages")
        .insert({ channel_id: canalId, user_id: userId, content: texto })
        .select(COLUMNAS)
        .single()
      if (error || !data) {
        setMensajes((prev) => prev.filter((m) => m.id !== provisional.id))
        if (error) console.warn("community_messages", error.message)
        return esTopeDePublicaciones(error)
          ? "Vas muy rápido: espera unos minutos para volver a publicar."
          : "No se pudo publicar el mensaje. Revisa tu conexión e inténtalo de nuevo."
      }
      const real = data as MensajeCanal
      setMensajes((prev) => unirMensajes(prev.filter((m) => m.id !== provisional.id), [real]))
      void completar([real], false)
      return null
    },
    [canalId, userId, completar],
  )

  const alternarReaccion = useCallback(
    async (messageId: number, emoji: string) => {
      if (!userId) return
      const reaccion: ReaccionCanal = { message_id: messageId, user_id: userId, emoji }
      if (reacciones.some((r) => mismaReaccion(r, reaccion))) {
        setReacciones((prev) => prev.filter((r) => !mismaReaccion(r, reaccion)))
        const { error } = await supabase
          .from("community_reactions")
          .delete()
          .eq("message_id", messageId)
          .eq("user_id", userId)
          .eq("emoji", emoji)
        if (error) {
          console.warn("community_reactions", error.message)
          setReacciones((prev) => (prev.some((r) => mismaReaccion(r, reaccion)) ? prev : [...prev, reaccion]))
        }
      } else {
        setReacciones((prev) => [...prev, reaccion])
        const { error } = await supabase.from("community_reactions").insert(reaccion)
        if (error) {
          console.warn("community_reactions", error.message)
          setReacciones((prev) => prev.filter((r) => !mismaReaccion(r, reaccion)))
        }
      }
    },
    [reacciones, userId],
  )

  return { mensajes, reacciones, autores, hayAnteriores, cargandoAnteriores, cargarAnteriores, enviar, alternarReaccion }
}
