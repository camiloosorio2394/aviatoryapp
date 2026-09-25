// @vitest-environment node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
import { EXERCISES, REAL_NOTAMS } from "@/lib/notam"
import { claveEjercicioNotam, claveNotamReal } from "@/lib/notamComun"
import { LESSON_TOTAL } from "@/lib/notamLesson"
import { METAR_EXERCISES, claveEjercicioMetar } from "@/lib/metar"
import { METAR_LESSON_TOTAL } from "@/lib/metarLesson"
import { MP_LECCIONES, MP_LECCION_TOTAL } from "@/lib/mercanciasLeccion"
import {
  CASOS,
  EJERCICIOS_ETIQUETAS,
  ENTREVISTA,
  ESCENARIOS,
  claveCaso,
  claveEntrevista,
  claveEscenario,
  claveEtiquetas,
} from "@/lib/mercanciasPractica"
import { AERO_LECCIONES, AERO_LECCION_TOTAL } from "@/lib/aerodinamicaLeccion"
import { AERO_PRACTICA_CLAVES } from "@/lib/aerodinamicaPractica"
import { AP_LECCION_TOTAL } from "@/lib/aeropuertosLeccion"
import { AP_PRACTICA_CLAVES } from "@/lib/aeropuertosPractica"
import { PERF_LECCION_TOTAL, PERF_PRACTICA_CLAVES } from "@/lib/performanceLeccion"
import { CM_LECCION_TOTAL } from "@/lib/comunicacionesLeccion"
import { CM_PRACTICA_CLAVES } from "@/lib/comunicacionesPracticaGrupos"
import { RAC_LECCION_TOTAL } from "@/lib/racLeccion"
import { RAC_PRACTICA_CLAVES } from "@/lib/racPractica"
import { CB_LECCION_TOTAL } from "@/lib/combustibleLeccion"
import { CB_PRACTICA_CLAVES } from "@/lib/combustiblePractica"
import { MODULOS_AEROLINEA } from "@/lib/modulosAerolinea"

/**
 * El catálogo que usa la base para validar el progreso: cuántas secciones tiene
 * cada lección y qué claves de práctica existen. Las funciones *_mark_progress
 * rechazan lo que no está aquí, y la evaluación se abre con la lección completa.
 *
 * Si cambia el contenido, esta prueba falla. Para regenerarlo:
 *   ACTUALIZAR_CATALOGO=1 npx vitest run scripts/catalogo
 * y para cargarlo en la base:
 *   node scripts/catalogo/sembrar.mjs
 */

const ARCHIVO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../contenido/catalogo/modulos.json")

function catalogoDesdeContenido() {
  return {
    notam: {
      lecciones: LESSON_TOTAL,
      practicas: [...REAL_NOTAMS.map((n) => claveNotamReal(n.id)), ...EXERCISES.map((e) => claveEjercicioNotam(e.id))],
    },
    metar: {
      lecciones: METAR_LESSON_TOTAL,
      practicas: METAR_EXERCISES.map((e) => claveEjercicioMetar(e.id)),
    },
    mercancias: {
      lecciones: MP_LECCION_TOTAL,
      practicas: [
        ...EJERCICIOS_ETIQUETAS.map((e) => claveEtiquetas(e.id)),
        ...CASOS.map((c) => claveCaso(c.id)),
        ...ESCENARIOS.map((e) => claveEscenario(e.id)),
        ...ENTREVISTA.map((p) => claveEntrevista(p.n)),
      ],
    },
    aerodinamica: {
      lecciones: AERO_LECCION_TOTAL,
      practicas: AERO_PRACTICA_CLAVES,
    },
    aeropuertos: {
      lecciones: AP_LECCION_TOTAL,
      practicas: AP_PRACTICA_CLAVES,
    },
    performance: {
      lecciones: PERF_LECCION_TOTAL,
      practicas: PERF_PRACTICA_CLAVES,
    },
    // Las claves salen de claveEjercicioCm sobre el guion de la práctica
    // (comunicacionesPracticaGrupos.ts): cambia el guion, cambia esto.
    comunicaciones: {
      lecciones: CM_LECCION_TOTAL,
      practicas: CM_PRACTICA_CLAVES,
    },
    // Las preguntas del quiz de cada unidad (u01-q1…), que salen del documento
    // con scripts/rac/convertir.mjs.
    rac: {
      lecciones: RAC_LECCION_TOTAL,
      practicas: RAC_PRACTICA_CLAVES,
    },
    // Las del quiz de cada capítulo (c01-q1…) y los diez escenarios del
    // capítulo 23 (esc-01…), de scripts/combustible/convertir.mjs.
    combustible: {
      lecciones: CB_LECCION_TOTAL,
      practicas: CB_PRACTICA_CLAVES,
    },
  }
}

describe("catálogo de contenido para la base", () => {
  const esperado = catalogoDesdeContenido()

  it("coincide con el contenido", () => {
    if (process.env.ACTUALIZAR_CATALOGO) fs.writeFileSync(ARCHIVO, `${JSON.stringify(esperado, null, 2)}\n`)
    const actual = JSON.parse(fs.readFileSync(ARCHIVO, "utf8"))
    expect(
      actual,
      "Cambió el contenido: ACTUALIZAR_CATALOGO=1 npx vitest run scripts/catalogo y luego node scripts/catalogo/sembrar.mjs",
    ).toEqual(esperado)
  })

  it("las claves no se repiten y las secciones se numeran de 1 al total", () => {
    for (const modulo of Object.values(esperado)) {
      expect(new Set(modulo.practicas).size).toBe(modulo.practicas.length)
      expect(modulo.lecciones).toBeGreaterThan(0)
    }
    // Mercancías y Aerodinámica guardan el número de cada lección: tienen que
    // ser 1..N seguidos.
    expect(MP_LECCIONES.map((l) => l.n)).toEqual(Array.from({ length: MP_LECCION_TOTAL }, (_, i) => i + 1))
    expect(AERO_LECCIONES.map((l) => l.n)).toEqual(
      Array.from({ length: AERO_LECCION_TOTAL }, (_, i) => i + 1),
    )
  })
})

/**
 * El panel pinta los módulos que estén en `MODULOS_AEROLINEA`. Si el catálogo
 * gana uno y esa lista no, el panel vuelve a anunciar menos módulos de los que
 * la app tiene, que es lo que pasó al entrar Aerodinámica: dos días mostrando
 * tres de cuatro.
 */
describe("el panel conoce todos los módulos del catálogo", () => {
  it("la lista de Ingreso a aerolínea tiene las mismas claves que el catálogo", () => {
    const catalogo = Object.keys(JSON.parse(fs.readFileSync(ARCHIVO, "utf8"))).sort()
    const lista = MODULOS_AEROLINEA.map((m) => m.clave).sort()
    expect(lista).toEqual(catalogo)
  })

  it("cada módulo dice a dónde va y con qué acento, sin repetirlos", () => {
    for (const m of MODULOS_AEROLINEA) {
      expect(m.hub.startsWith("/app/")).toBe(true)
      expect(m.acento.startsWith("var(--")).toBe(true)
      expect(m.totales.secciones).toBeGreaterThan(0)
      expect(m.totales.practicas).toBeGreaterThan(0)
    }
    expect(new Set(MODULOS_AEROLINEA.map((m) => m.hub)).size).toBe(MODULOS_AEROLINEA.length)
    expect(new Set(MODULOS_AEROLINEA.map((m) => m.acento)).size).toBe(MODULOS_AEROLINEA.length)
  })
})
