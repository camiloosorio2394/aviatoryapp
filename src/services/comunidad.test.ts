import { beforeEach, describe, expect, it, vi } from "vitest"

const { from, maybeSingle, single, order, limit, eq, respuestas } = vi.hoisted(() => {
  const respuestas = new Map<string, unknown>()
  const dame = (tabla: string) => respuestas.get(tabla) ?? { data: null, error: null }
  // Una sola cadena para todo: `.select().order()`, `.select().order().limit()`
  // y `.select().eq().maybeSingle()` o `.single()`.
  const hacer = (tabla: string) => {
    const cadena: Record<string, unknown> = {
      maybeSingle: vi.fn(() => Promise.resolve(dame(tabla))),
      single: vi.fn(() => Promise.resolve(dame(tabla))),
      then: (ok: (v: unknown) => unknown, mal?: (e: unknown) => unknown) => Promise.resolve(dame(tabla)).then(ok, mal),
    }
    cadena.order = vi.fn(() => cadena)
    cadena.limit = vi.fn(() => cadena)
    cadena.eq = vi.fn(() => cadena)
    return cadena
  }
  const ultimas: Record<string, Record<string, unknown>> = {}
  const from = vi.fn((tabla: string) => {
    const cadena = hacer(tabla)
    ultimas[tabla] = cadena
    return { select: () => cadena }
  })
  const espia = (tabla: string, paso: string) => ultimas[tabla]?.[paso]
  return {
    from,
    respuestas,
    maybeSingle: (t: string) => espia(t, "maybeSingle"),
    single: (t: string) => espia(t, "single"),
    order: (t: string) => espia(t, "order"),
    limit: (t: string) => espia(t, "limit"),
    eq: (t: string) => espia(t, "eq"),
  }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from } }))

import {
  agruparActividad,
  MESSAGE_SAMPLE,
  traerCanalPorSlug,
  traerPortadaComunidad,
  type MessageMeta,
} from "./comunidad"

const CANAL = {
  id: 1,
  slug: "general",
  name: "General",
  description: null,
  type: "general" as const,
  emoji: null,
  member_count: 12,
  order_index: 1,
}

beforeEach(() => {
  vi.clearAllMocks()
  respuestas.clear()
})

describe("señal de actividad por canal", () => {
  const filas: MessageMeta[] = [
    { channel_id: 1, created_at: "2026-09-01T10:00:00Z" },
    { channel_id: 1, created_at: "2026-09-03T08:00:00Z" },
    { channel_id: 1, created_at: "2026-08-30T23:00:00Z" },
    { channel_id: 2, created_at: "2026-09-02T12:00:00Z" },
  ]

  it("cuenta los mensajes y se queda con el más reciente de cada canal", () => {
    expect(agruparActividad(filas)).toEqual({
      1: { messages: 3, lastAt: "2026-09-03T08:00:00Z" },
      2: { messages: 1, lastAt: "2026-09-02T12:00:00Z" },
    })
  })

  it("sin mensajes, ningún canal tiene señal", () => {
    expect(agruparActividad([])).toEqual({})
  })
})

describe("portada de la comunidad", () => {
  it("junta canales, actividad y la etapa del piloto", async () => {
    respuestas.set("community_channels", { data: [CANAL], error: null })
    respuestas.set("community_messages", {
      data: [{ channel_id: 1, created_at: "2026-09-03T08:00:00Z" }],
      error: null,
    })
    respuestas.set("pilot_state", { data: { stage: "cpl_ready", target_airline: "Avianca" }, error: null })

    const portada = await traerPortadaComunidad("piloto")

    expect(portada.fallo).toBe(false)
    expect(portada.canales).toEqual([CANAL])
    expect(portada.actividad).toEqual({ 1: { messages: 1, lastAt: "2026-09-03T08:00:00Z" } })
    expect(portada.etapa).toBe("cpl_ready")
    expect(portada.aerolineaObjetivo).toBe("Avianca")
    expect(limit("community_messages")).toHaveBeenCalledWith(MESSAGE_SAMPLE)
    expect(order("community_channels")).toHaveBeenCalledWith("order_index")
    expect(eq("pilot_state")).toHaveBeenCalledWith("user_id", "piloto")
    expect(maybeSingle("pilot_state")).toHaveBeenCalled()
  })

  it("sin sesión no se pregunta por el piloto, pero los canales salen igual", async () => {
    respuestas.set("community_channels", { data: [CANAL], error: null })
    const portada = await traerPortadaComunidad(undefined)

    expect(portada.canales).toEqual([CANAL])
    expect(portada.etapa).toBeNull()
    expect(from).not.toHaveBeenCalledWith("pilot_state")
  })

  it("si fallan los mensajes la pantalla se pinta igual: la actividad es un adorno", async () => {
    respuestas.set("community_channels", { data: [CANAL], error: null })
    respuestas.set("community_messages", { data: null, error: { message: "sin permiso" } })

    const portada = await traerPortadaComunidad("piloto")

    expect(portada.fallo).toBe(false)
    expect(portada.canales).toEqual([CANAL])
    expect(portada.actividad).toEqual({})
  })

  it("si fallan los canales sí es un fallo: no queda nada que mostrar", async () => {
    respuestas.set("community_channels", { data: null, error: { message: "caído" } })
    respuestas.set("community_messages", { data: [{ channel_id: 1, created_at: "2026-09-03T08:00:00Z" }], error: null })

    const portada = await traerPortadaComunidad("piloto")

    expect(portada).toEqual({ canales: [], actividad: {}, etapa: null, aerolineaObjetivo: null, fallo: true })
  })
})

describe("un canal por su slug", () => {
  it("lo busca por slug", async () => {
    respuestas.set("community_channels", { data: CANAL, error: null })
    expect(await traerCanalPorSlug("general")).toEqual(CANAL)
    expect(eq("community_channels")).toHaveBeenCalledWith("slug", "general")
    expect(single("community_channels")).toHaveBeenCalled()
  })

  it("lanza si no existe, y la pantalla lo avisa", async () => {
    respuestas.set("community_channels", { data: null, error: { message: "no rows" } })
    await expect(traerCanalPorSlug("inventado")).rejects.toEqual({ message: "no rows" })
  })
})
