/**
 * La figura de un ejercicio, dibujada.
 *
 * El SVG llega hecho una cadena desde `src/lib/psicotecnicasFiguras.ts`, que
 * es el mismo módulo que usa el verificador para enfrentar el dibujo al
 * recorte del cuadernillo. Se inyecta tal cual en vez de armarlo con JSX
 * porque tener dos maneras de dibujar la misma figura es tener, tarde o
 * temprano, dos figuras distintas.
 *
 * El contenido no viene de ninguna parte: sale de las descripciones del banco,
 * que están en el repositorio.
 */

import type { Figura } from "@/lib/psicotecnicasFiguras"
import { describirFigura, svgEnunciado, svgOpcion } from "@/lib/psicotecnicasFiguras"

/** El enunciado: la serie o la matriz, con su hueco. */
export function FiguraEnunciado({ figura }: { figura: Figura }) {
  return (
    <div
      // `text-foreground` es lo que hace que el trazo siga al tema: dentro del
      // SVG todo se dibuja con `currentColor`, así que en claro es tinta sobre
      // papel y en oscuro al revés, sin dos juegos de archivos.
      className="mt-4 flex justify-center overflow-x-auto rounded-xl border border-border bg-card p-3 text-foreground"
      role="img"
      aria-label={describirFigura(figura)}
      dangerouslySetInnerHTML={{ __html: svgEnunciado(figura) }}
    />
  )
}

/** Una alternativa, para meterla dentro de su botón. */
export function FiguraOpcion({ figura, indice }: { figura: Figura; indice: number }) {
  return (
    <span
      className="block text-foreground"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svgOpcion(figura, indice) }}
    />
  )
}
