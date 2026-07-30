/**
 * Insignias de logro.
 *
 * Los logros venían con emoji del sistema (🛫 📝 🔥 🎓 👑). Un emoji lo dibuja
 * el sistema operativo, así que el mismo logro se veía distinto en Windows, en
 * Android y en Mac, no acepta el color del nivel y no tiene nada que ver con la
 * identidad de la app. Estos son SVG con la misma gramática que
 * `components/icons/aero.tsx`: 24x24, trazo 1.5, `currentColor`, para que la
 * insignia tome el color de su nivel y se vea igual en todas partes.
 *
 * El vocabulario es el de la carrera de un piloto, no el de una app de puntos:
 * los galones de la charretera para la constancia (un galón por hito, cuatro es
 * comandante), las alas para el dominio de una materia, el perfil de despegue
 * para el primer paso.
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

/** Perfil de despegue: la rotación sobre la pista. El primer paso. */
export function TakeoffBadge({ size = 24, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M3 19.5h18" />
      <path d="M4.5 15.2 8 14.2l3.4-4.9a1.8 1.8 0 0 1 3 .1l3.2 5" />
      <path d="M14.2 9.6 17.6 5" />
      <circle cx="18.4" cy="4.2" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Kneeboard con su lista: el primer simulacro respondido. */
export function KneeboardBadge({ size = 24, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M8.5 8.5h4" />
      <path d="M8.5 12.5h7" />
      <path d="M8.5 16.5h5.5" />
      <path d="M15.4 7.6 16.5 8.7 18.6 6.4" />
    </svg>
  )
}

/**
 * Galones de charretera. Uno, dos, tres o cuatro barras según el hito: es como
 * un piloto lleva puesto cuánto lleva volado, y crece igual que una racha.
 */
function StripesBadge({ count, size = 24, className }: IconProps & { count: number }) {
  const bars = Array.from({ length: count })
  // Centradas verticalmente con paso de 4.4. El trazo va grueso a propósito:
  // a 22 px un galón fino se leía como un guion suelto y no como una barra de
  // charretera. La barra corta de arriba es el "botón" de la manga, para que
  // incluso un solo galón se lea como insignia y no como un signo de menos.
  const step = 4.4
  const top = 13 - ((count - 1) * step) / 2
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d={`M9.5 ${top - 4.6}h5`} strokeWidth={1.6} opacity={0.55} />
      {bars.map((_, i) => (
        <path key={i} d={`M5 ${top + i * step}h14`} strokeWidth={2.8} />
      ))}
    </svg>
  )
}

/** Tres días seguidos: un galón. */
export function Stripe1Badge(props: IconProps) {
  return <StripesBadge {...props} count={1} />
}
/** Una semana: dos galones. */
export function Stripe2Badge(props: IconProps) {
  return <StripesBadge {...props} count={2} />
}
/** Un mes: tres galones. */
export function Stripe3Badge(props: IconProps) {
  return <StripesBadge {...props} count={3} />
}
/** Comandante: los cuatro galones. Reservado al logro de fundador. */
export function Stripe4Badge(props: IconProps) {
  return <StripesBadge {...props} count={4} />
}

/** Alas de piloto: el distintivo que se gana cuando dominas algo. */
export function WingsBadge({ size = 24, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="2.6" />
      <path d="M9.4 10.6 2.5 8.9c-.5-.1-.7.5-.3.8l4.3 2.9" />
      <path d="M9.4 13.4 3.6 15.4" />
      <path d="M14.6 10.6l6.9-1.7c.5-.1.7.5.3.8l-4.3 2.9" />
      <path d="M14.6 13.4l5.8 2" />
    </svg>
  )
}

/** Transmisión de radio: el inglés que despega es el que se escucha en frecuencia. */
export function RadioCallBadge({ size = 24, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M12 4v9" />
      <circle cx="12" cy="15.6" r="2.2" />
      <path d="M8.2 6.6a5.4 5.4 0 0 0 0 7.2" />
      <path d="M15.8 6.6a5.4 5.4 0 0 1 0 7.2" />
    </svg>
  )
}

/** Contador de tres dígitos, como el altímetro: las primeras 100 preguntas. */
export function CounterBadge({ size = 24, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <rect x="2.8" y="7.5" width="18.4" height="9" rx="1.6" />
      <path d="M9 7.5v9" />
      <path d="M15 7.5v9" />
      <path d="M5.9 10.8v2.4" />
      <path d="M11 10.8h2v2.4h-2z" />
      <path d="M17.1 10.8h2v2.4h-2z" />
    </svg>
  )
}

/** Dos estaciones en frecuencia: el primer mensaje en la comunidad. */
export function HandshakeBadge({ size = 24, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="7.4" cy="12" r="2.4" />
      <circle cx="16.6" cy="12" r="2.4" />
      <path d="M9.8 12h4.4" />
      <path d="M4.6 8.2a5.6 5.6 0 0 0 0 7.6" />
      <path d="M19.4 8.2a5.6 5.6 0 0 1 0 7.6" />
    </svg>
  )
}
