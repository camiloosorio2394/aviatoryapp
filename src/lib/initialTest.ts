/**
 * Test inicial — diagnóstico de arranque.
 *
 * Combina:
 *  - INGLÉS ICAO: preguntas de lectura del quiz ICAO (las corrige el servidor)
 *    + 1 de listening (audio real de comprensión). Da un "Nivel Inicial
 *    (estimado)", topado en 5 (un quiz no mide hablar; el nivel oficial sale
 *    del simulacro TEA).
 *  - MATERIAS PCA: ≥2 preguntas por materia desde el vault (server-validated).
 *
 * Sin migración: al terminar se guarda solo el nivel ICAO estimado en
 * pilot_state.icao_english_level; el desglose por materia se muestra al final.
 */
import { supabase } from "@/integrations/supabase/client"
import { barajar } from "@/lib/barajar"
import { SHORT_AUDIO_SETS } from "@/lib/icaoComprehension"
import { getSubjectMeta } from "@/lib/vaultSubjects"
import { responderIcaoQuiz, traerPreguntasIcao } from "@/services/icaoQuiz"
import { esObjeto, llamarRpc, texto, textoONulo } from "@/services/rpc"

interface ItemBase {
  uid: string
  /** "icao" o el subject_slug de la materia */
  area: string
  areaLabel: string
  prompt: string
  context?: string | null
  options: { letter: string; text: string }[]
}

/**
 * Cada pregunta trae lo que necesita para corregirse:
 *  - icao: lectura del quiz ICAO, la corrige icao_quiz_responder.
 *  - vault: materia PCA, la corrige vault_submit_answer con el token de la sesión.
 *  - audio: quién habla en un audio corto; la respuesta viaja con la app, junto al audio.
 */
export type TestItem =
  | (ItemBase & { kind: "icao"; preguntaId: number })
  | (ItemBase & { kind: "vault"; token: string; position: number })
  | (ItemBase & { kind: "audio"; audioUrl: string; correctAnswer: string; explanation: string })

export interface TestSubject {
  slug: string
  label: string
  /** Tamaño del banco de esa materia. Se usa para desempatar la "materia más floja". */
  questionCount: number
}

export interface BuiltTest {
  items: TestItem[]
  subjects: TestSubject[]
  icaoCount: number
}

const ICAO_READING = 6
const PER_SUBJECT = 2

/** Minutos estimados por pregunta (lectura + opciones + feedback). */
const MIN_PER_QUESTION = 0.4

function optsFromRecord(rec: Record<string, string> | null | undefined): { letter: string; text: string }[] {
  if (!rec) return []
  return Object.entries(rec)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, text]) => ({ letter, text }))
}

/** Arma el test inicial completo (ICAO + 2 por materia). */
export async function buildInitialTest(): Promise<BuiltTest> {
  // --- INGLÉS ICAO: lectura ---
  // Si el banco no responde, el test no arranca: sin esta parte no hay nivel
  // estimado, que es lo que el test guarda.
  const lectura = await traerPreguntasIcao(null, ICAO_READING)
  const icaoItems: TestItem[] = lectura.map((p) => ({
    uid: `icao-${p.id}`,
    kind: "icao",
    area: "icao",
    areaLabel: "Inglés ICAO",
    prompt: p.prompt,
    context: p.context,
    options: optsFromRecord(p.options),
    preguntaId: p.id,
  }))

  // --- INGLÉS ICAO: 1 de listening (audio real) ---
  const audioPool = SHORT_AUDIO_SETS.flatMap((s) => s.items).filter((a) => a.speaker)
  if (audioPool.length > 0) {
    const a = barajar(audioPool)[0]
    icaoItems.push({
      uid: `icao-audio-${a.id}`,
      kind: "audio",
      area: "icao",
      areaLabel: "Inglés ICAO",
      prompt: "Escucha el audio. ¿Quién está hablando?",
      options: [
        { letter: "A", text: "Pilot" },
        { letter: "B", text: "Controller" },
      ],
      correctAnswer: a.speaker === "pilot" ? "A" : "B",
      explanation:
        a.speaker === "pilot"
          ? "Es el piloto: reporta su situación/intención a bordo."
          : "Es el controlador (ATC): da instrucciones o información desde tierra.",
      audioUrl: a.audioUrl,
    })
  }

  // --- MATERIAS PCA: 2 por materia ---
  const subjectsIncluded: TestSubject[] = []
  const pcaItems: TestItem[] = []
  try {
    const { data: subs } = await supabase.rpc("vault_list_subjects", { p_module: "pca" })
    // Banco más grande primero: así el test arranca por donde hay más para medir
    // y la "materia más floja" se desempata por tamaño de banco, no por nombre.
    const list = ((subs ?? []) as { subject_slug: string; question_count: number }[])
      .filter((s) => s.question_count >= 1)
      .sort(
        (a, b) =>
          b.question_count - a.question_count ||
          getSubjectMeta(a.subject_slug).name.localeCompare(getSubjectMeta(b.subject_slug).name),
      )
    const sessions = await Promise.all(
      list.map(async (s) => {
        try {
          const { data, error } = await supabase.rpc("vault_start_quiz", {
            p_subject_slug: s.subject_slug,
            p_module: "pca",
            p_count: Math.min(PER_SUBJECT, s.question_count),
          })
          if (error) return null
          const row = Array.isArray(data) ? data[0] : data
          if (!row) return null
          return {
            slug: s.subject_slug,
            bankCount: s.question_count,
            token: row.token as string,
            questions: row.questions as { position: number; question: string; options: Record<string, string> }[],
          }
        } catch {
          return null
        }
      }),
    )
    for (const sess of sessions) {
      if (!sess || !sess.questions?.length) continue
      const meta = getSubjectMeta(sess.slug)
      subjectsIncluded.push({ slug: sess.slug, label: meta.name, questionCount: sess.bankCount })
      for (const q of sess.questions) {
        pcaItems.push({
          uid: `vault-${sess.slug}-${q.position}`,
          kind: "vault",
          area: sess.slug,
          areaLabel: meta.name,
          prompt: q.question,
          options: optsFromRecord(q.options),
          token: sess.token,
          position: q.position,
        })
      }
    }
  } catch {
    /* sin vault → solo sección ICAO */
  }

  // ICAO primero, luego las materias en el mismo orden que `subjects`
  // (banco más grande primero), para que el chip de sección coincida.
  return {
    items: [...icaoItems, ...pcaItems],
    subjects: subjectsIncluded,
    icaoCount: icaoItems.length,
  }
}

export interface InitialTestSize {
  /** Preguntas totales del test. */
  total: number
  /** Preguntas de inglés ICAO (incluye la de audio si hay banco). */
  icao: number
  /** Materias PCA que van a entrar. */
  subjects: number
  /** Minutos estimados. */
  minutes: number
}

/**
 * Tamaño real del test antes de armarlo, para anunciarlo en la intro.
 * Devuelve `null` si no hay nada que medir todavía.
 */
export async function estimateInitialTestSize(): Promise<InitialTestSize | null> {
  try {
    const [icaoRes, subsRes] = await Promise.all([
      supabase
        .from("icao_quiz_questions")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true),
      supabase.rpc("vault_list_subjects", { p_module: "pca" }),
    ])
    const hasAudio = SHORT_AUDIO_SETS.flatMap((s) => s.items).some((a) => a.speaker)
    const icao = Math.min(ICAO_READING, icaoRes.count ?? 0) + (hasAudio ? 1 : 0)
    const list = ((subsRes.data ?? []) as { subject_slug: string; question_count: number }[]).filter(
      (s) => s.question_count >= 1,
    )
    const pcaQuestions = list.reduce((acc, s) => acc + Math.min(PER_SUBJECT, s.question_count), 0)
    const total = icao + pcaQuestions
    if (total === 0) return null
    return {
      total,
      icao,
      subjects: list.length,
      minutes: Math.max(3, Math.round(total * MIN_PER_QUESTION)),
    }
  } catch {
    return null
  }
}

export interface GradedAnswer {
  uid: string
  area: string
  correct: boolean
  correctAnswer: string
  explanation: string | null
}

/**
 * Corrige una respuesta. Si el servidor no la puede corregir lanza
 * ErrorEvaluacion y la pregunta queda abierta para reintentarla: un fallo de
 * red no es una respuesta incorrecta.
 */
export async function gradeItem(item: TestItem, letter: string): Promise<GradedAnswer> {
  const base = { uid: item.uid, area: item.area }
  switch (item.kind) {
    case "icao": {
      const c = await responderIcaoQuiz(item.preguntaId, letter)
      return { ...base, correct: c.correcta, correctAnswer: c.respuestaCorrecta, explanation: c.explicacion }
    }
    case "vault":
      return llamarRpc(
        "vault_submit_answer",
        { p_token: item.token, p_position: item.position, p_answer: letter },
        (datos) => {
          const fila = Array.isArray(datos) ? datos[0] : datos
          if (!esObjeto(fila) || typeof fila.is_correct !== "boolean") throw new Error("se esperaba una corrección")
          return {
            ...base,
            correct: fila.is_correct,
            correctAnswer: texto(fila.correct_answer),
            explanation: textoONulo(fila.explanation),
          }
        },
      )
    case "audio":
      return {
        ...base,
        correct: letter === item.correctAnswer,
        correctAnswer: item.correctAnswer,
        explanation: item.explanation,
      }
  }
}

/** Nivel ICAO estimado (3–5) a partir del % de aciertos de la sección ICAO. Nunca 6. */
export function estimateIcaoLevel(icaoCorrect: number, icaoTotal: number): number | null {
  if (icaoTotal === 0) return null
  const pct = (icaoCorrect / icaoTotal) * 100
  if (pct < 40) return 3
  if (pct < 70) return 4
  return 5
}
