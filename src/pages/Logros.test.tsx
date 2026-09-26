import { afterEach, describe, expect, it } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { boton, clic, desmontarTodo, montar } from "@/test/pantalla"
import type { Achievement, ActivityDay, Streak } from "@/components/dashboard/tipos"
import { VistaLogros } from "./Logros"

const logro = (id: number, code: string, name: string, tier: Achievement["tier"]): Achievement => ({
  id,
  code,
  name,
  description: `Descripción de ${name}`,
  icon: "",
  tier,
})

const CATALOGO: Achievement[] = [
  logro(1, "first_step", "Primer paso", "bronze"),
  logro(2, "first_quiz", "Primer simulacro", "bronze"),
  logro(3, "streak_3", "Tres días seguidos", "bronze"),
  logro(4, "streak_7", "Una semana de fuego", "silver"),
  logro(5, "notam_lesson", "NOTAM leído", "bronze"),
  logro(6, "notam_practice", "NOTAM practicado", "silver"),
  logro(7, "notam_exam", "NOTAM aprobado", "silver"),
  logro(8, "notam_master", "NOTAM dominado", "gold"),
]

function pintar(ganados: string[], racha: Streak | null = null, actividad: ActivityDay[] = []) {
  return montar(
    <MemoryRouter>
      <VistaLogros
        cargando={false}
        logros={CATALOGO}
        ganados={new Map(ganados.map((c) => [c, "2026-09-20T12:00:00Z"]))}
        actividad={actividad}
        racha={racha}
        usuario="capi_juanma"
      />
    </MemoryRouter>,
  )
}

const trofeos = () => [...document.querySelectorAll<HTMLElement>(".logros-trofeo")]

afterEach(desmontarTodo)

describe("la sala de trofeos", () => {
  it("cuenta la XP de lo ganado y dice cuánto falta para el siguiente nivel", async () => {
    // 3 bronces (45) + 1 plata (30) = 75 XP.
    const p = await pintar(["first_step", "first_quiz", "streak_3", "notam_practice"])
    expect(p.texto()).toContain("Nivel 1")
    expect(p.texto()).toContain("75 / 100 XP")
    expect(p.texto()).toContain("25 XP para el nivel 2")
    expect(p.texto()).toContain("4 de 8 trofeos")
    expect(document.querySelector("[role=progressbar][aria-valuenow='75']")).not.toBeNull()
  })

  it("las misiones van a la racha que sigue y al paso que falta en el módulo empezado", async () => {
    const racha: Streak = { current_streak: 4, longest_streak: 4, last_activity_date: "2026-09-26" } as Streak
    const p = await pintar(["streak_3", "notam_lesson"], racha)
    const misiones = [...document.querySelectorAll("section[aria-labelledby=logros-misiones] li")].map((li) => li.textContent)
    expect(misiones[0]).toContain("Una semana de fuego")
    expect(misiones[0]).toContain("4 de 7 días seguidos")
    expect(misiones[1]).toContain("NOTAM practicado")
    expect(misiones[1]).toContain("Paso 2 de 4 en NOTAM")
    expect(p.texto()).toContain("Próximas misiones")
  })

  it("el filtro deja solo lo ganado o solo lo que falta, con sus conteos", async () => {
    await pintar(["first_step", "streak_3"])
    expect(trofeos()).toHaveLength(4)
    expect(boton("Ganados").textContent).toContain("2")

    await clic(boton("Ganados"))
    expect(trofeos().map((t) => t.dataset.ganado)).toEqual(["true", "true"])

    await clic(boton("Por ganar"))
    expect(trofeos()).toHaveLength(2)
    expect(trofeos().every((t) => t.dataset.ganado === "false")).toBe(true)
  })

  it("sin nada ganado, el filtro de ganados lo dice en vez de quedar en blanco", async () => {
    const p = await pintar([])
    await clic(boton("Ganados"))
    expect(trofeos()).toHaveLength(0)
    expect(p.texto()).toContain("Todavía no tienes trofeos")
  })

  it("el recorrido del módulo es un enlace que dice qué pasos lleva", async () => {
    await pintar(["notam_lesson", "notam_practice"])
    const enlace = document.querySelector<HTMLAnchorElement>("section[aria-labelledby=logros-vitrina] a[href='/app/aerolinea/notam']")
    expect(enlace?.getAttribute("aria-label")).toBe("NOTAM: 2 de 4 (lección, práctica). Continuar")
  })
})
