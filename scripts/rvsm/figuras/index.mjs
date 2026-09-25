/**
 * Las figuras de la lección de RVSM, en el orden de sus huecos en
 * docs/contenido/rvsm.md. El conversor lee de aquí el `alt`, el `pie` y la
 * medida; `node scripts/figuras/dibujar.mjs rvsm` escribe los SVG.
 */
import { TEMAS, tema } from "../../figuras/lib.mjs"
import { BASICOS } from "./basicos.mjs"
import { CONTINGENCIA } from "./contingencia.mjs"
import { OPERACION } from "./operacion.mjs"

tema(TEMAS.rvsm)

export const FIGURAS = [...BASICOS, ...OPERACION, ...CONTINGENCIA]
