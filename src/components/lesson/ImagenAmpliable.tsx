import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react"
import { createPortal } from "react-dom"
import { Maximize2, X } from "lucide-react"

/**
 * Una imagen que se abre en grande.
 *
 * Las imágenes de las fichas traen varias partes señaladas con flechas y
 * rótulos, y al tamaño de la ficha esos rótulos no se leen. Camilo pidió poder
 * abrirlas. Al tocarla se abre a pantalla completa, ajustada a lo que quepa; un
 * segundo toque sobre la imagen la acerca justo donde se tocó, para leer un
 * rótulo en un teléfono, y otro la vuelve a ajustar.
 */

type Esquina = "abajo-derecha" | "arriba-izquierda"

export function ImagenAmpliable({
  src,
  alt,
  className = "",
  style,
  imgClassName = "",
  imgStyle,
  esquina = "abajo-derecha",
}: {
  src: string
  alt: string
  /** Clases del botón que envuelve la imagen: es el que ocupa el sitio. */
  className?: string
  style?: CSSProperties
  imgClassName?: string
  imgStyle?: CSSProperties
  /** Dónde va el aviso «Ampliar», para no pisar lo que la ficha pone encima. */
  esquina?: Esquina
}) {
  const [abierta, setAbierta] = useState(false)
  const disparador = useRef<HTMLButtonElement>(null)

  const cerrar = useCallback(() => {
    setAbierta(false)
    disparador.current?.focus()
  }, [])

  return (
    <>
      <button
        ref={disparador}
        type="button"
        onClick={() => setAbierta(true)}
        aria-label={`Ampliar la imagen: ${alt}`}
        className={`group relative block cursor-zoom-in overflow-hidden p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] ${className}`}
        style={{ outlineColor: "var(--ln-primary, var(--av-blue-500))", ...style }}
      >
        <img src={src} alt="" loading="lazy" decoding="async" className={imgClassName} style={imgStyle} />
        <span
          aria-hidden
          className={`pointer-events-none absolute inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold text-white transition-colors ${
            esquina === "abajo-derecha" ? "bottom-2.5 right-2.5" : "left-3 top-3"
          }`}
          style={{ background: "rgb(14 18 22 / 68%)", backdropFilter: "blur(6px)" }}
        >
          <Maximize2 className="h-3 w-3" strokeWidth={2.4} />
          Ampliar
        </span>
      </button>
      {abierta && createPortal(<Visor src={src} alt={alt} onCerrar={cerrar} />, document.body)}
    </>
  )
}

/** Dónde se tocó, para que al acercar ese punto quede bajo el dedo. */
type Ancla = { rx: number; ry: number; cx: number; cy: number }

function Visor({ src, alt, onCerrar }: { src: string; alt: string; onCerrar: () => void }) {
  const dialogo = useRef<HTMLDivElement>(null)
  const zona = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const botonCerrar = useRef<HTMLButtonElement>(null)
  /** Ancho acercado en píxeles, o null si está ajustada a la pantalla. */
  const [ancho, setAncho] = useState<number | null>(null)
  const ancla = useRef<Ancla | null>(null)

  useEffect(() => {
    botonCerrar.current?.focus()
    const previo = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onCerrar()
        return
      }
      // El foco no se escapa del visor: solo hay dos cosas que tocar.
      if (e.key === "Tab" && dialogo.current) {
        const focos = dialogo.current.querySelectorAll<HTMLElement>("button")
        const primero = focos[0]
        const ultimo = focos[focos.length - 1]
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault()
          ultimo.focus()
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault()
          primero.focus()
        }
      }
    }
    window.addEventListener("keydown", tecla)
    return () => {
      window.removeEventListener("keydown", tecla)
      document.body.style.overflow = previo
    }
  }, [onCerrar])

  // Tras acercar, lleva el scroll para que el punto tocado siga donde estaba.
  useLayoutEffect(() => {
    const z = zona.current
    const a = ancla.current
    const i = img.current
    if (!z || !a || !i || ancho === null) return
    z.scrollLeft = i.offsetLeft + a.rx * i.offsetWidth - a.cx
    z.scrollTop = i.offsetTop + a.ry * i.offsetHeight - a.cy
    ancla.current = null
  }, [ancho])

  const alternar = (e: React.MouseEvent<HTMLButtonElement>) => {
    const i = img.current
    const z = zona.current
    if (!i || !z) return
    if (ancho !== null) {
      setAncho(null)
      return
    }
    const r = i.getBoundingClientRect()
    const rz = z.getBoundingClientRect()
    // Con teclado no hay punto tocado (detail 0): se acerca por el centro.
    const porTeclado = e.detail === 0
    const px = porTeclado ? r.left + r.width / 2 : e.clientX
    const py = porTeclado ? r.top + r.height / 2 : e.clientY
    ancla.current = {
      rx: (px - r.left) / r.width,
      ry: (py - r.top) / r.height,
      cx: px - rz.left,
      cy: py - rz.top,
    }
    // Al menos el doble de lo que se ve, y nunca menos que el tamaño real: en
    // un teléfono eso deja los rótulos a su tamaño de diseño.
    setAncho(Math.round(Math.max(i.naturalWidth || r.width * 2, r.width * 2)))
  }

  return (
    <div
      ref={dialogo}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="rev-aparece fixed inset-0 z-[1000] flex flex-col"
      style={{ background: "rgb(10 12 15 / 94%)" }}
    >
      <div className="flex shrink-0 items-center justify-end gap-3 px-3 py-2.5 sm:px-4">
        <span className="mr-auto text-[12.5px] text-white/70">
          {ancho === null ? "Toca la imagen para acercar" : "Toca la imagen para verla completa"}
        </span>
        <button
          ref={botonCerrar}
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar la imagen"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={zona}
        className="flex min-h-0 flex-1 overflow-auto px-3 pb-4 sm:px-6 sm:pb-6"
        // Tocar fuera de la imagen cierra, como en cualquier visor.
        onClick={(e) => {
          if (e.target === e.currentTarget) onCerrar()
        }}
      >
        <button
          type="button"
          onClick={alternar}
          aria-label={ancho === null ? "Acercar la imagen" : "Ver la imagen completa"}
          className={`m-auto block shrink-0 p-0 leading-[0] focus-visible:outline-2 focus-visible:outline-white ${
            ancho === null ? "cursor-zoom-in" : "cursor-zoom-out"
          }`}
        >
          <img
            ref={img}
            src={src}
            alt={alt}
            decoding="async"
            className="block select-none rounded-[6px]"
            draggable={false}
            style={
              ancho === null
                ? { maxWidth: "calc(100vw - 24px)", maxHeight: "calc(100dvh - 88px)", width: "auto", height: "auto" }
                : { width: ancho, maxWidth: "none", height: "auto" }
            }
          />
        </button>
      </div>
    </div>
  )
}
