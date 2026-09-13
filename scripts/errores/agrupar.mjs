/**
 * Agrupa lo que hay en `errores_cliente` para poder leerlo.
 *
 * La tabla sola no sirve de mucho: un fallo que le pasa a cien pilotos son cien
 * filas casi iguales, y el que le pasa a uno solo queda enterrado entre ellas.
 * Lo que importa es cuántos pilotos distintos lo sufren y desde cuándo.
 *
 * El agrupado va por contexto más mensaje **normalizado**: los ids, las fechas
 * y las URLs cambian en cada fila y, sin quitarlos, el mismo fallo saldría como
 * cincuenta errores distintos.
 *
 * Aquí no se toca la red. Lo que consulta la base es resumen.mjs.
 */

/** Un mensaje sin las partes que cambian entre dos ocurrencias del mismo fallo. */
export function normalizarMensaje(mensaje) {
  return String(mensaje ?? "")
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, "<id>")
    .replace(/https?:\/\/\S+/gi, "<url>")
    .replace(/\d{4}-\d{2}-\d{2}T[\d:.]+Z?/g, "<fecha>")
    .replace(/\b\d+\b/g, "<n>")
    .replace(/\s+/g, " ")
    .trim()
}

/** La primera línea, que es la que identifica el fallo; el resto es la traza. */
export function primeraLinea(texto, tope = 160) {
  const linea = String(texto ?? "").split("\n")[0].trim()
  return linea.length > tope ? linea.slice(0, tope - 1) + "…" : linea
}

/**
 * Convierte las filas en grupos ordenados de más a menos frecuente.
 *
 * De cada grupo interesa: cuántas veces pasó, **a cuántos pilotos distintos**
 * (que es lo que separa un fallo general de la mala suerte de uno), desde
 * cuándo, y en qué rutas y versiones.
 */
export function agruparErrores(filas) {
  const grupos = new Map()

  for (const fila of filas ?? []) {
    const contexto = String(fila.contexto ?? "sin contexto")
    const clave = contexto + " | " + normalizarMensaje(primeraLinea(fila.mensaje, 400))
    let grupo = grupos.get(clave)
    if (!grupo) {
      grupo = {
        contexto,
        mensaje: primeraLinea(fila.mensaje),
        veces: 0,
        pilotos: new Set(),
        rutas: new Map(),
        versiones: new Set(),
        primero: null,
        ultimo: null,
        ejemplo: fila,
      }
      grupos.set(clave, grupo)
    }

    grupo.veces += 1
    if (fila.user_id) grupo.pilotos.add(fila.user_id)
    if (fila.ruta) grupo.rutas.set(fila.ruta, (grupo.rutas.get(fila.ruta) ?? 0) + 1)
    if (fila.version_app) grupo.versiones.add(fila.version_app)

    const cuando = fila.creado_en ?? null
    if (cuando) {
      if (!grupo.primero || cuando < grupo.primero) grupo.primero = cuando
      if (!grupo.ultimo || cuando > grupo.ultimo) grupo.ultimo = cuando
    }
  }

  return [...grupos.values()]
    .map((g) => ({
      contexto: g.contexto,
      mensaje: g.mensaje,
      veces: g.veces,
      pilotos: g.pilotos.size,
      rutas: [...g.rutas.entries()].sort((a, b) => b[1] - a[1]).map(([ruta]) => ruta),
      versiones: [...g.versiones].sort(),
      primero: g.primero,
      ultimo: g.ultimo,
      ejemplo: g.ejemplo,
    }))
    // Primero por pilotos afectados: veinte veces a un piloto es un caso raro,
    // dos veces a diez pilotos es un problema de la app.
    .sort((a, b) => b.pilotos - a.pilotos || b.veces - a.veces)
}

/** Un resumen de una línea por grupo, para imprimir en la terminal. */
export function formatearResumen(grupos, { ancho = 100 } = {}) {
  if (grupos.length === 0) return "Sin errores en la ventana pedida."

  const total = grupos.reduce((s, g) => s + g.veces, 0)
  const lineas = [`${grupos.length} fallos distintos · ${total} reportes en total`, ""]

  for (const g of grupos) {
    const quienes = g.pilotos === 1 ? "1 piloto" : `${g.pilotos} pilotos`
    lineas.push(`${String(g.veces).padStart(4)}x  ${quienes.padEnd(11)}  ${g.contexto}`)
    lineas.push(`       ${primeraLinea(g.mensaje, ancho - 7)}`)
    const detalle = []
    if (g.rutas.length) detalle.push(g.rutas.slice(0, 3).join(", ") + (g.rutas.length > 3 ? "…" : ""))
    if (g.versiones.length) detalle.push("v" + g.versiones.join(", v"))
    if (g.ultimo) detalle.push("último " + g.ultimo.replace("T", " ").slice(0, 16))
    if (detalle.length) lineas.push(`       ${detalle.join("  ·  ")}`)
    lineas.push("")
  }
  return lineas.join("\n").trimEnd()
}
