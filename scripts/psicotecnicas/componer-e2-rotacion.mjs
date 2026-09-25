/**
 * Adaptación didáctica de E2 pregunta 11. La fuente llamaba «giro de 90°» a
 * mover la pareja de perros sin girar cada silueta. Aquí la opción B se obtiene
 * rotando matemáticamente TODA la imagen 90° en sentido horario.
 */
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const origen = path.join(raiz, "scripts/psicotecnicas/redibujos/EJ-E2-14-perro-base.png")
const silueta = path.join(raiz, "scripts/psicotecnicas/redibujos/EJ-E2-14-perro-silueta.png")
const destino = path.join(raiz, "public/psicotecnicas/espacial/ES-E2-ejemplo-14-didactico.webp")

const { width, height } = await sharp(origen).metadata()
const mascara = await sharp(origen).extractChannel(3).threshold(95).toBuffer()
await sharp({ create: { width, height, channels: 3, background: "#636b6b" } })
  .joinChannel(mascara).trim({ threshold: 8 }).png().toFile(silueta)

const perro = await sharp(silueta).resize({ width: 390, height: 225, fit: "inside" }).png().toBuffer()
const { width: pw, height: ph } = await sharp(perro).metadata()
const grupoVertical = await sharp({ create: { width: 500, height: 530, channels: 4, background: "#ffffff00" } })
  .composite([
    { input: perro, left: Math.round((500 - pw) / 2), top: 15 },
    { input: perro, left: Math.round((500 - pw) / 2), top: 285 },
  ]).png().toBuffer()
const grupoHorizontal = await sharp({ create: { width: 900, height: 270, channels: 4, background: "#ffffff00" } })
  .composite([{ input: perro, left: 35, top: 20 }, { input: perro, left: 475, top: 20 }]).png().toBuffer()
const perroReflejado = await sharp(perro).flop().png().toBuffer()
const grupoReflejado = await sharp({ create: { width: 900, height: 270, channels: 4, background: "#ffffff00" } })
  .composite([{ input: perroReflejado, left: 35, top: 20 }, { input: perroReflejado, left: 475, top: 20 }]).png().toBuffer()

const opciones = [
  await sharp(grupoVertical).rotate(270).png().toBuffer(),
  await sharp(grupoVertical).rotate(90).png().toBuffer(),
  grupoReflejado,
  grupoHorizontal,
]
const ancho = 1200
const altoFigura = 680
const altoOpcion = 460
const alto = altoFigura + 4 * altoOpcion + 35
const marco = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}">
  <rect width="${ancho}" height="${alto}" fill="#fff"/>
  <text x="40" y="62" fill="#506775" font-family="Arial,sans-serif" font-size="38" font-weight="bold">FIGURA DE REFERENCIA</text>
  <rect x="30" y="85" width="1140" height="570" rx="20" fill="#fafbfc" stroke="#dbe1e7" stroke-width="2"/>
  ${opciones.map((_, i) => { const y = altoFigura + i * altoOpcion; const correcta = i === 1; return `
    <rect x="30" y="${y}" width="1140" height="430" rx="20" fill="${correcta ? "#eaf8f0" : "#fafbfc"}" stroke="${correcta ? "#62b995" : "#dbe1e7"}" stroke-width="${correcta ? 4 : 2}"/>
    <text x="68" y="${y + 66}" fill="#233b3b" font-family="Arial,sans-serif" font-size="42" font-weight="bold">${"ABCD"[i]}${correcta ? " · RESPUESTA" : ""}</text>` }).join("")}
</svg>`)
const capas = [{ input: marco, left: 0, top: 0 }, { input: grupoVertical, left: 350, top: 100 }]
for (const [i, figura] of opciones.entries()) {
  const { width: w, height: h } = await sharp(figura).metadata()
  const ajustada = await sharp(figura).resize({ width: 990, height: 315, fit: "inside" }).png().toBuffer()
  const { width: aw, height: ah } = await sharp(ajustada).metadata()
  if (!w || !h) throw new Error("Opción vacía")
  capas.push({ input: ajustada, left: Math.round((ancho - aw) / 2), top: altoFigura + i * altoOpcion + 90 + Math.round((315 - ah) / 2) })
}
await sharp({ create: { width: ancho, height: alto, channels: 3, background: "#fff" } })
  .composite(capas).webp({ quality: 90, effort: 6 }).toFile(destino)
console.log("Adaptación verificada: EJ-E2-14 (giro horario real)")
