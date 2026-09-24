/**
 * Nivel 5 · Vigilancia, contingencias y emergencias (lecciones 31 a 40, capítulos 31 a 40 de la especificación).
 *
 * Transpondedor, falla de comunicaciones, socorro y urgencia, combustible,
 * TCAS/ACAS y las capacidades que el ATC da por hechas (RVSM, PBN) hasta que
 * dejan de estar.
 *
 * Estado: solo el esqueleto. Cada lección lleva su título y el marcador
 * EN_REDACCION; el contenido se carga desde docs/comunicaciones/nivel-5.md
 * reemplazando `blocks` entero. El formato de los bloques y de los huecos
 * está documentado al inicio de index.ts.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { EN_REDACCION } from "./enRedaccion"

export const NIVEL_5: DocScreen[] = [
  // ── 31 ──────────────────────────────────────────────────────────────────
  {
    n: 31,
    title: "Transpondedor y SSR",
    kicker: "Códigos, IDENT y los códigos especiales",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 32 ──────────────────────────────────────────────────────────────────
  {
    n: 32,
    title: "Falla de comunicaciones",
    kicker: "Qué revisar y qué hacer cuando la radio calla",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 33 ──────────────────────────────────────────────────────────────────
  {
    n: 33,
    title: "La frecuencia de emergencia 121.5 MHz",
    kicker: "Para qué es y para qué no",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 34 ──────────────────────────────────────────────────────────────────
  {
    n: 34,
    title: "Socorro: MAYDAY",
    kicker: "Qué es una situación de socorro y qué se informa",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 35 ──────────────────────────────────────────────────────────────────
  {
    n: 35,
    title: "Urgencia: PAN PAN",
    kicker: "Cuándo una situación es urgente sin ser socorro",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 36 ──────────────────────────────────────────────────────────────────
  {
    n: 36,
    title: "MAYDAY o PAN PAN",
    kicker: "La diferencia, lado a lado",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 37 ──────────────────────────────────────────────────────────────────
  {
    n: 37,
    title: "MINIMUM FUEL y emergencia de combustible",
    kicker: "Qué comunica cada una y qué no",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 38 ──────────────────────────────────────────────────────────────────
  {
    n: 38,
    title: "TCAS/ACAS RA",
    kicker: "Cumplir, informar y volver a la autorización",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 39 ──────────────────────────────────────────────────────────────────
  {
    n: 39,
    title: "RVSM",
    kicker: "Cuándo se pierde la capacidad y cómo se dice",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
  // ── 40 ──────────────────────────────────────────────────────────────────
  {
    n: 40,
    title: "PBN, RNAV y RNP",
    kicker: "Decir que no se puede cumplir un procedimiento",
    minutes: 1,
    blocks: [EN_REDACCION],
  },
]
