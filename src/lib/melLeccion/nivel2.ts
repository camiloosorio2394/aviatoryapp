/**
 * Nivel 2 · Leer una entrada (lecciones 04 a 15, capítulos 4 a 15 de la especificación).
 *
 * Una entrada de MEL leída de izquierda a derecha, columna por columna, sin
 * saltarse nada: capítulo ATA, ítem, categoría, cantidades, observaciones,
 * (M), (O) y la etiqueta INOP. Los ejemplos reales salen de las MMEL de la
 * FAA (A318-A321 Rev 32 y B-737 Rev 63a).
 *
 * Estado: solo el esqueleto. Cada lección lleva su título y el marcador
 * EN_REDACCION; el contenido se carga desde docs/mel/nivel-2.md
 * reemplazando `blocks` entero. El formato de los bloques y de los huecos
 * está documentado al inicio de index.ts.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"

export const NIVEL_2: DocScreen[] = [
  // ── 04 ──────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "Estructura de una MEL",
    kicker: "Preámbulo, definiciones, entradas y procedimientos",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 05 ──────────────────────────────────────────────────────────────────
  {
    n: 5,
    title: "El capítulo ATA",
    kicker: "Cómo se ordena el avión por sistemas",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 06 ──────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "El ítem",
    kicker: "Qué equipo exacto cubre cada entrada",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 07 ──────────────────────────────────────────────────────────────────
  {
    n: 7,
    title: "Categorías de reparación A, B, C y D",
    kicker: "Cuánto tiempo puede volar el avión con el defecto",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 08 ──────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "Day of discovery",
    kicker: "Desde cuándo corre el plazo de reparación",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 09 ──────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "Number installed",
    kicker: "Cuántos trae el avión",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 10 ──────────────────────────────────────────────────────────────────
  {
    n: 10,
    title: "Number required for dispatch",
    kicker: "Cuántos tienen que funcionar para salir",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 11 ──────────────────────────────────────────────────────────────────
  {
    n: 11,
    title: "Remarks or exceptions",
    kicker: "La columna donde están las condiciones",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 12 ──────────────────────────────────────────────────────────────────
  {
    n: 12,
    title: "(O): procedimiento de operaciones",
    kicker: "Lo que le toca a la tripulación",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 13 ──────────────────────────────────────────────────────────────────
  {
    n: 13,
    title: "(M): procedimiento de mantenimiento",
    kicker: "Lo que le toca a mantenimiento antes de salir",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 14 ──────────────────────────────────────────────────────────────────
  {
    n: 14,
    title: "(M)(O): los dos requisitos",
    kicker: "Cuando la entrada pide a los dos",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 15 ──────────────────────────────────────────────────────────────────
  {
    n: 15,
    title: "Placarding",
    kicker: "La etiqueta INOP en la cabina",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
]
