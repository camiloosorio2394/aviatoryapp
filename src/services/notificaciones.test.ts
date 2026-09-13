import { beforeEach, describe, expect, it, vi } from "vitest"

const { from, rpc, actualizar, respuestas, ultimoLimite } = vi.hoisted(() => {
  const respuestas = new Map<string, unknown>()
  const ultimoLimite: { valor: number | null } = { valor: null }
  const actualizar = vi.fn(() => {
    const cadena: Record<string, unknown> = {
      then: (ok: (v: unknown) => unknown, mal?: (e: unknown) => unknown) =>
        Promise.resolve(respuestas.get("update") ?? { error: null }).then(ok, mal),
    }
    for (const paso of ["eq", "in"]) cadena[paso] = () => cadena
    return cadena
  })
  const hacer = (tabla: string) => {
    const dame = () => respuestas.get(tabla) ?? { data: null, error: null }
    const cadena: Record<string, unknown> = {
      then: (ok: (v: unknown) => unknown, mal?: (e: unknown) => unknown) => Promise.resolve(dame()).then(ok, mal),
      limit: (n: number) => {
        ultimoLimite.valor = n
        return cadena
      },
    }
    for (const paso of ["eq", "order"]) cadena[paso] = () => cadena
    return cadena
  }
  const from = vi.fn((tabla: string) => ({ select: () => hacer(tabla), update: actualizar }))
  return { from, rpc: vi.fn(), actualizar, respuestas, ultimoLimite }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from, rpc } }))

import {
  LIMITE_AVISOS,
  marcarLogrosVistos,
  marcarTodosLeidos,
  revisarLogros,
  traerAvisos,
  traerLogrosPendientes,
} from "./notificaciones"

const LOGRO = { name: "Primer vuelo", description: "Registraste tu primer vuelo", icon: "🛫" }

beforeEach(() => {
  vi.clearAllMocks()
  respuestas.clear()
  ultimoLimite.valor = null
})

describe("avisos", () => {
  it("trae los del piloto con su tope", async () => {
    respuestas.set("notifications", { data: [{ id: "n1", read_at: null }], error: null })

    expect(await traerAvisos("piloto")).toEqual([{ id: "n1", read_at: null }])
    expect(ultimoLimite.valor).toBe(LIMITE_AVISOS)
  })

  /** Devolver `[]` haría que la lista que ya se tenía se borrara de la pantalla. */
  it("si falla devuelve null, no una lista vacía", async () => {
    const avisos = vi.spyOn(console, "warn").mockImplementation(() => {})
    respuestas.set("notifications", { data: null, error: { message: "caído" } })

    expect(await traerAvisos("piloto")).toBeNull()
    expect(avisos).toHaveBeenCalledWith("notifications", "caído")
    avisos.mockRestore()
  })

  it("marcar todos leídos dice si el servidor lo registró", async () => {
    rpc.mockResolvedValue({ error: null })
    expect(await marcarTodosLeidos()).toBe(true)
    expect(rpc).toHaveBeenCalledWith("mark_all_notifications_read")

    const avisos = vi.spyOn(console, "warn").mockImplementation(() => {})
    rpc.mockResolvedValue({ error: { message: "caído" } })
    expect(await marcarTodosLeidos()).toBe(false)
    avisos.mockRestore()
  })
})

describe("logros", () => {
  it("la revisión completa se le pide a la base", async () => {
    rpc.mockResolvedValue({ error: null })
    await revisarLogros("piloto")
    expect(rpc).toHaveBeenCalledWith("check_and_unlock_achievements", { p_user_id: "piloto" })
  })

  /** PostgREST devuelve el logro suelto o dentro de un arreglo según la relación. */
  it("acepta el logro suelto y dentro de un arreglo", async () => {
    respuestas.set("user_achievements", {
      data: [
        { achievement_id: 1, achievements: LOGRO },
        { achievement_id: 2, achievements: [LOGRO] },
      ],
      error: null,
    })

    expect(await traerLogrosPendientes("piloto")).toEqual([
      { id: 1, ...LOGRO },
      { id: 2, ...LOGRO },
    ])
  })

  it("una fila sin logro se descarta en vez de pintar un toast vacío", async () => {
    respuestas.set("user_achievements", {
      data: [
        { achievement_id: 1, achievements: null },
        { achievement_id: 2, achievements: [] },
        { achievement_id: 3, achievements: LOGRO },
      ],
      error: null,
    })

    expect(await traerLogrosPendientes("piloto")).toEqual([{ id: 3, ...LOGRO }])
  })

  it("si falla la consulta no hay logros que mostrar", async () => {
    const avisos = vi.spyOn(console, "warn").mockImplementation(() => {})
    respuestas.set("user_achievements", { data: null, error: { message: "caído" } })

    expect(await traerLogrosPendientes("piloto")).toEqual([])
    expect(avisos).toHaveBeenCalledWith("user_achievements", "caído")
    avisos.mockRestore()
  })

  it("sin logros que marcar no se escribe nada", async () => {
    await marcarLogrosVistos("piloto", [])
    expect(actualizar).not.toHaveBeenCalled()
  })

  it("con logros, los marca vistos", async () => {
    await marcarLogrosVistos("piloto", [1, 2])
    expect(actualizar).toHaveBeenCalledWith({ seen: true })
  })
})
