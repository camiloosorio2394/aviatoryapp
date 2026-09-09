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
import { BookMarked, ChevronDown, ClipboardList, HelpCircle, Plane, Quote } from "lucide-react"
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
export function Norma({ block }: { block: NormaBlock }) {
  const nat = block.naturaleza ?? "requisito"
  return (
    <div
      className="doc-soft border-l-[3px] px-5 py-4 sm:px-6 sm:py-5"
      style={{ borderLeftColor: "var(--doc-accent)" }}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span
          className="mono inline-flex items-center gap-1.5 rounded-[4px] px-2 py-[3px] text-[11px] font-semibold tracking-[0.06em]"
          style={{ background: docTint(ACENTO, 14), color: docAccent(ACENTO, 80) }}
        >
          <BookMarked className="h-3 w-3" aria-hidden /> {block.ref}
        </span>
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

      {block.hueco && (
        <div className="border-b" style={{ borderColor: "var(--ln-hair, var(--doc-border))" }}>
          <HuecoImagen
            rotulo={`${block.hueco.id} · ${block.hueco.medida}`}
            descripcion={block.hueco.descripcion}
            alto={300}
            ratio="16 / 9"
          />
        </div>
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
  return (
    <div
      className="rounded-[10px] border px-5 py-4 sm:px-6 sm:py-5"
      style={{ borderColor: docAccent(ACENTO, 24), background: docTint(ACENTO, 6) }}
    >
      <div
        className="flex items-center gap-2 mono text-[10.5px] font-semibold uppercase tracking-[0.16em]"
        style={{ color: docAccent(ACENTO, 72) }}
      >
        <Plane className="h-3.5 w-3.5" aria-hidden />
        En la operación · {block.momento}
      </div>
      <p className="m-0 mt-2.5 text-[15px] leading-[1.7]">{renderInline(block.texto)}</p>
      {block.pasos && block.pasos.length > 0 && (
        <ol className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
          {block.pasos.map((p, i) => (
            <li key={i} className="grid grid-cols-[26px_1fr] gap-2.5 text-[14.5px] leading-[1.6]">
              <span
                className="mono mt-[2px] flex h-[22px] w-[22px] items-center justify-center rounded-[5px] text-[11px] font-semibold"
                style={{ background: docTint(ACENTO, 16), color: docAccent(ACENTO, 80) }}
              >
                {i + 1}
              </span>
              <span>{renderInline(p)}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
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
export function Fichas({ block }: { block: FichasBlock }) {
  const cols = block.columnas ?? 3
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
      <div className={`grid gap-3 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>
        {block.items.map((it, i) => (
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
        ))}
      </div>
    </section>
  )
}
