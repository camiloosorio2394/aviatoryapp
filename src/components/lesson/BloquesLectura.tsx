/**
 * Bloques de la lección-documento para leer un mensaje real campo por campo:
 * el panel y la figura de NOTAM, las casillas, el desglose, el laboratorio,
 * las abreviaturas, la traducción y la regla de lectura. Los usa DocBlock
 * (DocLessonBlocks.tsx).
 */

import { Fragment, useState } from "react"
import { ChevronDown, ChevronRight, ShieldAlert } from "lucide-react"
import { useInView } from "@/hooks/useInView"
import type { BreakdownPart, CampoNotam, LabNotam } from "@/lib/notamLesson"
import { AVISO_NACIONALES, NATIONAL_NOTAMS, notamImageUrl } from "@/lib/notamNacionales"
import { docAccent, docTint } from "@/lib/docSheet"
import { renderInline } from "@/components/lesson/inline"
import { ACENTO, breakdownColor } from "@/components/lesson/bloquesComun"

interface LineaNotam {
  texto: string
  marca?: string
  detalle?: { titulo: string; texto: string }
  fuerte?: boolean
}

/**
 * El NOTAM entero, con la pregunta que responde cada línea al margen.
 *
 * El marcador es lo que convierte un bloque de código en algo que se recorre:
 * el alumno ve "¿dónde?" junto a la A) y deja de tener que recordar el orden
 * de las casillas. Solo las líneas con `detalle` se pulsan; el resto es texto,
 * porque hacer todo pulsable convierte la lectura en un juego de clics.
 */
export function NotamPanel({
  rotulo,
  etiqueta,
  pie,
  lineas,
}: {
  rotulo?: string
  etiqueta?: string
  pie?: string
  lineas: LineaNotam[]
}) {
  const [abierta, setAbierta] = useState<number | null>(null)
  // Al llegar a la vista, el rotulador recorre el mensaje. Se dispara una sola
  // vez: repetirlo cada vez que el panel vuelve a asomar seria un parpadeo.
  const { ref: raiz, inView } = useInView<HTMLElement>({ threshold: 0.3 })

  return (
    <section
      ref={raiz}
      className={`overflow-hidden rounded-lg border doc-rule${inView ? " ln-resalta" : ""}`}
    >
      {(rotulo || etiqueta) && (
        <div
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b doc-rule px-4 py-3 sm:px-5"
          style={{ background: docTint(ACENTO, 8) }}
        >
          {rotulo && (
            <span
              className="mono text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: docAccent(ACENTO, 70) }}
            >
              {rotulo}
            </span>
          )}
          {etiqueta && (
            <span
              className="rounded-md border px-2.5 py-1 text-[12px] font-semibold"
              style={{
                borderColor: docAccent(ACENTO, 35),
                color: docAccent(ACENTO, 70),
                background: "var(--doc-bg)",
              }}
            >
              {etiqueta}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col" style={{ background: "var(--doc-bg)" }}>
        {lineas.map((linea, i) => {
          const on = abierta === i
          const pulsable = Boolean(linea.detalle)
          // La banda del rotulador. Sobre las lineas de apoyo pasa y se va;
          // sobre la que dice que esta ocurriendo se queda. Asi el ojo aprende
          // donde mirar sin que haga falta escribirlo. Al abrir una linea se
          // apaga, para que se vea el fondo de seleccion y no el del rotulador.
          const banda = (
            <span
              aria-hidden
              className={`ln-resaltador pointer-events-none absolute inset-0${linea.fuerte ? " ln-resaltador-queda" : ""}`}
              style={{
                background: on ? "transparent" : docTint(ACENTO, linea.fuerte ? 12 : 7),
                animationDelay: `${160 + i * 150}ms`,
              }}
            />
          )
          const cuerpo = (
            <span className="relative z-[1] grid gap-x-5 gap-y-1 sm:grid-cols-[minmax(0,140px)_minmax(0,1fr)]">
              <span
                className="mono text-[11px] font-semibold uppercase tracking-[0.09em] sm:pt-[3px]"
                style={{ color: docAccent(ACENTO, linea.fuerte ? 75 : 50) }}
              >
                {linea.marca}
              </span>
              <span
                className="mono block whitespace-pre-wrap break-words text-[13px] sm:text-[14px]"
                style={{
                  lineHeight: 1.75,
                  color: "var(--doc-fg)",
                  fontWeight: linea.fuerte ? 600 : 400,
                }}
              >
                {linea.texto}
              </span>
            </span>
          )
          return (
            <div key={i}>
              {pulsable ? (
                <button
                  type="button"
                  onClick={() => setAbierta(on ? null : i)}
                  aria-pressed={on}
                  className="relative w-full border-l-[3px] px-4 py-3.5 text-left transition-colors sm:px-5"
                  style={{
                    borderLeftColor: on
                      ? docAccent(ACENTO, 70)
                      : linea.fuerte
                        ? docAccent(ACENTO, 45)
                        : "transparent",
                    background: on ? docTint(ACENTO, 9) : "transparent",
                  }}
                >
                  {banda}
                  {cuerpo}
                </button>
              ) : (
                <div
                  className="relative border-l-[3px] px-4 py-3.5 sm:px-5"
                  style={{
                    borderLeftColor: linea.fuerte ? docAccent(ACENTO, 45) : "transparent",
                  }}
                >
                  {banda}
                  {cuerpo}
                </div>
              )}
              {on && linea.detalle && (
                <div
                  className="border-t doc-rule px-4 py-3.5 sm:px-5"
                  style={{ background: "var(--doc-soft)" }}
                >
                  <p className="m-0 text-[15px] leading-[1.6]">
                    <strong className="font-semibold" style={{ color: docAccent(ACENTO, 75) }}>
                      {linea.detalle.titulo}
                    </strong>{" "}
                    {renderInline(linea.detalle.texto)}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {pie && (
        <div className="border-t doc-rule px-4 py-3 text-[13px] doc-muted sm:px-5" style={{ background: "var(--doc-soft)" }}>
          {pie}
        </div>
      )}
    </section>
  )
}

/**
 * El desglose en columnas: la tira de trozos y, bajo cada uno, que es y que
 * vale. Las cifras mandan, y de cada una baja un filete de un pixel hasta su
 * significado; nada de circulos numerados ni una tarjeta por cifra, que
 * convierten un grupo de fecha en un ejercicio de primaria.
 *
 * Solo sirve con trozos cortos y del mismo tipo. Con tokens largos hay que
 * seguir usando el listado de `Breakdown`.
 */
export function BreakdownColumnas({
  parts,
  caption,
  resultado,
  color = ACENTO,
}: {
  parts: BreakdownPart[]
  caption?: string
  resultado?: string
  color?: string
}) {
  return (
    <figure className="doc-soft m-0 rounded-lg border doc-rule p-5 sm:p-6">
      <div className="-mx-1 overflow-x-auto px-1">
        <div
          className="grid min-w-[360px] items-start"
          style={{ gridTemplateColumns: `repeat(${parts.length}, minmax(0, 1fr))` }}
        >
          {parts.map((p, i) => (
            <div
              key={i}
              className={`flex flex-col items-center px-1 text-center sm:px-3${i ? " border-l doc-rule" : ""}`}
            >
              <span
                className="mono text-[26px] font-semibold leading-none sm:text-[34px]"
                style={{ color: "var(--doc-fg)" }}
              >
                {p.token}
              </span>
              {/* La conexion con su significado: un filete de un pixel, nada mas */}
              <span
                className="my-2.5 block h-[15px] w-px"
                style={{ background: docAccent(color, 40) }}
                aria-hidden
              />
              <span
                className="text-[9.5px] font-semibold uppercase leading-tight tracking-[0.11em] sm:text-[10.5px]"
                style={{ color: docAccent(color, 72) }}
              >
                {p.label}
              </span>
              {p.detail && (
                <span className="mt-1.5 text-[12.5px] leading-snug doc-muted sm:text-[13.5px]">
                  {p.detail}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {(resultado || caption) && (
        <figcaption className="mt-5 border-t doc-rule pt-4 text-center">
          {resultado && (
            /* En bloque no se puede: dentro del lector, .mono alinea a la
               izquierda con mas peso que el text-center del pie. En linea lo
               centra el padre, y el resultado cae bajo la tira de cifras. */
            <span
              className="mono block text-[15px] font-semibold sm:text-[18px]"
              style={{
                color: docAccent(color, 76),
                letterSpacing: "0.03em",
                textAlign: "center",
              }}
            >
              {resultado}
            </span>
          )}
          {caption && (
            <div className="mt-1.5 text-[13.5px] doc-muted">{renderInline(caption)}</div>
          )}
        </figcaption>
      )}
    </figure>
  )
}

/** Las nueve casillas, en el orden en que se leen. El rótulo es el del botón. */
const CAMPOS_LAB: { campo: CampoNotam; rotulo: string }[] = [
  { campo: "encabezado", rotulo: "Encabezado" },
  { campo: "Q", rotulo: "Q)" },
  { campo: "A", rotulo: "A)" },
  { campo: "B", rotulo: "B)" },
  { campo: "C", rotulo: "C)" },
  { campo: "D", rotulo: "D)" },
  { campo: "E", rotulo: "E)" },
  { campo: "F", rotulo: "F)" },
  { campo: "G", rotulo: "G)" },
]

const AYUDA_LAB: Record<LabNotam["ayuda"], { rotulo: string; abierta: boolean }> = {
  completa: { rotulo: "Con ayuda", abierta: true },
  moderada: { rotulo: "Ayuda parcial", abierta: false },
  poca: { rotulo: "Poca ayuda", abierta: false },
  desafio: { rotulo: "Desafío", abierta: false },
}

/**
 * El laboratorio de NOTAM reales.
 *
 * Un NOTAM en pantalla cada vez, elegido en una tira de pestañas, y sus
 * casillas se abren pulsando. Al abrir una, esa línea se enciende y el resto
 * baja de intensidad: la atención va donde el alumno la pidió, sin que el
 * resto desaparezca, porque el contexto es parte de la lectura.
 *
 * Las casillas que el NOTAM no trae se pueden pulsar igual y lo dicen. Es
 * deliberado: darse cuenta de que un NOTAM NO tiene D) es media lección.
 */
export function Laboratorio({ intro, items }: { intro?: string; items: LabNotam[] }) {
  const [activo, setActivo] = useState(0)
  const [campo, setCampo] = useState<CampoNotam | null>(null)
  const [revelada, setRevelada] = useState(false)

  const ficha = items[activo]
  if (!ficha) return null

  const ayuda = AYUDA_LAB[ficha.ayuda]
  const abierta = ayuda.abierta || revelada
  const explicacion = ficha.campos.find((x) => x.campo === campo) ?? null
  const presentes = new Set(ficha.campos.map((x) => x.campo))

  function elegir(i: number) {
    setActivo(i)
    setCampo(null)
    setRevelada(false)
  }

  return (
    <section>
      {intro && <p className="m-0 mb-4 text-[15px] leading-[1.7]">{renderInline(intro)}</p>}

      {/* La tira de pestañas. En móvil se desplaza en horizontal en vez de
          partirse en cuatro filas, que rompería la idea de una sola fila. */}
      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <div className="flex min-w-max gap-1.5" role="tablist" aria-label="NOTAM del laboratorio">
          {items.map((it, i) => {
            const on = i === activo
            return (
              <button
                key={it.n}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => elegir(i)}
                className="mono shrink-0 rounded-md border px-3 py-2 text-left text-[11.5px] leading-tight transition-colors"
                style={{
                  borderColor: on ? docAccent(ACENTO, 55) : "var(--doc-rule, rgba(0,0,0,.12))",
                  background: on ? docTint(ACENTO, 12) : "var(--doc-bg)",
                  color: on ? docAccent(ACENTO, 82) : "var(--doc-muted-fg)",
                  fontWeight: on ? 600 : 500,
                }}
              >
                <span className="block">{it.n}</span>
                <span className="block text-[10.5px] opacity-80">{it.codigo}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* La ficha */}
      <div key={ficha.n} className="ln-paso mt-4 overflow-hidden rounded-lg border doc-rule">
        <div
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b doc-rule px-4 py-3 sm:px-5"
          style={{ background: docTint(ACENTO, 8) }}
        >
          <span
            className="mono text-[11px] font-semibold uppercase tracking-[0.1em]"
            style={{ color: docAccent(ACENTO, 72) }}
          >
            NOTAM {ficha.n} · {ficha.aeropuerto} · FIR {ficha.fir}
          </span>
          <span
            className="mono shrink-0 whitespace-nowrap rounded-md border px-2 py-[3px] text-[10.5px] font-semibold uppercase tracking-[0.08em]"
            style={{
              borderColor: docAccent(ACENTO, 30),
              color: docAccent(ACENTO, 66),
              background: "var(--doc-bg)",
            }}
          >
            {ayuda.rotulo}
          </span>
        </div>

        {/* El NOTAM literal */}
        <div className="overflow-x-auto px-4 py-4 sm:px-5" style={{ background: "var(--doc-bg)" }}>
          <pre className="m-0">
            <code className="mono block text-[12.5px] leading-[1.85] sm:text-[13.5px]">
              {ficha.lineas.map((l, i) => {
                const on = campo === l.campo
                const hay = campo !== null
                return (
                  <span
                    key={i}
                    className="block rounded-[3px] px-1.5 transition-[color,background-color,border-color,box-shadow]"
                    style={{
                      background: on ? docTint(ACENTO, 16) : "transparent",
                      color: on ? docAccent(ACENTO, 88) : "var(--doc-fg)",
                      fontWeight: on ? 600 : 400,
                      opacity: hay && !on ? 0.38 : 1,
                    }}
                  >
                    {l.texto}
                  </span>
                )
              })}
            </code>
          </pre>
        </div>

        {/* Los botones de casilla */}
        <div className="border-t doc-rule px-4 py-3.5 sm:px-5">
          <div
            className="mono text-[10.5px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "var(--doc-muted-fg)" }}
          >
            Selecciona una parte para analizar
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {CAMPOS_LAB.map(({ campo: k, rotulo }) => {
              const on = campo === k
              const existe = presentes.has(k)
              return (
                <button
                  key={k}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCampo(on ? null : k)}
                  className="mono rounded-md border px-2.5 py-1.5 text-[12px] font-semibold transition-colors"
                  style={{
                    borderColor: on ? docAccent(ACENTO, 55) : "var(--doc-rule, rgba(0,0,0,.12))",
                    background: on ? docAccent(ACENTO, 60) : "var(--doc-bg)",
                    color: on
                      ? "#fff"
                      : existe
                        ? docAccent(ACENTO, 72)
                        : "var(--doc-muted-fg)",
                    opacity: existe ? 1 : 0.55,
                  }}
                >
                  {rotulo}
                </button>
              )
            })}
          </div>

          {campo !== null && (
            <div key={campo} className="ln-paso mt-3.5 rounded-md border doc-rule doc-soft px-4 py-3.5">
              {explicacion ? (
                <>
                  <div
                    className="ln-display text-[15.5px] font-semibold"
                    style={{ color: docAccent(ACENTO, 78) }}
                  >
                    {explicacion.titulo}
                  </div>
                  <p className="m-0 mt-1.5 text-[14.5px] leading-[1.65]">
                    {renderInline(explicacion.texto)}
                  </p>
                </>
              ) : (
                <p className="m-0 text-[14.5px] leading-[1.65] doc-muted">
                  Este NOTAM no contiene este ítem.
                </p>
              )}
            </div>
          )}
        </div>

        {/* La interpretación */}
        <div className="border-t doc-rule px-4 py-4 sm:px-5" style={{ background: "var(--doc-soft)" }}>
          {abierta ? (
            <div className="ln-paso">
              <div
                className="mono text-[10.5px] font-semibold uppercase tracking-[0.12em]"
                style={{ color: "var(--doc-muted-fg)" }}
              >
                Qué significa
              </div>
              <p className="m-0 mt-1.5 text-[15px] leading-[1.65]" style={{ color: "var(--doc-fg)" }}>
                {renderInline(ficha.interpretacion)}
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setRevelada(true)}
              className="rounded-md border px-4 py-2 text-[14px] font-semibold transition-colors"
              style={{
                borderColor: docAccent(ACENTO, 35),
                color: docAccent(ACENTO, 75),
                background: "var(--doc-bg)",
              }}
            >
              Ver la interpretación
            </button>
          )}
          <div className="mt-3 border-t doc-rule pt-2.5 text-[12px] leading-[1.55] doc-muted">
            <span className="mono">{ficha.concepto}</span>
            <span className="mx-1.5">·</span>
            {ficha.fuente}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Tabla de consulta de abreviaturas: dos parejas por fila.
 *
 * Cuatro columnas de verdad y no dos listas al lado: con cuarenta y seis
 * entradas, dos columnas obligan a bajar el doble para encontrar una. La
 * abreviatura va en monoespaciada y con peso; el significado, en el gris del
 * cuerpo. Ese contraste es lo que permite barrer la columna con el ojo sin
 * leer nada más.
 */
export function Abreviaturas({
  titulo,
  intro,
  items,
  nota,
}: {
  titulo?: string
  intro?: string
  items: { a: string; v: string }[]
  nota?: string
}) {
  // Se reparten por filas, no por columnas: leídas de izquierda a derecha
  // siguen el orden en que se escribieron.
  const filas: { a: string; v: string }[][] = []
  for (let i = 0; i < items.length; i += 2) filas.push(items.slice(i, i + 2))

  return (
    <section>
      {titulo && (
        <h3
          className="ln-display m-0 text-[18px] font-semibold lg:text-[20px]"
          style={{ lineHeight: 1.2, color: "var(--doc-fg)" }}
        >
          {titulo}
        </h3>
      )}
      {intro && <p className="m-0 mt-2.5 text-[15px] leading-[1.7]">{renderInline(intro)}</p>}

      <div className="mt-4 overflow-x-auto rounded-lg border doc-rule">
        <table className="w-full min-w-[440px] border-collapse text-left">
          <tbody>
            {filas.map((fila, i) => (
              <tr key={i} className="border-b doc-rule last:border-b-0">
                {[0, 1].map((j) => {
                  const par = fila[j]
                  return (
                    <Fragment key={j}>
                      <td
                        className={`mono w-px whitespace-nowrap py-2 pl-4 pr-3 align-top text-[13px] font-semibold${
                          j === 1 ? " border-l doc-rule" : ""
                        }`}
                        style={{ color: docAccent(ACENTO, 78) }}
                      >
                        {par?.a ?? ""}
                      </td>
                      <td className="py-2 pr-4 align-top text-[14px] leading-snug doc-muted">
                        {par?.v ?? ""}
                      </td>
                    </Fragment>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {nota && (
        <div className="mt-2.5 text-[13px] leading-[1.6] doc-muted">{renderInline(nota)}</div>
      )}
    </section>
  )
}

/**
 * Un mensaje de casilla E) y su lectura.
 *
 * Al entrar en pantalla se encienden las abreviaturas y después aparece el
 * significado. Es el orden en que se resuelve de verdad: primero reconoces las
 * siglas, luego construyes la frase. Con el movimiento reducido llega todo
 * puesto y no se pierde nada.
 */
export function Traduccion({
  codigo,
  significado,
  marcar,
}: {
  codigo: string
  significado: string
  marcar?: string[]
}) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.5 })

  // Se parte el código por los tokens a resaltar, respetando su orden en el
  // texto. Sin tokens, va entero y no se resalta nada.
  const trozos: { t: string; on: boolean }[] = []
  if (marcar?.length) {
    let resto = codigo
    let guarda = 0
    while (resto && guarda++ < 200) {
      const encontrado = marcar
        .map((m) => ({ m, i: resto.indexOf(m) }))
        .filter((x) => x.i >= 0)
        .sort((a, b) => a.i - b.i)[0]
      if (!encontrado) break
      if (encontrado.i > 0) trozos.push({ t: resto.slice(0, encontrado.i), on: false })
      trozos.push({ t: encontrado.m, on: true })
      resto = resto.slice(encontrado.i + encontrado.m.length)
    }
    if (resto) trozos.push({ t: resto, on: false })
  } else {
    trozos.push({ t: codigo, on: false })
  }

  return (
    <section ref={ref} className={`ln-aparece${inView ? " ln-visible" : ""}`}>
      <pre className="doc-soft m-0 overflow-x-auto rounded-lg border doc-rule px-4 py-4 sm:px-5">
        <code
          className="mono block whitespace-pre-wrap text-[14px] font-medium leading-[1.7] sm:text-[15.5px]"
          style={{ color: "var(--doc-fg)" }}
        >
          {trozos.map((t, i) =>
            t.on ? (
              <span
                key={i}
                className="ln-sigla rounded-[3px] px-[3px] font-semibold"
                style={{ background: docTint(ACENTO, 16), color: docAccent(ACENTO, 82) }}
              >
                {t.t}
              </span>
            ) : (
              <Fragment key={i}>{t.t}</Fragment>
            ),
          )}
        </code>
      </pre>

      <div className="mt-3 flex items-start gap-3">
        <ChevronDown
          className="ln-flecha mt-[3px] h-4 w-4 shrink-0"
          style={{ color: docAccent(ACENTO, 45) }}
          aria-hidden
        />
        <p className="m-0 text-[15px] leading-[1.65]" style={{ color: "var(--doc-fg)" }}>
          {renderInline(significado)}
        </p>
      </div>
    </section>
  )
}

/**
 * El cierre: el lema, los tres pasos y el ejemplo con el código a un lado y la
 * lectura al otro. En una columna estrecha se apila, porque enfrentar dos
 * bloques de 30 caracteres no enfrenta nada.
 */
export function ReglaLectura({
  lema,
  pasos,
  codigo,
  significado,
}: {
  lema: string
  pasos: string[]
  codigo: string
  significado: string
}) {
  return (
    <section className="rounded-lg border doc-rule doc-soft px-5 py-6 sm:px-7">
      <div
        className="ln-display text-center text-[22px] font-semibold sm:text-[26px]"
        style={{ letterSpacing: "-0.015em", color: docAccent(ACENTO, 80) }}
      >
        {lema}
      </div>

      <ol className="mx-auto mt-5 flex max-w-[54ch] list-none flex-col gap-2.5 p-0">
        {pasos.map((p, i) => (
          <li key={i} className="flex items-start gap-3 text-[15px] leading-[1.6]">
            <span
              className="mono mt-[2px] grid h-[19px] w-[19px] shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white"
              style={{ background: docAccent(ACENTO, 62) }}
            >
              {i + 1}
            </span>
            <span>{renderInline(p)}</span>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid items-center gap-3 border-t doc-rule pt-5 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-4">
        <code
          className="mono block whitespace-pre-wrap rounded-md border doc-rule px-3 py-2.5 text-[13px] leading-[1.6]"
          style={{ background: "var(--doc-bg)", color: "var(--doc-fg)" }}
        >
          {codigo}
        </code>
        <ChevronRight
          className="hidden h-4 w-4 shrink-0 justify-self-center sm:block"
          style={{ color: docAccent(ACENTO, 45) }}
          aria-hidden
        />
        <p className="m-0 text-[15px] leading-[1.6]" style={{ color: "var(--doc-fg)" }}>
          {renderInline(significado)}
        </p>
      </div>
    </section>
  )
}

/**
 * Un NOTAM colombiano real dentro de la hoja de estudio.
 *
 * Todo sale de la ficha de `notams_nacionales.json`, incluidos el `alt` (que es
 * la transcripción completa del aviso, no un texto decorativo: un NOTAM en
 * imagen es texto dentro de un píxel y sin esto un lector de pantalla no lo lee)
 * y el aviso de vigencia, que es obligatorio en pantalla y va con cada imagen,
 * igual que en el modo práctica.
 */
export function NotamFigure({
  id,
  caption,
  casillas,
}: {
  id: string
  caption?: string
  casillas?: { cas: string; contenido: string; significa: string }[]
}) {
  const notam = NATIONAL_NOTAMS.find((n) => n.id === id)
  // Una referencia rota no puede tumbar la lección entera: se omite la imagen
  // y el texto de alrededor sigue explicando lo mismo.
  if (!notam) return null

  return (
    <figure className="m-0">
      {/* Los recortes del resumen de la Aerocivil son tiras muy anchas: por
          debajo de 700 px el texto del aviso deja de leerse, así que la imagen
          no se encoge más y la caja scrollea. El mínimo es 700 y no 720 porque
          la columna de la lección deja 716 px de caja de contenido: a 720 la
          caja scrolleaba también en escritorio, que es donde sí cabe. Mismo
          criterio que en el modo práctica. Fondo blanco porque el recorte lo es. */}
      {/* El aviso de vigencia va DENTRO de la caja del recorte, como el sello
          de un documento, y no suelto debajo en rojo. Pegado a la imagen se lee
          como lo que es, una condición de uso de ese recorte; suelto parecía un
          error de la página. En ámbar y no en rojo: es una precaución, no un
          fallo. */}
      <div className="overflow-hidden rounded-lg border doc-rule">
        <div className="overflow-x-auto" style={{ background: "rgb(255 255 255)" }}>
          <img
            src={notamImageUrl(notam.imagen)}
            alt={notam.transcripcion}
            loading="lazy"
            className="block w-full min-w-[700px] h-auto"
          />
        </div>
        <div
          className="flex items-start gap-2 border-t doc-rule px-3.5 py-2.5"
          style={{ background: docTint("var(--av-amber-400)", 10) }}
        >
          <ShieldAlert
            className="mt-[2px] h-3.5 w-3.5 shrink-0"
            style={{ color: docAccent("var(--av-amber-400)", 70) }}
            aria-hidden
          />
          <span
            className="text-[12px] leading-[1.55]"
            style={{ color: docAccent("var(--av-amber-400)", 78) }}
          >
            {AVISO_NACIONALES}
          </span>
        </div>
      </div>

      {casillas && casillas.length > 0 && <Casillas notam={notam} casillas={casillas} />}

      <figcaption className="mt-2 text-[13px] leading-[1.6] doc-muted">
        <span className="mono font-semibold" style={{ color: "var(--doc-fg)" }}>
          {notam.serie_numero}
        </span>{" "}
        · {notam.aerodromo}
        {caption && <span className="block mt-1">{renderInline(caption)}</span>}
      </figcaption>
    </figure>
  )
}

/**
 * El NOTAM desarmado casilla por casilla, pegado a su recorte.
 *
 * Va debajo de la imagen y dentro de la misma pieza a propósito. Un NOTAM real
 * puesto entre dos párrafos es decoración: el piloto lo ve, no lo entiende, y
 * tiene que buscar en la prosa de al lado qué decía. Aquí lo auténtico y su
 * lectura son lo mismo y no se pueden separar.
 *
 * De paso arregla la legibilidad en móvil. El recorte de la Aerocivil es una
 * tira que a 390 px se encoge hasta no leerse; el bloque oscuro trae el mismo
 * aviso en texto que sí reflowea, y la tabla lo traduce.
 */
function Casillas({
  notam,
  casillas,
}: {
  notam: { serie_numero: string; aerodromo: string; transcripcion: string }
  casillas: { cas: string; contenido: string; significa: string }[]
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-lg border doc-rule">
      {/* El aviso crudo. Oscuro fijo en los dos temas: es material de terminal,
          y un NOTAM no cambia de color porque el piloto prefiera modo claro. */}
      <div
        className="mono px-4 py-3 text-[12.5px] leading-[1.7]"
        style={{ background: "oklch(0.19 0.012 260)", color: "oklch(0.93 0.006 260)" }}
      >
        <div style={{ color: "oklch(0.72 0.01 260)" }}>
          {notam.serie_numero} · {notam.aerodromo}
        </div>
        <div className="mt-1">{notam.transcripcion}</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-left">
          <thead className="doc-soft">
            <tr>
              {["Cas.", "Contenido", "Qué significa"].map((h) => (
                <th
                  key={h}
                  className="mono px-3.5 py-2 border-b doc-rule doc-muted text-[10.5px] font-medium uppercase tracking-[0.1em]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {casillas.map((c, i) => (
              <tr key={i} className="border-b doc-rule last:border-b-0">
                <td
                  className="mono px-3.5 py-2.5 align-top text-[12.5px] font-semibold whitespace-nowrap"
                  style={{ color: "var(--doc-accent)" }}
                >
                  {c.cas}
                </td>
                <td
                  className="mono px-3.5 py-2.5 align-top text-[12.5px] leading-[1.5]"
                  style={{ color: "var(--doc-fg)" }}
                >
                  {c.contenido}
                </td>
                <td className="px-3.5 py-2.5 align-top text-[13px] leading-[1.55] doc-muted">
                  {renderInline(c.significa)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * Desglose visual de un código.
 *
 * En papel esto se dibuja con líneas que bajan de cada trozo hasta su etiqueta.
 * En pantalla ese diagrama se rompe en cuanto la línea no cabe, así que la
 * conexión la hace el color: cada trozo del mensaje lleva el suyo y su entrada
 * de la leyenda lleva el mismo, con el número al lado para leerlo en orden.
 */
export function Breakdown({ caption, parts }: { caption?: string; parts: BreakdownPart[] }) {
  return (
    <figure className="doc-soft m-0 rounded-lg border doc-rule p-4 sm:p-5">
      <div className="overflow-x-auto -mx-1 px-1">
        <div className="mono flex flex-wrap items-start justify-center gap-x-4 gap-y-4">
          {parts.map((p, i) => (
            <span key={i} className="inline-flex flex-col items-start gap-1.5">
              <span
                className="whitespace-pre text-[16px] font-semibold sm:text-[19px]"
                style={{ color: "var(--doc-fg)" }}
              >
                {p.token}
              </span>
              <span
                className="h-[4px] w-full rounded-full"
                style={{ background: docAccent(breakdownColor(i), 62) }}
                aria-hidden
              />
              <span
                className="grid h-[20px] w-[20px] place-items-center rounded-full text-[11px] font-semibold text-white"
                style={{ background: docAccent(breakdownColor(i), 68) }}
                aria-hidden
              >
                {i + 1}
              </span>
            </span>
          ))}
        </div>
      </div>

      <ol className="mt-5 mb-0 grid list-none gap-x-6 gap-y-3.5 p-0 sm:grid-cols-2">
        {parts.map((p, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className="mono mt-[3px] grid h-[20px] w-[20px] shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white"
              style={{ background: docAccent(breakdownColor(i), 68) }}
            >
              {i + 1}
            </span>
            <span className="min-w-0 text-[14.5px] leading-[1.6]">
              <span
                className="mono text-[14px] font-semibold"
                style={{ color: docAccent(breakdownColor(i), 78) }}
              >
                {p.token}
              </span>{" "}
              <span style={{ color: "var(--doc-fg)" }}>{p.label}</span>
              {p.detail && (
                <span className="mt-0.5 block doc-muted">{renderInline(p.detail)}</span>
              )}
            </span>
          </li>
        ))}
      </ol>

      {caption && (
        <figcaption className="mt-5 border-t doc-rule pt-3.5 text-[14px] leading-[1.65] doc-muted">
          {renderInline(caption)}
        </figcaption>
      )}
    </figure>
  )
}
