/**
 * La lección de Mercancías peligrosas: dieciocho lecciones en cinco niveles.
 *
 * Progresión: Introducción → Identificación → Transporte aéreo → Situaciones
 * del piloto → Casos reales y repaso. Cada nivel abre con un caso real y cada
 * lección cierra con «Pon a prueba lo que aprendiste». La práctica y la
 * evaluación son páginas aparte, como en NOTAM.
 *
 * Fuentes: RAC 175 (Edición original, marzo 2016, Res. 00478), LAR 175
 * (Enmiendas 3 y 4), RAC 2, RAC 61 y el Adendo 5 (2011-2012) del Doc 9284.
 * Los accidentes salen de los informes oficiales que cada caso cita.
 *
 * Las lecciones se escriben por nivel en su propio archivo; este solo las
 * junta y comprueba que la numeración sea la que el índice y el progreso
 * esperan.
 */

import type { DocScreen } from "@/lib/docBlocks"
import type { LectorNivel } from "@/components/lesson/LectorLeccion"
import { NIVEL_1 } from "./nivel1"
import { NIVEL_2 } from "./nivel2"
import { NIVEL_3 } from "./nivel3"
import { PENDIENTES } from "./pendientes"

export const MP_NIVELES: LectorNivel[] = [
  { titulo: "Nivel 1 · Introducción", desde: 1 },
  { titulo: "Nivel 2 · Identificación", desde: 5 },
  { titulo: "Nivel 3 · Transporte aéreo", desde: 9 },
  { titulo: "Nivel 4 · Situaciones del piloto", desde: 13 },
  { titulo: "Nivel 5 · Casos reales y repaso", desde: 17 },
]

export const MP_LECCIONES: DocScreen[] = [...NIVEL_1, ...NIVEL_2, ...NIVEL_3, ...PENDIENTES]

// La numeración es la que se guarda como progreso: si un archivo se
// desordena, mejor caerse al arrancar que marcar leída la lección equivocada.
MP_LECCIONES.forEach((s, i) => {
  if (s.n !== i + 1) throw new Error(`mercanciasLeccion: la lección ${s.n} está en la posición ${i + 1}`)
})

export const MP_LECCION_TOTAL = MP_LECCIONES.length

export const MP_MINUTOS = MP_LECCIONES.reduce((t, s) => t + s.minutes, 0)

export const MP_FUENTES_LISTA: string[] = [
  "RAC 175, Transporte sin riesgos de mercancías peligrosas por vía aérea. UAEAC, Edición original, marzo de 2016. Adoptado por Resolución 00478 del 29 de febrero de 2016 (Diario Oficial 49.830 del 31 de marzo de 2016); deroga el RAC 10.",
  "LAR 175, Transporte sin riesgo de mercancías peligrosas por vía aérea. SRVSOP, Enmiendas 3 y 4.",
  "Anexo 18 al Convenio sobre Aviación Civil Internacional, Transporte sin riesgos de mercancías peligrosas por vía aérea. OACI.",
  "Doc 9284-AN/905, Instrucciones Técnicas para el transporte sin riesgos de mercancías peligrosas por vía aérea. OACI. Del ciclo 2011-2012 se consultó el Adendo núm. 5 (discrepancias de Estados y explotadores).",
  "RAC 2, Personal aeronáutico, y RAC 61, Licencias para pilotos y sus habilitaciones. UAEAC.",
  "NTSB/AAR-97/06 (ValuJet 592); GCAA de los Emiratos Árabes Unidos, informe final 2013 (UPS 6); ARAIB de Corea, informe final (Asiana 991); Departamento de Aviación Civil de Sudáfrica, informe de investigación (South African 295).",
]
