import { AP_LECCIONES } from "@/lib/aeropuertosLeccion"
import { AP_CAT_FICHAS, type ApCatFicha } from "@/lib/aeropuertosCatalogo"

/**
 * Las imágenes prestadas se resuelven desde el contenido real de las lecciones.
 * Así un cambio de nombre del archivo se refleja también en el catálogo.
 */
const imagenesDeLeccion = new Map<string, string>()

function registrarImagenes(valor: unknown): void {
  if (Array.isArray(valor)) {
    valor.forEach(registrarImagenes)
    return
  }
  if (!valor || typeof valor !== "object") return

  for (const [clave, contenido] of Object.entries(valor)) {
    if (clave === "src" && typeof contenido === "string") {
      const codigo = contenido.match(/\/(ap-\d{2}-\d{2})-[^/]+\.(?:webp|svg)$/i)?.[1]
      if (codigo) imagenesDeLeccion.set(codigo.toUpperCase(), contenido)
    } else if (contenido && typeof contenido === "object") {
      registrarImagenes(contenido)
    }
  }
}

registrarImagenes(AP_LECCIONES)

// Solo equivalencias revisadas visualmente: el elemento debe ser reconocible
// en la imagen existente. El resto conserva su hueco hasta producir el activo.
const reutilizacionesPropias: Record<string, string> = {
  "AP-CAT-02": "AP-06-03",
  "AP-CAT-06": "AP-07-05",
  "AP-CAT-07": "AP-08-02",
  "AP-CAT-09": "AP-08-05",
  "AP-CAT-17": "AP-06-06",
  "AP-CAT-22": "AP-06-05",
  "AP-CAT-25": "AP-09-05",
  "AP-CAT-27": "AP-10-03",
  "AP-CAT-28": "AP-12-08",
  "AP-CAT-33": "AP-11-02",
  "AP-CAT-35": "AP-11-05",
  "AP-CAT-36": "AP-11-06",
  "AP-CAT-46": "AP-13-03",
  "AP-CAT-54": "AP-14-04",
  "AP-CAT-57": "AP-22-04",
  "AP-CAT-58": "AP-22-05",
  "AP-CAT-62": "AP-16-07",
  "AP-CAT-69": "AP-16-04",
}

const activosPropios: Record<string, { src: string; explicacion: string }> = {
  "AP-CAT-03": {
    src: "/modulos/aeropuertos/ap-cat-03-eje-rodaje-sobre-pista.webp",
    explicacion: "La línea amarilla continua guía el rodaje sobre la pista y sale hacia una calle. Distínguela del eje blanco discontinuo; antes de seguir, confirma tu autorización y la ruta asignada.",
  },
  "AP-CAT-66": {
    src: "/modulos/aeropuertos/ap-cat-66-faja-lateral-calle.webp",
    explicacion: "Dos líneas amarillas continuas delimitan el borde de la calle. El pavimento más claro del otro lado no amplía el ancho utilizable: mantén el avión dentro del margen autorizado.",
  },
}

export function explicacionDeImagen(ficha: ApCatFicha): string | undefined {
  return ficha.imagen?.clase === "propia" ? activosPropios[ficha.imagen.codigo]?.explicacion : undefined
}

export function imagenDeFicha(ficha: ApCatFicha, visitadas = new Set<string>()): string | undefined {
  const imagen = ficha.imagen
  if (!imagen) return undefined
  if (imagen.clase === "propia") {
    const codigo = reutilizacionesPropias[imagen.codigo]
    return codigo ? imagenesDeLeccion.get(codigo) : activosPropios[imagen.codigo]?.src
  }
  if (imagen.de === "leccion") return imagenesDeLeccion.get(imagen.codigo)

  if (visitadas.has(imagen.codigo)) return undefined
  visitadas.add(imagen.codigo)
  const duena = AP_CAT_FICHAS.find((f) => f.imagen?.codigo === imagen.codigo && f.imagen.clase === "propia")
  return duena ? imagenDeFicha(duena, visitadas) : undefined
}

export function imagenPropiaPendiente(ficha: ApCatFicha): boolean {
  const imagen = ficha.imagen
  return imagen?.clase === "propia" && !reutilizacionesPropias[imagen.codigo] && !activosPropios[imagen.codigo]
}
