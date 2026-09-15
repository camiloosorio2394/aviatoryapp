import sharp from "sharp"

const dir = "public/modulos/mercancias"

const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")

const banner = ({ title, subtitle = "" }) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
  <style>text { font-family: Arial, sans-serif; fill: #fff; } .title { font-size: 34px; font-weight: 700; } .subtitle { font-size: 23px; }</style>
  <rect x="0" y="0" width="1600" height="118" fill="#0b2a40" opacity=".92"/>
  <rect x="44" y="30" width="9" height="58" rx="4" fill="#f0c53d"/>
  <text x="82" y="66" class="title">${escapeXml(title)}</text>
  ${subtitle ? `<text x="82" y="98" class="subtitle">${escapeXml(subtitle)}</text>` : ""}
</svg>`)

const footer = ({ title, subtitle = "" }) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
  <style>text { font-family: Arial, sans-serif; fill: #fff; } .title { font-size: 31px; font-weight: 700; } .subtitle { font-size: 21px; }</style>
  <rect x="0" y="762" width="1600" height="138" fill="#0b2a40" opacity=".94"/>
  <rect x="44" y="796" width="9" height="70" rx="4" fill="#f0c53d"/>
  <text x="82" y="824" class="title">${escapeXml(title)}</text>
  ${subtitle ? `<text x="82" y="860" class="subtitle">${escapeXml(subtitle)}</text>` : ""}
</svg>`)

async function photo(input, output, overlays = []) {
  await sharp(`${dir}/${input}`)
    .resize(1600, 900, { fit: "cover", position: "centre" })
    .composite(overlays)
    .webp({ quality: 90 })
    .toFile(`${dir}/${output}`)
}

// Estas fotografías ya traen flechas y rótulos legibles; no se les superpone
// otra banda para conservar la escena y evitar texto duplicado.
await photo("img-21-carga-ubicacion.webp", "foto-09-cadena-del-bulto.webp")
await photo("img-18-incompatibles.webp", "foto-09-segregacion-real.webp")
await photo("img-15-notoc.webp", "foto-10-anatomia-notoc.webp")
await photo("img-23-bulto-uld-posicion.webp", "foto-10-ubicacion-uld.webp")
await photo("img-22-notoc-panorama.webp", "foto-10-anormal.webp", [
  { input: footer({ title: "SITUACIÓN ANORMAL", subtitle: "Procedimiento de la aeronave → NOTOC para identificar la carga → ATS cuando la situación lo permita." }) },
])
await photo("img-25-hallazgo-documentado.webp", "foto-12-clasificacion.webp")
await photo("img-01-generador-oxigeno.webp", "foto-11-emergencia.webp", [
  { input: footer({ title: "EMERGENCIA EN CARGA", subtitle: "Primero se controla el avión y se sigue el procedimiento; el NOTOC aporta identidad y posición." }) },
])

// Dos fotografías lado a lado para explicar por qué el grupo de embalaje no
// es universal: una muestra PG I/III y la otra UN 3480 sin grupo.
const groupLeft = await sharp(`${dir}/img-14-grupos-embalaje.webp`).resize(760, 680, { fit: "contain", background: "#0b2a40" }).toBuffer()
const groupRight = await sharp(`${dir}/img-15-un3480-sin-grupo.webp`).resize(760, 680, { fit: "contain", background: "#0b2a40" }).toBuffer()
await sharp({ create: { width: 1600, height: 900, channels: 3, background: "#0b2a40" } })
  .composite([
    { input: groupLeft, left: 20, top: 128 },
    { input: groupRight, left: 820, top: 128 },
    { input: banner({ title: "MISMA CLASE NO SIGNIFICA MISMO GRUPO", subtitle: "El grupo solo aparece cuando la entrada de la mercancía lo asigna." }) },
    { input: footer({ title: "DOS FOTOGRAFÍAS, DOS LECTURAS", subtitle: "Clase 8 con PG I/III · UN 3480 clase 9 sin grupo de embalaje asignado." }) },
  ])
  .webp({ quality: 90 })
  .toFile(`${dir}/foto-10-grupo-embalaje.webp`)

// Collage fotográfico para los casos: mantiene el tratamiento editorial de
// las lecciones y evita una tarjeta vectorial que parezca una diapositiva.
const cases = [
  ["img-01-generador-oxigeno.webp", "ValuJet 592 · preparación"],
  ["img-03-ups-six.webp", "UPS 6 · propagación"],
  ["img-24-pales-carga-recreacion.webp", "Asiana 991 · paletas"],
  ["img-06-bodega-clase-3.webp", "South African 295 · investigación"],
]
const tiles = await Promise.all(cases.map(async ([input, label]) => ({
  input: await sharp(`${dir}/${input}`).resize(800, 450, { fit: "cover" }).composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect x="0" y="380" width="800" height="70" fill="#0b2a40" opacity=".94"/><text x="28" y="423" font-family="Arial" font-size="27" font-weight="700" fill="#fff">${escapeXml(label)}</text></svg>`) }]).png().toBuffer(),
})))
await sharp({ create: { width: 1600, height: 900, channels: 3, background: "#0b2a40" } })
  .composite([
    { input: tiles[0].input, left: 0, top: 0 },
    { input: tiles[1].input, left: 800, top: 0 },
    { input: tiles[2].input, left: 0, top: 450 },
    { input: tiles[3].input, left: 800, top: 450 },
  ])
  .webp({ quality: 90 })
  .toFile(`${dir}/foto-13-casos-industria.webp`)

console.log("Photo figures generated")
