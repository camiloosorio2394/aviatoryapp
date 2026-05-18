import { useEffect } from "react"

interface Props {
  title?: string             // página title (se concatena con "| Aviatory" si no termina en "Aviatory")
  description?: string
  path?: string              // path canonical (sin host). Ej: "/pricing"
  image?: string             // OG image path. Ej: "/og-pricing.png" o full URL.
  noindex?: boolean          // si true, agrega noindex,nofollow para no indexar
}

const SITE_URL = "https://aviatoryapp-mu.vercel.app"
const DEFAULT_DESC =
  "Prepara tus exámenes PPL/CPL Aerocivil, mejora tu inglés ICAO y avanza hasta tu primer empleo en aerolínea. Plataforma de pilotos para Latinoamérica, en español."

/**
 * Updates document head per page. Funciona en SPA Vite (no SSR) — manipula
 * directamente <title> y <meta>. Bots como Googlebot ejecutan JS y leen los
 * meta tags actualizados.
 */
export function Seo({ title, description, path = "/", image, noindex = false }: Props) {
  useEffect(() => {
    const fullTitle = title
      ? title.includes("Aviatory")
        ? title
        : `${title} | Aviatory`
      : "Aviatory — De estudiante piloto a candidato de aerolínea"

    document.title = fullTitle

    const desc = description ?? DEFAULT_DESC
    const url = `${SITE_URL}${path}`
    const ogImage = image
      ? image.startsWith("http")
        ? image
        : `${SITE_URL}${image}`
      : `${SITE_URL}/og-default.png`

    // Helper para setear meta tags by name OR property
    function setMeta(attr: "name" | "property", key: string, value: string) {
      let el = document.head.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`
      )
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute("content", value)
    }

    function setLink(rel: string, href: string) {
      let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement("link")
        el.setAttribute("rel", rel)
        document.head.appendChild(el)
      }
      el.setAttribute("href", href)
    }

    setMeta("name", "description", desc)
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow")
    setLink("canonical", url)

    // Open Graph
    setMeta("property", "og:title", fullTitle)
    setMeta("property", "og:description", desc)
    setMeta("property", "og:url", url)
    setMeta("property", "og:image", ogImage)

    // Twitter
    setMeta("name", "twitter:title", fullTitle)
    setMeta("name", "twitter:description", desc)
    setMeta("name", "twitter:image", ogImage)
  }, [title, description, path, image, noindex])

  return null
}
