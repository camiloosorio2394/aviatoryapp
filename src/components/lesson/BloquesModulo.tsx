/**
 * Bloques de curso: norma, caso real, en la operación, escenario, pon a prueba
 * y fichas.
 *
 * Los estrenó Mercancías peligrosas y no saben nada de mercancías: pintan lo
 * que cualquier módulo necesita para citar una norma con su artículo, contar un
 * accidente con su fuente, bajar un concepto a la operación y comprobar que se
 * entendió. Comparten los colores del papel (`--doc-*`) y el acento del lector
 * en el que estén, así que en NOTAM salen azules y en Mercancías, amarillos,
 * sin que la lección lo diga.
 */

import { useState } from "react"
import type { CSSProperties } from "react"
import { BookMarked, ChevronDown, ClipboardList, Globe2, HelpCircle, MapPin, Quote } from "lucide-react"
import type {
  CasoRealBlock,
  EnLaOperacionBlock,
  EscenarioBlock,
  FichasBlock,
  NaturalezaNorma,
  NormaBlock,
  PonAPruebaBlock,
} from "@/lib/docBlocks"
import { docAccent, docTint } from "@/lib/docSheet"
import { renderInline } from "@/components/lesson/inline"
import { HuecoImagen } from "@/components/lesson/HuecoImagen"
import { Ficha, VisualFicha } from "@/components/lesson/FichaPiloto"

/** El acento del lector. Se re-ancla por tema: azul en NOTAM, amarillo en Mercancías. */
const ACENTO = "var(--av-blue-500)"

// ─── Norma ───────────────────────────────────────────────────────────────────

const NATURALEZA: Record<NaturalezaNorma, string> = {
  requisito: "Requisito",
  recomendacion: "Recomendación",
  explotador: "Procedimiento del explotador",
  practica: "Buena práctica",
  pedagogico: "Explicación del curso",
}

/**
 * La norma citada, con la referencia delante y la naturaleza de lo que dice.
 * Es la pieza que respalda: el texto va tal cual, sin adjetivos, y el artículo
 * a la vista para que el piloto pueda ir a comprobarlo.
 */
/**
 * Una pastilla de cita, rotulada con el organismo del que viene.
 *
 * Van de lo mundial a lo nacional para que se lea la cadena: la OACI fija el
 * estándar, el SRVSOP lo convierte en LAR y cada Estado publica su reglamento.
 * La nacional va tenue a propósito: es un ejemplo, no la norma del alumno.
 */
function Cita({
  icono: Icono,
  origen,
  texto,
  fuerte,
  tenue,
}: {
  icono: typeof BookMarked
  origen: string
  texto: string
  fuerte?: boolean
  tenue?: boolean
}) {
  return (
    <span
      className="mono inline-flex items-center gap-1.5 rounded-[4px] px-2 py-[3px] text-[11px] tracking-[0.06em]"
      style={
        tenue
          ? {
              border: `1px solid ${docTint(ACENTO, 30)}`,
              color: "var(--doc-muted, #6B7280)",
            }
          : {
              background: docTint(ACENTO, fuerte ? 16 : 9),
              color: docAccent(ACENTO, fuerte ? 80 : 66),
            }
      }
    >
      <Icono className="h-3 w-3 shrink-0" aria-hidden />
      <span className="font-semibold uppercase tracking-[0.1em] opacity-70">{origen}</span>
      <span className="font-semibold">{texto}</span>
    </span>
  )
}

export function Norma({ block }: { block: NormaBlock }) {
  const nat = block.naturaleza ?? "requisito"
  return (
    <div
      className="doc-soft border-l-[3px] px-5 py-4 sm:px-6 sm:py-5"
      style={{ borderLeftColor: "var(--doc-accent)" }}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        {block.oaci && <Cita icono={Globe2} origen="OACI" texto={block.oaci} />}
        <Cita icono={BookMarked} origen="SRVSOP" texto={block.ref} fuerte />
        {block.rac && <Cita icono={MapPin} origen="Colombia" texto={block.rac} tenue />}
        <span className="mono text-[10.5px] font-semibold uppercase tracking-[0.12em] doc-muted">
          {NATURALEZA[nat]}
        </span>
      </div>
      {block.titulo && (
        <div className="mt-2.5 text-[15px] font-semibold" style={{ color: "var(--doc-fg)" }}>
          {block.titulo}
        </div>
      )}
      <p
        className="m-0 mt-2 text-[15.5px] leading-[1.65]"
        style={{ color: "var(--ln-ink-strong, var(--doc-fg))" }}
      >
        {renderInline(block.texto)}
      </p>
    </div>
  )
}

// ─── Caso real ───────────────────────────────────────────────────────────────

/**
 * Un accidente o incidente real, con su fuente al pie.
 *
 * La estructura es fija a propósito (qué se transportaba, qué ocurrió,
 * consecuencia, lo que enseña) para que los casos se lean igual en cualquier
 * lección y el piloto sepa dónde buscar cada cosa. Va sobre navy en la
 * cabecera para separarlo del resto de la hoja: es un documento dentro del
 * documento.
 */
export function CasoReal({ block }: { block: CasoRealBlock }) {
  const meta = [block.fecha, block.aeronave, block.lugar].filter(Boolean).join(" · ")
  return (
    <section
      className="overflow-hidden rounded-[10px] border"
      style={{ borderColor: "var(--ln-hair-strong, var(--doc-border))" }}
      aria-label={`Caso real: ${block.titulo}`}
    >
      <div
        className="px-5 py-4 sm:px-6 sm:py-5"
        style={{ background: "var(--ln-navy, #14202E)" }}
      >
        <div
          className="mono text-[10.5px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: "var(--ln-navy-label, #8FA1B6)" }}
        >
          Caso real
        </div>
        <h3
          className="ln-display m-0 mt-1.5 text-[24px] font-semibold leading-[1.1] sm:text-[28px]"
          style={{ color: "#FFFFFF" }}
        >
          {block.titulo}
        </h3>
        <div className="mt-2 text-[13px]" style={{ color: "var(--ln-navy-text, #B9C4D0)" }}>
          {meta}
        </div>
      </div>

      {block.imagen ? (
        <div className="border-b" style={{ borderColor: "var(--ln-hair, var(--doc-border))" }}>
          <img
            src={block.imagen.src}
            alt={block.imagen.alt}
            className="block w-full"
            style={{ aspectRatio: "16 / 9", objectFit: "cover", background: "var(--ln-sunk)" }}
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        block.hueco && (
          <div className="border-b" style={{ borderColor: "var(--ln-hair, var(--doc-border))" }}>
            <HuecoImagen
              rotulo={`${block.hueco.id} · ${block.hueco.medida}`}
              descripcion={block.hueco.descripcion}
              alto={300}
              ratio="16 / 9"
            />
          </div>
        )
      )}

      <div className="px-5 py-5 sm:px-6" style={{ background: "var(--doc-bg)" }}>
        <dl className="m-0 grid gap-x-5 gap-y-1 sm:grid-cols-[150px_1fr]">
          <dt className="mono text-[11px] font-semibold uppercase tracking-[0.12em] doc-muted">
            Qué se transportaba
          </dt>
          <dd className="m-0 text-[15px] leading-[1.6]">{renderInline(block.mercancia)}</dd>
        </dl>

        <div className="mt-4 flex flex-col gap-3">
          {block.queOcurrio.map((p, i) => (
            <p key={i} className="m-0 text-[15px] leading-[1.7]">
              {renderInline(p)}
            </p>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="doc-soft rounded-[8px] px-4 py-3.5">
            <div className="mono text-[11px] font-semibold uppercase tracking-[0.12em] doc-muted">
              Consecuencia
            </div>
            <p className="m-0 mt-1.5 text-[14.5px] leading-[1.6]">{renderInline(block.consecuencia)}</p>
          </div>
          <div
            className="rounded-[8px] px-4 py-3.5"
            style={{ background: docTint(ACENTO, 9), border: `1px solid ${docAccent(ACENTO, 22)}` }}
          >
            <div
              className="mono text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: docAccent(ACENTO, 70) }}
            >
              Lo que un piloto debe reconocer
            </div>
            <p className="m-0 mt-1.5 text-[14.5px] leading-[1.6]">{renderInline(block.leccion)}</p>
          </div>
        </div>

        {block.cita && (
          <blockquote
            className="m-0 mt-4 border-l-2 pl-4"
            style={{ borderColor: docAccent(ACENTO, 35) }}
          >
            <p className="m-0 flex gap-2 text-[14px] italic leading-[1.6]">
              <Quote className="mt-[3px] h-3.5 w-3.5 shrink-0 doc-muted" aria-hidden />
              <span>{block.cita.texto}</span>
            </p>
            <div className="mt-1.5 text-[12.5px] doc-muted">{block.cita.de}</div>
          </blockquote>
        )}

        <div
          className="mono mt-4 border-t pt-3 text-[11px] leading-[1.5] doc-muted"
          style={{ borderColor: "var(--doc-border)" }}
        >
          Fuente: {block.fuente}
        </div>
      </div>
    </section>
  )
}

// ─── En la operación ─────────────────────────────────────────────────────────

/** El concepto, bajado al momento real del trabajo: briefing, rampa, vuelo. */
export function EnLaOperacion({ block }: { block: EnLaOperacionBlock }) {
  const visual =
    block.imagen || block.hueco ? <VisualFicha imagen={block.imagen} hueco={block.hueco} ves={block.ves} /> : null

  return (
    <Ficha nombre="En la operación" momento={block.momento} rotulo={block.rotulo} visual={visual}>
      {/* La negrita va del acento del módulo: son las palabras que hay que
          llevarse, y en la maqueta se leían antes que el resto. */}
      <div style={{ "--doc-fg": "var(--ln-primary, var(--av-blue-500))" } as CSSProperties}>
        <p className="m-0 text-[17px] leading-[1.65]" style={{ color: "var(--ln-ink-strong, var(--ln-ink, #16191D))" }}>
          {renderInline(block.texto)}
        </p>
        {block.pasos && block.pasos.length > 0 && (
          <ol className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0">
            {block.pasos.map((p, i) => (
              <li key={i} className="grid grid-cols-[28px_1fr] gap-3 text-[15px] leading-[1.6]">
                <span
                  className="mt-[1px] flex h-[24px] w-[24px] items-center justify-center rounded-full text-[12px] font-semibold text-white tabular-nums"
                  style={{ background: "var(--ln-primary, var(--av-blue-500))" }}
                >
                  {i + 1}
                </span>
                <span>{renderInline(p)}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </Ficha>
  )
}

// ─── Escenario de práctica ───────────────────────────────────────────────────

/**
 * Escenario construido para el curso. Rotulado como tal, con las preguntas
 * cerradas: el alumno decide y después abre la respuesta.
 */
export function Escenario({ block }: { block: EscenarioBlock }) {
  const [abiertas, setAbiertas] = useState<number[]>([])
  const toggle = (i: number) =>
    setAbiertas((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))

  return (
    <section
      className="rounded-[10px] border"
      style={{ borderColor: "var(--ln-hair-strong, var(--doc-border))" }}
      aria-label={`Escenario de práctica: ${block.titulo}`}
    >
      <div
        className="border-b px-5 py-4 sm:px-6"
        style={{ borderColor: "var(--doc-border)", background: "var(--doc-soft)" }}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span
            className="mono inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--ln-caution, #B45309)" }}
          >
            <ClipboardList className="h-3.5 w-3.5" aria-hidden /> Escenario de práctica
          </span>
        </div>
        <h3
          className="ln-display m-0 mt-1.5 text-[22px] font-semibold leading-[1.12]"
          style={{ color: "var(--doc-fg)" }}
        >
          {block.titulo}
        </h3>
        <p className="m-0 mt-2.5 text-[15px] leading-[1.7]">{renderInline(block.situacion)}</p>
      </div>

      <ol className="m-0 list-none p-0">
        {block.preguntas.map((pq, i) => {
          const on = abiertas.includes(i)
          return (
            <li
              key={i}
              className="border-b last:border-b-0"
              style={{ borderColor: "var(--doc-border)" }}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={on}
                className="grid w-full grid-cols-[26px_1fr_18px] items-start gap-3 px-5 py-3.5 text-left sm:px-6"
              >
                <span
                  className="mono mt-[2px] flex h-[22px] w-[22px] items-center justify-center rounded-[5px] text-[11px] font-semibold"
                  style={{ background: docTint(ACENTO, 14), color: docAccent(ACENTO, 80) }}
                >
                  {i + 1}
                </span>
                <span className="text-[15px] font-medium leading-[1.55]" style={{ color: "var(--doc-fg)" }}>
                  {pq.q}
                </span>
                <ChevronDown
                  className="mt-[3px] h-4 w-4 transition-transform duration-150 doc-muted"
                  style={{ transform: on ? "rotate(180deg)" : "none" }}
                  aria-hidden
                />
              </button>
              {on && (
                <div className="rev-aparece px-5 pb-4 pl-[58px] sm:px-6 sm:pl-[62px]">
                  <p className="m-0 text-[14.5px] leading-[1.7]">{renderInline(pq.a)}</p>
                </div>
              )}
            </li>
          )
        })}
      </ol>

      <div
        className="border-t px-5 py-3 sm:px-6"
        style={{ borderColor: "var(--doc-border)" }}
      >
        {block.concepto && (
          <div className="text-[13.5px] leading-[1.55]">
            <span className="font-semibold" style={{ color: docAccent(ACENTO, 75) }}>
              Concepto que aplica:{" "}
            </span>
            {renderInline(block.concepto)}
          </div>
        )}
        <p className="mono m-0 mt-1.5 text-[11px] leading-[1.5] doc-muted">
          Escenario construido con fines formativos. No es un documento real ni sustituye los
          procedimientos del manual de operaciones del explotador.
        </p>
      </div>
    </section>
  )
}

// ─── Pon a prueba lo que aprendiste ──────────────────────────────────────────

/**
 * Preguntas con retroalimentación por opción.
 *
 * Como el `check` de NOTAM, no guarda ni puntúa: corta la lectura y pide usar
 * lo que se acaba de leer. La diferencia es que cada opción trae su propia
 * explicación: al fallar, el alumno lee por qué ESA no era, no solo cuál era.
 */
export function PonAPrueba({ block }: { block: PonAPruebaBlock }) {
  return (
    <section
      className="rounded-[10px] border p-4 sm:p-5"
      style={{ borderColor: docAccent(ACENTO, 26), background: docTint(ACENTO, 5) }}
      aria-label={block.titulo ?? "Pon a prueba lo que aprendiste"}
    >
      <div
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
        style={{ color: docAccent(ACENTO, 60) }}
      >
        <HelpCircle className="h-3.5 w-3.5" aria-hidden />
        {block.titulo ?? "Pon a prueba lo que aprendiste"}
      </div>
      <div className="mt-3 flex flex-col gap-5">
        {block.preguntas.map((p, i) => (
          <Pregunta key={i} n={block.preguntas.length > 1 ? i + 1 : undefined} pregunta={p} />
        ))}
      </div>
    </section>
  )
}

function Pregunta({
  n,
  pregunta,
}: {
  n?: number
  pregunta: PonAPruebaBlock["preguntas"][number]
}) {
  const [picked, setPicked] = useState<number | null>(null)
  const correcta = pregunta.opciones.findIndex((o) => o.ok)
  const acerto = picked !== null && picked === correcta

  return (
    <div>
      <p className="m-0 text-[15px] leading-[1.7]">
        {n !== undefined && (
          <span className="mono mr-2 text-[12.5px] font-semibold" style={{ color: docAccent(ACENTO, 70) }}>
            {n}.
          </span>
        )}
        {renderInline(pregunta.q)}
      </p>
      <ul className="mt-3 mb-0 flex list-none flex-col gap-2 p-0">
        {pregunta.opciones.map((op, i) => {
          const elegida = picked === i
          const esLaBuena = i === correcta
          // Al responder se marca la elegida y, si falló, también la correcta.
          const revelada = picked !== null && (elegida || esLaBuena)
          const tono = esLaBuena ? "var(--av-green-400)" : "var(--av-red-400)"
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => setPicked(i)}
                aria-pressed={elegida}
                className="w-full rounded-lg border px-3.5 py-2.5 text-left text-[15px] leading-[1.55] transition-colors"
                style={{
                  borderColor: revelada ? docAccent(tono, 45) : "var(--doc-border)",
                  background: revelada ? docTint(tono, 10) : "var(--doc-bg)",
                  color: "var(--doc-fg)",
                }}
              >
                <span className="flex items-start gap-2.5">
                  <span
                    className="mono shrink-0 text-[13px] font-semibold"
                    style={{ color: revelada ? docAccent(tono, 60) : "var(--doc-muted)" }}
                  >
                    {String.fromCharCode(97 + i)}
                  </span>
                  <span className="min-w-0">{renderInline(op.t)}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {picked !== null && (
        <div
          className="rev-aparece mt-3 border-t pt-3 text-[15px] leading-[1.7]"
          style={{ borderColor: "var(--doc-border)" }}
          role="status"
          aria-live="polite"
        >
          <span
            className="font-semibold"
            style={{ color: docAccent(acerto ? "var(--av-green-400)" : "var(--av-amber-400)", 60) }}
          >
            {acerto ? "Correcto. " : "No es esa. "}
          </span>
          {renderInline(pregunta.opciones[picked].fb)}
          {pregunta.ref && (
            <div className="mono mt-2 text-[11px] doc-muted">Referencia: {pregunta.ref}</div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Fichas ──────────────────────────────────────────────────────────────────

/** Fichas con título, referencia y puntos. Sirven para actores, términos y comparaciones. */
/**
 * Ficha de vocabulario con imagen: foto arriba, el término, lo que dice el
 * reglamento y lo que significa para el piloto.
 *
 * Nació para la sección 3 de Mercancías, donde Camilo pidió las dos
 * definiciones juntas. La técnica va primero y literal, con su artículo; la del
 * piloto después, porque se entiende mejor sabiendo qué traduce.
 *
 * Los rótulos de dentro van en frase y no en mono mayúscula: sobre papel, en
 * pequeño, la mono se leía como hecha a máquina.
 */
function FichaConImagen({ item }: { item: FichasBlock["items"][number] }) {
  return (
    <article
      className="flex flex-col overflow-hidden rounded-[14px] border"
      style={{
        borderColor: "var(--ln-hair, var(--doc-border))",
        // El papel del lector, por lo mismo que en FichaPiloto: con --doc-bg salía
        // gris en modo oscuro sobre la página blanca.
        background: "var(--ln-paper, var(--doc-bg))",
        boxShadow: "0 1px 2px rgb(22 25 29 / 5%), 0 10px 28px -20px rgb(22 25 29 / 22%)",
      }}
    >
      {item.imagen ? (
        <img
          src={item.imagen.src}
          alt={item.imagen.alt}
          loading="lazy"
          decoding="async"
          className="block aspect-[3/2] w-full object-cover"
          style={{ background: "var(--ln-sunk)" }}
        />
      ) : (
        item.hueco && (
          <div className="border-b" style={{ borderColor: "var(--ln-hair, var(--doc-border))" }}>
            <HuecoImagen
              rotulo={`${item.hueco.id} · ${item.hueco.medida}`}
              descripcion={item.hueco.descripcion}
              alto={220}
              ratio="3 / 2"
            />
          </div>
        )
      )}

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6">
        <h3 className="ln-display m-0 text-[22px] font-semibold" style={{ lineHeight: 1.15, color: "var(--doc-fg)" }}>
          {item.titulo}
        </h3>

        {item.tecnica && (
          <div className="mt-3.5">
            <div className="text-[13px] font-semibold" style={{ color: "var(--ln-primary, var(--av-blue-500))" }}>
              {item.tecnica.rotulo ?? "Definición técnica"}
              <span className="font-normal doc-muted"> · {item.tecnica.ref}</span>
            </div>
            <p
              className="m-0 mt-1.5 border-l-2 pl-3 text-[14px] leading-[1.55]"
              style={{ borderColor: docAccent(ACENTO, 40), color: "var(--ln-ink-strong, var(--doc-fg))" }}
            >
              {item.tecnica.texto}
            </p>
            {item.tecnica.nota && (
              <p className="m-0 mt-1.5 pl-3.5 text-[12.5px] leading-[1.5] doc-muted">{renderInline(item.tecnica.nota)}</p>
            )}
          </div>
        )}

        <div className="mt-4 border-t pt-3.5" style={{ borderColor: "var(--ln-hair, var(--doc-border))" }}>
          <div className="text-[13px] font-semibold" style={{ color: "var(--ln-primary, var(--av-blue-500))" }}>
            En palabras de piloto
          </div>
          <ul className="m-0 mt-2 flex list-none flex-col gap-2 p-0">
            {item.puntos.map((p, j) => (
              <li key={j} className="grid grid-cols-[7px_1fr] gap-2.5 text-[15px] leading-[1.55]">
                <span
                  aria-hidden
                  className="mt-[9px] h-[6px] w-[6px] rounded-full"
                  style={{ background: "var(--ln-primary, var(--av-blue-500))" }}
                />
                <span>{renderInline(p)}</span>
              </li>
            ))}
          </ul>
        </div>

        {item.nota && <p className="m-0 mt-3 text-[12.5px] leading-[1.5] doc-muted">{renderInline(item.nota)}</p>}
      </div>
    </article>
  )
}

export function Fichas({ block }: { block: FichasBlock }) {
  const cols = block.columnas ?? 3
  // Basta con que una ficha lleve imagen para que todas pasen a la versión con
  // imagen: una rejilla mezclada, con fichas altas y bajas, se lee desordenada.
  const conImagen = block.items.some((it) => it.imagen || it.hueco || it.tecnica)
  return (
    <section>
      {block.titulo && (
        <h2
          className="ln-display m-0 mb-4 text-[24px] font-semibold lg:text-[30px]"
          style={{ lineHeight: 1.1, color: "var(--doc-fg)" }}
        >
          {block.titulo}
        </h2>
      )}
      <div className={`grid sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""} ${conImagen ? "gap-5" : "gap-3"}`}>
        {block.items.map((it, i) =>
          conImagen ? (
            <FichaConImagen key={i} item={it} />
          ) : (
          <div
            key={i}
            className="flex flex-col rounded-[10px] border px-4 py-4"
            style={{ borderColor: "var(--doc-border)", background: "var(--doc-bg)" }}
          >
            <div className="text-[15.5px] font-semibold leading-[1.3]" style={{ color: "var(--doc-fg)" }}>
              {it.titulo}
            </div>
            {it.ref && (
              <div className="mono mt-1 text-[11px] font-semibold" style={{ color: docAccent(ACENTO, 72) }}>
                {it.ref}
              </div>
            )}
            <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
              {it.puntos.map((p, j) => (
                <li key={j} className="grid grid-cols-[7px_1fr] gap-2.5 text-[14px] leading-[1.55]">
                  <span aria-hidden className="mt-[8px] h-[6px] w-[6px]" style={{ background: "var(--doc-accent)" }} />
                  <span>{renderInline(p)}</span>
                </li>
              ))}
            </ul>
            {it.nota && <p className="m-0 mt-3 text-[12.5px] leading-[1.5] doc-muted">{renderInline(it.nota)}</p>}
          </div>
          ),
        )}
      </div>
    </section>
  )
}
