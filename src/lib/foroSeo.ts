/**
 * Lo que Google y las vistas previas (WhatsApp, X, LinkedIn) leen de la
 * comunidad pública: título, descripción, dirección canónica, datos
 * estructurados (DiscussionForumPosting) y, para quien no ejecuta JavaScript,
 * el contenido de la publicación ya escrito en el HTML.
 *
 * Sin dependencias del navegador ni de React: lo usan la página
 * (components/foro/DatosEstructurados) y el middleware de Vercel
 * (middleware.ts), que lo corre en el borde antes de servir index.html.
 */
import {
  CATEGORIAS_FORO,
  categoriaForo,
  nombreDeAutor,
  rutaCategoria,
  rutaPublicacion,
  slugDeTitulo,
  type DetalleForo,
} from "./foro"

const DESCRIPCION_COMUNIDAD =
  "Convocatorias, procesos de selección, entrevistas y avisos de pilotos que quieren entrar a una aerolínea en Latinoamérica."

/** Corta en la última palabra entera antes de `max`. */
export function descripcionDe(texto: string, max = 155): string {
  const limpio = texto.replace(/\s+/g, " ").trim()
  if (limpio.length <= max) return limpio
  return `${limpio.slice(0, max - 1).replace(/\s+\S*$/, "")}…`
}

export function escaparHtml(texto: string): string {
  return texto.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c)
}

/** JSON para ir dentro de un <script>: ningún «</script>» lo puede cerrar. */
export function jsonEnScript(datos: unknown): string {
  const menorQue = `${String.fromCharCode(92)}u003c`
  return JSON.stringify(datos).replace(/</g, menorQue)
}

export function datosEstructurados(detalle: DetalleForo, origen: string) {
  const p = detalle.publicacion
  const persona = (usuario: string | null | undefined) => ({ "@type": "Person", name: usuario ?? "Piloto anónimo" })
  return {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    headline: p.titulo,
    text: p.cuerpo || p.titulo,
    url: `${origen}${rutaPublicacion(p, "publica")}`,
    datePublished: p.creada_en,
    ...(p.editada_en ? { dateModified: p.editada_en } : {}),
    author: persona(p.autor?.usuario),
    articleSection: categoriaForo(p.categoria)?.nombre,
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: Math.max(p.puntos, 0),
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/CommentAction",
        userInteractionCount: detalle.total_comentarios,
      },
    ],
    comment: detalle.comentarios
      .filter((c) => c.estado === "publicado")
      .slice(0, 3)
      .map((c) => ({ "@type": "Comment", text: c.cuerpo, datePublished: c.creado_en, author: persona(c.autor?.usuario) })),
  }
}

export interface MetaDePagina {
  titulo: string
  descripcion: string
  /** Ruta canónica, sin el origen. */
  ruta: string
  tipo: "website" | "article"
}

export function metaDeComunidad(clave: string | null): MetaDePagina | null {
  if (clave === null) {
    return {
      titulo: "Comunidad de pilotos: convocatorias, entrevistas y avisos | Aviatory",
      descripcion: DESCRIPCION_COMUNIDAD,
      ruta: rutaCategoria(null, "publica"),
      tipo: "website",
    }
  }
  const categoria = CATEGORIAS_FORO.find((c) => c.clave === clave)
  if (!categoria) return null
  return {
    titulo: `${categoria.nombre} · Comunidad de pilotos | Aviatory`,
    descripcion: categoria.descripcion,
    ruta: rutaCategoria(categoria.clave, "publica"),
    tipo: "website",
  }
}

export function metaDePublicacion(detalle: DetalleForo): MetaDePagina {
  const p = detalle.publicacion
  const categoria = categoriaForo(p.categoria)
  return {
    titulo: `${p.titulo} | Comunidad Aviatory`,
    descripcion: descripcionDe(p.cuerpo || `${categoria?.nombre ?? "Comunidad"}: ${p.titulo}`),
    ruta: rutaPublicacion(p, "publica"),
    tipo: "article",
  }
}

/** Qué pide la ruta pública: la portada, una categoría, una publicación o nada del foro. */
export function leerRutaPublica(
  pathname: string,
): { tipo: "portada" } | { tipo: "categoria"; clave: string } | { tipo: "publicacion"; id: number; slug: string | null } | null {
  const limpia = pathname.replace(/\/+$/, "") || "/"
  if (limpia === "/comunidad") return { tipo: "portada" }
  const c = /^\/comunidad\/c\/([a-z-]{2,40})$/.exec(limpia)
  if (c) return { tipo: "categoria", clave: c[1] }
  const p = /^\/comunidad\/p\/(\d{1,12})(?:\/([^/]+))?$/.exec(limpia)
  if (p) return { tipo: "publicacion", id: Number(p[1]), slug: p[2] ?? null }
  return null
}

/**
 * index.html con el título, la descripción, la dirección canónica y las
 * etiquetas de vista previa de la página; y, si hay publicación, sus datos
 * estructurados y su contenido dentro de #root. React reemplaza ese contenido
 * al arrancar: quien ejecuta JavaScript ve la app, y quien no, el texto.
 */
export function inyectarEnIndex(
  html: string,
  meta: MetaDePagina,
  origen: string,
  detalle: DetalleForo | null = null,
): string {
  const url = `${origen}${meta.ruta}`
  const cabeza = [
    `<title>${escaparHtml(meta.titulo)}</title>`,
    `<meta name="description" content="${escaparHtml(meta.descripcion)}" />`,
    `<link rel="canonical" href="${escaparHtml(url)}" />`,
    `<meta property="og:type" content="${meta.tipo}" />`,
    `<meta property="og:title" content="${escaparHtml(meta.titulo)}" />`,
    `<meta property="og:description" content="${escaparHtml(meta.descripcion)}" />`,
    `<meta property="og:url" content="${escaparHtml(url)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escaparHtml(meta.titulo)}" />`,
    `<meta name="twitter:description" content="${escaparHtml(meta.descripcion)}" />`,
    detalle ? `<script type="application/ld+json" data-foro>${jsonEnScript(datosEstructurados(detalle, origen))}</script>` : "",
  ]
    .filter(Boolean)
    .join("\n    ")

  const sinLoViejo = html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name="description"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:(type|title|description|url)"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:(card|title|description)"[^>]*>/gi, "")

  const conCabeza = sinLoViejo.replace(/<\/head>/i, `    ${cabeza}\n  </head>`)
  if (!detalle) return conCabeza
  return conCabeza.replace(/<div id="root">\s*<\/div>/i, `<div id="root">${contenidoEstatico(detalle)}</div>`)
}

/** La publicación en HTML simple, para quien no ejecuta JavaScript. */
function contenidoEstatico(detalle: DetalleForo): string {
  const p = detalle.publicacion
  const categoria = categoriaForo(p.categoria)
  const parrafos = (texto: string) =>
    texto
      .split(/\n{2,}/)
      .map((t) => `<p>${escaparHtml(t).replace(/\n/g, "<br />")}</p>`)
      .join("")
  const comentarios = detalle.comentarios
    .filter((c) => c.estado === "publicado")
    .map((c) => `<li><strong>${escaparHtml(nombreDeAutor(c.autor))}</strong>${parrafos(c.cuerpo)}</li>`)
    .join("")
  return [
    `<article style="max-width:720px;margin:0 auto;padding:96px 20px;font-family:system-ui,sans-serif;line-height:1.6">`,
    `<p><a href="/comunidad">Comunidad</a> · <a href="${rutaCategoria(p.categoria, "publica")}">${escaparHtml(categoria?.nombre ?? p.categoria)}</a></p>`,
    `<h1>${escaparHtml(p.titulo)}</h1>`,
    `<p>${escaparHtml(nombreDeAutor(p.autor))} · ${p.puntos} puntos · ${detalle.total_comentarios} comentarios</p>`,
    p.cuerpo ? parrafos(p.cuerpo) : "",
    comentarios ? `<h2>Comentarios</h2><ol>${comentarios}</ol>` : "",
    `<p><a href="/login?mode=signup">Crea tu cuenta gratis para leer todo y comentar</a></p>`,
    `</article>`,
  ].join("")
}

/** El sitemap de la comunidad: portada, categorías y cada publicación. */
export function sitemapDeComunidad(origen: string, publicaciones: { id: number; titulo: string; actualizada: string }[]): string {
  const url = (loc: string, lastmod?: string, prioridad = "0.6") =>
    `  <url><loc>${escaparHtml(`${origen}${loc}`)}</loc>${lastmod ? `<lastmod>${lastmod.slice(0, 10)}</lastmod>` : ""}<priority>${prioridad}</priority></url>`
  const filas = [
    url(rutaCategoria(null, "publica"), undefined, "0.8"),
    ...CATEGORIAS_FORO.map((c) => url(rutaCategoria(c.clave, "publica"), undefined, "0.7")),
    ...publicaciones.map((p) => url(`/comunidad/p/${p.id}/${slugDeTitulo(p.titulo)}`, p.actualizada)),
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${filas.join("\n")}\n</urlset>\n`
}
