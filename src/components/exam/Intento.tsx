import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
} from "lucide-react"
import { useEvaluacion } from "@/hooks/useEvaluacion"
import { subirArriba } from "@/lib/motion"
import { accentText } from "@/lib/tileColors"
import type { ExamenConfig } from "@/components/exam/tipos"
import { OPTION_LETTERS, fmtTime, mix } from "@/components/exam/formato"
import { Cargando } from "@/components/exam/PuertaCerrada"
import { Result } from "@/components/exam/Resultado"

// ─── Intento ─────────────────────────────────────────────────────────────────

export function Intento({
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
export function ErrorDeEvaluacion({
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
export function OptionButton({
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
