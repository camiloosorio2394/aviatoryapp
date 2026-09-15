import sharp from "sharp"

const input = "public/modulos/mercancias/img-28-asiana-tipos-carga.webp"
const output = "public/modulos/mercancias/img-33-asiana-carga-y-cronologia.webp"
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="864">
  <text x="40" y="64" font-family="Arial, sans-serif" font-size="50" font-weight="700" fill="#fff">CARGA MENCIONADA EN EL INFORME</text>
  <text x="40" y="119" font-family="Arial, sans-serif" font-size="34" fill="#e8c46a">Pintura y fotorresistentes · líquido corrosivo</text>
  <text x="40" y="168" font-family="Arial, sans-serif" font-size="34" fill="#e8c46a">Baterías de ion-litio</text>
  <text x="40" y="833" font-family="Arial, sans-serif" font-size="31" font-weight="700" fill="#fff">03:54 · Aviso de fuego a ATS</text>
  <text x="790" y="833" font-family="Arial, sans-serif" font-size="31" font-weight="700" fill="#e8c46a">04:11 · Caída al mar</text>
</svg>`
await sharp(input)
  .extract({ left: 0, top: 215, width: 1536, height: 702 })
  .resize({ width: 1536, height: 580, fit: "cover" })
  .extend({ top: 200, bottom: 84, left: 0, right: 0, background: "#142c40" })
  .composite([{ input: Buffer.from(overlay) }])
  .webp({ quality: 88 })
  .toFile(output)
