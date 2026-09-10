import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Play, X, RotateCcw, ArrowRight } from "lucide-react"

/**
 * Video de apertura de un modulo. Vive en el hero del hub y se abre en modal.
 *
 * Se presenta como tarjeta con miniatura y no como boton, y va por encima de
 * "Empezar la leccion": es el primer paso del modulo, asi que tiene que
 * anunciarse como un contenido y no competir de igual a igual con los botones
 * de navegacion. La miniatura es la misma foto del hero, ya cargada, asi que
 * el realce no cuesta ni un archivo mas.
 *
 * El mp4 pesa megas y por eso `preload="none"`: no se descarga hasta que le
 * dan play. Hasta entonces el modal ensena el cartel, que es el primer cuadro
 * real del video, de modo que al arrancar no hay salto de imagen.
 *
 * Al terminar no se deja al piloto en un video parado: se le ofrece el paso
 * siguiente, el mismo con el que cierra la locucion.
 */

/** Ha visto ya este video en este dispositivo. */
function leerVisto(clave: string): boolean {
  try {
    return localStorage.getItem(clave) === "1"
  } catch {
    // Ventana privada o almacenamiento bloqueado: no saberlo es inofensivo,
    // solo significa que no aparece la marca de "Visto".
    return false
  }
}

function marcarVisto(clave: string) {
  try {
    localStorage.setItem(clave, "1")
  } catch {
    /* sin almacenamiento no hay nada que recordar */
  }
}

interface VideoIntroProps {
  /** Ruta publica del mp4, bajo /modulos/<modulo>/. */
  src: string
  /** Miniatura de la tarjeta. La foto del hero, que es la que pega ahi. */
  miniatura: string
  /** Cartel del reproductor: el primer cuadro real, para que no salte al arrancar. */
  portada: string
  /** Rotulo de duracion, ya formateado. */
  duracion: string
  /** Titular de la tarjeta: nombra el contenido, para saber que se va a abrir. */
  titulo: string
  /** A donde sigue el piloto cuando el video termina. */
  continuarA: string
  continuarTexto: string
  /** Clave de recuerdo, unica por modulo. */
  claveVisto: string
}

export function VideoIntro({
  src,
  miniatura,
  portada,
  duracion,
  titulo,
  continuarA,
  continuarTexto,
  claveVisto,
}: VideoIntroProps) {
  const [abierto, setAbierto] = useState(false)
  const [termino, setTermino] = useState(false)
  const [cargandoVideo, setCargandoVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cerrarRef = useRef<HTMLButtonElement>(null)
  const disparadorRef = useRef<HTMLButtonElement>(null)

  const [yaVisto, setYaVisto] = useState(() => leerVisto(claveVisto))

  const abrir = useCallback(() => {
    setTermino(false)
    // El mp4 empieza a bajar ahora, no antes: la espera arranca aqui.
    setCargandoVideo(true)
    setAbierto(true)
    setYaVisto(true)
    marcarVisto(claveVisto)
  }, [claveVisto])

  const cerrar = useCallback(() => {
    setAbierto(false)
    setCargandoVideo(false)
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
    // Devolver el foco a la tarjeta: si no, queda suelto en el body.
    disparadorRef.current?.focus()
  }, [])

  // Abrir es un gesto del usuario, asi que aqui si se puede reproducir con
  // sonido. Autoplay al cargar la pagina lo bloquearia el navegador.
  useEffect(() => {
    if (!abierto) return
    const v = videoRef.current
    if (!v) return
    void v.play().catch(() => {
      /* si el navegador lo rechaza queda el control nativo */
    })
    cerrarRef.current?.focus()
  }, [abierto])

  // Escape cierra y el fondo no se desplaza mientras el modal esta abierto.
  useEffect(() => {
    if (!abierto) return
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar()
    }
    document.addEventListener("keydown", alTeclear)
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", alTeclear)
      document.body.style.overflow = overflowPrevio
    }
  }, [abierto, cerrar])

  const verDeNuevo = () => {
    setTermino(false)
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    void v.play().catch(() => {})
  }

  return (
    <>
      <button
        ref={disparadorRef}
        type="button"
        onClick={abrir}
        className="group flex w-full items-center gap-3.5 rounded-[12px] border border-white/20 bg-white/[0.07] p-2 pr-4 text-left backdrop-blur-[6px] transition-colors hover:border-white/45 hover:bg-white/[0.12]"
      >
        <span className="relative block h-[52px] w-[92px] shrink-0 overflow-hidden rounded-[8px]">
          <img
            src={miniatura}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />
          <span className="absolute inset-0 bg-[rgba(8,20,36,0.45)]" aria-hidden />
          <span className="absolute inset-0 grid place-items-center" aria-hidden>
            <span
              className="grid h-8 w-8 place-items-center rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition-transform group-hover:scale-110"
              style={{ background: "var(--av-blue-500)" }}
            >
              <Play className="h-3.5 w-3.5 translate-x-[1px] fill-white text-white" />
            </span>
          </span>
        </span>

        <span className="min-w-0">
          <span className="nh-display block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
            Empieza por aquí
          </span>
          <span className="mt-1 block text-[15px] font-semibold leading-[1.35] text-white">
            {titulo}
          </span>
          <span className="mt-1 flex items-center gap-2 text-[12.5px] text-white/60">
            <span className="tabular">{duracion}</span>
            {yaVisto && (
              <>
                <span className="h-2.5 w-px bg-white/25" aria-hidden />
                <span>Visto</span>
              </>
            )}
          </span>
        </span>
      </button>

      {abierto && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(6,14,26,0.88)] p-4 backdrop-blur-[3px] sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={titulo}
          onMouseDown={(e) => {
            // Solo el fondo cierra. Un arrastre que empiece dentro del video
            // y termine fuera no deberia cerrar el modal.
            if (e.target === e.currentTarget) cerrar()
          }}
        >
          {/* El ancho se ata a la altura disponible: el menor entre 1120px y lo
              que quepa manteniendo el 16:9. Sin esto, en un portatil bajo, el
              boton de cerrar se sale por arriba de la ventana. */}
          <div className="relative w-full max-w-[min(1120px,calc((100dvh-9rem)*16/9))]">
            <button
              ref={cerrarRef}
              type="button"
              onClick={cerrar}
              className="absolute -top-11 right-0 inline-flex min-h-[40px] items-center gap-1.5 rounded-[8px] px-3 text-[14px] text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" /> Cerrar
            </button>

            <div className="relative overflow-hidden rounded-[14px] bg-black shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
              <video
                ref={videoRef}
                src={src}
                poster={portada}
                preload="none"
                controls
                playsInline
                onEnded={() => setTermino(true)}
                onPlay={() => setTermino(false)}
                onSeeking={() => setTermino(false)}
                onWaiting={() => setCargandoVideo(true)}
                onPlaying={() => setCargandoVideo(false)}
                onCanPlay={() => setCargandoVideo(false)}
                className="block aspect-video w-full"
              />

              {/* Mientras el video no puede reproducir. No intercepta el
                  puntero: los controles siguen accesibles debajo. */}
              {cargandoVideo && !termino && (
                <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden>
                  <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/25 border-t-white/90" />
                </div>
              )}

              {/* El velo deja libres los 56px de la barra de controles: al
                  terminar se puede rebobinar para volver a oir una frase. */}
              {termino && (
                <div className="absolute inset-x-0 bottom-14 top-0 grid place-items-center bg-[rgba(8,20,36,0.9)] px-6 backdrop-blur-[2px]">
                  <div className="text-center">
                    <p className="nh-display text-[22px] font-bold text-white sm:text-[26px]">
                      Ya sabes de qué se trata
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      <Link
                        to={continuarA}
                        onClick={cerrar}
                        className="inline-flex min-h-[48px] items-center gap-2 rounded-[10px] px-6 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(10,26,47,0.35)] transition-colors"
                        style={{ background: "var(--av-blue-500)" }}
                      >
                        {continuarTexto} <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={verDeNuevo}
                        className="inline-flex min-h-[48px] items-center gap-2 rounded-[10px] border border-white/25 px-5 text-[15px] font-medium text-white/90 transition-colors hover:border-white/60 hover:text-white"
                      >
                        <RotateCcw className="h-4 w-4" /> Ver de nuevo
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
