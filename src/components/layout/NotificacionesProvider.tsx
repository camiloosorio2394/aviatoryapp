import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import { toast } from "sonner"
import {
  escucharAvisos,
  LIMITE_AVISOS,
  marcarLogrosVistos,
  marcarTodosLeidos as marcarTodosLeidosEnLaBase,
  revisarLogros,
  traerAvisos,
  traerLogrosPendientes,
} from "@/services/notificaciones"
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

async function mostrarLogrosPendientes(userId: string) {
  const pendientes = await traerLogrosPendientes(userId)
  for (const logro of pendientes) {
    // El id hace que dos avisos casi simultáneos no repitan el mismo toast.
    toast.success(`${logro.icon}  ¡Logro desbloqueado!`, {
      id: `logro-${logro.id}`,
      description: `${logro.name}: ${logro.description}`,
      duration: 6000,
      className: "achievement-toast",
    })
  }
  await marcarLogrosVistos(userId, pendientes.map((l) => l.id))
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
    // Si falla, lo que ya se tenía se queda: el próximo evento o la próxima
    // reconexión lo vuelven a intentar.
    const lista = await traerAvisos(userId)
    if (lista) {
      setNotifications(lista)
      setUnreadCount(lista.filter((n) => n.read_at === null).length)
    }
    setCargado(true)
  }, [userId])

  const markAllRead = useCallback(async () => {
    if (!userId || unreadCount === 0) return
    if (!(await marcarTodosLeidosEnLaBase())) return
    const ahora = new Date().toISOString()
    setNotifications((prev) => prev.map((n) => (n.read_at ? n : { ...n, read_at: ahora })))
    setUnreadCount(0)
  }, [userId, unreadCount])

  useEffect(() => {
    if (!userId) return
    let vivo = true
    let cerrar: (() => void) | null = null

    void (async () => {
      await revisarLogros(userId)
      if (!vivo) return
      void refresh()
      void mostrarLogrosPendientes(userId)

      cerrar = escucharAvisos(userId, {
        alLlegar: (n) => {
          setNotifications((prev) => [n, ...prev].slice(0, LIMITE_AVISOS))
          setUnreadCount((c) => c + 1)
          if (n.type === "achievement") void mostrarLogrosPendientes(userId)
        },
        alSuscribir: () => {
          void refresh()
          void mostrarLogrosPendientes(userId)
        },
      })
    })()

    return () => {
      vivo = false
      cerrar?.()
    }
  }, [userId, refresh])

  const valor = useMemo<Notificaciones>(
    () => ({ notifications, unreadCount, loading, markAllRead, refresh }),
    [notifications, unreadCount, loading, markAllRead, refresh],
  )

  return <NotificacionesContext.Provider value={valor}>{children}</NotificacionesContext.Provider>
}
