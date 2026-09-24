/**
 * Nivel 6 · Data link y operación oceánica (lecciones 41 a 50, capítulos 41 a 50 de la especificación).
 *
 * Lo que no va por voz o no va por VHF: ATIS y VOLMET, CPDLC y DCL, ACARS,
 * ADS-C, HF y SELCAL, y cómo se combinan en la operación oceánica.
 *
 * Estado: solo el esqueleto. Cada lección lleva su título y el marcador
 * EN_REDACCION; el contenido se carga desde docs/comunicaciones/nivel-6.md
 * reemplazando `blocks` entero. El formato de los bloques y de los huecos
 * está documentado al inicio de index.ts.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"

export const NIVEL_6: DocScreen[] = [
  // ── 41 ──────────────────────────────────────────────────────────────────
  {
    n: 41,
    title: "ATIS",
    kicker: "Qué trae, cómo se identifica y cómo se informa que se tiene",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 42 ──────────────────────────────────────────────────────────────────
  {
    n: 42,
    title: "VOLMET",
    kicker: "Meteorología en vuelo, y en qué operaciones importa",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 43 ──────────────────────────────────────────────────────────────────
  {
    n: 43,
    title: "CPDLC",
    kicker: "Mensajes por data link entre piloto y controlador",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 44 ──────────────────────────────────────────────────────────────────
  {
    n: 44,
    title: "Voz o CPDLC",
    kicker: "Ventajas y límites de cada uno",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 45 ──────────────────────────────────────────────────────────────────
  {
    n: 45,
    title: "Autorización de salida por data link",
    kicker: "DCL y PDC",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 46 ──────────────────────────────────────────────────────────────────
  {
    n: 46,
    title: "ACARS",
    kicker: "Comunicaciones con la compañía, y por qué no es CPDLC",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 47 ──────────────────────────────────────────────────────────────────
  {
    n: 47,
    title: "ADS-C",
    kicker: "Contratos de reporte en espacio oceánico y remoto",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 48 ──────────────────────────────────────────────────────────────────
  {
    n: 48,
    title: "HF",
    kicker: "Propagación, calidad y reportes en largo alcance",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 49 ──────────────────────────────────────────────────────────────────
  {
    n: 49,
    title: "SELCAL",
    kicker: "La llamada selectiva y su comprobación",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 50 ──────────────────────────────────────────────────────────────────
  {
    n: 50,
    title: "Comunicaciones oceánicas",
    kicker: "HF, CPDLC, ADS-C y SELCAL juntos",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
]
