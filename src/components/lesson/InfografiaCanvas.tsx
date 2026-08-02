import { useCallback, useEffect, useRef, useState } from "react"
import { Maximize2, Minus, Plus, X } from "lucide-react"
import { appButtonClass } from "@/lib/buttonStyles"

/**
 * Visor de infografía de lienzo fijo.
 *
 * Las infografías del curso se diseñan a un tamaño exacto (1687x1125 la de
 * "¿Qué es un NOTAM?") y su maquetación es absoluta: no puede reflowear. En vez
 * de pelear contra eso, se trata como lo que es, una carta.
 *
 * Un piloto ya estudia así: cartas de aproximación, planos de aeródromo y el
 * AIP son lienzos fijos que se acercan y se arrastran. La interacción le es
 * familiar, y a cambio el contenido se ve exactamente como se diseñó.
 *
 * Cómo funciona: el contenido se escala con `transform: scale()` desde la
 * esquina superior izquierda, y un espaciador del tamaño ya escalado hace que
 * el scroll del contenedor sea el correcto. Al entrar, la escala es la de
 * ajustar al ancho disponible; el piloto puede acercar hasta el 100 por ciento
 * y arrastrar, o abrir a pantalla completa.
 *
 * El lienzo NO se invierte en modo oscuro, igual que `.doc-sheet`: es una hoja
 * impresa, y una hoja no cambia de color según la luz de la habitación.
 */

interface Props {
  /** Ancho del lienzo original, en píxeles de diseño. */
  width: number
  /** Alto del lienzo original, en píxeles de diseño. */
  height: number
  /** Título accesible: lo que un lector de pantalla anuncia al llegar. */
  label: string
  children: React.ReactNode
}

const ZOOM_MIN = 0.25
const ZOOM_MAX = 2

export function InfografiaCanvas({ width, height, label, children }: Props) {
  const marco = useRef<HTMLDivElement>(null)
  /** Escala que hace que el lienzo entre justo en el ancho disponible. */
  const [ajuste, setAjuste] = useState(1)
  /** Multiplicador del piloto sobre esa escala. 1 = ver completo. */
  const [zoom, setZoom] = useState(1)
  const [pantallaCompleta, setPantallaCompleta] = useState(false)

  const medir = useCallback(() => {
    const el = marco.current
    if (!el) return
    const disponible = el.clientWidth
    if (disponible > 0) setAjuste(Math.min(1, disponible / width))
  }, [width])

  useEffect(() => {
    medir()
    const el = marco.current
    if (!el || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", medir)
      return () => window.removeEventListener("resize", medir)
    }
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [medir])

  // En pantalla completa, Escape cierra: es lo que espera cualquiera.
  useEffect(() => {
    if (!pantallaCompleta) return
    const cerrar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPantallaCompleta(false)
    }
    window.addEventListener("keydown", cerrar)
    // Sin esto, el fondo sigue haciendo scroll detrás de la carta abierta.
    const previo = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", cerrar)
      document.body.style.overflow = previo
    }
  }, [pantallaCompleta])

  const escala = ajuste * zoom
  const puedeAcercar = zoom < ZOOM_MAX
  const puedeAlejar = zoom > ZOOM_MIN

  const lienzo = (
    <div
      className="relative overflow-auto rounded-xl"
      style={{
        // El marco lleva el color de la hoja para que no se vea un borde gris
        // mientras el navegador todavía no ha pintado el contenido.
        background: "#ffffff",
        maxHeight: pantallaCompleta ? "calc(100vh - 96px)" : undefined,
        // Arrastrar con el dedo en las dos direcciones dentro del visor, sin
        // que el gesto se lo robe el scroll de la página.
        touchAction: "pan-x pan-y",
      }}
    >
      {/* El espaciador ocupa el tamaño YA escalado: es lo que le da al
          contenedor el área de scroll correcta, porque `transform` no afecta
          al flujo del documento. */}
      <div style={{ width: width * escala, height: height * escala }}>
        <div
          role="img"
          aria-label={label}
          style={{
            width,
            height,
            transform: `scale(${escala})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )

  const controles = (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 rounded-lg surface p-1">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(ZOOM_MIN, +(z - 0.25).toFixed(2)))}
          disabled={!puedeAlejar}
          aria-label="Alejar"
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setZoom(1)}
          className="tabular-nums min-w-[52px] text-[12px] font-medium text-muted-foreground"
          aria-label="Ver la infografía completa"
        >
          {Math.round(escala * 100)}%
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(ZOOM_MAX, +(z + 0.25).toFixed(2)))}
          disabled={!puedeAcercar}
          aria-label="Acercar"
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      {!pantallaCompleta && (
        <button
          type="button"
          onClick={() => setPantallaCompleta(true)}
          className={appButtonClass({ variant: "secondary" }, "cursor-pointer")}
        >
          <Maximize2 className="h-3.5 w-3.5" /> Ampliar
        </button>
      )}
    </div>
  )

  if (pantallaCompleta) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col gap-3 p-4 sm:p-6"
        style={{ background: "color-mix(in oklab, var(--background) 92%, black)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-[15px] font-semibold">{label}</div>
          <div className="flex items-center gap-2">
            {controles}
            <button
              type="button"
              onClick={() => setPantallaCompleta(false)}
              className={appButtonClass({ variant: "secondary" }, "cursor-pointer")}
            >
              <X className="h-3.5 w-3.5" /> Cerrar
            </button>
          </div>
        </div>
        <div ref={marco} className="min-h-0 flex-1">
          {lienzo}
        </div>
      </div>
    )
  }

  return (
    <figure className="m-0">
      <div ref={marco}>{lienzo}</div>
      <figcaption className="mt-2.5 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[12px] text-muted-foreground">
          Acerca para leer el detalle, o amplía a pantalla completa.
        </span>
        {controles}
      </figcaption>
    </figure>
  )
}
