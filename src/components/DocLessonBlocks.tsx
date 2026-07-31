/**
 * Bloques de la lección en formato documento (.doc-sheet).
 *
 * Es el renderer que estrenó la lección NOTAM, extraído para que cualquier
 * lección-documento (METAR y las que vengan) se lea idéntica: mismos bloques,
 * mismos colores de papel, mismo marcado ligero. Si se cambia algo aquí,
 * cambian todas las lecciones a la vez, que es la gracia.
 */

import type { ReactNode } from "react"
import { AlertTriangle, Info, Lightbulb } from "lucide-react"
import type { LessonBlock } from "@/lib/notamLesson"
import { docAccent, docTint } from "@/lib/docSheet"

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
        <strong key={i} className="font-bold" style={{ color: "var(--doc-fg)" }}>
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
                    className="px-3.5 py-2.5 border-b doc-rule doc-muted text-[12px] font-bold uppercase tracking-[0.07em]"
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
            <div className="text-[13px] font-bold" style={{ color: docAccent(tone.color, 55) }}>
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
                className="mono text-[13px] font-bold"
                style={{ color: docAccent("var(--av-blue-500)", 60) }}
              >
                {item.k}
              </dt>
              <dd className="m-0 text-[15px] leading-[1.65]">{renderInline(item.v)}</dd>
            </div>
          ))}
        </dl>
      )
  }
}
