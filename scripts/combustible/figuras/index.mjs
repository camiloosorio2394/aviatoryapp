/**
 * Las figuras de la lección de Gestión del combustible. El código de cada una
 * es el del capítulo donde está su hueco en docs/contenido/gestion-combustible.md
 * (IMG-C01, IMG-C11…), así que aquí el orden no importa. El conversor lee de
 * aquí el `alt`, el `pie` y la medida; `node scripts/figuras/dibujar.mjs
 * combustible` escribe los SVG.
 */
import { TEMAS, tema } from "../../figuras/lib.mjs"
import { PLANIFICACION } from "./planificacion.mjs"
import { VUELO } from "./vuelo.mjs"

tema(TEMAS.combustible)

export const FIGURAS = [...PLANIFICACION, ...VUELO]
