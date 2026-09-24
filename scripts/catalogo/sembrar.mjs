/**
 * Imprime el SQL que carga contenido/catalogo/modulos.json en public.modulos_contenido.
 *
 *   node scripts/catalogo/sembrar.mjs                  todos los módulos
 *   node scripts/catalogo/sembrar.mjs comunicaciones   solo ese (o varios)
 *
 * Es un upsert por módulo: no borra filas. Se corre en Supabase después de
 * regenerar el catálogo (ver scripts/catalogo/catalogo.test.ts). Con nombres,
 * solo toca esos módulos: sirve para cargar uno sin pisar el de otro que en
 * la base esté a propósito en otra versión.
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const archivo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../contenido/catalogo/modulos.json")
const catalogo = JSON.parse(fs.readFileSync(archivo, "utf8"))

const literal = (s) => `'${String(s).replace(/'/g, "''")}'`

const pedidos = new Set(process.argv.slice(2))
const desconocidos = [...pedidos].filter((m) => !(m in catalogo))
if (desconocidos.length > 0) {
  console.error(`No están en el catálogo: ${desconocidos.join(", ")}`)
  process.exit(1)
}

const filas = Object.entries(catalogo)
  .filter(([modulo]) => pedidos.size === 0 || pedidos.has(modulo))
  .map(([modulo, { lecciones, practicas }]) => {
  if (!Number.isInteger(lecciones) || lecciones < 1) throw new Error(`${modulo}: lecciones inválidas`)
  if (!Array.isArray(practicas) || practicas.some((p) => typeof p !== "string" || !p)) {
    throw new Error(`${modulo}: prácticas inválidas`)
  }
  return `  (${literal(modulo)}, ${lecciones}, array[${practicas.map(literal).join(", ")}]::text[])`
})

console.log(`insert into public.modulos_contenido (modulo, lecciones, practicas) values
${filas.join(",\n")}
on conflict (modulo) do update set
  lecciones = excluded.lecciones,
  practicas = excluded.practicas,
  actualizado_en = now();`)
