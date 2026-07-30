/**
 * Test inicial — diagnóstico de arranque.
 *
 * Combina:
 *  - INGLÉS ICAO: preguntas de lectura (icao_quiz_questions) + 1 de listening
 *    (audio real de comprensión). Da un "Nivel Inicial (estimado)", topado en 5
 *    (un quiz no mide hablar; el nivel oficial sale del simulacro TEA).
 *  - MATERIAS PCA: ≥2 preguntas por materia desde el vault (server-validated).
 *
 * Sin migración: al terminar se guarda solo el nivel ICAO estimado en
 * pilot_state.icao_english_level; el desglose por materia se muestra al final.
 */
import { supabase } from "@/integrations/supabase/client"
import { SHORT_AUDIO_SETS } from "@/lib/icaoComprehension"
import { getSubjectMeta } from "@/lib/vaultSubjects"

export type ItemKind = "mcq" | "vault" | "audio"

export interface TestItem {
  uid: string
  kind: ItemKind
  /** "icao" o el subject_slug de la materia */
  area: string
  areaLabel: string
  prompt: string
  context?: string | null
  options: { letter: string; text: string }[]
  /** mcq/audio: respuesta conocida en cliente */
  correctAnswer?: string
  explanation?: string | null
  audioUrl?: string
  /** vault: se valida server-side */
  token?: string
  position?: number
}

export interface BuiltTest {
  items: TestItem[]
  subjects: { slug: string; label: string }[]
  icaoCount: number
}

const ICAO_READING = 6
const PER_SUBJECT = 2

function optsFromRecord(rec: Record<string, string> | null | undefined): { letter: string; text: string }[] {
  if (!rec) return []
  return Object.entries(rec)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, text]) => ({ letter, text }))
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

/** Arma el test inicial completo (ICAO + 2 por materia). */
export async function buildInitialTest(): Promise<BuiltTest> {
  // --- INGLÉS ICAO: lectura ---
  const icaoItems: TestItem[] = []
  try {
    const { data } = await supabase
      .from("icao_quiz_questions")
      .select("id,topic,prompt,context,options,correct_answer,explanation")
      .eq("is_active", true)
      .limit(50)
    const picked = shuffle((data ?? []) as Record<string, unknown>[]).slice(0, ICAO_READING)
    for (const r of picked) {
      icaoItems.push({
        uid: `icao-${r.id}`,
        kind: "mcq",
        area: "icao",
        areaLabel: "Inglés ICAO",
        prompt: String(r.prompt),
        context: (r.context as string) ?? null,
        options: optsFromRecord(r.options as Record<string, string>),
        correctAnswer: String(r.correct_answer),
        explanation: (r.explanation as string) ?? null,
      })
    }
  } catch {
    /* sin banco ICAO → la sección queda vacía */
  }

  // --- INGLÉS ICAO: 1 de listening (audio real) ---
  const audioPool = SHORT_AUDIO_SETS.flatMap((s) => s.items).filter((a) => a.speaker)
  if (audioPool.length > 0) {
    const a = shuffle(audioPool)[0]
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
  const subjectsIncluded: { slug: string; label: string }[] = []
  const pcaItems: TestItem[] = []
  try {
    const { data: subs } = await supabase.rpc("vault_list_subjects", { p_module: "pca" })
    const list = ((subs ?? []) as { subject_slug: string; question_count: number }[]).filter(
      (s) => s.question_count >= 1,
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
          return { slug: s.subject_slug, token: row.token as string, questions: row.questions as { position: number; question: string; options: Record<string, string> }[] }
        } catch {
          return null
        }
      }),
    )
    for (const sess of sessions) {
      if (!sess || !sess.questions?.length) continue
      const meta = getSubjectMeta(sess.slug)
      subjectsIncluded.push({ slug: sess.slug, label: meta.name })
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

  // ICAO primero, luego materias (ordenadas por nombre)
  pcaItems.sort((a, b) => a.areaLabel.localeCompare(b.areaLabel))
  return {
    items: [...icaoItems, ...pcaItems],
    subjects: subjectsIncluded.sort((a, b) => a.label.localeCompare(b.label)),
    icaoCount: icaoItems.length,
  }
}

export interface GradedAnswer {
  uid: string
  area: string
  correct: boolean
  correctAnswer: string
  explanation: string | null
}

/** Valida una respuesta (vault → server; mcq/audio → cliente). */
export async function gradeItem(item: TestItem, letter: string): Promise<GradedAnswer> {
  if (item.kind === "vault" && item.token && item.position != null) {
    const { data } = await supabase.rpc("vault_submit_answer", {
      p_token: item.token,
      p_position: item.position,
      p_answer: letter,
    })
    const row = (Array.isArray(data) ? data[0] : data) as
      | { is_correct: boolean; correct_answer: string; explanation: string }
      | null
    return {
      uid: item.uid,
      area: item.area,
      correct: !!row?.is_correct,
      correctAnswer: row?.correct_answer ?? "",
      explanation: row?.explanation ?? null,
    }
  }
  const correct = letter === item.correctAnswer
  return {
    uid: item.uid,
    area: item.area,
    correct,
    correctAnswer: item.correctAnswer ?? "",
    explanation: item.explanation ?? null,
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
