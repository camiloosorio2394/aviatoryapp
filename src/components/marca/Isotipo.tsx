import { useId, type CSSProperties } from "react"
import { AVION, AVION_EN, ESTELA, ESTELA_EJE, ESTELA_HUECO, LIENZO, PIERNA_FINA, PIERNA_GRUESA } from "@/components/marca/trazos"

/**
 * Los trazos del isotipo, para meter dentro de un `<svg>` de 120 × 120 (o de
 * un `<g>` escalado a eso). La máscara lleva un id propio por instancia: con
 * dos isotipos en la página y el mismo id, el segundo usaría la máscara del
 * primero.
 */
export function TrazosIsotipo() {
  const id = useId().replace(/:/g, "")
  return (
    <>
      <defs>
        <mask id={`${id}-corte`} maskUnits="userSpaceOnUse" x="0" y="0" width={LIENZO} height={LIENZO}>
          <rect width={LIENZO} height={LIENZO} fill="#fff" />
          <path d={ESTELA_EJE} fill="none" stroke="#000" strokeWidth={ESTELA_HUECO} strokeLinecap="round" />
        </mask>
      </defs>
      <g fill="currentColor">
        <g mask={`url(#${id}-corte)`}>
          <path d={PIERNA_GRUESA} />
          <path d={PIERNA_FINA} />
        </g>
        <path d={ESTELA} />
        <path d={AVION} transform={AVION_EN} />
      </g>
    </>
  )
}

/**
 * El isotipo de Aviatory dibujado en línea, en el color del texto
 * (`currentColor`): navy sobre papel, blanco sobre el velo de una foto, sin un
 * archivo por cada fondo. La geometría es la de `trazos.ts`.
 */
export function Isotipo({
  className,
  style,
  titulo,
}: {
  className?: string
  style?: CSSProperties
  /** Sin título el isotipo es decorativo (lo acompaña el nombre). */
  titulo?: string
}) {
  return (
    <svg
      viewBox={`0 0 ${LIENZO} ${LIENZO}`}
      className={className}
      style={style}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      <TrazosIsotipo />
    </svg>
  )
}
