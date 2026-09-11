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
    // Mercancías guarda el número de cada lección: tienen que ser 1..N seguidos.
    expect(MP_LECCIONES.map((l) => l.n)).toEqual(Array.from({ length: MP_LECCION_TOTAL }, (_, i) => i + 1))
  })
})
