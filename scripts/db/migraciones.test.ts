// @vitest-environment node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"

/**
 * supabase/migrations refleja el historial de la base (ver
 * supabase/HISTORIAL_DE_MIGRACIONES.md). El CLI solo reconoce archivos
 * `<versión>_<nombre>.sql`, y dos archivos con la misma versión chocan en
 * `supabase migration list` y `db push`.
 */

const CARPETA = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../supabase/migrations")
const archivos = fs.readdirSync(CARPETA).sort()

describe("migraciones", () => {
  it("todas se llaman <versión de 14 dígitos>_<nombre>.sql", () => {
    expect(archivos.filter((nombre) => !/^\d{14}_[a-z0-9_]+\.sql$/.test(nombre))).toEqual([])
  })

  it("no repiten versión", () => {
    const versiones = archivos.map((nombre) => nombre.slice(0, 14))
    expect(versiones.filter((v, i) => versiones.indexOf(v) !== i)).toEqual([])
  })
})
