/**
 * Bloques de la lección-documento que se responden: emparejar, desplegables y
 * verificación. Los usa DocBlock (DocLessonBlocks.tsx).
 */

import { type ReactNode, useState } from "react"
import { CheckCircle2, HelpCircle, PenLine } from "lucide-react"
import { docAccent, docTint } from "@/lib/docSheet"
import { renderInline } from "@/components/lesson/inline"

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
export function Emparejar({
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
export function Desplegables({
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

export function Check({
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
