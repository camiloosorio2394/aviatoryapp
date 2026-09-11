import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import type { RealtimeChannel } from "@supabase/supabase-js"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { NotificacionesContext, type Notification, type Notificaciones } from "@/hooks/useNotifications"

/**
 * Avisos del piloto y toasts de logros, por eventos y sin sondeo.
 *
 * Se monta una vez, en AppLayout, con una sola suscripción de Realtime a las
 * filas de `notifications` del piloto:
 * - La lista y los logros pendientes se traen al abrir la sesión y otra vez cada
 *   vez que el canal queda suscrito (al entrar y al reconectar): lo que llegó
 *   sin conexión no se pierde, y si Realtime no conecta la lista igual llega.
 * - Un aviso nuevo entra a la lista; si es de un logro, sale su toast.
 *
 * Los logros los desbloquea la base: cada tabla que los mueve tiene un
 * disparador que evalúa su grupo de logros, y cada logro nuevo inserta su aviso.
 * La app pide una evaluación completa al abrir la sesión, antes de suscribirse,
 * para los que cambiaron sin que el piloto escribiera nada (un umbral de
 * aprobación, o el catálogo de un módulo que creció).
 */

const LIMITE = 30

interface LogroPendiente {
  achievement_id: number
  achievements: { name: string; description: string; icon: string } | { name: string; description: string; icon: string }[] | null
}

async function mostrarLogrosPendientes(userId: string) {
  const { data, error } = await supabase
    .from("user_achievements")
    .select("achievement_id, achievements(name, description, icon)")
    .eq("user_id", userId)
    .eq("seen", false)
    .order("unlocked_at", { ascending: false })
  if (error) {
    console.warn("user_achievements", error.message)
    return
  }

  const mostrados: number[] = []
  for (const fila of (data ?? []) as LogroPendiente[]) {
    const logro = Array.isArray(fila.achievements) ? fila.achievements[0] : fila.achievements
    if (!logro) continue
    // El id hace que dos avisos casi simultáneos no repitan el mismo toast.
    toast.success(`${logro.icon}  ¡Logro desbloqueado!`, {
      id: `logro-${fila.achievement_id}`,
      description: `${logro.name}: ${logro.description}`,
      duration: 6000,
      className: "achievement-toast",
    })
    mostrados.push(fila.achievement_id)
  }
  if (mostrados.length === 0) return

  const { error: errorVisto } = await supabase
    .from("user_achievements")
    .update({ seen: true })
    .eq("user_id", userId)
    .in("achievement_id", mostrados)
  if (errorVisto) console.warn("user_achievements seen", errorVisto.message)
}

export function NotificacionesProvider({ children }: { children: ReactNode }) {
  const { user } = useSession()
  // El id y no el objeto: renovar el token cambia el objeto y no debe resuscribir.
  const userId = user?.id
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [cargado, setCargado] = useState(false)
  const loading = !!userId && !cargado

  const refresh = useCallback(async () => {
    if (!userId) return
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(LIMITE)
    if (error) {
      // Lo que ya se tenía se queda; el próximo evento o reconexión lo vuelve a intentar.
      console.warn("notifications", error.message)
    } else {
      const lista = (data ?? []) as Notification[]
      setNotifications(lista)
      setUnreadCount(lista.filter((n) => n.read_at === null).length)
    }
    setCargado(true)
  }, [userId])

  const markAllRead = useCallback(async () => {
    if (!userId || unreadCount === 0) return
    const { error } = await supabase.rpc("mark_all_notifications_read")
    if (error) {
      console.warn("mark_all_notifications_read", error.message)
      return
    }
    const ahora = new Date().toISOString()
    setNotifications((prev) => prev.map((n) => (n.read_at ? n : { ...n, read_at: ahora })))
    setUnreadCount(0)
  }, [userId, unreadCount])

  useEffect(() => {
    if (!userId) return
    let vivo = true
    let canal: RealtimeChannel | null = null

    void (async () => {
      const { error } = await supabase.rpc("check_and_unlock_achievements", { p_user_id: userId })
      if (error) console.warn("check_and_unlock_achievements", error.message)
      if (!vivo) return
      void refresh()
      void mostrarLogrosPendientes(userId)

      canal = supabase
        .channel(`notifs:${userId}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${userId}` },
          (payload) => {
            const n = payload.new as Notification
            setNotifications((prev) => [n, ...prev].slice(0, LIMITE))
            setUnreadCount((c) => c + 1)
            if (n.type === "achievement") void mostrarLogrosPendientes(userId)
          },
        )
        .subscribe((estado) => {
          if (estado !== "SUBSCRIBED") return
          void refresh()
          void mostrarLogrosPendientes(userId)
        })
    })()

    return () => {
      vivo = false
      if (canal) void supabase.removeChannel(canal)
    }
  }, [userId, refresh])

  const valor = useMemo<Notificaciones>(
    () => ({ notifications, unreadCount, loading, markAllRead, refresh }),
    [notifications, unreadCount, loading, markAllRead, refresh],
  )

  return <NotificacionesContext.Provider value={valor}>{children}</NotificacionesContext.Provider>
}
