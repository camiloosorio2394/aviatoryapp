import { describe, expect, it } from "vitest"
import { FIGURAS_A1 } from "@/data/psicotecnicas/figurasA1"
import { resolverFigura } from "./psicotecnicasSolucionador"

describe("serie de brazos del rombo A1-02", () => {
  it("deduce la única alternativa con tres brazos sin adivinar orientaciones", () => {
    const resultado = resolverFigura(FIGURAS_A1["AB-A1-02"])
    expect(resultado.estado).toBe("resuelto")
    if (resultado.estado === "resuelto") {
      expect(resultado.opcion).toBe(3)
      expect(resultado.reglas.some((regla) => regla.transformacion.includes("cantidad de brazos"))).toBe(true)
    }
  })

  it("no da por resuelta una lámina con dos alternativas de tres brazos", () => {
    const figura = FIGURAS_A1["AB-A1-02"]
    const resultado = resolverFigura({ ...figura, opciones: [...figura.opciones, figura.opciones[3]] })
    expect(resultado.estado).toBe("ambiguo")
  })
})
