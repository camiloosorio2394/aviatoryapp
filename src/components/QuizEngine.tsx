import { useEffect, useRef, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Loader2, RotateCcw, Target, XCircle } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { useEvaluacion } from "@/hooks/useEvaluacion"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { accentText } from "@/lib/tileColors"
import type { ClaveEvaluacion, ResultadoEvaluacion, SesionEvaluacion } from "@/services/evaluaciones"

/**
 * Motor de evaluación de opción múltiple con corrección al momento.
 *
 * Nació al cerrar el tema METAR y al construir el simulacro de entrevista
 * técnica: las dos pantallas necesitaban exactamente lo mismo (responder una a
 * una, explicar al momento y dar un informe al final).
 *
 * Las preguntas, la corrección de cada respuesta y el resultado vienen del
 * servidor (services/evaluaciones.ts): la pantalla no conoce la opción correcta
 * hasta que el piloto responde. El guardado del intento también lo hace el
 * servidor; cada pantalla solo decide qué más hacer con el resultado.
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

/** Referencia a mostrar: la de la pregunta o, en los bancos que no la traen, el módulo. */
function referenciaDe(referencia: string | null, tema: string | null): string {
  return referencia ?? (tema ? `Módulo ${tema} de Aviatory` : "")
}

interface QuizEngineProps {
  /** Evaluación del servidor que se presenta. */
  evaluacion: ClaveEvaluacion
  /** Adónde vuelve el botón de salida. */
  backTo: string
  backLabel: string
  /** Se llama una vez por intento, con el resultado ya guardado en el servidor. */
  onFinish?: (resultado: ResultadoEvaluacion) => void
  /** Bloque libre bajo el resultado: recomendaciones, enlaces, lo que toque. */
  footer?: (resultado: ResultadoEvaluacion, sesion: SesionEvaluacion) => ReactNode
}

export function QuizEngine({ evaluacion, backTo, backLabel, onFinish, footer }: QuizEngineProps) {
  const { estado, respuestas, enviando, errorAccion, responder, terminar, reiniciar } = useEvaluacion(evaluacion)
  const [idx, setIdx] = useState(0)

  // El aviso al padre va una sola vez por intento: el resultado puede volver a
  // pintarse sin que eso sea un intento nuevo.
  const avisado = useRef<string | null>(null)
  useEffect(() => {
    if (estado.fase !== "terminada" || avisado.current === estado.sesion.id) return
    avisado.current = estado.sesion.id
    onFinish?.(estado.resultado)
  }, [estado, onFinish])

  function volverAEmpezar(): void {
    setIdx(0)
    reiniciar()
  }

  if (estado.fase === "iniciando" || estado.fase === "terminando") {
    return (
      <section
        className="rounded-xl surface p-8 flex flex-col items-center gap-3 text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-[13px]">
          {estado.fase === "iniciando" ? "Preparando tus preguntas..." : "Calificando tu intento..."}
        </span>
      </section>
    )
  }

  if (estado.fase === "error") {
    return (
      <section className="rounded-xl surface p-6 sm:p-8" role="alert">
        <div className="flex items-start gap-3">
          <AlertTriangle
            className="mt-0.5 h-5 w-5 shrink-0"
            style={{ color: accentText("var(--av-amber-400)", 75) }}
            aria-hidden
          />
          <div className="min-w-0">
            <div className="text-[17px] font-semibold tracking-[-0.01em]">No pudimos abrir la evaluación</div>
            <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{estado.error.message}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={volverAEmpezar} className={appButtonClass({ size: "lg" })} style={appButtonStyle()}>
            <RotateCcw className="h-4 w-4" /> Intentar de nuevo
          </button>
          <Link to={backTo} className={appButtonClass({ variant: "secondary", size: "lg" })}>
            {backLabel}
          </Link>
        </div>
      </section>
    )
  }

  if (estado.fase === "terminada") {
    const { sesion, resultado } = estado
    const aprobado = resultado.aprobada
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
            {resultado.puntaje} / 100
          </div>
          <div className="mt-1 text-[17px] font-semibold">
            {aprobado ? "Aprobada" : "No alcanzaste el mínimo"}
          </div>
          <p className="mt-1.5 text-[13px] text-muted-foreground">
            {resultado.correctas} de {resultado.total} correctas. Se aprueba con {resultado.aprobacion}.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={volverAEmpezar} className={appButtonClass({ size: "lg" })} style={appButtonStyle()}>
              <RotateCcw className="h-4 w-4" /> Volver a intentar
            </button>
            <Link to={backTo} className={appButtonClass({ variant: "secondary", size: "lg" })}>
              {backLabel}
            </Link>
          </div>
        </section>

        {footer?.(resultado, sesion)}

        {/* Revisión: la parte que de verdad enseña */}
        <section className="mt-8">
          <SectionTitle
            eyebrow="Revisión"
            title="Pregunta por pregunta"
            hint="Lo que fallaste es lo que hay que volver a leer."
          />
          <div className="flex flex-col gap-3">
            {sesion.preguntas.map((pregunta, i) => {
              const revision = resultado.revision[i]
              const bien = revision.correcta
              return (
                <div key={pregunta.posicion} className="rounded-xl surface p-5">
                  <div className="flex items-start gap-2.5">
                    <span
                      className="shrink-0 mt-0.5"
                      style={{ color: accentText(bien ? "var(--av-green-400)" : "var(--av-red-400)", 75) }}
                    >
                      {bien ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[15px] font-medium">{inline(pregunta.enunciado)}</div>
                      {!bien && (
                        <div className="mt-1.5 text-[13px] text-muted-foreground">
                          Respondiste:{" "}
                          <span className="text-foreground">
                            {revision.opcion === null ? "sin responder" : inline(pregunta.opciones[revision.opcion])}
                          </span>
                        </div>
                      )}
                      {revision.opcionCorrecta !== null && revision.explicacion !== null ? (
                        <>
                          <div className="mt-1 text-[13px]">
                            <span className="text-muted-foreground">Correcta: </span>
                            <span className="font-medium">{inline(pregunta.opciones[revision.opcionCorrecta])}</span>
                          </div>
                          <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                            {inline(revision.explicacion)}
                          </p>
                        </>
                      ) : (
                        <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                          La correcta y su explicación se muestran en las preguntas que respondiste.
                        </p>
                      )}
                      <div className="mt-2 text-[12px] text-muted-foreground">
                        {pregunta.tema ? `${pregunta.tema} · ` : ""}
                        {referenciaDe(revision.referencia, pregunta.tema)}
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

  const { sesion } = estado
  const total = sesion.preguntas.length
  const actual = sesion.preguntas[idx]
  const respuesta = respuestas[actual.posicion]
  const correccion = respuesta?.correccion ?? null
  const respondida = respuesta !== undefined
  const esUltima = idx === total - 1
  const hayQueEmpezarDeNuevo =
    errorAccion?.codigo === "intento_vencido" || errorAccion?.codigo === "intento_no_encontrado"

  function responderOpcion(opcion: number): void {
    if (respondida || enviando) return
    void responder(actual.posicion, opcion)
  }

  function siguiente(): void {
    if (!esUltima) {
      setIdx(idx + 1)
      return
    }
    void terminar()
  }

  return (
    <section className="rounded-xl surface p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12px] font-medium text-muted-foreground tabular">
          Pregunta {idx + 1} de {total}
        </span>
        {actual.tema && <span className="chip">{actual.tema}</span>}
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
        {inline(actual.enunciado)}
      </h2>

      <ul className="mt-4 p-0 list-none flex flex-col gap-2" aria-busy={enviando}>
        {actual.opciones.map((op, i) => {
          const esLaBuena = correccion !== null && i === correccion.opcionCorrecta
          const revelada = correccion !== null && (i === respuesta?.opcion || esLaBuena)
          const tono = esLaBuena ? "var(--av-green-400)" : "var(--av-red-400)"
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => responderOpcion(i)}
                disabled={respondida || enviando}
                aria-pressed={i === respuesta?.opcion}
                className="w-full text-left rounded-lg border px-4 py-3 text-[15px] leading-snug transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.99] disabled:active:scale-100 disabled:cursor-default"
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

      {enviando && (
        <div className="mt-4 inline-flex items-center gap-2 text-[13px] text-muted-foreground" role="status">
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Comprobando tu respuesta...
        </div>
      )}

      {errorAccion && (
        <div className="mt-4 rounded-lg border border-border bg-muted/40 p-4 flex flex-wrap items-start gap-2.5" role="alert">
          <AlertTriangle
            className="mt-0.5 h-4 w-4 shrink-0"
            style={{ color: accentText("var(--av-amber-400)", 75) }}
            aria-hidden
          />
          <p className="m-0 min-w-0 flex-1 text-[13px] text-muted-foreground leading-relaxed">{errorAccion.message}</p>
          {hayQueEmpezarDeNuevo && (
            <button type="button" onClick={volverAEmpezar} className={appButtonClass({ variant: "secondary" })}>
              Empezar un intento nuevo
            </button>
          )}
        </div>
      )}

      {correccion && (
        <div className="mt-4 rounded-lg border border-border bg-muted/40 p-4" role="status" aria-live="polite">
          <div
            className="text-[13px] font-semibold"
            style={{
              color: accentText(correccion.correcta ? "var(--av-green-400)" : "var(--av-amber-400)", 70),
            }}
          >
            {correccion.correcta ? "Correcto" : "No es esa"}
          </div>
          <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{inline(correccion.explicacion)}</p>
          <div className="mt-2 text-[12px] text-muted-foreground">{referenciaDe(correccion.referencia, actual.tema)}</div>
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
          disabled={!respondida || hayQueEmpezarDeNuevo}
          className={appButtonClass({}, "disabled:opacity-40")}
          style={appButtonStyle()}
        >
          {esUltima ? "Ver resultado" : "Siguiente"} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  )
}
