import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { ReactNode, RefObject } from "react"
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
  History,
  Loader2,
  Lock,
  PenLine,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { LogoIsotype } from "@/components/Logo"
import { PageHeader } from "@/components/ui/page-header"
import { Rotulo } from "@/components/ui/rotulo"
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
  TOTALS,
  readLocalProgress,
  writeLocalProgress,
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

/**
 * El color de un puntaje en la retroalimentación.
 *
 * Dos, y no más: azul Aviatory si aprobó, vinotinto si no. Se fue el verde de
 * acierto y el ámbar de "casi". El color no está para poner la nota, está para
 * que la pantalla se lea como una evaluación profesional.
 */
function scoreColor(score: number): string {
  return score >= EXAM_PASS_SCORE ? "var(--av-blue-500)" : "var(--av-wine-500)"
}

/** Texto legible del vinotinto y del azul sobre superficie clara y oscura. */
function scoreTextColor(score: number): string {
  return score >= EXAM_PASS_SCORE ? accentText("var(--av-blue-500)") : "var(--av-wine-fg)"
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

        {/* Pregunta.
            Sin etiqueta de dificultad: el nivel sigue en el banco y en la base,
            pero no se le anuncia a nadie que la pregunta que tiene enfrente es
            "avanzada". Decisión de Camilo: eso condiciona la respuesta y no
            aporta nada mientras se está presentando. */}
        <div className="rounded-2xl surface p-5 sm:p-6">
          <div className="flex items-center justify-end">
            <span className="tabular text-[12px] text-muted-foreground">
              {EXAM_POINTS_PER_QUESTION} puntos
            </span>
          </div>

          <h2 className="mt-2 text-[20px] sm:text-[20px] font-semibold leading-snug tracking-[-0.01em]">
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
                  color: scoreTextColor(r.score),
                  background: mix(scoreColor(r.score), 12),
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
//
// La pantalla de retroalimentación. Especificación de Camilo del 9 de
// septiembre de 2026, y conviene tenerla escrita porque es fácil deshacerla
// sin querer:
//
//   · Se lee en este orden y en ninguno otro: pregunta, tu respuesta,
//     respuesta correcta, explicación.
//   · Dos colores y ya. Vinotinto = respuesta incorrecta. Azul Aviatory =
//     respuesta correcta. Nada de verde, nada de ámbar, nada de rojo de alerta,
//     y nunca dos colores dentro de la misma pregunta.
//   · Ni una palabra del nivel de dificultad. Sigue en la base, no en pantalla.
//   · Sin eslóganes. Ni "aquí se aprende de verdad" ni parientes.
//   · Nada de cuatro tarjetas por pregunta: un bloque, filetes finos y aire.
//   · Iconografía al mínimo. Los glifos ✓ y ✕ son texto, no iconos.
//
// Objetivo: que se sienta evaluación profesional de aviación, no quiz escolar.

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
  const colorTexto = scoreTextColor(score)

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
      <div className="mx-auto max-w-[820px] px-5 py-9 pb-24 sm:px-7 sm:py-11">
        {/* ── Encabezado ──────────────────────────────────────────────────── */}
        <header className="rev-aparece">
          <IconoAviatory />
          <h1
            className="mt-5 text-[26px] font-semibold uppercase leading-none sm:text-[30px]"
            style={{ letterSpacing: "0.015em" }}
          >
            Tus resultados
          </h1>
          <p className="mt-2.5 text-[14px] text-muted-foreground">Revisión de tu evaluación</p>
        </header>

        {/* ── Puntaje ─────────────────────────────────────────────────────── */}
        <section className="rev-aparece rev-aparece-2 mt-8">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div>
              <Rotulo>Puntaje</Rotulo>
              <div
                className="tabular mt-2 text-[56px] font-semibold leading-none sm:text-[64px]"
                style={{ color, letterSpacing: "-0.035em" }}
              >
                {score}
                <span className="align-top text-[26px] sm:text-[30px]">%</span>
              </div>
            </div>
            <dl className="flex flex-wrap items-end gap-x-9 gap-y-4">
              <Dato rotulo="Correctas" valor={`${correctCount} de ${total}`} />
              <Dato rotulo="Tiempo" valor={fmtTime(elapsed)} />
              <Dato rotulo="Mínimo" valor={`${EXAM_PASS_SCORE}%`} />
              <Dato
                rotulo="Resultado"
                valor={passed ? "Aprobado" : "No aprobado"}
                color={colorTexto}
              />
            </dl>
          </div>

          {/* La barra lleva la marca del mínimo: se ve de una si quedó por
              debajo del umbral y por cuánto, sin ponerle adjetivos. */}
          <div
            className="relative mt-6 h-[3px] w-full overflow-hidden rounded-full"
            style={{ background: mix("var(--border)", 60) }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={score}
            aria-label={`Puntaje ${score} sobre 100`}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${Math.max(score, 1)}%`, background: color }}
            />
          </div>
          <div className="relative mt-1 h-[11px]">
            <span
              className="absolute top-0 block h-[5px] w-px"
              style={{ left: `${EXAM_PASS_SCORE}%`, background: mix("var(--foreground)", 35) }}
              aria-hidden="true"
            />
            <span
              className="tabular absolute top-[6px] -translate-x-1/2 text-[10px] text-muted-foreground"
              style={{ left: `${EXAM_PASS_SCORE}%` }}
              aria-hidden="true"
            >
              {EXAM_PASS_SCORE}
            </span>
          </div>

          <SaveNote state={saveState} />
        </section>

        <Filete className="mt-10" />

        {/* ── Revisión pregunta por pregunta ──────────────────────────────── */}
        <section className="mt-8">
          <Rotulo>Revisión pregunta por pregunta</Rotulo>
          <p className="mt-2.5 max-w-[600px] text-[14px] leading-relaxed text-muted-foreground">
            Durante la evaluación no se mostró ninguna corrección. Acá está cada pregunta con tu
            respuesta, la correcta y su explicación. Las falladas quedan abiertas.
          </p>
          <div className="mt-6 space-y-3">
            {questions.map((q, i) => (
              <ReviewItem key={q.id} n={i + 1} question={q} pickedIndex={picks[i]} />
            ))}
          </div>
        </section>

        <Filete className="mt-10" />

        {/* ── Intentos anteriores ─────────────────────────────────────────── */}
        <div className="mt-8">
          <AttemptHistory
            userId={userId}
            sessionLoading={sessionLoading}
            refreshKey={saveState === "saved" ? 1 : 0}
            total={total}
          />
        </div>

        {/* ── Acciones ────────────────────────────────────────────────────── */}
        <div className="mt-10 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex h-12 items-center justify-center rounded-[10px] border-0 px-7 text-[15px] font-semibold text-white transition-colors"
            style={{ background: "var(--av-blue-500)" }}
          >
            Presentar otro intento
          </button>
          <Link
            to={HUB_PATH}
            className="inline-flex h-12 items-center justify-center rounded-[10px] border px-7 text-[15px] font-semibold transition-colors hover:bg-muted/50"
            style={{ borderColor: mix("var(--border)", 85) }}
          >
            Volver a la sección
          </Link>
        </div>

        {!passed && (
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            <NextStepLink
              to={LESSON_PATH}
              title="Repasa la lección"
              detail={`Las ${TOTALS.lessonScreens} secciones: formato OACI, casillas y códigos Q explicados paso a paso.`}
            />
            <NextStepLink
              to={PRACTICE_PATH}
              title="Vuelve a la práctica"
              detail="Ejercicios de interpretación y NOTAM colombianos reales para entrenar la lectura."
            />
          </div>
        )}

        {/* ── Nota de referencia ──────────────────────────────────────────── */}
        <NotaDeReferencia />
      </div>
    </AppLayout>
  )
}

// ─── Piezas de la retroalimentación ──────────────────────────────────────────

/** El isotipo de la marca, el mismo que usan el rail y la barra superior. */
function IconoAviatory() {
  return <LogoIsotype variant="color" className="h-11 w-11 rounded-full" aria-hidden="true" />
}

/** Filete: la separación de esta pantalla es una línea de un pixel y aire. */
function Filete({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px ${className}`}
      style={{ background: mix("var(--border)", 75) }}
      aria-hidden="true"
    />
  )
}

/** Un dato de la cabecera de puntaje: rótulo arriba, cifra abajo. */
function Dato({ rotulo, valor, color }: { rotulo: string; valor: string; color?: string }) {
  return (
    <div>
      <dt>
        <Rotulo>{rotulo}</Rotulo>
      </dt>
      <dd
        className="tabular mt-1.5 text-[17px] font-semibold"
        style={{ color: color ?? "var(--foreground)", letterSpacing: "-0.01em" }}
      >
        {valor}
      </dd>
    </div>
  )
}

/**
 * Una respuesta: filete de color, glifo en su pastilla y el texto con cuerpo.
 *
 * El color marca, no envuelve. El filete es de 3 px y el fondo apenas se
 * insinúa (5%): suficiente para que la respuesta pese como contenido y no se
 * lea como una línea suelta, lejos de pintar media pantalla de rojo.
 * Vinotinto para la del usuario cuando falló, azul para la correcta. Nunca los
 * dos en el mismo renglón.
 */
function Respuesta({ glifo, color, children }: { glifo: string; color: string; children: ReactNode }) {
  return (
    <div
      className="mt-3 flex items-start gap-3.5 rounded-r-[10px] border-l-[3px] py-3.5 pl-4 pr-4"
      style={{ borderColor: color, background: mix(color, 5) }}
    >
      <span
        aria-hidden="true"
        className="mt-[3px] flex h-[19px] w-[19px] flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold leading-none"
        style={{ background: mix(color, 15), color }}
      >
        {glifo}
      </span>
      <span className="text-[16px] font-medium leading-[1.6] text-foreground">{children}</span>
    </div>
  )
}

/**
 * La explicación.
 *
 * Es lo último que se lee y lo que más se lee, así que es lo que más aire
 * recibe: interlineado de 1.75, medida de 64 caracteres y padding ancho. El
 * fondo casi no se nota y el filete azul, finito, es lo único que le pone
 * identidad; el bloque sigue siendo neutro.
 */
function Explicacion({ texto, referencia }: { texto: string; referencia?: string }) {
  return (
    <div
      className="mt-3 rounded-r-[10px] border-l-2 bg-muted/40 py-5 pl-5 pr-5"
      style={{ borderColor: mix("var(--av-blue-500)", 38) }}
    >
      <p className="max-w-[64ch] text-[15px] leading-[1.75] text-foreground/90">{texto}</p>
      {referencia && (
        <p className="mono mt-3 text-[11px] text-muted-foreground">{referencia}</p>
      )}
    </div>
  )
}

/**
 * La nota del banco.
 *
 * Antes era una caja ámbar con triángulo de advertencia y pesaba como un aviso
 * legal. Es información de procedencia, no una alerta: gris, chica y al pie.
 */
function NotaDeReferencia() {
  return (
    <div className="mt-12 flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mono mt-[1px] flex h-[19px] w-[19px] flex-shrink-0 items-center justify-center rounded-[4px] border text-[10px] font-medium"
        style={{ borderColor: mix("var(--border)", 90), color: "var(--muted-foreground)" }}
      >
        i
      </span>
      <div className="min-w-0">
        <Rotulo>Nota de referencia</Rotulo>
        <p className="mt-1.5 max-w-[640px] text-[12px] leading-relaxed text-muted-foreground">
          {DISCLAIMERS.exam}
        </p>
      </div>
    </div>
  )
}

function SaveNote({ state }: { state: SaveState }) {
  if (state === "saving") {
    return (
      <div className="mt-6 inline-flex items-center gap-2 text-[12px] text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Guardando tu intento...
      </div>
    )
  }
  if (state === "saved") {
    return <div className="mt-6 text-[12px] text-muted-foreground">Guardado en tu historial.</div>
  }
  if (state === "error") {
    return (
      <div className="mt-6 max-w-[600px] text-[12px] leading-relaxed text-muted-foreground">
        No pudimos guardar este intento en tu historial. Tu resultado de arriba es válido, solo no
        quedó registrado en la nube.
      </div>
    )
  }
  if (state === "anon") {
    return (
      <div className="mt-6 text-[12px] text-muted-foreground">
        Inicia sesión para guardar tus intentos y seguir tu progreso.
      </div>
    )
  }
  return null
}

// ─── Una pregunta del repaso ─────────────────────────────────────────────────

interface ReviewItemProps {
  n: number
  question: ShuffledQuestion
  pickedIndex: number | undefined
}

/**
 * Una pregunta del repaso, como ficha cerrada.
 *
 * El orden de lectura es el de la especificación y no se negocia:
 * pregunta → tu respuesta → respuesta correcta → explicación.
 *
 * La jerarquía la hace el cuerpo del texto, no las líneas. El enunciado pesa
 * 20 px semibold, las respuestas 16 px medium y los rótulos se quedan en el
 * mono de 11 px: encabezan, no compiten. Hay UN solo filete, el que cierra el
 * enunciado; de ahí para abajo separa el aire, y cada respuesta se ancla en su
 * propio filete de color. Antes había cuatro líneas por pregunta y la ficha se
 * leía como un formulario.
 *
 * La que acertó se resume: no tiene sentido enfrentarle "tu respuesta" contra
 * "la correcta" cuando son la misma. Queda pregunta, respuesta y explicación.
 *
 * Cerrada, la ficha muestra el enunciado para poder barrer la lista. Abierta,
 * el enunciado pasa al bloque PREGUNTA y desaparece de la cabecera: si no, se
 * lee dos veces seguidas.
 */
function ReviewItem({ n, question, pickedIndex }: ReviewItemProps) {
  const ok = pickedIndex === question.correctIndex
  const [open, setOpen] = useState(!ok)
  const marca = ok ? "var(--av-blue-500)" : "var(--av-wine-500)"
  const textoMarca = ok ? accentText("var(--av-blue-500)") : "var(--av-wine-fg)"
  const elegida = pickedIndex !== undefined ? question.shuffledOptions[pickedIndex] : null

  return (
    <div
      className="overflow-hidden rounded-[14px] border bg-card"
      style={{ borderColor: mix("var(--border)", open ? 95 : 75) }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start gap-4 px-5 py-4 text-left sm:px-6"
      >
        <span
          className="tabular mt-[1px] flex-shrink-0 text-[13px] font-semibold"
          style={{ color: textoMarca }}
        >
          {String(n).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className="mono block text-[11px] font-medium uppercase tracking-[0.16em]"
            style={{ color: textoMarca }}
          >
            <span aria-hidden="true">{ok ? "✓" : "✕"}</span> {ok ? "Correcta" : "Incorrecta"}
          </span>
          {!open && (
            <span className="mt-2 block text-[15px] font-medium leading-snug text-foreground/85">
              {question.pregunta}
            </span>
          )}
        </span>
        <span className="mt-[2px] flex-shrink-0 text-muted-foreground">
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-7 sm:px-6">
          <div className="rev-aparece pt-1.5">
            <Rotulo>Pregunta</Rotulo>
            <p
              className="mt-2.5 max-w-[62ch] text-[19px] font-semibold leading-[1.45] text-foreground sm:text-[20px]"
              style={{ letterSpacing: "-0.012em" }}
            >
              {question.pregunta}
            </p>
          </div>

          <Filete className="mt-6" />

          {ok ? (
            <div className="rev-aparece rev-aparece-2 mt-6">
              <Rotulo>Respuesta</Rotulo>
              <Respuesta glifo="✓" color={marca}>
                {elegida ?? question.shuffledOptions[question.correctIndex]}
              </Respuesta>
            </div>
          ) : (
            <>
              <div className="rev-aparece rev-aparece-2 mt-6">
                <Rotulo>Tu respuesta</Rotulo>
                <Respuesta glifo="✕" color="var(--av-wine-500)">
                  {elegida ?? "Sin responder"}
                </Respuesta>
              </div>

              <div className="rev-aparece rev-aparece-3 mt-6">
                <Rotulo>Respuesta correcta</Rotulo>
                <Respuesta glifo="✓" color="var(--av-blue-500)">
                  {question.shuffledOptions[question.correctIndex]}
                </Respuesta>
              </div>
            </>
          )}

          <div className={`rev-aparece mt-6 ${ok ? "rev-aparece-3" : "rev-aparece-4"}`}>
            <Rotulo>Explicación</Rotulo>
            <Explicacion texto={question.explicacion} referencia={question.referencia} />
          </div>
        </div>
      )}
    </div>
  )
}

/** Salida a la lección o a la práctica: un filete azul y dos líneas de texto. */
function NextStepLink({ to, title, detail }: { to: string; title: string; detail: string }) {
  return (
    <Link
      to={to}
      className="rounded-[10px] border-l-2 bg-muted/25 py-4 pl-4 pr-4 transition-colors hover:bg-muted/50"
      style={{ borderColor: "var(--av-blue-500)" }}
    >
      <div className="text-[15px] font-semibold" style={{ letterSpacing: "-0.01em" }}>
        {title}
      </div>
      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{detail}</p>
    </Link>
  )
}
