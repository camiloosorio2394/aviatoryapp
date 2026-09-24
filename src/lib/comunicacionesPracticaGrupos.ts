/**
 * La práctica de Comunicaciones ATC ordenada para la pantalla: los diez tipos
 * de ejercicio en los cuatro verbos del módulo (escuchar, interpretar,
 * confirmar, responder) y el vuelo completo, que los junta.
 *
 * Los ítems salen de `comunicacionesPracticaEjemplos.ts`, que es donde se
 * escribe el guion. Este archivo no tiene contenido propio: solo dice en qué
 * grupo va cada tipo y deriva las claves de progreso con `claveEjercicioCm`,
 * que es lo que usan la pantalla, el catálogo (`scripts/catalogo`) y el conteo
 * liviano (`comunicacionesConteo.ts`). Así hay una sola lista de ejercicios y
 * ninguna clave escrita a mano.
 *
 * Pesa lo que pesa el guion: solo lo importa la página de práctica (lo vigila
 * `eslint.config.js`).
 */

import {
  claveEjercicioCm,
  type EjercicioComunicaciones,
  type EjercicioSimple,
  type EjVueloCompleto,
} from "@/lib/comunicacionesPractica"
import {
  CM_COPIA,
  CM_DESARMALA,
  CM_ES_PARA_MI,
  CM_ESTANDAR_O_PLAIN,
  CM_HEARBACK,
  CM_PANEL,
  CM_QUE_RESPONDES,
  CM_RAFAGA,
  CM_READBACK,
  CM_VUELO_COMPLETO,
} from "@/lib/comunicacionesPracticaEjemplos"

export type TipoCm = EjercicioComunicaciones["tipo"]

export interface TipoPracticaCm {
  tipo: TipoCm
  /** Nombre del ejercicio en la pantalla. */
  nombre: string
  /** Qué se hace, en una línea. */
  resumen: string
  items: EjercicioComunicaciones[]
}

export interface GrupoPracticaCm {
  id: "escuchar" | "interpretar" | "confirmar" | "responder" | "vuelo"
  nombre: string
  resumen: string
  tipos: TipoPracticaCm[]
}

export const CM_PRACTICA_GRUPOS: GrupoPracticaCm[] = [
  {
    id: "escuchar",
    nombre: "Escuchar",
    resumen: "Saber cuándo te llaman y copiar lo que dicen, a la primera.",
    tipos: [
      {
        tipo: "esParaMi",
        nombre: "¿Es para mí?",
        resumen: "Una frecuencia ocupada y distintivos parecidos: marca solo las tuyas.",
        items: CM_ES_PARA_MI,
      },
      {
        tipo: "rafaga",
        nombre: "Ráfaga de números",
        resumen: "Squawk, frecuencia, QNH, rumbo: escríbelos antes de que se acabe el tiempo.",
        items: CM_RAFAGA,
      },
      {
        tipo: "copia",
        nombre: "Copia la autorización",
        resumen: "Límite, ruta, nivel, salida y squawk, campo por campo.",
        items: CM_COPIA,
      },
    ],
  },
  {
    id: "interpretar",
    nombre: "Interpretar",
    resumen: "Separar la transmisión en sus partes y llevarla al avión.",
    tipos: [
      {
        tipo: "desarmala",
        nombre: "Desármala",
        resumen: "Distintivo, acción, valor, condición y lo que sigue, pieza por pieza.",
        items: CM_DESARMALA,
      },
      {
        tipo: "panel",
        nombre: "Panel de cabina",
        resumen: "Pon rumbo, altitud y régimen como lo pidió el controlador.",
        items: CM_PANEL,
      },
    ],
  },
  {
    id: "confirmar",
    nombre: "Confirmar",
    resumen: "La colación: decir lo crítico y oír cuando otro lo dice mal.",
    tipos: [
      {
        tipo: "readback",
        nombre: "Readback con voz",
        resumen: "Colaciona en voz alta (o escribiendo) con todos los elementos críticos.",
        items: CM_READBACK,
      },
      {
        tipo: "hearback",
        nombre: "Hearback",
        resumen: "Escucha la colación del otro piloto y encuentra el error, si lo hay.",
        items: CM_HEARBACK,
      },
    ],
  },
  {
    id: "responder",
    nombre: "Responder",
    resumen: "Qué se contesta, y cuándo la fraseología no alcanza.",
    tipos: [
      {
        tipo: "queRespondes",
        nombre: "¿Qué respondes?",
        resumen: "Cuatro respuestas posibles y una sola correcta.",
        items: CM_QUE_RESPONDES,
      },
      {
        tipo: "estandarOPlain",
        nombre: "¿Estándar o plain?",
        resumen: "Decide si hay fraseología para la situación y, si no, arma el mensaje.",
        items: CM_ESTANDAR_O_PLAIN,
      },
    ],
  },
  {
    id: "vuelo",
    nombre: "Vuelo completo",
    resumen: "De la autorización a la plataforma, con la radio cada vez peor.",
    tipos: [
      {
        tipo: "vueloCompleto",
        nombre: "Vuelo completo",
        resumen: "Todos los tipos encadenados en un vuelo, con un puntaje al final.",
        items: CM_VUELO_COMPLETO,
      },
    ],
  },
]

/** Los diez tipos, en el orden de la pantalla. */
export const CM_PRACTICA_TIPOS: TipoPracticaCm[] = CM_PRACTICA_GRUPOS.flatMap((g) => g.tipos)

/** Todas las claves de progreso de la práctica, derivadas de los ítems. */
export const CM_PRACTICA_CLAVES: string[] = CM_PRACTICA_TIPOS.flatMap((t) => t.items.map(claveEjercicioCm))

/** Total de ejercicios. `comunicacionesConteo.ts` lo repite liviano, y una prueba los compara. */
export const CM_PRACTICA_TOTAL = CM_PRACTICA_CLAVES.length

export function esVueloCompleto(ej: EjercicioComunicaciones): ej is EjVueloCompleto {
  return ej.tipo === "vueloCompleto"
}

export function esSimple(ej: EjercicioComunicaciones): ej is EjercicioSimple {
  return ej.tipo !== "vueloCompleto"
}
