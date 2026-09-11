import { act, useEffect } from "react"
import { createRoot, type Root } from "react-dom/client"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { MensajeCanal, ReaccionCanal } from "@/hooks/useMensajesCanal"

const supabase = vi.hoisted(() => ({ rpc: vi.fn(), from: vi.fn(), channel: vi.fn(), removeChannel: vi.fn() }))
vi.mock("@/integrations/supabase/client", () => ({ supabase }))

const { PAGINA_MENSAJES, useMensajesCanal } = await import("@/hooks/useMensajesCanal")

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

type Llamada = { tabla: string; metodos: [string, ...unknown[]][] }
type Estado = ReturnType<typeof useMensajesCanal>

const base = Date.parse("2026-09-11T12:00:00Z")
const mensaje = (id: number, autor = `piloto-${id % 3}`): MensajeCanal => ({
  id,
  channel_id: 7,
  user_id: autor,
  content: `Mensaje ${id}`,
  edited_at: null,
  created_at: new Date(base + id * 60_000).toISOString(),
})

let llamadas: Llamada[]
/** Todos los mensajes del canal, del más viejo al más nuevo. */
let historial: MensajeCanal[]
let reaccionesServidor: ReaccionCanal[]
let fallaInsert: false | "red" | "tope"
let eventos: Record<string, (payload: { new?: unknown; old?: unknown }) => void>
let alCambiarEstado: (estado: string) => void
let filtros: Record<string, string | undefined>
let estado: Estado
let root: Root

function consulta(tabla: string) {
  const llamada: Llamada = { tabla, metodos: [] }
  llamadas.push(llamada)
  const tiene = (m: string) => llamada.metodos.find(([n]) => n === m)
  const constructor: Record<string, unknown> = {
    then: (ok: (v: unknown) => unknown) => {
      if (tabla === "community_reactions" && !tiene("insert") && !tiene("delete")) {
        const ids = tiene("in")?.[2] as number[]
        return Promise.resolve({ data: reaccionesServidor.filter((r) => ids.includes(r.message_id)), error: null }).then(ok)
      }
      if (tabla === "community_messages" && tiene("insert")) {
        const fila = { ...(tiene("insert")?.[1] as object), id: 999, edited_at: null, created_at: new Date(base + 999 * 60_000).toISOString() }
        const errores = { red: { message: "TypeError: Failed to fetch" }, tope: { message: "demasiadas_publicaciones" } }
        return Promise.resolve(fallaInsert ? { data: null, error: errores[fallaInsert] } : { data: fila, error: null }).then(ok)
      }
      if (tabla === "community_messages") {
        const antesDe = tiene("lt")?.[2] as string | undefined
        const previos = historial.filter((m) => !antesDe || Date.parse(m.created_at) < Date.parse(antesDe))
        const pagina = [...previos].reverse().slice(0, PAGINA_MENSAJES)
        return Promise.resolve({ data: pagina, error: null }).then(ok)
      }
      return Promise.resolve({ data: null, error: null }).then(ok)
    },
  }
  for (const m of ["select", "eq", "lt", "order", "limit", "in", "insert", "delete", "single"]) {
    constructor[m] = (...args: unknown[]) => {
      llamada.metodos.push([m, ...args])
      return constructor
    }
  }
  return constructor
}

function Espia() {
  const actual = useMensajesCanal(7, "piloto-yo")
  useEffect(() => {
    estado = actual
  })
  return null
}

const drenar = () =>
  act(async () => {
    for (let i = 0; i < 20; i++) await Promise.resolve()
  })

async function montar() {
  root = createRoot(document.createElement("div"))
  await act(async () => root.render(<Espia />))
  await drenar()
}

const consultas = (tabla: string, filtro: (l: Llamada) => boolean = () => true) =>
  llamadas.filter((l) => l.tabla === tabla && filtro(l)).length

beforeEach(() => {
  llamadas = []
  historial = Array.from({ length: 70 }, (_, i) => mensaje(i + 1))
  reaccionesServidor = [{ message_id: 70, user_id: "piloto-1", emoji: "👍" }, { message_id: 5, user_id: "piloto-2", emoji: "🔥" }]
  fallaInsert = false
  eventos = {}
  filtros = {}
  supabase.from.mockReset().mockImplementation(consulta)
  // Un autor sin fila de perfil no vuelve: antes eso bastaba para pedirlo sin parar.
  supabase.rpc.mockReset().mockImplementation(async (_fn: string, { p_user_ids }: { p_user_ids: string[] }) => ({
    data: p_user_ids.filter((id) => id !== "piloto-0").map((id) => ({ id, username: id, photo_url: null, current_streak: 3 })),
    error: null,
  }))
  supabase.removeChannel.mockReset()
  const canal = {
    on: vi.fn((_t: string, filtro: { event: string; table: string; filter?: string }, cb: (p: { new?: unknown; old?: unknown }) => void) => {
      eventos[`${filtro.event}:${filtro.table}`] = cb
      filtros[`${filtro.event}:${filtro.table}`] = filtro.filter
      return canal
    }),
    subscribe: vi.fn((cb: (e: string) => void) => {
      alCambiarEstado = cb
      return canal
    }),
  }
  supabase.channel.mockReset().mockReturnValue(canal)
})

afterEach(() => {
  act(() => root.unmount())
})

describe("useMensajesCanal", () => {
  it("cada suscripción en vivo va filtrada por el canal, también reacciones y borrados", async () => {
    await montar()

    expect(filtros).toEqual({
      "INSERT:community_messages": "channel_id=eq.7",
      "DELETE:community_messages": "channel_id=eq.7",
      "INSERT:community_reactions": "channel_id=eq.7",
      "DELETE:community_reactions": "channel_id=eq.7",
    })
  })

  it("entra con los últimos mensajes, en orden, sin esperar a Realtime", async () => {
    await montar()

    expect(estado.mensajes).toHaveLength(PAGINA_MENSAJES)
    expect(estado.mensajes[0].id).toBe(21)
    expect(estado.mensajes.at(-1)?.id).toBe(70)
    expect(estado.hayAnteriores).toBe(true)
    const pedido = llamadas.find((l) => l.tabla === "community_messages")
    expect(pedido?.metodos).toContainEqual(["order", "created_at", { ascending: false }])
    expect(pedido?.metodos.some(([m]) => m === "lt")).toBe(false)
  })

  it("«ver anteriores» pide lo previo al mensaje más viejo y une sin repetir", async () => {
    await montar()
    await act(async () => {
      expect(await estado.cargarAnteriores()).toBe(true)
    })
    await drenar()

    const anterior = llamadas.filter((l) => l.tabla === "community_messages").at(-1)
    expect(anterior?.metodos).toContainEqual(["lt", "created_at", mensaje(21).created_at])
    expect(estado.mensajes.map((m) => m.id)).toEqual(historial.map((m) => m.id))
    expect(estado.hayAnteriores).toBe(false)
    // La reacción del mensaje 5 llegó con su página.
    expect(estado.reacciones).toContainEqual({ message_id: 5, user_id: "piloto-2", emoji: "🔥" })
  })

  it("cada autor se pide una vez, aunque no vuelva nada, y la racha ajena llega", async () => {
    await montar()
    alCambiarEstado("SUBSCRIBED")
    await drenar()
    alCambiarEstado("SUBSCRIBED")
    await drenar()

    expect(supabase.rpc).toHaveBeenCalledTimes(1)
    expect(supabase.rpc.mock.calls[0][1].p_user_ids.sort()).toEqual(["piloto-0", "piloto-1", "piloto-2"])
    expect(estado.autores["piloto-1"]?.current_streak).toBe(3)
    expect(estado.autores["piloto-0"]).toBeUndefined()
  })

  it("un mensaje nuevo en vivo no vuelve a pedir reacciones", async () => {
    await montar()
    const antes = consultas("community_reactions")

    await act(async () => eventos["INSERT:community_messages"]({ new: mensaje(71, "piloto-nuevo") }))
    await drenar()

    expect(estado.mensajes.at(-1)?.id).toBe(71)
    expect(consultas("community_reactions")).toBe(antes)
    expect(supabase.rpc).toHaveBeenLastCalledWith("comunidad_autores", { p_user_ids: ["piloto-nuevo"] })
  })

  it("las reacciones en vivo solo cuentan para mensajes en pantalla", async () => {
    await montar()
    await act(async () => {
      eventos["INSERT:community_reactions"]({ new: { message_id: 3, user_id: "piloto-1", emoji: "👏" } })
      eventos["INSERT:community_reactions"]({ new: { message_id: 60, user_id: "piloto-1", emoji: "👏" } })
    })

    expect(estado.reacciones.some((r) => r.message_id === 3)).toBe(false)
    expect(estado.reacciones).toContainEqual({ message_id: 60, user_id: "piloto-1", emoji: "👏" })
  })

  it("si publicar falla, el mensaje provisional se quita y el error se explica", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {})
    await montar()
    fallaInsert = "red"
    let error: string | null = null
    await act(async () => {
      error = await estado.enviar("Hola")
    })

    expect(error).toMatch(/Revisa tu conexión/)
    expect(estado.mensajes.some((m) => m.id < 0)).toBe(false)
    expect(estado.mensajes).toHaveLength(PAGINA_MENSAJES)

    fallaInsert = "tope"
    await act(async () => {
      error = await estado.enviar("Otra vez")
    })
    expect(error).toMatch(/espera unos minutos/)
  })
})
