import { describe, expect, it, vi } from "vitest"

vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc: vi.fn() } }))

import { leerInicioPanel, leerTarjetasPanel } from "./panel"

const tarjetas = (cambios: Record<string, unknown> = {}) => ({
  logros: [
    { id: 1, code: "first_step", name: "Primer paso", description: "d", icon: "i", tier: "bronze", unlocked_at: "2026-09-01T12:00:00Z" },
    { id: 2, code: "first_quiz", name: "Primer quiz", description: "d", icon: "i", tier: "bronze", unlocked_at: null },
    { id: 3, code: "streak_3", name: "Racha", description: "d", icon: "i", tier: "silver", unlocked_at: "2026-09-10T12:00:00Z" },
  ],
  actividad: [{ date: "2026-09-10", activities_count: 2, questions_answered: 20 }],
  companeros: [{ username: "andres", current_streak: 9 }],
  quiz_diario: [],
  dominio: [],
  notam: { lecciones: 4, practicas: 3, mejor: 76 },
  licencias: [],
  preparacion: null,
  ...cambios,
})

describe("panel del piloto", () => {
  it("lee el encabezado y exige el conteo de quizzes", () => {
    const inicio = leerInicioPanel({
      perfil: { full_name: "Laura", username: "laura", photo_url: null },
      piloto: { stage: "ppl" },
      racha: null,
      suscripcion: null,
      quizzes_completados: 12,
    })
    expect(inicio).toMatchObject({ perfil: { username: "laura" }, piloto: { stage: "ppl" }, racha: null, quizzesCompletados: 12 })
    expect(() => leerInicioPanel({ perfil: null, piloto: null, racha: null, suscripcion: null })).toThrow("quizzes_completados")
  })

  it("separa la colección de logros de los desbloqueados, del más reciente al más viejo", () => {
    const t = leerTarjetasPanel(tarjetas(), new Date("2026-09-11T12:00:00"))
    expect(t.logros.map((l) => l.code)).toEqual(["first_step", "first_quiz", "streak_3"])
    expect(t.logros.every((l) => !("unlocked_at" in l))).toBe(true)
    expect(t.desbloqueados.map((l) => l.code)).toEqual(["streak_3", "first_step"])
  })

  it("arma la serie del heatmap desde un lunes, con ceros donde no hubo actividad", () => {
    const t = leerTarjetasPanel(tarjetas(), new Date("2026-09-11T12:00:00"))
    expect(new Date(`${t.actividad[0].date}T00:00:00`).getDay()).toBe(1)
    expect(t.actividad.at(-1)?.date).toBe("2026-09-11")
    expect(t.actividad.find((d) => d.date === "2026-09-10")).toMatchObject({ activities_count: 2, questions_answered: 20 })
    expect(t.actividad.find((d) => d.date === "2026-09-09")).toMatchObject({ activities_count: 0 })
  })

  it("NOTAM sin avance es null, y con avance trae lo contado en la base", () => {
    expect(leerTarjetasPanel(tarjetas()).notam).toEqual({ lesson: 4, practice: 3, best: 76 })
    expect(leerTarjetasPanel(tarjetas({ notam: { lecciones: 0, practicas: 0, mejor: null } })).notam).toBeNull()
  })

  it("una forma distinta falla en vez de pintar tarjetas vacías", () => {
    expect(() => leerTarjetasPanel(tarjetas({ logros: null }))).toThrow("logros")
    expect(() => leerTarjetasPanel(tarjetas({ notam: { lecciones: "4", practicas: 0, mejor: null } }))).toThrow("notam.lecciones")
  })
})
