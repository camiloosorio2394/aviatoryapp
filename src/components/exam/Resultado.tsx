import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ChevronDown, ChevronUp } from "lucide-react"
import { LogoIsotype } from "@/components/Logo"
import { Rotulo } from "@/components/ui/rotulo"
import { accentText } from "@/lib/tileColors"
import type {
  PreguntaEvaluacion,
  ResultadoEvaluacion,
  RevisionPregunta,
  SesionEvaluacion,
} from "@/services/evaluaciones"
import type { ExamenConfig } from "@/components/exam/tipos"
import { fmtTime, mix } from "@/components/exam/formato"
import { AttemptHistory } from "@/components/exam/Historial"

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

export interface ResultProps {
  config: ExamenConfig
  sesion: SesionEvaluacion
  resultado: ResultadoEvaluacion
  userId: string | null
  sessionLoading: boolean
  onRetry: () => void
}

export function Result({ config, sesion, resultado, userId, sessionLoading, onRetry }: ResultProps) {
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

export function Filete({ className = "" }: { className?: string }) {
  return <div className={`h-px ${className}`} style={{ background: mix("var(--border)", 75) }} aria-hidden="true" />
}

export function Dato({ rotulo, valor, color }: { rotulo: string; valor: string; color?: string }) {
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
export function Respuesta({ glifo, color, children }: { glifo: string; color: string; children: ReactNode }) {
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

export function Explicacion({ acento, texto, referencia }: { acento: string; texto: string; referencia?: string }) {
  return (
    <div className="mt-3 rounded-r-[10px] border-l-2 bg-muted/40 py-5 pl-5 pr-5" style={{ borderColor: mix(acento, 38) }}>
      <p className="max-w-[64ch] text-[15px] leading-[1.75] text-foreground/90">{texto}</p>
      {referencia && <p className="mono mt-3 text-[11px] text-muted-foreground">{referencia}</p>}
    </div>
  )
}

export function NotaDeReferencia({ texto }: { texto: string }) {
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
export function ReviewItem({ acento, n, pregunta, revision }: { acento: string; n: number; pregunta: PreguntaEvaluacion; revision: RevisionPregunta }) {
  const ok = revision.correcta
  const [open, setOpen] = useState(!ok)
  const marca = ok ? acento : "var(--av-wine-500)"
  const textoMarca = ok ? accentText(acento) : "var(--av-wine-fg)"
  const elegida = revision.opcion !== null ? pregunta.opciones[revision.opcion] : null
  const correcta = revision.opcionCorrecta === null ? null : pregunta.opciones[revision.opcionCorrecta]

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
              {correcta !== null && (
                <div className="mt-6">
                  <Rotulo>Respuesta correcta</Rotulo>
                  <Respuesta glifo="✓" color={acento}>
                    {correcta}
                  </Respuesta>
                </div>
              )}
            </>
          )}

          {revision.explicacion !== null ? (
            <div className="mt-6">
              <Rotulo>Explicación</Rotulo>
              <Explicacion acento={acento} texto={revision.explicacion} referencia={revision.referencia ?? undefined} />
            </div>
          ) : (
            <p className="mt-6 max-w-[62ch] text-[13px] leading-relaxed text-muted-foreground">
              La respuesta correcta y su explicación se muestran en las preguntas que respondiste.
            </p>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}

export function NextStepLink({ acento, to, title, detail }: { acento: string; to: string; title: string; detail: string }) {
  return (
    <Link to={to} className="rounded-[10px] border-l-2 bg-muted/25 py-4 pl-4 pr-4 transition-colors hover:bg-muted/50" style={{ borderColor: acento }}>
      <div className="text-[15px] font-semibold" style={{ letterSpacing: "-0.01em" }}>
        {title}
      </div>
      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{detail}</p>
    </Link>
  )
}
