import aerodinamica from "@/assets/pca/materias/aerodinamica.webp"
import factoresHumanos from "@/assets/pca/materias/factores_humanos.webp"
import instrumentos from "@/assets/pca/materias/instrumentos.webp"
import meteorologia from "@/assets/pca/materias/meteorologia.webp"
import navegacion from "@/assets/pca/materias/navegacion.webp"
import procedimientos from "@/assets/pca/materias/procedimientos.webp"
import reglamentacion from "@/assets/pca/materias/reglamentacion.webp"
import serviciosMeteo from "@/assets/pca/materias/servicios_meteo.webp"
import sistemas from "@/assets/pca/materias/sistemas.webp"

/**
 * Miniatura por materia del banco PCA.
 *
 * Son fotografías de 124 × 84 con las esquinas ya redondeadas, hechas por
 * Camilo el 25 de septiembre de 2026 para la tabla de materias y la tarjeta
 * «Sigue estudiando». Sustituyen al símbolo de carta de `subjectSymbols`, que
 * sigue siendo el respaldo: una materia que entre al banco sin foto se pinta
 * con su símbolo, no con un hueco.
 *
 * Van importadas como módulo y no por ruta pública, como el resto de las fotos
 * de tarjeta (docs/PHOTO_CREDITS.md): así entran al bundle con hash y al
 * precache del service worker, y una miniatura de 2 KB no vuelve a pedirse.
 *
 * La clave es el `subject_slug` del banco, el mismo de `SUBJECT_META`.
 */
const MAP: Record<string, string> = {
  aerodinamica,
  factores_humanos: factoresHumanos,
  instrumentos,
  meteorologia,
  navegacion,
  procedimientos,
  reglamentacion,
  servicios_meteo: serviciosMeteo,
  sistemas,
}

/** La miniatura de la materia, o `undefined` si todavía no la tiene. */
export function subjectFoto(slug: string): string | undefined {
  return MAP[slug]
}

/** Las materias con miniatura, para la prueba que comprueba que cada archivo existe. */
export const MATERIAS_CON_FOTO: readonly string[] = Object.keys(MAP)
