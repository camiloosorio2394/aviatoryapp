/**
 * Bloques de la lección en formato documento (.doc-sheet).
 *
 * Es el renderer que estrenó la lección NOTAM, extraído para que cualquier
 * lección-documento (METAR y las que vengan) se lea idéntica: mismos bloques,
 * mismos colores de papel, mismo marcado ligero. Si se cambia algo aquí,
 * cambian todas las lecciones a la vez, que es la gracia.
 */

import type { ReactNode } from "react"
import { AlertTriangle, CheckCircle2, Info, Lightbulb, PenLine, ShieldAlert } from "lucide-react"
import type { BreakdownPart, LessonBlock } from "@/lib/notamLesson"
import { DISCLAIMERS, NATIONAL_NOTAMS, notamImageUrl } from "@/lib/notam"
import { docAccent, docTint } from "@/lib/docSheet"

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
  "info" | "warn" | "tip",
  { color: string; icon: typeof Info; fallbackTitle: string }
> = {
  info: { color: "var(--av-blue-500)", icon: Info, fallbackTitle: "Nota de fuente" },
  warn: { color: "var(--av-amber-400)", icon: AlertTriangle, fallbackTitle: "Ojo con esto" },
  tip: { color: "var(--av-green-400)", icon: Lightbulb, fallbackTitle: "Consejo" },
}

export function DocBlock({ block }: { block: LessonBlock }) {
  switch (block.kind) {
    case "p":
      return <p className="m-0 text-[15px]">{renderInline(block.text)}</p>

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
      return <NotamFigure id={block.id} caption={block.caption} />


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
 * Un NOTAM colombiano real dentro de la hoja de estudio.
 *
 * Todo sale de la ficha de `notams_nacionales.json`, incluidos el `alt` (que es
 * la transcripción completa del aviso, no un texto decorativo: un NOTAM en
 * imagen es texto dentro de un píxel y sin esto un lector de pantalla no lo lee)
 * y el aviso de vigencia, que es obligatorio en pantalla y va con cada imagen,
 * igual que en el modo práctica.
 */
function NotamFigure({ id, caption }: { id: string; caption?: string }) {
  const notam = NATIONAL_NOTAMS.find((n) => n.id === id)
  // Una referencia rota no puede tumbar la lección entera: se omite la imagen
  // y el texto de alrededor sigue explicando lo mismo.
  if (!notam) return null

  return (
    <figure className="m-0">
      {/* Los recortes del resumen de la Aerocivil son tiras muy anchas: por
          debajo de 720 px el texto del aviso deja de leerse, así que la imagen
          no se encoge más y la caja scrollea. Mismo criterio que en el modo
          práctica. Fondo blanco porque el recorte lo es. */}
      <div
        className="overflow-x-auto rounded-lg border doc-rule"
        style={{ background: "rgb(255 255 255)" }}
      >
        <img
          src={notamImageUrl(notam.imagen)}
          alt={notam.transcripcion}
          loading="lazy"
          className="block w-full min-w-[720px] h-auto"
        />
      </div>
      <figcaption className="mt-2 text-[13px] leading-[1.6] doc-muted">
        <span className="mono font-semibold" style={{ color: "var(--doc-fg)" }}>
          {notam.serie_numero}
        </span>{" "}
        · {notam.aerodromo}
        {caption && <span className="block mt-1">{renderInline(caption)}</span>}
        <span
          className="mt-2 flex items-start gap-1.5 text-[12px] leading-[1.55]"
          style={{ color: docAccent("var(--av-red-400)", 55) }}
        >
          <ShieldAlert className="shrink-0 mt-0.5 h-3.5 w-3.5" aria-hidden />
          <span>{DISCLAIMERS.national}</span>
        </span>
      </figcaption>
    </figure>
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
