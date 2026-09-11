/**
 * Bloques que enseñan desde la cabina: reconoce, piensa como piloto,
 * lo que te pueden preguntar y el detalle técnico plegado.
 *
 * Nacen de una auditoría del módulo de Mercancías peligrosas: el contenido
 * era correcto pero se leía como un manual, y buena parte le hablaba al
 * expedidor y no al piloto. Estos cuatro cambian el verbo. En vez de leer una
 * definición, el alumno mira una imagen y señala; en vez de estudiar un
 * artículo, decide qué haría; y la norma completa sigue estando, pero detrás
 * de un botón, para que no compita con la enseñanza.
 *
 * No saben nada de mercancías peligrosas: cualquier módulo puede usarlos.
 * Toman el acento del lector en el que estén, como el resto de los bloques.
 */

import { useId, useState } from "react"
import type { CSSProperties } from "react"
import { ArrowRight, ChevronDown, Eye, MessageSquareQuote, Target } from "lucide-react"
import type {
  DetalleTecnicoBlock,
  EntrevistaBlock,
  PiensaComoPilotoBlock,
  ReconoceBlock,
} from "@/lib/docBlocks"
import { docAccent, docTint } from "@/lib/docSheet"
import { renderInline } from "@/components/lesson/inline"
import { Ficha, VisualFicha } from "@/components/lesson/FichaPiloto"

/** El acento del lector: azul en NOTAM, amarillo en Mercancías. */
const ACENTO = "var(--av-blue-500)"

// ─── Reconoce ────────────────────────────────────────────────────────────────

/**
 * Una imagen real con puntos numerados encima. El alumno pulsa uno y lee qué
 * es, qué significa y qué le importa a él.
 *
 * Es el bloque que cambia «leer» por «reconocer». Por eso el texto no aparece
 * hasta que se pulsa: si estuviera desplegado desde el principio volveríamos a
 * tener una lista con una foto al lado.
 *
 * Los puntos se posicionan en porcentaje sobre la imagen, así que la pieza
 * aguanta cualquier ancho. Debajo va la misma botonera en fila, porque en un
 * teléfono los puntos quedan pequeños para el dedo: son los mismos botones,
 * no una alternativa degradada.
 */
export function Reconoce({ block }: { block: ReconoceBlock }) {
  const [activo, setActivo] = useState<number | null>(null)
  const base = useId()
  const punto = activo === null ? null : block.puntos[activo]

  return (
    <section
      className="overflow-hidden rounded-[10px] border"
      style={{ borderColor: docAccent(ACENTO, 26), background: docTint(ACENTO, 4) }}
      aria-label={block.titulo ?? "Reconoce lo que estás viendo"}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-4 pt-4 sm:px-5">
        <span
          className="mono inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: docAccent(ACENTO, 65) }}
        >
          <Eye className="h-3.5 w-3.5" aria-hidden /> Reconoce
        </span>
        {block.titulo && (
          <span className="text-[15px] font-semibold" style={{ color: "var(--doc-fg)" }}>
            {block.titulo}
          </span>
        )}
      </div>

      {block.intro && (
        <p className="m-0 px-4 pt-2 text-[15px] leading-[1.65] sm:px-5">{renderInline(block.intro)}</p>
      )}

      <div className="relative mt-3.5">
        <img
          src={block.imagen.src}
          alt={block.imagen.alt}
          width={block.imagen.ancho}
          height={block.imagen.alto}
          className="block w-full"
          style={{ background: "var(--ln-sunk)" }}
          loading="lazy"
          decoding="async"
        />
        {block.puntos.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActivo(activo === i ? null : i)}
            aria-pressed={activo === i}
            aria-controls={`${base}-detalle`}
            aria-label={`Punto ${i + 1}: ${p.que}`}
            className="absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[12.5px] font-bold shadow-md transition-transform hover:scale-110 sm:h-8 sm:w-8 sm:text-[13.5px]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: activo === i ? docAccent(ACENTO, 70) : "#FFFFFF",
              color: activo === i ? "#FFFFFF" : docAccent(ACENTO, 80),
              border: `2px solid ${activo === i ? "#FFFFFF" : docAccent(ACENTO, 70)}`,
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* La misma botonera, para el dedo. */}
      <div className="flex flex-wrap gap-1.5 border-t px-4 py-3 sm:px-5" style={{ borderColor: docAccent(ACENTO, 18) }}>
        {block.puntos.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActivo(activo === i ? null : i)}
            aria-pressed={activo === i}
            aria-controls={`${base}-detalle`}
            className="rounded-full border px-3 py-1 text-[13px] font-medium transition-colors"
            style={{
              borderColor: activo === i ? docAccent(ACENTO, 55) : "var(--doc-border)",
              background: activo === i ? docTint(ACENTO, 14) : "var(--doc-bg)",
              color: activo === i ? docAccent(ACENTO, 80) : "var(--doc-fg)",
            }}
          >
            <span className="mono mr-1.5 font-semibold">{i + 1}</span>
            {p.que}
          </button>
        ))}
      </div>

      <div id={`${base}-detalle`} aria-live="polite" className="px-4 pb-4 sm:px-5 sm:pb-5">
        {punto ? (
          <div className="rev-aparece-2 rounded-lg border p-3.5" style={{ borderColor: "var(--doc-border)", background: "var(--doc-bg)" }}>
            <div className="text-[15px] font-semibold" style={{ color: "var(--doc-fg)" }}>
              {punto.que}
            </div>
            <p className="m-0 mt-1.5 text-[15px] leading-[1.65]">{renderInline(punto.significa)}</p>
            <div
              className="mt-3 border-l-[3px] pl-3"
              style={{ borderColor: docAccent(ACENTO, 45) }}
            >
              <div
                className="mono text-[10px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: docAccent(ACENTO, 65) }}
              >
                Qué te importa a ti
              </div>
              <p className="m-0 mt-1 text-[15px] leading-[1.6]">{renderInline(punto.piloto)}</p>
            </div>
          </div>
        ) : (
          <p className="m-0 text-[14px] italic doc-muted">
            Pulsa un número sobre la imagen para ver qué es y por qué te importa.
          </p>
        )}
      </div>
    </section>
  )
}

// ─── Piensa como piloto ──────────────────────────────────────────────────────

/**
 * Una situación de operación con una pregunta abierta y la respuesta guardada
 * detrás de un botón.
 *
 * La respuesta va escondida a propósito: el valor está en los diez segundos en
 * que el alumno piensa qué haría. Si la lista se ve de entrada, se lee y se
 * pasa de largo.
 */
export function PiensaComoPiloto({ block }: { block: PiensaComoPilotoBlock }) {
  const [visto, setVisto] = useState(false)
  const base = useId()
  const visual =
    block.imagen || block.hueco ? <VisualFicha imagen={block.imagen} hueco={block.hueco} ves={block.ves} /> : null

  // La respuesta va al pie de la ficha, a todo el ancho. Solo existe cuando
  // se ha pedido: antes, el cuerpo termina en el botón.
  const respuesta = visto ? (
    <div id={`${base}-resp`} className="rev-aparece-2">
      {/* Con `respuesta`, la respuesta la abre una frase entera y las claves
          llevan título. Sin ella, la ficha se pinta como siempre: las demás
          fichas de los tres módulos no cambian. */}
      {block.respuesta ? (
        <p
          className="m-0 text-[17px] font-semibold leading-[1.5]"
          style={{ color: "var(--ln-ink-strong, var(--ln-ink, #16191D))" }}
        >
          {renderInline(block.respuesta)}
        </p>
      ) : (
        <div className="mono text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: docAccent(ACENTO, 65) }}>
          Lo que te interesa a ti
        </div>
      )}

      <ul className={`m-0 flex list-none flex-col p-0 ${block.respuesta ? "mt-4 gap-3.5" : "mt-2.5 gap-2"}`}>
        {block.claves.map((c, i) =>
          typeof c === "string" ? (
            <li key={i} className="flex items-start gap-2.5 text-[15px] leading-[1.6]">
              <span
                className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "var(--ln-primary, var(--av-blue-500))" }}
                aria-hidden
              />
              <span>{renderInline(c)}</span>
            </li>
          ) : (
            <li key={i} className="border-l-2 pl-3.5" style={{ borderColor: "var(--ln-primary, var(--av-blue-500))" }}>
              <div className="text-[15px] font-semibold" style={{ color: "var(--ln-primary, var(--av-blue-500))" }}>
                {c.titulo}
              </div>
              <p className="m-0 mt-0.5 text-[15px] leading-[1.6]" style={{ color: "var(--ln-ink-strong, var(--ln-ink, #16191D))" }}>
                {renderInline(c.texto)}
              </p>
            </li>
          ),
        )}
      </ul>

      {block.interesa && (
        <div className="mt-5 rounded-[12px] px-4 py-3.5" style={{ background: docTint(ACENTO, 9) }}>
          <div className="text-[13px] font-semibold" style={{ color: "var(--ln-primary, var(--av-blue-500))" }}>
            Lo que te interesa como piloto
          </div>
          <p className="m-0 mt-1 text-[15px] leading-[1.6]" style={{ color: "var(--ln-ink-strong, var(--ln-ink, #16191D))" }}>
            {renderInline(block.interesa)}
          </p>
        </div>
      )}

      {block.cierre && (
        <p
          className={`m-0 mt-4 text-[15px] leading-[1.65] ${block.respuesta ? "" : "doc-muted"}`}
          style={block.respuesta ? { color: "var(--ln-ink-strong, var(--ln-ink, #16191D))" } : undefined}
        >
          {renderInline(block.cierre)}
        </p>
      )}
    </div>
  ) : null

  return (
    <Ficha nombre="Piensa como piloto" momento={block.momento} rotulo={block.rotulo} visual={visual} pie={respuesta}>
      <div style={{ "--doc-fg": "var(--ln-primary, var(--av-blue-500))" } as CSSProperties}>
        <p className="m-0 text-[17px] leading-[1.65]" style={{ color: "var(--ln-ink-strong, var(--ln-ink, #16191D))" }}>
          {renderInline(block.situacion)}
        </p>

        {/* La pregunta, separada de la situación: es lo que el alumno tiene que
            contestarse, y en un párrafo más se perdía. */}
        <div className="mt-5 flex items-start gap-3.5 rounded-[12px] px-4 py-3.5" style={{ background: docTint(ACENTO, 9) }}>
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[17px] font-bold text-white"
            style={{ background: "var(--ln-primary, var(--av-blue-500))" }}
            aria-hidden
          >
            ?
          </span>
          <div className="min-w-0 pt-[5px]">
            <p className="m-0 text-[17px] font-semibold leading-[1.45]" style={{ color: "var(--ln-ink-strong, var(--ln-ink, #16191D))" }}>
              {renderInline(block.pregunta)}
            </p>
            {!visto && <p className="m-0 mt-1 text-[13px] doc-muted">Piénsalo antes de ver la respuesta.</p>}
          </div>
        </div>

        {!visto ? (
          <button
            type="button"
            onClick={() => setVisto(true)}
            aria-expanded={false}
            aria-controls={`${base}-resp`}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-[10px] px-5 text-[15px] font-semibold text-white transition-[filter,transform] duration-150 ease-out hover:brightness-110 active:scale-[0.98]"
            style={{ background: "var(--ln-primary, var(--av-blue-500))" }}
          >
            Piénsalo y luego mira
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        ) : null}
      </div>
    </Ficha>
  )
}

// ─── Lo que te pueden preguntar ──────────────────────────────────────────────

const NIVEL: Record<"concepto" | "interpretacion" | "situacion", string> = {
  concepto: "Concepto",
  interpretacion: "Interpretación",
  situacion: "Situación",
}

/**
 * Preguntas de entrevista en tres niveles, con la respuesta esperada plegada.
 *
 * El alumno tiene que intentar responder en voz alta antes de abrir: en una
 * entrevista nadie le va a dar cuatro opciones. Por eso no son de opción
 * múltiple, y por eso debajo de la respuesta van los conceptos que tenía que
 * haber mencionado, que es lo que de verdad puntúa el evaluador.
 */
export function Entrevista({ block }: { block: EntrevistaBlock }) {
  return (
    <section
      className="rounded-[10px] border p-4 sm:p-5"
      style={{ borderColor: docAccent(ACENTO, 26), background: docTint(ACENTO, 4) }}
      aria-label="Lo que te pueden preguntar en una entrevista"
    >
      <div
        className="mono inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: docAccent(ACENTO, 65) }}
      >
        <MessageSquareQuote className="h-3.5 w-3.5" aria-hidden />
        {block.titulo ?? "Lo que te pueden preguntar"}
      </div>
      {block.intro && (
        <p className="m-0 mt-2 text-[15px] leading-[1.65] doc-muted">{renderInline(block.intro)}</p>
      )}
      <div className="mt-3 flex flex-col gap-2.5">
        {block.preguntas.map((p, i) => (
          <PreguntaEntrevista key={i} pregunta={p} />
        ))}
      </div>
    </section>
  )
}

function PreguntaEntrevista({ pregunta }: { pregunta: EntrevistaBlock["preguntas"][number] }) {
  const [abierta, setAbierta] = useState(false)
  const base = useId()

  return (
    <div
      className="rounded-lg border"
      style={{ borderColor: "var(--doc-border)", background: "var(--doc-bg)" }}
    >
      <button
        type="button"
        onClick={() => setAbierta((v) => !v)}
        aria-expanded={abierta}
        aria-controls={`${base}-r`}
        className="flex w-full items-start gap-2.5 px-3.5 py-3 text-left"
      >
        <span
          className="mono mt-[3px] shrink-0 rounded-[4px] px-1.5 py-[2px] text-[9.5px] font-semibold uppercase tracking-[0.1em]"
          style={{ background: docTint(ACENTO, 14), color: docAccent(ACENTO, 75) }}
        >
          {NIVEL[pregunta.nivel]}
        </span>
        <span className="min-w-0 flex-1 text-[15px] font-medium leading-[1.6]" style={{ color: "var(--doc-fg)" }}>
          {renderInline(pregunta.q)}
        </span>
        <ChevronDown
          className="mt-[3px] h-4 w-4 shrink-0 transition-transform"
          style={{ transform: abierta ? "rotate(180deg)" : undefined, color: "var(--doc-muted)" }}
          aria-hidden
        />
      </button>
      {abierta && (
        <div id={`${base}-r`} className="rev-aparece-2 border-t px-3.5 py-3" style={{ borderColor: "var(--doc-border)" }}>
          <div
            className="mono text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: docAccent(ACENTO, 65) }}
          >
            Respuesta esperada
          </div>
          <p className="m-0 mt-1.5 text-[15px] leading-[1.65]">{renderInline(pregunta.respuesta)}</p>
          {pregunta.claves && pregunta.claves.length > 0 && (
            <div className="mt-3">
              <div className="mono text-[10px] font-semibold uppercase tracking-[0.14em] doc-muted">
                Tenías que mencionar
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {pregunta.claves.map((c, i) => (
                  <span
                    key={i}
                    className="rounded-full border px-2.5 py-[3px] text-[12.5px]"
                    style={{ borderColor: docAccent(ACENTO, 30), color: "var(--doc-fg)" }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
          {pregunta.ref && (
            <div className="mono mt-3 text-[11px] doc-muted">{pregunta.ref}</div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Detalle técnico ─────────────────────────────────────────────────────────

/**
 * La capa de consulta: la norma completa, plegada.
 *
 * La regla del módulo es que el alumno aprenda primero y profundice después.
 * Nada se borra por ser extenso; lo que pasa es que deja de competir con la
 * enseñanza por el mismo espacio de pantalla. Dentro caben los mismos bloques
 * de siempre, así que una tabla o una ficha se mueven aquí sin reescribirse.
 */
export function DetalleTecnico({
  etiqueta,
  cita,
  children,
}: {
  etiqueta?: string
  cita?: string
  children: React.ReactNode
}) {
  const [abierto, setAbierto] = useState(false)
  const base = useId()

  return (
    <div
      className="overflow-hidden rounded-[10px] border"
      style={{ borderColor: "var(--doc-border)", background: "var(--doc-bg)" }}
    >
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls={`${base}-c`}
        className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left"
      >
        <Target className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--doc-muted)" }} aria-hidden />
        <span className="mono flex-1 text-[11.5px] font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--doc-fg)" }}>
          {etiqueta ?? "Ver detalle técnico"}
        </span>
        {cita && <span className="mono text-[11px] doc-muted">{cita}</span>}
        <ChevronDown
          className="h-4 w-4 shrink-0 transition-transform"
          style={{ transform: abierto ? "rotate(180deg)" : undefined, color: "var(--doc-muted)" }}
          aria-hidden
        />
      </button>
      {abierto && (
        <div
          id={`${base}-c`}
          className="rev-aparece-2 flex flex-col gap-4 border-t px-3.5 py-4"
          style={{ borderColor: "var(--doc-border)" }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export type { DetalleTecnicoBlock }
