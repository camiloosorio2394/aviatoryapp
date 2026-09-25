import { describe, expect, it } from "vitest"
import { BANCO } from "./index"
import { NUMERICO } from "./numerico"
import { SERIES } from "./series"
import { PAREJAS_N2_09, SERIES_DESCARTADAS, SERIES_REVISADAS } from "./seriesRevisadas"

describe("revisión editorial de psicotécnicas", () => {
  it("deja fuera las preguntas cuya clave no se sostiene con el enunciado", () => {
    const descartadas = Object.keys(SERIES_DESCARTADAS)
    expect(descartadas).toHaveLength(11)
    expect(SERIES_REVISADAS).toHaveLength(SERIES.length - descartadas.length)
    expect(BANCO.some((e) => descartadas.includes(e.id))).toBe(false)
    expect(NUMERICO.some((e) => ["NU-N1-04", "NU-N1-15"].includes(e.id))).toBe(false)
  })

  it("pregunta por los dos términos y conserva las diez parejas de la fuente", () => {
    const pares = SERIES_REVISADAS.filter((e) => e.id.startsWith("NU-N2-09-"))
    expect(pares).toHaveLength(10)
    for (const e of pares) {
      const fuente = PAREJAS_N2_09[e.id]
      expect(fuente).toBeDefined()
      expect(e.enunciado).toMatch(/^Indica los dos números que siguen/)
      expect(e.opciones[e.respuesta]).toBe(`${fuente.primero} y ${fuente.segundo}`)
      expect(new Set(e.opciones).size).toBe(4)
      expect(e.explicacion).toContain(`${fuente.primero} y ${fuente.segundo}`)
    }
  })

  it("la corrección editorial de N1-14 no conserva B1 con una explicación de B2", () => {
    const n14 = NUMERICO.find((e) => e.id === "NU-N1-14")
    expect(n14?.enunciado).toContain("B2")
    expect(n14?.opciones[n14.respuesta]).toBe("M13")
  })

  it("ninguna serie activa conserva el desglose copiado del cuadernillo", () => {
    expect(SERIES_REVISADAS).toHaveLength(150)
    for (const ejercicio of SERIES_REVISADAS) {
      expect(ejercicio.explicacion).not.toMatch(/El documento lo desglosa|La fuente lo desglosa/i)
      expect(ejercicio.explicacion.length).toBeGreaterThan(55)
    }
  })
})
