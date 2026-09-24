/**
 * Nivel 4 · En ruta y llegada (lecciones 19 a 30, capítulos 19 a 30 de la especificación).
 *
 * Del SID a la pista de destino: niveles, rumbos, velocidades, reportes,
 * desvíos por meteorología, llegada, aproximación, espera, aterrizaje y motor
 * y al aire.
 *
 * Estado: solo el esqueleto. Cada lección lleva su título y el marcador
 * EN_REDACCION; el contenido se carga desde docs/comunicaciones/nivel-4.md
 * reemplazando `blocks` entero. El formato de los bloques y de los huecos
 * está documentado al inicio de index.ts.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"

export const NIVEL_4: DocScreen[] = [
  // ── 19 ──────────────────────────────────────────────────────────────────
  {
    n: 19,
    title: "SID y salida",
    kicker: "La autorización de salida y las restricciones publicadas",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 20 ──────────────────────────────────────────────────────────────────
  {
    n: 20,
    title: "Ascenso y cambios de nivel",
    kicker: "CLIMB, DESCEND, MAINTAIN y cuándo decir UNABLE",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 21 ──────────────────────────────────────────────────────────────────
  {
    n: 21,
    title: "Rumbo, directo y vectores",
    kicker: "Virajes, directos y retomar la navegación propia",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 22 ──────────────────────────────────────────────────────────────────
  {
    n: 22,
    title: "Control de velocidad",
    kicker: "Reducir, aumentar y decir que no se puede",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 23 ──────────────────────────────────────────────────────────────────
  {
    n: 23,
    title: "Crucero",
    kicker: "Reportes, solicitudes y cambios de frecuencia",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 24 ──────────────────────────────────────────────────────────────────
  {
    n: 24,
    title: "Reportes de posición",
    kicker: "Qué lleva un reporte y cuándo se da",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 25 ──────────────────────────────────────────────────────────────────
  {
    n: 25,
    title: "Desvíos por meteorología",
    kicker: "Cómo pedir un desvío con claridad",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 26 ──────────────────────────────────────────────────────────────────
  {
    n: 26,
    title: "STAR y llegada",
    kicker: "La llegada autorizada y lo que la modifica",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 27 ──────────────────────────────────────────────────────────────────
  {
    n: 27,
    title: "Aproximación",
    kicker: "La autorización de aproximación y lo que se reporta",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 28 ──────────────────────────────────────────────────────────────────
  {
    n: 28,
    title: "Espera (holding)",
    kicker: "Instrucciones de espera y hora prevista de aproximación",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 29 ──────────────────────────────────────────────────────────────────
  {
    n: 29,
    title: "Aterrizaje",
    kicker: "CONTINUE APPROACH no es CLEARED TO LAND",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 30 ──────────────────────────────────────────────────────────────────
  {
    n: 30,
    title: "Motor y al aire",
    kicker: "Go-around ordenado o iniciado por la tripulación",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
]
