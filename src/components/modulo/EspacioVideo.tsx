import { useState } from "react"
import { VideoIntro } from "@/components/modulo/VideoIntro"
import { Clapperboard } from "lucide-react"

/**
 * El sitio del video de apertura, antes de que el video exista.
 *
 * Cada módulo abre con un video de un minuto, y hasta que está hecho el hub
 * quedaba con un reproductor roto o sin nada. Aquí el espacio se reserva: se
 * intenta cargar el cartel del video y, si no está, se pinta el hueco rotulado
 * con lo que hay que producir. Cuando aparezcan `intro.mp4` y su cartel, el
 * reproductor sale solo y esto deja de dibujarse, sin tocar código.
 *
 * Es el mismo trato que le damos a las imágenes del módulo: el hueco dice qué
 * falta, y quien lo llena no tiene que venir a preguntar.
 */
export function EspacioVideo({
  src,
  portada,
  duracion,
  titulo,
  continuarA,
  continuarTexto,
  claveVisto,
  acento,
  rotulo,
  descripcion,
}: {
  src: string
  /** Cartel del reproductor. Es también la prueba de si el video ya existe. */
  portada: string
  duracion: string
  titulo: string
  continuarA: string
  continuarTexto: string
  claveVisto: string
  acento?: string
  /** Código y medidas del video que falta: «AP-VID-01 · 16:9 · 60 s». */
  rotulo: string
  descripcion: string
}) {
  const [hay, setHay] = useState<boolean | null>(null)

  return (
    <>
      {/* El cartel se pide siempre, pero no se ve: solo sirve para saber si el
          video ya está. Sin red, `onError` dispara igual y queda el hueco. */}
      {hay === null && (
        <img src={portada} alt="" aria-hidden className="hidden" onLoad={() => setHay(true)} onError={() => setHay(false)} />
      )}

      {hay === true ? (
        <VideoIntro
          src={src}
          miniatura={portada}
          portada={portada}
          duracion={duracion}
          titulo={titulo}
          continuarA={continuarA}
          continuarTexto={continuarTexto}
          claveVisto={claveVisto}
          acento={acento}
        />
      ) : (
        <figure
          className="m-0 flex w-full max-w-[420px] flex-col justify-center gap-2.5 rounded-[14px] border px-5 py-6 text-center"
          style={{
            aspectRatio: "16 / 9",
            borderColor: "rgb(255 255 255 / 24%)",
            background: "rgb(255 255 255 / 7%)",
            backdropFilter: "blur(2px)",
          }}
        >
          <Clapperboard className="mx-auto h-6 w-6" strokeWidth={1.6} style={{ color: acento ?? "#C4B5FD" }} aria-hidden />
          <figcaption className="mono text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#C4B5FD" }}>
            {rotulo}
          </figcaption>
          <p className="m-0 text-[12.5px] leading-[1.5] text-white/70">{descripcion}</p>
        </figure>
      )}
    </>
  )
}
