import { useState } from "react"
import { Check, CheckCircle2, Eye, Loader2 } from "lucide-react"
import { renderInline } from "@/components/lesson/inline"
import { accentText } from "@/lib/tileColors"
import type { EscenarioAero, PreguntaEntrevistaAero } from "@/lib/aerodinamicaPractica"

/** El acento del módulo: azul acero. */
export const ACENTO = "var(--av-ae-700)"

const RESUELTO = "var(--av-green-400)"

/**
 * Las dos piezas de la práctica de Aerodinámica: el escenario de aplicación y
 * la pregunta de entrevista.
 *
 * Las dos siguen la misma regla del documento: el piloto piensa su respuesta
 * antes de verla. Nada se despliega solo, y desplegarlo es lo que marca el
 * ejercicio como hecho. Hablan el idioma visual de la práctica de Mercancías;
 * van aparte porque aquélla lleva su acento dentro.
 */

function Marcado() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
      style={{
        color: accentText(RESUELTO),
        background: `color-mix(in oklab, ${RESUELTO} 12%, transparent)`,
        border: `1px solid color-mix(in oklab, ${RESUELTO} 35%, transparent)`,
      }}
    >
      <CheckCircle2 className="h-3.5 w-3.5" /> Hecho
    </span>
  )
}

function BotonVer({
  texto,
  onClick,
  guardando,
}: {
  texto: string
  onClick: () => void
  guardando: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={guardando}
      className="inline-flex min-h-[44px] items-center gap-2 rounded-[10px] px-5 text-[14.5px] font-semibold text-white transition-[filter] hover:brightness-110 disabled:opacity-60"
      style={{ background: ACENTO }}
    >
      {guardando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
      {texto}
    </button>
  )
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <div className="rotulo text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
      {children}
    </div>
  )
}

// ─── Escenario de aplicación ────────────────────────────────────────────────

export function EscenarioAplicacion({
  escenario,
  n,
  total,
  hecho,
  guardando,
  onVer,
}: {
  escenario: EscenarioAero
  n: number
  total: number
  hecho: boolean
  guardando: boolean
  onVer: () => void
}) {
  const [abierto, setAbierto] = useState(hecho)

  return (
    <article className="rounded-2xl surface p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Rotulo>
          Escenario {n} de {total} · {escenario.temas.join(" · ")}
        </Rotulo>
        {hecho && <Marcado />}
      </div>

      <h2 className="mt-2 mb-0 text-[20px] font-semibold leading-snug text-foreground sm:text-[23px]">
        {escenario.titulo}
      </h2>

      <p className="mt-3 mb-0 text-[16px] leading-[1.7] text-foreground/90">
        {renderInline(escenario.situacion)}
      </p>

      <div className="mt-5">
        <Rotulo>Preguntas</Rotulo>
        <ol className="m-0 mt-2 list-decimal space-y-2 pl-5">
          {escenario.preguntas.map((p, i) => (
            <li key={i} className="pl-1 text-[16px] leading-[1.6] text-foreground">
              {renderInline(p)}
            </li>
          ))}
        </ol>
      </div>

      {!abierto ? (
        <div className="mt-6">
          <p className="mb-3 mt-0 text-[13.5px] text-muted-foreground">
            Piensa tus tres respuestas antes de abrir el análisis.
          </p>
          <BotonVer
            texto="Ver análisis"
            guardando={guardando}
            onClick={() => {
              setAbierto(true)
              onVer()
            }}
          />
        </div>
      ) : (
        <div
          className="mt-6 rounded-xl border p-4 sm:p-5"
          style={{
            borderColor: `color-mix(in oklab, ${ACENTO} 30%, transparent)`,
            background: `color-mix(in oklab, ${ACENTO} 6%, transparent)`,
          }}
        >
          <Rotulo>Análisis</Rotulo>
          <ol className="m-0 mt-2 list-decimal space-y-2.5 pl-5">
            {escenario.analisis.map((a, i) => (
              <li key={i} className="pl-1 text-[16px] leading-[1.65] text-foreground">
                {renderInline(a)}
              </li>
            ))}
          </ol>
        </div>
      )}
    </article>
  )
}

// ─── Pregunta de entrevista ─────────────────────────────────────────────────

export function PreguntaEntrevista({
  pregunta,
  n,
  total,
  hecho,
  guardando,
  onVer,
}: {
  pregunta: PreguntaEntrevistaAero
  n: number
  total: number
  hecho: boolean
  guardando: boolean
  onVer: () => void
}) {
  const [elegida, setElegida] = useState<number | null>(null)
  const [abierto, setAbierto] = useState(hecho)
  const conOpciones = Array.isArray(pregunta.opciones) && pregunta.opciones.length > 0

  return (
    <article className="rounded-2xl surface p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Rotulo>
          {n} de {total} · {pregunta.temas.join(" · ")}
        </Rotulo>
        {hecho && <Marcado />}
      </div>

      <h2 className="mt-2 mb-0 text-[20px] font-semibold leading-snug text-foreground sm:text-[23px]">
        {pregunta.titulo}
      </h2>

      <p className="mt-3 mb-0 text-[16px] leading-[1.7] text-foreground/90">
        {renderInline(pregunta.pregunta)}
      </p>

      {conOpciones && (
        <ul className="m-0 mt-4 list-none space-y-2 p-0">
          {pregunta.opciones?.map((o, i) => {
            const marcada = elegida === i
            const esLaBuena = abierto && i === pregunta.correcta
            const falloElegido = abierto && marcada && i !== pregunta.correcta
            const color = esLaBuena ? RESUELTO : falloElegido ? "var(--av-wine-500)" : ACENTO
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => !abierto && setElegida(i)}
                  disabled={abierto}
                  aria-pressed={marcada}
                  className="flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors disabled:cursor-default"
                  style={{
                    borderColor:
                      marcada || esLaBuena
                        ? `color-mix(in oklab, ${color} 45%, transparent)`
                        : "var(--border)",
                    background:
                      marcada || esLaBuena
                        ? `color-mix(in oklab, ${color} 9%, transparent)`
                        : "transparent",
                  }}
                >
                  <span
                    className="tabular mt-0.5 shrink-0 text-[12.5px] font-semibold"
                    style={{ color: marcada || esLaBuena ? color : "var(--muted-foreground)" }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="min-w-0 flex-1 text-[15.5px] leading-[1.55] text-foreground">
                    {renderInline(o)}
                  </span>
                  {esLaBuena && <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />}
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {!abierto ? (
        <div className="mt-6">
          <p className="mb-3 mt-0 text-[13.5px] text-muted-foreground">
            {conOpciones
              ? "Elige y luego mira la respuesta. Di en voz alta la definición, la relación física y un ejemplo operacional."
              : "Responde en voz alta: definición en una frase, la relación física clave y un ejemplo operacional. Treinta a sesenta segundos."}
          </p>
          <BotonVer
            texto="Ver respuesta"
            guardando={guardando}
            onClick={() => {
              setAbierto(true)
              onVer()
            }}
          />
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div
            className="rounded-xl border p-4 sm:p-5"
            style={{
              borderColor: `color-mix(in oklab, ${ACENTO} 30%, transparent)`,
              background: `color-mix(in oklab, ${ACENTO} 6%, transparent)`,
            }}
          >
            <Rotulo>Respuesta</Rotulo>
            <p className="mt-2 mb-0 text-[16px] leading-[1.65] text-foreground">
              {renderInline(pregunta.respuesta)}
            </p>
          </div>

          <div>
            <Rotulo>Explicación</Rotulo>
            <p className="mt-2 mb-0 text-[15.5px] leading-[1.65] text-foreground/90">
              {renderInline(pregunta.explicacion)}
            </p>
          </div>

          <div
            className="rounded-xl border-l-[3px] py-1 pl-4"
            style={{ borderLeftColor: ACENTO }}
          >
            <Rotulo>Punto que debes recordar</Rotulo>
            <p className="mt-1.5 mb-0 text-[16px] leading-[1.6] font-medium text-foreground">
              {renderInline(pregunta.punto)}
            </p>
          </div>
        </div>
      )}
    </article>
  )
}
