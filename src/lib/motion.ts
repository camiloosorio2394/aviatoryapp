/**
 * Movimiento: lo que hay que preguntar antes de mover algo.
 *
 * El CSS ya respeta `prefers-reduced-motion` en sus bloques, pero el movimiento
 * que nace en JavaScript (contadores, scroll programático) no se entera solo.
 * Aquí vive esa pregunta, en un sitio, para que no haya media docena de
 * `matchMedia` sueltos contestándola cada uno a su manera.
 *
 * Menos movimiento no es cero movimiento: se quitan los desplazamientos y se
 * conservan las opacidades y los colores, que ayudan a entender.
 */

/** Si el usuario pidió menos movimiento en su sistema. */
export function prefiereQuieto(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

/**
 * Sube al principio de la página.
 *
 * `behavior: "smooth"` NO lo degrada el navegador por su cuenta, y un examen
 * que avanza de pregunta desplaza la ventana entera: es el movimiento más
 * grande de esa pantalla. Con la preferencia puesta, salta.
 */
export function subirArriba(): void {
  if (typeof window === "undefined") return
  window.scrollTo({ top: 0, behavior: prefiereQuieto() ? "auto" : "smooth" })
}

/** Lleva un elemento a la vista, con la misma regla. */
export function traerAlaVista(elemento: Element | null | undefined): void {
  elemento?.scrollIntoView({
    behavior: prefiereQuieto() ? "auto" : "smooth",
    block: "start",
  })
}
