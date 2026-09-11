#!/usr/bin/env node
/**
 * Genera el SQL que carga los bancos de contenido/bancos/ en la base.
 *
 *   node scripts/bancos/sembrar.mjs                   todos los bancos
 *   node scripts/bancos/sembrar.mjs notam_evaluacion  solo ese banco
 *
 * Imprime el SQL por la salida estándar para aplicarlo en el SQL editor de
 * Supabase (o con el conector). Es idempotente: se puede correr después de cada
 * cambio de un banco. Valida cada banco antes de generar nada.
 *
 * Por qué no va en una migración: las preguntas llevan su respuesta, y las
 * migraciones son para la estructura. El contenido se edita en contenido/bancos/
 * y se carga con esto.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { sqlDeBanco, validarBanco } from "./banco.mjs"

const carpeta = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../contenido/bancos")
const pedidos = new Set(process.argv.slice(2))

const archivos = fs
  .readdirSync(carpeta)
  .filter((f) => f.endsWith(".json"))
  .filter((f) => pedidos.size === 0 || pedidos.has(path.basename(f, ".json")))
  .sort()

if (archivos.length === 0) {
  console.error(`No encontré bancos ${pedidos.size ? [...pedidos].join(", ") : ""} en ${carpeta}`)
  process.exit(1)
}

const sql = archivos.map((archivo) => {
  const datos = JSON.parse(fs.readFileSync(path.join(carpeta, archivo), "utf8"))
  const banco = validarBanco(datos)
  if (banco.banco !== path.basename(archivo, ".json")) {
    throw new Error(`${archivo}: el campo "banco" dice ${banco.banco}; el archivo debe llamarse igual`)
  }
  return sqlDeBanco(banco)
})

process.stdout.write(sql.join("\n"))
