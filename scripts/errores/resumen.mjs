#!/usr/bin/env node
/**
 * Qué se está rompiendo en la app, agrupado y ordenado.
 *
 * `errores_cliente` se llena sola desde el navegador de cada piloto
 * (src/lib/errores.ts) y nadie la mira: hay que entrar al panel de Supabase y
 * leer filas sueltas. Este comando la convierte en un informe.
 *
 * Uso:
 *   node scripts/errores/resumen.mjs             # últimas 24 horas
 *   node scripts/errores/resumen.mjs --dias 7
 *   node scripts/errores/resumen.mjs --horas 2
 *   node scripts/errores/resumen.mjs --json      # para pegarlo en otro lado
 *
 * Requiere .env.local con VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY. La
 * tabla no da permisos a `anon` ni a `authenticated` a propósito (ver
 * supabase/migrations/20260911201503_errores_del_cliente.sql): solo la llave de
 * servicio la lee, y esa no sale de tu máquina.
 *
 * Solo lee. No escribe ni borra nada.
 */

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { createClient } from "@supabase/supabase-js"
import { agruparErrores, formatearResumen } from "./agrupar.mjs"

const TOPE_FILAS = 5000

// ─── Argumentos ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const valor = (bandera) => {
  const i = args.indexOf(bandera)
  return i === -1 ? null : Number(args[i + 1])
}
const horas = valor("--horas") ?? (valor("--dias") ?? 1) * 24
if (!Number.isFinite(horas) || horas <= 0) {
  console.error("La ventana tiene que ser un número de horas o días mayor que cero.")
  process.exit(1)
}
const comoJson = args.includes("--json")

// ─── Credenciales ────────────────────────────────────────────────────────────
const envPath = resolve(".env.local")
if (existsSync(envPath)) {
  for (const linea of readFileSync(envPath, "utf-8").split("\n")) {
    const m = linea.match(/^([A-Z_]+)=["']?(.+?)["']?$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
  }
}
const URL = process.env.VITE_SUPABASE_URL
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!URL || !KEY) {
  console.error("ERROR: faltan VITE_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local")
  console.error("La llave de servicio está en Supabase → Project Settings → API.")
  process.exit(1)
}

// ─── Consulta ────────────────────────────────────────────────────────────────
const supabase = createClient(URL, KEY, { auth: { persistSession: false } })
const desde = new Date(Date.now() - horas * 60 * 60 * 1000).toISOString()

const { data, error } = await supabase
  .from("errores_cliente")
  .select("user_id, creado_en, contexto, mensaje, detalle, ruta, version_app, navegador")
  .gte("creado_en", desde)
  .order("creado_en", { ascending: false })
  .limit(TOPE_FILAS)

if (error) {
  console.error("ERROR al consultar errores_cliente:", error.message)
  process.exit(1)
}

const filas = data ?? []
const grupos = agruparErrores(filas)

if (comoJson) {
  // El ejemplo lleva la traza entera, que es lo que sirve para depurar.
  console.log(JSON.stringify({ desde, horas, filas: filas.length, grupos }, null, 2))
} else {
  const ventana = horas % 24 === 0 ? `${horas / 24} día(s)` : `${horas} hora(s)`
  console.log(`Errores de los últimos ${ventana} (desde ${desde.replace("T", " ").slice(0, 16)})\n`)
  console.log(formatearResumen(grupos))
  if (filas.length === TOPE_FILAS) {
    console.log(`\nAviso: se alcanzó el tope de ${TOPE_FILAS} filas. Usa una ventana más corta.`)
  }
}
