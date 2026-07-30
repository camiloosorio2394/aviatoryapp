import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Bell, Check, Inbox } from "lucide-react"
import { useNotifications } from "@/hooks/useNotifications"

function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 60) return "ahora"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `hace ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `hace ${hours}h`
  const days = Math.floor(hours / 24)
  if (days < 7) return `hace ${days}d`
  return new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "short" })
}

export function NotificationsBell() {
  const [open, setOpen] = useState(false)
  const { notifications, unreadCount, markAllRead } = useNotifications()
  const rootRef = useRef<HTMLDivElement | null>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handle(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    window.addEventListener("mousedown", handle)
    return () => window.removeEventListener("mousedown", handle)
  }, [open])

  // Close on ESC
  useEffect(() => {
    if (!open) return
    function handle(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handle)
    return () => window.removeEventListener("keydown", handle)
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Notificaciones"
        aria-expanded={open}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span
            className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full text-white text-[12px] font-bold flex items-center justify-center shadow-md tabular"
            style={{ background: "var(--destructive)" }}
            aria-label={`${unreadCount} notificaciones sin leer`}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-2rem)] rounded-2xl border border-border/60 bg-card shadow-2xl overflow-hidden z-50">
          <header className="px-4 py-3 border-b border-border/40 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Notificaciones</h3>
              {/* "Estás al día" solo tiene sentido si alguna vez hubo algo que
                  leer; con la lista vacía es "Nada nuevo". */}
              <p className="text-xs text-muted-foreground">
                {unreadCount > 0
                  ? `${unreadCount} sin leer`
                  : notifications.length === 0
                    ? "Nada nuevo"
                    : "Estás al día"}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs text-primary hover:underline font-medium flex items-center gap-1"
              >
                <Check className="h-3 w-3" />
                Marcar todas
              </button>
            )}
          </header>

          <div className="max-h-[28rem] overflow-y-auto">
            {notifications.length === 0 ? (
              /* Primer contacto: en vez de un gris suelto, explicamos qué va a
                 avisar Aviatory y dejamos una salida concreta. */
              <div className="px-5 py-7">
                <div
                  className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: "color-mix(in oklab, var(--av-blue-500) 12%, transparent)",
                    border: "1px solid color-mix(in oklab, var(--av-blue-500) 28%, transparent)",
                  }}
                >
                  <Inbox className="h-5 w-5" style={{ color: "var(--av-blue-500)" }} />
                </div>
                <p className="text-center text-sm font-semibold text-foreground">
                  Todavía no hay avisos
                </p>
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  Aviatory te avisa cuando:
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: "var(--av-amber-400)" }}
                    />
                    Se acerca el vencimiento de una licencia o un certificado.
                  </li>
                  {/* Solo los dos avisos que la app genera de verdad:
                      check_my_expiries y trigger_notify_achievement. */}
                  <li className="flex gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: "var(--av-green-400)" }}
                    />
                    Desbloqueas un logro nuevo.
                  </li>
                </ul>
                <Link
                  to="/app/vencimientos"
                  onClick={() => setOpen(false)}
                  className="mt-4 flex h-9 items-center justify-center rounded-lg text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--av-blue-500)" }}
                >
                  Cargar mis vencimientos
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-border/40">
                {notifications.map((n) => {
                  const Content = (
                    <div
                      className={`px-4 py-3 flex gap-3 transition-colors ${
                        n.action_url ? "hover:bg-muted/50 cursor-pointer" : ""
                      }`}
                      style={
                        n.read_at === null
                          ? { background: "color-mix(in oklab, var(--av-blue-500) 7%, transparent)" }
                          : undefined
                      }
                    >
                      <div className="flex-shrink-0 leading-none">
                        {n.icon ? (
                          <span className="text-2xl">{n.icon}</span>
                        ) : (
                          <Inbox className="h-5 w-5" style={{ color: "var(--av-blue-500)" }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="text-sm font-semibold truncate">{n.title}</h4>
                          {n.read_at === null && (
                            <span
                              aria-label="Sin leer"
                              className="flex-shrink-0 h-2 w-2 rounded-full"
                              style={{ background: "var(--av-blue-500)" }}
                            />
                          )}
                        </div>
                        {n.body && (
                          <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                            {n.body}
                          </p>
                        )}
                        <p className="mt-1 text-[12.5px] text-muted-foreground">
                          {timeAgo(n.created_at)}
                        </p>
                      </div>
                    </div>
                  )
                  return (
                    <li key={n.id}>
                      {n.action_url ? (
                        <Link to={n.action_url} onClick={() => setOpen(false)}>
                          {Content}
                        </Link>
                      ) : (
                        Content
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
