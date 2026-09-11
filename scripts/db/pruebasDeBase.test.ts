// @vitest-environment node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"

/**
 * Las pruebas de supabase/tests se corren contra la base real, así que cada
 * archivo tiene que deshacer lo que escribe. Esta prueba revisa la forma, no el
 * resultado: un solo bloque `do $prueba$` cuya última instrucción es la
 * excepción PRUEBA_DESHECHA (que deshace la transacción), sin commit, sin
 * borrar estructuras y sin ids de pilotos reales escritos en el archivo.
 */

const CARPETA = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../supabase/tests")
const archivos = fs
  .readdirSync(CARPETA)
  .filter((nombre) => nombre.endsWith(".sql"))
  .sort()

function sinComentarios(sql: string): string {
  return sql
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((linea) => !/^\s*--/.test(linea))
    .join("\n")
    .trim()
}

describe("pruebas de base", () => {
  it("hay pruebas", () => {
    expect(archivos.length).toBeGreaterThan(0)
  })

  describe.each(archivos)("%s", (nombre) => {
    const sql = sinComentarios(fs.readFileSync(path.join(CARPETA, nombre), "utf8"))

    it("es un solo bloque do $prueba$", () => {
      expect(sql.startsWith("do $prueba$")).toBe(true)
      expect(sql.endsWith("$prueba$;")).toBe(true)
      expect(sql.match(/\$prueba\$/g)).toHaveLength(2)
    })

    it("termina en la excepción que deshace todo", () => {
      expect(sql).toMatch(/raise exception 'PRUEBA_DESHECHA%', x_log;\s*end\s*\$prueba\$;$/)
    })

    it("no confirma, no borra estructuras y no nombra pilotos", () => {
      expect(sql).not.toMatch(/\b(commit|rollback|truncate|drop\s+(table|schema|function|policy|trigger|index))\b/i)
      expect(sql).not.toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i)
    })
  })
})
