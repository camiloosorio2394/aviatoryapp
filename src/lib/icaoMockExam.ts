/**
 * Simulacro TEA — arma un examen completo aleatorio reutilizando el contenido
 * de los módulos de práctica (interview, comprehension, pictures).
 *
 * Estructura del examen real:
 *   Part 1 · Interview               (~7-8 min)
 *   Part 2 · Interactive Comprehension (~8-12 min) → 2A short, 2B long, 2C interactive
 *   Part 3 · Picture Description & Discussion (~10 min)
 */
import { TEA_PART1_SETS } from "./icaoInterview"
import {
  SHORT_AUDIO_SETS,
  LONG_AUDIOS,
  INTERACTIVE_ITEMS,
  type ShortAudio,
  type LongAudio,
  type InteractiveItem,
} from "./icaoComprehension"
import { PICTURE_PAIRS, type PicturePair } from "./icaoPictures"

export type ExamStep =
  | { part: 1; kind: "interview"; question: string; suggestedAnswer: string; highRegisterWords?: string[] }
  | { part: 2; kind: "short"; audio: ShortAudio }
  | { part: 2; kind: "long"; audio: LongAudio }
  | { part: 2; kind: "interactive"; item: InteractiveItem }
  | { part: 3; kind: "picture"; pair: PicturePair }

export const PARTS: Record<1 | 2 | 3, { label: string; allotSec: number }> = {
  1: { label: "Part 1 · Interview", allotSec: 480 },
  2: { label: "Part 2 · Interactive Comprehension", allotSec: 720 },
  3: { label: "Part 3 · Picture Description & Discussion", allotSec: 600 },
}

export const DESCRIPTORS: { key: string; name: string; detail: string }[] = [
  { key: "pronunciation", name: "Pronunciation", detail: "Clarity and ease of being understood." },
  { key: "structure", name: "Structure", detail: "Grammar and sentence construction." },
  { key: "vocabulary", name: "Vocabulary", detail: "Range and accuracy of vocabulary." },
  { key: "fluency", name: "Fluency", detail: "Continuous, natural speech with few pauses." },
  { key: "comprehension", name: "Comprehension", detail: "Understanding messages, even unexpected ones." },
  { key: "interactions", name: "Interactions", detail: "Keeping the conversation going, asking for clarification." },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const pick = <T>(arr: T[], n: number): T[] => shuffle(arr).slice(0, n)
const pickOne = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

/** Cantidad de ítems por sección del simulacro (≈ examen real). */
export const EXAM_SHAPE = { interview: 8, short: 6, long: 4, interactive: 3, picture: 1 }

export function buildExam(): ExamStep[] {
  // Part 1 — un set completo de interview (8 preguntas)
  const set = pickOne(TEA_PART1_SETS)
  const p1: ExamStep[] = set.questions.map((q) => ({
    part: 1, kind: "interview", question: q.question,
    suggestedAnswer: q.suggestedAnswer, highRegisterWords: q.highRegisterWords,
  }))

  // Part 2A — short audios (de los 67)
  const shortPool = SHORT_AUDIO_SETS.flatMap((s) => s.items)
  const p2a: ExamStep[] = pick(shortPool, EXAM_SHAPE.short).map((a) => ({ part: 2, kind: "short", audio: a }))

  // Part 2B — long audios (solo los cortos 15-20s, no las narrativas largas 14-16)
  const longPool = LONG_AUDIOS.filter((l) => l.id <= 13)
  const p2b: ExamStep[] = pick(longPool, EXAM_SHAPE.long).map((a) => ({ part: 2, kind: "long", audio: a }))

  // Part 2C — interactive
  const p2c: ExamStep[] = pick(INTERACTIVE_ITEMS, EXAM_SHAPE.interactive).map((it) => ({ part: 2, kind: "interactive", item: it }))

  // Part 3 — una pareja de imágenes
  const p3: ExamStep[] = [{ part: 3, kind: "picture", pair: pickOne(PICTURE_PAIRS) }]

  return [...p1, ...p2a, ...p2b, ...p2c, ...p3]
}

export function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, "0")}`
}
