/**
 * El foro de la comunidad contra la base. Todo va por funciones: el cliente no
 * toca las tablas (migración 20261003010000).
 *
 * Las lecturas funcionan con o sin sesión: sin ella, la base devuelve la
 * primera página y tres comentarios por publicación. Mientras la migración no
 * se aplique, las lecturas responden `sin_foro` y la app muestra lo de antes;
 * no es un error que haya que reportar.
 */

import { supabase } from "@/integrations/supabase/client"
import { reportarError } from "@/lib/errores"
import {
  MENSAJES_FORO,
  mensajeForo,
  type AerolineaForo,
  type ClaveCategoria,
  type ComentarioForo,
  type DetalleForo,
  type FeedForo,
  type OrdenForo,
  type TendenciasForo,
} from "@/lib/foro"

export type Lectura<T> = { estado: "listo"; datos: T } | { estado: "sin_foro" } | { estado: "error" }
export type Escritura<T> = { ok: true; datos: T } | { ok: false; mensaje: string }

type ErrorDeBase = { code?: string; message?: string } | null

/** La función no existe: la migración todavía no se aplicó. */
function faltaLaMigracion(error: ErrorDeBase): boolean {
  if (!error) return false
  return (
    error.code === "PGRST202" ||
    error.code === "42883" ||
    /could not find the function|does not exist/i.test(error.message ?? "")
  )
}

async function leer<T>(contexto: string, funcion: string, args: Record<string, unknown>, esValido: (d: unknown) => boolean): Promise<Lectura<T>> {
  const { data, error } = await supabase.rpc(funcion, args)
  if (error) {
    if (faltaLaMigracion(error)) {
      console.warn(`foro: la base todavía no tiene ${funcion} (migración 20261003010000)`)
      return { estado: "sin_foro" }
    }
    reportarError(contexto, error)
    return { estado: "error" }
  }
  if (!esValido(data)) {
    reportarError(contexto, new Error(`${funcion} devolvió otra forma`), data)
    return { estado: "error" }
  }
  return { estado: "listo", datos: data as T }
}

async function escribir<T>(contexto: string, funcion: string, args: Record<string, unknown>): Promise<Escritura<T>> {
  const { data, error } = await supabase.rpc(funcion, args)
  if (!error) return { ok: true, datos: data as T }
  const codigo = error.message ?? ""
  // Lo que la base explica (título corto, tope del día...) no es un fallo.
  if (!(codigo in MENSAJES_FORO)) reportarError(contexto, error)
  return { ok: false, mensaje: mensajeForo(codigo) }
}

const esObjeto = (d: unknown): d is Record<string, unknown> => typeof d === "object" && d !== null && !Array.isArray(d)

export function traerFeed({
  categoria = null,
  orden = "tendencia",
  aerolinea = null,
  pagina = 0,
}: {
  categoria?: ClaveCategoria | null
  orden?: OrdenForo
  aerolinea?: number | null
  pagina?: number
} = {}): Promise<Lectura<FeedForo>> {
  return leer<FeedForo>(
    "foro: feed",
    "foro_feed",
    { p_categoria: categoria, p_orden: orden, p_aerolinea: aerolinea, p_pagina: pagina },
    (d) => esObjeto(d) && Array.isArray(d.publicaciones),
  )
}

/** `null` en `datos` si no existe o ya no está. */
export function traerPublicacion(id: number): Promise<Lectura<DetalleForo | null>> {
  return leer<DetalleForo | null>(
    "foro: publicación",
    "foro_publicacion",
    { p_id: id },
    (d) => d === null || (esObjeto(d) && esObjeto(d.publicacion) && Array.isArray(d.comentarios)),
  )
}

export function traerTendencias(): Promise<Lectura<TendenciasForo>> {
  return leer<TendenciasForo>(
    "foro: tendencias",
    "foro_tendencias",
    {},
    (d) => esObjeto(d) && Array.isArray(d.categorias) && Array.isArray(d.avisos) && Array.isArray(d.aerolineas),
  )
}

/** Las aerolíneas para elegir al publicar. Pide sesión, como el compositor. */
export async function traerAerolineasDelForo(): Promise<AerolineaForo[]> {
  const { data, error } = await supabase.from("airlines").select("id, name, code, brand_color").order("order_index")
  if (error) {
    reportarError("foro: aerolíneas", error)
    return []
  }
  return (data ?? []).map((a: { id: number; name: string; code: string | null; brand_color: string | null }) => ({
    id: a.id,
    nombre: a.name,
    codigo: a.code,
    color: a.brand_color,
  }))
}

export interface PublicacionNueva {
  categoria: ClaveCategoria
  titulo: string
  cuerpo: string
  aerolinea: number | null
  ciudad: string | null
  anonima: boolean
}

/** Devuelve el id de la publicación. */
export function publicar(p: PublicacionNueva): Promise<Escritura<number>> {
  return escribir<number>("foro: publicar", "foro_publicar", {
    p_categoria: p.categoria,
    p_titulo: p.titulo,
    p_cuerpo: p.cuerpo,
    p_aerolinea: p.aerolinea,
    p_ciudad: p.ciudad,
    p_anonima: p.anonima,
  })
}

export function editarPublicacion(id: number, cuerpo: string): Promise<Escritura<null>> {
  return escribir<null>("foro: editar", "foro_editar", { p_id: id, p_cuerpo: cuerpo })
}

export function borrarPublicacion(id: number): Promise<Escritura<null>> {
  return escribir<null>("foro: borrar", "foro_borrar", { p_id: id })
}

export function votar(id: number, valor: -1 | 0 | 1): Promise<Escritura<{ puntos: number; mi_voto: -1 | 0 | 1 }>> {
  return escribir("foro: votar", "foro_votar", { p_publicacion: id, p_valor: valor })
}

export function confirmarAviso(
  id: number,
  sigue: boolean | null,
): Promise<Escritura<{ confirmaciones: number; desmentidos: number; vigente: boolean; mi_confirmacion: boolean | null }>> {
  return escribir("foro: confirmar aviso", "foro_confirmar", { p_publicacion: id, p_sigue: sigue })
}

export function comentar(
  publicacion: number,
  cuerpo: string,
  { padre = null, anonimo = false }: { padre?: number | null; anonimo?: boolean } = {},
): Promise<Escritura<ComentarioForo>> {
  return escribir<ComentarioForo>("foro: comentar", "foro_comentar", {
    p_publicacion: publicacion,
    p_cuerpo: cuerpo,
    p_padre: padre,
    p_anonimo: anonimo,
  })
}

export function votarComentario(id: number, valor: -1 | 0 | 1): Promise<Escritura<{ puntos: number; mi_voto: -1 | 0 | 1 }>> {
  return escribir("foro: votar comentario", "foro_votar_comentario", { p_comentario: id, p_valor: valor })
}

export function borrarComentario(id: number): Promise<Escritura<null>> {
  return escribir<null>("foro: borrar comentario", "foro_borrar_comentario", { p_id: id })
}

export type MotivoReporte = "spam" | "ofensivo" | "falso" | "datos_personales" | "otro"

export const MOTIVOS_REPORTE: { clave: MotivoReporte; nombre: string }[] = [
  { clave: "spam", nombre: "Spam o publicidad" },
  { clave: "falso", nombre: "Información falsa" },
  { clave: "ofensivo", nombre: "Ofensivo o acoso" },
  { clave: "datos_personales", nombre: "Datos personales de alguien" },
  { clave: "otro", nombre: "Otra cosa" },
]

/** Devuelve si el reporte contó (el mismo piloto no cuenta dos veces). */
export function reportar(
  objetivo: { publicacion: number } | { comentario: number },
  motivo: MotivoReporte,
  detalle?: string,
): Promise<Escritura<boolean>> {
  return escribir<boolean>("foro: reportar", "foro_reportar", {
    p_publicacion: "publicacion" in objetivo ? objetivo.publicacion : null,
    p_comentario: "comentario" in objetivo ? objetivo.comentario : null,
    p_motivo: motivo,
    p_detalle: detalle ?? null,
  })
}
