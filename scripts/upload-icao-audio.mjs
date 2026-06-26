#!/usr/bin/env node
/**
 * Sube los audios del TEA Part 2 (Interactive Comprehension) a Supabase Storage.
 *
 * Fuente local (NO va al repo — son ~58MB): carpeta que compartió Cami.
 *   /Users/nicog/Downloads/ICAO/{SHORT AUDIOS, LONG AUDIOS, Audios questions and advice}
 *
 * Destino: bucket público `icao-audio` con esta estructura:
 *   short/a/track-01.mp3 … track-16.mp3        (set "01 Track 1-16")
 *   short/b/023.wav … 041.mp3                   (set "0NN")
 *   short/c/cd4-01.m4a … cd4-16.m4a             (set "CD4Track")
 *   long/01-….wav … 16-….mp3                    (13 con nombre + 3 numerados)
 *   interactive/11.mp3 … 16.mp3                  (tracks 11-16)
 *
 * Uso:
 *   node scripts/upload-icao-audio.mjs
 *
 * Requisitos: .env.local con VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.
 * Idempotente: usa upsert, se puede correr de nuevo sin duplicar.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs"
import { resolve, join } from "node:path"
import { createClient } from "@supabase/supabase-js"

const SRC = "/Users/nicog/Downloads/ICAO"
const BUCKET = "icao-audio"

// ─── Env ─────────────────────────────────────────────────────────────────────
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

// ─── Content types ───────────────────────────────────────────────────────────
const MIME = { mp3: "audio/mpeg", wav: "audio/wav", m4a: "audio/mp4" }
const ext = (f) => f.split(".").pop().toLowerCase()

// ─── Manifest ────────────────────────────────────────────────────────────────
const manifest = []

// SHORT set A — "NN NN Track N.mp3" (1..16)
for (let i = 1; i <= 16; i++) {
  const local = join(SRC, "SHORT AUDIOS", `${String(i).padStart(2, "0")} ${String(i).padStart(2, "0")} Track ${i}.mp3`)
  manifest.push({ local, dest: `short/a/track-${String(i).padStart(2, "0")}.mp3` })
}

// SHORT set B — "0NN.{wav,mp3}"
for (const f of readdirSync(join(SRC, "SHORT AUDIOS")).filter((f) => /^0\d\d\.(wav|mp3)$/i.test(f)).sort()) {
  manifest.push({ local: join(SRC, "SHORT AUDIOS", f), dest: `short/b/${f}` })
}

// SHORT set C — "CD4Track NN.m4a"
for (let i = 1; i <= 16; i++) {
  const local = join(SRC, "SHORT AUDIOS", `CD4Track ${String(i).padStart(2, "0")}.m4a`)
  manifest.push({ local, dest: `short/c/cd4-${String(i).padStart(2, "0")}.m4a` })
}

// LONG — 13 nombrados (orden fijo) + 3 numerados
const LONG_NAMED = [
  ["Migratory birds reported in vicinity of apprach path 23L.wav", "long/01-birds-23l.wav"],
  ["Last flight to land reported sev wind shear half mile threshold 15R with loss 20K.wav", "long/02-windshear-15r.wav"],
  ["Line Up Wait Vehichle xing upwind end of rw.wav", "long/03-vehicle-crossing.wav"],
  ["Looks like Delta 767 Stand 39 damage Impact right fwd pax dr.wav", "long/04-delta767-stand39.wav"],
  ["Main work far end rw04Landing distance reduced 300m to 2710.wav", "long/05-rw04-distance-reduced.wav"],
  ["Momentary power cut and showing nothing on radar screens at moment.wav", "long/06-power-cut-radar.wav"],
  ["RQ PB Neg Spillage on Ramp behind HP antic 10 min delay.wav", "long/07-spillage-ramp.wav"],
  ["Reg 259 on Approach and MD83 just entered Active rwy.wav", "long/08-md83-active-rwy.wav"],
  ["Reg319 Twr Os rear cargo door closed and locked seem locking lever not flush.wav", "long/09-cargo-door.wav"],
  ["Rw 07R is blocked by an aircraft not vacated Luft 338 on short final.wav", "long/10-rw07r-blocked.wav"],
  ["Twr JB1638 on Kilo heading for 10L Looks like suspicious man with bag on Mike.wav", "long/11-suspicious-man.wav"],
  ["Twr PH 458 just heard a loud thud and felt vibrations.wav", "long/12-thud-vibrations.wav"],
  ["Varig Std Hold Patt Madrid FL090 ex 30 delay.wav", "long/13-varig-hold.wav"],
]
for (const [src, dest] of LONG_NAMED) manifest.push({ local: join(SRC, "LONG AUDIOS", src), dest })
manifest.push({ local: join(SRC, "LONG AUDIOS", "06-AudioTrack 06.mp3"), dest: "long/14-track06.mp3" })
manifest.push({ local: join(SRC, "LONG AUDIOS", "15-AudioTrack 15.mp3"), dest: "long/15-track15.mp3" })
manifest.push({ local: join(SRC, "LONG AUDIOS", "41-AudioTrack 41.mp3"), dest: "long/16-track41.mp3" })

// INTERACTIVE (questions and advice) — tracks 11..16, variante "NN Track NN.mp3"
for (let i = 11; i <= 16; i++) {
  manifest.push({ local: join(SRC, "Audios questions and advice", `${i} Track ${i}.mp3`), dest: `interactive/${i}.mp3` })
}

// ─── Crear bucket ────────────────────────────────────────────────────────────
console.log(`\n📦 Bucket: ${BUCKET}`)
const { error: bErr } = await supa.storage.createBucket(BUCKET, {
  public: true,
  allowedMimeTypes: ["audio/mpeg", "audio/wav", "audio/mp4", "audio/x-m4a"],
  fileSizeLimit: "10MB",
})
if (bErr && !/already exists/i.test(bErr.message)) {
  console.error("ERROR creando bucket:", bErr.message)
  process.exit(1)
}
console.log(bErr ? "   (ya existía, ok)" : "   creado público ✓")

// ─── Subir ───────────────────────────────────────────────────────────────────
console.log(`\n⬆️  Subiendo ${manifest.length} archivos...\n`)
let ok = 0, fail = 0, missing = 0
for (const { local, dest } of manifest) {
  if (!existsSync(local)) {
    missing++
    console.log(`  ⚠️  FALTA local: ${local}`)
    continue
  }
  const body = readFileSync(local)
  const { error } = await supa.storage.from(BUCKET).upload(dest, body, {
    contentType: MIME[ext(local)] ?? "application/octet-stream",
    upsert: true,
  })
  if (error) {
    fail++
    console.log(`  ❌ ${dest} — ${error.message}`)
  } else {
    ok++
    console.log(`  ✓ ${dest}`)
  }
}

console.log(`\n${"=".repeat(50)}`)
console.log(`✓ Subidos: ${ok}  ❌ Fallidos: ${fail}  ⚠️ Faltantes: ${missing}`)
console.log(`\nBase pública:`)
console.log(`  ${URL}/storage/v1/object/public/${BUCKET}/<path>\n`)
