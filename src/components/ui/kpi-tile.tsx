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
 * Tile del panel de indicadores.
 *
 * Va sobre fondo oscuro, dentro de KpiPanel. Antes eran cuatro tarjetas blancas
 * con borde sobre fondo blanco: cuatro rectángulos casi invisibles entre el
 * hero oscuro y las tarjetas blancas de abajo, y la cifra, que es lo único que
 * importa acá, competía en contraste con su propia etiqueta. Un panel de
 * instrumentos real es al revés: fondo oscuro y cifra luminosa.
 */
export function KpiTile({ eyebrow, value, suffix, note, tone, ring, format }: Props) {
  const isDecimal = value < 100 && value % 1 !== 0
  const defaultFormat = (v: number) => v.toFixed(isDecimal ? 1 : 0)
  const warn = tone === "warn"

  return (
    <div className="px-5 py-4 flex flex-col gap-1">
      <div className="text-[13px]" style={{ color: "var(--panel-muted)" }}>
        {eyebrow}
      </div>

      <div className="flex items-end justify-between gap-2">
        <div
          className="tabular-nums text-[32px] font-semibold leading-none tracking-[-0.033em]"
          style={{ color: warn ? "var(--panel-warn)" : "var(--panel-fg)" }}
        >
          <CountUp to={value} format={format ?? defaultFormat} />
          {suffix && (
            <span
              className="text-[15px] font-normal ml-0.5"
              style={{ color: "var(--panel-muted)" }}
            >
              {suffix}
            </span>
          )}
        </div>
        {ring}
      </div>

      {note && (
        <div
          className="tabular-nums text-[12px] mt-1"
          style={{ color: warn ? "var(--panel-warn)" : "var(--panel-muted)" }}
        >
          {note}
        </div>
      )}
    </div>
  )
}

/**
 * Cuerpo del panel: una sola superficie oscura con los tiles separados por
 * filetes, como una consola, en vez de cuatro cajas sueltas. Reusa el navy del
 * hero para que la parte alta del dashboard se lea como una sola pieza.
 */
export function KpiPanel({ children, attached = false }: { children: ReactNode; attached?: boolean }) {
  return (
    <div
      className={`kpi-panel grid grid-cols-2 lg:grid-cols-4 ${attached ? "" : "rounded-xl overflow-hidden"}`}
      style={{
        background: "var(--panel-bg)",
        // Pegado al hero, el panel es la fila inferior de la misma consola: el
        // borde y el radio los pone el contenedor, aquí solo va el filete que
        // separa las dos mitades.
        border: attached ? undefined : "1px solid var(--panel-border)",
        borderTop: attached ? "1px solid var(--panel-border)" : undefined,
      }}
    >
      {children}
    </div>
  )
}
