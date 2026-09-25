// @vitest-environment node
import { spawnSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"

/**
 * Las seis funciones que cada módulo republica enteras, y la regla que hace
 * falta para que eso no se lleve nada por delante.
 *
 * En Postgres no se le añade una rama a una función: se copia la última versión
 * y se le agrega la del módulo nuevo. Eso significa que LA ÚLTIMA MIGRACIÓN QUE
 * LA TOCA DECIDE QUÉ SOBREVIVE, y copiar de la migración del módulo anterior en
 * vez de la más reciente borra lo que entró en medio. Sin error: la función se
 * reemplaza sin quejarse y el módulo perdido deja de contar.
 *
 * Ya pasó dos veces:
 *
 *   - `20260915140000_panel_completo` añadió 'plan' y 'postulaciones' al panel.
 *     `20260916000000_progreso_de_aeropuertos` se escribió desde una copia
 *     anterior y no los llevaba, y `20260926000000_modulo_performance` heredó
 *     la pérdida. Aplicadas en orden, la pantalla de inicio se quedaba sin el
 *     plan de estudio y sin las postulaciones abiertas.
 *
 *   - Antes, `20260914230000_modulo_aerodinamica` dejó el panel devolviendo
 *     tres módulos cuando la app ya tenía cuatro, y hubo dos días de panel
 *     incompleto.
 *
 * Lo peor de este fallo es que no se ve: ningún tipo falla, ningún test de la
 * app se entera y la base no protesta. Por eso la comprobación vive aquí, y no
 * en la confianza de quien escriba la próxima migración.
 *
 * Qué comprueba: para cada función compartida, busca la ÚLTIMA migración que la
 * define y exige que conozca todos los módulos del catálogo. Si alguien agrega
 * un módulo y copia de la migración equivocada, esto falla antes de que el SQL
 * llegue a la base.
 */

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const CARPETA = path.join(RAIZ, "supabase/migrations")

/** Los módulos que la app tiene hoy, según el catálogo que la base valida. */
const MODULOS: string[] = Object.keys(
  JSON.parse(fs.readFileSync(path.join(RAIZ, "contenido/catalogo/modulos.json"), "utf8")) as Record<string, unknown>,
)

/**
 * Las quince claves del panel. Los módulos van aparte porque crecen solos con
 * el catálogo; estas son las que no dependen de ningún módulo y que ya se
 * perdieron una vez.
 */
const CLAVES_FIJAS = [
  "logros",
  "actividad",
  "companeros",
  "quiz_diario",
  "dominio",
  "plan",
  "postulaciones",
  "licencias",
  "preparacion",
]

/**
 * Cómo se reconoce que una función conoce un módulo. Cada una lo nombra a su
 * manera, y buscar el nombre suelto daría falsos positivos con los comentarios.
 */
const COMPARTIDAS: { nombre: string; define: RegExp; conoce: (m: string) => RegExp }[] = [
  {
    nombre: "private.secciones_leidas",
    define: /create or replace function private\.secciones_leidas/,
    conoce: (m) => new RegExp(`user_${m}_progress`),
  },
  {
    nombre: "private.practicas_hechas",
    define: /create or replace function private\.practicas_hechas/,
    conoce: (m) => new RegExp(`user_${m}_progress`),
  },
  {
    nombre: "private.desbloquear_logros",
    define: /create or replace function private\.desbloquear_logros/,
    conoce: (m) => new RegExp(`when '${m}' then array`),
  },
  {
    nombre: "public.check_and_unlock_achievements",
    define: /create or replace function public\.check_and_unlock_achievements/,
    conoce: (m) => new RegExp(`'${m}'`),
  },
  {
    // Sin la rama de un módulo, su evaluación revienta justo al terminar el
    // intento, después de haber respondido las veinticinco preguntas.
    nombre: "public.evaluacion_terminar",
    define: /create or replace function public\.evaluacion_terminar/,
    conoce: (m) => new RegExp(`when '${m}' then`),
  },
  {
    nombre: "public.panel_tarjetas",
    define: /create or replace function public\.panel_tarjetas/,
    conoce: (m) => new RegExp(`'${m}', jsonb_build_object`),
  },
]

const ARCHIVOS = fs
  .readdirSync(CARPETA)
  .filter((f) => f.endsWith(".sql"))
  .sort()

/** La última migración que define esa función, que es la que manda. */
function ultimaQueDefine(define: RegExp): { archivo: string; sql: string } | null {
  for (let i = ARCHIVOS.length - 1; i >= 0; i--) {
    const sql = fs.readFileSync(path.join(CARPETA, ARCHIVOS[i]), "utf8")
    if (define.test(sql)) return { archivo: ARCHIVOS[i], sql }
  }
  return null
}

describe("las funciones que cada módulo republica enteras", () => {
  it.each(COMPARTIDAS)("$nombre conoce todos los módulos del catálogo", ({ nombre, define, conoce }) => {
    const ultima = ultimaQueDefine(define)
    expect(ultima, `ninguna migración define ${nombre}`).not.toBeNull()
    if (!ultima) return

    const faltan = MODULOS.filter((m) => !conoce(m).test(ultima.sql))
    expect(
      faltan,
      `${ultima.archivo} es la última que publica ${nombre} y no conoce: ${faltan.join(", ")}.\n` +
        `Copia la versión más reciente de esa función y agrégale la rama que falta; ` +
        `si copias de la migración del módulo anterior, borras lo que entró en medio.`,
    ).toEqual([])
  })

  it("el panel no pierde las claves que no son de ningún módulo", () => {
    const ultima = ultimaQueDefine(/create or replace function public\.panel_tarjetas/)
    expect(ultima).not.toBeNull()
    if (!ultima) return

    const faltan = CLAVES_FIJAS.filter((k) => !new RegExp(`'${k}',`).test(ultima.sql))
    expect(
      faltan,
      `${ultima.archivo} deja el panel sin: ${faltan.join(", ")}. ` +
        `Desaparecen de la pantalla de inicio sin dar un solo error.`,
    ).toEqual([])
  })

  it("no hay dos migraciones con la misma versión", () => {
    // Dos archivos con el mismo prefijo se aplican en un orden que depende del
    // sistema de ficheros, y con funciones compartidas eso decide qué sobrevive.
    const versiones = ARCHIVOS.map((f) => f.split("_")[0])
    const repetidas = versiones.filter((v, i) => versiones.indexOf(v) !== i)
    expect([...new Set(repetidas)]).toEqual([])
  })

  /**
   * La que de verdad muerde, y la que la comprobación de arriba no puede ver.
   *
   * Una migración nueva con versión ANTERIOR a la última aplicada pasa todas las
   * comprobaciones del repositorio —ahí el orden por nombre la pone en su sitio—
   * y aun así rompe producción: la base ya tiene registradas las posteriores, no
   * las vuelve a correr, y la recién llegada queda como última palabra sobre las
   * seis funciones compartidas.
   *
   * Pasó al preparar Comunicaciones ATC: sus tres migraciones se numeraron
   * 20260925*, entre Aeropuertos y Performance. En el repositorio quedaban en
   * orden; contra la base habrían dejado la evaluación de Performance reventando
   * al terminar el intento.
   *
   * La marca sale de supabase/HISTORIAL_DE_MIGRACIONES.md, que es donde se
   * apunta qué se aplicó y cuándo.
   */
  it("ninguna migración pendiente se cuela por debajo de la última aplicada", () => {
    const historial = fs.readFileSync(path.join(RAIZ, "supabase/HISTORIAL_DE_MIGRACIONES.md"), "utf8")
    const marca = historial.match(/<!--\s*ULTIMA_APLICADA:\s*(\d+)\s*-->/)
    expect(marca, "falta la marca ULTIMA_APLICADA en supabase/HISTORIAL_DE_MIGRACIONES.md").not.toBeNull()
    if (!marca) return

    const ultima = marca[1]

    // Las que ya están aplicadas por debajo de la marca no son un peligro: la
    // base no las vuelve a correr. Pasa siempre que se aplica por el conector,
    // que registra la versión con la fecha real mientras las migraciones de
    // módulo van con fechas adelantadas. El historial las declara una por una.
    const aplicadasBajoLaMarca = new Set(
      (historial.match(/<!--\s*APLICADAS_BAJO_LA_MARCA:\s*([\d\s]*?)\s*-->/)?.[1] ?? "")
        .split(/\s+/)
        .filter(Boolean),
    )

    // Qué es «nueva»: lo que esta rama añade y la base de comparación no tiene.
    // Se le pregunta a git y no al historial, porque el historial no lista una
    // por una las cien migraciones viejas. Si no hay con qué comparar —un
    // checkout sin la rama base—, no se inventa un veredicto.
    const base = ["origin/main", "main"].find((ref) => {
      const r = spawnSync("git", ["rev-parse", "--verify", "--quiet", `${ref}^{commit}`], { cwd: RAIZ })
      return r.status === 0
    })
    if (!base) {
      expect(ARCHIVOS.length).toBeGreaterThan(0)
      return
    }

    const yaEstaban = new Set(
      spawnSync("git", ["ls-tree", "-r", "--name-only", base, "--", "supabase/migrations"], {
        cwd: RAIZ,
        encoding: "utf8",
      })
        .stdout.split("\n")
        .map((l) => path.basename(l.trim()))
        .filter(Boolean),
    )

    // Una versión declarada como aplicada tiene que tener su archivo: si no,
    // la lista se quedó con una entrada vieja y deja de proteger.
    const versionesConArchivo = new Set(ARCHIVOS.map((f) => f.split("_")[0]))
    const declaradasSinArchivo = [...aplicadasBajoLaMarca].filter((v) => !versionesConArchivo.has(v))
    expect(
      declaradasSinArchivo,
      `APLICADAS_BAJO_LA_MARCA nombra versiones que no tienen archivo en ` +
        `supabase/migrations: ${declaradasSinArchivo.join(", ")}. Quita la entrada o ` +
        `agrega el archivo.`,
    ).toEqual([])

    const coladas = ARCHIVOS.filter((f) => !yaEstaban.has(f))
      .map((f) => f.split("_")[0])
      .filter((v) => v < ultima && !aplicadasBajoLaMarca.has(v))

    expect(
      coladas,
      `Estas migraciones son nuevas y llevan una versión anterior a la última ` +
        `aplicada (${ultima}): ${coladas.join(", ")}.\n` +
        `Renómbralas con una versión posterior a ${ultima}. Tal como están, la base las ` +
        `correría después de las que ya tiene y su copia de las funciones compartidas ` +
        `quedaría encima de la buena, sin dar un solo error.`,
    ).toEqual([])
  })
})
