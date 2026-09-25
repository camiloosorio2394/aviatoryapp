/**
 * Las figuras de la lección de Performance. En docs/contenido/performance.md
 * cada hueco lleva su código escrito (PERF-01…), así que aquí el orden no
 * importa. El conversor lee de aquí el `alt`, el `pie` y la medida;
 * `node scripts/figuras/dibujar.mjs performance` escribe los SVG.
 */
import { TEMAS, tema } from "../../figuras/lib.mjs"
import { ASCENSO } from "./ascenso.mjs"
import { DESPEGUE } from "./despegue.mjs"
import { RUTA } from "./ruta.mjs"

tema(TEMAS.performance)

export const FIGURAS = [...DESPEGUE, ...ASCENSO, ...RUTA]
