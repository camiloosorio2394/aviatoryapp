import sharp from "sharp"

const overlay = (number, line1, line2, subtitle, copy1, copy2) => Buffer.from(`
<svg width="1440" height="810" xmlns="http://www.w3.org/2000/svg">
  <rect width="660" height="810" fill="#08233f"/>
  <rect x="55" y="58" width="90" height="10" fill="#e8b936"/>
  <text x="55" y="110" font-family="Arial" font-size="28" fill="#fff">MÓDULO</text>
  <text x="175" y="110" font-family="Arial" font-size="32" font-weight="700" fill="#e8b936">${number}</text>
  <text x="55" y="230" font-family="Arial" font-size="66" font-weight="700" fill="#fff">${line1}</text>
  <text x="55" y="305" font-family="Arial" font-size="66" font-weight="700" fill="#e8b936">${line2}</text>
  <rect x="55" y="355" width="260" height="8" fill="#e8b936"/>
  <text x="55" y="410" font-family="Arial" font-size="27" font-weight="700" fill="#fff">${subtitle}</text>
  <text x="55" y="500" font-family="Arial" font-size="24" fill="#fff">${copy1}</text>
  <text x="55" y="540" font-family="Arial" font-size="24" fill="#fff">${copy2}</text>
  <text x="55" y="720" font-family="Arial" font-size="34" font-weight="700" fill="#fff">AVIATORY</text>
  <text x="55" y="750" font-family="Arial" font-size="14" letter-spacing="3" fill="#fff">PILOTS FOR A SAFER TOMORROW</text>
</svg>`)

await sharp("public/modulos/mercancias/leccion-11.webp")
  .resize(1440, 810, { fit: "fill" })
  .composite([{ input: overlay("13", "Lo que la industria", "aprendió", "CASOS Y BARRERAS DE SEGURIDAD", "Hechos, incertidumbres y", "medidas preventivas.") }])
  .webp({ quality: 84 })
  .toFile("public/modulos/mercancias/leccion-13.webp")

await sharp("public/modulos/mercancias/leccion-11.webp")
  .resize(1440, 810, { fit: "fill" })
  .composite([{ input: overlay("14", "Lo que te exigen", "y cómo responder", "INSTRUCCIÓN Y REPASO", "Responde con criterio,", "fuentes y límites claros.") }])
  .webp({ quality: 84 })
  .toFile("public/modulos/mercancias/leccion-14.webp")
