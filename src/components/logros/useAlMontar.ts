import { useEffect, useState } from "react"

/**
 * Verdadero un cuadro después de montar: las barras y el anillo de Logros
 * parten de cero y se llenan con su transición. Quien pidió menos movimiento
 * no ve el llenado, porque el CSS le quita la transición (index.css).
 */
export function useAlMontar(): boolean {
  const [montado, setMontado] = useState(false)
  useEffect(() => {
    const cuadro = requestAnimationFrame(() => setMontado(true))
    return () => cancelAnimationFrame(cuadro)
  }, [])
  return montado
}
