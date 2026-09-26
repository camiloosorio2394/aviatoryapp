// Los íconos de la portada del panel, de la serie «premium» que hizo Camilo
// (aviatory_dashboard_icons_premium_512: seis PNG de 512 × 512, cada uno un objeto
// fotográfico sobre una placa gris clara con las esquinas redondeadas).
//
// Uso: node scripts/marca/iconos-panel.mjs <carpeta de los PNG> [lado=160]
//
// Cada placa trae su propio radio de esquina y, en dos de ellos, una franja blanca
// abajo. Se recorta un margen parejo y se enmascara con un solo radio, para que las
// seis se lean como un juego. Al de «Progreso general» se le borra el «8 %» impreso
// dentro del anillo: el número real lo pone la tarjeta, y un 8 % fijo al lado de un
// 38 % de verdad sería mentirle al piloto.
//
// Escribe src/assets/iconos/panel/<nombre>.webp y src/components/marca/iconosPanel.ts.
import fs from "node:fs"
import path from "node:path"

const sharp = (await import("sharp")).default

const SRC = process.argv[2]
const LADO = Number(process.argv[3] ?? 160)
if (!SRC) {
  console.error("Uso: node scripts/marca/iconos-panel.mjs <carpeta de los PNG> [lado]")
  process.exit(1)
}
const OUT = "src/assets/iconos/panel"
fs.mkdirSync(OUT, { recursive: true })

/** Archivo de Camilo → nombre en la app, en el orden de la portada. */
const ICONOS = [
  ["horas_totales_hobbs.png", "horas"],
  ["ingles_icao_headset.png", "ingles-icao"],
  ["documentacion_licencia_medico.png", "documentacion"],
  ["progreso_general.png", "progreso"],
  ["continua_preparacion_manual_checklist.png", "cursos"],
  ["perfil_frente_aerolineas.png", "aerolineas"],
]

/** Lo que se come de cada borde (en px de 512): el canto de la placa y la franja blanca. */
const MARGEN = 12
/** Radio de la máscara, como fracción del lado. Mayor que la esquina más abierta de la serie. */
const RADIO = 0.22

/** El anillo de «Progreso general»: centro y radio interior, medidos sobre el PNG. */
const ANILLO = { cx: 254, cy: 269, r: 140, color: "#eff3f6" }

const lado = 512 - 2 * MARGEN
const r = Math.round(lado * RADIO)
const mascara = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${lado}" height="${lado}"><rect width="${lado}" height="${lado}" rx="${r}" ry="${r}" fill="#fff"/></svg>`,
)

for (const [archivo, nombre] of ICONOS) {
  let img = sharp(path.join(SRC, archivo)).removeAlpha()
  if (nombre === "progreso") {
    // Un disco del gris de la placa, con el borde apenas difuminado, tapa el número.
    const disco = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><defs><filter id="b"><feGaussianBlur stdDeviation="1.2"/></filter></defs><circle cx="${ANILLO.cx}" cy="${ANILLO.cy}" r="${ANILLO.r}" fill="${ANILLO.color}" filter="url(#b)"/></svg>`,
    )
    img = sharp(await img.composite([{ input: disco }]).png().toBuffer())
  }
  const recorte = await img.extract({ left: MARGEN, top: MARGEN, width: lado, height: lado }).png().toBuffer()
  // sharp aplica el composite después del resize: la máscara va en su propia pasada.
  const enmascarado = await sharp(recorte)
    .ensureAlpha()
    .composite([{ input: mascara, blend: "dest-in" }])
    .png()
    .toBuffer()
  await sharp(enmascarado)
    .resize(LADO, LADO, { kernel: "lanczos3" })
    .webp({ quality: 88, alphaQuality: 95, effort: 6 })
    .toFile(path.join(OUT, `${nombre}.webp`))
  console.log(`${nombre}.webp`, (fs.statSync(path.join(OUT, `${nombre}.webp`)).size / 1024).toFixed(1), "KB")
}

const camel = (n) => n.replace(/-(\w)/g, (_, c) => c.toUpperCase())
const ts = `/**
 * Los íconos de la portada del panel: la serie «premium» de Camilo (26-sep-2026),
 * generada con \`node scripts/marca/iconos-panel.mjs <carpeta>\`. No se edita a mano.
 * Los pinta \`IconoPanel\` en src/components/marca/Icono.tsx.
 */
${ICONOS.map(([, n]) => `import ${camel(n)} from "@/assets/iconos/panel/${n}.webp"`).join("\n")}

export const ICONOS_PANEL = {
${ICONOS.map(([, n]) => `  "${n}": ${camel(n)},`).join("\n")}
} as const

export type NombreIconoPanel = keyof typeof ICONOS_PANEL
`
fs.writeFileSync("src/components/marca/iconosPanel.ts", ts.replace(/\n/g, "\r\n"))
