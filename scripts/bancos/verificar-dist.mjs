#!/usr/bin/env node
/**
 * Comprueba que ningún banco de contenido/bancos/ terminó dentro del build.
 *
 *   npx vite build && node scripts/bancos/verificar-dist.mjs
 *
 * Los bancos llevan las respuestas y los sirve el servidor. Si alguien importa
 * uno desde la app (directo o por un módulo que lo arrastre), sus textos
 * aparecen en dist/ y esto falla. Busca los enunciados largos y el comienzo de
 * las explicaciones largas: los cortos pueden coincidir con una lección sin ser
 * una copia del banco.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const DIST = path.join(RAIZ, "dist")
const BANCOS = path.join(RAIZ, "contenido/bancos")

// Coincidencias editoriales conocidas: ejercicios «pon a prueba» de la lección de
// Mercancías que repiten una pregunta del banco. Son las mismas que anota
// src/lib/evaluacionesContenido.test.ts; se resuelven cambiando una de las dos.
const CONOCIDAS = new Set(["mercancias_chequeo/p2", "mercancias_chequeo/p5", "mercancias_evaluacion/56"])

function archivos(carpeta) {
  return fs.readdirSync(carpeta, { withFileTypes: true }).flatMap((e) => {
    const ruta = path.join(carpeta, e.name)
    return e.isDirectory() ? archivos(ruta) : /\.(js|html|json|webmanifest)$/.test(e.name) ? [ruta] : []
  })
}

if (!fs.existsSync(DIST)) {
  console.error("No hay dist/: corre primero npx vite build")
  process.exit(1)
}

const build = archivos(DIST)
  .map((f) => fs.readFileSync(f, "utf8"))
  .join("\n")
const aparece = (texto) => build.includes(texto) || build.includes(JSON.stringify(texto).slice(1, -1))

let revisados = 0
const encontrados = []
for (const archivo of fs.readdirSync(BANCOS).filter((f) => f.endsWith(".json"))) {
  const { banco, preguntas } = JSON.parse(fs.readFileSync(path.join(BANCOS, archivo), "utf8"))
  for (const p of preguntas) {
    const huellas = []
    if (p.enunciado.length >= 60) huellas.push(p.enunciado)
    if ((p.explicacion ?? "").length >= 120) huellas.push(p.explicacion.slice(0, 120))
    for (const huella of huellas) {
      revisados++
      if (aparece(huella) && !CONOCIDAS.has(`${banco}/${p.id}`)) encontrados.push(`${banco}/${p.id}`)
    }
  }
}

if (revisados === 0) {
  console.error("No se revisó ningún texto: algo cambió en contenido/bancos/")
  process.exit(1)
}
if (encontrados.length > 0) {
  console.error(`Hay textos de bancos dentro de dist/ (${encontrados.length}):`)
  for (const e of [...new Set(encontrados)]) console.error(`  ${e}`)
  console.error("Algún módulo de la app está importando un banco. Los bancos los sirve el servidor.")
  process.exit(1)
}
console.log(`dist/ limpio: ${revisados} textos de bancos revisados, ninguno en el build.`)
