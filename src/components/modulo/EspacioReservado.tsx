/**
 * Un hueco que guarda el sitio de un recurso que todavia no existe.
 *
 * La regla de la casa: cuando falta el video, la imagen, el icono, la tabla o
 * el flujograma, NO se borra el elemento ni se cambia por un parrafo. Se deja
 * el hueco con la medida y la proporcion exactas que tendra el recurso, para
 * que el dia que llegue se ponga en su sitio y no se mueva nada alrededor.
 *
 * El tamano no lo decide este componente sino quien lo coloca, via `className`.
 * Asi el hueco puede copiar exactamente la caja del recurso final: la del
 * componente que lo va a sustituir, no una medida inventada aqui.
 *
 * Ejemplos de etiqueta: "VIDEO · 16:9", "IMAGEN · 1200x420", "ICONO · 64x64".
 */

interface EspacioReservadoProps {
  /** Qué va aquí, en corto. Se muestra dentro del hueco. */
  etiqueta: string
  /** Medida y posición. Es obligatorio: sin esto el hueco no reserva nada. */
  className: string
  /**
   * Sobre el cristal del hero (oscuro) o sobre papel (claro). Cambia solo el
   * contraste del trazo y la letra; la caja es la misma.
   */
  tono?: "oscuro" | "claro"
}

export function EspacioReservado({ etiqueta, className, tono = "oscuro" }: EspacioReservadoProps) {
  const oscuro = tono === "oscuro"
  return (
    <div
      // Las clases se unen con espacios explícitos a los dos lados: sin ellos,
      // la última del tono y la primera de `className` se pegan en una sola
      // ("bg-white/[0.04]h-[52px]") y se pierden las dos. Pasó: el hueco salía
      // de 13px de alto en vez de 52.
      className={[
        "grid place-items-center overflow-hidden border border-dashed px-2 text-center",
        oscuro ? "border-white/30 bg-white/[0.04]" : "border-black/20 bg-black/[0.03]",
        className,
      ].join(" ")}
      role="img"
      aria-label={`Espacio reservado para ${etiqueta}`}
    >
      <span
        className={
          "nh-display text-[9px] font-semibold uppercase leading-[1.3] tracking-[0.1em] " +
          (oscuro ? "text-white/45" : "text-black/40")
        }
      >
        {etiqueta}
      </span>
    </div>
  )
}
