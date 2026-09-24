/**
 * El marcador de las lecciones que todavía no tienen contenido.
 *
 * Es UN objeto, no uno por lección, a propósito: el lector reconoce una
 * lección en redacción porque su única pieza es exactamente esta
 * (`leccionEnRedaccion` en index.ts), y una lección así no cuenta como leída
 * ni suma estudio del día. El día que se carga el contenido de una lección, se
 * reemplaza su `blocks` entero y la lección empieza a contar sola, sin tocar
 * nada más.
 *
 * No dice nada técnico: solo que el contenido falta.
 */

import type { DocBlockData } from "@/lib/docBlocks"

export const EN_REDACCION: DocBlockData = {
  kind: "callout",
  tone: "info",
  title: "Lección en redacción",
  text: "El contenido de esta lección todavía se está escribiendo y se revisa contra los documentos de la OACI antes de publicarse. Por ahora no cuenta como leída: cuando esté lista, aparece aquí en su lugar.",
}
