/**
 * Nivel 1 · Qué es la MEL (lecciones 01 a 03, capítulos 1 a 3 de la especificación).
 *
 * La base: qué es una MEL, de dónde sale (la MMEL) y qué no es (CDL y NEF).
 * Todo lo que viene después (leer una entrada, categorías, (M) y (O),
 * despacho) se apoya en esto.
 *
 * Estado: solo el esqueleto. Cada lección lleva su título y el marcador
 * EN_REDACCION; el contenido se carga desde docs/mel/nivel-1.md
 * reemplazando `blocks` entero. El formato de los bloques y de los huecos
 * está documentado al inicio de index.ts.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"

export const NIVEL_1: DocScreen[] = [
  // ── 01 ──────────────────────────────────────────────────────────────────
  {
    n: 1,
    title: "¿Qué es una MEL?",
    kicker: "El avión puede salir con algo inoperativo, pero no con cualquier cosa",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 02 ──────────────────────────────────────────────────────────────────
  {
    n: 2,
    title: "MMEL y MEL",
    kicker: "La lista del fabricante y la autoridad, y la del operador",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 03 ──────────────────────────────────────────────────────────────────
  {
    n: 3,
    title: "MEL, MMEL, CDL y NEF",
    kicker: "Cuatro listas que se confunden en entrevista",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
]
