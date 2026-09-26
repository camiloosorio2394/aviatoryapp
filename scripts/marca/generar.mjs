// Los archivos de la marca, desde la geometría de src/components/marca/trazos.ts:
//
//   src/assets/logos/aviatory-isotype-app-icon.svg  el ícono de la app (A blanca sobre navy)
//   src/assets/logos/aviatory-isotype-mono.svg      el isotipo solo, en navy
//   public/favicon-*.png, apple-touch-icon.png, android-chrome-*.png
//
// Uso: node scripts/marca/generar.mjs
//
// Los favicon llevan el cuadrado redondeado. Los de instalación (Apple y
// Android) van a sangre y con la letra dentro de la zona segura: el sistema les
// pone su propia máscara, y una esquina redondeada debajo de otra deja picos
// blancos.
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"
import { LIENZO, MARCA, isotipoSvg } from "../../src/components/marca/trazos.ts"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")

/** El isotipo dentro de un cuadrado navy, con `margen` de aire alrededor. */
function icono({ margen, radio }) {
  const escala = (LIENZO - 2 * margen) / LIENZO
  // Un poco más arriba que el centro: el avión pesa arriba a la derecha y la
  // letra, abajo; así el conjunto se ve centrado.
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LIENZO} ${LIENZO}" width="${LIENZO}" height="${LIENZO}">` +
    `<rect width="${LIENZO}" height="${LIENZO}" rx="${radio}" fill="${MARCA.navy}"/>` +
    `<g transform="translate(${margen} ${margen - 2}) scale(${escala.toFixed(4)})">${isotipoSvg("#FFFFFF", "av-app")}</g>` +
    `</svg>\n`
  )
}

const mono =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LIENZO} ${LIENZO}" width="${LIENZO}" height="${LIENZO}">` +
  `${isotipoSvg(MARCA.navy, "av-mono")}</svg>\n`

const redondeado = icono({ margen: 20, radio: 26 })
const aSangre = icono({ margen: 24, radio: 0 })

fs.writeFileSync(path.join(RAIZ, "src/assets/logos/aviatory-isotype-app-icon.svg"), redondeado)
fs.writeFileSync(path.join(RAIZ, "src/assets/logos/aviatory-isotype-mono.svg"), mono)

const PNG = [
  { archivo: "favicon-16x16.png", lado: 16, svg: redondeado },
  { archivo: "favicon-32x32.png", lado: 32, svg: redondeado },
  { archivo: "favicon-48x48.png", lado: 48, svg: redondeado },
  { archivo: "apple-touch-icon.png", lado: 180, svg: aSangre },
  { archivo: "android-chrome-192x192.png", lado: 192, svg: aSangre },
  { archivo: "android-chrome-512x512.png", lado: 512, svg: aSangre },
]
for (const { archivo, lado, svg } of PNG) {
  await sharp(Buffer.from(svg), { density: 384 })
    .resize(lado, lado, { fit: "contain" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(RAIZ, "public", archivo))
  console.log(`${archivo} (${lado} px)`)
}
