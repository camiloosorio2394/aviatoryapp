import type { EjercicioPsico } from "@/lib/psicotecnicas"
import { SERIES } from "./series"

/**
 * Capa editorial sobre el archivo generado. No cambia el cuadernillo: impide
 * que sus erratas y reglas indeterminadas lleguen al banco activo.
 * Las razones y páginas se documentan en FUENTES.md.
 */
export const SERIES_DESCARTADAS: Record<string, string> = {
  "NU-N2-04-19": "Las dos secuencias intercaladas no reproducen el 48 impreso.",
  "NU-N2-06-01": "El ciclo +3, +4, +2 pide 18, pero la clave imprime 20.",
  "NU-N2-06-20": "El 99 impreso no continúa ninguna de las dos columnas sugeridas.",
  "NU-N2-07-07": "La clave marca un 9 que aparece dos veces, sin indicar cuál sobra ni una regla verificable.",
  "NU-N2-07-08": "El bloque pide un intruso, pero la clave da 35, que no está en la serie; los saltos tampoco dan una regla única.",
  "NU-N2-07-09": "La clave marca un 6 repetido y no justifica cuál de sus apariciones sobra.",
  "NU-N2-08-05": "El enunciado imprime 16 y la solución razona con 162: no es el mismo ejercicio.",
  "NU-N2-08-06": "La regla impresa cambia arbitrariamente de +3 a ×3 y otra vez a +3.",
  "NU-N2-08-07": "La clave 42 no se deduce de un patrón único en los saltos impresos.",
  "NU-N2-10-05": "La solución agrupa 2,2,4 pero el enunciado imprime 2,4: falta un término.",
  "NU-N2-10-13": "La solución alterna ×2 y ×6 sin regla que explique el cambio.",
}

const EXPLICACIONES_INTRUSO: Record<string, string> = {
  "NU-N2-07-01": "Sin el 7 queda 2, 4, 6, 8, 10, 12: todos son pares consecutivos, con salto +2.",
  "NU-N2-07-02": "El segundo 20 rompe la cuenta descendente de uno en uno: 24, 23, 22, 21, 20, 19, 18, 17, 16, 15.",
  "NU-N2-07-06": "El 1 inicial sobra porque desde 2 todos los términos se multiplican por 3: 2, 6, 18, 54, 162.",
  "NU-N2-08-01": "El 22 es el único par. Sin él queda la serie de impares consecutivos 13, 15, 17, 19, 21, 23, 25, 27.",
  "NU-N2-08-02": "El 16 es el único par. Los demás son impares descendentes de dos en dos: 23, 21, 19, 17, 15, 13, 11, 9.",
  "NU-N2-08-03": "Lee la secuencia sin el 9: 2, 4, 8, 16, 32, 64. Cada término duplica al anterior; el 9 es el único que interrumpe esa regla, así que se señala como intruso.",
  "NU-N2-08-13": "Prueba primero la regla más sencilla: sumar 4 en cada paso. Así se obtiene 1, 5, 9, 13, 17, 21, 25. El 15 queda fuera de esa progresión y por eso es el número que sobra.",
  "NU-N2-08-14": "El 8 rompe la secuencia de números impares repetidos dos veces: 3, 3, 5, 5, 7, 7, 9, 9.",
}

const EXPLICACIONES_COMPLEJAS: Record<string, string> = {
  "NU-N2-01-09": "Se alternan dos pasos: duplicar el valor y restar 2. Compruébalo desde el inicio: 3 → 6 → 4 → 8 → 6. Tras 10 → 20 toca restar 2, así que sigue 18.",
  "NU-N2-01-12": "Agrupa de tres en tres: 3, 3, 9; 4, 4, 16; 5, 5, 25. En cada grupo se repite un número y luego aparece su cuadrado. Después de 6, 6 viene 6² = 36.",
  "NU-N2-01-16": "Cada número es el anterior multiplicado por 2 y aumentado en 1: 3 → 7 → 15 → 31 → 63. Por tanto, 63 × 2 + 1 = 127.",
  "NU-N2-01-17": "Cada término duplica al anterior y le resta 1: 2 → 3 → 5 → 9 → 17 → 33. Sigue 33 × 2 − 1 = 65.",
  "NU-N2-01-20": "Separa las posiciones impares: 2, 3, 7; sus aumentos son +1 y +4, y el siguiente es +16. Las posiciones pares 8, 12, 28 confirman ese crecimiento de los saltos. Sigue 7 + 16 = 23.",
  "NU-N2-02-02": "La serie repite bloques de cuatro: 30, 30, 29, 29. Terminó un bloque completo; el siguiente comienza otra vez en 30.",
  "NU-N2-02-14": "Los pasos alternan sumar 2 y dividir entre 2: 34 → 36 → 18 → 20 → 10 → 12 → 6 → 8. Ahora toca dividir 8 entre 2: sigue 4.",
  "NU-N2-02-16": "Se repite la secuencia de operaciones +2, +1, ×2: 5 → 7 → 8 → 16 y 16 → 18 → 19 → 38. Después de 38 → 40 toca sumar 1: sigue 41.",
  "NU-N2-04-14": "Hay un ciclo de tres operaciones: ×3, ×2 y +2. Se ve en 3 → 9 → 18 → 20 y de nuevo 20 → 60 → 120 → 122. El ciclo reinicia con 122 × 3 = 366.",
  "NU-N2-05-01": "Alterna dividir entre 2 y sumar 4: 80 → 40 → 44 → 22 → 26 → 13. El paso siguiente es 13 + 4 = 17.",
  "NU-N2-05-08": "Se repiten tres operaciones: ×2, −1 y +2. Así se pasa de 6 a 12, 11, 13 y luego a 26, 25, 27. Toca duplicar 27: sigue 54.",
  "NU-N2-05-12": "Alterna dividir entre 3 y sumar 1: 15 → 5 → 6 → 2 → 3. Ahora corresponde 3 ÷ 3 = 1.",
  "NU-N2-05-13": "La operación constante es duplicar y restar 1: 3 → 5 → 9 → 17 → 33. El siguiente valor es 33 × 2 − 1 = 65.",
  "NU-N2-05-16": "Un paso resta 2 y el siguiente duplica: 10 → 8 → 16 → 14 → 28 → 26. Después de restar toca duplicar 26: sigue 52.",
  "NU-N2-05-17": "Los saltos se presentan por parejas: +2, +2; +3, +3; +4, +4. La pareja siguiente empieza con +5; por eso 19 + 5 = 24.",
  "NU-N2-06-03": "Comprueba la misma operación en todos los pasos: multiplicar por 2 y sumar 2. Así, 1 → 4 → 10 → 22 → 46; luego 46 × 2 + 2 = 94.",
  "NU-N2-06-14": "Alterna restar 2 y dividir entre 2: 30 → 28 → 14 → 12 → 6. Ahora toca 6 − 2 = 4.",
  "NU-N2-06-16": "Se repiten dos pasos: dividir entre 2 y multiplicar por 3. Compruébalo con 16 → 8 → 24 → 12 → 36. Sigue 36 ÷ 2 = 18.",
  "NU-N2-07-05": "Las restas se agrupan por parejas: −2, −2; −1, −1; −2, −2. La siguiente pareja empieza restando 1: 14 − 1 = 13.",
  "NU-N2-07-12": "El ciclo es ×2, +4, +2: 3 → 6 → 10 → 12 y 12 → 24 → 28. Para cerrar el segundo ciclo suma 2: sigue 30.",
  "NU-N2-10-06": "Cada valor es el doble del anterior menos 1: 4 → 7 → 13 → 25 → 49 → 97. Sigue 97 × 2 − 1 = 193.",
  "NU-N2-10-10": "En todos los pasos se multiplica por 3 y se resta 3: 2 → 3 → 6 → 15 → 42 → 123. Aplicado una vez más: 123 × 3 − 3 = 366.",
  "NU-N2-01-18": "Desde el 2, cada valor aparece tres veces y después se triplica: 2, 2, 2; 6, 6, 6; 18, 18, 18. El bloque siguiente empieza en 18 × 3 = 54.",
  "NU-N2-03-06": "Los términos vienen duplicados: 56, 56; 53, 53; 48, 48; 41, 41. Entre parejas se resta 3, después 5, 7 y 9. Sigue 41 − 9 = 32.",
  "NU-N2-03-10": "Se alternan una multiplicación y una suma con el mismo número creciente: ×2, +2; ×3, +3; ×4, +4; ×5, +5. Tras 136 × 5 = 680 toca sumar 5: 685.",
  "NU-N2-04-03": "Lee ternas: 2, 5, 10; 3, 6, 12; 4, 7, 14. En cada terna se suma 3 y luego se duplica. Después del 4 va 7.",
  "NU-N2-04-04": "Las ternas comparten el primer 3: 3, 6, 12 (×2); 3, 9, 27 (×3); 3, 12, 48 (×4). Después del último 3 va 12.",
  "NU-N2-04-07": "En cada bloque se suma 1, se multiplica por el número obtenido y luego se divide para volver al inicio del bloque: 1, 2, 4; 2, 3, 9; 3, 4, 16. Por eso sigue 4.",
  "NU-N2-05-10": "Mira las diferencias: +4, +6, +12, +14. Alternan sumar 2 a la diferencia y duplicarla: 4, 6, 12, 14, 28. Entonces 43 + 28 = 71.",
  "NU-N2-05-11": "Los saltos alternan signo y su valor absoluto baja de uno en uno: −5, +4, −3, +2, −1. Después de 58 sigue 57.",
  "NU-N2-05-18": "Los saltos van por parejas: +2, +2; −1, −1; +3, +3; −1, −1. Después de 11 toca restar 1 y queda 10.",
  "NU-N2-05-20": "Cada término es el cuadrado del anterior: 2² = 4, 4² = 16, 16² = 256 y 256² = 65 536.",
  "NU-N2-06-06": "Se entrelazan tres columnas: 3, 9, 27 (×3); 15, 17, 19 (+2); y 10, 10, 10 (constante). Sigue el tercer valor de la última terna: 10.",
  "NU-N2-06-08": "Separa posiciones impares y pares. Las impares son 8, 10, 13, 17: sus saltos son +2, +3 y +4, así que sigue 22. Las pares 1, 2, 6, 24 multiplican por 2, 3 y 4.",
  "NU-N2-06-17": "Son ternas con saltos iguales dentro de cada grupo: 1, 2, 3 (+1); 6, 9, 12 (+3); 17, 22, 27 (+5). Sigue 27.",
  "NU-N2-07-13": "Los saltos forman un ciclo que sube y baja: +1, +2, +3, +3, +2, +1, y vuelve a empezar. Después de 23 corresponde +2, por tanto 25.",
  "NU-N2-07-14": "La serie multiplica por 3 hasta 81 y luego divide por 3: 81, 27, 9, 3, 1. Sigue 1.",
  "NU-N2-10-04": "En posiciones impares van 2, 3, 5, 8; cada término suma los dos anteriores. En las pares van 20, 19, 17 y 14, restando 1, 2 y 3. La siguiente posición es par: 14.",
  "NU-N2-10-11": "Los factores crecen uno por uno: 2 × 2 = 4, luego ×3 = 12, ×4 = 48, ×5 = 240, ×6 = 1440. Sigue ×7 = 10 080.",
}

/**
 * Las explicaciones importadas de N2 transcribían el desglose del cuadernillo.
 * Aquí la regla se obtiene de los valores que ve el estudiante, sin leer aquel
 * texto ni la clave. Solo se publica si predice exactamente la opción marcada.
 */
function explicarPatron(ejercicio: EjercicioPsico): string | null {
  const valores = ejercicio.enunciado.match(/-?\d+(?:[.,]\d+)?/g)?.map((v) => Number(v.replace(",", "."))) ?? []
  const respuesta = Number(ejercicio.opciones[ejercicio.respuesta])
  if (valores.length < 4 || !Number.isFinite(respuesta)) return null
  const ultimo = valores.at(-1)!
  const igual = (a: number, b: number) => Math.abs(a - b) < 1e-8
  const formato = (n: number) => Number.isInteger(n) ? n.toLocaleString("es-CO") : String(n)
  const cerrar = (regla: string, prediccion: number) =>
    igual(prediccion, respuesta) ? `${regla} Por eso, después de ${formato(ultimo)} viene ${formato(respuesta)}.` : null
  const saltos = valores.slice(1).map((n, i) => n - valores[i])

  if (saltos.every((d) => igual(d, saltos[0]))) {
    const paso = saltos[0]
    const accion = paso < 0 ? "resta" : "suma"
    return cerrar(`Compara términos consecutivos: el cambio siempre es el mismo, ${accion} ${formato(Math.abs(paso))}.`, ultimo + paso)
  }
  if (valores.every((n) => n !== 0)) {
    const razon = valores[1] / valores[0]
    if (valores.slice(1).every((n, i) => igual(n / valores[i], razon))) {
      return cerrar(`La distancia entre términos cambia, pero la proporción no: cada valor se multiplica por ${formato(razon)}.`, ultimo * razon)
    }
  }
  const segundoSalto = saltos.slice(1).map((d, i) => d - saltos[i])
  if (segundoSalto.length >= 2 && segundoSalto.every((d) => igual(d, segundoSalto[0]))) {
    const proximoSalto = saltos.at(-1)! + segundoSalto[0]
    return cerrar(`Los saltos son ${saltos.map(formato).join(", ")}. Cada salto cambia en ${formato(segundoSalto[0])}; el siguiente será ${formato(proximoSalto)}.`, ultimo + proximoSalto)
  }
  for (const periodo of [2, 3, 4]) {
    if (saltos.length < periodo * 2 || !saltos.every((d, i) => i < periodo || igual(d, saltos[i % periodo]))) continue
    const proximoSalto = saltos[saltos.length % periodo]
    return cerrar(`Los saltos se repiten en un ciclo: ${saltos.slice(0, periodo).map(formato).join(", ")}. Ahora toca ${proximoSalto < 0 ? "restar" : "sumar"} ${formato(Math.abs(proximoSalto))}.`, ultimo + proximoSalto)
  }
  for (const hilos of [2, 3]) {
    const grupos = Array.from({ length: hilos }, (_, i) => valores.filter((_, j) => j % hilos === i))
    if (grupos.some((g) => g.length < 3)) continue
    const reglas = grupos.map((g) => {
      const diferencias = g.slice(1).map((n, i) => n - g[i])
      if (diferencias.every((d) => igual(d, diferencias[0]))) return { texto: `${g.map(formato).join(" → ")} (salto ${formato(diferencias[0])})`, siguiente: g.at(-1)! + diferencias[0] }
      if (g.every((n) => n !== 0)) {
        const razon = g[1] / g[0]
        if (g.slice(1).every((n, i) => igual(n / g[i], razon))) return { texto: `${g.map(formato).join(" → ")} (×${formato(razon)})`, siguiente: g.at(-1)! * razon }
      }
      return null
    })
    if (reglas.some((r) => !r)) continue
    return cerrar(`Separa las posiciones en ${hilos} recorridos: ${reglas.map((r) => r!.texto).join("; ")}. El siguiente término pertenece al recorrido ${valores.length % hilos + 1}.`, reglas[valores.length % hilos]!.siguiente)
  }
  if (valores.length >= 5 && valores.slice(2).every((n, i) => igual(n, valores[i] + valores[i + 1]))) {
    return cerrar(`Cada valor suma los dos anteriores. Los últimos son ${formato(valores.at(-2)!)} y ${formato(ultimo)}.`, valores.at(-2)! + ultimo)
  }
  return null
}

type Pareja = {
  primero: number
  segundo: number
  operacion: "sumar" | "doblar" | "fijo"
  valor: number
  regla: string
}

/** El bloque 9 pide DOS números, no solo el primero. Cotejados con SOLUCIONES 10-11. */
export const PAREJAS_N2_09: Record<string, Pareja> = {
  "NU-N2-09-01": { primero: 71, segundo: 72, operacion: "sumar", valor: 1, regla: "Los saltos vienen por parejas: −4, −4; +3, +3; −2, −2; +1, +1." },
  "NU-N2-09-02": { primero: 40, segundo: 47, operacion: "sumar", valor: 7, regla: "Los saltos se repiten de dos en dos: +3, +3; +4, +4; +5, +5; +6, +6; después +7, +7." },
  "NU-N2-09-03": { primero: 76, segundo: 123, operacion: "sumar", valor: 47, regla: "Cada término es la suma de los dos anteriores: 29 + 47 = 76 y 47 + 76 = 123." },
  "NU-N2-09-04": { primero: 32, segundo: 5, operacion: "fijo", valor: 5, regla: "Se repiten ternas: 3, 4, 5; 6, 8, 5; 12, 16, 5; 24, 32, 5. Los dos primeros se duplican y el tercero permanece en 5." },
  "NU-N2-09-05": { primero: 128, segundo: 20, operacion: "fijo", valor: 20, regla: "Los bloques son 2, 4, 8, 20; 8, 16, 32, 20; 32, 64, 128, 20. Los tres primeros valores de cada bloque se duplican y el cuarto permanece en 20." },
  "NU-N2-09-06": { primero: 49, segundo: 59, operacion: "sumar", valor: 10, regla: "Las diferencias son +2, +3, +4, +5, +6, +7, +8, luego +9 y +10." },
  "NU-N2-09-07": { primero: 12, segundo: 24, operacion: "fijo", valor: 24, regla: "Las posiciones impares son 4, 6, 8, 10, 12 (+2); las pares son 6, 9, 13, 18, 24 (saltos +3, +4, +5, +6)." },
  "NU-N2-09-08": { primero: 37, segundo: 69, operacion: "sumar", valor: 32, regla: "Cada salto duplica el anterior: +1, +2, +4, +8, +16, +32." },
  "NU-N2-09-09": { primero: 126, segundo: 254, operacion: "sumar", valor: 128, regla: "Los saltos son potencias de dos: +4, +8, +16, +32, +64, +128." },
  "NU-N2-09-10": { primero: 32, segundo: 64, operacion: "doblar", valor: 2, regla: "Cada término duplica el anterior: 16 × 2 = 32 y 32 × 2 = 64." },
}

function segundoDe(primero: number, pareja: Pareja): number {
  if (pareja.operacion === "sumar") return primero + pareja.valor
  if (pareja.operacion === "doblar") return primero * pareja.valor
  return pareja.valor
}

function revisar(ejercicio: EjercicioPsico): EjercicioPsico {
  const explicacionIntruso = EXPLICACIONES_INTRUSO[ejercicio.id]
  if (explicacionIntruso) return { ...ejercicio, explicacion: explicacionIntruso }
  const explicacionCompleja = EXPLICACIONES_COMPLEJAS[ejercicio.id]
  if (explicacionCompleja) return { ...ejercicio, explicacion: explicacionCompleja }
  const pareja = PAREJAS_N2_09[ejercicio.id]
  if (!pareja) {
    const explicacion = explicarPatron(ejercicio)
    return explicacion ? { ...ejercicio, explicacion } : ejercicio
  }
  const primeraOriginal = Number(ejercicio.opciones[ejercicio.respuesta])
  if (primeraOriginal !== pareja.primero || segundoDe(pareja.primero, pareja) !== pareja.segundo) {
    throw new Error(`La pareja editorial de ${ejercicio.id} ya no coincide con la clave generada`)
  }
  return {
    ...ejercicio,
    subcategoria: "Dos términos de una serie",
    enunciado: ejercicio.enunciado.replace("Complete la serie:", "Indica los dos números que siguen en la serie:"),
    opciones: ejercicio.opciones.map((opcion) => {
      const primero = Number(opcion)
      return `${primero} y ${segundoDe(primero, pareja)}`
    }),
    explicacion: `Los dos números que siguen son ${pareja.primero} y ${pareja.segundo}. ${pareja.regla}`,
  }
}

export const SERIES_REVISADAS: EjercicioPsico[] = SERIES
  .filter((ejercicio) => !(ejercicio.id in SERIES_DESCARTADAS))
  .map(revisar)
  .map((ejercicio) => ({
    ...ejercicio,
    enunciado: ejercicio.enunciado.replace(/^Complete la serie:/, "¿Qué número sigue en esta serie?"),
  }))
