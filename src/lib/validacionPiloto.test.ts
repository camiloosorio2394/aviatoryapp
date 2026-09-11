import { describe, expect, it } from "vitest"
import { HORAS_TOTALES_MAXIMAS, validarHorasDeVuelo } from "@/lib/validacionPiloto"

describe("validarHorasDeVuelo", () => {
  it("acepta campos vacíos, que en la base quedan en null", () => {
    expect(validarHorasDeVuelo("", "")).toBeNull()
    expect(validarHorasDeVuelo("  ", "")).toBeNull()
  })

  it("acepta horas coherentes, con decimales", () => {
    expect(validarHorasDeVuelo("245.5", "120")).toBeNull()
    expect(validarHorasDeVuelo("120", "120")).toBeNull()
    expect(validarHorasDeVuelo("", "40")).toBeNull()
  })

  it("rechaza más horas PIC que totales", () => {
    expect(validarHorasDeVuelo("100", "150")).toMatch(/PIC/)
  })

  it("rechaza negativos y valores fuera de rango", () => {
    expect(validarHorasDeVuelo("-1", "")).toMatch(/totales/)
    expect(validarHorasDeVuelo(String(HORAS_TOTALES_MAXIMAS + 1), "")).toMatch(/totales/)
    expect(validarHorasDeVuelo("10", "-2")).toMatch(/negativas/)
    expect(validarHorasDeVuelo("abc", "")).toMatch(/totales/)
  })
})
