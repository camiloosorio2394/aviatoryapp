import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import {
  AP_APRENDE,
  AP_CATALOGO,
  AP_HUB,
  AP_NIVELES,
  AP_TITULO,
  markAeropuertosLeccion,
  readAeropuertosLocal,
  writeAeropuertosLocal,
} from "@/lib/aeropuertos"
import { AP_ENTREVISTAS, AP_LECCIONES } from "@/lib/aeropuertosLeccion"

/**
 * Lección de Aeropuertos, con el mismo lector que NOTAM, Mercancías y
 * Meteorología, y el tema índigo del módulo (`lector-ap`). Veintidós lecciones
 * en cinco niveles, y cada nivel cierra con su entrevista de aerolínea.
 *
 * Es el módulo más visual de la app: el texto de cada lección cabe en unas 150
 * palabras y lo que enseña son las imágenes, que por ahora son huecos rotulados
 * con el código y la medida de la foto que falta.
 *
 * Ruta: /app/aerolinea/aeropuertos/aprende?l=1 (lección) o ?e=1 (entrevista)
 */
const MODULO: LectorModulo = {
  tema: "lector-notam lector-ap",
  nombre: AP_TITULO,
  rotulo: "Aeropuertos · Módulo",
  hub: AP_HUB,
  // El catálogo hace de «práctica»: es la consulta rápida de todas las señales,
  // letreros, luces y balizas, y se llega desde el pie del índice.
  practica: AP_CATALOGO,
  portadas: "/modulos/aeropuertos",
  // Las portadas de este módulo se diseñan con el título dentro, como las de
  // Mercancías, así que van a 16:9 y no a la franja 8:3 de NOTAM.
  portadaRatio: "16 / 9",
  // La portada de cada lección es su primer hueco (AP-LL-01), que lleva la
  // descripción de qué dibujar. Sin esto saldrían dos huecos seguidos.
  portadaAuto: false,
  actividad: "aeropuertos-leccion",
  lecciones: AP_LECCIONES,
  niveles: AP_NIVELES,
  entrevistas: AP_ENTREVISTAS,
  alFinal: AP_CATALOGO,
  textoFinal: "Catálogo visual →",
  leerLocal: () => readAeropuertosLocal().lessonScreens,
  escribirLocal: (ns) => {
    writeAeropuertosLocal(ns)
  },
  marcar: (n) => {
    markAeropuertosLeccion(n)
  },
}

export function AeropuertosLeccion() {
  return <LectorLeccion modulo={MODULO} />
}

export const AEROPUERTOS_LECCION_RUTA = AP_APRENDE
