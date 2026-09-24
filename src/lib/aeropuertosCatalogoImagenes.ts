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
  "AP-CAT-04": {
    src: "/modulos/aeropuertos/ap-cat-04-plataforma-viraje.webp",
    explicacion: "El ensanche lateral permite invertir el sentido al final de la pista. Reconoce la línea amarilla curva y síguela dentro del pavimento; no confundas la plataforma con una salida de pista.",
  },
  "AP-CAT-08": {
    src: "/modulos/aeropuertos/ap-cat-08-lineas-seguridad-plataforma.webp",
    explicacion: "Las marcas amarillas guían al avión; la línea roja separa la zona de seguridad del puesto. Mantén vehículos y equipos en el lado permitido y confirma que el área esté libre antes de mover el avión.",
  },
  "AP-CAT-14": {
    src: "/modulos/aeropuertos/ap-cat-14-borde-plataforma.webp",
    explicacion: "La línea continua delimita la parte resistente de la plataforma: el avión permanece dentro, mientras el pavimento más oscuro y el terreno exterior no se cuentan como área apta para estacionar.",
  },
  "AP-CAT-15": {
    src: "/modulos/aeropuertos/ap-cat-15-umbral-pista-no-pavimentada.webp",
    explicacion: "En esta pista de grama el umbral se reconoce por dos tableros laterales «07», no por fajas pintadas. Los tableros rojos lejanos señalan el extremo: verifica la pista autorizada antes de alinearte.",
  },
  "AP-CAT-34": {
    src: "/modulos/aeropuertos/ap-cat-34-indicador-direccion-aterrizaje.webp",
    explicacion: "La T blanca indica la dirección de aterrizaje: el brazo largo se alinea con la pista y el travesaño señala hacia dónde se aterriza. Confirma también el viento y las instrucciones vigentes.",
  },
  "AP-CAT-38": {
    src: "/modulos/aeropuertos/ap-cat-38-balizas-borde-pista-no-pavimentada.webp",
    explicacion: "Las balizas blancas planas marcan ambos bordes de la pista de grama. Su lado largo sigue el eje de la pista; mantén la trayectoria entre las dos hileras y verifica el ancho utilizable antes de operar.",
  },
  "AP-CAT-39": {
    src: "/modulos/aeropuertos/ap-cat-39-balizas-pista-nieve.webp",
    explicacion: "Con la pintura oculta por la nieve, las hileras simétricas de balizas visibles delimitan la pista. Reconoce sus bordes antes de rodar o aterrizar; este caso está reservado en la norma colombiana.",
  },
  "AP-CAT-43": {
    src: "/modulos/aeropuertos/ap-cat-43-identificacion-umbral.webp",
    explicacion: "Dos destellos blancos, uno fuera de cada borde y alineados con la fila verde, ayudan a encontrar el umbral. Identifícalos como referencia visual; la autorización y los mínimos de aproximación siguen vigentes.",
  },
  "AP-CAT-44": {
    src: "/modulos/aeropuertos/ap-cat-44-apapi.webp",
    explicacion: "El indicador simplificado tiene dos unidades a la izquierda: blanca la exterior y roja la interior indican que vas en la senda. Si cambia la combinación, corrige la trayectoria según el procedimiento aplicable.",
  },
  "AP-CAT-51": {
    src: "/modulos/aeropuertos/ap-cat-51-luces-zona-parada.webp",
    explicacion: "Más allá del extremo de pista, dos hileras y una fila final rojas delimitan la zona de parada. Ese pavimento no es pista disponible para continuar el despegue; respeta las distancias publicadas.",
  },
  "AP-CAT-52": {
    src: "/modulos/aeropuertos/ap-cat-52-faro-identificacion.webp",
    explicacion: "El destello verde aislado identifica un aeródromo terrestre de noche; su secuencia transmite el identificador en Morse. No lo confundas con el faro verde y blanco ni con luces de umbral.",
  },
  "AP-CAT-53": {
    src: "/modulos/aeropuertos/ap-cat-53-espera-intermedia.webp",
    explicacion: "Tres luces amarillas fijas están antes de la línea transversal amarilla discontinua de espera intermedia. Detente en el punto indicado y continúa solo cuando corresponda.",
  },
  "AP-CAT-66": {
    src: "/modulos/aeropuertos/ap-cat-66-faja-lateral-calle.webp",
    explicacion: "Dos líneas amarillas continuas delimitan el borde de la calle. El pavimento más claro del otro lado no amplía el ancho utilizable: mantén el avión dentro del margen autorizado.",
  },
  "AP-CAT-67": {
    src: "/modulos/aeropuertos/ap-cat-67-damero-obstaculo.webp",
    explicacion: "El damero anaranjado y blanco marca una superficie amplia y maciza; las esquinas exteriores son anaranjadas. Identifica el objeto como obstáculo y mantén la separación indicada para la operación.",
  },
  "AP-CAT-68": {
    src: "/modulos/aeropuertos/ap-cat-68-fajas-obstaculo.webp",
    explicacion: "Las fajas horizontales anaranjadas y blancas hacen visible un obstáculo alto y estrecho; sus dos extremos son anaranjados. Reconócelo como obstáculo señalizado y respeta las separaciones publicadas.",
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
