/**
 * Piezas compartidas de las láminas de Meteorología.
 *
 * Las láminas del módulo son SVG escrito a mano y no imágenes generadas, porque
 * sus rótulos son datos y sus flechas son física. Lo que se repetía en todas
 * (paleta, rótulo en mono, punta de flecha) vive aquí para que una lámina nueva
 * no vuelva a copiarlo.
 *
 * **La punta de flecha pide el ángulo a mano, y es a propósito.** Se podría
 * calcular del último tramo del trazo, pero entonces una flecha invertida sería
 * un fallo silencioso. Escribiendo `ang={ARRIBA}` la dirección está en el código,
 * se lee de un vistazo y se revisa sin abrir la imagen. Las direcciones con
 * nombre están en `laminaMeteoTokens`.
 */

import {
  ACENTO,
  MONO,
  TINTA,
} from "@/components/lesson/infografias/laminaMeteoTokens"

/** Rótulo de la casa: mono, mayúsculas y tracking ancho. */
export function Rotulo({
  x,
  y,
  children,
  color = TINTA,
  tam = 20,
  ancla = "start",
}: {
  x: number
  y: number
  children: string
  color?: string
  tam?: number
  ancla?: "start" | "middle" | "end"
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={ancla}
      fontFamily={MONO}
      fontSize={tam}
      fontWeight={600}
      letterSpacing={tam * 0.16}
      fill={color}
    >
      {children}
    </text>
  )
}

/** Punta de flecha en (x, y), apuntando al ángulo `ang`. */
export function Punta({
  x,
  y,
  ang,
  color,
  tam = 14,
}: {
  x: number
  y: number
  ang: number
  color: string
  tam?: number
}) {
  const abre = 0.42
  return (
    <path
      d={`M${x},${y}
          L${x - tam * Math.cos(ang - abre)},${y - tam * Math.sin(ang - abre)}
          L${x - tam * Math.cos(ang + abre)},${y - tam * Math.sin(ang + abre)} Z`}
      fill={color}
    />
  )
}

/** Flecha recta de (x1,y1) a (x2,y2), con la punta en el extremo. */
export function Flecha({
  x1,
  y1,
  x2,
  y2,
  color = ACENTO,
  grosor = 2.2,
  tam = 14,
  discontinua,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  grosor?: number
  tam?: number
  discontinua?: boolean
}) {
  const ang = Math.atan2(y2 - y1, x2 - x1)
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2 - tam * 0.7 * Math.cos(ang)}
        y2={y2 - tam * 0.7 * Math.sin(ang)}
        stroke={color}
        strokeWidth={grosor}
        strokeLinecap="round"
        strokeDasharray={discontinua ? "7 6" : undefined}
      />
      <Punta x={x2} y={y2} ang={ang} color={color} tam={tam} />
    </g>
  )
}

/** Trazo curvo sin punta: la línea de corriente. */
export function Corriente({
  d,
  color = ACENTO,
  grosor = 2.2,
  opacidad = 1,
}: {
  d: string
  color?: string
  grosor?: number
  opacidad?: number
}) {
  return (
    <path d={d} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" opacity={opacidad} />
  )
}

/**
 * Remolino: espiral corta que se cierra. `sentido` +1 es horario en pantalla.
 * Lleva su punta al final, con el ángulo tangente calculado de sus dos últimos
 * puntos (aquí sí es seguro: la espiral es una fórmula, no un trazo a mano).
 */
export function Remolino({
  cx,
  cy,
  r,
  sentido = 1,
  color = ACENTO,
  grosor = 2,
}: {
  cx: number
  cy: number
  r: number
  sentido?: 1 | -1
  color?: string
  grosor?: number
}) {
  const n = 28
  const barrido = sentido * 4.4
  const pts: [number, number][] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const a = -Math.PI / 2 + barrido * t
    const rr = r * (1 - t * 0.62)
    pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)])
  }
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
  const [ax, ay] = pts[pts.length - 1]
  const [bx, by] = pts[pts.length - 3]
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" />
      <Punta x={ax} y={ay} ang={Math.atan2(ay - by, ax - bx)} color={color} tam={10} />
    </g>
  )
}

/** Jet de línea de perfil, mirando a la derecha. */
export function Jet({
  x,
  cy,
  ancho = 76,
  color = ACENTO,
}: {
  x: number
  cy: number
  ancho?: number
  color?: string
}) {
  const k = ancho / 104
  return (
    <g transform={`translate(${x} ${cy}) scale(${k})`} fill={color}>
      <path d="M2,0 L13,-25 L21,-25 L26,0 Z" />
      <path d="M4,0.5 L-5,-8 L3,-8 L18,0.5 Z" />
      <path d="M6,-6 L74,-6 C88,-6 98,-2.6 103,0 C98,2.6 88,6 74,6 L6,6 C0,6 -2,3 -2,0 C-2,-3 0,-6 6,-6 Z" />
      <path d="M52,4 L33,23 L46,23 L70,5 Z" />
      <ellipse cx={45} cy={10.5} rx={9} ry={4.4} />
    </g>
  )
}
