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
import { PERF_LECTURA_MINUTOS, PERF_LECTURA_TOTAL, PERF_PRACTICA_TOTAL } from "@/lib/performance"
import {
  PERF_FIGURAS_PENDIENTES,
  PERF_LECCION_TOTAL,
  PERF_MINUTOS,
  PERF_PRACTICA_CLAVES,
} from "@/lib/performanceLeccion"
import { CM_LECTURA_TOTAL, CM_NIVELES } from "@/lib/comunicaciones"
import { CM_LECCIONES, CM_LECCION_TOTAL } from "@/lib/comunicacionesLeccion"
import { CM_PRACTICA_CONTEO } from "@/lib/comunicacionesConteo"
import { CM_PRACTICA_TOTAL } from "@/lib/comunicacionesPracticaGrupos"
import { RAC_LECTURA_MINUTOS, RAC_LECTURA_TOTAL, RAC_PRACTICA_TOTAL, RAC_UNIDADES } from "@/lib/rac"
import { RAC_LECCIONES, RAC_LECCION_TOTAL, RAC_MINUTOS } from "@/lib/racLeccion"
import { RAC_PRACTICA_CLAVES } from "@/lib/racPractica"
import { CB_CAPITULO_ESCENARIOS, CB_LECTURA_MINUTOS, CB_LECTURA_TOTAL, CB_PRACTICA_TOTAL } from "@/lib/combustible"
import {
  CB_ESCENARIO_CLAVES,
  CB_FIGURAS_PENDIENTES,
  CB_LECCIONES,
  CB_LECCION_TOTAL,
  CB_MINUTOS,
} from "@/lib/combustibleLeccion"
import { CB_PRACTICA_CLAVES } from "@/lib/combustiblePractica"
import migracionComunicaciones from "../../supabase/migrations/20260927000000_progreso_de_comunicaciones.sql?raw"

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

  it("Performance: temas, minutos y claves de práctica", () => {
    expect(PERF_LECTURA_TOTAL).toBe(PERF_LECCION_TOTAL)
    expect(PERF_LECTURA_MINUTOS).toBe(PERF_MINUTOS)
    // Los ejercicios y los escenarios no tienen pantalla propia, pero el
    // progreso los cuenta: el denominador tiene que ser el de las claves.
    expect(PERF_PRACTICA_TOTAL).toBe(PERF_PRACTICA_CLAVES.length)
    // Veinte figuras sin generar. El día que existan, este número baja y la
    // prueba avisa de que el inventario del documento cambió.
    expect(PERF_FIGURAS_PENDIENTES).toHaveLength(20)
  })

  it("RAC: unidades, minutos, claves de práctica y el reglamento de cada unidad", () => {
    expect(RAC_LECTURA_TOTAL).toBe(RAC_LECCION_TOTAL)
    expect(RAC_LECTURA_MINUTOS).toBe(RAC_MINUTOS)
    expect(RAC_PRACTICA_TOTAL).toBe(RAC_PRACTICA_CLAVES.length)
    // El resultado de la evaluación nombra la unidad por su reglamento: si el
    // orden del documento cambia, «repasa el RAC 91» apuntaría a otra.
    expect(RAC_UNIDADES).toHaveLength(RAC_LECCION_TOTAL)
    RAC_UNIDADES.forEach((rac, i) => {
      expect(RAC_LECCIONES[i]?.title.startsWith(`${rac} `)).toBe(true)
    })
  })

  it("Gestión del combustible: capítulos, minutos, práctica y figuras", () => {
    expect(CB_LECTURA_TOTAL).toBe(CB_LECCION_TOTAL)
    expect(CB_LECTURA_MINUTOS).toBe(CB_MINUTOS)
    // La práctica cuenta las preguntas de los capítulos y los escenarios del 23.
    expect(CB_PRACTICA_TOTAL).toBe(CB_PRACTICA_CLAVES.length)
    for (const clave of CB_ESCENARIO_CLAVES) expect(CB_PRACTICA_CLAVES).toContain(clave)
    // Los escenarios viven en el capítulo que la práctica enlaza.
    const escenarios = JSON.stringify(CB_LECCIONES[CB_CAPITULO_ESCENARIOS - 1]?.blocks ?? [])
    for (const clave of CB_ESCENARIO_CLAVES) expect(escenarios).toContain(`"clave":"${clave}"`)
    // Quince figuras sin generar. El día que existan, este número baja.
    expect(CB_FIGURAS_PENDIENTES).toHaveLength(15)
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
    // La migración de progreso nace con el número de lecciones; desde ahí la
    // fila la mantiene contenido/catalogo/modulos.json (scripts/catalogo).
    expect(migracionComunicaciones).toContain(`values ('comunicaciones', ${CM_LECCION_TOTAL}, '{}'::text[])`)
  })

  it("Comunicaciones ATC: el conteo liviano de la práctica", () => {
    // El panel y el hub no pueden importar el guion entero, así que llevan el
    // número aparte. Si entra o sale un ejercicio, aquí se ve.
    expect(CM_PRACTICA_CONTEO).toBe(CM_PRACTICA_TOTAL)
  })

  it("Mercancías: cada nivel empieza en una lección que existe, en orden", () => {
    const desde = MP_NIVELES.map((n) => n.desde)
    expect(desde[0]).toBe(1)
    expect(desde).toEqual([...desde].sort((a, b) => a - b))
    for (const n of desde) expect(MP_LECCIONES[n - 1]?.n).toBe(n)
  })
})
