import type { ComponentType } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle2, Star } from "lucide-react"

/**
 * Tarjeta de catálogo de curso: miniatura fotográfica teñida con el color del
 * curso, meta corta, título, descripción y CTA.
 *
 * Nació en el catálogo de la landing (`components/landing/Solutions.tsx`) y vive
 * acá porque la usan tres sitios: la landing, el hub de NOTAM y el de METAR, y
 * los temas de Ingreso a aerolínea que vengan. Si el patrón se toca, se toca en
 * un solo archivo.
 *
 * Cuándo usarla: la tarjeta LLEVA A OTRO SITIO y compite con otras por la
 * atención. Ahí la foto orienta y distingue. Para tarjetas de dato (un
 * indicador, una fila de materia, un panel de progreso) la foto es decoración:
 * esas van con `.surface`, sin imagen.
 *
 * El radio de 16px (`rounded-2xl`) es la excepción del sistema, heredada del
 * patrón de la landing.
 */

export interface CourseCardProps {
  title: string
  blurb: string
  icon: ComponentType<{ className?: string }>
  /** Color del curso. Tiñe el degradado de la foto, el borde destacado y el CTA. */
  color: string
  /** Meta corta: cuántas secciones, de qué va, cuánto dura. */
  meta: string
  photo: string
  /** Destino. Sin `to` la tarjeta no navega (catálogo de la landing, partes "Pronto"). */
  to?: string
  /** Texto del CTA. Por defecto "Ver curso". */
  cta?: string
  /** Estado o progreso al pie, anclado abajo. Sin él no se dibuja el pie. */
  status?: string
  /**
   * Avance del curso, 0 a 100. Dibuja una barra fina sobre el estado.
   *
   * En 0 NO se dibuja: una barra vacía comunica "vas perdiendo", cuando lo que
   * pasa es que todavía no empezaste. Ahí manda el texto del estado, que invita
   * a entrar.
   */
  progress?: number
  /** Esqueleto del estado mientras carga el progreso. */
  statusLoading?: boolean
  /** Chip "Listo" sobre la foto. */
  done?: boolean
  /** Borde teñido del color del curso y chip "Popular". */
  highlight?: boolean
  /** Apaga el CTA y muestra el chip "Pronto". */
  soon?: boolean
  /**
   * Meta en mayúsculas con letterspacing. Solo la landing, que estrenó el
   * patrón y no se toca. En la app la meta va en sentence case, como el resto.
   */
  metaCaps?: boolean
}

export function CourseCard({
  title,
  blurb,
  icon: Icon,
  color,
  meta,
  photo,
  to,
  cta = "Ver curso",
  status,
  progress,
  statusLoading,
  done,
  highlight,
  soon,
  metaCaps,
}: CourseCardProps) {
  const inner = (
    <>
      {/* Miniatura fotográfica con tinte del color del curso */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={photo}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, color-mix(in oklab, ${color} 45%, rgb(11 16 32 / 88%)) 0%, rgb(11 16 32 / 12%) 55%, transparent 100%)`,
          }}
        />
        <span
          className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg backdrop-blur-sm"
          style={{ background: "rgb(11 16 32 / 45%)" }}
        >
          <Icon className="h-4.5 w-4.5 text-white" />
        </span>
        {highlight && (
          <span
            className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold text-white shadow-sm"
            style={{ background: "linear-gradient(135deg, oklch(0.8 0.14 85), oklch(0.63 0.15 65))" }}
          >
            <Star className="h-3 w-3 fill-current" /> Popular
          </span>
        )}
        {done && (
          <span
            className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm"
            style={{ background: "color-mix(in oklab, var(--av-green-400) 55%, rgb(11 16 32 / 70%))" }}
          >
            <CheckCircle2 className="h-3 w-3" /> Listo
          </span>
        )}
        {soon && !done && (
          <span
            className="absolute top-3 right-3 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm"
            style={{ background: "rgb(11 16 32 / 55%)" }}
          >
            Pronto
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div
          className={
            metaCaps
              ? "mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground"
              : "text-[12px] font-medium text-muted-foreground"
          }
        >
          {meta}
        </div>
        <h3 className="mt-1.5 text-[17px] font-bold tracking-[-0.01em]">{title}</h3>
        <p className="mt-1.5 text-[13.5px] text-muted-foreground leading-relaxed">{blurb}</p>
        <div
          className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold"
          style={{ color: soon ? "var(--muted-foreground)" : color }}
        >
          {soon ? (
            "En construcción · Muy pronto"
          ) : (
            <>
              {cta}{" "}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </div>

        {/* El pie va anclado abajo para que los estados queden alineados entre
            tarjetas aunque las descripciones midan distinto. */}
        {status !== undefined && (
          <div className="mt-auto pt-3.5">
            <div className="pt-3 border-t border-border/60">
              {statusLoading ? (
                <span
                  className="block h-4 w-32 rounded bg-muted animate-pulse"
                  aria-hidden="true"
                />
              ) : (
                <>
                  {progress !== undefined && progress > 0 && (
                    <div
                      className="mb-2 h-1.5 rounded-full bg-muted overflow-hidden"
                      role="progressbar"
                      aria-label={`Avance de ${title}`}
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full rounded-full transition-[width]"
                        style={{
                          width: `${Math.min(100, Math.max(0, progress))}%`,
                          background: color,
                        }}
                      />
                    </div>
                  )}
                  <span className="text-[12px] font-medium text-muted-foreground">{status}</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )

  const className = "group h-full flex flex-col rounded-2xl border bg-card overflow-hidden transition-all hover:-translate-y-1"
  const style = {
    borderColor: highlight ? `color-mix(in oklab, ${color} 45%, transparent)` : "var(--border)",
    boxShadow: "0 1px 2px rgb(0 0 0 / 4%)",
  }

  return to ? (
    <Link to={to} className={className} style={style}>
      {inner}
    </Link>
  ) : (
    <div className={className} style={style}>
      {inner}
    </div>
  )
}
