// @vitest-environment node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
import { AERO_LECCIONES } from "@/lib/aerodinamicaLeccion"
import { AP_LECCIONES } from "@/lib/aeropuertosLeccion"
import { MP_LECCIONES } from "@/lib/mercanciasLeccion"
import { METAR_LESSON } from "@/lib/metarLesson"
import { LESSON_SCREENS } from "@/lib/notamLesson"
import { PB_LECCIONES } from "@/lib/pbnLeccion"

/**
 * Cada foto de una lección declara la medida de su archivo, y tiene que ser la
 * de verdad: el lector reserva el hueco con `aspect-ratio: ancho / alto` antes
 * de que la imagen llegue. Si la cifra no coincide, el texto salta al cargar o
 * queda una franja bajo la foto; así llegaron dos `alto: 901` sobre archivos de
 * 900 en Aeropuertos. Y si el archivo no existe, la lección sale con un hueco
 * roto.
 *
 * Se lee solo la cabecera del WebP, que trae el tamaño: son ciento y pico
 * archivos y no hace falta decodificar ninguno. Las figuras dibujadas (las de
 * PBN) son SVG, y su medida es la de la etiqueta raíz.
 */

const PUBLICO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public")

interface Foto {
  modulo: string
  src: string
  ancho: number
  alto: number
}

/** Ancho y alto de un WebP, en cualquiera de sus tres formatos. */
function medirWebp(buf: Buffer): { ancho: number; alto: number } | null {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") return null
  const tipo = buf.toString("ascii", 12, 16)
  if (tipo === "VP8X") {
    return { ancho: (buf.readUIntLE(24, 3) & 0xffffff) + 1, alto: (buf.readUIntLE(27, 3) & 0xffffff) + 1 }
  }
  if (tipo === "VP8 ") return { ancho: buf.readUInt16LE(26) & 0x3fff, alto: buf.readUInt16LE(28) & 0x3fff }
  if (tipo === "VP8L") {
    const b = buf.readUInt32LE(21)
    return { ancho: (b & 0x3fff) + 1, alto: ((b >> 14) & 0x3fff) + 1 }
  }
  return null
}

/** Ancho y alto de un SVG, de los atributos de su etiqueta raíz. */
function medirSvg(buf: Buffer): { ancho: number; alto: number } | null {
  const raiz = /<svg\b[^>]*>/.exec(buf.toString("utf8", 0, 600))?.[0] ?? ""
  const ancho = /\swidth="(\d+)"/.exec(raiz)
  const alto = /\sheight="(\d+)"/.exec(raiz)
  return ancho && alto ? { ancho: Number(ancho[1]), alto: Number(alto[1]) } : null
}

const MODULOS: [string, { blocks: unknown[] }[]][] = [
  ["NOTAM", LESSON_SCREENS],
  ["Meteorología", METAR_LESSON],
  ["Mercancías", MP_LECCIONES],
  ["Aeropuertos", AP_LECCIONES],
  ["Aerodinámica", AERO_LECCIONES],
  ["PBN", PB_LECCIONES],
]

const fotos: Foto[] = []
for (const [modulo, lecciones] of MODULOS) {
  for (const leccion of lecciones) {
    for (const bloque of leccion.blocks as {
      kind: string
      src?: string
      ancho?: number
      alto?: number
      imagen?: { src: string; ancho: number; alto: number }
    }[]) {
      if (bloque.kind === "figura" && bloque.src) {
        fotos.push({ modulo, src: bloque.src, ancho: bloque.ancho!, alto: bloque.alto! })
      }
      // La ficha de «reconoce» lleva la foto dentro, con su propia medida.
      if (bloque.kind === "reconoce" && bloque.imagen) {
        fotos.push({ modulo, ...bloque.imagen })
      }
    }
  }
}

describe("las fotos de las lecciones declaran su medida real", () => {
  it("hay fotos que revisar en los cinco módulos", () => {
    expect(new Set(fotos.map((f) => f.modulo)).size).toBe(MODULOS.length)
  })

  it.each(fotos.map((f) => [`${f.modulo} · ${f.src.split("/").pop()}`, f] as const))("%s", (_nombre, foto) => {
    const ruta = path.join(PUBLICO, foto.src)
    expect(fs.existsSync(ruta), `falta el archivo ${foto.src}`).toBe(true)
    const buf = fs.readFileSync(ruta)
    const medida = foto.src.endsWith(".svg") ? medirSvg(buf) : medirWebp(buf)
    expect(medida, `${foto.src} no se puede medir`).not.toBeNull()
    expect([medida!.ancho, medida!.alto], `${foto.src} declara otra medida`).toEqual([foto.ancho, foto.alto])
  })
})
