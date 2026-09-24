/**
 * Nivel 3 · Del defecto al despacho (lecciones 16 a 25, capítulos 16 a 21 y 33 a 36 de la especificación).
 *
 * Hay algo inoperativo: ¿salimos o no, y cómo? Por qué MEL no es «GO», el
 * flujo del defecto al despacho, qué le toca al piloto, el libro técnico, el
 * diferido, los ítems múltiples, la decisión del comandante y cómo
 * encontrar, consultar y confirmar la revisión de la MEL. El proceso
 * concreto depende del operador y está en su manual.
 *
 * OJO: los capítulos de este nivel no son correlativos. La lección es el
 * orden del archivo; el capítulo va en el comentario de cada una (y en
 * MEL_CAPITULOS de index.ts), solo para encontrar su texto.
 *
 * Estado: solo el esqueleto. Cada lección lleva su título y el marcador
 * EN_REDACCION; el contenido se carga desde docs/mel/nivel-3.md
 * reemplazando `blocks` entero. El formato de los bloques y de los huecos
 * está documentado al inicio de index.ts.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"

export const NIVEL_3: DocScreen[] = [
  // ── 16 ──────────────────────────────────────────────────────────────────
  {
    n: 16,
    title: "MEL no significa «GO»",
    kicker: "Que haya alivio no obliga a salir",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 17 ──────────────────────────────────────────────────────────────────
  {
    n: 17,
    title: "El flujo operacional de la MEL",
    kicker: "Del defecto al despacho, paso a paso",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 18 ──────────────────────────────────────────────────────────────────
  {
    n: 18,
    title: "La responsabilidad del piloto",
    kicker: "Qué revisa y qué firma la tripulación",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 19 ──────────────────────────────────────────────────────────────────
  {
    n: 19,
    title: "Tech log y aircraft logbook",
    kicker: "Donde queda escrito el defecto",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 20 ──────────────────────────────────────────────────────────────────
  {
    n: 20,
    title: "Deferred defect y DMI",
    kicker: "El defecto diferido y su control",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 21 ──────────────────────────────────────────────────────────────────
  {
    n: 21,
    title: "Varios ítems de MEL a la vez",
    kicker: "Cuando se suman las restricciones",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 22 · capítulo 33 ────────────────────────────────────────────────────
  {
    n: 22,
    title: "La MEL y la decisión del comandante",
    kicker: "La última palabra antes de salir",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 23 · capítulo 34 ────────────────────────────────────────────────────
  {
    n: 23,
    title: "Cómo buscar un ítem",
    kicker: "Del síntoma en cabina a la entrada correcta",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 24 · capítulo 35 ────────────────────────────────────────────────────
  {
    n: 24,
    title: "MEL digital y EFB",
    kicker: "La MEL en la tableta de la cabina",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 25 · capítulo 36 ────────────────────────────────────────────────────
  {
    n: 25,
    title: "Revision status",
    kicker: "Cómo saber que la MEL está vigente",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
]
