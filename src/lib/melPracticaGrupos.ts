/**
 * La práctica de MEL ordenada para la pantalla: los seis tipos de ejercicio en
 * el orden en que el piloto se los encuentra con un defecto en el tech log.
 * Primero encuentra y lee la entrada, después sabe cuánto plazo tiene, decide
 * si el avión sale y, por último, qué le cambia al vuelo.
 *
 * Los ítems salen de `melPracticaDatos.ts`, que es donde se escriben. Este
 * archivo no tiene contenido propio: solo dice en qué grupo va cada tipo y
 * deriva las claves de progreso con `claveEjercicioMel`, que es lo que usan la
 * pantalla, el catálogo (`scripts/catalogo`) y el conteo liviano
 * (`melConteo.ts`). Así hay una sola lista de ejercicios y ninguna clave
 * escrita a mano.
 *
 * Pesa lo que pesan los datos: solo lo importa la página de práctica (lo
 * vigila `eslint.config.js`).
 */

import { claveEjercicioMel, NOMBRE_TIPO_MEL, type EjercicioMel, type TipoEjercicioMel } from "@/lib/melPractica"
import {
  MEL_BUSCA_EL_ITEM,
  MEL_CALCULA_EL_PLAZO,
  MEL_COMBINADOS,
  MEL_IMPACTO_OPERACIONAL,
  MEL_LEE_LA_ENTRADA,
  MEL_PODEMOS_SALIR,
} from "@/lib/melPracticaDatos"

export interface TipoPracticaMel {
  tipo: TipoEjercicioMel
  /** Nombre del ejercicio en la pantalla. */
  nombre: string
  /** Qué se hace, en una línea. */
  resumen: string
  items: readonly EjercicioMel[]
}

export interface GrupoPracticaMel {
  id: "leer" | "plazo" | "decidir" | "impacto"
  nombre: string
  resumen: string
  tipos: TipoPracticaMel[]
}

export const MEL_PRACTICA_GRUPOS: GrupoPracticaMel[] = [
  {
    id: "leer",
    nombre: "Encontrar y leer",
    resumen: "Del síntoma al ítem, y del ítem a lo que dice cada columna.",
    tipos: [
      {
        tipo: "buscaElItem",
        nombre: NOMBRE_TIPO_MEL.buscaElItem,
        resumen: "Con el síntoma, elige el capítulo ATA y después el ítem, como en el EFB.",
        items: MEL_BUSCA_EL_ITEM,
      },
      {
        tipo: "leeLaEntrada",
        nombre: NOMBRE_TIPO_MEL.leeLaEntrada,
        resumen: "Toca la parte de la entrada que te piden y responde qué significa.",
        items: MEL_LEE_LA_ENTRADA,
      },
    ],
  },
  {
    id: "plazo",
    nombre: "Plazo",
    resumen: "Hasta cuándo puede volar el avión con el ítem diferido.",
    tipos: [
      {
        tipo: "calculaElPlazo",
        nombre: NOMBRE_TIPO_MEL.calculaElPlazo,
        resumen: "Días calendario, flight-days, vuelos u horas: la fecha o el tramo en que vence.",
        items: MEL_CALCULA_EL_PLAZO,
      },
    ],
  },
  {
    id: "decidir",
    nombre: "Decidir el despacho",
    resumen: "Sí cumpliendo, no, o falta información: y por qué.",
    tipos: [
      {
        tipo: "podemosSalir",
        nombre: NOMBRE_TIPO_MEL.podemosSalir,
        resumen: "Un ítem abierto y un vuelo: decide y marca las razones que lo sostienen.",
        items: MEL_PODEMOS_SALIR,
      },
      {
        tipo: "combinados",
        nombre: NOMBRE_TIPO_MEL.combinados,
        resumen: "Dos o tres ítems abiertos a la vez: la decisión y cómo se afectan entre sí.",
        items: MEL_COMBINADOS,
      },
    ],
  },
  {
    id: "impacto",
    nombre: "Impacto en el vuelo",
    resumen: "Lo que el diferido le quita a la operación aunque el avión salga.",
    tipos: [
      {
        tipo: "impactoOperacional",
        nombre: NOMBRE_TIPO_MEL.impactoOperacional,
        resumen: "RVSM, CAT II/III, EDTO, PBN, performance, combustible o meteorología: cuáles toca.",
        items: MEL_IMPACTO_OPERACIONAL,
      },
    ],
  },
]

/** Los seis tipos, en el orden de la pantalla. */
export const MEL_PRACTICA_TIPOS: TipoPracticaMel[] = MEL_PRACTICA_GRUPOS.flatMap((g) => g.tipos)

/** Todas las claves de progreso de la práctica, derivadas de los ítems. */
export const MEL_PRACTICA_CLAVES: string[] = MEL_PRACTICA_TIPOS.flatMap((t) => t.items.map(claveEjercicioMel))

/** Total de ejercicios. `melConteo.ts` lo repite liviano, y una prueba los compara. */
export const MEL_PRACTICA_TOTAL = MEL_PRACTICA_CLAVES.length
