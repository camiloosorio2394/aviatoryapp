#!/usr/bin/env node
/**
 * Sube las imágenes del TEA Part 3 (Picture Description & Discussion) a
 * Supabase Storage. Fuente: "NEW PICTURES (1).docx" de la carpeta TEA Materials
 * (26 imágenes = 13 pares temáticos), ya optimizadas a JPG ~1100px.
 *
 * Destino: bucket público `icao-images`, paths part3/01.jpg … 26.jpg.
 *
 * Uso (las imágenes optimizadas deben estar en OPT_DIR):
 *   node scripts/upload-icao-pictures.mjs
 *
 * Requisitos: .env.local con VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.
 * Idempotente (upsert).
 */
import { readFileSync, existsSync } from "node:fs"
import { resolve, join } from "node:path"
import { createClient } from "@supabase/supabase-js"

const OPT_DIR =
  "/private/tmp/claude-501/-Users-nicog-Projects/4218b651-b01c-4390-9bd4-5d0b7a333658/scratchpad/pics/word/media/opt"
const BUCKET = "icao-images"

const envPath = resolve(".env.local")
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=["']?(.+?)["']?$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
  }
}
const URL = process.env.VITE_SUPABASE_URL
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!URL || !KEY) {
  console.error("ERROR: faltan VITE_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local")
  process.exit(1)
}
const supa = createClient(URL, KEY, { auth: { persistSession: false } })

console.log(`\n📦 Bucket: ${BUCKET}`)
const { error: bErr } = await supa.storage.createBucket(BUCKET, {
  public: true,
  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  fileSizeLimit: "5MB",
})
if (bErr && !/already exists/i.test(bErr.message)) {
  console.error("ERROR creando bucket:", bErr.message)
  process.exit(1)
}
console.log(bErr ? "   (ya existía, ok)" : "   creado público ✓")

console.log(`\n⬆️  Subiendo 26 imágenes...\n`)
let ok = 0, fail = 0
for (let i = 1; i <= 26; i++) {
  const name = `${String(i).padStart(2, "0")}.jpg`
  const local = join(OPT_DIR, name)
  if (!existsSync(local)) {
    fail++
    console.log(`  ⚠️ FALTA ${local}`)
    continue
  }
  const { error } = await supa.storage.from(BUCKET).upload(`part3/${name}`, readFileSync(local), {
    contentType: "image/jpeg",
    upsert: true,
  })
  if (error) { fail++; console.log(`  ❌ part3/${name} — ${error.message}`) }
  else { ok++; console.log(`  ✓ part3/${name}`) }
}

console.log(`\n${"=".repeat(50)}`)
console.log(`✓ Subidas: ${ok}  ❌ Fallidas: ${fail}`)
console.log(`\nBase pública:\n  ${URL}/storage/v1/object/public/${BUCKET}/part3/NN.jpg\n`)
