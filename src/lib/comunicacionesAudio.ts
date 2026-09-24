/**
 * ¿Ya está grabada una transmisión? Lo usa la página de práctica para avisar,
 * antes de que el piloto toque «Escuchar», que un ejercicio va a sonar con la
 * voz del navegador porque su mp3 todavía no existe.
 *
 * Pide solo la cabecera (HEAD) del mismo archivo que después busca el
 * reproductor, con la misma regla: un 2xx sin `Content-Type` de audio (el
 * index.html del rewrite del SPA) no cuenta como grabación. Sin red la
 * respuesta es null (no se sabe): el mp3 puede estar en la caché del service
 * worker, que solo atiende GET, y avisar de más sería mentir.
 *
 * Lo que se supo se recuerda en la sesión, así que moverse entre ejercicios no
 * repite pedidos.
 */

import { transmisionesDe, type EjercicioComunicaciones } from "@/lib/comunicacionesPractica"
import { urlAudio, type Transmision } from "@/lib/radio"

const recordadas = new Map<string, Promise<boolean | null>>()

export function hayGrabacion(id: string): Promise<boolean | null> {
  let pedido = recordadas.get(id)
  if (!pedido) {
    pedido = fetch(urlAudio(id), { method: "HEAD" }).then(
      (r) => r.ok && /^audio\/|octet-stream/.test(r.headers.get("content-type") ?? ""),
      () => {
        recordadas.delete(id)
        return null
      },
    )
    recordadas.set(id, pedido)
  }
  return pedido
}

/** Todas las transmisiones de un ejercicio, también las de cada paso del vuelo completo. */
export function transmisionesDelEjercicio(ej: EjercicioComunicaciones): Transmision[] {
  const todas = ej.tipo === "vueloCompleto" ? ej.pasos.flatMap((p) => transmisionesDe(p.ejercicio)) : transmisionesDe(ej)
  return [...new Map(todas.map((t) => [t.id, t])).values()]
}

/** Cuántas transmisiones del ejercicio seguro no tienen grabación, y de cuántas. */
export async function grabacionesQueFaltan(ej: EjercicioComunicaciones): Promise<{ faltan: number; total: number }> {
  const txs = transmisionesDelEjercicio(ej)
  const hay = await Promise.all(txs.map((t) => hayGrabacion(t.id)))
  return { faltan: hay.filter((h) => h === false).length, total: txs.length }
}
