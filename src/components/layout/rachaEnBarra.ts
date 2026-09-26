import { createContext, useContext, useEffect } from "react"

/** Lo que la página sabe de la racha y la píldora necesita para pintarla. */
export interface RachaEnBarra {
  dias: number
  /** La más larga que ha tenido: con ella la píldora sabe si hay récord. */
  masLarga?: number
}

/**
 * La barra superior vive en el layout, que se monta una vez para todas las
 * pantallas. La página que conoce la racha la publica aquí; al salir de la
 * página, la píldora se quita.
 */
export const RachaEnBarraContext = createContext<(racha: RachaEnBarra | undefined) => void>(() => {})

export function useRachaEnBarra(dias: number | undefined, masLarga?: number) {
  const publicar = useContext(RachaEnBarraContext)
  useEffect(() => {
    publicar(dias === undefined ? undefined : { dias, masLarga })
    return () => publicar(undefined)
  }, [publicar, dias, masLarga])
}
