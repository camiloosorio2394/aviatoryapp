import type { ComponentType } from "react"
import {
  AlertTriangle,
  CloudSun,
  Fuel,
  Gauge,
  Headset,
  MoveVertical,
  Route as RouteIcon,
  Scale,
  TowerControl,
  Wind,
} from "lucide-react"
import { AerodromeIcon } from "@/components/icons/aero"
import { AP_ACENTO } from "@/lib/aeropuertos"
import type { ClaveModulo } from "@/lib/modulosAerolinea"

/**
 * Cómo se ve cada módulo de Ingreso a aerolínea: icono, acento, portada y la
 * frase que lo resume.
 *
 * Vive aquí y no en `lib/modulosAerolinea`, que lo prohíbe por escrito: esa
 * lista lleva solo constantes livianas, y fotos y descripciones son
 * presentación. Tampoco se repite en cada pantalla, que es como el panel acabó
 * con otros iconos, otros colores y ninguna foto mientras la portada del módulo
 * tenía las suyas: el piloto pasaba de una pantalla a la otra y el mismo
 * módulo parecía otro.
 *
 * `Record<ClaveModulo, …>` a propósito: un módulo que entra sin cara no
 * compila.
 */
export interface CaraDeModulo {
  icon: ComponentType<{ className?: string }>
  /** El escalón de texto del acento: el que llega a AA sobre blanco. */
  color: string
  foto?: string
  /** Qué portada falta y de qué medida, mientras no exista. */
  fotoHueco?: string
  descripcion: string
}

/**
 * Temas que todavía no tienen contenido, en el orden en que se van abriendo.
 * Los leen la portada de Ingreso a aerolínea y el panel: si cada una tuviera
 * su lista, al abrirse un tema una de las dos seguiría anunciándolo como futuro.
 *
 * "Requisitos por aerolínea" salió de esta lista: no está pendiente, ya existe
 * como /app/match ("Para cuál calificas"), que consulta aerolíneas, horas y
 * perfil y calcula exactamente eso. Anunciarlo como futuro y enlazarlo cuarenta
 * píxeles más abajo era la contradicción del hallazgo C5.
 *
 * "Performance y planificación" salió por lo mismo: el módulo está completo y
 * tiene su hub, su lección y su evaluación desde el 24 de septiembre. Mientras
 * siguió aquí, la portada lo anunciaba como futuro y no lo enlazaba, así que
 * desde la app no había forma de llegar a él.
 */
export const TEMAS_EN_CAMINO: readonly string[] = [
  "Sistemas y motor a reacción",
  "Entrevista técnica",
  "Entrevista HR y CRM",
]

export const CARA_DE_MODULO: Record<ClaveModulo, CaraDeModulo> = {
  notam: {
    // Un NOTAM avisa de algo en un aeródromo o su espacio aéreo: el símbolo
    // informa, no decora.
    icon: AerodromeIcon,
    color: "var(--av-blue-500)",
    foto: "/modulos/notam/tema-notam-operacion.webp",
    descripcion: "Lee la línea Q y decodifica avisos reales de la Aerocivil.",
  },
  metar: {
    icon: CloudSun,
    color: "var(--av-mt-700)",
    foto: "/modulos/meteorologia/tema-meteorologia-conveccion.webp",
    descripcion: "Del cielo al informe: nubes, frentes, METAR y TAF.",
  },
  mercancias: {
    icon: AlertTriangle,
    color: "var(--av-dg-700)",
    foto: "/modulos/mercancias/tema-mercancias-carga.webp",
    descripcion: "Clases, NOTOC, baterías de litio y qué hacer en vuelo.",
  },
  aerodinamica: {
    icon: Wind,
    color: "var(--av-ae-700)",
    foto: "/modulos/aerodinamica/tema-aerodinamica-ala.webp",
    descripcion: "Sustentación, pérdida, factor de carga, Mach y altitud de densidad.",
  },
  aeropuertos: {
    icon: TowerControl,
    color: AP_ACENTO,
    foto: "/modulos/aeropuertos/tema-aeropuertos-rodaje.webp",
    descripcion: "Señales, letreros y luces: leer un aeropuerto de un vistazo.",
  },
  performance: {
    icon: Gauge,
    color: "var(--av-pf-700)",
    fotoHueco: "PERF-TEMA · Portada de tema · 3:2 · 1200×800 · Avión de transporte iniciando la carrera de despegue, visto desde el costado de la pista",
    descripcion: "V₁, campo equilibrado, segundo segmento y peso máximo del día.",
  },
  comunicaciones: {
    // El mismo icono que su tarjeta en Ingreso a aerolínea.
    icon: Headset,
    color: "var(--av-cm-700)",
    fotoHueco: "CM-TEM-01 · 2:1 · 1200×600 · Piloto con auriculares y la mano en el selector de frecuencia",
    descripcion: "Escuchar, interpretar, confirmar y responder al ATC, de la rampa al océano.",
  },
  rac: {
    icon: Scale,
    color: "var(--av-rac-700)",
    foto: "/modulos/rac/tema-rac.webp",
    descripcion: "Licencias, médico, reglas de vuelo, aerolínea y sanciones: lo que dice cada RAC y lo que te toca a ti.",
  },
  combustible: {
    icon: Fuel,
    color: "var(--av-cb-700)",
    foto: "/modulos/combustible/tema-combustible.webp",
    descripcion: "Block fuel, reserva final, fuel check, combustible mínimo y MAYDAY: decidir antes de que falte.",
  },
  rvsm: {
    // Dos flechas verticales encontradas: lo que RVSM reduce es exactamente
    // esa distancia, y el icono lo dice sin texto.
    icon: MoveVertical,
    color: "var(--av-rv-700)",
    fotoHueco:
      "RVSM-TEMA · Portada de tema · 3:2 · 1200×800 · Dos aeronaves en crucero en niveles adyacentes, vistas de costado, con la separación acotada",
    descripcion: "Mil pies entre FL 290 y FL 410: equipo, chequeos, fraseología y qué hacer si se pierde.",
  },
  pbn: {
    // Una ruta de puntos unidos: es exactamente lo que PBN permite trazar sin
    // depender de volar hacia una antena.
    icon: RouteIcon,
    color: "var(--av-pbn-700)",
    fotoHueco:
      "PBN-TEMA · Portada de tema · 3:2 · 1200×800 · Carta de llegada con la trayectoria definida por waypoints y la especificación rotulada sobre un segmento",
    descripcion: "RNAV y RNP, el número, la carta, el FMS y qué decir cuando se pierde la capacidad.",
  },
}
