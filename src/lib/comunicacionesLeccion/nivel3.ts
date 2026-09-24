/**
 * Nivel 3 · Autorizaciones y superficie (lecciones 12 a 18, capítulos 12 a 18 de la especificación).
 *
 * La autorización: cómo se colaciona, qué es y qué no es una autorización, y
 * el recorrido en tierra hasta el despegue, con la pista como el lugar donde un
 * malentendido cuesta más.
 *
 * Estado: solo el esqueleto. Cada lección lleva su título y el marcador
 * EN_REDACCION; el contenido se carga desde docs/comunicaciones/nivel-3.md
 * reemplazando `blocks` entero. El formato de los bloques y de los huecos
 * está documentado al inicio de index.ts.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"

export const NIVEL_3: DocScreen[] = [
  // ── 12 ──────────────────────────────────────────────────────────────────
  {
    n: 12,
    title: "Readback y hearback",
    kicker: "Lo que se colaciona y quién lo verifica",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 13 ──────────────────────────────────────────────────────────────────
  {
    n: 13,
    title: "Qué es una autorización ATC",
    kicker: "Autorización, instrucción, información y solicitud",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 14 ──────────────────────────────────────────────────────────────────
  {
    n: 14,
    title: "La autorización IFR",
    kicker: "Sus componentes y cómo copiarla",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 15 ──────────────────────────────────────────────────────────────────
  {
    n: 15,
    title: "Puesta en marcha y pushback",
    kicker: "Start-up, pushback y sus restricciones",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 16 ──────────────────────────────────────────────────────────────────
  {
    n: 16,
    title: "Rodaje",
    kicker: "Calles, puntos de espera y cruces de pista",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 17 ──────────────────────────────────────────────────────────────────
  {
    n: 17,
    title: "Seguridad en la pista",
    kicker: "HOLD SHORT, LINE UP AND WAIT y la autorización de despegue",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 18 ──────────────────────────────────────────────────────────────────
  {
    n: 18,
    title: "Despegue",
    kicker: "De la solicitud a la primera instrucción en el aire",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
]
