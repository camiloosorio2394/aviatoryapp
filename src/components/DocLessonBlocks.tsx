/**
 * Bloques de la lección en formato documento (.doc-sheet).
 *
 * Es el renderer que estrenó la lección NOTAM, extraído para que cualquier
 * lección-documento (METAR y las que vengan) se lea idéntica: mismos bloques,
 * mismos colores de papel, mismo marcado ligero. Si se cambia algo aquí,
 * cambian todas las lecciones a la vez, que es la gracia.
 */

import { Fragment, lazy, Suspense, useState, type ReactNode } from "react"
import {
  AlertTriangle,
  ArrowUpDown,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  HelpCircle,
  Info,
  KeyRound,
  Lightbulb,
  MapPin,
  PenLine,
  Plane,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
} from "lucide-react"
import { useInView } from "@/hooks/useInView"
import type { BreakdownPart, PasoIcono, TarjetaIcono } from "@/lib/notamLesson"
import type { DocBlockData } from "@/lib/docBlocks"
import { DISCLAIMERS, NATIONAL_NOTAMS, notamImageUrl } from "@/lib/notam"
import { docAccent, docTint } from "@/lib/docSheet"
/**
 * Registro de infografías disponibles para el bloque `infografia`.
 *
 * Se listan aquí para que la lección solo tenga que nombrarlas y el tipo del
 * bloque las valide: un nombre mal escrito no compila.
 *
 * Van con `lazy` a propósito. Cada infografía trae su maquetación completa y
 * van a ser trece; metidas en el bundle principal lo empujaron por encima de
 * los 2 MB y Workbox dejó de precachearlo, que es un fallo de build, no un
 * aviso. Cargadas aparte, el piloto solo descarga la de la sección que abre.
 */
const INFOGRAFIAS: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
  "notam-que-es": lazy(() =>
    import("@/components/lesson/infografias/NotamQueEs").then((m) => ({ default: m.NotamQueEs })),
  ),
  "notam-linea-q": lazy(() =>
    import("@/components/lesson/infografias/NotamLineaQ").then((m) => ({ default: m.NotamLineaQ })),
  ),
}

/** Hueco mientras llega el trozo de la infografía. Reserva alto para que no salte la página. */
function InfografiaCargando() {
  return <div className="my-6 h-[320px] animate-pulse rounded-xl" style={{ background: "var(--doc-soft)" }} />
}

/**
 * Colores del desglose. Cada trozo del código toma uno y su entrada en la
 * leyenda toma el mismo: es lo que reemplaza a las líneas del diagrama ASCII,
 * que en móvil se rompen.
 */
const BREAKDOWN_COLORS = [
  "var(--av-blue-500)",
  "var(--av-violet-400)",
  "var(--av-cyan-400)",
  "var(--av-amber-400)",
  "var(--av-green-400)",
  "var(--av-red-400)",
]

function breakdownColor(i: number): string {
  return BREAKDOWN_COLORS[i % BREAKDOWN_COLORS.length]
}

/**
 * Convierte marcado ligero a nodos de React sin dangerouslySetInnerHTML.
 * Soporta **negrita** y `codigo`, con los colores de las variables --doc-*.
 */
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  const out: ReactNode[] = []
  parts.forEach((part, i) => {
    if (part === "") return
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      out.push(
        <strong key={i} className="font-semibold" style={{ color: "var(--doc-fg)" }}>
          {part.slice(2, -2)}
        </strong>,
      )
      return
    }
    if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
      out.push(
        <code
          key={i}
          className="mono text-[0.88em] px-1.5 py-[0.12em] rounded-md border doc-rule break-words"
          style={{ background: docTint("var(--av-blue-500)", 9), color: "var(--doc-fg)" }}
        >
          {part.slice(1, -1)}
        </code>,
      )
      return
    }
    out.push(<span key={i}>{part}</span>)
  })
  return out
}

const CALLOUT_TONE: Record<
  "info" | "warn" | "tip" | "verificar",
  { color: string; icon: typeof Info; fallbackTitle: string }
> = {
  info: { color: "var(--av-blue-500)", icon: Info, fallbackTitle: "Nota de fuente" },
  warn: { color: "var(--av-amber-400)", icon: AlertTriangle, fallbackTitle: "Ojo con esto" },
  tip: { color: "var(--av-green-400)", icon: Lightbulb, fallbackTitle: "Consejo" },
  verificar: {
    color: "var(--av-amber-400)",
    icon: ShieldCheck,
    fallbackTitle: "Antes de usarlo, verifica",
  },
}

/** El acento de las piezas que se pulsan. Dentro del lector cae al navy. */
const ACENTO = "var(--av-blue-500)"

export function DocBlock({ block }: { block: DocBlockData }) {
  switch (block.kind) {
    case "p":
      return <p className="m-0 text-[15px]">{renderInline(block.text)}</p>

    /* ── Catálogo del sistema de lecciones (handoff Lección 01) ─────────────
       Estilos fijos: ninguna lección los redefine. La clase ln-display existe
       solo dentro del lector NOTAM; fuera de él cae a la sans del documento. */

    case "titulo":
      return (
        <h2
          className="ln-display m-0 mt-3 text-[28px] lg:text-[36px] font-semibold"
          style={{ lineHeight: 1.12, letterSpacing: "-0.012em", color: "var(--doc-fg)" }}
        >
          {block.text}
        </h2>
      )

    case "sub":
      return (
        <h2
          className="ln-display m-0 mt-2 text-[24px] lg:text-[30px] font-semibold"
          style={{ lineHeight: 1.1, color: "var(--doc-fg)" }}
        >
          {block.text}
        </h2>
      )

    case "definicion":
      return (
        <div
          className="doc-soft border-l-[3px] px-6 py-5"
          style={{ borderLeftColor: "var(--doc-accent)" }}
        >
          <p
            className="m-0 text-[17px] lg:text-[18.5px] leading-[1.55]"
            style={{ color: "var(--ln-ink-strong, var(--doc-fg))" }}
          >
            {renderInline(block.text)}
          </p>
        </div>
      )

    case "vinetas":
      return (
        <ul className="m-0 p-0 list-none flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li key={i} className="grid grid-cols-[9px_1fr] gap-3.5 text-[15px] lg:text-[16.5px] leading-[1.6]">
              <span
                aria-hidden
                className="mt-[9px] h-[7px] w-[7px]"
                style={{ background: "var(--doc-accent)" }}
              />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )

    case "rejilla":
      return (
        <div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((it, i) => (
              <div key={i} className="flex flex-col gap-2.5">
                {/* El icono de la entrada. Cuando falta queda el hueco
                    rotulado, que recuerda cuál hay que dibujar. */}
                {it.icono ? (
                  <img
                    src={it.icono}
                    alt=""
                    aria-hidden
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="block h-[64px] w-[64px] object-contain"
                  />
                ) : (
                  <span
                    className="mono flex h-[52px] w-[52px] items-center justify-center rounded-[6px] border doc-soft doc-rule text-[10px] font-semibold tracking-[0.08em]"
                    style={{ color: "var(--ln-placeholder, var(--doc-muted))" }}
                    aria-hidden
                  >
                    ICO
                  </span>
                )}
                <div className="ln-display text-[20px] lg:text-[22px] font-semibold" style={{ lineHeight: 1.1, color: "var(--doc-fg)" }}>
                  {it.titulo}
                </div>
                <p className="m-0 text-[14.5px] leading-[1.55] doc-muted">{it.desc}</p>
              </div>
            ))}
          </div>
          {block.nota && <p className="mono m-0 mt-4 text-[11px] doc-muted">{block.nota}</p>}
        </div>
      )

    case "glosario":
      return (
        <div>
          {block.titulo && (
            <h2
              className="ln-display m-0 mb-3 text-[24px] lg:text-[30px] font-semibold"
              style={{ lineHeight: 1.1, color: "var(--doc-fg)" }}
            >
              {block.titulo}
            </h2>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ columnGap: 44 }}>
            {block.items.map((it, i) => (
              <div
                key={i}
                className="grid grid-cols-[70px_1fr] items-baseline border-t doc-rule"
                style={{ paddingTop: 11, paddingBottom: 11 }}
              >
                <span className="mono text-[13px] font-semibold" style={{ color: "var(--doc-accent)" }}>
                  {it.k}
                </span>
                <span className="text-[15px] leading-[1.5]">{it.v}</span>
              </div>
            ))}
          </div>
        </div>
      )

    /* El interactivo y el hueco de imagen los renderiza el reproductor de la
       lección, que conoce sus componentes; aquí no pintan nada. */
    case "interactivo":
    case "hueco":
      return null

    case "quote":
      return (
        <blockquote
          className="m-0 pl-4 sm:pl-5 py-1 border-l-2"
          style={{ borderColor: docAccent("var(--av-blue-500)", 35) }}
        >
          <p className="m-0 text-[15px] italic">{renderInline(block.text)}</p>
          {block.source && <div className="mt-2 text-[13px] doc-muted">{block.source}</div>}
        </blockquote>
      )

    case "list": {
      const items = block.items.map((item, i) => (
        <li key={i} className="pl-1 text-[15px] leading-[1.7]">
          {renderInline(item)}
        </li>
      ))
      const cls = "m-0 pl-5 flex flex-col gap-2.5 marker:font-semibold"
      return block.ordered ? (
        <ol className={`list-decimal ${cls}`}>{items}</ol>
      ) : (
        <ul className={`list-disc ${cls}`}>{items}</ul>
      )
    }

    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border doc-rule">
          <table className="w-full min-w-[440px] border-collapse text-left">
            <thead className="doc-soft">
              <tr>
                {block.head.map((h, i) => (
                  <th
                    key={i}
                    className="px-3.5 py-2.5 border-b doc-rule doc-muted text-[12px] font-semibold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b doc-rule last:border-b-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3.5 py-3 align-top text-[13px] leading-[1.6]">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case "code":
      return (
        <pre className="doc-soft m-0 overflow-x-auto rounded-lg border doc-rule px-4 py-3.5">
          <code
            className="mono block text-[13px] leading-[1.65] whitespace-pre-wrap"
            style={{ color: "var(--doc-fg)" }}
          >
            {block.text}
          </code>
        </pre>
      )

    case "callout": {
      const tone = CALLOUT_TONE[block.tone]
      const Icon = tone.icon
      return (
        <div
          className="rounded-lg border-l-[3px] border-y border-r p-4 flex items-start gap-3"
          style={{
            borderColor: docAccent(tone.color, 30),
            borderLeftColor: docAccent(tone.color, 60),
            background: docTint(tone.color, 7),
          }}
        >
          <Icon
            className="shrink-0 mt-0.5 h-4 w-4"
            style={{ color: docAccent(tone.color, 70) }}
            aria-hidden
          />
          <div className="min-w-0">
            <div className="text-[13px] font-semibold" style={{ color: docAccent(tone.color, 55) }}>
              {block.title ?? tone.fallbackTitle}
            </div>
            <p className="m-0 mt-1 text-[15px]">{renderInline(block.text)}</p>
            {block.sellos && block.sellos.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {block.sellos.map((sello, i) => (
                  <span
                    key={i}
                    className="mono rounded-md border px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.08em]"
                    style={{
                      borderColor: docAccent(tone.color, 40),
                      color: docAccent(tone.color, 75),
                      background: docTint(tone.color, 14),
                    }}
                  >
                    {sello}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )
    }

    case "kv":
      return (
        <dl className="m-0 flex flex-col gap-0">
          {block.items.map((item, i) => (
            <div
              key={i}
              className="grid gap-x-4 gap-y-1 py-2.5 border-b doc-rule last:border-b-0 sm:grid-cols-[minmax(110px,180px)_minmax(0,1fr)]"
            >
              <dt
                className="mono text-[13px] font-semibold"
                style={{ color: docAccent("var(--av-blue-500)", 60) }}
              >
                {item.k}
              </dt>
              <dd className="m-0 text-[15px] leading-[1.65]">{renderInline(item.v)}</dd>
            </div>
          ))}
        </dl>
      )

    case "breakdown":
      return <Breakdown caption={block.caption} parts={block.parts} />

    case "notam":
      return <NotamFigure id={block.id} caption={block.caption} casillas={block.casillas} />

    case "figura":
      return (
        <Figura
          src={block.src}
          alt={block.alt}
          ancho={block.ancho}
          alto={block.alto}
          pie={block.pie}
          anchoMax={block.anchoMax}
        />
      )

    case "infografia": {
      const Infografia = INFOGRAFIAS[block.nombre]
      // Una referencia rota no puede tumbar la lección entera, igual que en
      // NotamFigure: si el nombre no existe, la sección sigue leyéndose.
      if (!Infografia) return null
      return (
        <Suspense fallback={<InfografiaCargando />}>
          <Infografia />
        </Suspense>
      )
    }

    case "notamPanel":
      return (
        <NotamPanel
          rotulo={block.rotulo}
          etiqueta={block.etiqueta}
          pie={block.pie}
          lineas={block.lineas}
        />
      )

    case "pasos":
      return <Pasos items={block.items} columnas={block.columnas} />

    case "secuencia":
      return (
        <Secuencia
          titulo={block.titulo}
          intro={block.intro}
          items={block.items}
          numerada={block.numerada}
          orientacion={block.orientacion}
          nota={block.nota}
        />
      )

    case "transicion":
      return <Transicion de={block.de} a={block.a} nota={block.nota} />

    case "cadena":
      return <Cadena items={block.items} />

    case "componente": {
      const color = block.color ?? ACENTO
      return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b doc-rule pb-3">
          <span
            className="mono grid h-7 w-7 flex-none place-items-center rounded-full text-[13px] font-semibold text-white"
            style={{ background: color }}
          >
            {block.n}
          </span>
          <span className="mono text-[20px] font-semibold" style={{ color }}>
            {block.token}
          </span>
          <span
            className="ln-display text-[20px] font-semibold lg:text-[24px]"
            style={{ lineHeight: 1.1, color: "var(--doc-fg)" }}
          >
            {block.nombre}
          </span>
          {block.detalle && (
            <span className="text-[14px] doc-muted">{block.detalle}</span>
          )}
        </div>
      )
    }

    case "encabezados":
      return <Encabezados items={block.items} pista={block.pista} />

    case "flujo":
      return <Flujo pasos={block.pasos} pista={block.pista} />

    case "tarjetas":
      return <Tarjetas items={block.items} pista={block.pista} />

    case "referencias":
      return <Referencias rotulo={block.rotulo} pista={block.pista} items={block.items} />

    case "check":
      return (
        <Check
          titulo={block.titulo}
          question={block.question}
          options={block.options}
          answer={block.answer}
          explain={block.explain}
        />
      )


    case "example":
      return (
        <div
          className="rounded-lg border p-4 sm:p-5"
          style={{
            borderColor: docAccent("var(--av-violet-400)", 28),
            background: docTint("var(--av-violet-400)", 6),
          }}
        >
          <div
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
            style={{ color: docAccent("var(--av-violet-400)", 60) }}
          >
            <PenLine className="h-3.5 w-3.5" aria-hidden /> {block.title}
          </div>
          <pre className="doc-soft mt-3 mb-0 overflow-x-auto rounded-lg border doc-rule px-4 py-3">
            <code
              className="mono block text-[13px] leading-[1.65] whitespace-pre-wrap"
              style={{ color: "var(--doc-fg)" }}
            >
              {block.code}
            </code>
          </pre>
          <ol className="mt-3.5 mb-0 pl-5 list-decimal flex flex-col gap-1.5 marker:font-semibold">
            {block.steps.map((s, i) => (
              <li key={i} className="pl-1 text-[15px] leading-[1.65]">
                {renderInline(s)}
              </li>
            ))}
          </ol>
          <p className="mt-3.5 mb-0 pt-3 border-t doc-rule text-[15px] leading-[1.7]">
            <strong className="font-semibold" style={{ color: "var(--doc-fg)" }}>
              Lectura:{" "}
            </strong>
            {renderInline(block.answer)}
          </p>
        </div>
      )

    case "summary":
      return (
        <div
          className="rounded-lg border p-4"
          style={{
            borderColor: docAccent("var(--av-green-400)", 26),
            background: docTint("var(--av-green-400)", 6),
          }}
        >
          <div
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
            style={{ color: docAccent("var(--av-green-400)", 55) }}
          >
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
            {block.title ?? "En resumen"}
          </div>
          <ul className="mt-2.5 mb-0 pl-5 list-disc flex flex-col gap-1.5">
            {block.items.map((s, i) => (
              <li key={i} className="pl-1 text-[15px] leading-[1.65]">
                {renderInline(s)}
              </li>
            ))}
          </ul>
        </div>
      )
  }
}

/**
 * Comprobación dentro de la lección.
 *
 * No guarda nada ni puntúa: no es una evaluación, es el momento de usar lo que
 * acabas de leer. Por eso responde en el sitio, muestra la explicación acierte
 * o falle, y deja volver a intentar. Lo que sí hace es cortar la lectura, que
 * es justo lo que la lección corrida no hacía.
 */
// ─── Piezas que se pulsan ────────────────────────────────────────────────────

/**
 * Panel de lectura de las piezas seleccionables.
 *
 * Reserva su alto y muestra la pista mientras no hay nada elegido: sin eso la
 * página salta cada vez que el alumno cambia de selección, que es justo lo que
 * hace que una pieza interactiva se sienta barata.
 */
function PanelLectura({ pista, children }: { pista?: string; children?: ReactNode }) {
  return (
    <div className="mt-3 flex min-h-[78px] items-center rounded-lg border doc-rule doc-soft px-4 py-3.5">
      {/* `||` y no `??`: quien llama pasa `false` cuando no hay seleccion,
          y `??` solo cae al respaldo con null o undefined. */}
      {children || <p className="m-0 text-[13.5px] leading-[1.55] doc-muted">{pista}</p>}
    </div>
  )
}

/** La flecha entre eslabones: a la derecha en escritorio, hacia abajo en móvil. */
function FlechaFlujo() {
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center self-center"
      style={{ color: docAccent(ACENTO, 40) }}
    >
      <ChevronRight className="hidden lg:block h-4 w-4" />
      <ChevronDown className="lg:hidden h-4 w-4" />
    </span>
  )
}

interface FlujoPaso {
  clave: string
  etiqueta: string
  sub?: string
  texto: string
}

/**
 * La cadena de la información, recorrible eslabón por eslabón.
 *
 * Se ilumina solo el elegido y los demás se quedan a la vista: la pieza enseña
 * la relación entre ellos, y atenuar el resto la rompería.
 */
function Flujo({ pasos, pista }: { pasos: FlujoPaso[]; pista?: string }) {
  const [activo, setActivo] = useState<string | null>(null)
  const elegido = pasos.find((p) => p.clave === activo)

  return (
    <section aria-label="Cadena de la información aeronáutica">
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-2">
        {pasos.map((paso, i) => {
          const on = paso.clave === activo
          return (
            <Fragment key={paso.clave}>
              {i > 0 && <FlechaFlujo />}
              <button
                type="button"
                onClick={() => setActivo(on ? null : paso.clave)}
                aria-pressed={on}
                className="flex-1 min-w-0 rounded-lg border px-3 py-3 text-center transition-colors"
                style={{
                  borderColor: on ? docAccent(ACENTO, 55) : "var(--doc-border)",
                  background: on ? docTint(ACENTO, 12) : "var(--doc-bg)",
                }}
              >
                <span
                  className="block text-[15px] font-semibold tracking-[-0.01em]"
                  style={{ color: on ? docAccent(ACENTO, 75) : "var(--doc-fg)" }}
                >
                  {paso.etiqueta}
                </span>
                {paso.sub && (
                  <span className="mt-0.5 block text-[12px] leading-[1.35] doc-muted">
                    {paso.sub}
                  </span>
                )}
              </button>
            </Fragment>
          )
        })}
      </div>
      <PanelLectura pista={pista}>
        {elegido && (
          <p className="m-0 text-[15px] leading-[1.6]">
            <strong className="font-semibold" style={{ color: docAccent(ACENTO, 75) }}>
              {elegido.etiqueta}.
            </strong>{" "}
            {elegido.texto}
          </p>
        )}
      </PanelLectura>
    </section>
  )
}

const TARJETA_ICONO: Record<TarjetaIcono, typeof Info> = {
  documento: FileText,
  movil: Smartphone,
  avion: Plane,
}

interface TarjetaItem {
  icono: TarjetaIcono
  titulo: string
  resumen: string
  detalle: string
}

/** Vías en fichas: cerradas dicen de qué van, abiertas lo desarrollan. */
function Tarjetas({ items, pista }: { items: TarjetaItem[]; pista?: string }) {
  const [abierta, setAbierta] = useState<number | null>(null)

  return (
    <section>
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((it, i) => {
          const on = abierta === i
          const Icono = TARJETA_ICONO[it.icono]
          return (
            <button
              key={i}
              type="button"
              onClick={() => setAbierta(on ? null : i)}
              aria-pressed={on}
              className="h-full rounded-lg border p-4 text-left transition-colors"
              style={{
                borderColor: on ? docAccent(ACENTO, 55) : "var(--doc-border)",
                background: on ? docTint(ACENTO, 10) : "var(--doc-bg)",
              }}
            >
              <Icono
                className="h-5 w-5"
                style={{ color: docAccent(ACENTO, on ? 75 : 55) }}
                aria-hidden
              />
              <span
                className="mt-2.5 block text-[15px] font-semibold tracking-[-0.01em]"
                style={{ color: "var(--doc-fg)" }}
              >
                {it.titulo}
              </span>
              <span className="mt-1 block text-[13.5px] leading-[1.5] doc-muted">{it.resumen}</span>
            </button>
          )
        })}
      </div>
      <PanelLectura pista={pista}>
        {abierta !== null && (
          <p className="m-0 text-[15px] leading-[1.6]">
            <strong className="font-semibold" style={{ color: docAccent(ACENTO, 75) }}>
              {items[abierta].titulo}.
            </strong>{" "}
            {items[abierta].detalle}
          </p>
        )}
      </PanelLectura>
    </section>
  )
}

interface ReferenciaItem {
  codigo: string
  nombre: string
  detalle: string
}

/** La norma que respalda, en fichas: presente sin ocupar media pantalla. */
function Referencias({
  rotulo,
  pista,
  items,
}: {
  rotulo?: string
  pista?: string
  items: ReferenciaItem[]
}) {
  const [activa, setActiva] = useState<number | null>(null)

  return (
    <section>
      {rotulo && (
        <div
          className="mono mb-2 text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: docAccent(ACENTO, 60) }}
        >
          {rotulo}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {items.map((it, i) => {
          const on = activa === i
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiva(on ? null : i)}
              aria-pressed={on}
              className="mono rounded-md border px-3 py-2 text-[12.5px] font-semibold transition-colors"
              style={{
                borderColor: on ? docAccent(ACENTO, 55) : "var(--doc-border)",
                background: on ? docTint(ACENTO, 12) : "var(--doc-bg)",
                color: on ? docAccent(ACENTO, 75) : "var(--doc-fg)",
              }}
            >
              {it.codigo}
            </button>
          )
        })}
      </div>
      <PanelLectura pista={pista}>
        {activa !== null && (
          <p className="m-0 text-[15px] leading-[1.6]">
            <strong className="font-semibold" style={{ color: docAccent(ACENTO, 75) }}>
              {items[activa].nombre}.
            </strong>{" "}
            {items[activa].detalle}
          </p>
        )}
      </PanelLectura>
    </section>
  )
}

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
function NotamPanel({
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

  return (
    <section className="overflow-hidden rounded-lg border doc-rule">
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
          const cuerpo = (
            <span className="grid gap-x-5 gap-y-1 sm:grid-cols-[minmax(0,140px)_minmax(0,1fr)]">
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
                  className="w-full border-l-[3px] px-4 py-3.5 text-left transition-colors sm:px-5"
                  style={{
                    borderLeftColor: on
                      ? docAccent(ACENTO, 70)
                      : linea.fuerte
                        ? docAccent(ACENTO, 45)
                        : "transparent",
                    background: on ? docTint(ACENTO, 9) : "transparent",
                  }}
                >
                  {cuerpo}
                </button>
              ) : (
                <div
                  className="border-l-[3px] px-4 py-3.5 sm:px-5"
                  style={{
                    borderLeftColor: linea.fuerte ? docAccent(ACENTO, 45) : "transparent",
                    background: linea.fuerte ? docTint(ACENTO, 5) : "transparent",
                  }}
                >
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

const PASO_ICONO: Record<PasoIcono, typeof Info> = {
  documento: FileText,
  codigo: KeyRound,
  ubicacion: MapPin,
  reloj: Clock,
  calendario: CalendarDays,
  alerta: AlertTriangle,
  vertical: ArrowUpDown,
}

interface PasoItem {
  rotulo: string
  codigo?: string
  texto: string
  icono?: PasoIcono
  etiqueta?: string
  completo?: boolean
  fuerte?: boolean
  interpretacion?: { texto: string; enOtrasPalabras?: string }
}

/** Un paso de lectura: el código real arriba y qué dice debajo. */
function Paso({ paso, n }: { paso: PasoItem; n: number }) {
  const [abierto, setAbierto] = useState(false)
  const Icono = paso.icono ? PASO_ICONO[paso.icono] : null

  return (
    <div
      className="h-full rounded-lg border p-4 sm:p-5"
      style={{
        borderColor: paso.fuerte ? docAccent(ACENTO, 40) : "var(--doc-border)",
        background: paso.fuerte ? docTint(ACENTO, 6) : "var(--doc-bg)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="mono text-[12px] font-semibold tabular"
          style={{ color: docAccent(ACENTO, 60) }}
        >
          {String(n).padStart(2, "0")}
        </span>
        {Icono && (
          <Icono className="h-4 w-4 shrink-0" style={{ color: docAccent(ACENTO, 55) }} aria-hidden />
        )}
        <span
          className="text-[14.5px] font-semibold tracking-[-0.01em]"
          style={{ color: "var(--doc-fg)" }}
        >
          {paso.rotulo}
        </span>
      </div>

      {paso.codigo && (
        <pre className="doc-soft mt-3 mb-0 overflow-x-auto rounded-md border doc-rule px-3.5 py-2.5">
          <code
            className="mono block whitespace-pre-wrap break-words text-[13px] leading-[1.7]"
            style={{ color: "var(--doc-fg)", fontWeight: paso.fuerte ? 600 : 400 }}
          >
            {paso.codigo}
          </code>
        </pre>
      )}

      <p className="m-0 mt-3 text-[14.5px] leading-[1.6]">{renderInline(paso.texto)}</p>

      {paso.etiqueta && (
        <span
          className="mt-3 inline-block rounded-md border px-2.5 py-1 text-[12px]"
          style={{
            borderColor: docAccent(ACENTO, 28),
            color: docAccent(ACENTO, 65),
            background: docTint(ACENTO, 7),
          }}
        >
          {paso.etiqueta}
        </span>
      )}

      {paso.interpretacion && (
        <div className="mt-3.5">
          {!abierto ? (
            <button
              type="button"
              onClick={() => setAbierto(true)}
              className="mono rounded-md border px-3 py-2 text-[11.5px] font-semibold uppercase tracking-[0.09em] transition-colors"
              style={{
                borderColor: docAccent(ACENTO, 40),
                color: docAccent(ACENTO, 70),
                background: "var(--doc-bg)",
              }}
            >
              Ver interpretación
            </button>
          ) : (
            <div className="rounded-md border doc-rule doc-soft px-4 py-3.5">
              <p className="m-0 text-[14.5px] leading-[1.6]">
                {renderInline(paso.interpretacion.texto)}
              </p>
              {paso.interpretacion.enOtrasPalabras && (
                <p
                  className="m-0 mt-3 border-l-[3px] pl-3.5 text-[14.5px] leading-[1.6]"
                  style={{ borderLeftColor: docAccent(ACENTO, 60) }}
                >
                  <strong className="font-semibold" style={{ color: docAccent(ACENTO, 75) }}>
                    En otras palabras:
                  </strong>{" "}
                  {renderInline(paso.interpretacion.enOtrasPalabras)}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Pasos({ items, columnas }: { items: PasoItem[]; columnas?: 2 }) {
  return (
    <div className={columnas === 2 ? "grid gap-3 sm:grid-cols-2" : "flex flex-col gap-3"}>
      {items.map((paso, i) => (
        <div key={i} className={columnas === 2 && paso.completo ? "sm:col-span-2" : undefined}>
          <Paso paso={paso} n={i + 1} />
        </div>
      ))}
    </div>
  )
}

/**
 * Una regla mental, no un ejercicio: se mira y se recuerda.
 *
 * Por eso no se pulsa nada. En vertical van las preguntas que uno se hace al
 * leer; en horizontal, el recorrido entero resumido en una línea.
 */
function Secuencia({
  titulo,
  intro,
  items,
  numerada,
  orientacion = "vertical",
  nota,
}: {
  titulo?: string
  intro?: string
  items: string[]
  numerada?: boolean
  orientacion?: "vertical" | "horizontal"
  nota?: string
}) {
  const conCaja = Boolean(titulo)
  const horizontal = orientacion === "horizontal"

  const cadena = horizontal ? (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
      {/* La flecha viaja pegada a su ficha: suelta, al saltar de linea deja
          un signo colgando al final de la anterior. */}
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          {i > 0 && (
            <ChevronRight
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: docAccent(ACENTO, 40) }}
              aria-hidden
            />
          )}
          <span
            className="rounded-md border px-3 py-1.5 text-[13.5px] font-semibold"
            style={{
              borderColor: docAccent(ACENTO, 28),
              color: docAccent(ACENTO, 72),
              background: "var(--doc-bg)",
            }}
          >
            {it}
          </span>
        </span>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-stretch gap-1.5">
      {items.map((it, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <ChevronDown
              className="h-4 w-4 self-center"
              style={{ color: docAccent(ACENTO, 40) }}
              aria-hidden
            />
          )}
          <div
            className="flex items-center gap-3 rounded-md border px-4 py-3"
            style={{ borderColor: docAccent(ACENTO, 26), background: "var(--doc-bg)" }}
          >
            {numerada && (
              <span
                className="mono text-[12px] font-semibold tabular"
                style={{ color: docAccent(ACENTO, 58) }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            <span className="text-[15px] font-semibold" style={{ color: "var(--doc-fg)" }}>
              {it}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  )

  const contenido = (
    <>
      {titulo && (
        <div
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
          style={{ color: docAccent(ACENTO, 65) }}
        >
          <Plane className="h-3.5 w-3.5" aria-hidden /> {titulo}
        </div>
      )}
      {intro && (
        <p className={titulo ? "m-0 mt-2 text-[15px] leading-[1.6]" : "m-0 text-[15px] leading-[1.6]"}>
          {renderInline(intro)}
        </p>
      )}
      <div className={titulo || intro ? "mt-4" : ""}>{cadena}</div>
      {nota && <p className="m-0 mt-4 text-[14px] leading-[1.6] doc-muted">{renderInline(nota)}</p>}
    </>
  )

  if (!conCaja) return <section>{contenido}</section>
  return (
    <section
      className="rounded-lg border p-4 sm:p-5"
      style={{ borderColor: docAccent(ACENTO, 26), background: docTint(ACENTO, 5) }}
    >
      {contenido}
    </section>
  )
}

/**
 * Puente entre dos ejemplos. Entra al llegar a pantalla, una vez y suave: la
 * animación está para decir "seguimos, ahora en otro país", no para lucirse.
 * `useInView` ya respeta a quien pide menos movimiento.
 */
function Transicion({ de, a, nota }: { de: string; a: string; nota?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 })

  const ficha = (texto: string, entra: boolean) => (
    <span
      className="rounded-md border px-4 py-2.5 text-[15px] font-semibold transition-all duration-500"
      style={{
        borderColor: docAccent(ACENTO, 32),
        color: docAccent(ACENTO, 75),
        background: "var(--doc-bg)",
        opacity: entra ? 1 : 0,
        transform: entra ? "none" : "translateX(-8px)",
      }}
    >
      {texto}
    </span>
  )

  return (
    <section ref={ref}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {ficha(de, true)}
        <ChevronRight
          className="h-5 w-5 transition-opacity duration-500"
          style={{ color: docAccent(ACENTO, 45), opacity: inView ? 1 : 0 }}
          aria-hidden
        />
        {ficha(a, inView)}
      </div>
      {nota && (
        <p className="m-0 mt-4 text-center text-[15px] leading-[1.6]">{renderInline(nota)}</p>
      )}
    </section>
  )
}

interface CadenaItem {
  token: string
  rotulo: string
  color?: string
}

/**
 * El mapa completo de una línea: tokens en fila con una palabra debajo.
 *
 * Va en su propio carril horizontal, igual que la línea Q de la infografía,
 * para que siempre se lea de una sola vez; en móvil se desplaza en vez de
 * partirse en dos filas con una flecha colgando. Cada token lleva el color de
 * su pieza, que es lo que hace que el alumno lo reconozca como el mismo.
 */
function Cadena({ items }: { items: CadenaItem[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border doc-rule doc-soft px-4 py-5 sm:px-5">
      {/* Medidas apretadas a proposito: siete tokens con sus flechas tienen
          que caber enteros en los 716 px de la columna, que es el sentido de
          un mapa completo. En movil el carril se desplaza. */}
      <div className="flex min-w-max items-start justify-center gap-1.5">
        {items.map((it, i) => {
          const color = it.color ?? ACENTO
          return (
            <div key={i} className="flex items-start gap-1.5">
              {i > 0 && (
                <ChevronRight
                  className="mt-2 h-3.5 w-3.5 shrink-0"
                  style={{ color: docAccent(ACENTO, 35) }}
                  aria-hidden
                />
              )}
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className="mono rounded-md px-2 py-1 text-[13px] font-semibold"
                  style={{
                    color,
                    background: "var(--doc-bg)",
                    border: `1.5px solid ${color}`,
                  }}
                >
                  {it.token}
                </span>
                <span
                  className="mono text-[10.5px] font-semibold uppercase tracking-[0.08em]"
                  style={{ color: docAccent(color, 70) }}
                >
                  {it.rotulo}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface EncabezadoItem {
  partes: { token: string; label: string }[]
}

/**
 * Encabezados de NOTAM que se abren para enseñar sus piezas.
 *
 * Cerrados son las líneas tal cual las ve el piloto. Al abrir uno, cada pieza
 * recibe su filete de color y su rótulo debajo, con la misma gramática visual
 * del bloque `breakdown`, para que el alumno no tenga que aprender dos formas
 * de leer lo mismo.
 */
function Encabezados({ items, pista }: { items: EncabezadoItem[]; pista?: string }) {
  const [abierto, setAbierto] = useState<number | null>(null)

  return (
    <section>
      {pista && <p className="m-0 mb-3 text-[13px] doc-muted">{pista}</p>}
      <div className="flex flex-col gap-2">
        {items.map((it, i) => {
          const on = abierto === i
          return (
            <button
              key={i}
              type="button"
              onClick={() => setAbierto(on ? null : i)}
              aria-pressed={on}
              className="w-full rounded-lg border px-4 py-3.5 text-left transition-colors"
              style={{
                borderColor: on ? docAccent(ACENTO, 55) : "var(--doc-border)",
                background: on ? docTint(ACENTO, 8) : "var(--doc-soft)",
              }}
            >
              <span className="mono flex flex-wrap items-start gap-x-5 gap-y-2.5 text-[14px] sm:text-[15px]">
                {it.partes.map((p, j) => (
                  <span key={j} className="inline-flex flex-col gap-1">
                    <span className="font-semibold whitespace-pre" style={{ color: "var(--doc-fg)" }}>
                      {p.token}
                    </span>
                    {on && (
                      <>
                        <span
                          className="h-[3px] w-full rounded-full"
                          style={{ background: docAccent(breakdownColor(j), 62) }}
                          aria-hidden
                        />
                        <span
                          className="max-w-[16ch] text-[11px] font-semibold leading-[1.35]"
                          style={{ color: docAccent(breakdownColor(j), 62) }}
                        >
                          {p.label}
                        </span>
                      </>
                    )}
                  </span>
                ))}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function Check({
  titulo,
  question,
  options,
  answer,
  explain,
}: {
  titulo?: string
  question: string
  options: string[]
  answer: number
  explain: string
}) {
  const [picked, setPicked] = useState<number | null>(null)
  const acerto = picked === answer

  return (
    <div
      className="rounded-lg border p-4 sm:p-5"
      style={{
        borderColor: docAccent("var(--av-blue-500)", 26),
        background: docTint("var(--av-blue-500)", 5),
      }}
    >
      <div
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
        style={{ color: docAccent("var(--av-blue-500)", 60) }}
      >
        <HelpCircle className="h-3.5 w-3.5" aria-hidden /> {titulo ?? "Compruébalo"}
      </div>
      <p className="mt-2 mb-0 text-[15px] leading-[1.7]">{renderInline(question)}</p>

      <ul className="mt-3.5 mb-0 p-0 list-none flex flex-col gap-2">
        {options.map((op, i) => {
          const elegida = picked === i
          const esLaBuena = i === answer
          // Al responder se marca la elegida y, si falló, también la correcta:
          // dejar la buena sin señalar obliga a adivinar cuál era.
          const revelada = picked !== null && (elegida || esLaBuena)
          const tono = esLaBuena ? "var(--av-green-400)" : "var(--av-red-400)"
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => setPicked(i)}
                aria-pressed={elegida}
                className="w-full text-left rounded-lg border px-3.5 py-2.5 text-[15px] leading-[1.55] transition-colors"
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
                  <span className="min-w-0">{renderInline(op)}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {picked !== null && (
        <div
          className="mt-3.5 pt-3 border-t doc-rule text-[15px] leading-[1.7]"
          role="status"
          aria-live="polite"
        >
          <span
            className="font-semibold"
            style={{
              color: docAccent(acerto ? "var(--av-green-400)" : "var(--av-amber-400)", 60),
            }}
          >
            {acerto ? "Correcto. " : "No es esa. "}
          </span>
          {renderInline(explain)}
        </div>
      )}
    </div>
  )
}

/**
 * Ilustración dentro de la hoja, con su pie.
 *
 * El ancho máximo es la medida de lectura de la hoja (las mismas 64 columnas
 * que la entradilla), no el del contenedor: una imagen a todo lo ancho corta el
 * ritmo del texto que la rodea. `NotamFigure` es la excepción justificada, y
 * por eso es otra pieza: un recorte de la Aerocivil es texto dentro de un píxel
 * y por debajo de 700 px deja de leerse.
 */
function Figura({
  src,
  alt,
  ancho,
  alto,
  pie,
  anchoMax,
}: {
  src: string
  alt: string
  ancho: number
  alto: number
  pie?: string
  anchoMax?: number
}) {
  return (
    <figure
      className={anchoMax ? "m-0 w-full mx-auto" : "m-0 w-full"}
      style={anchoMax ? { maxWidth: anchoMax } : undefined}
    >
      <img
        src={src}
        alt={alt}
        width={ancho}
        height={alto}
        loading="lazy"
        decoding="async"
        className="block w-full h-auto rounded-lg border doc-rule"
      />
      {pie && <figcaption className="mt-2 text-[13px] leading-[1.6] doc-muted">{pie}</figcaption>}
    </figure>
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
function NotamFigure({
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
            {DISCLAIMERS.national}
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
function Breakdown({ caption, parts }: { caption?: string; parts: BreakdownPart[] }) {
  return (
    <figure className="doc-soft m-0 rounded-lg border doc-rule p-4 sm:p-5">
      <div className="overflow-x-auto -mx-1 px-1">
        <div className="mono flex flex-wrap items-start gap-x-3 gap-y-3 text-[13px] sm:text-[15px]">
          {parts.map((p, i) => (
            <span key={i} className="inline-flex flex-col gap-1">
              <span className="font-semibold whitespace-pre" style={{ color: "var(--doc-fg)" }}>
                {p.token}
              </span>
              <span
                className="h-[3px] w-full rounded-full"
                style={{ background: docAccent(breakdownColor(i), 62) }}
                aria-hidden
              />
              <span
                className="text-[11px] font-semibold tabular"
                style={{ color: docAccent(breakdownColor(i), 62) }}
                aria-hidden
              >
                {i + 1}
              </span>
            </span>
          ))}
        </div>
      </div>

      <ol className="mt-4 mb-0 p-0 list-none grid gap-x-5 gap-y-2 sm:grid-cols-2">
        {parts.map((p, i) => (
          <li key={i} className="flex items-baseline gap-2 text-[13px] leading-[1.6]">
            <span
              className="mono shrink-0 text-[11px] font-semibold tabular"
              style={{ color: docAccent(breakdownColor(i), 62) }}
            >
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="mono font-semibold" style={{ color: "var(--doc-fg)" }}>
                {p.token}
              </span>{" "}
              <span className="doc-muted">{p.label}</span>
              {p.detail && <span className="block mt-0.5 doc-muted">{renderInline(p.detail)}</span>}
            </span>
          </li>
        ))}
      </ol>

      {caption && (
        <figcaption className="mt-4 pt-3 border-t doc-rule text-[13px] leading-[1.6] doc-muted">
          {renderInline(caption)}
        </figcaption>
      )}
    </figure>
  )
}
