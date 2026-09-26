/**
 * Las convocatorias de piloto de cada aerolínea (tabla `convocatorias`).
 *
 * Las escribe la función de borde revisar-convocatorias cada 6 horas, leyendo
 * los portales de empleo de las aerolíneas (supabase/functions); LATAM se marca
 * a mano. Aquí solo se leen: el piloto las ve en la portada y en Elegibilidad,
 * con el aviso «Convocatoria abierta» y el botón «Ver requisitos».
 */
import { supabase } from "@/integrations/supabase/client"

export type CargoConvocatoria = "primer_oficial" | "cadete" | "piloto" | "capitan"

export interface Convocatoria {
  id: number
  airlineId: number
  cargo: CargoConvocatoria
  /** `pagina`: la página de pilotos de la aerolínea, que está siempre (Wingo, LATAM). */
  tipo: "vacante" | "pagina"
  titulo: string
  pais: string | null
  ciudad: string | null
  url: string
  /** AAAA-MM-DD. */
  publicadaEn: string | null
  cierraEn: string | null
  requisitos: string[]
  idioma: "es" | "en"
  abierta: boolean
  cerradaEn: string | null
  /**
   * Lo que pide, ya leído de los requisitos al guardar (la función de borde, o
   * a mano para LATAM). `null` es «no lo publica».
   */
  horasMinimas: number | null
  horasNacionales: number | null
  horasExtranjeros: number | null
  nivelIcao: number | null
}

const CARGOS = new Set<CargoConvocatoria>(["primer_oficial", "cadete", "piloto", "capitan"])

type Crudo = Record<string, unknown>

const texto = (v: unknown): string | null => (typeof v === "string" && v.trim() ? v : null)
const numero = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null)

/**
 * La forma que llega se valida fila por fila. Una fila rara se descarta y se
 * avisa: una convocatoria mal leída no puede tumbar la tarjeta de aerolíneas.
 */
export function leerConvocatorias(datos: unknown): Convocatoria[] {
  if (!Array.isArray(datos)) throw new Error("convocatorias: no llegó una lista")
  const salida: Convocatoria[] = []
  for (const f of datos as Crudo[]) {
    const url = texto(f.url)
    if (
      typeof f.id !== "number" ||
      typeof f.airline_id !== "number" ||
      !CARGOS.has(f.cargo as CargoConvocatoria) ||
      !texto(f.titulo) ||
      !url?.startsWith("https://") ||
      typeof f.abierta !== "boolean"
    ) {
      console.warn("convocatorias: fila descartada", f.id)
      continue
    }
    salida.push({
      id: f.id,
      airlineId: f.airline_id,
      cargo: f.cargo as CargoConvocatoria,
      tipo: f.tipo === "pagina" ? "pagina" : "vacante",
      titulo: String(f.titulo),
      pais: texto(f.pais),
      ciudad: texto(f.ciudad),
      url,
      publicadaEn: texto(f.publicada_en),
      cierraEn: texto(f.cierra_en),
      requisitos: Array.isArray(f.requisitos) ? f.requisitos.filter((r): r is string => typeof r === "string" && r.trim() !== "") : [],
      idioma: f.idioma === "en" ? "en" : "es",
      abierta: f.abierta,
      cerradaEn: texto(f.cerrada_en),
      horasMinimas: numero(f.horas_minimas),
      horasNacionales: numero(f.horas_nacionales),
      horasExtranjeros: numero(f.horas_extranjeros),
      nivelIcao: numero(f.nivel_icao),
    })
  }
  return salida
}

/** Todas, de la más reciente a la más vieja. Son pocas: unas por aerolínea. */
export async function traerConvocatorias(): Promise<Convocatoria[]> {
  const { data, error } = await supabase
    .from("convocatorias")
    .select(
      "id, airline_id, cargo, tipo, titulo, pais, ciudad, url, publicada_en, cierra_en, requisitos, idioma, abierta, cerrada_en, horas_minimas, horas_nacionales, horas_extranjeros, nivel_icao",
    )
    .order("vista_por_ultima_vez", { ascending: false })
    .limit(300)
  if (error) throw error
  return leerConvocatorias(data)
}
