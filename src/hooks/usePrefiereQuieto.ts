import { useSyncExternalStore } from "react"
import { prefiereQuieto } from "@/lib/motion"

/**
 * La preferencia de menos movimiento, leída como lo que es: un dato de fuera.
 *
 * `prefiereQuieto()` a secas sirve dentro de un manejador o de un efecto, pero
 * llamarla en el cuerpo de un componente es leer el entorno durante el render,
 * y eso es impuro: React puede volver a renderizar cuando le convenga y la
 * respuesta cambiaría sin que nadie lo pida. `useSyncExternalStore` es la
 * puerta que React deja abierta para justo esto.
 *
 * De paso arregla algo que antes no funcionaba: si el usuario cambia la
 * preferencia en su sistema con la aplicación abierta, ahora la pantalla se
 * entera. Antes la respuesta se leía una vez y se quedaba.
 *
 * El tercer argumento es para el render en servidor, donde no hay `matchMedia`:
 * se asume que no hay preferencia, que es lo que hace `prefiereQuieto`.
 */
export function usePrefiereQuieto(): boolean {
  return useSyncExternalStore(suscribir, prefiereQuieto, () => false)
}

function suscribir(alCambiar: () => void) {
  if (typeof window === "undefined") return () => {}
  const consulta = window.matchMedia("(prefers-reduced-motion: reduce)")
  consulta.addEventListener("change", alCambiar)
  return () => consulta.removeEventListener("change", alCambiar)
}
