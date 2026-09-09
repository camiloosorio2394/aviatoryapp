/**
 * Marcado ligero de las lecciones-documento, convertido a nodos de React sin
 * dangerouslySetInnerHTML. Soporta **negrita** y `codigo`, con los colores de
 * las variables --doc-*.
 *
 * Nació dentro de DocLessonBlocks y vive aparte para que los bloques de curso
 * (BloquesModulo) lo usen sin importar el renderizador entero.
 */

import type { ReactNode } from "react"
import { docAccent, docTint } from "@/lib/docSheet"

export function renderInline(text: string): ReactNode[] {
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
        // Las tres variables las pone quien envuelve el texto: dentro de una
        // pieza de la línea Q, el código va del color de esa pieza, el mismo
        // del token de arriba. Sin nadie que las ponga, el acento del lector.
        <code
          key={i}
          className="mono text-[0.9em] font-semibold px-[7px] py-[0.15em] rounded-md border break-words"
          style={{
            background: `var(--doc-chip-bg, ${docTint("var(--av-blue-500)", 10)})`,
            color: `var(--doc-chip-fg, ${docAccent("var(--av-blue-500)", 72)})`,
            borderColor: `var(--doc-chip-bd, ${docAccent("var(--av-blue-500)", 26)})`,
          }}
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
