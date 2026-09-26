import type { CSSProperties } from "react"
import type { Airline } from "@/services/aerolineas"

/**
 * Los logos oficiales de las aerolíneas, por el código OACI de la tabla
 * `airlines`. Viven en public/aerolineas/ (unos 100 KB los catorce). Entran al
 * precache del service worker (el glob recoge los .svg), y está bien: salen en
 * la portada.
 *
 * De dónde salieron (26-sep-2026, con permiso de Camilo):
 * - Avianca (el de 2023), Copa y Wingo: el logo del artículo de cada una en
 *   Wikipedia en inglés.
 * - LATAM y JetSMART: Wikimedia Commons.
 * - SATENA: su propio sitio, satena.com/images/logo.svg (en Wikipedia solo
 *   había un GIF pequeño).
 *
 * Y las que entraron con las convocatorias, el mismo día:
 * - Clic, Aerolíneas Argentinas y Aeroméxico: Wikipedia en inglés (el de Clic
 *   en su color; el de su sitio es blanco, para fondo oscuro).
 * - Sky, BoA, Volaris y Viva: Wikimedia Commons.
 * - Arajet: el PNG de Wikipedia en inglés, pasado a WebP. Su SVG es blanco.
 *
 * Se revisaron antes de subirlos: ninguno trae scripts ni carga nada de afuera.
 * Una aerolínea que entre a la tabla sin logo aquí muestra su nombre en su
 * color de marca.
 */
const LOGOS: Partial<Record<string, string>> = {
  AVA: "/aerolineas/avianca.svg",
  LAN: "/aerolineas/latam.svg",
  CMP: "/aerolineas/copa.svg",
  GCO: "/aerolineas/wingo.svg",
  JES: "/aerolineas/jetsmart.svg",
  NSE: "/aerolineas/satena.svg",
  EFY: "/aerolineas/clic.svg",
  SKU: "/aerolineas/sky.svg",
  BOV: "/aerolineas/boa.svg",
  ARG: "/aerolineas/aerolineas-argentinas.svg",
  DWI: "/aerolineas/arajet.webp",
  VOI: "/aerolineas/volaris.svg",
  VIV: "/aerolineas/viva.svg",
  AMX: "/aerolineas/aeromexico.svg",
}

export function LogoAerolinea({
  aerolinea,
  className = "h-6",
}: {
  aerolinea: Pick<Airline, "name" | "code" | "brand_color">
  /** La altura del logo; el ancho sale solo. */
  className?: string
}) {
  const logo = aerolinea.code ? LOGOS[aerolinea.code] : undefined
  if (logo) {
    return (
      // En oscuro va sobre una placa blanca: el índigo de LATAM y los azules de
      // Copa, JetSMART y SATENA no se leen sobre la tarjeta oscura.
      <span className="inline-flex w-fit shrink-0 items-center dark:rounded-md dark:bg-white dark:px-2 dark:py-1">
        <img
          src={logo}
          alt={aerolinea.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={`w-auto max-w-[160px] object-contain object-left ${className}`}
        />
      </span>
    )
  }
  return (
    <span
      className="nh-display block truncate text-[17px] font-bold tracking-[-0.01em] text-[var(--color-aerolinea)] dark:text-[color-mix(in_oklab,var(--color-aerolinea)_45%,white)]"
      style={{ "--color-aerolinea": aerolinea.brand_color ?? "var(--foreground)" } as CSSProperties}
    >
      {aerolinea.name.replace(/ Colombia$/, "")}
    </span>
  )
}
