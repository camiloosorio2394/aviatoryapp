import { createContext, useContext } from "react"

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

export interface Notificaciones {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  markAllRead: () => Promise<void>
  refresh: () => Promise<void>
}

/**
 * Lo publica NotificacionesProvider, que vive en AppLayout: una sola suscripción
 * por sesión, compartida por quien muestre avisos.
 */
export const NotificacionesContext = createContext<Notificaciones | null>(null)

export function useNotifications(): Notificaciones {
  const valor = useContext(NotificacionesContext)
  if (!valor) throw new Error("useNotifications se usa dentro de NotificacionesProvider (AppLayout)")
  return valor
}
