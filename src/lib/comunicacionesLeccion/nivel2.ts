/**
 * Nivel 2 · El idioma (lecciones 08 a 11, capítulos 8 a 11 de la especificación).
 *
 * El inglés de la radio no es el inglés académico: aquí se separan el inglés
 * general, el Aviation English, la fraseología y el plain language, y se
 * repasan las palabras estándar que no admiten sinónimos.
 *
 * Estado: solo el esqueleto. Cada lección lleva su título y el marcador
 * EN_REDACCION; el contenido se carga desde docs/comunicaciones/nivel-2.md
 * reemplazando `blocks` entero. El formato de los bloques y de los huecos
 * está documentado al inicio de index.ts.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"

export const NIVEL_2: DocScreen[] = [
  // ── 08 ──────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "Aviation English",
    kicker: "Comunicar con eficacia, no con sofisticación",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 09 ──────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "Competencia lingüística OACI",
    kicker: "Los seis niveles y qué exige el nivel 4",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 10 ──────────────────────────────────────────────────────────────────
  {
    n: 10,
    title: "Fraseología estándar y plain English",
    kicker: "Cuándo alcanza la frase estándar y cuándo no",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 11 ──────────────────────────────────────────────────────────────────
  {
    n: 11,
    title: "Palabras y expresiones estándar",
    kicker: "ROGER no es WILCO, STANDBY no es aprobación",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
]
