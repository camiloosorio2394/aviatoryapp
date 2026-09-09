/**
 * Comprueba que el banco de psicotécnicas es coherente antes de publicarlo.
 *
 * Uso:
 *   node scripts/psicotecnicas/verificar-banco.mjs
 *
 * Por qué existe: la mitad de estos ejercicios NO se puede resolver sin su
 * figura, y una ruta de imagen mal escrita no rompe la compilación —se ve en
 * pantalla como un recuadro vacío y un piloto contestando al azar—. El
 * typecheck no puede atrapar eso; esto sí.
 *
 * Comprueba, en este orden:
 *   1. Que no haya identificadores repetidos.
 *   2. Que el índice de la respuesta caiga dentro de las opciones.
 *   3. Que no haya opciones duplicadas dentro de un mismo ejercicio.
 *   4. Que cada imagen referenciada exista de verdad en public/.
 *   5. Que cada familia tenga con qué llenar su parte del simulacro.
 *
 * Node 25 borra los tipos solo, así que basta con enseñarle a resolver el alias
 * «@» y a completar la extensión que TypeScript se ahorra al importar.
 */

import fs from "node:fs"
import { registerHooks } from "node:module"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const raiz = path.resolve(__dirname, "../..")
const publico = path.resolve(raiz, "public")

/** Prueba el archivo tal cual, con .ts y como carpeta con index.ts. */
function resolverTs(base) {
  for (const candidato of [base, `${base}.ts`, path.join(base, "index.ts")]) {
    if (fs.existsSync(candidato) && fs.statSync(candidato).isFile()) return candidato
  }
  return null
}

registerHooks({
  resolve(especificador, contexto, siguiente) {
    const esAlias = especificador.startsWith("@/")
    const esRelativo = especificador.startsWith(".")
    if (!esAlias && !esRelativo) return siguiente(especificador, contexto)

    const base = esAlias
      ? path.resolve(raiz, "src", especificador.slice(2))
      : path.resolve(path.dirname(fileURLToPath(contexto.parentURL)), especificador)

    const encontrado = resolverTs(base)
    if (!encontrado) return siguiente(especificador, contexto)
    return { url: pathToFileURL(encontrado).href, shortCircuit: true }
  },
})

const { BANCO, TOTALES, EJEMPLOS_ESPACIAL, TEORIA_CUBO } = await import(
  pathToFileURL(path.resolve(raiz, "src/data/psicotecnicas/index.ts")).href
)

const fallos = []
const vistos = new Set()

for (const e of BANCO) {
  const donde = `${e.id} (${e.fuente})`

  if (vistos.has(e.id)) fallos.push(`Identificador repetido: ${donde}`)
  vistos.add(e.id)

  if (!Number.isInteger(e.respuesta) || e.respuesta < 0 || e.respuesta >= e.opciones.length) {
    fallos.push(`Respuesta fuera de rango (${e.respuesta} de ${e.opciones.length}): ${donde}`)
  }
  if (new Set(e.opciones).size !== e.opciones.length) {
    fallos.push(`Opciones repetidas [${e.opciones.join(", ")}]: ${donde}`)
  }
  if (e.opciones.length < 2) fallos.push(`Menos de dos opciones: ${donde}`)
  if (!e.enunciado?.trim()) fallos.push(`Sin enunciado: ${donde}`)
  if (!e.explicacion?.trim()) fallos.push(`Sin explicación: ${donde}`)

  if (e.imagen) {
    if (!fs.existsSync(path.join(publico, e.imagen.replace(/^\//, "")))) {
      fallos.push(`Falta la imagen ${e.imagen}: ${donde}`)
    }
    if (!e.imagenAlt?.trim()) fallos.push(`Imagen sin texto alternativo: ${donde}`)
  }
  // Una figura que trae sus propias alternativas dibujadas no se puede
  // responder sin verla: si no hay imagen, el ejercicio es irresoluble.
  if (e.opcionesEnImagen && !e.imagen) {
    fallos.push(`Dice que las opciones van en la figura, pero no hay figura: ${donde}`)
  }
}

for (const lamina of [...EJEMPLOS_ESPACIAL, ...TEORIA_CUBO]) {
  if (!fs.existsSync(path.join(publico, lamina.imagen.replace(/^\//, "")))) {
    fallos.push(`Falta la lámina ${lamina.imagen}: ${lamina.id}`)
  }
}

// El simulacro pide diez de cada familia. Con menos, se completa con las otras
// y deja de medir lo que dice medir.
for (const [familia, total] of Object.entries(TOTALES)) {
  if (total < 10) {
    fallos.push(`La familia ${familia} tiene ${total} ejercicios y el simulacro pide 10`)
  }
}



if (fallos.length > 0) {
  console.error(`✗ ${fallos.length} problemas en el banco:\n`)
  for (const f of fallos) console.error(`  · ${f}`)
  process.exit(1)
}

const conImagen = BANCO.filter((e) => e.imagen).length
console.log(
  `✓ Banco correcto: ${BANCO.length} ejercicios ` +
    `(${TOTALES.abstracto} abstracto, ${TOTALES.espacial} espacial, ${TOTALES.numerico} numérico), ` +
    `${conImagen} con figura, ${EJEMPLOS_ESPACIAL.length} ejemplos resueltos, ` +
    `${TEORIA_CUBO.length} láminas de teoría.`
)
