import type { ReactNode } from "react"

/**
 * Las piezas de contenido del lector de módulo.
 *
 * Genéricas a propósito: cuando NOTAM y METAR migren a este formato, reusan
 * estas mismas. Nada aquí sabe de mercancías peligrosas.
 *
 * Todas usan las variables --mod-*, nunca los tokens del tema: dentro del
 * lector manda el diseño del módulo y la superficie no se invierte.
 */

/** Titular de sección, con su número. */
export function Titular({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-3">
      <span
        className="mono text-[13px] font-semibold tabular-nums"
        style={{ color: "var(--mod-muted)" }}
      >
        {n}
      </span>
      <h1
        className="m-0 text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] leading-tight"
        style={{ fontFamily: "var(--mod-display)", color: "var(--mod-title)" }}
      >
        {children}
      </h1>
    </div>
  )
}

/** Párrafo del cuerpo. */
export function P({ children }: { children: ReactNode }) {
  return (
    <p className="m-0 text-[15px] leading-[1.7]" style={{ color: "var(--mod-text)" }}>
      {children}
    </p>
  )
}

/** Entradilla: el párrafo de arranque, un punto más grande y apagado. */
export function Entradilla({ children }: { children: ReactNode }) {
  return (
    <p className="m-0 text-[16px] leading-[1.65]" style={{ color: "var(--mod-muted)" }}>
      {children}
    </p>
  )
}

/** Tarjeta de cifra: un número grande con su rótulo. */
export function Cifra({
  valor,
  rotulo,
  nota,
}: {
  valor: string
  rotulo: string
  nota?: string
}) {
  return (
    <div
      className="rounded-xl px-4 py-3.5"
      style={{ background: "var(--mod-panel-2)", border: "1px solid var(--mod-border-b)" }}
    >
      <div
        className="text-[24px] font-extrabold leading-none tabular-nums"
        style={{ fontFamily: "var(--mod-display)", color: "var(--mod-blue)" }}
      >
        {valor}
      </div>
      <div className="mt-1.5 text-[13px] font-semibold" style={{ color: "var(--mod-ink)" }}>
        {rotulo}
      </div>
      {nota && (
        <div className="mt-0.5 text-[12px]" style={{ color: "var(--mod-muted)" }}>
          {nota}
        </div>
      )}
    </div>
  )
}

/**
 * Aviso destacado.
 *
 * `permitido` y `prohibido` usan el verde y el rojo del sistema, que son
 * semánticos: no valen para llamar la atención sobre otra cosa.
 */
export function Aviso({
  tono = "info",
  titulo,
  children,
}: {
  tono?: "info" | "ojo" | "permitido" | "prohibido"
  titulo?: string
  children: ReactNode
}) {
  const estilos = {
    info: { bg: "var(--mod-panel)", line: "var(--mod-border-b)", fg: "var(--mod-link)" },
    ojo: { bg: "#FFF8E8", line: "#E8CE93", fg: "#8A5A00" },
    permitido: { bg: "var(--mod-ok-bg)", line: "var(--mod-ok-line)", fg: "var(--mod-ok-fg)" },
    prohibido: { bg: "var(--mod-no-bg)", line: "#C9756A", fg: "var(--mod-no-fg)" },
  }[tono]

  return (
    <div
      className="rounded-xl border-l-[3px] border-y border-r px-4 py-3.5"
      style={{ background: estilos.bg, borderColor: estilos.line, borderLeftColor: estilos.fg }}
    >
      {titulo && (
        <div className="text-[13px] font-bold mb-1" style={{ color: estilos.fg }}>
          {titulo}
        </div>
      )}
      <div className="text-[14px] leading-[1.65]" style={{ color: "var(--mod-ink)" }}>
        {children}
      </div>
    </div>
  )
}

/** Panel neutro para agrupar contenido dentro de la hoja. */
export function Panel({ titulo, children }: { titulo?: string; children: ReactNode }) {
  return (
    <section
      className="rounded-xl p-4 sm:p-5"
      style={{ background: "var(--mod-panel)", border: "1px solid var(--mod-line)" }}
    >
      {titulo && (
        <h2
          className="m-0 mb-3 text-[15px] font-bold"
          style={{ fontFamily: "var(--mod-display)", color: "var(--mod-title)" }}
        >
          {titulo}
        </h2>
      )}
      {children}
    </section>
  )
}

/** Subtítulo dentro de una sección. */
export function Subtitulo({ children }: { children: ReactNode }) {
  return (
    <h2
      className="m-0 text-[19px] font-bold tracking-[-0.01em]"
      style={{ fontFamily: "var(--mod-display)", color: "var(--mod-title)" }}
    >
      {children}
    </h2>
  )
}

/** Tabla del lector. Se desplaza sola si no cabe, sin arrastrar la página. */
export function Tabla({ cabeceras, filas }: { cabeceras: string[]; filas: ReactNode[][] }) {
  return (
    <div className="-mx-4 sm:mx-0 overflow-x-auto">
      <table
        className="w-full min-w-[420px] border-collapse text-[14px] px-4 sm:px-0"
        style={{ color: "var(--mod-text)" }}
      >
        <thead>
          <tr>
            {cabeceras.map((c) => (
              <th
                key={c}
                scope="col"
                className="text-left align-bottom px-3 py-2 text-[12px] font-bold"
                style={{
                  color: "var(--mod-muted)",
                  borderBottom: "2px solid var(--mod-line)",
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={i}>
              {f.map((celda, j) => (
                <td
                  key={j}
                  className="align-top px-3 py-2.5 leading-[1.55]"
                  style={{ borderBottom: "1px solid var(--mod-line)" }}
                >
                  {celda}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Lista con viñeta o numerada. */
export function Lista({ items, ordenada }: { items: ReactNode[]; ordenada?: boolean }) {
  const cls = "m-0 pl-5 flex flex-col gap-2 text-[15px] leading-[1.6]"
  const li = items.map((it, i) => (
    <li key={i} className="pl-1">
      {it}
    </li>
  ))
  return ordenada ? (
    <ol className={`list-decimal ${cls}`} style={{ color: "var(--mod-text)" }}>
      {li}
    </ol>
  ) : (
    <ul className={`list-disc ${cls}`} style={{ color: "var(--mod-text)" }}>
      {li}
    </ul>
  )
}

/** Banda de cierre: lo que hay que llevarse de la sección. */
export function Banda({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl px-4 py-4 sm:px-5" style={{ background: "var(--mod-band)" }}>
      <div
        className="mod-eyebrow mb-1.5"
        style={{ color: "var(--mod-accent)" }}
      >
        Recuerda
      </div>
      <div className="text-[14.5px] leading-[1.65]" style={{ color: "#FFFFFF" }}>
        {children}
      </div>
    </div>
  )
}

/** Texto fuerte dentro de un párrafo. */
export function F({ children }: { children: ReactNode }) {
  return (
    <strong className="font-semibold" style={{ color: "var(--mod-ink)" }}>
      {children}
    </strong>
  )
}

/** Dato técnico en monoespaciada: un UN, una clase, una instrucción. */
export function Dato({ children }: { children: ReactNode }) {
  return (
    <code
      className="mono text-[0.9em] px-1.5 py-[0.1em] rounded-md"
      style={{
        background: "var(--mod-panel-2)",
        border: "1px solid var(--mod-border-b)",
        color: "var(--mod-blue)",
      }}
    >
      {children}
    </code>
  )
}
