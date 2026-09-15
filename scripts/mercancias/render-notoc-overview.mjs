/**
 * Renders a deliberately fictional training NOTOC onto a generated blank
 * flight-operations photograph. Regulatory identifiers and the description
 * UN 1263 / PAINT / Class 3 / PG II match the ICAO example; flight and
 * loading identifiers are explicitly fictitious. Not an operator form.
 */
import sharp from "sharp"

const base = "public/modulos/mercancias/notoc-blank-base.webp"
const output = "public/modulos/mercancias/img-22-notoc-panorama.webp"

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <style>
    text { font-family: Arial, sans-serif; fill: #14293a; }
    .small { font-size: 21px; }
    .body { font-size: 29px; }
    .headline { font-size: 33px; font-weight: 700; }
    .section { font-size: 36px; font-weight: 700; fill: #19506c; }
    .key { font-size: 24px; font-weight: 700; fill: #4b6574; }
    .value { font-size: 35px; font-weight: 700; }
    .line { stroke: #9db1bd; stroke-width: 2; }
    .banner { fill: #fff; }
    .study { fill: #efd17a; }
  </style>
  <rect x="121" y="59" width="956" height="680" fill="#fff" opacity=".93"/>
  <rect x="132" y="75" width="933" height="47" rx="7" fill="#102c40"/>
  <text x="150" y="108" class="banner" font-size="33" font-weight="700">NOTIFICATION TO PILOT-IN-COMMAND</text>
  <text x="909" y="105" class="small study">ESTUDIO</text>
  <text x="145" y="166" class="section">01 · DATOS DEL VUELO</text>
  <path d="M145 177 H1040" class="line"/>
  <text x="145" y="215" class="body">AV 0001  ·  15 SEP 2026  ·  SKBO → SKRG</text>
  <text x="145" y="259" class="section">02 · MERCANCÍAS PELIGROSAS</text>
  <path d="M145 272 H1040" class="line"/>
  <rect x="145" y="290" width="895" height="104" rx="8" fill="#f1f5f6"/>
  <text x="159" y="325" class="key">NÚMERO</text>
  <text x="339" y="325" class="key">DENOMINACIÓN</text>
  <text x="630" y="325" class="key">CLASE</text>
  <text x="757" y="325" class="key">GRUPO</text>
  <text x="159" y="365" class="value">UN 1263</text>
  <text x="339" y="365" class="value">PAINT</text>
  <text x="630" y="365" class="value">3</text>
  <text x="757" y="365" class="value">II</text>
  <text x="145" y="439" class="section">03 · BULTOS, CANTIDAD Y UBICACIÓN</text>
  <path d="M145 451 H1040" class="line"/>
  <text x="145" y="492" class="body">2 BULTOS × 1 L POR BULTO</text>
  <text x="145" y="533" class="body">POSICIÓN A1  ·  ULD AKE 12345</text>
  <text x="145" y="583" class="section">04 · RECEPCIÓN POR EL PILOTO</text>
  <path d="M145 595 H1040" class="line"/>
  <text x="145" y="638" class="body">FIRMA / CONFIRMACIÓN: __________________</text>
  <text x="145" y="699" class="small">FORMATO DE ESTUDIO · VUELO, POSICIÓN Y ULD FICTICIOS</text>
</svg>`

await sharp(base).composite([{ input: Buffer.from(svg) }]).webp({ quality: 90 }).toFile(output)
console.log(output)
