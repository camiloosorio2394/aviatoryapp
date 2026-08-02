import { X } from "lucide-react"
import { Link } from "react-router-dom"

/**
 * Barra superior del lector de módulo.
 *
 * Banda navy pegada arriba con el rombo ámbar, el nombre del módulo, las
 * fuentes normativas y el avance. La vigencia va SIEMPRE visible, no escondida
 * en una sección: un piloto no puede salir de aquí creyendo que un límite que
 * leyó es el vigente.
 *
 * En celular la barra se reordena: el chip de vigencia baja bajo el título y
 * el contador se pega al progreso, para que a 375 px no haya scroll lateral.
 */

interface ModuloTopbarProps {
  /** Nombre del módulo. */
  titulo: string
  /** Las fuentes normativas, en una línea. */
  fuentes: string
  /** Edición o resolución vigente. Va a la derecha, siempre a la vista. */
  vigencia: string
  /** Posición dentro del estudio, 1 a `total`. Null en práctica y chequeo. */
  paso: number | null
  total: number
  /** Etiqueta que reemplaza al contador fuera del estudio ("Práctica"). */
  etiquetaPaso?: string
  /** Adónde vuelve el botón de salir. */
  salirA: string
}

export function ModuloTopbar({
  titulo,
  fuentes,
  vigencia,
  paso,
  total,
  etiquetaPaso,
  salirA,
}: ModuloTopbarProps) {
  const pct = paso === null ? 100 : Math.round((paso / total) * 100)
  const contador =
    paso === null ? (etiquetaPaso ?? "") : `${String(paso).padStart(2, "0")} / ${String(total).padStart(2, "0")}`

  return (
    <header
      className="sticky top-0 z-30"
      style={{ background: "var(--mod-band)", color: "var(--mod-on-band)" }}
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-4">
        {/* Rombo ámbar: el símbolo del módulo, un cuadrado girado con el signo
            derecho para que no gire con él. */}
        <span
          aria-hidden
          className="shrink-0 flex h-9 w-9 items-center justify-center rounded-[4px] rotate-45"
          style={{ background: "var(--mod-accent)" }}
        >
          <span
            className="-rotate-45 font-extrabold text-[17px] leading-none"
            style={{ color: "var(--mod-band)" }}
          >
            !
          </span>
        </span>

        <div className="min-w-0 flex-1">
          <div
            className="mod-display font-extrabold text-white text-[15px] sm:text-[17px] leading-tight truncate"
            style={{ fontFamily: "var(--mod-display)" }}
          >
            {titulo}
          </div>
          <div className="text-[12px] leading-tight truncate opacity-80">{fuentes}</div>
        </div>

        {/* La vigencia, siempre visible. En celular baja de línea. */}
        <span
          className="hidden sm:inline-flex shrink-0 items-center rounded-full px-3 py-1 text-[11px] font-semibold"
          style={{
            background: "rgb(255 255 255 / 10%)",
            color: "var(--mod-on-band)",
            border: "1px solid rgb(255 255 255 / 18%)",
          }}
        >
          {vigencia}
        </span>

        <Link
          to={salirA}
          className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
          style={{ color: "var(--mod-on-band)" }}
          aria-label="Salir del lector"
        >
          <X className="h-4.5 w-4.5" />
        </Link>
      </div>

      {/* Vigencia en celular, donde no cabe arriba */}
      <div className="sm:hidden px-4 pb-2 -mt-1">
        <span className="text-[11px] font-semibold opacity-80">{vigencia}</span>
      </div>

      {/* Progreso ámbar con su contador */}
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 pb-2.5 flex items-center gap-3">
        <div
          className="h-1.5 flex-1 rounded-full overflow-hidden"
          style={{ background: "rgb(255 255 255 / 14%)" }}
          role="progressbar"
          aria-label={`Avance de ${titulo}`}
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full transition-[width] duration-300"
            style={{ width: `${pct}%`, background: "var(--mod-accent)" }}
          />
        </div>
        <span
          className="mono shrink-0 text-[11px] font-semibold tabular-nums"
          style={{ color: "var(--mod-accent)" }}
        >
          {contador}
        </span>
      </div>
    </header>
  )
}
