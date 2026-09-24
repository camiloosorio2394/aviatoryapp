/**
 * Nivel 4 · Impacto operacional (lecciones 26 a 33, capítulos 22 a 29 de la especificación).
 *
 * El ítem tiene alivio; ¿qué le hace a mi vuelo? Un diferido puede tocar la
 * performance, el combustible, la meteorología en la que se puede volar,
 * las aproximaciones, el espacio aéreo (RVSM, PBN) y las rutas EDTO. Cierra
 * con la APU como caso guía.
 *
 * Estado: solo el esqueleto. Cada lección lleva su título y el marcador
 * EN_REDACCION; el contenido se carga desde docs/mel/nivel-4.md
 * reemplazando `blocks` entero. El formato de los bloques y de los huecos
 * está documentado al inicio de index.ts.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"

export const NIVEL_4: DocScreen[] = [
  // ── 26 · capítulo 22 ────────────────────────────────────────────────────
  {
    n: 26,
    title: "MEL y performance",
    kicker: "Pesos, pistas y penalizaciones",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 27 · capítulo 23 ────────────────────────────────────────────────────
  {
    n: 27,
    title: "MEL y combustible",
    kicker: "Cuando el ítem cambia lo que hay que cargar",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 28 · capítulo 24 ────────────────────────────────────────────────────
  {
    n: 28,
    title: "MEL y meteorología",
    kicker: "Hielo, lluvia y condiciones en las que no se puede volar",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 29 · capítulo 25 ────────────────────────────────────────────────────
  {
    n: 29,
    title: "MEL y aproximaciones",
    kicker: "Qué mínimos y qué categorías siguen disponibles",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 30 · capítulo 26 ────────────────────────────────────────────────────
  {
    n: 30,
    title: "MEL y RVSM",
    kicker: "Qué equipo exige el espacio aéreo reducido",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 31 · capítulo 27 ────────────────────────────────────────────────────
  {
    n: 31,
    title: "MEL y PBN / RNP",
    kicker: "La navegación que pide la ruta y lo que queda a bordo",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 32 · capítulo 28 ────────────────────────────────────────────────────
  {
    n: 32,
    title: "MEL y ETOPS / EDTO",
    kicker: "Lo que se exige para volar lejos de un alterno",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 33 · capítulo 29 ────────────────────────────────────────────────────
  {
    n: 33,
    title: "MEL y APU: caso guía",
    kicker: "Un solo ítem, todos sus efectos en el vuelo",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
]
