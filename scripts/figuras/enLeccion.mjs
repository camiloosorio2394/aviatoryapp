/**
 * Cómo entra una figura dibujada en la lección, para los conversores de
 * módulo (PBN, RVSM…).
 *
 * El conversor numera los huecos por orden de aparición. Si la figura de ese
 * código existe (en scripts/<modulo>/figuras y con su SVG en public/), el hueco
 * se cambia por la figura; si no, sigue saliendo el hueco rotulado. En las
 * anotadas, debajo de la figura va la lista de lo que señala cada número, con
 * el texto de ANOTACIONES del documento tal cual, en el mismo orden.
 */
import fs from "node:fs"
import path from "node:path"

/**
 * La figura de un código, si está dibujada. Si está en el índice pero falta
 * el SVG, o el SVG no mide lo que la figura declara, lo apunta en `fallos`.
 */
export function figuraDibujada({ porCodigo, codigo, dirPublico, modulo, fallos }) {
  const figura = porCodigo.get(codigo)
  if (!figura) return null
  const archivo = path.join(dirPublico, `${codigo}.svg`)
  if (!fs.existsSync(archivo)) {
    fallos.push(`${codigo}: está en scripts/${modulo}/figuras pero falta el SVG; corre node scripts/figuras/dibujar.mjs ${modulo}`)
    return null
  }
  const cabecera = fs.readFileSync(archivo, "utf8").slice(0, 300)
  const medida = /width="(\d+)" height="(\d+)"/.exec(cabecera)
  if (!medida || Number(medida[1]) !== 1600 || Number(medida[2]) !== figura.alto) {
    fallos.push(`${codigo}: el SVG no mide 1600 × ${figura.alto}; vuelve a dibujarlo`)
  }
  return figura
}

/**
 * Los bloques que sustituyen al hueco: la figura y, si es anotada, la lista.
 * `anotaciones` es el texto de ANOTACIONES en una línea («→ FLECHA 1: al
 * recuadro PBN. EXPLICACIÓN: aquí está…»).
 */
export function bloquesDeFigura({ figura, codigo, src, anotaciones, fallos }) {
  const bloques = [
    {
      kind: "figura",
      src,
      alt: figura.alt,
      ancho: 1600,
      alto: figura.alto,
      ...(figura.pie ? { pie: figura.pie } : {}),
    },
  ]
  if (anotaciones) {
    const items = anotaciones
      .split(/→ FLECHA \d+:/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => s.replace(/^.*?EXPLICACIÓN:\s*/, "").trim())
      .map((s) => s.charAt(0).toLocaleUpperCase("es") + s.slice(1))
    if (items.length !== figura.anotaciones) {
      fallos.push(`${codigo}: el documento trae ${items.length} anotaciones y la figura numera ${figura.anotaciones}`)
    }
    bloques.push({ kind: "list", ordered: true, items })
  } else if (figura.anotaciones) {
    fallos.push(`${codigo}: la figura está numerada pero el hueco no es anotado`)
  }
  return bloques
}
