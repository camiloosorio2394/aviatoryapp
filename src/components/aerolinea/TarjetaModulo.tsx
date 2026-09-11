import type { ComponentType } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle2 } from "lucide-react"

/**
 * Tarjeta de módulo de la pantalla Ingreso a aerolínea.
 *
 * Es la hermana compacta de `CourseCard` (components/ui/course-card.tsx),
 * hecha para una rejilla de cuatro. Habla el mismo idioma: superficie con
 * radio de 16 px, portada teñida con el color del módulo, el icono en su
 * pastilla oscura y el CTA con flecha. Cambia la proporción, no la identidad.
 *
 * Vive aparte a propósito: el rediseño es de esta pantalla, y la tarjeta de
 * los hubs y de la landing no se toca. Si el lenguaje de CourseCard cambia,
 * se cambia también aquí.
 *
 * Tres reglas la hacen caber en cuatro columnas sin desalinearse:
 *  - El nombre va antes que las cifras: primero se lee qué es.
 *  - La descripción reserva siempre dos renglones, ni más ni menos.
 *  - CTA y estado van anclados abajo, y la barra reserva su alto aunque el
 *    módulo no se haya empezado: los CTA de una fila caen a la misma altura.
 */

export interface TarjetaModuloProps {
  to: string
  titulo: string
  /** Una o dos frases cortas: la tarjeta corta en el segundo renglón. */
  descripcion: string
  /** Cifras cortas, una línea: «9 secciones · 58 min». */
  meta: string
  icon: ComponentType<{ className?: string }>
  /**
   * Acento del módulo: tiñe la portada, la barra y el CTA. Sin él la tarjeta
   * va en tono neutro, que es el de las herramientas: no son un módulo, y el
   * ámbar y el verde de la app son semántica (alerta y acierto), no identidad.
   */
  color?: string
  foto: string
  cta: string
  estado: string
  /** Avance de 0 a 100. En 0 no se dibuja la barra, pero se reserva su hueco. */
  avance?: number
  /** Rótulo sobre la portada, como «En curso». */
  chip?: string
  /** Módulo terminado: pastilla «Listo». */
  completo?: boolean
  /** Esqueleto del estado mientras llega el progreso de la base. */
  cargando?: boolean
  /**
   * "horizontal" pone la portada a la izquierda, para las herramientas que
   * ocupan media fila. Cuando la tarjeta es estrecha vuelve a apilarse sola.
   */
  orientacion?: "vertical" | "horizontal"
}

export function TarjetaModulo({
  to,
  titulo,
  descripcion,
  meta,
  icon: Icon,
  color,
  foto,
  cta,
  estado,
  avance = 0,
  chip,
  completo,
  cargando,
  orientacion = "vertical",
}: TarjetaModuloProps) {
  const horizontal = orientacion === "horizontal"
  const acento = color ?? "var(--foreground)"
  // El mismo tinte que CourseCard. En tono neutro, solo el navy de la app.
  const tinte = color
    ? `linear-gradient(to top, color-mix(in oklab, ${color} 45%, rgb(11 16 32 / 88%)) 0%, rgb(11 16 32 / 12%) 55%, transparent 100%)`
    : "linear-gradient(to top, rgb(11 16 32 / 78%) 0%, rgb(11 16 32 / 12%) 55%, transparent 100%)"

  return (
    <Link
      to={to}
      className="group @container block h-full overflow-hidden rounded-2xl surface surface-lift"
    >
      <div className={`flex h-full flex-col ${horizontal ? "@md:flex-row" : ""}`}>
        <div
          className={`relative shrink-0 overflow-hidden aspect-[2/1] ${
            horizontal ? "@md:aspect-auto @md:w-[38%]" : ""
          }`}
        >
          {/* Hover a 300 ms con la curva de la casa y un 3 %: se ve decenas de
              veces al día, así que acompaña sin hacerse notar. */}
          <img
            src={foto}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            style={{ transitionTimingFunction: "var(--ease-av)" }}
          />
          <div aria-hidden className="absolute inset-0" style={{ background: tinte }} />
          <span
            className="absolute bottom-2.5 left-2.5 flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-sm"
            style={{ background: "rgb(11 16 32 / 45%)" }}
          >
            <Icon className="h-4 w-4 text-white" />
          </span>
          {(completo || chip) && (
            <span
              className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-semibold text-white backdrop-blur-sm"
              style={{
                background: completo
                  ? "color-mix(in oklab, var(--av-green-400) 55%, rgb(11 16 32 / 70%))"
                  : "rgb(11 16 32 / 55%)",
              }}
            >
              {completo && <CheckCircle2 className="h-3 w-3" />}
              {completo ? "Listo" : chip}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-4">
          <h3 className="m-0 text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-foreground">
            {titulo}
          </h3>
          <div className="mt-0.5 truncate text-[12px] font-medium text-muted-foreground">{meta}</div>
          <p className="mt-2 mb-0 line-clamp-2 min-h-[2lh] text-[13px] leading-relaxed text-muted-foreground">
            {descripcion}
          </p>

          <div className="mt-auto pt-3">
            <span
              className="inline-flex items-center gap-1 text-[13.5px] font-semibold"
              style={{ color: acento }}
            >
              {cta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>

            <div className="mt-3 border-t border-border/60 pt-2.5">
              {cargando ? (
                <span className="block h-[34px] w-full rounded bg-muted animate-pulse" aria-hidden="true" />
              ) : (
                <>
                  <div className="flex h-2.5 items-center gap-2">
                    {avance > 0 && (
                      <>
                        <div
                          className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"
                          role="progressbar"
                          aria-label={`Avance de ${titulo}`}
                          aria-valuenow={avance}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${Math.min(100, Math.max(0, avance))}%`, background: acento }}
                          />
                        </div>
                        <span className="tabular text-[11.5px] font-semibold text-muted-foreground">
                          {avance}%
                        </span>
                      </>
                    )}
                  </div>
                  <p
                    className="mt-1.5 mb-0 truncate text-[12px] font-medium text-muted-foreground"
                    title={estado}
                  >
                    {estado}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
