/**
 * Símbolos de carta aeronáutica.
 *
 * Son los mismos que aparecen en una carta Jeppesen o en un anexo 4 de OACI:
 * el hexágono del VOR, el triángulo del waypoint, la pista del aeródromo. Un
 * piloto los reconoce al instante y ninguna app genérica los tiene, porque hay
 * que saber de aviación para usarlos donde corresponde.
 *
 * Regla de uso: solo van donde el símbolo significa algo. Ponerle un VOR a la
 * sección de comunidad sería decoración, que es justo de lo que veníamos.
 *
 * Geometría pensada para 24x24 con trazo de 1.5, que a 16px sigue leyéndose.
 */

interface IconProps {
  size?: number
  className?: string
}

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
}

/**
 * VOR. Hexágono regular con la estación en el centro. Es la radioayuda
 * clásica, así que sirve para todo lo que sea radio y fraseología.
 */
export function VorIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M12 3.5 19.36 7.75 19.36 16.25 12 20.5 4.64 16.25 4.64 7.75 Z" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

/**
 * NDB. Baliza no direccional: la estación y su emisión concéntrica. Orienta
 * sin ser precisa, que es exactamente lo que hace un tutor.
 */
export function NdbIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="5" strokeDasharray="1.5 2.2" />
      <circle cx="12" cy="12" r="9" strokeDasharray="1.5 2.8" opacity="0.55" />
    </svg>
  )
}

/**
 * Waypoint RNAV. El triángulo hueco es el punto de notificación a demanda:
 * un punto de la ruta por el que pasas. El plan del día son eso, waypoints.
 */
export function WaypointIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M12 4 20.5 19 3.5 19 Z" />
    </svg>
  )
}

/**
 * Aeródromo. Círculo con la pista cruzada, como en la carta de ruta. Es el
 * destino, así que va donde se habla de la aerolínea objetivo.
 */
export function AerodromeIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M7.4 16.6 16.6 7.4" />
      <path d="M9.7 5.9 5.9 9.7" />
      <path d="M18.1 14.3 14.3 18.1" />
    </svg>
  )
}

/**
 * Circuito de espera. La "carrera de caballos" que se vuela mientras esperas
 * autorización: sirve para lo que todavía no está habilitado.
 */
export function HoldingIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M8.5 7.5h7a4.5 4.5 0 0 1 0 9h-7a4.5 4.5 0 0 1 0-9Z" />
      <path d="M8.5 7.5 5 4.5" />
    </svg>
  )
}

/**
 * Localizador ILS. El haz que te alinea con la pista, dibujado como en la
 * carta de aproximación. Va donde se mide la precisión de algo.
 */
export function LocalizerIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M12 4 5.5 19.5" />
      <path d="M12 4 18.5 19.5" />
      <path d="M5.5 19.5 18.5 19.5" strokeDasharray="2 2.4" />
      <circle cx="12" cy="4" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}
