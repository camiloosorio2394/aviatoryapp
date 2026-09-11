import { useCallback, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
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
import { LogoIsotype } from "@/components/Logo"
import { PageHeader } from "@/components/ui/page-header"
import { Rotulo } from "@/components/ui/rotulo"
import { SectionTitle } from "@/components/ui/section-title"
import { useEvaluacion } from "@/hooks/useEvaluacion"
import { useSession } from "@/hooks/useSession"
import { subirArriba } from "@/lib/motion"
import { accentText } from "@/lib/notam"
import type {
  ClaveEvaluacion,
  PreguntaEvaluacion,
  ResultadoEvaluacion,
  RevisionPregunta,
  SesionEvaluacion,
} from "@/services/evaluaciones"

/**
 * Evaluación de un módulo.
 *
 * Nació como la evaluación de NOTAM y se generalizó para Mercancías peligrosas
 * sin cambiar nada de lo que Camilo aprobó. Las reglas, que mandan sobre
 * cualquier detalle de esta pantalla:
 *
 *   1. No hay pantalla de bienvenida. Se entra y se está presentando.
 *   2. Solo se abre con TODAS las lecciones terminadas.
 *   3. Cada intento son N preguntas al azar del banco, con las opciones
 *      también barajadas.
 *   4. Durante el intento NO se dice nada: ni si acertó, ni la explicación, ni
 *      la referencia. Solo queda marcada la opción elegida.
 *   5. Al terminar se muestra el porcentaje y, debajo, todas las respuestas
 *      con su explicación.
 *
 * El sorteo, la calificación y el guardado los hace el servidor
 * (services/evaluaciones.ts): la pantalla no tiene las respuestas correctas
 * hasta que el intento termina. El módulo trae sus rutas, su progreso y su
 * historial; la pantalla no sabe de tablas ni de bancos.
 */

/** Una fila del historial, ya normalizada desde la tabla del módulo. */
export interface FilaHistorial {
  id: string
  score: number
  correct: number
  total: number
  passed: boolean
  duration: number | null
  at: string
}

export interface ExamenConfig {
  /** "NOTAM", "Mercancías peligrosas". */
  nombre: string
  /** "NOTAM · Evaluación". */
  eyebrow: string
  /** "Volver a la sección NOTAM". */
  volverTexto: string
  hub: string
  leccion: string
  practica: string
  totalLecciones: number
  /** "secciones" o "lecciones", para los textos de la puerta cerrada. */
  unidadLeccion: string
  /** Preguntas por intento, para los textos previos. El sorteo real lo hace el servidor. */
  porIntento: number
  /** Mínimo de aprobación para los textos previos. El que califica lo devuelve el servidor. */
  aprobacion: number
  /** Nota de referencia del banco, al pie del resultado y en la puerta cerrada. */
  aviso: string
  /** Acento del módulo: el azul de NOTAM o el amarillo de Mercancías. */
  acento: string
  /** La evaluación del servidor que presenta esta pantalla. */
  evaluacion: ClaveEvaluacion
  leerLeidas: () => number[]
  escribirLeidas: (ns: number[]) => void
  hidratarLeidas: (uid: string) => Promise<number[] | null>
  leerMejorLocal: () => number | null
  escribirMejorLocal: (score: number) => void
  cargarHistorial: (uid: string) => Promise<{ rows: FilaHistorial[]; count: number; best: number | null } | null>
  /** Textos de los dos enlaces de salida cuando no se aprobó. */
  pasos: { leccion: string; practica: string }
}

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"]

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

function mix(token: string, pct: number): string {
  return `color-mix(in oklab, ${token} ${pct}%, transparent)`
}

// ─── Página ──────────────────────────────────────────────────────────────────

export function ExamenModulo({ config }: { config: ExamenConfig }) {
  const { user, isLoading: sessionLoading } = useSession()

  // Descarta lecciones que ya no existen: el módulo se recortó y queda progreso viejo.
  const soloExistentes = useCallback(
    (ns: number[]) => ns.filter((n) => n >= 1 && n <= config.totalLecciones),
    [config.totalLecciones],
  )

  // La llave de entrada. El respaldo local abre de inmediato; si no alcanza, se
  // le pregunta a la base antes de bloquear, porque la lectura pudo hacerse en
  // otro dispositivo y sería injusto cerrarle la puerta a quien ya la terminó.
  const [leidas, setLeidas] = useState<number[]>(() => soloExistentes(config.leerLeidas()))
  const [hidratado, setHidratado] = useState(false)
  const completa = leidas.length >= config.totalLecciones
  // Sin sesión no hay nada que consultar: lo local es toda la verdad disponible.
  const esperando = !completa && (sessionLoading || (!!user?.id && !hidratado))
  const bloqueado = !completa && !esperando

  useEffect(() => {
    if (completa || sessionLoading) return
    const uid = user?.id
    if (!uid) return
    let cancelled = false
    void (async () => {
      const fetched = await config.hidratarLeidas(uid)
      if (cancelled) return
      if (fetched) {
        const merged = soloExistentes(Array.from(new Set([...config.leerLeidas(), ...fetched]))).sort(
          (a, b) => a - b,
        )
        config.escribirLeidas(merged)
        setLeidas(merged)
      }
      setHidratado(true)
    })()
    return () => {
      cancelled = true
    }
  }, [user?.id, sessionLoading, completa, config, soloExistentes])

  if (esperando) return <Cargando texto="Abriendo la evaluación..." />

  if (bloqueado) return <Bloqueado config={config} leidas={leidas} />

  // El intento se monta solo con la puerta abierta: pedir preguntas antes sería
  // gastar un intento de la hora en alguien que todavía no puede presentarla.
  return <Intento config={config} userId={user?.id ?? null} sessionLoading={sessionLoading} />
}

// ─── Intento ─────────────────────────────────────────────────────────────────

function Intento({
  config,
  userId,
  sessionLoading,
}: {
  config: ExamenConfig
  userId: string | null
  sessionLoading: boolean
}) {
  const { estado, enviando, errorAccion, responder, terminar, reiniciar } = useEvaluacion(config.evaluacion)
  const [idx, setIdx] = useState(0)
  // Opción elegida por posición. Se puede cambiar mientras no se avance; al
  // avanzar se envía, y en el servidor cuenta la primera que llegó.
  const [picks, setPicks] = useState<Record<number, number>>({})
  const [elapsed, setElapsed] = useState(0)
  const enCurso = estado.fase === "en_curso"

  useEffect(() => {
    if (!enCurso) return
    const t = window.setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => window.clearInterval(t)
  }, [enCurso])

  const otroIntento = useCallback(() => {
    setIdx(0)
    setPicks({})
    setElapsed(0)
    reiniciar()
    subirArriba()
  }, [reiniciar])

  if (estado.fase === "iniciando") return <Cargando texto="Preparando tus preguntas..." />
  if (estado.fase === "terminando") return <Cargando texto="Calificando tu evaluación..." />
  if (estado.fase === "error") {
    return <ErrorDeEvaluacion config={config} mensaje={estado.error.message} onReintentar={otroIntento} />
  }
  if (estado.fase === "terminada") {
    return (
      <Result
        config={config}
        sesion={estado.sesion}
        resultado={estado.resultado}
        userId={userId}
        sessionLoading={sessionLoading}
        onRetry={otroIntento}
      />
    )
  }

  const total = estado.sesion.preguntas.length
  const q = estado.sesion.preguntas[idx]
  const picked = picks[q.posicion]
  const answered = picked !== undefined
  const esUltima = idx >= total - 1
  const puntosPorPregunta = Math.round(100 / total)
  const hayQueEmpezarDeNuevo =
    errorAccion?.codigo === "intento_vencido" || errorAccion?.codigo === "intento_no_encontrado"

  function choose(optionIndex: number) {
    // Se puede cambiar de opción mientras no se avance.
    setPicks((p) => ({ ...p, [q.posicion]: optionIndex }))
  }

  async function next() {
    if (picked === undefined || enviando) return
    const registrada = await responder(q.posicion, picked)
    if (!registrada) return
    // Si ya estaba registrada (un reintento tras un corte de red), manda la del servidor.
    if (registrada.opcion !== picked) setPicks((p) => ({ ...p, [q.posicion]: registrada.opcion }))
    subirArriba()
    if (esUltima) {
      await terminar()
      return
    }
    setIdx((i) => i + 1)
  }

  return (
    <>
      <div className="px-5 sm:px-7 py-9 sm:py-11 pb-20 max-w-[900px] mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
            <div className="text-[13px] font-semibold" style={{ color: accentText(config.acento) }}>
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
              className="h-full rounded-full transition-[width]"
              style={{ width: `${((idx + 1) / total) * 100}%`, background: config.acento }}
            />
          </div>
        </div>

        {/* Sin etiqueta de dificultad: no se le anuncia a nadie que la pregunta
            que tiene enfrente es "avanzada". */}
        <div className="rounded-2xl surface p-5 sm:p-6">
          <div className="flex items-center justify-end">
            <span className="tabular text-[12px] text-muted-foreground">{puntosPorPregunta} puntos</span>
          </div>

          <h2 className="mt-2 text-[20px] sm:text-[20px] font-semibold leading-snug tracking-[-0.01em]">
            {q.enunciado}
          </h2>

          {/* Sin corrección en pantalla: la opción elegida solo se ve elegida. */}
          <div className="mt-5 grid gap-2.5">
            {q.opciones.map((opt, oi) => (
              <OptionButton
                key={`${q.posicion}-${oi}`}
                acento={config.acento}
                letter={OPTION_LETTERS[oi] ?? String(oi + 1)}
                text={opt}
                isPicked={picked === oi}
                disabled={enviando}
                onClick={() => choose(oi)}
              />
            ))}
          </div>
        </div>

        {errorAccion && (
          <div
            role="alert"
            className="mt-5 flex flex-wrap items-start gap-3 rounded-xl border p-4"
            style={{ borderColor: mix("var(--av-amber-400)", 30), background: mix("var(--av-amber-400)", 6) }}
          >
            <AlertTriangle className="mt-0.5 h-4.5 w-4.5 flex-shrink-0" style={{ color: "var(--av-amber-400)" }} />
            <p className="min-w-0 flex-1 text-[13px] leading-relaxed text-foreground/85">{errorAccion.message}</p>
            {hayQueEmpezarDeNuevo && (
              <button
                type="button"
                onClick={otroIntento}
                className="text-[13px] font-semibold underline underline-offset-4"
                style={{ color: accentText(config.acento) }}
              >
                Empezar un intento nuevo
              </button>
            )}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
          <div className="text-[13px] text-muted-foreground">
            {answered ? "Puedes cambiar tu respuesta antes de avanzar." : "Elige una respuesta para continuar."}
          </div>
          <button
            type="button"
            onClick={() => void next()}
            disabled={!answered || enviando || hayQueEmpezarDeNuevo}
            aria-busy={enviando}
            className="inline-flex items-center gap-2 h-12 px-6 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            style={{ background: config.acento }}
          >
            {enviando ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Guardando tu respuesta...
              </>
            ) : (
              <>
                {esUltima ? "Terminar y ver mi resultado" : "Siguiente"} <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        <p className="mt-4 text-[12px] text-muted-foreground leading-relaxed">
          Las respuestas correctas y las explicaciones aparecen al final, cuando termines las {total} preguntas.
        </p>
      </div>
    </>
  )
}

/** El intento no pudo empezar: qué pasó, reintentar o volver. */
function ErrorDeEvaluacion({
  config,
  mensaje,
  onReintentar,
}: {
  config: ExamenConfig
  mensaje: string
  onReintentar: () => void
}) {
  return (
    <>
      <div className="px-5 sm:px-7 py-9 sm:py-11 pb-20 max-w-[760px] mx-auto">
        <Link
          to={config.hub}
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {config.volverTexto}
        </Link>
        <div
          role="alert"
          className="rounded-2xl border p-5 sm:p-6 flex items-start gap-3"
          style={{ borderColor: mix("var(--av-amber-400)", 28), background: mix("var(--av-amber-400)", 5) }}
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: "var(--av-amber-400)" }} />
          <div className="min-w-0">
            <div className="text-[17px] font-semibold tracking-[-0.01em]">No pudimos abrir la evaluación</div>
            <p className="mt-1 text-[14px] leading-relaxed text-foreground/85">{mensaje}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={onReintentar}
            className="inline-flex h-12 items-center justify-center rounded-[10px] border-0 px-7 text-[15px] font-semibold text-white transition-colors"
            style={{ background: config.acento }}
          >
            Intentar de nuevo
          </button>
          <Link
            to={config.hub}
            className="inline-flex h-12 items-center justify-center rounded-[10px] border px-7 text-[15px] font-semibold transition-colors hover:bg-muted/50"
            style={{ borderColor: mix("var(--border)", 85) }}
          >
            Volver a la sección
          </Link>
        </div>
      </div>
    </>
  )
}

// ─── Opción de respuesta ─────────────────────────────────────────────────────

/**
 * Botón de opción SIN corrección: durante el intento la única señal es la del
 * acento, "esta elegí". Si alguna vez vuelve a aparecer un color de acierto
 * acá, la regla 4 de arriba está rota.
 */
function OptionButton({
  acento,
  letter,
  text,
  isPicked,
  disabled = false,
  onClick,
}: {
  acento: string
  letter: string
  text: string
  isPicked: boolean
  disabled?: boolean
  onClick: () => void
}) {
  const borderColor = isPicked ? mix(acento, 55) : mix("var(--border)", 70)
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isPicked}
      aria-label={`Opción ${letter}: ${text}`}
      className="w-full text-left rounded-xl border p-3.5 sm:p-4 flex items-start gap-3 min-h-[56px] transition-colors hover:bg-muted/40 disabled:cursor-wait"
      style={{ borderColor, background: isPicked ? mix(acento, 8) : "transparent" }}
    >
      <span
        className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[13px] font-semibold"
        style={{
          background: isPicked ? mix(acento, 18) : mix("var(--border)", 45),
          color: isPicked ? accentText(acento) : "var(--muted-foreground)",
        }}
      >
        {letter}
      </span>
      <span className="flex-1 text-[15px] text-foreground/90 leading-relaxed">{text}</span>
      {isPicked && (
        <span className="flex-shrink-0 mt-0.5" style={{ color: acento }}>
          <CheckCircle2 className="h-4.5 w-4.5" />
        </span>
      )}
    </button>
  )
}

// ─── Puerta cerrada ──────────────────────────────────────────────────────────

function Cargando({ texto }: { texto: string }) {
  return (
    <>
      <div
        className="px-5 sm:px-7 py-20 max-w-[900px] mx-auto flex flex-col items-center gap-3 text-muted-foreground"
        role="status"
        aria-label={texto}
      >
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-[13px]">{texto}</span>
      </div>
    </>
  )
}

/**
 * La evaluación cerrada, con la cuenta de lo que falta. No es un castigo: las
 * preguntas salen de las lecciones, y presentarla sin haberlas leído solo
 * produce un puntaje bajo que no le enseña nada a nadie.
 */
function Bloqueado({ config, leidas }: { config: ExamenConfig; leidas: number[] }) {
  const T = config.totalLecciones
  const hechas = leidas.length
  const faltan = T - hechas
  const pct = Math.round((hechas / T) * 100)
  let siguiente = 1
  while (siguiente <= T && leidas.includes(siguiente)) siguiente++
  if (siguiente > T) siguiente = T
  const unidad = config.unidadLeccion
  const unidadSing = unidad.endsWith("es") ? unidad.slice(0, -2) : unidad.slice(0, -1)

  return (
    <>
      <div className="px-5 sm:px-7 py-9 sm:py-11 pb-20 max-w-[760px] mx-auto">
        <Link
          to={config.hub}
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {config.volverTexto}
        </Link>

        <PageHeader
          eyebrow={
            <>
              <Award className="h-3.5 w-3.5" /> {config.eyebrow}
            </>
          }
          title="La evaluación se abre cuando termines la lectura"
          subtitle={`Son ${config.porIntento} preguntas al azar sobre las ${T} ${unidad} del módulo. Para presentarla necesitas haberlas leído todas.`}
        />

        <div
          className="rounded-2xl border p-5 sm:p-6"
          style={{ borderColor: mix("var(--av-amber-400)", 28), background: mix("var(--av-amber-400)", 5) }}
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
                {faltan === 1 ? `Te falta una ${unidadSing} por leer` : `Te faltan ${faltan} ${unidad} por leer`}
              </div>
              <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                Llevas {hechas} de {T}. Termínalas y la evaluación se abre sola: no hay que pedir nada ni esperar nada.
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
            aria-valuemax={T}
            aria-valuenow={hechas}
            aria-label={`${hechas} de ${T} ${unidad} leídas`}
          >
            <div className="h-full rounded-full transition-[width]" style={{ width: `${pct}%`, background: "var(--av-amber-400)" }} />
          </div>
        </div>

        <Link
          to={`${config.leccion}?l=${siguiente}`}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
          style={{ background: config.acento }}
        >
          <BookOpen className="h-4.5 w-4.5" />
          {hechas === 0 ? "Empezar la lectura" : `Continuar en la ${unidadSing} ${siguiente}`}
        </Link>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px]">
          <Link
            to={config.practica}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <PenLine className="h-3.5 w-3.5" /> Mientras tanto, ve a la práctica
          </Link>
        </div>

        <div
          className="mt-8 rounded-2xl border p-4 flex items-start gap-3"
          style={{ borderColor: mix("var(--av-amber-400)", 25), background: mix("var(--av-amber-400)", 6) }}
        >
          <AlertTriangle className="flex-shrink-0 mt-0.5 h-4.5 w-4.5" style={{ color: "var(--av-amber-400)" }} />
          <div className="text-[13px] text-foreground/85 leading-relaxed">{config.aviso}</div>
        </div>
      </div>
    </>
  )
}

// ─── Historial de intentos ───────────────────────────────────────────────────

function AttemptHistory({
  config,
  userId,
  sessionLoading,
  refreshKey,
  total,
}: {
  config: ExamenConfig
  userId: string | null
  sessionLoading: boolean
  refreshKey: number
  total: number
}) {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<FilaHistorial[]>([])
  const [attemptCount, setAttemptCount] = useState(0)
  const [remoteBest, setRemoteBest] = useState<number | null>(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps -- refreshKey fuerza la relectura del respaldo local tras guardar
  const localBest = useMemo(() => config.leerMejorLocal(), [config, refreshKey])

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
      const res = await config.cargarHistorial(userId)
      if (cancelled) return
      if (!res) {
        setRows([])
        setAttemptCount(0)
        setRemoteBest(null)
      } else {
        setRows(res.rows)
        setAttemptCount(res.count)
        setRemoteBest(res.best)
      }
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [userId, sessionLoading, refreshKey, config])

  const scoreColor = (s: number) => (s >= config.aprobacion ? config.acento : "var(--av-wine-500)")
  const scoreTextColor = (s: number) => (s >= config.aprobacion ? accentText(config.acento) : "var(--av-wine-fg)")

  // El mejor puntaje es el máximo entre la nube y el respaldo local, nunca uno de los dos.
  const best = Math.max(remoteBest ?? 0, localBest ?? 0) || null
  const last = rows.length ? rows[0].score : null
  const busy = loading || sessionLoading

  return (
    <>
      <SectionTitle icon={History} eyebrow="Tu historial" title="Tus intentos anteriores" hint="Mostramos tus 10 intentos más recientes." />

      <div className="grid grid-cols-3 gap-2.5">
        <Stat label="Mejor puntaje" value={busy ? "" : best != null ? String(best) : "0"} color={best != null ? scoreColor(best) : "var(--muted-foreground)"} />
        <Stat label="Último puntaje" value={busy ? "" : last != null ? String(last) : "0"} color={last != null ? scoreColor(last) : "var(--muted-foreground)"} />
        <Stat label="Intentos" value={busy ? "" : String(attemptCount)} color={config.acento} />
      </div>

      {busy ? (
        <div className="mt-3 space-y-1.5" role="status" aria-label="Cargando tu historial">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[58px] rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : !userId ? (
        <div className="mt-3 rounded-2xl border border-border bg-muted/20 p-4 text-[13px] text-muted-foreground leading-relaxed">
          Inicia sesión para que tus intentos queden guardados y puedas ver cómo mejoras. Igual puedes presentar la
          evaluación ahora mismo.
        </div>
      ) : rows.length === 0 ? (
        <div className="mt-3 rounded-2xl border border-border bg-muted/20 p-5 text-center">
          <History className="mx-auto h-5 w-5 text-muted-foreground" />
          <div className="mt-2 text-[15px] font-semibold tracking-[-0.01em]">Todavía no has presentado la evaluación</div>
          <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed max-w-[520px] mx-auto">
            Presenta el primer intento y aquí vas a ver tu puntaje, si aprobaste y cuánto tardaste. Puedes repetirla las
            veces que quieras.
          </p>
        </div>
      ) : (
        <div className="mt-3 space-y-1.5">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl border bg-card px-3.5 py-2.5 flex items-center gap-3" style={{ borderColor: mix("var(--border)", 65) }}>
              <div className="tabular w-11 flex-shrink-0 text-[17px] font-semibold tracking-[-0.02em]" style={{ color: scoreColor(r.score) }}>
                {r.score}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold">{fmtDate(r.at)}</div>
                <div className="tabular text-[12px] text-muted-foreground">
                  {r.correct} de {r.total || total} correctas
                  {r.duration != null ? ` · ${fmtTime(r.duration)}` : ""}
                </div>
              </div>
              <span
                className="flex-shrink-0 text-[12px] font-semibold px-2 py-0.5 rounded-full"
                style={{ color: scoreTextColor(r.score), background: mix(scoreColor(r.score), 12) }}
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
        {value === "" ? <span className="inline-block h-5 w-10 rounded bg-muted animate-pulse" aria-hidden="true" /> : value}
      </div>
      <div className="text-[12px] sm:text-[12px] text-muted-foreground">{label}</div>
    </div>
  )
}

// ─── RESULTADO ───────────────────────────────────────────────────────────────
//
// La pantalla de retroalimentación. Especificación de Camilo del 9 de
// septiembre de 2026:
//
//   · Se lee en este orden y en ninguno otro: pregunta, tu respuesta,
//     respuesta correcta, explicación.
//   · Dos colores y ya. Vinotinto = respuesta incorrecta. El acento del
//     módulo = respuesta correcta. Nada de verde, nada de ámbar, nada de rojo
//     de alerta, y nunca dos colores dentro de la misma pregunta.
//   · Ni una palabra del nivel de dificultad.
//   · Sin eslóganes. Nada de cuatro tarjetas por pregunta: un bloque, filetes
//     finos y aire. Iconografía al mínimo.

interface ResultProps {
  config: ExamenConfig
  sesion: SesionEvaluacion
  resultado: ResultadoEvaluacion
  userId: string | null
  sessionLoading: boolean
  onRetry: () => void
}

function Result({ config, sesion, resultado, userId, sessionLoading, onRetry }: ResultProps) {
  const { puntaje: score, correctas: correctCount, total, aprobada: passed, aprobacion, duracionSegundos: elapsed } = resultado
  const color = passed ? config.acento : "var(--av-wine-500)"
  const colorTexto = passed ? accentText(config.acento) : "var(--av-wine-fg)"

  // El progreso local es el respaldo del mejor puntaje, para abrir el hub sin red.
  useEffect(() => {
    const prev = config.leerMejorLocal()
    if (prev == null || score > prev) config.escribirMejorLocal(score)
  }, [score, config])

  return (
    <>
      <div className="mx-auto max-w-[820px] px-5 py-9 pb-24 sm:px-7 sm:py-11">
        <header className="rev-aparece">
          <LogoIsotype variant="color" className="h-11 w-11 rounded-full" aria-hidden="true" />
          <h1 className="mt-5 text-[26px] font-semibold uppercase leading-none sm:text-[30px]" style={{ letterSpacing: "0.015em" }}>
            Tus resultados
          </h1>
          <p className="mt-2.5 text-[14px] text-muted-foreground">Revisión de tu evaluación</p>
        </header>

        <section className="rev-aparece rev-aparece-2 mt-8">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div>
              <Rotulo>Puntaje</Rotulo>
              <div className="tabular mt-2 text-[56px] font-semibold leading-none sm:text-[64px]" style={{ color, letterSpacing: "-0.035em" }}>
                {score}
                <span className="align-top text-[26px] sm:text-[30px]">%</span>
              </div>
            </div>
            <dl className="flex flex-wrap items-end gap-x-9 gap-y-4">
              <Dato rotulo="Correctas" valor={`${correctCount} de ${total}`} />
              <Dato rotulo="Tiempo" valor={fmtTime(elapsed)} />
              <Dato rotulo="Mínimo" valor={`${aprobacion}%`} />
              <Dato rotulo="Resultado" valor={passed ? "Aprobado" : "No aprobado"} color={colorTexto} />
            </dl>
          </div>

          <div
            className="relative mt-6 h-[3px] w-full overflow-hidden rounded-full"
            style={{ background: mix("var(--border)", 60) }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={score}
            aria-label={`Puntaje ${score} sobre 100`}
          >
            <div className="h-full rounded-full transition-[width]" style={{ width: `${Math.max(score, 1)}%`, background: color }} />
          </div>
          <div className="relative mt-1 h-[11px]">
            <span className="absolute top-0 block h-[5px] w-px" style={{ left: `${aprobacion}%`, background: mix("var(--foreground)", 35) }} aria-hidden="true" />
            <span className="tabular absolute top-[6px] -translate-x-1/2 text-[10px] text-muted-foreground" style={{ left: `${aprobacion}%` }} aria-hidden="true">
              {aprobacion}
            </span>
          </div>

          <p className="mt-6 text-[12px] text-muted-foreground">Guardado en tu historial.</p>
        </section>

        <Filete className="mt-10" />

        <section className="mt-8">
          <Rotulo>Revisión pregunta por pregunta</Rotulo>
          <p className="mt-2.5 max-w-[600px] text-[14px] leading-relaxed text-muted-foreground">
            Durante la evaluación no se mostró ninguna corrección. Acá está cada pregunta con tu respuesta, la correcta y
            su explicación. Las falladas quedan abiertas.
          </p>
          <div className="mt-6 space-y-3">
            {sesion.preguntas.map((pregunta, i) => (
              <ReviewItem key={pregunta.posicion} acento={config.acento} n={i + 1} pregunta={pregunta} revision={resultado.revision[i]} />
            ))}
          </div>
        </section>

        <Filete className="mt-10" />

        <div className="mt-8">
          <AttemptHistory config={config} userId={userId} sessionLoading={sessionLoading} refreshKey={1} total={total} />
        </div>

        <div className="mt-10 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex h-12 items-center justify-center rounded-[10px] border-0 px-7 text-[15px] font-semibold text-white transition-colors"
            style={{ background: config.acento }}
          >
            Presentar otro intento
          </button>
          <Link
            to={config.hub}
            className="inline-flex h-12 items-center justify-center rounded-[10px] border px-7 text-[15px] font-semibold transition-colors hover:bg-muted/50"
            style={{ borderColor: mix("var(--border)", 85) }}
          >
            Volver a la sección
          </Link>
        </div>

        {!passed && (
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            <NextStepLink acento={config.acento} to={config.leccion} title="Repasa la lección" detail={config.pasos.leccion} />
            <NextStepLink acento={config.acento} to={config.practica} title="Vuelve a la práctica" detail={config.pasos.practica} />
          </div>
        )}

        <NotaDeReferencia texto={config.aviso} />
      </div>
    </>
  )
}

// ─── Piezas de la retroalimentación ──────────────────────────────────────────

function Filete({ className = "" }: { className?: string }) {
  return <div className={`h-px ${className}`} style={{ background: mix("var(--border)", 75) }} aria-hidden="true" />
}

function Dato({ rotulo, valor, color }: { rotulo: string; valor: string; color?: string }) {
  return (
    <div>
      <dt>
        <Rotulo>{rotulo}</Rotulo>
      </dt>
      <dd className="tabular mt-1.5 text-[17px] font-semibold" style={{ color: color ?? "var(--foreground)", letterSpacing: "-0.01em" }}>
        {valor}
      </dd>
    </div>
  )
}

/** Una respuesta: filete de color, glifo en su pastilla y el texto con cuerpo. */
function Respuesta({ glifo, color, children }: { glifo: string; color: string; children: ReactNode }) {
  return (
    <div className="mt-3 flex items-start gap-3.5 rounded-r-[10px] border-l-[3px] py-3.5 pl-4 pr-4" style={{ borderColor: color, background: mix(color, 5) }}>
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

function Explicacion({ acento, texto, referencia }: { acento: string; texto: string; referencia?: string }) {
  return (
    <div className="mt-3 rounded-r-[10px] border-l-2 bg-muted/40 py-5 pl-5 pr-5" style={{ borderColor: mix(acento, 38) }}>
      <p className="max-w-[64ch] text-[15px] leading-[1.75] text-foreground/90">{texto}</p>
      {referencia && <p className="mono mt-3 text-[11px] text-muted-foreground">{referencia}</p>}
    </div>
  )
}

function NotaDeReferencia({ texto }: { texto: string }) {
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
        <p className="mt-1.5 max-w-[640px] text-[12px] leading-relaxed text-muted-foreground">{texto}</p>
      </div>
    </div>
  )
}

/**
 * Una pregunta del repaso, como ficha cerrada. Orden: pregunta → tu respuesta
 * → respuesta correcta → explicación. La que acertó se resume.
 */
function ReviewItem({ acento, n, pregunta, revision }: { acento: string; n: number; pregunta: PreguntaEvaluacion; revision: RevisionPregunta }) {
  const ok = revision.correcta
  const [open, setOpen] = useState(!ok)
  const marca = ok ? acento : "var(--av-wine-500)"
  const textoMarca = ok ? accentText(acento) : "var(--av-wine-fg)"
  const elegida = revision.opcion !== null ? pregunta.opciones[revision.opcion] : null
  const correcta = pregunta.opciones[revision.opcionCorrecta]

  return (
    <div className="overflow-hidden rounded-[14px] border bg-card" style={{ borderColor: mix("var(--border)", open ? 95 : 75) }}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-start gap-4 px-5 py-4 text-left sm:px-6">
        <span className="tabular mt-[1px] flex-shrink-0 text-[13px] font-semibold" style={{ color: textoMarca }}>
          {String(n).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="mono block text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: textoMarca }}>
            <span aria-hidden="true">{ok ? "✓" : "✕"}</span> {ok ? "Correcta" : "Incorrecta"}
          </span>
          {!open && <span className="mt-2 block text-[15px] font-medium leading-snug text-foreground/85">{pregunta.enunciado}</span>}
        </span>
        <span className="mt-[2px] flex-shrink-0 text-muted-foreground">{open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</span>
      </button>

      {/* Plegable con transición y no con keyframes: se puede interrumpir, y
          sobre todo se cierra como se abrió. Antes `{open && …}` lo desmontaba
          de golpe, así que la tarjeta se abría en 430 ms y se cerraba en cero.
          Esta pantalla se recorre tarjeta a tarjeta por veinte preguntas. */}
      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
        <div className="px-5 pb-7 sm:px-6">
          <div className="pt-1.5">
            <Rotulo>Pregunta</Rotulo>
            <p className="mt-2.5 max-w-[62ch] text-[19px] font-semibold leading-[1.45] text-foreground sm:text-[20px]" style={{ letterSpacing: "-0.012em" }}>
              {pregunta.enunciado}
            </p>
          </div>

          <Filete className="mt-6" />

          {ok ? (
            <div className="mt-6">
              <Rotulo>Respuesta</Rotulo>
              <Respuesta glifo="✓" color={marca}>
                {elegida ?? correcta}
              </Respuesta>
            </div>
          ) : (
            <>
              <div className="mt-6">
                <Rotulo>Tu respuesta</Rotulo>
                <Respuesta glifo="✕" color="var(--av-wine-500)">
                  {elegida ?? "Sin responder"}
                </Respuesta>
              </div>
              <div className="mt-6">
                <Rotulo>Respuesta correcta</Rotulo>
                <Respuesta glifo="✓" color={acento}>
                  {correcta}
                </Respuesta>
              </div>
            </>
          )}

          <div className="mt-6">
            <Rotulo>Explicación</Rotulo>
            <Explicacion acento={acento} texto={revision.explicacion} referencia={revision.referencia ?? undefined} />
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

function NextStepLink({ acento, to, title, detail }: { acento: string; to: string; title: string; detail: string }) {
  return (
    <Link to={to} className="rounded-[10px] border-l-2 bg-muted/25 py-4 pl-4 pr-4 transition-colors hover:bg-muted/50" style={{ borderColor: acento }}>
      <div className="text-[15px] font-semibold" style={{ letterSpacing: "-0.01em" }}>
        {title}
      </div>
      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{detail}</p>
    </Link>
  )
}
