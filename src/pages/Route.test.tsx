import { MemoryRouter } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { ChecklistItem, RutaDelPiloto } from "@/services/ruta"
import { boton, clic, desmontarTodo, montar } from "@/test/pantalla"

const servicio = vi.hoisted(() => ({ traerRuta: vi.fn(), marcarItem: vi.fn(), desmarcarItem: vi.fn() }))
const avisos = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))
const errores = vi.hoisted(() => ({ reportarError: vi.fn() }))
const sesion = vi.hoisted(() => ({ user: { id: "piloto-1" }, session: null, isLoading: false }))

vi.mock("@/services/ruta", () => servicio)
vi.mock("sonner", () => ({ toast: avisos }))
vi.mock("@/lib/errores", () => errores)
vi.mock("@/hooks/useSession", () => ({ useSession: () => sesion }))

const { Route } = await import("@/pages/Route")

function paso(id: number, title: string, category: string | null, description: string | null = null): ChecklistItem {
  return { id, checklist_id: 1, key: `paso-${id}`, title, description, category, order_index: id }
}

const PASOS = [
  paso(1, "Examen médico clase 1", "Documentos"),
  paso(2, "Aprobar el examen teórico PCA", "Exámenes"),
  paso(3, "Licencia PCA emitida", "Hito", "Ya eres piloto comercial"),
]

function ruta(completados: number[] = []): RutaDelPiloto {
  return {
    etapa: "cpl_in_progress",
    checklist: { id: 1, stage: "cpl_in_progress", name: "Hacia la licencia comercial", description: null },
    items: PASOS,
    completados: new Set(completados),
  }
}

/** Las casillas de la lista, en orden. */
function casillas() {
  return [...document.querySelectorAll<HTMLButtonElement>('button[role="checkbox"]')]
}

function pintar() {
  return montar(
    <MemoryRouter>
      <Route />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  servicio.traerRuta.mockReset().mockResolvedValue(ruta())
  servicio.marcarItem.mockReset().mockResolvedValue(undefined)
  servicio.desmarcarItem.mockReset().mockResolvedValue(undefined)
  avisos.success.mockReset()
  avisos.error.mockReset()
  errores.reportarError.mockReset()
})

afterEach(() => {
  desmontarTodo()
})

describe("mi ruta", () => {
  it("muestra la lista de la etapa y propone el primer paso pendiente", async () => {
    servicio.traerRuta.mockResolvedValue(ruta([1]))
    const p = await pintar()

    expect(servicio.traerRuta).toHaveBeenCalledWith("piloto-1")
    expect(p.texto()).toContain("Hacia la licencia comercial")
    expect(p.texto()).toContain("Lo siguiente")
    expect(p.texto()).toContain("de 3 pasos")
    expect(casillas().map((c) => c.getAttribute("aria-checked"))).toEqual(["true", "false", "false"])
  })

  it("sin etapa manda a elegirla en el perfil", async () => {
    servicio.traerRuta.mockResolvedValue({ etapa: null, checklist: null, items: [], completados: new Set() })
    const p = await pintar()
    expect(p.texto()).toContain("Tu ruta empieza por tu etapa")
  })

  it("marcar un paso lo guarda en la cuenta del piloto", async () => {
    await pintar()
    await clic(casillas()[0])
    expect(servicio.marcarItem).toHaveBeenCalledWith("piloto-1", 1)
    expect(casillas()[0].getAttribute("aria-checked")).toBe("true")
  })

  it("«Ya lo cumplí» marca el paso que propone", async () => {
    await pintar()
    await clic(boton("Ya lo cumplí"))
    expect(servicio.marcarItem).toHaveBeenCalledWith("piloto-1", 1)
  })

  it("desmarcar un paso hecho lo quita", async () => {
    servicio.traerRuta.mockResolvedValue(ruta([2]))
    await pintar()
    await clic(casillas()[1])
    expect(servicio.desmarcarItem).toHaveBeenCalledWith("piloto-1", 2)
    expect(casillas()[1].getAttribute("aria-checked")).toBe("false")
  })

  it("el hito se celebra al marcarlo", async () => {
    servicio.traerRuta.mockResolvedValue(ruta([1, 2]))
    await pintar()
    await clic(casillas()[2])
    expect(avisos.success).toHaveBeenCalledWith("Hito conseguido", { description: "Ya eres piloto comercial" })
  })

  it("si no se guarda, la casilla vuelve a como estaba y el fallo queda reportado", async () => {
    const fallo = new Error("permission denied for table user_checklist_progress")
    servicio.marcarItem.mockRejectedValue(fallo)
    await pintar()
    await clic(casillas()[0])

    expect(casillas()[0].getAttribute("aria-checked")).toBe("false")
    expect(errores.reportarError).toHaveBeenCalledWith("ruta: marcar paso", fallo)
    expect(avisos.error).toHaveBeenCalledWith(fallo.message)
  })

  it("si la ruta no carga lo reporta y reintentar la vuelve a pedir", async () => {
    const fallo = new Error("fetch failed")
    servicio.traerRuta.mockReset().mockRejectedValueOnce(fallo).mockResolvedValue(ruta())
    const p = await pintar()

    expect(errores.reportarError).toHaveBeenCalledWith("ruta", fallo)
    expect(p.texto()).toContain("No pudimos cargar tu ruta")

    await clic(boton("Intentar de nuevo"))
    expect(servicio.traerRuta).toHaveBeenCalledTimes(2)
    expect(p.texto()).toContain("Hacia la licencia comercial")
  })
})
