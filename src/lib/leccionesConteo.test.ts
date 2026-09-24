import { describe, expect, it } from "vitest"
import { METAR_EXAM_PASS_SCORE, METAR_LECCION, METAR_PRACTICE_TOTAL } from "@/lib/metar"
import { METAR_CONTEO } from "@/lib/metarConteo"
import { METAR_LESSON_MINUTES, METAR_LESSON_TOTAL } from "@/lib/metarLesson"
import { MP_LECTURA_MINUTOS, MP_LECTURA_TOTAL, MP_NIVELES, MP_PRACTICA_TOTAL } from "@/lib/mercancias"
import { MP_LECCIONES, MP_LECCION_TOTAL, MP_MINUTOS } from "@/lib/mercanciasLeccion"
import { PRACTICA_TOTAL } from "@/lib/mercanciasPractica"
import { AERO_LECTURA_MINUTOS, AERO_LECTURA_TOTAL, AERO_PRACTICA_TOTAL } from "@/lib/aerodinamica"
import { AERO_LECCION_TOTAL, AERO_MINUTOS } from "@/lib/aerodinamicaLeccion"
import { AERO_PRACTICA_TOTAL as AERO_PRACTICA_CONTENIDO } from "@/lib/aerodinamicaPractica"
import { AP_LECTURA_TOTAL, AP_NIVELES } from "@/lib/aeropuertos"
import { AP_LECCIONES, AP_LECCION_TOTAL } from "@/lib/aeropuertosLeccion"
import { AP_PRACTICA_CONTEO } from "@/lib/aeropuertosConteo"
import { AP_PRACTICA_TOTAL } from "@/lib/aeropuertosPractica"
import { CM_LECTURA_TOTAL, CM_NIVELES } from "@/lib/comunicaciones"
import { CM_LECCIONES, CM_LECCION_TOTAL } from "@/lib/comunicacionesLeccion"
import migracionComunicaciones from "../../supabase/migrations/20260925000000_progreso_de_comunicaciones.sql?raw"

/**
 * Los hubs y la lista de temas usan conteos fijos para no cargar el contenido
 * (ver metar.ts y mercancias.ts). Si se agrega una sección, una lección o un
 * ejercicio, esta prueba dice qué número actualizar.
 */
describe("conteos fijos de las lecciones", () => {
  it("METAR: secciones y minutos de la lección", () => {
    expect(METAR_LECCION).toEqual({ secciones: METAR_LESSON_TOTAL, minutos: METAR_LESSON_MINUTES })
  })

  it("METAR: el conteo que usa el panel no se desfasa del módulo", () => {
    // El panel no puede importar metar.ts (22 KB de ejercicios), así que lleva
    // los números aparte. Si el contenido cambia, aquí se ve.
    expect(METAR_CONTEO).toEqual({
      secciones: METAR_LECCION.secciones,
      practicas: METAR_PRACTICE_TOTAL,
      aprobacion: METAR_EXAM_PASS_SCORE,
    })
  })

  it("Mercancías: lecciones, minutos y ejercicios de práctica", () => {
    expect({ MP_LECTURA_TOTAL, MP_LECTURA_MINUTOS, MP_PRACTICA_TOTAL }).toEqual({
      MP_LECTURA_TOTAL: MP_LECCION_TOTAL,
      MP_LECTURA_MINUTOS: MP_MINUTOS,
      MP_PRACTICA_TOTAL: PRACTICA_TOTAL,
    })
  })

  it("Aerodinámica: secciones, minutos y ejercicios de práctica", () => {
    expect({ AERO_LECTURA_TOTAL, AERO_LECTURA_MINUTOS, AERO_PRACTICA_TOTAL }).toEqual({
      AERO_LECTURA_TOTAL: AERO_LECCION_TOTAL,
      AERO_LECTURA_MINUTOS: AERO_MINUTOS,
      AERO_PRACTICA_TOTAL: AERO_PRACTICA_CONTENIDO,
    })
  })

  it("Aeropuertos: lecciones y ejercicios de práctica", () => {
    // El panel no puede importar la práctica entera, así que lleva el número
    // aparte. Si entra o sale un ejercicio, aquí se ve.
    expect({ AP_LECTURA_TOTAL, AP_PRACTICA_CONTEO }).toEqual({
      AP_LECTURA_TOTAL: AP_LECCION_TOTAL,
      AP_PRACTICA_CONTEO: AP_PRACTICA_TOTAL,
    })
  })

  it("Aeropuertos: cada nivel empieza en una lección que existe, en orden", () => {
    const desde = AP_NIVELES.map((n) => n.desde)
    expect(desde[0]).toBe(1)
    expect(desde).toEqual([...desde].sort((a, b) => a - b))
    for (const n of desde) expect(AP_LECCIONES[n - 1]?.n).toBe(n)
  })

  it("Comunicaciones ATC: el total fijo, los ocho niveles y el catálogo de la migración", () => {
    expect(CM_LECTURA_TOTAL).toBe(CM_LECCION_TOTAL)
    // Los cortes de la especificación: 1-7, 8-11, 12-18, 19-30, 31-40, 41-50,
    // 51-61 y 62-69 (el repaso de las 50 frases es la 69).
    expect(CM_NIVELES.map((n) => n.desde)).toEqual([1, 8, 12, 19, 31, 41, 51, 62])
    for (const n of CM_NIVELES.map((x) => x.desde)) expect(CM_LECCIONES[n - 1]?.n).toBe(n)
    // Mientras el módulo no esté en contenido/catalogo/modulos.json, su fila de
    // modulos_contenido la escribe la migración: si cambia el número de
    // lecciones, hace falta otra migración (o pasar el módulo al catálogo).
    expect(migracionComunicaciones).toContain(`values ('comunicaciones', ${CM_LECCION_TOTAL}, '{}'::text[])`)
  })

  it("Mercancías: cada nivel empieza en una lección que existe, en orden", () => {
    const desde = MP_NIVELES.map((n) => n.desde)
    expect(desde[0]).toBe(1)
    expect(desde).toEqual([...desde].sort((a, b) => a - b))
    for (const n of desde) expect(MP_LECCIONES[n - 1]?.n).toBe(n)
  })
})
