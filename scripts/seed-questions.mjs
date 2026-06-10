#!/usr/bin/env node
/**
 * Carga un batch de preguntas a `vault_questions` encriptándolas SERVER-SIDE.
 *
 * Uso:
 *   node scripts/seed-questions.mjs private-batches/<nombre>.json
 *
 * Requisitos:
 *   - .env.local con VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (no anon)
 *   - El secret `vault_questions_master_key` debe existir en Supabase Vault
 *   - Las funciones private.vault_insert ya aplicadas (migration vault_question_bank)
 *
 * Seguridad:
 *   - El JSON nunca se sube al repo (private-batches/ está gitignored)
 *   - Usa SERVICE_ROLE_KEY para llamar funciones del schema `private`
 *   - El texto plano NUNCA queda en logs del servidor: la encriptación ocurre
 *     dentro de pgp_sym_encrypt en la transacción, no se loguea
 *   - Sugerido borrar el archivo JSON después de cargar
 *
 * Reverso (si algo falla a mitad):
 *   - vault_questions tiene `batch_name` y `external_id` — para reintentar un
 *     batch puntual: `delete from vault_questions where batch_name = 'X'`
 *     desde Supabase Studio con service_role.
 */

import { readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"
import { createClient } from "@supabase/supabase-js"

// ─── Args ──────────────────────────────────────────────────────────────────
const batchPath = process.argv[2]
if (!batchPath) {
  console.error("ERROR: pasame el path al JSON.\nEj: node scripts/seed-questions.mjs private-batches/aerodinamica-batch1.json")
  process.exit(1)
}
const absPath = resolve(batchPath)
if (!existsSync(absPath)) {
  console.error(`ERROR: no encuentro el archivo ${absPath}`)
  process.exit(1)
}

// ─── Env ───────────────────────────────────────────────────────────────────
// Cargar variables desde .env.local manualmente (no usamos dotenv pa no agregar dep)
const envPath = resolve(".env.local")
if (existsSync(envPath)) {
  const env = readFileSync(envPath, "utf-8")
  for (const line of env.split("\n")) {
    const m = line.match(/^([A-Z_]+)=["']?(.+?)["']?$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
  }
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("ERROR: faltan VITE_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local")
  console.error("       SERVICE_KEY la copiás de Supabase Dashboard → Settings → API → service_role (secret)")
  process.exit(1)
}

// ─── Parse del batch ───────────────────────────────────────────────────────
const batch = JSON.parse(readFileSync(absPath, "utf-8"))
const required = ["subject_slug", "module", "batch_name", "questions"]
for (const f of required) {
  if (!batch[f]) {
    console.error(`ERROR: el JSON necesita la key "${f}"`)
    process.exit(1)
  }
}
if (!Array.isArray(batch.questions) || batch.questions.length === 0) {
  console.error("ERROR: batch.questions debe ser un array no vacío")
  process.exit(1)
}

// ─── Validación shape preguntas ────────────────────────────────────────────
for (const [i, q] of batch.questions.entries()) {
  const idx = q.external_id ?? i + 1
  if (!q.question) throw new Error(`Q${idx}: falta "question"`)
  if (!q.options || typeof q.options !== "object") throw new Error(`Q${idx}: falta "options" (obj con keys a/b/c[/d])`)
  if (!q.correct_answer) throw new Error(`Q${idx}: falta "correct_answer" ('a'|'b'|'c'|'d')`)
  if (!q.options[q.correct_answer.toLowerCase()]) {
    throw new Error(`Q${idx}: correct_answer "${q.correct_answer}" no existe en options`)
  }
  if (!q.explanation) console.warn(`⚠️  Q${idx}: sin explanation (se permite pero recomiendo agregar)`)
}

// ─── Insert ────────────────────────────────────────────────────────────────
const supa = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

console.log(`\n📦 Batch: ${batch.batch_name}`)
console.log(`   Subject: ${batch.subject_slug} · Module: ${batch.module}`)
console.log(`   Preguntas: ${batch.questions.length}\n`)

let inserted = 0
let failed = 0
const failures = []

for (const [i, q] of batch.questions.entries()) {
  const idx = q.external_id ?? i + 1
  process.stdout.write(`  Q${String(idx).padStart(3, " ")} ... `)

  const { data, error } = await supa.rpc("vault_insert", {
    p_subject_slug: batch.subject_slug,
    p_module: batch.module,
    p_question: q.question,
    p_options: q.options,
    p_correct_answer: q.correct_answer.toLowerCase(),
    p_explanation: q.explanation ?? "",
    p_pedagogical_note: q.pedagogical_note ?? null,
    p_external_id: q.external_id ?? null,
    p_difficulty: q.difficulty ?? 2,
    p_tags: q.tags ?? [],
    p_exam_year: q.exam_year ?? null,
    p_source: batch.source ?? "uaeac_pca",
    p_batch_name: batch.batch_name,
  })

  if (error) {
    failed++
    failures.push({ idx, error: error.message })
    console.log(`❌ ${error.message}`)
  } else {
    inserted++
    console.log(`✓ id=${data}`)
  }
}

console.log(`\n${"=".repeat(60)}`)
console.log(`✓ Insertadas: ${inserted}`)
console.log(`✗ Fallidas:   ${failed}`)
if (failures.length) {
  console.log(`\nFallidas:`)
  for (const f of failures) console.log(`  Q${f.idx}: ${f.error}`)
}
console.log("")
console.log("⚠️  Recordá borrar el JSON local después de verificar:")
console.log(`   rm ${absPath}`)
console.log("")
