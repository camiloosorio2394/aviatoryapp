/**
 * Bloques propios de Mercancías peligrosas: el selector de las nueve clases y
 * las fichas de etiquetas del Apéndice 1.
 *
 * Viven aparte de los bloques de curso porque traen sus datos (las clases, las
 * etiquetas, los rombos) y solo este módulo los usa. DocLessonBlocks los carga
 * con `lazy`, así el piloto que abre NOTAM no descarga nada de mercancías.
 */

import { useState } from "react"
import { CLASES, rombo } from "@/lib/mercanciasClases"
import { ETIQUETAS, type GrupoEtiqueta } from "@/lib/mercanciasEtiquetas"
import { docAccent, docTint } from "@/lib/docSheet"

/** El acento del lector. Dentro de .lector-mp cae al amarillo. */
const ACENTO = "var(--av-blue-500)"

// ─── Rombo ───────────────────────────────────────────────────────────────────

/** El rombo oficial de una clase o división, a tamaño. Sin él queda el hueco. */
function Rombo({ id, tam, etiqueta }: { id?: string; tam: number; etiqueta?: string }) {
  if (!id) {
    return (
      <span
        className="mono flex shrink-0 items-center justify-center rounded-[6px] border border-dashed text-[10px]"
        style={{ width: tam, height: tam, borderColor: "var(--doc-border)", color: "var(--doc-muted)" }}
        aria-label={etiqueta ?? "Sin etiqueta en el material del módulo"}
      >
        —
      </span>
    )
  }
  return (
    <img
      src={rombo(id)}
      alt={etiqueta ?? ""}
      aria-hidden={etiqueta ? undefined : true}
      width={tam}
      height={tam}
      loading="lazy"
      decoding="async"
      className="block shrink-0 object-contain"
      style={{ width: tam, height: tam }}
    />
  )
}

// ─── Las nueve clases ────────────────────────────────────────────────────────

/**
 * La pieza central del nivel 2. La rejilla muestra las nueve con su rombo; al
 * tocar una se abre su ficha: la definición literal del RAC 175.1010, el
 * riesgo en una línea, los ejemplos, las divisiones con su rombo propio y la
 * nota del curso.
 *
 * Se entra por la clase 3 porque es la más común en la vida real (pinturas,
 * combustibles, perfumes) y porque abrir en blanco deja media pantalla vacía.
 */
export function ClasesMP() {
  const [claseN, setClaseN] = useState("3")
  const clase = CLASES.find((c) => c.n === claseN) ?? CLASES[0]

  return (
    <section aria-label="Las nueve clases de mercancías peligrosas">
      {/* En celular van de tres en tres, que es lo que deja el rombo legible. */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
        {CLASES.map((c) => {
          const activa = c.n === claseN
          return (
            <button
              key={c.n}
              type="button"
              onClick={() => setClaseN(c.n)}
              aria-pressed={activa}
              className="flex flex-col items-center gap-1.5 rounded-[10px] px-1 py-2.5 transition-colors"
              style={{
                background: activa ? docTint(ACENTO, 10) : "transparent",
                border: `1px solid ${activa ? docAccent(ACENTO, 55) : "var(--doc-border)"}`,
              }}
            >
              <Rombo id={c.rombos[0]} tam={44} etiqueta={`Clase ${c.n}, ${c.nombre}`} />
              <span
                className="mono text-[12px] font-semibold leading-none"
                style={{ color: activa ? docAccent(ACENTO, 80) : "var(--doc-muted)" }}
              >
                {c.n}
              </span>
              <span className="text-center text-[10px] leading-tight hyphens-auto doc-muted">{c.corto}</span>
            </button>
          )
        })}
      </div>

      {/* Ficha de la clase abierta. Cambia de key para que la aparición se
          note en cada selección, sin animar nada más. */}
      <div
        key={clase.n}
        className="rev-aparece mt-4 rounded-[10px] border p-4 sm:p-5"
        style={{
          borderColor: "var(--doc-border)",
          borderLeft: `3px solid ${clase.color}`,
          background: "var(--doc-bg)",
        }}
      >
        <div className="flex items-start gap-4">
          <Rombo id={clase.rombos[0]} tam={64} etiqueta={`Clase ${clase.n}, ${clase.nombre}`} />
          <div className="min-w-0 flex-1">
            <div className="mono text-[11px] font-semibold uppercase tracking-[0.12em] doc-muted">
              Clase {clase.n}
            </div>
            <h3
              className="ln-display m-0 mt-0.5 text-[22px] font-semibold leading-[1.12]"
              style={{ color: "var(--doc-fg)" }}
            >
              {clase.nombre}
            </h3>
            <p className="m-0 mt-2 text-[14.5px] leading-[1.6]">
              <strong className="font-semibold" style={{ color: "var(--doc-fg)" }}>
                Riesgo principal.
              </strong>{" "}
              {clase.riesgo}
            </p>
          </div>
        </div>

        <div className="doc-soft mt-4 border-l-[3px] px-4 py-3" style={{ borderLeftColor: "var(--doc-accent)" }}>
          <div className="mono text-[10.5px] font-semibold uppercase tracking-[0.12em] doc-muted">
            Definición · {clase.ref}
          </div>
          <p className="m-0 mt-1.5 text-[14.5px] leading-[1.65]" style={{ color: "var(--doc-fg)" }}>
            {clase.definicion}
          </p>
        </div>

        <div className="mt-4">
          <div className="mono mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] doc-muted">
            Ejemplos
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
            {clase.ejemplos.map((e) => (
              <li
                key={e}
                className="rounded-full border px-2.5 py-1 text-[12.5px]"
                style={{ borderColor: "var(--doc-border)", background: "var(--doc-bg)" }}
              >
                {e}
              </li>
            ))}
          </ul>
        </div>

        {clase.divisiones.length > 0 && (
          <div className="mt-4">
            <div className="mono mb-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] doc-muted">
              Divisiones
            </div>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {clase.divisiones.map((d) => {
                const tieneRombo = clase.rombos.includes(d.id.replace(".", "-"))
                return (
                  <li key={d.id} className="flex items-start gap-2.5">
                    <Rombo id={tieneRombo ? d.id.replace(".", "-") : undefined} tam={30} />
                    <div className="min-w-0 text-[13.5px] leading-snug">
                      <span className="mono font-semibold" style={{ color: "var(--doc-fg)" }}>
                        {d.id}
                      </span>{" "}
                      · {d.txt}
                      {d.detalle && <div className="mt-0.5 text-[13px] leading-[1.55] doc-muted">{d.detalle}</div>}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {clase.subgrupos && clase.subgrupos.length > 0 && (
          <div className="mt-4">
            <div className="mono mb-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] doc-muted">
              {clase.subgruposTitulo}
            </div>
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              {clase.subgrupos.map((g) => (
                <li key={g.id} className="grid grid-cols-[28px_1fr] gap-2 text-[13.5px] leading-snug">
                  <span className="mono font-semibold" style={{ color: docAccent(ACENTO, 75) }}>
                    {g.id}
                  </span>
                  <span>{g.txt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 border-t pt-3 text-[13px] doc-muted"
          style={{ borderColor: "var(--doc-border)" }}
        >
          <span>
            Grupo de embalaje:{" "}
            <strong className="font-semibold" style={{ color: "var(--doc-fg)" }}>
              {clase.ge ? "aplica" : "no aplica"}
            </strong>
            {clase.geNota ? `, ${clase.geNota}` : ""}
          </span>
          <span>
            Rombos de la clase:{" "}
            <strong className="font-semibold" style={{ color: "var(--doc-fg)" }}>
              {clase.rombos.length}
            </strong>
          </span>
        </div>

        {clase.nota && (
          <p className="m-0 mt-3 text-[13.5px] leading-[1.6]" style={{ color: "var(--doc-fg)" }}>
            {clase.nota}
          </p>
        )}
      </div>
    </section>
  )
}

// ─── Fichas de etiquetas ─────────────────────────────────────────────────────

/**
 * Las etiquetas del Apéndice 1, en fichas: el rombo (o su hueco rotulado), el
 * nombre, la clase y la especificación textual. Se agrupan por familia porque
 * lo que se enseña es la diferencia entre riesgo (qué es) y manipulación (cómo
 * se trata), no una lista de veinticinco.
 */
export function EtiquetasMP({ grupo }: { grupo: GrupoEtiqueta | "todas" }) {
  const lista = grupo === "todas" ? ETIQUETAS : ETIQUETAS.filter((e) => e.grupo === grupo)

  return (
    <section aria-label="Etiquetas del Apéndice 1">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((e) => (
          <div
            key={e.id}
            className="flex flex-col rounded-[10px] border p-3.5"
            style={{ borderColor: "var(--doc-border)", background: "var(--doc-bg)" }}
          >
            <div className="flex items-start gap-3">
              {e.imagen ? (
                <Rombo id={e.imagen} tam={72} etiqueta={`Etiqueta: ${e.nombre}`} />
              ) : (
                <div
                  className="flex h-[72px] w-[72px] shrink-0 flex-col items-center justify-center border px-1 text-center"
                  style={{ background: "var(--doc-soft)", borderColor: "var(--doc-border)" }}
                  aria-label={`Hueco de imagen ${e.id}`}
                >
                  <span className="mono text-[9px] font-semibold leading-tight" style={{ color: "var(--doc-accent)" }}>
                    {e.id}
                  </span>
                  <span className="mono mt-0.5 text-[8.5px] leading-tight doc-muted">400×400 PNG</span>
                </div>
              )}
              <div className="min-w-0">
                <div className="text-[14.5px] font-semibold leading-[1.25]" style={{ color: "var(--doc-fg)" }}>
                  {e.nombre}
                </div>
                <div className="mono mt-1 text-[10.5px] font-semibold uppercase tracking-[0.08em]" style={{ color: docAccent(ACENTO, 72) }}>
                  {e.clase}
                </div>
                <div className="mono mt-0.5 text-[10.5px] doc-muted">{e.figura}</div>
              </div>
            </div>
            <p className="m-0 mt-2.5 text-[13px] leading-[1.55]">{e.spec}</p>
            {e.alerta && (
              <p
                className="m-0 mt-2 border-l-2 pl-2.5 text-[12.5px] leading-[1.5]"
                style={{ borderColor: "var(--ln-caution, #B45309)", color: "var(--ln-caution-ink, var(--doc-fg))" }}
              >
                {e.alerta}
              </p>
            )}
            {e.pend && (
              <p className="mono m-0 mt-2 text-[10.5px] leading-[1.5] doc-muted">
                Colores no descritos en el texto del Apéndice: verificar contra el original.
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
