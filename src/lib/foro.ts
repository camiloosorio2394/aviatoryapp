/**
 * El foro de la comunidad: categorías, formas de los datos y rutas.
 *
 * Es un foro al estilo de Reddit enfocado en entrar a una aerolínea: la
 * conversación útil (procesos, entrevistas, cursos, vida en línea) y los
 * avisos rápidos «como en Waze», que los demás confirman o desmienten.
 *
 * Todo lo publicado se lee sin cuenta en /comunidad, para que Google lo
 * encuentre; sin sesión se ve la primera página y tres comentarios por
 * publicación. Dentro de la app vive en /app/comunidad. La base está en la
 * migración 20261003010000 y el servicio en src/services/foro.ts.
 *
 * Sin íconos ni React a propósito: el middleware de Vercel lo importa (por
 * lib/foroSeo.ts) y corre en el borde. Los glifos están en lib/foroGlifos.ts.
 */
export type ClaveCategoria = "convocatorias" | "entrevistas" | "avisos" | "cursos" | "preguntas" | "vida-en-linea"

export interface CategoriaForo {
  clave: ClaveCategoria
  nombre: string
  /** Una línea, para el menú y el compositor. */
  descripcion: string
  /** Lo que se le pide al piloto en el título, según lo que va a contar. */
  guiaTitulo: string
  /** Y en el texto. */
  guiaCuerpo: string
}

/**
 * Las mismas seis de la migración, en el mismo orden. Una prueba compara las
 * claves con el SQL: si se agrega una, va en los dos lados.
 */
export const CATEGORIAS_FORO: CategoriaForo[] = [
  {
    clave: "convocatorias",
    nombre: "Convocatorias",
    descripcion: "Quién está contratando, con qué requisitos y hasta cuándo. Comparte el enlace oficial.",
    guiaTitulo: "Ej.: Wingo abrió convocatoria para copilotos",
    guiaCuerpo: "Requisitos, fechas, cómo aplicar y el enlace oficial de la aerolínea.",
  },
  {
    clave: "entrevistas",
    nombre: "Entrevistas y procesos",
    descripcion: "Cómo te fue: etapas, preguntas, simulador y psicotécnicas.",
    guiaTitulo: "Ej.: Así fue mi proceso en Avianca, del CV al simulador",
    guiaCuerpo: "Las etapas, qué te preguntaron, cuánto duró y qué te sirvió para prepararte.",
  },
  {
    clave: "avisos",
    nombre: "Avisos rápidos",
    descripcion: "Lo que está pasando ahora, como en Waze. Los demás confirman si sigue vigente.",
    guiaTitulo: "Ej.: LATAM está llamando a entrevistas esta semana en Bogotá",
    guiaCuerpo: "Lo esencial en una o dos líneas: qué pasa, dónde y hasta cuándo.",
  },
  {
    clave: "cursos",
    nombre: "Cursos y habilitaciones",
    descripcion: "Type rating, inglés ICAO, simulador y escuelas: qué sirvió y cuánto costó.",
    guiaTitulo: "Ej.: Hice el type rating del A320 en Bogotá, les cuento",
    guiaCuerpo: "Dónde lo hiciste, cuánto duró, cuánto costó y si lo recomiendas.",
  },
  {
    clave: "preguntas",
    nombre: "Preguntas",
    descripcion: "Pregunta lo que necesites a pilotos que ya pasaron por ahí.",
    guiaTitulo: "Ej.: ¿Cuántas horas piden hoy para entrar a Copa?",
    guiaCuerpo: "Cuenta tu situación: horas, licencias y a qué aerolínea apuntas.",
  },
  {
    clave: "vida-en-linea",
    nombre: "Vida en aerolínea",
    descripcion: "Bases, horarios, rutas y el primer año de línea, contados desde adentro.",
    guiaTitulo: "Ej.: Mi primer año como copiloto: lo que nadie me dijo",
    guiaCuerpo: "Lo que te hubiera gustado saber antes de entrar.",
  },
]

const POR_CLAVE = new Map(CATEGORIAS_FORO.map((c) => [c.clave, c]))

export function categoriaForo(clave: string): CategoriaForo | undefined {
  return POR_CLAVE.get(clave as ClaveCategoria)
}

export type OrdenForo = "tendencia" | "nuevo" | "top"

export const ORDENES_FORO: { clave: OrdenForo; nombre: string }[] = [
  { clave: "tendencia", nombre: "Tendencia" },
  { clave: "nuevo", nombre: "Nuevo" },
  { clave: "top", nombre: "Top del mes" },
]

// ── Las formas que devuelve la base ─────────────────────────────────────────

export interface AutorForo {
  usuario: string | null
  foto: string | null
  racha: number
}

export interface AerolineaForo {
  id: number
  nombre: string
  codigo: string | null
  color: string | null
}

export interface PublicacionForo {
  id: number
  categoria: ClaveCategoria
  titulo: string
  cuerpo: string
  /** El cuerpo viene cortado a 280 caracteres (en el feed). */
  recortado: boolean
  aerolinea: AerolineaForo | null
  ciudad: string | null
  /** Nulo si es anónima. */
  autor: AutorForo | null
  anonima: boolean
  puntos: number
  comentarios: number
  confirmaciones: number
  desmentidos: number
  /** Solo los avisos: si sigue vigente. */
  vigente: boolean | null
  estado: "publicada" | "oculta" | "eliminada"
  creada_en: string
  editada_en: string | null
  mi_voto: -1 | 0 | 1
  mi_confirmacion: boolean | null
  es_mia: boolean
}

export interface ComentarioForo {
  id: number
  padre_id: number | null
  cuerpo: string
  estado: "publicado" | "oculto" | "eliminado"
  autor: AutorForo | null
  es_del_autor: boolean
  puntos: number
  creado_en: string
  mi_voto: -1 | 0 | 1
  es_mio: boolean
}

export interface FeedForo {
  publicaciones: PublicacionForo[]
  hay_mas: boolean
  /** Sin sesión y con más páginas: para seguir hay que entrar. */
  requiere_sesion: boolean
}

export interface DetalleForo {
  publicacion: PublicacionForo
  comentarios: ComentarioForo[]
  total_comentarios: number
  requiere_sesion: boolean
}

export interface TendenciasForo {
  categorias: { clave: ClaveCategoria; nombre: string; descripcion: string; semana: number }[]
  aerolineas: (AerolineaForo & { publicaciones: number })[]
  avisos: PublicacionForo[]
}

// ── Rutas ───────────────────────────────────────────────────────────────────

/** «Así fue mi proceso en Avianca» → «asi-fue-mi-proceso-en-avianca». */
export function slugDeTitulo(titulo: string): string {
  return (
    titulo
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80)
      .replace(/-+$/, "") || "publicacion"
  )
}

/**
 * La dirección de una publicación. La pública es la que se comparte y la que
 * Google indexa; dentro de la app se abre la misma con la barra y Wingman.
 */
export function rutaPublicacion(p: Pick<PublicacionForo, "id" | "titulo">, donde: "publica" | "app"): string {
  const base = donde === "app" ? "/app/comunidad" : "/comunidad"
  return `${base}/p/${p.id}/${slugDeTitulo(p.titulo)}`
}

export function rutaCategoria(clave: ClaveCategoria | null, donde: "publica" | "app"): string {
  const base = donde === "app" ? "/app/comunidad" : "/comunidad"
  return clave ? `${base}/c/${clave}` : base
}

/** Lo mismo de la app, en su versión pública, y al revés. */
export function rutaEquivalente(pathname: string, a: "publica" | "app"): string {
  if (a === "app") return pathname.replace(/^\/comunidad(?=\/|$)/, "/app/comunidad")
  return pathname.replace(/^\/app\/comunidad(?=\/|$)/, "/comunidad")
}

// ── Lo que cambia al votar o confirmar, antes de que conteste la base ──────

/** El voto nuevo aplicado a los puntos, como lo hará la base (por diferencia). */
export function conVoto<T extends { puntos: number; mi_voto: -1 | 0 | 1 }>(x: T, valor: -1 | 0 | 1): T {
  return { ...x, puntos: x.puntos + (valor - x.mi_voto), mi_voto: valor }
}

/** «¿Sigue vigente?» aplicado a un aviso, con la misma regla de la base. */
export function conConfirmacion(p: PublicacionForo, sigue: boolean | null): PublicacionForo {
  const antes = p.mi_confirmacion
  const confirmaciones = p.confirmaciones + (sigue === true ? 1 : 0) - (antes === true ? 1 : 0)
  const desmentidos = p.desmentidos + (sigue === false ? 1 : 0) - (antes === false ? 1 : 0)
  const desmentido = desmentidos >= 3 && desmentidos > confirmaciones
  return {
    ...p,
    mi_confirmacion: sigue,
    confirmaciones,
    desmentidos,
    vigente: (sigue === true || p.vigente === true) && !desmentido,
  }
}

// ── Textos ──────────────────────────────────────────────────────────────────

/** Lo que dice la base cuando algo no se pudo, en palabras del piloto. */
export const MENSAJES_FORO: Record<string, string> = {
  sin_sesion: "Entra a tu cuenta para participar.",
  categoria_invalida: "Elige de qué se trata tu publicación.",
  titulo_invalido: "El título va de 8 a 140 caracteres.",
  cuerpo_invalido: "El texto no puede pasar de 10.000 caracteres.",
  aviso_sin_aerolinea: "Un aviso rápido necesita la aerolínea de la que habla.",
  aerolinea_invalida: "Esa aerolínea no está en la lista.",
  ciudad_invalida: "La ciudad va de 2 a 60 caracteres.",
  no_encontrada: "Esa publicación ya no está.",
  comentario_no_encontrado: "Ese comentario ya no está.",
  comentario_invalido: "Escribe tu comentario (hasta 5.000 caracteres).",
  aviso_propio: "Tu propio aviso lo confirman los demás.",
  no_es_aviso: "Solo los avisos rápidos se confirman.",
  reporte_propio: "No puedes reportar lo que escribiste tú.",
  motivo_invalido: "Elige por qué lo reportas.",
  demasiadas_publicaciones: "Llegaste al máximo de hoy. Vuelve a intentarlo mañana.",
}

export function mensajeForo(codigo: string | undefined): string {
  return (codigo && MENSAJES_FORO[codigo]) || "No pudimos hacerlo. Prueba de nuevo en un momento."
}

/** «hace 3 h», «hace 2 d», «12 sep»: la hora de un foro, no la de un acta. */
export function haceCuanto(fecha: string, ahora = new Date()): string {
  const t = Date.parse(fecha)
  if (!Number.isFinite(t)) return ""
  const s = Math.max(0, Math.round((ahora.getTime() - t) / 1000))
  if (s < 60) return "ahora"
  const min = Math.round(s / 60)
  if (min < 60) return `hace ${min} min`
  const h = Math.round(min / 60)
  if (h < 24) return `hace ${h} h`
  const d = Math.round(h / 24)
  if (d < 7) return `hace ${d} d`
  return new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    day: "numeric",
    month: "short",
    ...(new Date(t).getFullYear() !== ahora.getFullYear() ? { year: "numeric" as const } : {}),
  }).format(new Date(t))
}

/** 1234 → «1,2 k»: los puntos grandes no empujan la fila. */
export function formatearPuntos(n: number): string {
  if (Math.abs(n) < 1000) return String(n)
  return `${(n / 1000).toLocaleString("es-CO", { maximumFractionDigits: 1 })} k`
}

/** El nombre que se muestra del autor. */
export function nombreDeAutor(autor: AutorForo | null): string {
  if (!autor) return "Piloto anónimo"
  return autor.usuario ? `@${autor.usuario}` : "Piloto de Aviatory"
}

/** Partes de un texto con sus enlaces, para pintarlos sin innerHTML. */
export function partesConEnlaces(texto: string): { texto: string; enlace?: string }[] {
  const partes: { texto: string; enlace?: string }[] = []
  const patron = /https?:\/\/[^\s<>"')]+[^\s<>"').,;:!?]/g
  let desde = 0
  for (const m of texto.matchAll(patron)) {
    if (m.index > desde) partes.push({ texto: texto.slice(desde, m.index) })
    partes.push({ texto: m[0], enlace: m[0] })
    desde = m.index + m[0].length
  }
  if (desde < texto.length) partes.push({ texto: texto.slice(desde) })
  return partes
}
