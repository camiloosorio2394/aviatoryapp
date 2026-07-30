import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"

interface AchievementJoin {
  achievement_id: number
  unlocked_at: string
  seen: boolean
  achievements:
    | { name: string; description: string; icon: string; tier: string }
    | { name: string; description: string; icon: string; tier: string }[]
    | null
}

const POLL_MS = 25_000

/**
 * Hook que detecta achievements nuevos (unseen) y muestra toasts celebrando
 * el logro. Después marca como `seen = true` para no repetirlo.
 *
 * Llama `supabase.rpc('check_and_unlock_achievements')` antes de leer, para
 * forzar evaluación inmediata (útil si el trigger DB todavía no corrió).
 *
 * Se ejecuta en mount, on focus, y cada POLL_MS mientras la pestaña está activa.
 */
export function useAchievementToasts() {
  const { user } = useSession()
  const lastSeenAt = useRef<string | null>(null)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    let timer: number | undefined

    async function check() {
      if (!user || cancelled) return
      // Fire trigger-like check (idempotent — already-unlocked are skipped)
      try {
        await supabase.rpc("check_and_unlock_achievements", { p_user_id: user.id })
      } catch {
        /* silent */
      }

      const { data, error } = await supabase
        .from("user_achievements")
        .select("achievement_id, unlocked_at, seen, achievements(name, description, icon, tier)")
        .eq("user_id", user.id)
        .eq("seen", false)
        .order("unlocked_at", { ascending: false })

      if (error || !data) return

      const newOnes = data as AchievementJoin[]
      if (newOnes.length === 0) return

      const newlyShownIds: number[] = []
      for (const row of newOnes) {
        const ach = Array.isArray(row.achievements) ? row.achievements[0] : row.achievements
        if (!ach) continue
        toast.success(`${ach.icon}  ¡Logro desbloqueado!`, {
          description: `${ach.name}: ${ach.description}`,
          duration: 6000,
          className: "achievement-toast",
        })
        newlyShownIds.push(row.achievement_id)
      }

      if (newlyShownIds.length > 0) {
        await supabase
          .from("user_achievements")
          .update({ seen: true })
          .eq("user_id", user.id)
          .in("achievement_id", newlyShownIds)
      }
      lastSeenAt.current = newOnes[0]?.unlocked_at ?? lastSeenAt.current
    }

    function schedule() {
      timer = window.setTimeout(async () => {
        await check()
        if (!cancelled) schedule()
      }, POLL_MS)
    }

    // Initial check
    check()
    schedule()

    // On window focus re-check (catches achievements unlocked since last tab activity)
    const onFocus = () => check()
    window.addEventListener("focus", onFocus)

    return () => {
      cancelled = true
      if (timer) window.clearTimeout(timer)
      window.removeEventListener("focus", onFocus)
    }
  }, [user])
}
