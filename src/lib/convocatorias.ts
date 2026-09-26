/**
 * Qué se le muestra al piloto de las convocatorias de una aerolínea.
 *
 * - **Abiertas**: las de ingreso (primer oficial, cadete o «pilotos» en
 *   general) que siguen abiertas y cuya fecha de cierre no pasó. Son las que
 *   encienden el aviso «Convocatoria abierta».
 * - **Otras abiertas**: las de capitán. Se muestran en los requisitos, pero no
 *   encienden el aviso: la app es para quien busca su primer puesto.
 * - **Referencia**: si no hay nada abierto, los últimos requisitos que se le
 *   conocen a la aerolínea: su página de pilotos (Wingo, LATAM) o su última
 *   convocatoria cerrada. Sirven para prepararse mientras abre.
 */
import type { Convocatoria } from "@/services/convocatorias"

export interface ResumenDeConvocatorias {
  abiertas: Convocatoria[]
  otrasAbiertas: Convocatoria[]
  referencia: Convocatoria | null
}

const ES_DE_INGRESO = (c: Convocatoria) => c.cargo !== "capitan"

function sigueAbierta(c: Convocatoria, hoy: string): boolean {
  return c.abierta && (c.cierraEn === null || c.cierraEn >= hoy)
}

/** Hoy en Bogotá, AAAA-MM-DD. */
export function hoyEnBogota(ahora = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit" }).format(ahora)
}

export function resumenDeConvocatorias(
  airlineId: number,
  lista: Convocatoria[],
  hoy = hoyEnBogota(),
): ResumenDeConvocatorias {
  const deLaAerolinea = lista.filter((c) => c.airlineId === airlineId)
  const abiertasTodas = deLaAerolinea.filter((c) => sigueAbierta(c, hoy))
  const abiertas = abiertasTodas.filter(ES_DE_INGRESO)
  const otrasAbiertas = abiertasTodas.filter((c) => !ES_DE_INGRESO(c))
  // La lista llega de la más reciente a la más vieja: la primera con
  // requisitos es la referencia. La página de pilotos gana a una vacante
  // cerrada, porque es lo que la aerolínea dice hoy.
  const conRequisitos = deLaAerolinea.filter((c) => ES_DE_INGRESO(c) && !sigueAbierta(c, hoy) && c.requisitos.length > 0)
  const referencia = conRequisitos.find((c) => c.tipo === "pagina") ?? conRequisitos[0] ?? null
  return { abiertas, otrasAbiertas, referencia }
}

/** Las abiertas de todas las aerolíneas, capitán incluido, sin las que ya cerraron por fecha. */
export function convocatoriasAbiertas(lista: Convocatoria[], hoy = hoyEnBogota()): Convocatoria[] {
  return lista.filter((c) => sigueAbierta(c, hoy))
}

export function esDeIngreso(c: Convocatoria): boolean {
  return ES_DE_INGRESO(c)
}

// ─── Lo que pide la convocatoria, en números ────────────────────────────────

/**
 * Las horas y el nivel de inglés que pide una convocatoria. Son la única
 * fuente: la app no pone mínimos propios (Camilo, 26-sep-2026: «las horas
 * mínimas son las que pida la convocatoria»). Se leen de los requisitos una
 * sola vez, al guardar (requisitosClave() en supabase/functions/
 * revisar-convocatorias/lectores.ts), y aquí se toman de sus columnas. Lo que
 * no se publica queda en `null` y la pantalla dice «No lo publica».
 *
 * Copa distingue: 250 h para panameños y 1.000 h para extranjeros. Por eso hay
 * horas generales, de nacionales y de extranjeros.
 */
export interface RequisitosClave {
  horas: number | null
  horasNacionales: number | null
  horasExtranjeros: number | null
  icao: number | null
}

function normalizar(s: string): string {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
}

export function numerosDe(c: Convocatoria): RequisitosClave {
  return { horas: c.horasMinimas, horasNacionales: c.horasNacionales, horasExtranjeros: c.horasExtranjeros, icao: c.nivelIcao }
}

/**
 * Las horas que le aplican al piloto: si la convocatoria distingue, las de su
 * caso según su país; si no sabemos su país, las de extranjero, que son las
 * que más piden.
 */
export function horasQueAplican(r: RequisitosClave, paisDelPiloto: string | null, paisDeLaConvocatoria: string | null): number | null {
  const esNacional = !!paisDelPiloto && !!paisDeLaConvocatoria && normalizar(paisDelPiloto) === normalizar(paisDeLaConvocatoria)
  if (esNacional && r.horasNacionales !== null) return r.horasNacionales
  if (!esNacional && r.horasExtranjeros !== null) return r.horasExtranjeros
  return r.horas ?? r.horasExtranjeros ?? r.horasNacionales
}

/** «250 h para panameños · 1.000 h para extranjeros», o solo «1.000 h». */
export function textoDeHoras(r: RequisitosClave, paisDeLaConvocatoria: string | null): string | null {
  const f = (n: number) => `${n.toLocaleString("es-CO")} h`
  if (r.horasNacionales !== null && r.horasExtranjeros !== null) {
    const gentilicio = paisDeLaConvocatoria ? `de ${paisDeLaConvocatoria}` : "nacionales"
    return `${f(r.horasNacionales)} si eres ${gentilicio} · ${f(r.horasExtranjeros)} si eres extranjero`
  }
  const n = r.horas ?? r.horasExtranjeros ?? r.horasNacionales
  return n === null ? null : f(n)
}

/** Lo que el piloto tiene, para compararlo con lo que pide la convocatoria. */
export interface PerfilParaConvocatoria {
  horas: number | null
  icao: number | null
  pais: string | null
}

export interface Chequeo {
  etiqueta: string
  pide: string
  tienes: string
  /** `null`: el piloto no ha anotado ese dato y no se puede saber. */
  cumple: boolean | null
  /** Lo que le falta, dicho en concreto: «580 h de vuelo». */
  falta: string | null
}

/**
 * Lo que pide la convocatoria frente a lo que tiene el piloto. Solo lo que la
 * aerolínea publicó: si no pide horas, no hay chequeo de horas.
 */
export function chequeosDeConvocatoria(c: Convocatoria, piloto: PerfilParaConvocatoria): Chequeo[] {
  const r = numerosDe(c)
  const chequeos: Chequeo[] = []
  const horas = horasQueAplican(r, piloto.pais, c.pais)
  if (horas !== null) {
    chequeos.push({
      etiqueta: "Horas de vuelo",
      pide: `${horas.toLocaleString("es-CO")} h`,
      tienes: piloto.horas !== null ? `${Math.round(piloto.horas).toLocaleString("es-CO")} h` : "Sin anotar",
      cumple: piloto.horas === null ? null : piloto.horas >= horas,
      falta: piloto.horas !== null && piloto.horas < horas ? `${Math.ceil(horas - piloto.horas).toLocaleString("es-CO")} h de vuelo` : null,
    })
  }
  if (r.icao !== null) {
    chequeos.push({
      etiqueta: "Inglés ICAO",
      pide: `Nivel ${r.icao}`,
      tienes: piloto.icao !== null ? `Nivel ${piloto.icao}` : "Sin medir",
      cumple: piloto.icao === null ? null : piloto.icao >= r.icao,
      falta: piloto.icao !== null && piloto.icao < r.icao ? `subir a nivel ${r.icao} de inglés` : null,
    })
  }
  return chequeos
}

/**
 * Lo que la aerolínea pide hoy para entrar, por aerolínea: su convocatoria de
 * ingreso abierta o, si no hay, los últimos requisitos que se le conocen.
 */
export function requisitosVigentes(airlineId: number, lista: Convocatoria[], hoy = hoyEnBogota()): Convocatoria | null {
  const r = resumenDeConvocatorias(airlineId, lista, hoy)
  return r.abiertas[0] ?? r.referencia
}

// ─── Por país ───────────────────────────────────────────────────────────────

/** Código ISO de cada país, para su bandera (public/banderas/<código>.webp). */
const CODIGO_DE_PAIS: Record<string, string> = {
  argentina: "ar", bolivia: "bo", brasil: "br", chile: "cl", colombia: "co", "costa rica": "cr", ecuador: "ec",
  "el salvador": "sv", "estados unidos": "us", guatemala: "gt", mexico: "mx", panama: "pa", paraguay: "py",
  peru: "pe", "republica dominicana": "do", uruguay: "uy", venezuela: "ve",
}

export function banderaDe(pais: string | null): string | null {
  const codigo = pais ? CODIGO_DE_PAIS[normalizar(pais)] : undefined
  return codigo ? `/banderas/${codigo}.webp` : null
}

export interface GrupoPorPais {
  pais: string
  convocatorias: Convocatoria[]
}

/**
 * Las convocatorias agrupadas por país: primero el del piloto, luego los que
 * tienen más, y en cada país las de ingreso antes que las de capitán.
 */
export function agruparPorPais(convocatorias: Convocatoria[], paisDelPiloto: string | null): GrupoPorPais[] {
  const grupos = new Map<string, Convocatoria[]>()
  for (const c of convocatorias) {
    const pais = c.pais ?? "Sin país publicado"
    grupos.set(pais, [...(grupos.get(pais) ?? []), c])
  }
  const propio = paisDelPiloto ? normalizar(paisDelPiloto) : null
  return [...grupos.entries()]
    .map(([pais, lista]) => ({
      pais,
      convocatorias: [...lista].sort((a, b) => Number(!ES_DE_INGRESO(a)) - Number(!ES_DE_INGRESO(b))),
    }))
    .sort(
      (a, b) =>
        Number(normalizar(b.pais) === propio) - Number(normalizar(a.pais) === propio) ||
        b.convocatorias.length - a.convocatorias.length ||
        a.pais.localeCompare(b.pais, "es"),
    )
}

/** «Abierta · Panamá», o solo «Convocatoria abierta» si no se sabe dónde. */
export function textoDelAviso(resumen: ResumenDeConvocatorias): string {
  if (resumen.abiertas.length === 0) return "Pendiente por abrir"
  const paises = [...new Set(resumen.abiertas.map((c) => c.pais).filter((p): p is string => !!p))]
  return paises.length === 1 ? `Abierta · ${paises[0]}` : "Convocatoria abierta"
}

const NOMBRE_DEL_CARGO: Record<Convocatoria["cargo"], string> = {
  primer_oficial: "Primer oficial",
  cadete: "Cadete",
  piloto: "Pilotos",
  capitan: "Capitán",
}

export function nombreDelCargo(c: Convocatoria): string {
  return NOMBRE_DEL_CARGO[c.cargo]
}

/** «1 ene 2027», para las tarjetas. */
export function fechaCorta(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number)
  return new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(y, m - 1, d)))
    .replace(/\./g, "")
    .replace(/ de /g, " ")
}

/** «1 de enero de 2027». */
export function fechaLarga(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number)
  return new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  )
}

/**
 * La página de empleo de cada aerolínea, por código: a donde lleva «Ver su
 * página de empleo» cuando no hay convocatoria ni requisitos conocidos.
 */
export const PAGINA_DE_EMPLEO: Partial<Record<string, string>> = {
  AVA: "https://jobs.avianca.com/go/Pilotos/2845201/",
  LAN: "https://www.latamairlines.com/co/es/trabaja-con-nosotros/reclutamiento-y-seleccion/pilotos",
  CMP: "https://ejom.fa.us6.oraclecloud.com/hcmUI/CandidateExperience/es/sites/CX_1",
  GCO: "https://www.wingo.com/acerca-de-nosotros/trabaja-con-nosotros",
  JES: "https://recruitment.jetsmart.net/go/Pilotos/4649019/",
  NSE: "https://apps.satena.com.co/bolsa-empleo/",
  EFY: "https://clicair.co/trabaja-con-nosotros",
  SKU: "https://app.genoma.work/jobs/sky-airline",
  BOV: "https://www.boa.gob.bo/oportunidad-de-empleo/",
  ARG: "https://www.aerolineas.com.ar/somos-ar",
  DWI: "https://www.careers-page.com/arajetjobs",
  VOI: "https://jobs.volaris.com/content/Requisitos-para-Copiloto/?locale=es_MX",
  VIV: "https://jobs.vivaaerobus.com/departments/pilotos",
  AMX: "https://aspatrabajo.org.mx/convocatorias",
}
