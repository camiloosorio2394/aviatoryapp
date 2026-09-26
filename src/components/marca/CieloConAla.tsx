import { useId } from "react"

/**
 * El fondo de la tarjeta de Pro: el cielo al atardecer sobre un mar de nubes y
 * el ala entrando por la derecha, como la «versión sobre imagen» de la hoja de
 * marca. Dibujado y no fotografiado: pesa menos de 2 KB, no entra al precache
 * como una foto más y se ve igual de nítido en cualquier densidad.
 *
 * La izquierda queda oscura a propósito: ahí va el texto, en blanco.
 */
export function CieloConAla({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "")
  return (
    <svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`${id}-cielo`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B1E3A" />
          <stop offset="0.45" stopColor="#1C3352" />
          <stop offset="0.72" stopColor="#4D5F7E" />
          <stop offset="0.9" stopColor="#9A8C8E" />
          <stop offset="1" stopColor="#6E7890" />
        </linearGradient>
        <radialGradient id={`${id}-sol`} cx="0.78" cy="0.74" r="0.42">
          <stop offset="0" stopColor="#E7B48A" stopOpacity="0.75" />
          <stop offset="0.5" stopColor="#C79A86" stopOpacity="0.22" />
          <stop offset="1" stopColor="#C79A86" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-ala`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#23344F" />
          <stop offset="0.6" stopColor="#101E34" />
          <stop offset="1" stopColor="#0A1628" />
        </linearGradient>
        <linearGradient id={`${id}-velo`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0B1E3A" stopOpacity="0.92" />
          <stop offset="0.55" stopColor="#0B1E3A" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0B1E3A" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-nube`} x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <rect width="300" height="170" fill={`url(#${id}-cielo)`} />
      <rect width="300" height="170" fill={`url(#${id}-sol)`} />

      {/* El mar de nubes: tres bandas desenfocadas, más claras arriba. */}
      <g filter={`url(#${id}-nube)`}>
        <ellipse cx="150" cy="150" rx="190" ry="16" fill="#8E9BB2" opacity="0.55" />
        <ellipse cx="220" cy="158" rx="120" ry="14" fill="#B7A59E" opacity="0.45" />
        <ellipse cx="90" cy="168" rx="160" ry="16" fill="#2E4263" opacity="0.8" />
      </g>

      {/* El ala: raíz fuera del cuadro a la derecha, borde de ataque hacia abajo
          a la izquierda y el winglet levantado en la punta. */}
      <path
        d="M300 58 L204 118 C199 121 197 124 198 127 L203 131 L300 104 Z"
        fill={`url(#${id}-ala)`}
      />
      <path d="M204 118 L190 82 C189.5 80.5 191 79.5 192.5 80.5 L207 117 Z" fill="#132440" />
      <path d="M300 58 L204 118" stroke="#5B6F90" strokeWidth="0.8" opacity="0.7" />

      <rect width="300" height="170" fill={`url(#${id}-velo)`} />
    </svg>
  )
}
