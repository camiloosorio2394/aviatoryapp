import { createContext, useContext, useEffect } from "react"

/**
 * La barra superior vive en el layout, que se monta una vez para todas las
 * pantallas. La página que conoce la racha la publica aquí; al salir de la
 * página, el chip se quita.
 */
export const RachaEnBarraContext = createContext<(dias: number | undefined) => void>(() => {})

export function useRachaEnBarra(dias: number | undefined) {
  const publicar = useContext(RachaEnBarraContext)
  useEffect(() => {
    publicar(dias)
    return () => publicar(undefined)
  }, [publicar, dias])
}
