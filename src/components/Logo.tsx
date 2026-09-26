import type { CSSProperties, ImgHTMLAttributes } from "react"
import isotypeColorSrc from "@/assets/logos/aviatory-isotype-app-icon.svg"
import isotypeMonoSrc from "@/assets/logos/aviatory-isotype-mono.svg"
import { TrazosIsotipo } from "@/components/marca/Isotipo"
import { LIENZO } from "@/components/marca/trazos"

type ImgProps = ImgHTMLAttributes<HTMLImageElement>

/** El ancho natural de «Aviatory» en Playfair Display 700 a 90 px, medido en el navegador. */
const ANCHO_NOMBRE = 350
const ANCHO_HORIZONTAL = 128 + ANCHO_NOMBRE + 6

/**
 * El logotipo horizontal: el isotipo y «Aviatory» en Playfair Display, en un
 * solo SVG para que el alto de quien lo usa («h-7 w-auto») mande sobre los dos.
 *
 * Va en línea y no como archivo: el nombre es texto con la fuente de la página,
 * y un SVG cargado por `<img>` no ve las fuentes de la página. El ancho del
 * nombre va fijado con `textLength`: si la fuente todavía no llegó, el respaldo
 * ocupa lo mismo y el logo no salta al cargar.
 *
 * Toma el color de `--marca-tinta` (navy en claro, casi blanco en oscuro); con
 * `style={{ color }}` se cambia, por ejemplo a blanco sobre una foto.
 */
export function LogoHorizontal({
  className,
  style,
  alt = "Aviatory",
}: {
  className?: string
  style?: CSSProperties
  alt?: string
}) {
  return (
    <svg
      viewBox={`0 0 ${ANCHO_HORIZONTAL} ${LIENZO}`}
      className={className}
      style={{ color: "var(--marca-tinta)", ...style }}
      role="img"
      aria-label={alt}
      focusable="false"
    >
      <TrazosIsotipo />
      <text
        x={128}
        y={93}
        fill="currentColor"
        fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
        fontWeight={700}
        fontSize={90}
        textLength={ANCHO_NOMBRE}
        lengthAdjust="spacingAndGlyphs"
      >
        Aviatory
      </text>
    </svg>
  )
}

interface LogoIsotypeProps extends Omit<ImgProps, "src"> {
  /** `color`: el ícono de la app (la A blanca sobre navy). `mono`: la A sola, en navy. */
  variant?: "color" | "mono"
}

export function LogoIsotype({ variant = "color", alt = "Aviatory", ...props }: LogoIsotypeProps) {
  const src = variant === "mono" ? isotypeMonoSrc : isotypeColorSrc
  return <img src={src} alt={alt} {...props} />
}
