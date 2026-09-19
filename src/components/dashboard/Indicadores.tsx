/**
 * Las cuatro cifras del piloto, en una sola pieza.
 *
 * Cuatro números sueltos no son una gráfica: son una fila de indicadores. Cada
 * uno lleva su rótulo, la cifra y, debajo, lo que la explica o cómo
 * conseguirla. Sin dato va un guion con la instrucción, nunca un cero: un «0
 * horas» el primer día se lee como un veredicto.
 *
 * Las cifras van en proporcionales y no en tabulares: son valores sueltos, no
 * una columna que haya que alinear.
 */

export interface Indicador {
  rotulo: string
  /** `null` = no hay dato todavía. */
  valor: string | null
  unidad?: string
  nota: string
  /** Por debajo de un mínimo legal. Va con la nota que lo dice, no solo en color. */
  aviso?: boolean
}

export function Indicadores({ items }: { items: Indicador[] }) {
  return (
    <dl className="m-0 grid grid-cols-2 overflow-hidden rounded-2xl surface @3xl:grid-cols-4">
      {items.map((it, i) => (
        <div
          key={it.rotulo}
          className={[
            "min-w-0 px-5 py-4",
            // Divisores finos en vez de cuatro tarjetas: es un solo dato
            // compuesto, y cuatro bordes gruesos lo partían en cuatro.
            i % 2 === 1 ? "border-l border-border" : "",
            i >= 2 ? "border-t border-border @3xl:border-t-0" : "",
            i === 2 ? "@3xl:border-l" : "",
          ].join(" ")}
        >
          <dt className="nh-display text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {it.rotulo}
          </dt>
          <dd className="m-0 mt-2 flex items-baseline gap-1">
            <span
              className="nh-display text-[30px] font-bold leading-none tracking-[-0.03em]"
              // --av-warn-fg y no --av-amber-400: el ámbar de relleno como color de
              // texto daba 1,8:1 sobre blanco, ni el 3:1 del texto grande.
              style={{ color: it.aviso ? "var(--av-warn-fg)" : "var(--foreground)" }}
            >
              {it.valor ?? "—"}
            </span>
            {it.valor !== null && it.unidad && (
              <span className="text-[13px] font-semibold text-muted-foreground">{it.unidad}</span>
            )}
          </dd>
          {/* Dos renglones y no uno truncado: en el teléfono la nota caía justo
              en lo que la explica («Bajo el 70 % para a…»). */}
          <dd className="m-0 mt-1.5 line-clamp-2 text-[12px] leading-snug text-muted-foreground">
            {it.nota}
          </dd>
        </div>
      ))}
    </dl>
  )
}
