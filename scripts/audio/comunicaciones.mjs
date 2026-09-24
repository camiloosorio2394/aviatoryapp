#!/usr/bin/env node
/**
 * Manifiesto de audios de la práctica de Comunicaciones.
 *
 *   node scripts/audio/comunicaciones.mjs            valida y lista los mp3 que faltan
 *   node scripts/audio/comunicaciones.mjs --json     lo mismo, en JSON (para un lote de Higgsfield)
 *   node scripts/audio/comunicaciones.mjs --estricto sale con error si falta algún mp3
 *
 * Valida `contenido/audio/comunicaciones.json`: ids únicos y con forma de
 * nombre de archivo, texto sin raya larga, voz y perfil válidos. Después mira
 * cuáles `<id>.mp3` no están en `public/modulos/comunicaciones/audio/`.
 *
 * Formato de salida esperado de cada audio: ver scripts/audio/README.md.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
export const MANIFIESTO = path.join(RAIZ, "contenido/audio/comunicaciones.json")
export const CARPETA_AUDIO = path.join(RAIZ, "public/modulos/comunicaciones/audio")

export const VOCES = ["atc_latam", "atc_uk", "atc_us", "piloto", "piloto_pm"]
export const PERFILES = ["limpia", "normal", "sucia"]
const ID_VALIDO = /^[a-z0-9]+(-[a-z0-9]+)*$/

/**
 * Devuelve la lista de errores del manifiesto. Vacía si está bien.
 * @param {{ transmisiones?: unknown }} manifiesto
 * @returns {string[]}
 */
export function validarManifiesto(manifiesto) {
  const errores = []
  const lista = manifiesto?.transmisiones
  if (!Array.isArray(lista)) return ["falta la lista «transmisiones»"]
  const vistos = new Set()
  lista.forEach((t, i) => {
    const donde = `transmisiones[${i}]${t && typeof t.id === "string" ? ` (${t.id})` : ""}`
    if (!t || typeof t !== "object") {
      errores.push(`${donde}: no es un objeto`)
      return
    }
    if (typeof t.id !== "string" || !ID_VALIDO.test(t.id)) errores.push(`${donde}: id inválido (minúsculas, cifras y guiones)`)
    else if (vistos.has(t.id)) errores.push(`${donde}: id repetido`)
    else vistos.add(t.id)
    if (typeof t.texto !== "string" || t.texto.trim() === "") errores.push(`${donde}: texto vacío`)
    else {
      if (t.texto.includes("\u2014")) errores.push(`${donde}: el texto lleva raya larga`)
      if (t.texto.includes("\u2013")) errores.push(`${donde}: el texto lleva raya media`)
    }
    if (!VOCES.includes(t.voz)) errores.push(`${donde}: voz «${t.voz}» no es una de ${VOCES.join(", ")}`)
    if (!PERFILES.includes(t.perfil)) errores.push(`${donde}: perfil «${t.perfil}» no es uno de ${PERFILES.join(", ")}`)
    const extra = Object.keys(t).filter((k) => !["id", "texto", "voz", "perfil"].includes(k))
    if (extra.length) errores.push(`${donde}: campos de más (${extra.join(", ")})`)
  })
  return errores
}

/**
 * Las transmisiones cuyo mp3 no está en la carpeta.
 * @param {{ transmisiones: { id: string }[] }} manifiesto
 * @param {string} carpeta
 */
export function faltantes(manifiesto, carpeta = CARPETA_AUDIO) {
  const hay = fs.existsSync(carpeta) ? new Set(fs.readdirSync(carpeta)) : new Set()
  return manifiesto.transmisiones.filter((t) => !hay.has(`${t.id}.mp3`))
}

/** mp3 que están en la carpeta y no en el manifiesto: sobran o están mal nombrados. */
export function sobrantes(manifiesto, carpeta = CARPETA_AUDIO) {
  if (!fs.existsSync(carpeta)) return []
  const ids = new Set(manifiesto.transmisiones.map((t) => `${t.id}.mp3`))
  return fs.readdirSync(carpeta).filter((f) => f.endsWith(".mp3") && !ids.has(f))
}

export function leerManifiesto(archivo = MANIFIESTO) {
  return JSON.parse(fs.readFileSync(archivo, "utf8"))
}

function principal() {
  const args = new Set(process.argv.slice(2))
  const manifiesto = leerManifiesto()
  const errores = validarManifiesto(manifiesto)
  if (errores.length) {
    console.error(`Manifiesto con ${errores.length} error(es):`)
    for (const e of errores) console.error(`  - ${e}`)
    process.exit(1)
  }
  const falta = faltantes(manifiesto)
  const sobra = sobrantes(manifiesto)
  if (args.has("--json")) {
    console.log(JSON.stringify({ total: manifiesto.transmisiones.length, faltan: falta, sobran: sobra }, null, 2))
  } else {
    const total = manifiesto.transmisiones.length
    console.log(`Manifiesto válido: ${total} transmisiones.`)
    console.log(`mp3 presentes: ${total - falta.length} de ${total}.`)
    if (falta.length) {
      console.log(`\nFaltan ${falta.length} (${(falta.length * 0.7).toFixed(1)} créditos a 0,7 por línea):`)
      for (const t of falta) console.log(`  ${t.id}.mp3  [${t.voz}]  ${t.texto}`)
    }
    if (sobra.length) {
      console.log(`\nSobran ${sobra.length} (no están en el manifiesto):`)
      for (const f of sobra) console.log(`  ${f}`)
    }
  }
  if (args.has("--estricto") && falta.length) process.exit(2)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) principal()
