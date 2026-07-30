import type { ReactNode } from "react"
import { CountUp } from "./count-up"

interface Props {
  /** Etiqueta corta en mayúscula, como en un panel de instrumentos: TOT HRS, ICAO ENG. */
  eyebrow: string
  value: number
  suffix?: string
  /** Dato derivado que acompaña al valor: "PIC 118.0", "MIN 4 REQ". Es lo que
   *  distingue un instrumento de una card con un número suelto. */
  note?: string
  /** Solo se colorea lo que pide atención. Sin tone el tile queda neutro, así
   *  el ámbar significa algo cuando aparece en vez de ser decoración. */
  tone?: "warn"
  ring?: ReactNode
  format?: (v: number) => string
}

/**
 * Tile del panel de indicadores. Cifra monoespaciada, etiqueta corta en
 * mayúscula y un dato derivado debajo: el vocabulario del logbook y del PFD,
 * no el de una card genérica con un número suelto y mucho aire.
 */
export function KpiTile({ eyebrow, value, suffix, note, tone, ring, format }: Props) {
  const isDecimal = value < 100 && value % 1 !== 0
  const defaultFormat = (v: number) => v.toFixed(isDecimal ? 1 : 0)
  const warn = tone === "warn"

  return (
    <div
      className="rounded-lg border border-border bg-card px-4 py-3.5 flex flex-col gap-2.5"
      style={warn ? { borderTop: "2px solid var(--av-amber-400)" } : undefined}
    >
      <div className="mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {eyebrow}
      </div>

      <div className="flex items-end justify-between gap-2">
        <div
          className="mono tabular-nums text-[28px] font-bold leading-none tracking-[-0.02em]"
          style={{ color: warn ? "var(--av-warn-fg)" : "var(--foreground)" }}
        >
          <CountUp to={value} format={format ?? defaultFormat} />
          {suffix && (
            <span className="text-[15px] text-muted-foreground font-semibold ml-1">
              {suffix}
            </span>
          )}
        </div>
        {ring}
      </div>

      {note && (
        <div
          className="mono tabular-nums text-[11.5px] font-semibold uppercase tracking-[0.06em]"
          style={{ color: warn ? "var(--av-warn-fg)" : "var(--muted-foreground)" }}
        >
          {note}
        </div>
      )}
    </div>
  )
}
