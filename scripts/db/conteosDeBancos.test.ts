// @vitest-environment node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"

/**
 * Las pruebas de supabase/tests comparan cuántas preguntas activas tiene cada
 * banco en la base con un número escrito a mano. Ese número tiene que ser el
 * de contenido/bancos, que es lo que siembra scripts/bancos/sembrar.mjs: si el
 * banco cambia y la prueba no, la prueba falla contra una base bien sembrada
 * (pasó con mercancias_evaluacion, que bajó de 60 a 46 en el PR #210).
 *
 * Se leen las dos formas en que están escritos esos conteos:
 *   ('banco', N)                         en la lista de progreso_y_evaluaciones
 *   select count(*) into x_n from public.banco_preguntas
 *   where banco = 'banco' and activa;
 *   if x_n <> N then                     en las pruebas de cada módulo
 */

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const PRUEBAS = path.join(RAIZ, "supabase/tests")
const BANCOS = path.join(RAIZ, "contenido/bancos")

const enRepo = new Map(
  fs
    .readdirSync(BANCOS)
    .filter((nombre) => nombre.endsWith(".json"))
    .map((nombre) => {
      const datos = JSON.parse(fs.readFileSync(path.join(BANCOS, nombre), "utf8")) as { preguntas: unknown[] }
      return [nombre.replace(/\.json$/, ""), datos.preguntas.length] as const
    }),
)

const conteos: { archivo: string; banco: string; esperado: number }[] = []
for (const archivo of fs.readdirSync(PRUEBAS).filter((nombre) => nombre.endsWith(".sql")).sort()) {
  const sql = fs.readFileSync(path.join(PRUEBAS, archivo), "utf8").replace(/\r\n/g, "\n")
  const patrones = [
    /\('([a-z_]+)',\s*(\d+)\)/g,
    /select count\(\*\) into x_n from public\.banco_preguntas\s+where banco = '([a-z_]+)' and activa;\s*if x_n <> (\d+) then/g,
  ]
  for (const patron of patrones) {
    for (const [, banco, n] of sql.matchAll(patron)) {
      if (enRepo.has(banco)) conteos.push({ archivo, banco, esperado: Number(n) })
    }
  }
}

describe("conteos de banco en supabase/tests", () => {
  it("se encuentran los de progreso_y_evaluaciones", () => {
    const lista = conteos.filter((c) => c.archivo === "progreso_y_evaluaciones.sql").map((c) => c.banco)
    expect(lista).toEqual(
      expect.arrayContaining(["notam_evaluacion", "metar_evaluacion", "mercancias_evaluacion", "mercancias_chequeo", "psicotecnicas"]),
    )
  })

  it.each(conteos)("$archivo: $banco trae $esperado como contenido/bancos", ({ banco, esperado }) => {
    expect(esperado).toBe(enRepo.get(banco))
  })
})
