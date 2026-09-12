import { beforeEach, describe, expect, it, vi } from "vitest"

const { from, insert, borrarPor, respuestas, tablasPedidas } = vi.hoisted(() => {
  const respuestas = new Map<string, unknown>()
  const tablasPedidas: string[] = []
  const insert = vi.fn(() => Promise.resolve(respuestas.get("insert") ?? { error: null }))
  const borrarPor = vi.fn(() => ({ eq: () => Promise.resolve(respuestas.get("delete") ?? { error: null }) }))
  const hacer = (tabla: string) => {
    const dame = () => respuestas.get(tabla) ?? { data: null, error: null }
    const cadena: Record<string, unknown> = {
      maybeSingle: () => Promise.resolve(dame()),
      then: (ok: (v: unknown) => unknown, mal?: (e: unknown) => unknown) => Promise.resolve(dame()).then(ok, mal),
    }
    for (const paso of ["eq", "order", "limit"]) cadena[paso] = () => cadena
    return cadena
  }
  const from = vi.fn((tabla: string) => {
    tablasPedidas.push(tabla)
    return { select: () => hacer(tabla), insert, delete: () => ({ eq: borrarPor }) }
  })
  return { from, insert, borrarPor, respuestas, tablasPedidas }
})
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from } }))

import { desmarcarItem, marcarItem, traerRuta } from "./ruta"

const CHECKLIST = { id: 7, stage: "cpl_in_progress", name: "Camino al comercial", description: null }
const ITEM = {
  id: 1,
  checklist_id: 7,
  key: "horas",
  title: "Completar 200 horas",
  description: null,
  category: null,
  order_index: 1,
}

beforeEach(() => {
  vi.clearAllMocks()
  respuestas.clear()
  tablasPedidas.length = 0
})

describe("traer la ruta", () => {
  it("junta etapa, checklist, ítems y lo ya marcado", async () => {
    respuestas.set("pilot_state", { data: { stage: "cpl_in_progress" }, error: null })
    respuestas.set("checklists", { data: CHECKLIST, error: null })
    respuestas.set("checklist_items", { data: [ITEM], error: null })
    respuestas.set("checklist_progress", { data: [{ item_id: 1 }], error: null })

    const ruta = await traerRuta("piloto")

    expect(ruta.etapa).toBe("cpl_in_progress")
    expect(ruta.checklist).toEqual(CHECKLIST)
    expect(ruta.items).toEqual([ITEM])
    expect(ruta.completados.has(1)).toBe(true)
  })

  it("sin etapa no busca checklist: ahí la pantalla manda al onboarding", async () => {
    respuestas.set("pilot_state", { data: null, error: null })

    const ruta = await traerRuta("nuevo")

    expect(ruta).toEqual({ etapa: null, checklist: null, items: [], completados: new Set() })
    expect(tablasPedidas).not.toContain("checklists")
  })

  it("con etapa pero sin checklist no busca ítems", async () => {
    respuestas.set("pilot_state", { data: { stage: "instructor" }, error: null })
    respuestas.set("checklists", { data: null, error: null })

    const ruta = await traerRuta("piloto")

    expect(ruta.etapa).toBe("instructor")
    expect(ruta.checklist).toBeNull()
    expect(tablasPedidas).not.toContain("checklist_items")
  })

  /**
   * Sin lanzar, una falla de red salía en pantalla como «completa tu perfil» y
   * mandaba al onboarding a alguien que ya lo había hecho.
   */
  it("una falla al leer la etapa lanza, no se confunde con no tener etapa", async () => {
    respuestas.set("pilot_state", { data: null, error: { message: "sin red" } })
    await expect(traerRuta("piloto")).rejects.toEqual({ message: "sin red" })
  })

  it("una falla al leer los ítems también lanza", async () => {
    respuestas.set("pilot_state", { data: { stage: "cpl_in_progress" }, error: null })
    respuestas.set("checklists", { data: CHECKLIST, error: null })
    respuestas.set("checklist_items", { data: null, error: { message: "caído" } })
    respuestas.set("checklist_progress", { data: [], error: null })

    await expect(traerRuta("piloto")).rejects.toEqual({ message: "caído" })
  })
})

describe("marcar y desmarcar", () => {
  it("marcar escribe la fila del piloto y el ítem", async () => {
    await marcarItem("piloto", 3)
    expect(insert).toHaveBeenCalledWith({ user_id: "piloto", item_id: 3 })
  })

  it("marcar lanza si falla, para que la pantalla pueda deshacerlo", async () => {
    respuestas.set("insert", { error: { message: "no se pudo" } })
    await expect(marcarItem("piloto", 3)).rejects.toEqual({ message: "no se pudo" })
  })

  it("desmarcar filtra por piloto e ítem", async () => {
    await desmarcarItem("piloto", 3)
    expect(borrarPor).toHaveBeenCalledWith("user_id", "piloto")
  })

  it("desmarcar lanza si falla", async () => {
    respuestas.set("delete", { error: { message: "no se pudo" } })
    await expect(desmarcarItem("piloto", 3)).rejects.toEqual({ message: "no se pudo" })
  })
})
