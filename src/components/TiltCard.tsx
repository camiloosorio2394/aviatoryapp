import { useRef, type ReactNode, type ElementType } from "react"

interface Props {
  children: ReactNode
  className?: string
  intensity?: number      // grados máximos de rotación (default 6)
  as?: ElementType
}

/**
 * Mouse-tracked 3D tilt — calcula el ángulo basado en la posición del cursor
 * relativa al centro del elemento. Usa transform 3D + GPU.
 *
 * Si el user tiene prefers-reduced-motion, no hace nada.
 */
export function TiltCard({
  children,
  className = "",
  intensity = 6,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width   // 0..1
    const y = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - y) * intensity                  // tilt X (vertical mouse → rotateX)
    const ry = (x - 0.5) * intensity                  // tilt Y (horizontal mouse → rotateY)

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return
      ref.current.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(0, -4px, 0)`
    })
  }

  function handleMouseLeave() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (ref.current) {
      ref.current.style.transform = ""
    }
  }

  const Component = Tag as ElementType
  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </Component>
  )
}
