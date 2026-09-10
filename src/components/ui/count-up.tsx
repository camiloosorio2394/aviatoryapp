import { useEffect, useState } from "react"
import { usePrefiereQuieto } from "@/hooks/usePrefiereQuieto"

interface Props {
  to: number
  duration?: number
  format?: (v: number) => string
  prefix?: string
  suffix?: string
  className?: string
  /**
   * Cuándo empieza a contar. Por defecto al montar, que es lo que quieren las
   * cifras del panel. La landing lo ata a que el número esté a la vista, para
   * que la cuenta no se gaste antes de que nadie la mire.
   */
  start?: boolean
}

/**
 * Cuenta de 0 a `to` en `duration` ms.
 *
 * Es el único contador de la aplicación. Hubo un segundo, local a la landing,
 * con 1600 ms y un rebote elástico recortado que hacía que la cifra llegara,
 * se sentara, retrocediera y volviera. Aviatory no es una app con rebotes: la
 * misma curva y la misma duración en todas partes.
 */
export function CountUp({
  to,
  duration = 900,
  format = (v) => v.toFixed(0),
  prefix = "",
  suffix = "",
  className,
  start = true,
}: Props) {
  const [animado, setAnimado] = useState(0)
  const quieto = usePrefiereQuieto()

  // Quien pidió menos movimiento recibe la cifra y ya. El dato es el número, no
  // el camino hasta él: contarlo no lo explica, solo lo hace esperar. Se deriva
  // en vez de fijarse desde el efecto, que era un setState síncrono en cada
  // montaje para todo el que la tenga puesta.
  const val = quieto ? to : animado

  useEffect(() => {
    if (!start || quieto) return

    let raf: number
    let inicio: number | null = null
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const step = (ts: number) => {
      if (inicio === null) inicio = ts
      const t = Math.min(1, (ts - inicio) / duration)
      setAnimado(to * ease(t))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration, start, quieto])

  return (
    <span className={className}>
      {prefix}
      {format(val)}
      {suffix}
    </span>
  )
}
