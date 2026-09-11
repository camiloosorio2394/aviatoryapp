import { useEffect, useRef, useState } from "react"
import { usePrefiereQuieto } from "@/hooks/usePrefiereQuieto"

interface Options {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = "0px",
  triggerOnce = true,
}: Options = {}) {
  const ref = useRef<T | null>(null)
  const [visto, setVisto] = useState(false)
  const quieto = usePrefiereQuieto()

  // Quien pidió menos movimiento lo ve todo desde el principio, sin esperar a
  // entrar en pantalla. Eso no es un estado que se fije: es una preferencia de
  // la que se deriva. Fijarlo desde el efecto era un setState síncrono en el
  // cuerpo del efecto, en cada montaje y para todo el que la tenga puesta.
  const inView = quieto || visto

  useEffect(() => {
    if (quieto) return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisto(true)
          if (triggerOnce) observer.disconnect()
        } else if (!triggerOnce) {
          setVisto(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce, quieto])

  return { ref, inView }
}
