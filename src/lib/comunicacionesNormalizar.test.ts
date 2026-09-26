import { describe, expect, it } from "vitest"
import { campoCoincide, normalizarCampo, normalizarHablado } from "@/lib/comunicacionesNormalizar"

describe("normalizarHablado: números dichos en palabras", () => {
  it.each([
    ["two four zero", "240"],
    ["tree", "3"],
    ["niner", "9"],
    ["fife", "5"],
    ["fower", "4"],
    ["tree fife niner", "359"],
    ["one one eight decimal seven", "118.7"],
    ["one two one decimal seven five zero", "121.75"],
    ["one two niner decimal one", "129.1"],
    ["four thousand", "4000"],
    ["two thousand five hundred", "2500"],
    ["one zero thousand", "10000"],
    ["two forty", "240"],
    ["one twenty one decimal five", "121.5"],
    ["24 0", "240"],
    ["118,700", "118.7"],
    ["1 013", "1013"],
  ])("«%s» → %s", (dicho, esperado) => {
    expect(normalizarHablado(dicho)).toBe(esperado)
  })

  it("una colación entera", () => {
    expect(normalizarHablado("Flight level two four zero, Avianca four five two")).toBe("fl 240 avianca 452")
    expect(normalizarHablado("FL240 AVIANCA 452")).toBe("fl 240 avianca 452")
    expect(normalizarHablado("Squawk six four zero two, Avianca four five two.")).toBe("squawk 6402 avianca 452")
  })

  it("«to» y «for» son palabras salvo en medio de un número", () => {
    expect(normalizarHablado("climb to four thousand feet")).toBe("climb to 4000 feet")
    expect(normalizarHablado("report for vectors")).toBe("report for vectors")
  })

  it("el alfabeto de deletreo pasa a letras", () => {
    expect(normalizarHablado("Golf Alfa Bravo Charlie Delta")).toBe("g a b c d")
    expect(normalizarHablado("via Alfa one")).toBe("via a 1")
  })
})

describe("normalizarCampo y campoCoincide", () => {
  it("nivel: FL240, flight level 240 y 240 son lo mismo", () => {
    for (const v of ["FL240", "flight level 240", "240", "fl 240", "flight level two four zero"]) {
      expect(normalizarCampo("nivel", v)).toBe("FL240")
    }
    expect(campoCoincide("nivel", "240", "FL240")).toBe(true)
    expect(campoCoincide("nivel", "FL250", "FL240")).toBe(false)
  })

  it("frecuencia con coma, punto o ceros de más", () => {
    expect(campoCoincide("frecuencia", "118,7", "118.700")).toBe(true)
    expect(campoCoincide("frecuencia", "121.75", "121.750")).toBe(true)
    expect(campoCoincide("frecuencia", "118.07", "118.7")).toBe(false)
  })

  it("rumbo con o sin cero delante", () => {
    expect(campoCoincide("rumbo", "50", "050")).toBe(true)
    expect(campoCoincide("rumbo", "heading zero five zero", "050")).toBe(true)
  })

  it("pista con lado", () => {
    expect(normalizarCampo("pista", "runway two seven left")).toBe("27L")
    expect(normalizarCampo("pista", "RWY24")).toBe("24")
    expect(campoCoincide("pista", "27L", "27")).toBe(false)
  })

  it("squawk de cuatro cifras", () => {
    expect(campoCoincide("squawk", "six four zero two", "6402")).toBe(true)
  })

  it("texto: ruta, salida y matrícula sin espacios ni relleno", () => {
    expect(campoCoincide("ruta", "via A1", "A1")).toBe(true)
    expect(campoCoincide("salida", "Wicken 3 Delta departure", "WICKEN 3 DELTA")).toBe(true)
    expect(campoCoincide("texto", "G-ABCD", "GABCD")).toBe(true)
    expect(campoCoincide("texto", "golf alfa bravo charlie delta", "GABCD")).toBe(true)
  })

  it("vacío nunca coincide", () => {
    expect(campoCoincide("qnh", "", "1005")).toBe(false)
  })
})
