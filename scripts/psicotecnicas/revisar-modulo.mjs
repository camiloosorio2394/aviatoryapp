/**
 * Genera una página con el módulo entero, para revisarlo con los ojos.
 *
 * Los seis verificadores comprueban que la respuesta sea la correcta y que el
 * archivo exista. Ninguno puede mirar si la imagen se ve bien, y los tres
 * últimos fallos —la fila de letras cortada, el damero de fondo, el dado sin su
 * cara de arriba— salieron precisamente por ahí: los encontró una persona
 * mirando la pantalla, de uno en uno, por casualidad.
 *
 * Esto es esa misma revisión pero de golpe y en orden: los 238 ejercicios, cada
 * uno con lo que se ve, lo que responde y de dónde salió. La idea es recorrerla
 * y apuntar identificadores, que es lo único que hace falta para arreglarlos.
 *
 *   node scripts/psicotecnicas/revisar-modulo.mjs
 *
 * Escribe `revision-modulo.html` en la raíz. Va al `.gitignore` como el otro:
 * se regenera en diez segundos y versionarlo solo ensucia los diff.
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createServer } from "vite"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const SALIDA = path.join(RAIZ, "revision-modulo.html")

const servidor = await createServer({
  root: RAIZ,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent",
})

let BANCO, dibujo, solucionador, aprobadas
try {
  ;({ BANCO } = await servidor.ssrLoadModule("/src/data/psicotecnicas/index.ts"))
  dibujo = await servidor.ssrLoadModule("/src/lib/psicotecnicasFiguras.ts")
  solucionador = await servidor.ssrLoadModule("/src/lib/psicotecnicasSolucionador.ts")
  ;({ FIGURAS_APROBADAS: aprobadas } = await servidor.ssrLoadModule(
    "/src/data/psicotecnicas/figurasAprobadas.ts"
  ))
} finally {
  await servidor.close()
}

const escapar = (s) =>
  String(s ?? "").replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c])

/** En qué estado está cada ejercicio, y por qué. */
function estadoDe(e) {
  if (e.figura) {
    const v = solucionador.resolverFigura(e.figura)
    if (v.estado === "resuelto" && v.opcion === e.respuesta) {
      return { clase: "dibujada", texto: "Dibujada · deducida por el solucionador" }
    }
    const firma = aprobadas[e.id]
    if (firma) {
      return {
        clase: "firmada",
        texto: `Dibujada · aprobada a ojo${firma.faltaRefrendo ? ", falta refrendo" : ""}`,
      }
    }
    return { clase: "roja", texto: "Dibujada · sin comprobar" }
  }
  if (e.imagen) {
    const limpia = e.imagen.includes("-limpio")
    return {
      clase: limpia ? "recorte" : "roja",
      texto: limpia ? "Recorte del cuadernillo · limpiado" : "Recorte del cuadernillo · sin limpiar",
    }
  }
  return { clase: "texto", texto: "Sin imagen · solo texto" }
}

function tarjeta(e, n) {
  const estado = estadoDe(e)
  const respuesta = e.opciones[e.respuesta]

  let visual = ""
  if (e.figura) {
    visual =
      `<div class="figura">${dibujo.svgEnunciado(e.figura)}</div>` +
      `<div class="ops">` +
      e.opciones
        .map(
          (op, i) =>
            `<figure class="op ${i === e.respuesta ? "buena" : ""}">${dibujo.svgOpcion(e.figura, i)}` +
            `<figcaption>${escapar(op)}</figcaption></figure>`
        )
        .join("") +
      `</div>`
  } else if (e.imagen) {
    visual = `<div class="lamina"><img loading="lazy" src="public${escapar(e.imagen)}" alt=""></div>`
  } else {
    visual =
      `<div class="soloTexto"><p class="enun">${escapar(e.enunciado)}</p><ol class="alts">` +
      e.opciones
        .map((op, i) => `<li class="${i === e.respuesta ? "buena" : ""}">${escapar(op)}</li>`)
        .join("") +
      `</ol></div>`
  }

  return `<article class="card" data-estado="${estado.clase}" data-id="${escapar(e.id)}">
    <header>
      <span class="num">${n}</span>
      <code class="id">${escapar(e.id)}</code>
      <span class="pill ${estado.clase}">${escapar(estado.texto)}</span>
      <span class="resp">Responde <b>${escapar(respuesta)}</b></span>
      <button class="copiar" data-copia="${escapar(e.id)}">copiar id</button>
    </header>
    ${visual}
    <footer>${escapar(e.subcategoria)} · ${escapar(e.fuente)}</footer>
  </article>`
}

const familias = [
  ["abstracto", "Razonamiento abstracto"],
  ["espacial", "Razonamiento espacial"],
  ["numerico", "Razonamiento numérico"],
]

const secciones = familias
  .map(([clave, titulo]) => {
    const suyos = BANCO.filter((e) => e.categoria === clave)
    return `<section><h2>${titulo} <small>${suyos.length}</small></h2>
      ${suyos.map((e, i) => tarjeta(e, i + 1)).join("\n")}</section>`
  })
  .join("\n")

const conImagen = BANCO.filter((e) => e.imagen && !e.figura).length
const dibujadas = BANCO.filter((e) => e.figura).length

fs.writeFileSync(
  SALIDA,
  `<!doctype html><meta charset="utf-8"><title>Revisión del módulo de psicotécnicas</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  :root { color-scheme: light }
  * { box-sizing: border-box }
  body { font: 15px/1.55 system-ui, -apple-system, sans-serif; margin: 0; background: #f6f7f9; color: #101828 }
  .barra { position: sticky; top: 0; z-index: 5; background: #fff; border-bottom: 1px solid #e3e6ea;
           padding: 14px 20px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center }
  .barra h1 { font-size: 17px; margin: 0 12px 0 0 }
  .filtro { border: 1px solid #d7dbe0; background: #fff; border-radius: 999px; padding: 5px 12px;
            font-size: 13px; cursor: pointer }
  .filtro[aria-pressed="true"] { background: #101828; color: #fff; border-color: #101828 }
  .envoltorio { padding: 20px; max-width: 1100px; margin: 0 auto }
  section > h2 { font-size: 20px; margin: 28px 0 12px; padding-top: 8px }
  section > h2 small { color: #667; font-weight: 400; font-size: 14px }
  .card { background: #fff; border: 1px solid #e3e6ea; border-radius: 14px; padding: 14px 16px; margin-bottom: 14px }
  .card header { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 10px }
  .num { color: #98a2b3; font-size: 12px; min-width: 22px }
  .id { font: 600 13px ui-monospace, SFMono-Regular, Menlo, monospace; background: #f2f4f7;
        padding: 2px 7px; border-radius: 6px }
  .pill { font-size: 12px; padding: 2px 9px; border-radius: 999px; border: 1px solid }
  .pill.dibujada { color: #146c43; background: #e8f6ee; border-color: #b7e4c7 }
  .pill.firmada  { color: #8a5a00; background: #fdf3e0; border-color: #f3dfb8 }
  .pill.recorte  { color: #344054; background: #f2f4f7; border-color: #d7dbe0 }
  .pill.roja     { color: #b42318; background: #fee4e2; border-color: #fda29b }
  .pill.texto    { color: #344054; background: #f2f4f7; border-color: #d7dbe0 }
  .resp { font-size: 13px; color: #475467 }
  .copiar { margin-left: auto; border: 1px solid #d7dbe0; background: #fff; border-radius: 8px;
            padding: 3px 9px; font-size: 12px; cursor: pointer; color: #475467 }
  .copiar:hover { background: #f2f4f7 }
  .lamina img { max-width: 100%; border: 1px solid #e3e6ea; border-radius: 8px; display: block }
  .figura { padding: 6px 0 }
  .ops { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px }
  .op { margin: 0; border: 1px solid #d7dbe0; border-radius: 10px; padding: 6px; text-align: center }
  .op.buena { border-color: #16a34a; box-shadow: 0 0 0 2px #16a34a33 }
  .op figcaption { font-size: 11px; color: #667; margin-top: 3px }
  .soloTexto .enun { margin: 0 0 6px; font-weight: 500 }
  .alts { margin: 0; padding-left: 20px; color: #475467; font-size: 14px }
  .alts .buena { color: #146c43; font-weight: 600 }
  footer { margin-top: 10px; font-size: 12px; color: #98a2b3 }
  .nota { background: #fff; border: 1px solid #e3e6ea; border-radius: 14px; padding: 16px 18px; margin-bottom: 8px }
  .nota p { margin: 0 0 8px }
  .oculto { display: none }
</style>

<div class="barra">
  <h1>Módulo de psicotécnicas · ${BANCO.length} ejercicios</h1>
  <button class="filtro" aria-pressed="true" data-filtro="todos">Todos</button>
  <button class="filtro" aria-pressed="false" data-filtro="recorte">Con recorte (${conImagen})</button>
  <button class="filtro" aria-pressed="false" data-filtro="dibujada">Dibujadas (${dibujadas})</button>
  <button class="filtro" aria-pressed="false" data-filtro="firmada">Aprobadas a ojo</button>
</div>

<div class="envoltorio">
  <div class="nota">
    <p><b>Qué buscar.</b> Que la imagen se vea entera y sin marcas de otro, que las letras
    de las alternativas no estén cortadas, que el enunciado pida lo mismo que responden
    las opciones, y que la respuesta marcada en verde sea la que tú darías.</p>
    <p><b>Cómo decírmelo.</b> Con el identificador basta: «ES-E2-08 la figura se ve chica»
    es suficiente para llegar al archivo, a la ficha y a la página del cuadernillo. Hay un
    botón «copiar id» en cada tarjeta.</p>
    <p><b>Lo que ya sé que está mal:</b> los ocho ejemplos del E2 tienen el dibujo mordido
    en origen, y las catorce del E1 llevan la marca de agua de DaVinci encima de las
    opciones. Eso solo lo arregla dibujarlas.</p>
  </div>
  ${secciones}
</div>

<script>
  document.querySelectorAll(".copiar").forEach((b) => {
    b.addEventListener("click", () => {
      navigator.clipboard?.writeText(b.dataset.copia)
      const antes = b.textContent
      b.textContent = "copiado"
      setTimeout(() => (b.textContent = antes), 1200)
    })
  })
  const botones = [...document.querySelectorAll(".filtro")]
  botones.forEach((b) => {
    b.addEventListener("click", () => {
      botones.forEach((o) => o.setAttribute("aria-pressed", String(o === b)))
      const f = b.dataset.filtro
      document.querySelectorAll(".card").forEach((c) => {
        c.classList.toggle("oculto", f !== "todos" && c.dataset.estado !== f)
      })
    })
  })
</script>
`,
  "utf-8"
)

console.log(`Escrito: ${path.relative(RAIZ, SALIDA)}`)
console.log(`  ${BANCO.length} ejercicios · ${dibujadas} dibujados · ${conImagen} con recorte`)
