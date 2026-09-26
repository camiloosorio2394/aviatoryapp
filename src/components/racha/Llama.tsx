import { useId } from "react"

/**
 * La llama de la racha, dibujada y no fotografiada: cuerpo con degradado de
 * la base a la punta, núcleo claro, la chispa con la que se enciende y tres
 * brasas que el CSS suelta de vez en cuando. Los colores llegan por
 * variables (--racha-base, --racha-punta, --racha-nucleo) que fija el nivel
 * en la píldora; aquí no hay ningún color escrito.
 *
 * Es la única figura de la app que se dibuja a mano en vez de recortarse de
 * la hoja de íconos de Camilo: una imagen no respira, no se inclina ni
 * suelta brasas, y eso es exactamente lo que pidió.
 */
export function Llama({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "")
  return (
    <svg viewBox="0 0 24 28" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`${id}-cuerpo`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--racha-punta)" }} />
          <stop offset="1" style={{ stopColor: "var(--racha-base)" }} />
        </linearGradient>
      </defs>

      {/* La chispa: solo existe durante la entrada. */}
      <circle className="racha-chispa" cx="12" cy="17" r="1.8" style={{ fill: "var(--racha-nucleo)" }} />

      <g className="racha-cuerpo">
        <path
          d="M12.6 1.4c.8 3.2-.4 5.4-2.2 7.4C8.2 11.3 5.2 13.6 5.2 17.8c0 4.6 3.1 7.8 7 7.8 4.1 0 6.8-3.2 6.8-7.5 0-2.9-1.3-5.1-2.5-6.8-.4 1-1 1.8-1.9 2.4.4-4.5-.3-8.8-2-12.3Z"
          fill={`url(#${id}-cuerpo)`}
        />
        <path
          d="M12.3 12.6c-.9 2-3 3.4-3 6 0 2.2 1.4 3.8 3.1 3.8s3-1.5 3-3.6c0-1.7-.8-2.8-1.5-3.9-.3.6-.7 1-1.2 1.3.2-1.3 0-2.5-.4-3.6Z"
          style={{ fill: "var(--racha-nucleo)" }}
        />
      </g>

      {/* Las brasas: cuántas salen lo decide el nivel, en el CSS. */}
      <g style={{ fill: "var(--racha-punta)" }}>
        <circle className="racha-brasa racha-brasa-1" cx="14.5" cy="6.5" r="1" />
        <circle className="racha-brasa racha-brasa-2" cx="8.5" cy="8" r="0.8" />
        <circle className="racha-brasa racha-brasa-3" cx="17.5" cy="10" r="0.7" />
      </g>
    </svg>
  )
}
