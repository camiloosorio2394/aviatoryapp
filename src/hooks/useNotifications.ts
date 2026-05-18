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
  const [loading, setLoading] = useState(false)

  const fetchAll = useCallback(async () => {
    if (!user) return
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(30)
    if (!error) {
      const list = (data ?? []) as Notification[]
      setNotifications(list)
      setUnreadCount(list.filter((n) => n.read_at === null).length)
    }
    setLoading(false)
  }, [user])

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
    setLoading(true)
    fetchAll()

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
      window.clearInterval(timer)
      supabase.removeChannel(channel)
    }
  }, [user, fetchAll])

  return { notifications, unreadCount, loading, markAllRead, refresh: fetchAll }
}
