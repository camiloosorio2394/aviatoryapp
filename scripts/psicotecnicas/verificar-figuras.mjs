/**
 * Verificador de las figuras dibujadas.
 *
 * El riesgo de dibujar los ejercicios no es el tiempo: es la transcripción.
 * Una flecha al revés o un trazo en la esquina que no era cambian la respuesta
 * correcta y nadie se entera, porque el ejercicio sigue teniendo buen aspecto.
 * Este script existe para que eso no pase, y hace cuatro cosas:
 *
 *  1. Comprueba que cada figura dibuja tantas alternativas como declara la
 *     ficha en `opciones`.
 *  2. Vuelve a deducir la respuesta desde los atributos de la figura, con
 *     `resolverFigura`, y la compara con la que guarda el banco. Si no
 *     coinciden, se para: **no** se corrige la ficha desde aquí.
 *  3. Falla si algún ejercicio que ya trae figura se quedó sin descripción, o
 *     si perdió el recorte original antes de estar revisado.
 *  4. Escribe un HTML de revisión con el dibujo al lado del recorte, uno
 *     debajo de otro, para aprobarlos de a uno mirándolos.
 *
 * **Cero comprobaciones no es un aprobado.** El verificador de respuestas ya
 * nos dio una vez «0 verificadas, 0 discrepancias», que en pantalla se lee
 * igual que todo bien; buscaba un texto acentuado sin fijar la codificación y
 * terminaba sin encontrar nada. Aquí, si no se comprobó ninguna figura, el
 * script sale con error.
 *
 *   node scripts/psicotecnicas/verificar-figuras.mjs
 *   node scripts/psicotecnicas/verificar-figuras.mjs --abrir
 *
 * El módulo de dibujo y el solucionador son TypeScript y viven en `src/`,
 * porque son los mismos que usa la aplicación: dos copias del dibujo serían
 * dos dibujos distintos en cuanto alguien tocara uno. Se cargan levantando
 * Vite en modo biblioteca, que resuelve los alias `@/` igual que la app.
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createServer } from "vite"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const SALIDA = path.join(RAIZ, "revision-figuras.html")

const rojo = (s) => `\x1b[31m${s}\x1b[0m`
const verde = (s) => `\x1b[32m${s}\x1b[0m`
const ambar = (s) => `\x1b[33m${s}\x1b[0m`
const tenue = (s) => `\x1b[2m${s}\x1b[0m`

const servidor = await createServer({
  root: RAIZ,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent",
})

let banco, dibujo, solucionador, aprobadas
try {
  ;({ BANCO: banco } = await servidor.ssrLoadModule("/src/data/psicotecnicas/index.ts"))
  dibujo = await servidor.ssrLoadModule("/src/lib/psicotecnicasFiguras.ts")
  solucionador = await servidor.ssrLoadModule("/src/lib/psicotecnicasSolucionador.ts")
  ;({ FIGURAS_APROBADAS: aprobadas } = await servidor.ssrLoadModule(
    "/src/data/psicotecnicas/figurasAprobadas.ts"
  ))
} finally {
  // El servidor se cierra pase lo que pase: si no, el proceso queda colgado y
  // en CI eso se lee como un cuelgue y no como un fallo.
  await servidor.close()
}

const conFigura = banco.filter((e) => e.figura)
const problemas = []
const sinComprobar = []
const fichas = []

for (const ejercicio of conFigura) {
  const { id, figura, opciones, respuesta } = ejercicio
  const falla = (motivo) => problemas.push({ id, motivo })

  // 1 · Tantas alternativas dibujadas como declara la ficha.
  if (figura.opciones.length !== opciones.length) {
    falla(
      `la figura dibuja ${figura.opciones.length} alternativas y la ficha declara ${opciones.length}`
    )
  }

  // 2 · La descripción tiene que estar completa: una casilla sin elementos y
  //     sin rejilla no es una casilla vacía a propósito, es una que se olvidó.
  const vacias = figura.celdas.filter(
    (c) => !("incognita" in c) && c.elementos.length === 0 && !c.rejilla
  ).length
  if (vacias > 0) falla(`${vacias} casillas se quedaron sin describir`)

  // 3 · El recorte original tiene que seguir ahí hasta que la figura esté
  //     aprobada: es la única prueba de qué decía la fuente.
  if (!ejercicio.imagen) {
    falla("perdió el recorte original, que es contra lo que se revisa el dibujo")
  } else if (!fs.existsSync(path.join(RAIZ, "public", ejercicio.imagen))) {
    falla(`el recorte ${ejercicio.imagen} no está en public/`)
  }

  // 4 · La respuesta, deducida otra vez desde los atributos.
  //
  // Que el solucionador no sepa deducirla NO es un fallo: el A1 trae clave
  // verificada del cuadernillo, y aquí el solucionador no decide la respuesta,
  // sino que hace de segunda lectura de la transcripción. Si su familia de
  // reglas no cubre este ejercicio, lo que falta es la comprobación
  // automática, no la respuesta —igual que las 65 series numéricas que
  // FUENTES.md declara «sin comprobación automática posible»—. Lo que sí es un
  // fallo es que deduzca una respuesta **distinta**: ahí o está mal
  // transcrita la figura o está mal la clave, y las dos cosas hay que mirarlas.
  const veredicto = solucionador.resolverFigura(figura)
  const firma = aprobadas[id]
  if (veredicto.estado !== "resuelto") {
    // Aquí está la tercera fuente. Si el solucionador no puede deducirla, la
    // figura necesita que alguien la haya mirado **y lo haya firmado**. Sin esa
    // firma no se avisa y se sigue: se para. Avisar y seguir de largo es
    // exactamente como se cuelan los errores que nadie vuelve a mirar.
    if (!firma) {
      falla(
        `el solucionador no la deduce (${veredicto.motivo}) y no está aprobada a ojo. ` +
          `Míralas en el HTML de revisión y, si está bien, fírmala en ` +
          `src/data/psicotecnicas/figurasAprobadas.ts`
      )
    } else {
      sinComprobar.push({ id, motivo: veredicto.motivo, firma })
    }
  } else if (veredicto.opcion !== respuesta) {
    falla(
      `el banco responde ${opciones[respuesta]} y la figura dibujada da ` +
        `${opciones[veredicto.opcion]} (${veredicto.reglas[0].transformacion}). ` +
        `No se toca la respuesta: revisar la transcripción contra el recorte.`
    )
  }

  fichas.push({ ejercicio, veredicto })
}

// ────────────────────────────────────────────────────────────────────────────
// El HTML de revisión

const escapar = (s) => String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c])

const bloques = fichas.map(({ ejercicio, veredicto }) => {
  const { id, figura, opciones, respuesta, imagen } = ejercicio
  const letras = opciones
    .map((letra, i) => {
      const buena = i === respuesta
      return `<figure class="op ${buena ? "buena" : ""}">
        ${dibujo.svgOpcion(figura, i)}
        <figcaption>${escapar(letra)}${buena ? " · respuesta del banco" : ""}</figcaption>
      </figure>`
    })
    .join("")

  const regla =
    veredicto.estado === "resuelto"
      ? `deducida: ${escapar(opciones[veredicto.opcion])} · ${escapar(veredicto.reglas[0].transformacion)}`
      : `<b>${escapar(veredicto.motivo)}</b>`

  return `<section>
    <h2>${escapar(id)} <small>${regla}</small></h2>
    <div class="par">
      <div><h3>El recorte original</h3><img src="public${escapar(imagen)}" alt=""></div>
      <div><h3>Dibujado por nosotros</h3>${dibujo.svgEnunciado(figura)}<div class="ops">${letras}</div></div>
    </div>
  </section>`
})

fs.writeFileSync(
  SALIDA,
  `<!doctype html><meta charset="utf-8"><title>Revisión de figuras</title>
<style>
  :root { --muted-foreground: #667; color-scheme: light dark }
  body { font: 15px/1.5 system-ui, sans-serif; margin: 0; padding: 24px; background: #fff; color: #101828 }
  section { border-top: 2px solid #e3e6ea; padding: 22px 0 30px }
  h2 { font-size: 20px; margin: 0 0 4px } h2 small { font-weight: 400; color: #667; font-size: 14px }
  h3 { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: #667; margin: 0 0 10px }
  .par { display: grid; gap: 28px; grid-template-columns: 1fr 1fr; align-items: start }
  .par img { max-width: 100%; border: 1px solid #e3e6ea }
  .ops { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px }
  .op { margin: 0; border: 1px solid #d7dbe0; border-radius: 10px; padding: 6px; text-align: center }
  .op.buena { border-color: #16a34a; box-shadow: 0 0 0 2px #16a34a33 }
  .op figcaption { font-size: 11px; color: #667; margin-top: 4px }
  p.nota { color: #667; max-width: 70ch }
</style>
<h1>Revisión de figuras dibujadas</h1>
<p class="nota">Cada ejercicio, con el recorte del cuadernillo a la izquierda y el
dibujo nuestro a la derecha. Hay que aprobarlos de a uno: lo que se compara no es
que se parezcan, sino que <b>planteen el mismo ejercicio</b> —los mismos atributos
en las mismas casillas y las mismas alternativas—. Ningún recorte se borra hasta
que su figura esté aprobada.</p>
${bloques.join("\n")}
`,
  "utf-8"
)

// ────────────────────────────────────────────────────────────────────────────
// El parte

console.log()
console.log(`Figuras dibujadas en el banco: ${conFigura.length} de ${banco.length} ejercicios`)

for (const { ejercicio, veredicto } of fichas) {
  const linea =
    veredicto.estado !== "resuelto"
      ? `${ambar("·")} ${ejercicio.id}  ${tenue("sin comprobación automática")}`
      : veredicto.opcion === ejercicio.respuesta
        ? `${verde("✓")} ${ejercicio.id}  ${tenue(veredicto.reglas[0].transformacion)}`
        : `${rojo("✗")} ${ejercicio.id}`
  console.log(`  ${linea}`)
}

if (sinComprobar.length > 0) {
  console.log()
  console.log(ambar(`${sinComprobar.length} sin deducción automática, aprobadas a ojo:`))
  for (const p of sinComprobar) {
    console.log(`  ${ambar("·")} ${p.id}: ${p.motivo}`)
    console.log(tenue(`     firmada por ${p.firma.quien} el ${p.firma.fecha}, contra ${p.firma.contra}`))
    if (p.firma.faltaRefrendo) {
      console.log(
        ambar("     ↳ falta que la refrende una persona: quien dibujó no es fuente independiente de sí mismo")
      )
    }
  }
}

if (problemas.length > 0) {
  console.log()
  console.log(rojo(`${problemas.length} problema(s):`))
  for (const p of problemas) console.log(`  ${rojo("✗")} ${p.id}: ${p.motivo}`)
}

console.log()
console.log(`HTML de revisión: ${path.relative(RAIZ, SALIDA)}`)

// Cero comprobaciones no es un aprobado.
if (conFigura.length === 0) {
  console.log()
  console.log(rojo("No se comprobó ninguna figura."))
  console.log(
    ambar(
      "Eso no es un aprobado: o no hay ejercicios con figura dibujada, o el banco " +
        "no se cargó. Cualquiera de las dos cosas es un fallo mientras el encargo " +
        "esté abierto."
    )
  )
  process.exit(1)
}

if (problemas.length > 0) process.exit(1)

const comprobadas = conFigura.length - sinComprobar.length
console.log(
  verde(
    `${comprobadas} de ${conFigura.length} figuras se dedujeron desde sus atributos ` +
      `y coinciden con la respuesta del banco.`
  )
)
console.log(ambar("Falta lo que no puede comprobar un script: aprobar el HTML figura por figura."))
