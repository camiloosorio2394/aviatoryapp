/**
 * Las figuras de la lección de PBN, en el orden de sus huecos en
 * docs/contenido/pbn.md. El conversor lee de aquí el `alt`, el `pie` y la
 * medida; `node scripts/pbn/dibujar-figuras.mjs` escribe los SVG.
 */
import { CARTAS } from "./cartas.mjs"
import { CONCEPTOS } from "./conceptos.mjs"
import { OPERACION } from "./operacion.mjs"
import { SISTEMA } from "./sistema.mjs"
import { TRAYECTORIAS } from "./trayectorias.mjs"

export const FIGURAS = [...CONCEPTOS, ...CARTAS, ...TRAYECTORIAS, ...SISTEMA, ...OPERACION]
