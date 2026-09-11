import { act, useEffect } from "react"
import { createRoot, type Root } from "react-dom/client"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { Notificaciones, Notification } from "@/hooks/useNotifications"

const supabase = vi.hoisted(() => ({ rpc: vi.fn(), from: vi.fn(), channel: vi.fn(), removeChannel: vi.fn() }))
const toast = vi.hoisted(() => ({ success: vi.fn() }))
const usuario = vi.hoisted(() => ({ id: "piloto-1" }))

vi.mock("@/integrations/supabase/client", () => ({ supabase }))
vi.mock("sonner", () => ({ toast }))
vi.mock("@/hooks/useSession", () => ({ useSession: () => ({ user: usuario }) }))

const { NotificacionesProvider } = await import("@/components/layout/NotificacionesProvider")
const { useNotifications } = await import("@/hooks/useNotifications")

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

type Llamada = { tabla: string; metodos: [string, ...unknown[]][] }

const aviso = (id: number, type: Notification["type"], leido = false): Notification => ({
  id, type, title: `Aviso ${id}`, body: null, icon: null, action_url: null,
  read_at: leido ? "2026-09-10T00:00:00Z" : null, created_at: "2026-09-11T00:00:00Z",
})

let llamadas: Llamada[]
let avisos: Notification[]
let pendientes: { achievement_id: number; achievements: { name: string; description: string; icon: string } }[]
let alInsertar: (payload: { new: Notification }) => void
let alCambiarEstado: (estado: string) => void
let valor: Notificaciones
let root: Root
let contenedor: HTMLDivElement

/** Constructor de consultas encadenable: registra lo que se pide y resuelve según la tabla. */
function consulta(tabla: string) {
  const llamada: Llamada = { tabla, metodos: [] }
  llamadas.push(llamada)
  const constructor: Record<string, unknown> = {
    then: (ok: (v: unknown) => unknown) => {
      const esUpdate = llamada.metodos.some(([m]) => m === "update")
      const data = esUpdate ? null : tabla === "notifications" ? avisos : pendientes
      return Promise.resolve({ data, error: null }).then(ok)
    },
  }
  for (const m of ["select", "eq", "order", "limit", "in", "update"]) {
    constructor[m] = (...args: unknown[]) => {
      llamada.metodos.push([m, ...args])
      return constructor
    }
  }
  return constructor
}

function Espia() {
  const actual = useNotifications()
  useEffect(() => {
    valor = actual
  })
  return null
}

const drenar = () =>
  act(async () => {
    for (let i = 0; i < 20; i++) await Promise.resolve()
  })

async function montar() {
  contenedor = document.createElement("div")
  root = createRoot(contenedor)
  await act(async () => {
    root.render(
      <NotificacionesProvider>
        <Espia />
      </NotificacionesProvider>,
    )
  })
  await drenar()
}

beforeEach(() => {
  llamadas = []
  avisos = [aviso(2, "achievement"), aviso(1, "expiry_warning", true)]
  pendientes = [{ achievement_id: 7, achievements: { name: "Primer paso", description: "Elegiste tu etapa", icon: "🛫" } }]
  supabase.rpc.mockReset().mockResolvedValue({ data: 0, error: null })
  supabase.from.mockReset().mockImplementation(consulta)
  supabase.removeChannel.mockReset()
  toast.success.mockReset()
  const canal = {
    on: vi.fn((_tipo: string, _filtro: unknown, cb: typeof alInsertar) => {
      alInsertar = cb
      return canal
    }),
    subscribe: vi.fn((cb: typeof alCambiarEstado) => {
      alCambiarEstado = cb
      return canal
    }),
  }
  supabase.channel.mockReset().mockReturnValue(canal)
})

afterEach(() => {
  act(() => root.unmount())
  vi.useRealTimers()
})

const consultasA = (tabla: string, sinUpdate = true) =>
  llamadas.filter((l) => l.tabla === tabla && (!sinUpdate || !l.metodos.some(([m]) => m === "update"))).length

describe("NotificacionesProvider", () => {
  it("al entrar evalúa los logros una vez, trae los avisos y se suscribe", async () => {
    await montar()

    expect(supabase.rpc).toHaveBeenCalledTimes(1)
    expect(supabase.rpc).toHaveBeenCalledWith("check_and_unlock_achievements", { p_user_id: "piloto-1" })
    expect(supabase.channel).toHaveBeenCalledWith("notifs:piloto-1")
    // Sin esperar a Realtime: si el socket no conecta, la lista igual llega.
    expect(consultasA("notifications")).toBe(1)
    expect(valor.notifications.map((n) => n.id)).toEqual([2, 1])
  })

  it("al quedar suscrito vuelve a traer y muestra cada logro pendiente una sola vez", async () => {
    await montar()
    alCambiarEstado("SUBSCRIBED")
    await drenar()

    expect(consultasA("notifications")).toBe(2)
    expect(valor.notifications.map((n) => n.id)).toEqual([2, 1])
    expect(valor.unreadCount).toBe(1)
    // Se pidió dos veces (al entrar y al suscribirse); el id del toast evita que se vea dos.
    expect(new Set(toast.success.mock.calls.map((c) => c[1].id))).toEqual(new Set(["logro-7"]))
    expect(toast.success.mock.calls[0][1]).toMatchObject({ id: "logro-7", description: "Primer paso: Elegiste tu etapa" })
    const visto = llamadas.find((l) => l.metodos.some(([m]) => m === "update"))
    expect(visto?.metodos).toContainEqual(["update", { seen: true }])
    expect(visto?.metodos).toContainEqual(["in", "achievement_id", [7]])
  })

  it("no sondea: diez minutos después no hubo más consultas", async () => {
    vi.useFakeTimers()
    await montar()
    alCambiarEstado("SUBSCRIBED")
    await drenar()
    const antes = llamadas.length

    await act(async () => {
      vi.advanceTimersByTime(10 * 60_000)
    })
    await drenar()

    expect(llamadas.length).toBe(antes)
    expect(supabase.rpc).toHaveBeenCalledTimes(1)
  })

  it("un aviso de logro saca su toast; los demás solo entran a la lista", async () => {
    await montar()
    alCambiarEstado("SUBSCRIBED")
    await drenar()
    toast.success.mockReset()

    await act(async () => alInsertar({ new: aviso(3, "expiry_warning") }))
    await drenar()
    expect(valor.notifications[0].id).toBe(3)
    expect(valor.unreadCount).toBe(2)
    expect(toast.success).not.toHaveBeenCalled()

    await act(async () => alInsertar({ new: aviso(4, "achievement") }))
    await drenar()
    expect(valor.unreadCount).toBe(3)
    expect(toast.success).toHaveBeenCalledTimes(1)
  })

  it("al reconectar vuelve a traer la lista: lo que llegó sin conexión no se pierde", async () => {
    await montar()
    alCambiarEstado("SUBSCRIBED")
    await drenar()
    expect(consultasA("notifications")).toBe(2)

    avisos = [aviso(9, "streak_at_risk"), ...avisos]
    alCambiarEstado("CHANNEL_ERROR")
    alCambiarEstado("SUBSCRIBED")
    await drenar()

    expect(consultasA("notifications")).toBe(3)
    expect(valor.notifications[0].id).toBe(9)
  })

  it("marcar leídos solo cambia la lista si el servidor lo registró", async () => {
    await montar()
    alCambiarEstado("SUBSCRIBED")
    await drenar()

    vi.spyOn(console, "warn").mockImplementation(() => {})
    supabase.rpc.mockResolvedValueOnce({ data: null, error: { message: "Failed to fetch" } })
    await act(async () => valor.markAllRead())
    expect(valor.unreadCount).toBe(1)

    supabase.rpc.mockResolvedValueOnce({ data: null, error: null })
    await act(async () => valor.markAllRead())
    expect(valor.unreadCount).toBe(0)
    expect(valor.notifications.every((n) => n.read_at !== null)).toBe(true)
  })

  it("al desmontar quita el canal", async () => {
    await montar()
    act(() => root.unmount())
    expect(supabase.removeChannel).toHaveBeenCalledTimes(1)
    root = createRoot(document.createElement("div"))
  })
})
