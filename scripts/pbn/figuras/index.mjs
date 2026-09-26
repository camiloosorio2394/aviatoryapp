/**
 * Las figuras de la lección de PBN, en el orden de sus huecos en
 * docs/contenido/pbn.md. El conversor lee de aquí el `alt`, el `pie` y la
 * medida; `node scripts/figuras/dibujar.mjs pbn` escribe los SVG.
 */
import { TEMAS, tema } from "../../figuras/lib.mjs"
import { CARTAS } from "./cartas.mjs"
import { CONCEPTOS } from "./conceptos.mjs"
import { OPERACION } from "./operacion.mjs"
import { SISTEMA } from "./sistema.mjs"
import { TRAYECTORIAS } from "./trayectorias.mjs"

tema(TEMAS.pbn)

export const FIGURAS = [...CONCEPTOS, ...CARTAS, ...TRAYECTORIAS, ...SISTEMA, ...OPERACION]
