import { describe, expect, it } from "vitest"
import { METAR_LECCION } from "@/lib/metar"
import { METAR_LESSON_MINUTES, METAR_LESSON_TOTAL } from "@/lib/metarLesson"
import { MP_LECTURA_MINUTOS, MP_LECTURA_TOTAL, MP_NIVELES, MP_PRACTICA_TOTAL } from "@/lib/mercancias"
import { MP_LECCIONES, MP_LECCION_TOTAL, MP_MINUTOS } from "@/lib/mercanciasLeccion"
import { PRACTICA_TOTAL } from "@/lib/mercanciasPractica"

/**
 * Los hubs y la lista de temas usan conteos fijos para no cargar el contenido
 * (ver metar.ts y mercancias.ts). Si se agrega una sección, una lección o un
 * ejercicio, esta prueba dice qué número actualizar.
 */
describe("conteos fijos de las lecciones", () => {
  it("METAR: secciones y minutos de la lección", () => {
    expect(METAR_LECCION).toEqual({ secciones: METAR_LESSON_TOTAL, minutos: METAR_LESSON_MINUTES })
  })

  it("Mercancías: lecciones, minutos y ejercicios de práctica", () => {
    expect({ MP_LECTURA_TOTAL, MP_LECTURA_MINUTOS, MP_PRACTICA_TOTAL }).toEqual({
      MP_LECTURA_TOTAL: MP_LECCION_TOTAL,
      MP_LECTURA_MINUTOS: MP_MINUTOS,
      MP_PRACTICA_TOTAL: PRACTICA_TOTAL,
    })
  })

  it("Mercancías: cada nivel empieza en una lección que existe, en orden", () => {
    const desde = MP_NIVELES.map((n) => n.desde)
    expect(desde[0]).toBe(1)
    expect(desde).toEqual([...desde].sort((a, b) => a - b))
    for (const n of desde) expect(MP_LECCIONES[n - 1]?.n).toBe(n)
  })
})
