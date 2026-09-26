import { describe, expect, it } from "vitest"
import { nivelDeRacha } from "./nivelDeRacha"

describe("nivelDeRacha", () => {
  it("sigue los cortes de la lámina: 1-2, 3-6, 7-13, 14-29, 30+", () => {
    expect([0, 1, 2, 3, 6, 7, 13, 14, 29, 30, 365].map(nivelDeRacha)).toEqual([0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5])
  })

  it("con basura queda apagada", () => {
    expect(nivelDeRacha(-3)).toBe(0)
    expect(nivelDeRacha(Number.NaN)).toBe(0)
  })
})
