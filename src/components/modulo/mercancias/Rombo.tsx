import { rombo } from "@/lib/mercanciasClases"

/**
 * La etiqueta oficial de una clase o división.
 *
 * Es una imagen y no un dibujo: son símbolos normalizados y un piloto tiene que
 * reconocer el que va a ver en una bodega, no una aproximación en CSS. La llama
 * de los inflamables, la calavera de los tóxicos y el trébol del radiactivo no
 * se pueden inventar.
 *
 * El `alt` dice qué etiqueta es, porque la imagen ES el dato: quien no la ve
 * necesita el número de la división igual que quien sí.
 */
export function Rombo({
  id,
  tam = 56,
  etiqueta,
}: {
  /** "1.1", "2-1", "9"… acepta las dos formas de escribir la división. */
  id: string
  /** Lado en píxeles. */
  tam?: number
  /** Qué se lee en voz alta. Por defecto, la división. */
  etiqueta?: string
}) {
  const archivo = id.replace(".", "-")
  const division = archivo.replace("-", ".")
  return (
    <img
      src={rombo(archivo)}
      alt={etiqueta ?? `Etiqueta de la división ${division}`}
      width={tam}
      height={tam}
      loading="lazy"
      decoding="async"
      style={{ width: tam, height: tam }}
      className="shrink-0 object-contain"
    />
  )
}
