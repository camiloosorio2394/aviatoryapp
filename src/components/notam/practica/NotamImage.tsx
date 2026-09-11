import { useState } from "react"
import { ImageOff } from "lucide-react"
import type { RealNotam } from "@/lib/notam"
import { realNotamImageUrl } from "@/lib/notamComun"
import { type ZoomLevel, ZOOM_WIDTH } from "@/components/notam/practica/zoom"

export interface NotamImageProps {
  national: RealNotam
  variant: "card" | "zoom"
  zoomLevel?: ZoomLevel
  onZoom?: () => void
}

/**
 * Recorte del resumen de la Aerocivil, con los tres estados que puede tener.
 *
 * Los PNG se sirven como assets estáticos y los precachea el service worker. Si
 * un deploy viejo deja una entrada apuntando a un archivo que ya no está, antes
 * se veía un recuadro blanco vacío y el usuario no entendía qué había pasado.
 * Ahora cae a la transcripción, que es exactamente el mismo NOTAM en texto y ya
 * viene con cada registro.
 */
export function NotamImage({ national, variant, zoomLevel = "ancho", onZoom }: NotamImageProps) {
  const [state, setState] = useState<"cargando" | "lista" | "falló">("cargando")
  const isCard = variant === "card"

  if (state === "falló") {
    return (
      <div
        className="rounded-xl border p-3.5"
        style={{
          borderColor: "color-mix(in oklab, var(--av-amber-400) 32%, transparent)",
          background: "color-mix(in oklab, var(--av-amber-400) 8%, transparent)",
        }}
      >
        <div className="flex items-start gap-2.5">
          <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--av-amber-400)" }}>
            <ImageOff className="h-4 w-4" />
          </span>
          <p className="m-0 text-[13px] leading-relaxed text-foreground/85">
            No se pudo mostrar la captura. Trabaja con la transcripción del NOTAM: dice
            exactamente lo mismo.
          </p>
        </div>
        <pre
          className="mono mt-3 mb-0 p-3 rounded-lg border border-border text-[12px] leading-relaxed whitespace-pre-wrap break-words text-foreground"
          style={{ background: "color-mix(in oklab, var(--border) 22%, transparent)" }}
        >
          {national.transcripcion}
        </pre>
      </div>
    )
  }

  const media = (
    <div className={`relative ${isCard ? "inline-block" : "inline-block"}`}>
      <img
        src={realNotamImageUrl(national.imagen)}
        alt={national.transcripcion}
        loading={isCard ? "lazy" : "eager"}
        // Una imagen que ya está en caché puede terminar de cargar antes de que
        // React enganche onLoad: sin este chequeo el esqueleto se quedaría fijo.
        ref={(el) => {
          if (el?.complete && el.naturalWidth > 0) setState("lista")
        }}
        onLoad={() => setState("lista")}
        onError={() => setState("falló")}
        className={`block h-auto max-w-none ${isCard ? "rounded-[6px]" : "rounded-lg"}`}
        style={isCard ? { width: 1240 } : { width: ZOOM_WIDTH[zoomLevel] }}
      />
      {state === "cargando" && (
        <div
          className={`absolute inset-0 animate-pulse ${isCard ? "rounded-[6px]" : "rounded-lg"}`}
          style={{ background: "color-mix(in oklab, var(--muted-foreground) 16%, transparent)" }}
          aria-hidden
        />
      )}
    </div>
  )

  if (!isCard) return media

  return (
    <button
      onClick={onZoom}
      aria-label={`Ampliar la imagen del NOTAM ${national.identificacion}`}
      className="block w-full overflow-x-auto rounded-[12px] border p-3 text-left sm:p-3.5"
      style={{
        background: "rgb(255 255 255)",
        borderColor: "color-mix(in oklab, var(--av-navy-900) 20%, transparent)",
        boxShadow: "0 8px 24px -16px oklch(0.14 0.025 250 / 45%)",
      }}
    >
      {media}
    </button>
  )
}
