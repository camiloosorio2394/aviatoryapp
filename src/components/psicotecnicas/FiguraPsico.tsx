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
    <>
      <div
        // El mismo papel blanco de las láminas recompuestas, incluso en modo
        // oscuro. La tinta no cambia de polaridad al pasar de SVG a imagen.
        className="mt-4 max-w-full overflow-x-auto rounded-xl border border-border bg-white p-3 text-[#16191D] [--card:#fff]"
        role="img"
        aria-label={describirFigura(figura)}
      >
        <div
          className="flex w-max min-w-full justify-center"
          dangerouslySetInnerHTML={{ __html: svgEnunciado(figura) }}
        />
      </div>
      <p className="mt-1.5 text-[12px] text-muted-foreground sm:hidden">
        Si no ves todas las casillas, desliza la figura hacia los lados.
      </p>
    </>
  )
}

/** Una alternativa, para meterla dentro de su botón. */
export function FiguraOpcion({ figura, indice }: { figura: Figura; indice: number }) {
  return (
    <span
      className="block rounded-md bg-white p-1 text-[#16191D] [--card:#fff]"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svgOpcion(figura, indice) }}
    />
  )
}
