/**
 * Bloques de la lección en formato documento (.doc-sheet).
 *
 * Es el renderer que estrenó la lección NOTAM, extraído para que cualquier
 * lección-documento (METAR y las que vengan) se lea idéntica: mismos bloques,
 * mismos colores de papel, mismo marcado ligero. Si se cambia algo aquí,
 * cambian todas las lecciones a la vez, que es la gracia.
 */

import { ImagenAmpliable } from "@/components/lesson/ImagenAmpliable"
import { Fragment, lazy, Suspense, useState, type CSSProperties, type ReactNode } from "react"
import { Link } from "react-router-dom"
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
import type { BreakdownPart, CampoNotam, LabNotam, PasoIcono, TarjetaIcono } from "@/lib/notamLesson"
import type { DocBlockData } from "@/lib/docBlocks"
import { AVISO_NACIONALES, NATIONAL_NOTAMS, notamImageUrl } from "@/lib/notamNacionales"
import { docAccent, docTint } from "@/lib/docSheet"
import { renderInline } from "@/components/lesson/inline"
import {
  CasoReal,
  EnLaOperacion,
  Escenario,
  Fichas,
  Norma,
  PonAPrueba,
} from "@/components/lesson/BloquesModulo"
import {
  DetalleTecnico,
  Entrevista,
  PiensaComoPiloto,
  Reconoce,
} from "@/components/lesson/BloquesPiloto"
import { LINEA_Q_COLOR } from "@/lib/lineaQ"
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

/**
 * Bloques propios de Mercancías peligrosas, cargados aparte por la misma razón
 * que las infografías: traen sus datos y solo los usa ese módulo.
 */
const ClasesMP = lazy(() =>
  import("@/components/lesson/BloquesMercancias").then((m) => ({ default: m.ClasesMP })),
)
const EtiquetasMP = lazy(() =>
  import("@/components/lesson/BloquesMercancias").then((m) => ({ default: m.EtiquetasMP })),
)

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
  LINEA_Q_COLOR.fir,
  LINEA_Q_COLOR.codigo,
  LINEA_Q_COLOR.transito,
  LINEA_Q_COLOR.objetivo,
  LINEA_Q_COLOR.alcance,
  LINEA_Q_COLOR.limites,
  LINEA_Q_COLOR.area,
]

function breakdownColor(i: number): string {
  return BREAKDOWN_COLORS[i % BREAKDOWN_COLORS.length]
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
        // El filete pasa al envoltorio: con línea de apoyo tiene que quedar
        // por debajo de las dos, que son una sola cabecera. Y la línea va en
        // <div>, no en <p>: la prosa del lector se justifica, y una línea
        // suelta justificada abre huecos entre palabras.
        <div className="mt-3 border-b doc-rule pb-4">
          {block.n && <div className="ln-epigrafe mb-2">{block.n}</div>}
          <h2
            className="ln-display m-0 text-[28px] font-semibold lg:text-[34px]"
            style={{ lineHeight: 1.12, letterSpacing: "-0.012em", color: "var(--doc-fg)" }}
          >
            {block.text}
          </h2>
          {block.sub && (
            <div className="mt-2 text-[15px] leading-[1.55] doc-muted">
              {renderInline(block.sub)}
            </div>
          )}
        </div>
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
        <pre
          className={
            block.grande
              ? "doc-soft m-0 overflow-x-auto rounded-lg border doc-rule px-4 py-5 sm:px-6"
              : "doc-soft m-0 overflow-x-auto rounded-lg border doc-rule px-4 py-3.5"
          }
        >
          <code
            className={[
              "mono block",
              // Un NOTAM se ajusta al ancho; un NOTOC no, o pierde las columnas.
              block.tabular ? "whitespace-pre" : "whitespace-pre-wrap",
              block.grande
                ? "text-[15px] font-semibold leading-[1.7] sm:text-[18px]"
                : "text-[13px] leading-[1.65]",
            ].join(" ")}
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
              {/* Cada fila puede llevar su color. Lo usa el resumen de la
                  línea Q, donde cada token va del color de su pieza y el
                  alumno reconoce de un vistazo cuál es cuál. */}
              <dt
                className="mono text-[13px] font-semibold"
                style={{ color: docAccent(item.color ?? "var(--av-blue-500)", 68) }}
              >
                {item.k}
              </dt>
              <dd className="m-0 text-[15px] leading-[1.65]" style={variablesDeChip(item.color)}>
                {renderInline(item.v)}
              </dd>
            </div>
          ))}
        </dl>
      )

    case "cta":
      return (
        <section>
          {block.texto && (
            <p className="m-0 mb-4 text-[15px] leading-[1.7]">{renderInline(block.texto)}</p>
          )}
          <Link
            to={block.destino}
            className="inline-flex min-h-[46px] items-center gap-2 rounded-md px-5 text-[15px] font-semibold text-white transition-[filter] hover:brightness-110"
            style={{ background: docAccent(ACENTO, 68) }}
          >
            {block.rotulo}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      )

    case "laboratorio":
      return <Laboratorio intro={block.intro} items={block.items} />

    case "abreviaturas":
      return (
        <Abreviaturas
          titulo={block.titulo}
          intro={block.intro}
          items={block.items}
          nota={block.nota}
        />
      )

    case "traduccion":
      return (
        <Traduccion
          codigo={block.codigo}
          significado={block.significado}
          marcar={block.marcar}
        />
      )

    case "reglaLectura":
      return (
        <ReglaLectura
          lema={block.lema}
          pasos={block.pasos}
          codigo={block.codigo}
          significado={block.significado}
        />
      )

    case "etapaRuta":
      return <EtapaRuta etapa={block.etapa} de={block.de} a={block.a} />

    case "breakdown":
      return block.columnas ? (
        <BreakdownColumnas
          parts={block.parts}
          caption={block.caption}
          resultado={block.resultado}
          color={block.color}
        />
      ) : (
        <Breakdown caption={block.caption} parts={block.parts} />
      )

    case "notam":
      return <NotamFigure id={block.id} caption={block.caption} casillas={block.casillas} />

    /* Bloques de curso: norma, caso real, en la operación, escenario, pon a
       prueba y fichas. Viven en BloquesModulo porque no saben de NOTAM. */
    case "norma":
      return <Norma block={block} />
    case "casoReal":
      return <CasoReal block={block} />
    case "enLaOperacion":
      return <EnLaOperacion block={block} />
    case "escenario":
      return <Escenario block={block} />
    case "ponAPrueba":
      return <PonAPrueba block={block} />
    case "fichas":
      return <Fichas block={block} />
    case "reconoce":
      return <Reconoce block={block} />

    case "piensaComoPiloto":
      return <PiensaComoPiloto block={block} />

    case "entrevista":
      return <Entrevista block={block} />

    /* Los hijos se pintan aquí, con el mismo DocBlock: así dentro del detalle
       cabe cualquier bloque del catálogo sin reescribirlo. */
    case "detalleTecnico":
      return (
        <DetalleTecnico etiqueta={block.etiqueta} cita={block.cita}>
          {block.bloques.map((b, i) => (
            <DocBlock key={i} block={b} />
          ))}
        </DetalleTecnico>
      )

    case "clasesMP":
      return (
        <Suspense fallback={<InfografiaCargando />}>
          <ClasesMP />
        </Suspense>
      )
    case "etiquetasMP":
      return (
        <Suspense fallback={<InfografiaCargando />}>
          <EtiquetasMP grupo={block.grupo} />
        </Suspense>
      )

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
          centrada={block.centrada}
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

    case "codigos": {
      const color = block.color ?? ACENTO
      return (
        <section className="overflow-hidden rounded-lg border doc-rule">
          <div
            className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 border-b doc-rule px-4 py-2.5 sm:px-5"
            style={{ background: docTint(color, 8) }}
          >
            <div>
              <div className="ln-display text-[15.5px] font-semibold" style={{ color: "var(--doc-fg)" }}>
                {block.titulo}
              </div>
              {block.sub && <div className="mt-0.5 text-[12.5px] doc-muted">{block.sub}</div>}
            </div>
            {block.fuente && (
              <div
                className="mono pt-[3px] text-[10.5px] font-semibold uppercase tracking-[0.08em] doc-muted"
              >
                Fuente: {block.fuente}
              </div>
            )}
          </div>
          <ul
            className="m-0 grid list-none gap-x-6 px-4 py-2 sm:grid-cols-2 sm:px-5"
            style={{ background: "var(--doc-bg)" }}
          >
            {block.items.map((it, i) => (
              <li
                key={i}
                className="flex items-baseline gap-3 border-b py-1.5 text-[13.5px] last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
                style={{ borderColor: "var(--doc-border)" }}
              >
                <code
                  className="mono w-[30px] flex-none rounded px-1.5 py-0.5 text-center text-[12.5px] font-semibold"
                  style={{ color, background: docTint(color, 12) }}
                >
                  {it.k}
                </code>
                <span style={{ color: "var(--doc-fg)" }}>{it.v}</span>
              </li>
            ))}
          </ul>
        </section>
      )
    }

    case "componente": {
      const color = block.color ?? ACENTO
      // Primero el nombre y después el token: se lee "FIR, SEFG", que es como
      // un piloto lo diría. Y grande, porque es el título de la pieza: lo que
      // cuelga debajo va más pequeño.
      return (
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b doc-rule pb-3.5">
          <span
            className="mono grid h-8 w-8 flex-none place-items-center self-center rounded-full text-[14px] font-semibold text-white"
            style={{ background: color }}
          >
            {block.n}
          </span>
          <h2
            className="ln-display m-0 text-[26px] font-semibold lg:text-[30px]"
            style={{ lineHeight: 1.1, color: "var(--doc-fg)" }}
          >
            {block.nombre}
          </h2>
          {block.token && (
            <span className="mono text-[22px] font-semibold lg:text-[24px]" style={{ color }}>
              {block.token}
            </span>
          )}
          {block.detalle && (
            <span className="text-[14.5px] doc-muted">{block.detalle}</span>
          )}
        </div>
      )
    }

    case "apartado":
      return (
        <section style={variablesDeChip(block.color)}>
          {block.titulo && (
            <h3
              className="ln-display m-0 text-[18px] font-semibold lg:text-[20px]"
              style={{ lineHeight: 1.2, color: "var(--doc-fg)" }}
            >
              {block.titulo}
            </h3>
          )}
          <div className={block.titulo ? "mt-2.5 flex flex-col gap-3" : "flex flex-col gap-3"}>
            {block.parrafos.map((t, i) => (
              <p key={i} className="m-0 text-[15px] leading-[1.7]">
                {renderInline(t)}
              </p>
            ))}
          </div>
        </section>
      )

    case "encabezados":
      return <Encabezados items={block.items} pista={block.pista} />

    case "flujo":
      return <Flujo pasos={block.pasos} pista={block.pista} />

    case "tarjetas":
      return <Tarjetas items={block.items} pista={block.pista} />

    case "referencias":
      return <Referencias rotulo={block.rotulo} pista={block.pista} items={block.items} />

    case "emparejar":
      return (
        <Emparejar
          titulo={block.titulo}
          enunciado={block.enunciado}
          pares={block.pares}
          orden={block.orden}
        />
      )

    case "desplegables":
      return (
        <Desplegables
          titulo={block.titulo}
          enunciado={block.enunciado}
          codigo={block.codigo}
          filas={block.filas}
        />
      )

    case "check":
      return (
        <Check
          titulo={block.titulo}
          codigo={block.codigo}
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
/**
 * Tiñe las pastillas de código de un trozo de lección con el color de su pieza.
 *
 * Existe para que `I`, `V` y `IV` dentro del texto de Tránsito se vean del
 * mismo violeta que el token `IV` de la línea Q de arriba, y `N`, `B` y `O`
 * del mismo ámbar que `NBO`. El color deja de ser decoración y pasa a ser lo
 * que ata la explicación con la pieza.
 *
 * El texto va mezclado con `--doc-fg` (docAccent) y no el color puro: el ámbar
 * puro sobre papel se queda corto de contraste para un texto de 13 px.
 */
function variablesDeChip(color?: string): CSSProperties | undefined {
  if (!color) return undefined
  return {
    "--doc-chip-bg": docTint(color, 12),
    "--doc-chip-fg": docAccent(color, 78),
    "--doc-chip-bd": docAccent(color, 30),
  } as CSSProperties
}

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
function BreakdownColumnas({
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
  centrada,
  nota,
}: {
  titulo?: string
  intro?: string
  items: string[]
  numerada?: boolean
  orientacion?: "vertical" | "horizontal"
  centrada?: boolean
  nota?: string
}) {
  const conCaja = Boolean(titulo)
  const horizontal = orientacion === "horizontal"

  const cadena = horizontal ? (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-2${
        centrada ? " justify-center" : ""
      }`}
    >
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
      className="rounded-md border px-4 py-2.5 text-[15px] font-semibold transition-[color,background-color,border-color,box-shadow] duration-500"
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

/**
 * El carril de etapas del vuelo: salida, ruta y destino.
 *
 * Las tres paradas caen en el centro de tres columnas iguales, y el carril,
 * el avion y los puntos se posicionan en esos mismos tercios. Asi el rotulo
 * de los extremos no se sale de la caja, que es lo que pasaria centrando
 * cada rotulo sobre un punto en el 0 y en el 100 por ciento.
 */
function EtapaRuta({
  etapa,
  de,
  a,
}: {
  etapa: "salida" | "ruta" | "destino" | "aproximacion"
  de: string
  a: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.45 })

  const paradas = [
    { clave: "salida", rotulo: "Salida", codigo: de },
    { clave: "ruta", rotulo: "En ruta", codigo: "FIR" },
    { clave: "destino", rotulo: "Destino", codigo: a },
    { clave: "aproximacion", rotulo: "Aproximación", codigo: a },
  ]
  const indice = paradas.findIndex((p) => p.clave === etapa)
  // El centro de cada columna, en tantos por ciento del ancho del carril.
  const centro = (i: number) => ((i * 2 + 1) / (paradas.length * 2)) * 100
  const pct = centro(indice)

  return (
    <div
      ref={ref}
      className={`ln-aparece rounded-lg border doc-rule doc-soft px-4 pb-4 pt-7 sm:px-6${inView ? " ln-visible" : ""}`}
      aria-label={`Etapa del vuelo: ${paradas[indice].rotulo}`}
    >
      <div className="relative mx-auto max-w-[520px]">
        {/* El carril, sus paradas y el avion posado en la de esta etapa */}
        <div className="relative h-px w-full" style={{ background: docAccent(ACENTO, 16) }}>
          <div
            className="absolute bottom-[7px] -translate-x-1/2"
            style={{ left: `${pct}%` }}
          >
            <Plane
              className="ln-avion h-[17px] w-[17px]"
              style={{ color: docAccent(ACENTO, 74) }}
              aria-hidden
            />
          </div>
          <div
            className="ln-carril absolute inset-y-0 left-0"
            style={{ width: `${pct}%`, background: docAccent(ACENTO, 52) }}
            aria-hidden
          />
          {paradas.map((p, i) => {
            const hecha = i <= indice
            return (
              <span
                key={p.clave}
                className="absolute top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px]"
                style={{
                  left: `${centro(i)}%`,
                  borderColor: hecha ? docAccent(ACENTO, 62) : docAccent(ACENTO, 24),
                  background: i === indice ? docAccent(ACENTO, 62) : "var(--doc-bg)",
                }}
                aria-hidden
              />
            )
          })}
        </div>

        {/* Los rotulos, uno por columna. Mismo orden que la infografia:
            la etapa arriba y el indicador debajo. */}
        <div
          className="mt-3 grid"
          style={{ gridTemplateColumns: `repeat(${paradas.length}, minmax(0, 1fr))` }}
        >
          {paradas.map((p, i) => (
            <div key={p.clave} className="min-w-0 px-1 text-center">
              <div
                className="text-[10px] font-semibold uppercase leading-tight tracking-[0.1em] sm:text-[10.5px]"
                style={{ color: i === indice ? docAccent(ACENTO, 74) : "var(--doc-muted-fg)" }}
              >
                {p.rotulo}
              </div>
              <div
                className="mono mt-1 text-[12px] font-semibold"
                style={{ color: i === indice ? docAccent(ACENTO, 60) : "var(--doc-muted-fg)" }}
              >
                {p.codigo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
function Laboratorio({ intro, items }: { intro?: string; items: LabNotam[] }) {
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
function Abreviaturas({
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
function Traduccion({
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
function ReglaLectura({
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

/** Caja de ejercicio: el mismo marco azul que la comprobación de siempre. */
function CajaEjercicio({
  titulo,
  enunciado,
  children,
  pie,
}: {
  titulo?: string
  enunciado: string
  children: ReactNode
  pie?: ReactNode
}) {
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
        <PenLine className="h-3.5 w-3.5" aria-hidden /> {titulo ?? "Practica"}
      </div>
      <p className="mt-2 mb-0 text-[15px] leading-[1.7]">{renderInline(enunciado)}</p>
      <div className="mt-4">{children}</div>
      {pie}
    </div>
  )
}

interface Par {
  k: string
  v: string
  color?: string
}

/**
 * Emparejar tocando: primero el código, después su función.
 *
 * Sin arrastrar. En un celular el arrastre pelea con el desplazamiento de la
 * página y el ejercicio se convierte en una lucha con el dedo; tocando se
 * responde igual de bien con una mano y en cualquier pantalla.
 */
function Emparejar({
  titulo,
  enunciado,
  pares,
  orden,
}: {
  titulo?: string
  enunciado: string
  pares: Par[]
  orden: number[]
}) {
  const [elegido, setElegido] = useState<number | null>(null)
  const [resueltos, setResueltos] = useState<number[]>([])
  const [fallo, setFallo] = useState<number | null>(null)

  const completo = resueltos.length === pares.length

  function tocarFuncion(i: number) {
    if (elegido === null || resueltos.includes(i)) return
    if (elegido === i) {
      setResueltos((prev) => [...prev, i])
      setElegido(null)
      setFallo(null)
    } else {
      setFallo(i)
      setElegido(null)
      window.setTimeout(() => setFallo(null), 700)
    }
  }

  const estilo = (i: number, activo: boolean) => {
    const color = pares[i].color ?? "var(--av-blue-500)"
    if (resueltos.includes(i))
      return { borderColor: docAccent(color, 55), background: docTint(color, 12) }
    if (fallo === i)
      return {
        borderColor: docAccent("var(--av-red-400)", 50),
        background: docTint("var(--av-red-400)", 10),
      }
    if (activo)
      return { borderColor: docAccent(color, 55), background: docTint(color, 10) }
    return { borderColor: "var(--doc-border)", background: "var(--doc-bg)" }
  }

  return (
    <CajaEjercicio
      titulo={titulo}
      enunciado={enunciado}
      pie={
        completo ? (
          <p
            className="m-0 mt-4 flex items-center gap-1.5 text-[14px] font-semibold"
            style={{ color: docAccent("var(--av-green-400)", 62) }}
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden /> Los siete, emparejados.
          </p>
        ) : (
          <p className="m-0 mt-4 text-[13px] doc-muted">
            Toca un código y después su función. Van {resueltos.length} de {pares.length}.
          </p>
        )
      }
    >
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          {pares.map((p, i) => {
            const hecho = resueltos.includes(i)
            return (
              <button
                key={i}
                type="button"
                disabled={hecho}
                onClick={() => setElegido(elegido === i ? null : i)}
                aria-pressed={elegido === i}
                className="mono rounded-md border px-3 py-2.5 text-left text-[13px] font-semibold transition-colors"
                style={{
                  ...estilo(i, elegido === i),
                  color: hecho || elegido === i ? docAccent(p.color ?? "var(--av-blue-500)", 78) : "var(--doc-fg)",
                }}
              >
                {p.k}
              </button>
            )
          })}
        </div>
        <div className="flex flex-col gap-2">
          {orden.map((i) => {
            const hecho = resueltos.includes(i)
            return (
              <button
                key={i}
                type="button"
                disabled={hecho}
                onClick={() => tocarFuncion(i)}
                className="rounded-md border px-3 py-2.5 text-left text-[14px] transition-colors"
                style={{
                  ...estilo(i, false),
                  color: hecho ? docAccent(pares[i].color ?? "var(--av-blue-500)", 78) : "var(--doc-fg)",
                  fontWeight: hecho ? 600 : 400,
                }}
              >
                {pares[i].v}
              </button>
            )
          })}
        </div>
      </div>
    </CajaEjercicio>
  )
}

interface FilaDesplegable {
  token: string
  opciones: string[]
  correcta: number
  color?: string
}

/** Una fila por componente y un desplegable con las opciones. */
function Desplegables({
  titulo,
  enunciado,
  codigo,
  filas,
}: {
  titulo?: string
  enunciado: string
  codigo?: string
  filas: FilaDesplegable[]
}) {
  const [respuestas, setRespuestas] = useState<Record<number, number>>({})
  const aciertos = filas.filter((f, i) => respuestas[i] === f.correcta).length

  return (
    <CajaEjercicio
      titulo={titulo}
      enunciado={enunciado}
      pie={
        aciertos === filas.length ? (
          <p
            className="m-0 mt-4 flex items-center gap-1.5 text-[14px] font-semibold"
            style={{ color: docAccent("var(--av-green-400)", 62) }}
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden /> Línea Q interpretada de principio a fin.
          </p>
        ) : (
          <p className="m-0 mt-4 text-[13px] doc-muted">
            Van {aciertos} de {filas.length}.
          </p>
        )
      }
    >
      {codigo && (
        <pre className="doc-soft mb-4 mt-0 overflow-x-auto rounded-md border doc-rule px-3.5 py-2.5">
          <code
            className="mono block whitespace-pre-wrap break-words text-[13px] font-semibold leading-[1.7]"
            style={{ color: "var(--doc-fg)" }}
          >
            {codigo}
          </code>
        </pre>
      )}
      <div className="flex flex-col gap-2.5">
        {filas.map((f, i) => {
          const elegida = respuestas[i]
          const respondida = elegida !== undefined
          const bien = elegida === f.correcta
          const color = f.color ?? "var(--av-blue-500)"
          const tono = respondida ? (bien ? "var(--av-green-400)" : "var(--av-red-400)") : color
          return (
            <div key={i} className="grid gap-2 sm:grid-cols-[minmax(0,150px)_minmax(0,1fr)] sm:items-center">
              <code
                className="mono justify-self-start rounded-md border px-2.5 py-1 text-[13px] font-semibold"
                style={{
                  color: docAccent(color, 78),
                  background: docTint(color, 12),
                  borderColor: docAccent(color, 30),
                }}
              >
                {f.token}
              </code>
              <select
                value={elegida ?? ""}
                onChange={(e) => setRespuestas((prev) => ({ ...prev, [i]: Number(e.target.value) }))}
                aria-label={`Interpretación de ${f.token}`}
                className="w-full rounded-md border px-3 py-2 text-[14px]"
                style={{
                  borderColor: respondida ? docAccent(tono, 50) : "var(--doc-border)",
                  background: respondida ? docTint(tono, 9) : "var(--doc-bg)",
                  color: "var(--doc-fg)",
                }}
              >
                <option value="" disabled>
                  Elige la interpretación…
                </option>
                {f.opciones.map((op, j) => (
                  <option key={j} value={j}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
          )
        })}
      </div>
    </CajaEjercicio>
  )
}

function Check({
  titulo,
  codigo,
  question,
  options,
  answer,
  explain,
}: {
  titulo?: string
  codigo?: string
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
      {codigo && (
        <pre className="doc-soft mt-3 mb-0 overflow-x-auto rounded-md border doc-rule px-3.5 py-2.5">
          <code
            className="mono block whitespace-pre-wrap break-words text-[13px] leading-[1.7] font-semibold"
            style={{ color: "var(--doc-fg)" }}
          >
            {codigo}
          </code>
        </pre>
      )}
      <p className="mt-3 mb-0 text-[15px] leading-[1.7]">{renderInline(question)}</p>

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
  // Una imagen que aparece de golpe a mitad de scroll da un salto. Entra
  // subiendo diez pixeles, una sola vez, y con reduced-motion no se mueve.
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 })

  return (
    <figure
      ref={ref}
      className={`ln-aparece ${anchoMax ? "m-0 w-full mx-auto" : "m-0 w-full"}${inView ? " ln-visible" : ""}`}
      style={anchoMax ? { maxWidth: anchoMax } : undefined}
    >
      {/* Se abre en grande: las ilustraciones del curso traen rótulos que a
          ancho de columna no siempre se leen. La proporción va fijada para que
          la página no salte mientras carga, como hacían width y height. */}
      <ImagenAmpliable
        src={src}
        alt={alt}
        className="w-full rounded-lg border doc-rule"
        imgClassName="block w-full h-auto"
        imgStyle={{ aspectRatio: `${ancho} / ${alto}` }}
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
function Breakdown({ caption, parts }: { caption?: string; parts: BreakdownPart[] }) {
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
