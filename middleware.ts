/**
 * Middleware de Vercel, solo para la comunidad pública.
 *
 * La app es una SPA: todas las rutas reciben el mismo index.html y React pinta
 * la página. Google ejecuta JavaScript, pero las vistas previas de WhatsApp,
 * X o LinkedIn no, y un buscador que no lo ejecute vería siempre la portada.
 * Para /comunidad, sus categorías y cada publicación, esto escribe en el HTML
 * el título, la descripción, la dirección canónica, las etiquetas de vista
 * previa y, en las publicaciones, sus datos estructurados y su texto. React
 * reemplaza ese texto al arrancar.
 *
 * También sirve /sitemap-comunidad.xml con lo publicado (robots.txt lo anuncia).
 *
 * Lee la base como anon, con las mismas funciones que la página
 * (foro_publicacion, foro_mapa): lo que ve es lo público. Si algo falla (la
 * base no responde, la migración no está, la variable no llegó), sigue de
 * largo y se sirve la SPA de siempre: nunca deja una página rota.
 */
import { next } from "@vercel/functions/middleware"
import type { DetalleForo } from "./src/lib/foro"
import { inyectarEnIndex, leerRutaPublica, metaDeComunidad, metaDePublicacion, sitemapDeComunidad } from "./src/lib/foroSeo"

export const config = {
  matcher: ["/comunidad", "/comunidad/:path*", "/sitemap-comunidad.xml"],
}

async function rpc<T>(funcion: string, args: Record<string, unknown>): Promise<T | null> {
  const url = process.env.VITE_SUPABASE_URL
  const llave = process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !llave) return null
  const res = await fetch(`${url}/rest/v1/rpc/${funcion}`, {
    method: "POST",
    headers: { apikey: llave, authorization: `Bearer ${llave}`, "content-type": "application/json" },
    body: JSON.stringify(args),
    signal: AbortSignal.timeout(2500),
  })
  if (!res.ok) return null
  return (await res.json()) as T
}

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url)
  try {
    if (url.pathname === "/sitemap-comunidad.xml") {
      const filas = await rpc<{ id: number; titulo: string; actualizada: string }[]>("foro_mapa", {})
      return new Response(sitemapDeComunidad(url.origin, filas ?? []), {
        headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" },
      })
    }

    const ruta = leerRutaPublica(url.pathname)
    if (!ruta) return next()

    const [indice, detalle] = await Promise.all([
      fetch(new URL("/index.html", url)),
      ruta.tipo === "publicacion" ? rpc<DetalleForo | null>("foro_publicacion", { p_id: ruta.id }) : Promise.resolve(null),
    ])
    if (!indice.ok) return next()

    const meta =
      ruta.tipo === "publicacion"
        ? detalle
          ? metaDePublicacion(detalle)
          : null
        : metaDeComunidad(ruta.tipo === "categoria" ? ruta.clave : null)
    if (!meta) return next()

    const html = inyectarEnIndex(await indice.text(), meta, url.origin, detalle)
    // Las cabeceras de index.html (la CSP entre ellas), menos las que
    // describían el cuerpo original: el texto ya viene descomprimido y cambió.
    const cabeceras = new Headers(indice.headers)
    for (const nombre of ["content-length", "content-encoding", "etag", "last-modified"]) cabeceras.delete(nombre)
    cabeceras.set("content-type", "text/html; charset=utf-8")
    cabeceras.set("cache-control", "public, max-age=0, must-revalidate")
    return new Response(html, { status: 200, headers: cabeceras })
  } catch (error) {
    console.warn("middleware de la comunidad:", error)
    return next()
  }
}
