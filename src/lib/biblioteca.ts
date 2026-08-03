import { supabase } from "@/integrations/supabase/client"

/**
 * Biblioteca: la bibliografía de cada módulo.
 *
 * Las categorías SON los módulos, no categorías temáticas. Así el piloto
 * reconoce de dónde viene cada documento, y cada módulo puede enlazar su propia
 * bibliografía.
 *
 * Hay dos tipos de ficha, y la diferencia no es cosmética:
 *
 *   - `pdf`         el archivo vive en el bucket privado y se abre en el visor.
 *                   Solo para lo que se puede distribuir.
 *   - `referencia`  SIN archivo. La ficha dice qué es el documento, quién lo
 *                   publica, cada cuánto se reedita y dónde consultarlo.
 *
 * Las publicaciones de OACI y de IATA van como referencia a propósito: son de
 * pago, y que alguna circule por internet no es lo mismo que estar liberada.
 * No subir ninguna al bucket.
 */

export type TipoItem = "pdf" | "referencia"

export interface CategoriaBiblioteca {
  id: number
  slug: string
  name: string
  description: string | null
  icon_name: string | null
  color: string | null
  order_index: number | null
}

export interface ItemBiblioteca {
  id: number
  category_id: number
  slug: string
  title: string
  type: string
  description: string | null
  /** Ruta DENTRO del bucket, no una URL completa: la firmada se genera al abrir. */
  file_url: string | null
  /** El enlace a la fuente oficial. Obligatorio en material normativo. */
  embed_url: string | null
  source: string | null
  authors: string | null
  /** La edición exacta, textual. Nunca "vigente" ni "actualizado". */
  version: string | null
  language: string | null
  tags: string[] | null
  is_premium: boolean | null
  order_index: number | null
  /** La fecha de esa edición, no la de subida. */
  published_at: string | null
  /** Ruta de la portada dentro de `public/biblioteca/portadas`. */
  portada_url: string | null
  /** A qué familia normativa pertenece. Cada documento tiene UNA sola. */
  familia: string | null
  /** Curado a mano por Cami: entra en la fila de Esenciales. */
  destacado: boolean | null
  /** Cuántas páginas tiene. La rellena el visor la primera vez que se abre. */
  paginas: number | null
}

/**
 * Las familias, en el orden en que se apilan los estantes.
 *
 * Por familia y no por materia porque un documento aeronáutico casi nunca trata
 * de una sola materia (el RAC 91 toca meteorología, performance, comunicaciones
 * y espacio aéreo a la vez) pero familia tiene una: así no hay un documento en
 * cuatro filas ni contadores inflados.
 */
export const FAMILIAS: { clave: string; rotulo: string }[] = [
  { clave: "rac", rotulo: "Reglamentos de Colombia · RAC" },
  { clave: "lar", rotulo: "Reglamentos latinoamericanos · LAR" },
  { clave: "oaci", rotulo: "OACI" },
  { clave: "iata", rotulo: "IATA" },
  { clave: "aviatory", rotulo: "Material de Aviatory" },
  { clave: "otro", rotulo: "Otros documentos" },
]

/**
 * El número del reglamento, para ordenar dentro de su fila.
 *
 * El número ES el nombre: un piloto no busca "algo de operaciones", busca el
 * RAC 91. Una fila de RAC se recorre leyendo solo los números, así que tienen
 * que ir en orden y no alfabéticamente ("RAC 175" antes que "RAC 2").
 *
 * Sale del slug (`rac-175`, `lar-175`) y no del título, que empieza igual en
 * todos. Lo que no lleva número va al final.
 */
export function numeroDeDocumento(item: ItemBiblioteca): number {
  const m = /(\d+)/.exec(item.slug)
  return m ? Number(m[1]) : Number.MAX_SAFE_INTEGER
}

/** La línea de meta de la tarjeta: quién lo publica y cuánto mide. */
export function metaDeDocumento(item: ItemBiblioteca): string {
  const partes = [item.source, item.paginas ? `${item.paginas} p.` : null].filter(Boolean)
  return partes.join(" · ")
}

/**
 * El color de cada módulo, para que su categoría en la Biblioteca se vea como el
 * módulo del que sale.
 *
 * La base guarda un nombre de color; el mapa lo traduce al token de la app. El
 * icono va aparte, en `components/biblioteca/IconoCategoria`, porque devolver un
 * componente desde una función y renderizarlo lo recrea en cada pasada.
 */
const COLORES: Record<string, string> = {
  blue: "var(--av-blue-500)",
  cyan: "var(--av-cyan-400)",
  amber: "var(--av-amber-400)",
  green: "var(--av-green-400)",
  violet: "var(--av-violet-400)",
  red: "var(--av-red-400)",
}

export function colorDeCategoria(nombre: string | null): string {
  return (nombre && COLORES[nombre]) || "var(--av-blue-500)"
}

/** Adónde lleva cada categoría dentro de la app, para volver a su módulo. */
export const MODULO_DE_CATEGORIA: Record<string, string> = {
  pca: "/app/pca",
  icao: "/app/icao",
  notam: "/app/aerolinea/notam",
  metar: "/app/aerolinea/meteorologia",
  "mercancias-peligrosas": "/app/aerolinea/mercancias",
}

export interface BibliotecaCargada {
  categorias: CategoriaBiblioteca[]
  items: ItemBiblioteca[]
}

/**
 * Lee la Biblioteca publicada.
 *
 * Devuelve null si la consulta falla, para que la pantalla distinga "todavía no
 * hay documentos" de "no pudimos preguntar" y no muestre un vacío falso.
 */
export async function fetchBiblioteca(): Promise<BibliotecaCargada | null> {
  try {
    const [cats, its] = await Promise.all([
      supabase.from("library_categories").select("*").order("order_index"),
      supabase
        .from("library_items")
        .select("*")
        .eq("is_published", true)
        .order("order_index"),
    ])
    if (cats.error || its.error) return null
    return {
      categorias: (cats.data ?? []) as CategoriaBiblioteca[],
      items: (its.data ?? []) as ItemBiblioteca[],
    }
  } catch {
    return null
  }
}

/** Una ficha concreta por su slug. */
export async function fetchItem(slug: string): Promise<ItemBiblioteca | null> {
  try {
    const { data, error } = await supabase
      .from("library_items")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()
    if (error) return null
    return (data as ItemBiblioteca | null) ?? null
  } catch {
    return null
  }
}

/**
 * Suma una apertura.
 *
 * La RPC la crea la migración 20260802020000: no estaba en la base, aunque el
 * brief la daba por hecha. Si falla, la pantalla sigue funcionando.
 */
export async function contarApertura(id: number): Promise<void> {
  try {
    await supabase.rpc("bump_library_item_views", { p_item_id: id })
  } catch {
    /* que no se cuente una visita no es motivo para romper la pantalla */
  }
}

/**
 * Los documentos que el piloto dejó a medias, del más reciente al más viejo.
 *
 * Sale de `user_library_views`, que ya existe y ya tiene su RLS: no hace falta
 * ningún dato nuevo. Devuelve ids, que la pantalla cruza con los documentos que
 * ya cargó.
 */
export async function fetchSeguirLeyendo(userId: string, limite = 8): Promise<number[]> {
  try {
    const { data, error } = await supabase
      .from("user_library_views")
      .select("item_id, viewed_at")
      .eq("user_id", userId)
      .order("viewed_at", { ascending: false })
      .limit(60)
    if (error || !data) return []
    // Un documento abierto cinco veces es un documento, no cinco.
    const vistos: number[] = []
    for (const fila of data) {
      if (!vistos.includes(fila.item_id)) vistos.push(fila.item_id)
      if (vistos.length >= limite) break
    }
    return vistos
  } catch {
    return []
  }
}

/**
 * Guarda cuántas páginas tiene un documento.
 *
 * Lo llama el visor la primera vez que abre uno con `paginas` en null: pdf.js ya
 * midió el archivo, así que la cifra sale gratis y siempre correcta. La RPC solo
 * escribe sobre null, así que llamarla de más no pisa nada.
 *
 * Si la migración `20260802050000` todavía no está aplicada, esto falla en
 * silencio y el documento simplemente no muestra su número de páginas.
 */
export async function guardarPaginas(id: number, paginas: number): Promise<void> {
  try {
    await supabase.rpc("set_library_item_pages", { p_item_id: id, p_paginas: paginas })
  } catch {
    /* que no se guarde el número de páginas no es motivo para romper el visor */
  }
}

/**
 * La fecha de edición, en formato corto.
 * Devuelve null si no hay: en pantalla eso se resuelve con un guion, no con una
 * fecha inventada.
 */
export function fechaEdicion(iso: string | null): string | null {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString("es-CO", { year: "numeric", month: "long" })
}
