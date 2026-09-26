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
}
