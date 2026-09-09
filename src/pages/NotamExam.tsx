import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { RefObject } from "react"
import { Link } from "react-router-dom"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Gauge,
  History,
  ListChecks,
  Loader2,
  Lock,
  PenLine,
  RotateCcw,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"
import { supabase } from "@/integrations/supabase/client"
import { registrarActividadDeEstudio } from "@/lib/activity"
import { useSession } from "@/hooks/useSession"
import {
  accentText,
  buildExam,
  DISCLAIMERS,
  EXAM_PASS_SCORE,
  EXAM_PER_ATTEMPT,
  EXAM_POINTS_PER_QUESTION,
  LEVEL_META,
  TOTALS,
  readLocalProgress,
  writeLocalProgress,
  type NotamLevel,
  type ShuffledQuestion,
} from "@/lib/notam"
import { fetchNotamProgress } from "@/lib/notamProgress"

/**
 * Evaluación de la sección NOTAM.
 *
 * Reglas de Camilo, y son las que mandan sobre cualquier detalle de esta pantalla:
 *
 *   1. No hay pantalla de bienvenida. Se entra y se está presentando.
 *   2. Solo se abre con TODAS las secciones de lectura terminadas.
 *   3. Cada intento son 25 preguntas al azar de un banco de 100, con las
 *      opciones también barajadas.
 *   4. Durante el intento NO se dice nada: ni si acertó, ni la explicación, ni
 *      la referencia. Solo queda marcada la opción elegida.
 *   5. Al terminar las 25 se muestra el porcentaje y, debajo, todas las
 *      respuestas con su explicación.
 *
 * Dos fases en una sola página: examen y resultado.
 */

// ─── Rutas hermanas de la sección ────────────────────────────────────────────
const HUB_PATH = "/app/aerolinea/notam"
const LESSON_PATH = "/app/aerolinea/notam/aprende"
const PRACTICE_PATH = "/app/aerolinea/notam/practica"

const LEVEL_ORDER: NotamLevel[] = ["basico", "intermedio", "avanzado"]
const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"]

type Phase = "running" | "done"
type SaveState = "idle" | "saving" | "saved" | "error" | "anon"

/** Fila del historial de intentos. */
interface AttemptRow {
  id: string
  score: number
  correct_count: number
  total_questions: number
  passed: boolean
  duration_seconds: number | null
  created_at: string
}

/** Detalle que se guarda en answers (jsonb). */
interface AnswerRecord {
  id: number
  elegida: string
  correcta: string
  ok: boolean
}

// ─── Helpers de formato y color ──────────────────────────────────────────────

function fmtTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds))
  const mm = Math.floor(s / 60)
  const ss = s % 60
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`
}

function fmtDate(iso: string): string {
  const d = new Date(iso)
  const day = d.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })
  const time = d.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", hour12: false })
  return `${day} · ${time}`
}

function scoreColor(score: number): string {
  if (score >= EXAM_PASS_SCORE) return "var(--av-green-400)"
  if (score >= 60) return "var(--av-amber-400)"
  return "var(--av-red-400)"
}

function mix(token: string, pct: number): string {
  return `color-mix(in oklab, ${token} ${pct}%, transparent)`
}

// ─── Página ──────────────────────────────────────────────────────────────────

/** Descarta secciones que ya no existen: el módulo se recortó y queda progreso viejo. */
function soloExistentes(ns: number[]): number[] {
  return ns.filter((n) => n >= 1 && n <= TOTALS.lessonScreens)
}

export function NotamExam() {
  const { user, isLoading: sessionLoading } = useSession()
  const [phase, setPhase] = useState<Phase>("running")
  // El set se arma una sola vez por intento: buildExam saca 25 del banco de 100
  // y baraja también las opciones de cada una.
  const [questions, setQuestions] = useState<ShuffledQuestion[]>(() =>
    buildExam(EXAM_PER_ATTEMPT),
  )
  const [idx, setIdx] = useState(0)
  const [picks, setPicks] = useState<Record<number, number | undefined>>({})
  const [elapsed, setElapsed] = useState(0)

  // La llave de entrada. El respaldo local abre de inmediato; si no alcanza, se
  // le pregunta a la base antes de bloquear, porque la lectura pudo hacerse en
  // otro dispositivo y sería injusto cerrarle la puerta a quien ya la terminó.
  const [leidas, setLeidas] = useState<number[]>(() =>
    soloExistentes(readLocalProgress().lessonScreens),
  )
  const [hidratado, setHidratado] = useState(false)
  const completa = leidas.length >= TOTALS.lessonScreens
  // Sin sesión no hay nada que consultar: lo local es toda la verdad disponible.
  const esperando = !completa && (sessionLoading || (!!user?.id && !hidratado))
  const bloqueado = !completa && !esperando

  // El guard del guardado vive acá, no dentro de Result.
  //
  // Result se monta y se desmonta con la fase, así que un ref suyo se reinicia
  // en cada remonte (React lo hace a propósito en StrictMode) y el intento se
  // podía insertar dos veces. NotamExam no se desmonta entre fases, así que este
  // ref sí dura todo el intento. Se libera en start(), que es un intento nuevo.
  const savedAttemptRef = useRef(false)

  useEffect(() => {
    if (completa || sessionLoading) return
    const uid = user?.id
    if (!uid) return
    let cancelled = false
    void (async () => {
      const fetched = await fetchNotamProgress(uid)
      if (cancelled) return
      if (fetched) {
        const merged = soloExistentes(
          Array.from(new Set([...readLocalProgress().lessonScreens, ...fetched.lessonScreens])),
        ).sort((a, b) => a - b)
        writeLocalProgress({ lessonScreens: merged })
        setLeidas(merged)
      }
      setHidratado(true)
    })()
    return () => {
      cancelled = true
    }
  }, [user?.id, sessionLoading, completa])

  useEffect(() => {
    if (!completa || phase !== "running") return
    const t = window.setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => window.clearInterval(t)
  }, [phase, completa])

  const total = questions.length
  const correctCount = useMemo(
    () => questions.reduce((acc, q, i) => (picks[i] === q.correctIndex ? acc + 1 : acc), 0),
    [questions, picks],
  )
  const score = Math.round(correctCount * EXAM_POINTS_PER_QUESTION)
  const passed = score >= EXAM_PASS_SCORE

  const start = useCallback(() => {
    savedAttemptRef.current = false
    setQuestions(buildExam(EXAM_PER_ATTEMPT))
    setPicks({})
    setIdx(0)
    setElapsed(0)
    setPhase("running")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  function choose(optionIndex: number) {
    // Se puede cambiar de opción mientras no se avance. Sin retroalimentación,
    // repensar la respuesta es parte de contestar, no una manera de hacer trampa.
    setPicks((p) => ({ ...p, [idx]: optionIndex }))
  }

  function next() {
    if (picks[idx] === undefined) return
    if (idx >= total - 1) {
      setPhase("done")
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    setIdx((i) => i + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (esperando) return <Cargando />

  if (bloqueado) return <Bloqueado leidas={leidas} />

  if (phase === "done") {
    return (
      <Result
        questions={questions}
        picks={picks}
        correctCount={correctCount}
        score={score}
        passed={passed}
        elapsed={elapsed}
        userId={user?.id ?? null}
        sessionLoading={sessionLoading}
        savedRef={savedAttemptRef}
        onRetry={start}
      />
    )
  }

  const q = questions[idx]
  const picked = picks[idx]
  const answered = picked !== undefined
  const level = LEVEL_META[q.nivel]

  return (
    <AppLayout>
      <div className="px-5 sm:px-7 py-9 sm:py-11 pb-20 max-w-[900px] mx-auto">
        {/* Encabezado de progreso */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
            <div className="text-[13px] font-semibold" style={{ color: accentText("var(--av-blue-500)") }}>
              Pregunta {idx + 1} de {total}
            </div>
            <div className="flex items-center gap-3">
              <span className="tabular text-[12px] text-muted-foreground">
                {Object.keys(picks).length}/{total} respondidas
              </span>
              <span className="inline-flex items-center gap-1.5 tabular text-[13px] text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {fmtTime(elapsed)}
              </span>
            </div>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: mix("var(--border)", 55) }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={idx + 1}
            aria-label={`Pregunta ${idx + 1} de ${total}`}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${((idx + 1) / total) * 100}%`, background: "var(--av-blue-500)" }}
            />
          </div>
        </div>

        {/* Pregunta */}
        <div className="rounded-2xl surface p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full"
              style={{
                color: accentText(level.color),
                background: mix(level.color, 12),
                border: `1px solid ${mix(level.color, 30)}`,
              }}
            >
              <Gauge className="h-3 w-3" /> {level.label}
            </span>
            <span className="tabular text-[12px] text-muted-foreground">
              {EXAM_POINTS_PER_QUESTION} puntos
            </span>
          </div>

          <h2 className="mt-3.5 text-[20px] sm:text-[20px] font-semibold leading-snug tracking-[-0.01em]">
            {q.pregunta}
          </h2>

          {/* Sin corrección en pantalla: la opción elegida solo se ve elegida. */}
          <div className="mt-5 grid gap-2.5">
            {q.shuffledOptions.map((opt, oi) => (
              <OptionButton
                key={`${q.id}-${oi}`}
                letter={OPTION_LETTERS[oi] ?? String(oi + 1)}
                text={opt}
                isPicked={picked === oi}
                onClick={() => choose(oi)}
              />
            ))}
          </div>
        </div>

        {/* Navegación */}
        <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
          <div className="text-[13px] text-muted-foreground">
            {answered
              ? "Puedes cambiar tu respuesta antes de avanzar."
              : "Elige una respuesta para continuar."}
          </div>
          <button
            type="button"
            onClick={next}
            disabled={!answered}
            className="inline-flex items-center gap-2 h-12 px-6 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            style={{ background: "var(--av-blue-500)" }}
          >
            {idx >= total - 1 ? "Terminar y ver mi resultado" : "Siguiente"}{" "}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-4 text-[12px] text-muted-foreground leading-relaxed">
          Las respuestas correctas y las explicaciones aparecen al final, cuando termines las{" "}
          {total} preguntas.
        </p>
      </div>
    </AppLayout>
  )
}

// ─── Opción de respuesta ─────────────────────────────────────────────────────

interface OptionButtonProps {
  letter: string
  text: string
  isPicked: boolean
  onClick: () => void
}

/**
 * Botón de opción SIN corrección.
 *
 * Antes se pintaba de verde o rojo apenas se contestaba. Ya no: durante el
 * intento la única señal es azul de "esta elegí". Si alguna vez vuelve a
 * aparecer un color de acierto acá, la regla 4 de arriba está rota.
 */
function OptionButton({ letter, text, isPicked, onClick }: OptionButtonProps) {
  const borderColor = isPicked ? mix("var(--av-blue-500)", 55) : mix("var(--border)", 70)

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isPicked}
      aria-label={`Opción ${letter}: ${text}`}
      className="w-full text-left rounded-xl border p-3.5 sm:p-4 flex items-start gap-3 min-h-[56px] transition-colors hover:bg-muted/40"
      style={{ borderColor, background: isPicked ? mix("var(--av-blue-500)", 8) : "transparent" }}
    >
      <span
        className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[13px] font-semibold"
        style={{
          background: isPicked ? mix("var(--av-blue-500)", 18) : mix("var(--border)", 45),
          color: isPicked ? accentText("var(--av-blue-500)") : "var(--muted-foreground)",
        }}
      >
        {letter}
      </span>
      <span className="flex-1 text-[15px] text-foreground/90 leading-relaxed">{text}</span>
      {isPicked && (
        <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--av-blue-500)" }}>
          <CheckCircle2 className="h-4.5 w-4.5" />
        </span>
      )}
    </button>
  )
}

// ─── Puerta cerrada ──────────────────────────────────────────────────────────

/** Mientras se confirma con la base si la lectura ya está terminada. */
function Cargando() {
  return (
    <AppLayout>
      <div
        className="px-5 sm:px-7 py-20 max-w-[900px] mx-auto flex flex-col items-center gap-3 text-muted-foreground"
        role="status"
        aria-label="Abriendo la evaluación"
      >
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-[13px]">Abriendo la evaluación...</span>
      </div>
    </AppLayout>
  )
}

/**
 * La evaluación cerrada, con la cuenta de lo que falta.
 *
 * No es un castigo: las preguntas salen de las secciones de lectura, y presentarla
 * sin haberlas leído solo produce un puntaje bajo que no le enseña nada a nadie.
 */
function Bloqueado({ leidas }: { leidas: number[] }) {
  const hechas = leidas.length
  const faltan = TOTALS.lessonScreens - hechas
  const pct = Math.round((hechas / TOTALS.lessonScreens) * 100)
  // La primera sección sin leer, para que el botón caiga justo ahí.
  let siguiente = 1
  while (siguiente <= TOTALS.lessonScreens && leidas.includes(siguiente)) siguiente++
  if (siguiente > TOTALS.lessonScreens) siguiente = TOTALS.lessonScreens

  return (
    <AppLayout>
      <div className="px-5 sm:px-7 py-9 sm:py-11 pb-20 max-w-[760px] mx-auto">
        <Link
          to={HUB_PATH}
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a la sección NOTAM
        </Link>

        <PageHeader
          eyebrow={
            <>
              <Award className="h-3.5 w-3.5" /> NOTAM · Evaluación
            </>
          }
          title="La evaluación se abre cuando termines la lectura"
          subtitle={`Son ${EXAM_PER_ATTEMPT} preguntas al azar sobre las ${TOTALS.lessonScreens} secciones del módulo. Para presentarla necesitas haberlas leído todas.`}
        />

        <div
          className="rounded-2xl border p-5 sm:p-6"
          style={{
            borderColor: mix("var(--av-amber-400)", 28),
            background: mix("var(--av-amber-400)", 5),
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: mix("var(--av-amber-400)", 14),
                border: `1px solid ${mix("var(--av-amber-400)", 30)}`,
                color: "var(--av-amber-400)",
              }}
            >
              <Lock className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-semibold tracking-[-0.01em]">
                {faltan === 1
                  ? "Te falta una sección por leer"
                  : `Te faltan ${faltan} secciones por leer`}
              </div>
              <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                Llevas {hechas} de {TOTALS.lessonScreens}. Termínalas y la evaluación se abre sola:
                no hay que pedir nada ni esperar nada.
              </p>
            </div>
            <div
              className="tabular flex-shrink-0 text-[20px] font-semibold tracking-[-0.02em]"
              style={{ color: "var(--av-amber-400)" }}
            >
              {pct}%
            </div>
          </div>

          <div
            className="mt-4 h-1.5 rounded-full overflow-hidden"
            style={{ background: mix("var(--border)", 55) }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={TOTALS.lessonScreens}
            aria-valuenow={hechas}
            aria-label={`${hechas} de ${TOTALS.lessonScreens} secciones leídas`}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, background: "var(--av-amber-400)" }}
            />
          </div>
        </div>

        <Link
          to={`${LESSON_PATH}?l=${siguiente}`}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
          style={{ background: "var(--av-blue-500)" }}
        >
          <BookOpen className="h-4.5 w-4.5" />
          {hechas === 0 ? "Empezar la lectura" : `Continuar en la sección ${siguiente}`}
        </Link>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px]">
          <Link
            to={PRACTICE_PATH}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <PenLine className="h-3.5 w-3.5" /> Mientras tanto, ve a la práctica
          </Link>
        </div>

        <div
          className="mt-8 rounded-2xl border p-4 flex items-start gap-3"
          style={{
            borderColor: mix("var(--av-amber-400)", 25),
            background: mix("var(--av-amber-400)", 6),
          }}
        >
          <AlertTriangle
            className="flex-shrink-0 mt-0.5 h-4.5 w-4.5"
            style={{ color: "var(--av-amber-400)" }}
          />
          <div className="text-[13px] text-foreground/85 leading-relaxed">{DISCLAIMERS.exam}</div>
        </div>
      </div>
    </AppLayout>
  )
}

// ─── Historial de intentos ───────────────────────────────────────────────────

interface AttemptHistoryProps {
  userId: string | null
  sessionLoading: boolean
  refreshKey: number
  total: number
}

function AttemptHistory({ userId, sessionLoading, refreshKey, total }: AttemptHistoryProps) {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<AttemptRow[]>([])
  const [attemptCount, setAttemptCount] = useState(0)
  const [remoteBest, setRemoteBest] = useState<number | null>(null)
  const localBest = useMemo(() => readLocalProgress().bestExamScore, [refreshKey])

  useEffect(() => {
    if (sessionLoading) return
    let cancelled = false
    void (async () => {
      if (!userId) {
        if (!cancelled) {
          setRows([])
          setAttemptCount(0)
          setRemoteBest(null)
          setLoading(false)
        }
        return
      }
      setLoading(true)
      // Dos consultas: la página reciente para la lista y el máximo histórico para el
      // puntaje. Con más de 10 intentos el mejor puntaje puede quedar fuera de la
      // página, y el hub muestra el máximo real: la métrica tiene que coincidir.
      const [listRes, bestRes] = await Promise.all([
        supabase
          .from("user_notam_exam_attempts")
          .select("id,score,correct_count,total_questions,passed,duration_seconds,created_at", {
            count: "exact",
          })
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("user_notam_exam_attempts")
          .select("score")
          .eq("user_id", userId)
          .order("score", { ascending: false })
          .limit(1),
      ])
      if (cancelled) return
      if (listRes.error) {
        console.error("notam exam history", listRes.error)
        setRows([])
        setAttemptCount(0)
      } else {
        const list = (listRes.data ?? []) as AttemptRow[]
        setRows(list)
        setAttemptCount(listRes.count ?? list.length)
      }
      if (bestRes.error) {
        console.error("notam exam best score", bestRes.error)
        setRemoteBest(null)
      } else {
        const top = (bestRes.data ?? []) as { score: number }[]
        setRemoteBest(top.length ? top[0].score : null)
      }
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [userId, sessionLoading, refreshKey])

  // El mejor puntaje es el máximo entre la nube y el respaldo local, nunca uno de los dos.
  const best = Math.max(remoteBest ?? 0, localBest ?? 0) || null
  const last = rows.length ? rows[0].score : null
  const busy = loading || sessionLoading

  return (
    <>
      <SectionTitle
        icon={History}
        eyebrow="Tu historial"
        title="Tus intentos anteriores"
        hint="Mostramos tus 10 intentos más recientes."
      />

      <div className="grid grid-cols-3 gap-2.5">
        <Stat
          label="Mejor puntaje"
          value={busy ? "" : best != null ? String(best) : "0"}
          color={best != null ? scoreColor(best) : "var(--muted-foreground)"}
        />
        <Stat
          label="Último puntaje"
          value={busy ? "" : last != null ? String(last) : "0"}
          color={last != null ? scoreColor(last) : "var(--muted-foreground)"}
        />
        <Stat
          label="Intentos"
          value={busy ? "" : String(attemptCount)}
          color="var(--av-blue-500)"
        />
      </div>

      {busy ? (
        // Tres filas del mismo alto que las reales: el bloque de abajo no salta al cargar.
        <div className="mt-3 space-y-1.5" role="status" aria-label="Cargando tu historial">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[58px] rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : !userId ? (
        <div className="mt-3 rounded-2xl border border-border bg-muted/20 p-4 text-[13px] text-muted-foreground leading-relaxed">
          Inicia sesión para que tus intentos queden guardados y puedas ver cómo mejoras. Igual
          puedes presentar la evaluación ahora mismo.
        </div>
      ) : rows.length === 0 ? (
        <div className="mt-3 rounded-2xl border border-border bg-muted/20 p-5 text-center">
          <History className="mx-auto h-5 w-5 text-muted-foreground" />
          <div className="mt-2 text-[15px] font-semibold tracking-[-0.01em]">
            Todavía no has presentado la evaluación
          </div>
          <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed max-w-[520px] mx-auto">
            Presenta el primer intento y aquí vas a ver tu puntaje, si aprobaste y cuánto tardaste.
            Puedes repetirla las veces que quieras.
          </p>
        </div>
      ) : (
        <div className="mt-3 space-y-1.5">
          {rows.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border bg-card px-3.5 py-2.5 flex items-center gap-3"
              style={{ borderColor: mix("var(--border)", 65) }}
            >
              <div
                className="tabular w-11 flex-shrink-0 text-[17px] font-semibold tracking-[-0.02em]"
                style={{ color: scoreColor(r.score) }}
              >
                {r.score}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold">{fmtDate(r.created_at)}</div>
                <div className="tabular text-[12px] text-muted-foreground">
                  {r.correct_count} de {r.total_questions || total} correctas
                  {r.duration_seconds != null ? ` · ${fmtTime(r.duration_seconds)}` : ""}
                </div>
              </div>
              <span
                className="flex-shrink-0 text-[12px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  color: accentText(r.passed ? "var(--av-green-400)" : "var(--av-red-400)"),
                  background: mix(r.passed ? "var(--av-green-400)" : "var(--av-red-400)", 12),
                }}
              >
                {r.passed ? "Aprobado" : "No aprobado"}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border p-3 text-center" style={{ borderColor: mix("var(--border)", 60) }}>
      <div className="tabular text-[20px] font-semibold tracking-[-0.02em]" style={{ color }}>
        {value === "" ? (
          <span className="inline-block h-5 w-10 rounded bg-muted animate-pulse" aria-hidden="true" />
        ) : (
          value
        )}
      </div>
      <div className="text-[12px] sm:text-[12px] text-muted-foreground">
        {label}
      </div>
    </div>
  )
}

// ─── RESULTADO ───────────────────────────────────────────────────────────────

interface ResultProps {
  questions: ShuffledQuestion[]
  picks: Record<number, number | undefined>
  correctCount: number
  score: number
  passed: boolean
  elapsed: number
  userId: string | null
  sessionLoading: boolean
  /** Guard del guardado, sostenido por NotamExam para sobrevivir a los remontes. */
  savedRef: RefObject<boolean>
  onRetry: () => void
}

function Result({
  questions,
  picks,
  correctCount,
  score,
  passed,
  elapsed,
  userId,
  sessionLoading,
  savedRef,
  onRetry,
}: ResultProps) {
  const [saveState, setSaveState] = useState<SaveState>("idle")
  const total = questions.length
  const color = scoreColor(score)

  const answers: AnswerRecord[] = useMemo(
    () =>
      questions.map((q, i) => {
        const pickedIndex = picks[i]
        return {
          id: q.id,
          elegida: pickedIndex !== undefined ? q.shuffledOptions[pickedIndex] : "",
          correcta: q.shuffledOptions[q.correctIndex],
          ok: pickedIndex === q.correctIndex,
        }
      }),
    [questions, picks],
  )

  const byLevel = useMemo(() => {
    return LEVEL_ORDER.map((lvl) => {
      const items = questions.filter((q) => q.nivel === lvl)
      const ok = items.reduce((acc, q) => {
        const i = questions.indexOf(q)
        return picks[i] === q.correctIndex ? acc + 1 : acc
      }, 0)
      return { level: lvl, ok, total: items.length }
    }).filter((r) => r.total > 0)
  }, [questions, picks])

  // El progreso local es el respaldo: se guarda siempre, aunque la red falle.
  useEffect(() => {
    const prev = readLocalProgress().bestExamScore
    if (prev == null || score > prev) writeLocalProgress({ bestExamScore: score })
  }, [score])

  useEffect(() => {
    // Esperamos a que la sesión resuelva para no marcar como anónimo a alguien logueado.
    if (sessionLoading || savedRef.current) return
    savedRef.current = true
    void (async () => {
      if (!userId) {
        setSaveState("anon")
        return
      }
      setSaveState("saving")
      const { error } = await supabase.from("user_notam_exam_attempts").insert({
        user_id: userId,
        score,
        correct_count: correctCount,
        total_questions: total,
        passed,
        answers,
        duration_seconds: elapsed,
      })
      if (error) {
        console.error("notam exam save", error)
        setSaveState("error")
        return
      }
      setSaveState("saved")
      // La evaluación cuenta como día estudiado, igual que un quiz del banco.
      void registrarActividadDeEstudio({ questions: total, correct: correctCount, minutes: Math.round(elapsed / 60) })
    })()
  }, [sessionLoading, userId, score, correctCount, total, passed, answers, elapsed, savedRef])

  return (
    <AppLayout>
      <div className="px-5 sm:px-7 py-9 sm:py-11 pb-20 max-w-[900px] mx-auto">
        {/* Puntaje */}
        <div
          className="rounded-2xl border p-6 sm:p-8 text-center anim-fade-up"
          style={{ borderColor: mix(color, 38), background: mix(color, 7) }}
        >
          <div className="text-[12px] text-muted-foreground">
            Tu resultado
          </div>
          <div
            className="mt-1 tabular text-[44px] sm:text-[52px] font-semibold tracking-[-0.04em] leading-none"
            style={{ color }}
          >
            {score}
            <span className="text-[24px] sm:text-[28px] align-top">%</span>
          </div>
          <div className="mt-1 tabular text-[13px] text-muted-foreground">
            {correctCount} de {total} correctas · apruebas con {EXAM_PASS_SCORE}%
          </div>

          <div className="mt-4 text-[20px] sm:text-[20px] font-semibold tracking-[-0.02em]" style={{ color }}>
            {passed ? "Aprobado" : `No aprobado, necesitas ${EXAM_PASS_SCORE}`}
          </div>
          <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed max-w-[560px] mx-auto">
            {passed
              ? "Dominas la lectura de NOTAM: sigue repasando los códigos que fallaste para no perder el filo."
              : "Te falta poco. Repasa la lección y vuelve a la práctica antes de intentarlo de nuevo."}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2.5 max-w-[460px] mx-auto">
            <Stat label="Correctas" value={`${correctCount}/${total}`} color={color} />
            <Stat label="Tiempo" value={fmtTime(elapsed)} color="var(--av-blue-500)" />
            <Stat
              label="Mínimo"
              value={String(EXAM_PASS_SCORE)}
              color="var(--muted-foreground)"
            />
          </div>

          <SaveNote state={saveState} />
        </div>

        {/* Desglose por nivel */}
        <div className="mt-10">
          <SectionTitle
            icon={Gauge}
            eyebrow="Dónde estás fuerte y dónde no"
            title="Desglose por nivel"
            hint="Si un nivel te queda bajo, ese es el material que te toca repasar primero."
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {byLevel.map((r) => {
              const meta = LEVEL_META[r.level]
              const pct = r.total > 0 ? (r.ok / r.total) * 100 : 0
              return (
                <div
                  key={r.level}
                  className="rounded-2xl border bg-card p-5"
                  style={{ borderColor: mix(meta.color, 26) }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-[13px] font-semibold tracking-[-0.01em]"
                      style={{ color: accentText(meta.color) }}
                    >
                      {meta.label}
                    </span>
                    <span className="tabular text-[15px] font-semibold tracking-[-0.02em]">
                      {r.ok}/{r.total}
                    </span>
                  </div>
                  <div
                    className="mt-3 h-1.5 rounded-full overflow-hidden"
                    style={{ background: mix("var(--border)", 55) }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: meta.color }}
                    />
                  </div>
                  <div className="mt-2 tabular text-[12px] text-muted-foreground">
                    {Math.round(pct)}% de acierto
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Repaso */}
        <div className="mt-10">
          <SectionTitle
            icon={ListChecks}
            eyebrow="Aquí se aprende de verdad"
            title={`Tus ${total} respuestas`}
            hint="Durante el examen no te dijimos nada. Acá está todo: qué contestaste, cuál era la correcta y por qué. Las falladas quedan abiertas."
          />
          <div className="space-y-2">
            {questions.map((q, i) => (
              <ReviewItem
                key={q.id}
                n={i + 1}
                question={q}
                pickedIndex={picks[i]}
              />
            ))}
          </div>
        </div>

        {/* Historial */}
        <div className="mt-10">
          <AttemptHistory
            userId={userId}
            sessionLoading={sessionLoading}
            refreshKey={saveState === "saved" ? 1 : 0}
            total={total}
          />
        </div>

        {/* Aviso obligatorio */}
        <div
          className="mt-8 rounded-2xl border p-4 flex items-start gap-3"
          style={{
            borderColor: mix("var(--av-amber-400)", 25),
            background: mix("var(--av-amber-400)", 6),
          }}
        >
          <AlertTriangle
            className="flex-shrink-0 mt-0.5 h-4.5 w-4.5"
            style={{ color: "var(--av-amber-400)" }}
          />
          <div className="text-[13px] text-foreground/85 leading-relaxed">{DISCLAIMERS.exam}</div>
        </div>

        {/* Acciones */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--av-blue-500)" }}
          >
            <RotateCcw className="h-4 w-4" /> Volver a intentar
          </button>
          <Link
            to={HUB_PATH}
            className="inline-flex items-center justify-center gap-1.5 h-12 px-6 rounded-xl text-[15px] font-semibold surface hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Volver a la sección
          </Link>
        </div>

        {!passed && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <NextStepLink
              to={LESSON_PATH}
              icon={BookOpen}
              color="var(--av-blue-500)"
              title="Repasa la lección"
              detail={`Las ${TOTALS.lessonScreens} secciones: formato OACI, casillas y códigos Q explicados paso a paso.`}
            />
            <NextStepLink
              to={PRACTICE_PATH}
              icon={PenLine}
              color="var(--av-violet-400)"
              title="Vuelve a la práctica"
              detail="Ejercicios de interpretación y NOTAM colombianos reales para entrenar la lectura."
            />
          </div>
        )}
      </div>
    </AppLayout>
  )
}

function SaveNote({ state }: { state: SaveState }) {
  if (state === "saving") {
    return (
      <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Guardando tu intento...
      </div>
    )
  }
  if (state === "saved") {
    return (
      <div
        className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold"
        style={{ color: accentText("var(--av-green-400)") }}
      >
        <CheckCircle2 className="h-4 w-4" /> Guardado en tu historial
      </div>
    )
  }
  if (state === "error") {
    return (
      <div className="mt-5 text-[13px] text-muted-foreground">
        No pudimos guardar este intento en tu historial. Tu resultado de arriba es válido, solo no
        quedó registrado en la nube.
      </div>
    )
  }
  if (state === "anon") {
    return (
      <div className="mt-5 text-[13px] text-muted-foreground">
        Inicia sesión para guardar tus intentos y seguir tu progreso.
      </div>
    )
  }
  return null
}

interface ReviewItemProps {
  n: number
  question: ShuffledQuestion
  pickedIndex: number | undefined
}

function ReviewItem({ n, question, pickedIndex }: ReviewItemProps) {
  const ok = pickedIndex === question.correctIndex
  const [open, setOpen] = useState(!ok)
  const tone = ok ? "var(--av-green-400)" : "var(--av-red-400)"
  const meta = LEVEL_META[question.nivel]

  return (
    <div
      className="rounded-2xl border bg-card overflow-hidden"
      style={{ borderColor: mix(tone, open ? 34 : 22) }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start gap-3 p-3.5 text-left"
      >
        <span
          className="tabular flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-semibold"
          style={{ background: mix(tone, 14), color: tone }}
        >
          {n}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[13px] font-semibold leading-snug">{question.pregunta}</span>
          <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[12px] font-semibold" style={{ color: accentText(tone) }}>
              {ok ? "Correcta" : "Fallada"}
            </span>
            <span className="text-border">·</span>
            <span className="text-[12px] font-semibold" style={{ color: accentText(meta.color) }}>
              {meta.label}
            </span>
          </span>
        </span>
        <span className="flex-shrink-0 mt-0.5 text-muted-foreground">
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>

      {open && (
        <div className="px-3.5 pb-3.5 space-y-2.5">
          <div
            className="rounded-xl border p-3"
            style={{ borderColor: mix(tone, 26), background: mix(tone, 6) }}
          >
            <div
              className="text-[12px] font-semibold"
              style={{ color: accentText(tone) }}
            >
              Tu respuesta
            </div>
            <p className="mt-1 text-[13px] text-foreground/90 leading-relaxed">
              {pickedIndex !== undefined ? question.shuffledOptions[pickedIndex] : "Sin responder"}
            </p>
          </div>

          {!ok && (
            <div
              className="rounded-xl border p-3"
              style={{
                borderColor: mix("var(--av-green-400)", 26),
                background: mix("var(--av-green-400)", 6),
              }}
            >
              <div
                className="text-[12px] font-semibold"
                style={{ color: accentText("var(--av-green-400)") }}
              >
                Respuesta correcta
              </div>
              <p className="mt-1 text-[13px] text-foreground/90 leading-relaxed">
                {question.shuffledOptions[question.correctIndex]}
              </p>
            </div>
          )}

          <div
            className="rounded-xl border p-3"
            style={{
              borderColor: mix("var(--av-blue-500)", 22),
              background: mix("var(--av-blue-500)", 6),
            }}
          >
            <div
              className="text-[12px] font-semibold"
              style={{ color: accentText("var(--av-blue-500)") }}
            >
              Por qué
            </div>
            <p className="mt-1 text-[13px] text-foreground/90 leading-relaxed">
              {question.explicacion}
            </p>
            {question.referencia && (
              <div className="mt-2 text-[12px] text-muted-foreground">
                Referencia: <span className="mono">{question.referencia}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

interface NextStepLinkProps {
  to: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  title: string
  detail: string
}

function NextStepLink({ to, icon: Icon, color, title, detail }: NextStepLinkProps) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border bg-card p-5 flex items-start gap-3.5 transition-all hover:-translate-y-0.5"
      style={{ borderColor: mix(color, 28) }}
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: mix(color, 14), border: `1px solid ${mix(color, 30)}`, color }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-semibold tracking-[-0.01em]">{title}</div>
        <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{detail}</p>
      </div>
      <ArrowRight className="hidden sm:block flex-shrink-0 mt-1 h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
    </Link>
  )
}
