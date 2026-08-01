import { useMemo, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Target, XCircle } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { accentText, shuffle } from "@/lib/notam"

/**
 * Motor de evaluación de opción múltiple.
 *
 * Nació al cerrar el tema METAR y al construir el simulacro de entrevista
 * técnica: las dos pantallas necesitaban exactamente lo mismo (barajar,
 * responder una a una, explicar al momento y dar un informe al final), y la
 * evaluación de NOTAM ya lo tenía resuelto en novecientas líneas propias.
 * Antes de escribir una tercera copia, el mecanismo vive aquí.
 *
 * Lo que NO hace: guardar. Cada pantalla decide dónde persiste su resultado,
 * porque cada tema guarda en su propia tabla.
 */

/**
 * Marcado ligero para el enunciado y las opciones: `codigo` y **negrita**.
 *
 * Las preguntas de METAR y NOTAM están llenas de grupos y códigos (`+TSRA`,
 * `QMRLC`, `9999`). Sin esto salían con las comillas invertidas a la vista, y
 * un código en medio de una frase se lee mucho peor en tipografía de texto.
 */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="mono text-[0.9em] px-1.5 py-[0.1em] rounded-md border border-border bg-muted/60 break-words"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export interface QuizQuestion {
  id: number | string
  pregunta: string
  opciones: string[]
  /** Índice de la correcta dentro de `opciones`. */
  correcta: number
  explicacion: string
  referencia: string
  /** Etiqueta de procedencia, para los bancos mezclados. */
  origen?: string
}

interface Barajada extends QuizQuestion {
  opcionesBarajadas: string[]
  correctaIdx: number
}

export interface QuizResultado {
  aciertos: number
  total: number
  /** Sobre 100. */
  score: number
  aprobado: boolean
}

interface QuizEngineProps {
  questions: QuizQuestion[]
  /** Puntaje mínimo de aprobación, sobre 100. */
  passScore: number
  /** Adónde vuelve el botón de salida. */
  backTo: string
  backLabel: string
  /** Se llama una vez, al terminar. Aquí cada pantalla guarda su resultado. */
  onFinish?: (r: QuizResultado) => void
  /** Bloque libre bajo el resultado: recomendaciones, enlaces, lo que toque. */
  footer?: (r: QuizResultado) => React.ReactNode
}

export function QuizEngine({
  questions,
  passScore,
  backTo,
  backLabel,
  onFinish,
  footer,
}: QuizEngineProps) {
  // Semilla fija por montaje: el intento es reproducible mientras dure, y
  // volver a empezar baraja de nuevo.
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 2 ** 31) || 1)

  const barajadas: Barajada[] = useMemo(() => {
    return shuffle(questions, seed).map((q, i) => {
      const textoCorrecto = q.opciones[q.correcta]
      const opcionesBarajadas = shuffle(q.opciones, seed + i + 1)
      return { ...q, opcionesBarajadas, correctaIdx: opcionesBarajadas.indexOf(textoCorrecto) }
    })
  }, [questions, seed])

  const [idx, setIdx] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<number, number>>({})
  const [terminado, setTerminado] = useState(false)
  const [avisado, setAvisado] = useState(false)

  const total = barajadas.length
  const actual = barajadas[idx]
  const elegida = respuestas[idx]
  const respondida = elegida !== undefined

  const aciertos = barajadas.reduce(
    (acc, q, i) => acc + (respuestas[i] === q.correctaIdx ? 1 : 0),
    0
  )
  const score = total > 0 ? Math.round((aciertos / total) * 100) : 0
  const aprobado = score >= passScore
  const resultado: QuizResultado = { aciertos, total, score, aprobado }

  function responder(i: number): void {
    if (respondida) return
    setRespuestas((prev) => ({ ...prev, [idx]: i }))
  }

  function siguiente(): void {
    if (idx < total - 1) {
      setIdx(idx + 1)
      return
    }
    setTerminado(true)
    // El aviso al padre va una sola vez: si el usuario vuelve a la última
    // pregunta y pulsa otra vez, no se guardan dos intentos iguales.
    if (!avisado) {
      setAvisado(true)
      onFinish?.(resultado)
    }
  }

  function reiniciar(): void {
    setSeed(Math.floor(Math.random() * 2 ** 31) || 1)
    setIdx(0)
    setRespuestas({})
    setTerminado(false)
    setAvisado(false)
  }

  if (total === 0) return null

  if (terminado) {
    const color = aprobado ? "var(--av-green-400)" : "var(--av-amber-400)"
    return (
      <>
        <section className="rounded-xl surface p-6 sm:p-8 text-center">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              background: `color-mix(in oklab, ${color} 14%, transparent)`,
              color: accentText(color, 75),
            }}
          >
            {aprobado ? <CheckCircle2 className="h-7 w-7" /> : <Target className="h-7 w-7" />}
          </div>
          <div
            className="tabular mt-4 text-[32px] font-semibold tracking-[-0.03em]"
            style={{ color: accentText(color) }}
          >
            {score} / 100
          </div>
          <div className="mt-1 text-[17px] font-semibold">
            {aprobado ? "Aprobada" : "No alcanzaste el mínimo"}
          </div>
          <p className="mt-1.5 text-[13px] text-muted-foreground">
            {aciertos} de {total} correctas. Se aprueba con {passScore}.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={reiniciar} className={appButtonClass({ size: "lg" })} style={appButtonStyle()}>
              <RotateCcw className="h-4 w-4" /> Volver a intentar
            </button>
            <Link to={backTo} className={appButtonClass({ variant: "secondary", size: "lg" })}>
              {backLabel}
            </Link>
          </div>
        </section>

        {footer?.(resultado)}

        {/* Revisión: la parte que de verdad enseña */}
        <section className="mt-8">
          <SectionTitle
            eyebrow="Revisión"
            title="Pregunta por pregunta"
            hint="Lo que fallaste es lo que hay que volver a leer."
          />
          <div className="flex flex-col gap-3">
            {barajadas.map((q, i) => {
              const dada = respuestas[i]
              const bien = dada === q.correctaIdx
              return (
                <div key={q.id} className="rounded-xl surface p-5">
                  <div className="flex items-start gap-2.5">
                    <span
                      className="shrink-0 mt-0.5"
                      style={{ color: accentText(bien ? "var(--av-green-400)" : "var(--av-red-400)", 75) }}
                    >
                      {bien ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[15px] font-medium">{inline(q.pregunta)}</div>
                      {!bien && (
                        <div className="mt-1.5 text-[13px] text-muted-foreground">
                          Respondiste:{" "}
                          <span className="text-foreground">
                            {dada === undefined ? "sin responder" : inline(q.opcionesBarajadas[dada])}
                          </span>
                        </div>
                      )}
                      <div className="mt-1 text-[13px]">
                        <span className="text-muted-foreground">Correcta: </span>
                        <span className="font-medium">{inline(q.opcionesBarajadas[q.correctaIdx])}</span>
                      </div>
                      <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                        {inline(q.explicacion)}
                      </p>
                      <div className="mt-2 text-[12px] text-muted-foreground">
                        {q.origen ? `${q.origen} · ` : ""}
                        {q.referencia}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </>
    )
  }

  return (
    <section className="rounded-xl surface p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12px] font-medium text-muted-foreground tabular">
          Pregunta {idx + 1} de {total}
        </span>
        {actual.origen && (
          <span className="chip">{actual.origen}</span>
        )}
      </div>

      <div className="mt-2.5 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-[width]"
          style={{
            width: `${Math.round(((idx + (respondida ? 1 : 0)) / total) * 100)}%`,
            background: "var(--av-blue-500)",
          }}
        />
      </div>

      <h2 className="mt-4 text-[17px] font-semibold tracking-[-0.01em] leading-snug">
        {inline(actual.pregunta)}
      </h2>

      <ul className="mt-4 p-0 list-none flex flex-col gap-2">
        {actual.opcionesBarajadas.map((op, i) => {
          const esLaBuena = i === actual.correctaIdx
          const revelada = respondida && (i === elegida || esLaBuena)
          const tono = esLaBuena ? "var(--av-green-400)" : "var(--av-red-400)"
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => responder(i)}
                disabled={respondida}
                aria-pressed={i === elegida}
                className="w-full text-left rounded-lg border px-4 py-3 text-[15px] leading-snug transition-colors disabled:cursor-default"
                style={{
                  borderColor: revelada
                    ? `color-mix(in oklab, ${tono} 45%, transparent)`
                    : "var(--border)",
                  background: revelada
                    ? `color-mix(in oklab, ${tono} 10%, transparent)`
                    : "var(--card)",
                }}
              >
                <span className="flex items-start gap-2.5">
                  <span
                    className="mono shrink-0 text-[13px] font-semibold"
                    style={{ color: revelada ? accentText(tono, 70) : "var(--muted-foreground)" }}
                  >
                    {String.fromCharCode(97 + i)}
                  </span>
                  <span className="min-w-0">{inline(op)}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {respondida && (
        <div className="mt-4 rounded-lg border border-border bg-muted/40 p-4" role="status" aria-live="polite">
          <div
            className="text-[13px] font-semibold"
            style={{
              color: accentText(
                elegida === actual.correctaIdx ? "var(--av-green-400)" : "var(--av-amber-400)",
                70
              ),
            }}
          >
            {elegida === actual.correctaIdx ? "Correcto" : "No es esa"}
          </div>
          <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
            {inline(actual.explicacion)}
          </p>
          <div className="mt-2 text-[12px] text-muted-foreground">{actual.referencia}</div>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setIdx(Math.max(0, idx - 1))}
          disabled={idx === 0}
          className={appButtonClass({ variant: "secondary" }, "disabled:opacity-40")}
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Anterior
        </button>
        <button
          type="button"
          onClick={siguiente}
          disabled={!respondida}
          className={appButtonClass({}, "disabled:opacity-40")}
          style={appButtonStyle()}
        >
          {idx === total - 1 ? "Ver resultado" : "Siguiente"} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  )
}
