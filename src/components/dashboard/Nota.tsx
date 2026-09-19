import type { ComponentType, CSSProperties } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

/**
 * Una nota al pie de un hub: lo que hay que saber una vez, no lo que se mira en
 * cada visita. Va en tinta neutra, salvo la que avisa de verdad (que el banco
 * oficial del PCA tiene errores es una advertencia sobre la fuente, y va en
 * ámbar). Informar no es acertar ni alertar, así que el resto no lleva color.
 *
 * La comparten el PCA y Pruebas psicotécnicas.
 */
export function Nota({
  icon: Icon,
  aviso,
  titulo,
  linea,
  to,
  toLabel,
}: {
  icon: ComponentType<{ className?: string; style?: CSSProperties }>
  aviso?: boolean
  titulo: string
  linea: string
  /** Adónde va la promesa de la nota. Si dice que se puede comprobar, tiene que
   *  llevar al documento con el que se comprueba. */
  to?: string
  toLabel?: string
}) {
  return (
    <div
      className={`flex items-start gap-3.5 rounded-2xl px-4 py-4 ${aviso ? "" : "surface"}`}
      style={
        aviso
          ? {
              background: "color-mix(in oklab, var(--av-amber-400) 8%, transparent)",
              border: "1px solid color-mix(in oklab, var(--av-amber-400) 30%, transparent)",
            }
          : undefined
      }
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${aviso ? "" : "bg-muted text-foreground"}`}
        style={aviso ? { color: "var(--av-warn-fg)" } : undefined}
      >
        <Icon className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <div className="min-w-0">
        <div
          className="text-[14.5px] font-semibold"
          style={{ color: aviso ? "var(--av-warn-fg)" : "var(--foreground)" }}
        >
          {titulo}
        </div>
        <p className="m-0 mt-0.5 text-[13px] leading-snug text-muted-foreground">{linea}</p>
        {to && (
          <Link
            to={to}
            className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-foreground transition-[gap] hover:gap-1.5"
          >
            {toLabel ?? "Ver"} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        )}
      </div>
    </div>
  )
}
