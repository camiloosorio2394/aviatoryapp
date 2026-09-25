import { Play } from "lucide-react"

/**
 * El sitio del video de apertura de un modulo, mientras el mp4 no existe.
 *
 * Es la misma tarjeta que ya ocupaba ese hueco en la portada de Ingreso a
 * aerolinea, sacada de alli para que los hubs que todavia no tienen video no
 * la copien cada uno con sus propias medidas. Ocupa el lugar exacto del
 * `VideoIntro`, asi que el dia que exista el mp4 se cambia el componente y no
 * se mueve nada a su alrededor.
 *
 * Se rotula con la especificacion de lo que falta y no con un "proximamente":
 * quien vaya a grabarlo tiene que leer en la propia pantalla que medida y que
 * duracion se espera, y al piloto le dice que ahi va a haber algo, no que el
 * modulo este a medias.
 */
interface HuecoDeVideoProps {
  /**
   * Que video falta, en una linea: codigo, contenido, duracion y cartel. Se
   * escribe como la especificacion de una foto que falta (`photoHueco`), que
   * es el mismo trato que da el resto de la app a lo que esta por llegar.
   */
  especificacion: string
}

export function HuecoDeVideo({ especificacion }: HuecoDeVideoProps) {
  return (
    <div className="flex w-full max-w-[380px] items-center gap-3.5 rounded-[12px] border border-dashed border-white/20 bg-white/[0.05] p-2 pr-4 text-left">
      <span className="grid h-[52px] w-[92px] shrink-0 place-items-center rounded-[8px] border border-dashed border-white/20 bg-white/[0.06]">
        <Play className="h-4 w-4 text-white/35" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="nh-display block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
          Espacio reservado
        </span>
        <span className="mt-1 block text-[13px] font-medium leading-[1.4] text-white/78">
          {especificacion}
        </span>
      </span>
    </div>
  )
}
