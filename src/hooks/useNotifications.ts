import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"

export interface Notification {
  id: number
  type: "achievement" | "streak_at_risk" | "milestone_close" | "expiry_warning" | "community_mention" | "wingman_insight"
  title: string
  body: string | null
  icon: string | null
  action_url: string | null
  read_at: string | null
  created_at: string
}

const POLL_MS = 30_000

export function useNotifications() {
  const { user } = useSession()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  // Se está cargando mientras haya sesión y todavía no haya llegado la primera
  // tanda. Antes era un estado que el efecto ponía en true nada más entrar, que
  // es justo un setState en el cuerpo del efecto.
  const [cargado, setCargado] = useState(false)
  const loading = !!user && !cargado

  /** Trae y devuelve. Null si no hay sesión o si la consulta falla: en los dos
   *  casos lo que ya se tenía se queda como está. */
  const traer = useCallback(async () => {
    if (!user) return null
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(30)
    return error ? null : ((data ?? []) as Notification[])
  }, [user])

  const aplicar = useCallback((list: Notification[] | null) => {
    if (list) {
      setNotifications(list)
      setUnreadCount(list.filter((n) => n.read_at === null).length)
    }
    setCargado(true)
  }, [])

  const fetchAll = useCallback(async () => {
    aplicar(await traer())
  }, [traer, aplicar])

  const markAllRead = useCallback(async () => {
    if (!user || unreadCount === 0) return
    await supabase.rpc("mark_all_notifications_read")
    setNotifications((prev) =>
      prev.map((n) => (n.read_at ? n : { ...n, read_at: new Date().toISOString() }))
    )
    setUnreadCount(0)
  }, [user, unreadCount])

  useEffect(() => {
    if (!user) return
    let vivo = true
    void traer().then((list) => {
      if (vivo) aplicar(list)
    })

    // Realtime — escucha inserts en notifications del user
    const channel = supabase
      .channel(`notifs:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const n = payload.new as Notification
          setNotifications((prev) => [n, ...prev].slice(0, 30))
          setUnreadCount((c) => c + 1)
        }
      )
      .subscribe()

    // Fallback polling for tabs that lose realtime conn
    const timer = window.setInterval(fetchAll, POLL_MS)

    return () => {
      vivo = false
      window.clearInterval(timer)
      supabase.removeChannel(channel)
    }
  }, [user, traer, aplicar, fetchAll])

  return { notifications, unreadCount, loading, markAllRead, refresh: fetchAll }
}
