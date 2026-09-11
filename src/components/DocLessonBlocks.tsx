/**
 * Bloques de la lección en formato documento (.doc-sheet).
 *
 * Es el renderer que estrenó la lección NOTAM, extraído para que cualquier
 * lección-documento (METAR y las que vengan) se lea idéntica: mismos bloques,
 * mismos colores de papel, mismo marcado ligero. Si se cambia algo aquí,
 * cambian todas las lecciones a la vez, que es la gracia.
 *
 * Aquí vive DocBlock, que decide qué pintar según `block.kind`. Las piezas
 * grandes van por familia en components/lesson/: BloquesDiagrama (flujos,
 * pasos, tarjetas…), BloquesLectura (NOTAM campo por campo, laboratorio,
 * abreviaturas…), BloquesEjercicio (emparejar, desplegables, verificación),
 * BloquesModulo y BloquesPiloto.
 */

import { ImagenAmpliable } from "@/components/lesson/ImagenAmpliable"
import { type CSSProperties, lazy, Suspense } from "react"
import { Link } from "react-router-dom"
import { AlertTriangle, CheckCircle2, ChevronRight, Info, Lightbulb, PenLine, ShieldCheck } from "lucide-react"
import { useInView } from "@/hooks/useInView"
import type { DocBlockData } from "@/lib/docBlocks"
import { docAccent, docTint } from "@/lib/docSheet"
import { renderInline } from "@/components/lesson/inline"
import { CasoReal, EnLaOperacion, Escenario, Fichas, Norma, PonAPrueba } from "@/components/lesson/BloquesModulo"
import { DetalleTecnico, Entrevista, PiensaComoPiloto, Reconoce } from "@/components/lesson/BloquesPiloto"
import { ACENTO } from "@/components/lesson/bloquesComun"
import {
  Abreviaturas,
  Breakdown,
  BreakdownColumnas,
  Laboratorio,
  NotamFigure,
  NotamPanel,
  ReglaLectura,
  Traduccion,
} from "@/components/lesson/BloquesLectura"
import {
  Cadena,
  Encabezados,
  EtapaRuta,
  Flujo,
  Pasos,
  Referencias,
  Secuencia,
  Tarjetas,
  Transicion,
} from "@/components/lesson/BloquesDiagrama"
import { Check, Desplegables, Emparejar } from "@/components/lesson/BloquesEjercicio"

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
