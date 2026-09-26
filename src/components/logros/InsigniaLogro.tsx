import { createElement, useId } from "react"
import { Lock } from "lucide-react"
import { cifraDeLogro, glifoDeLogro, tipoDeLogro, type NivelDeLogro, type TipoDeLogro } from "@/lib/logros"

/**
 * La insignia de un logro, dibujada: marco de metal según el nivel, forma según
 * el tipo, centro navy de la marca y el glifo del tema en blanco. Sin ganar, la
 * misma forma en grafito claro con un candado: se ve qué falta sin que parezca
 * ganado.
 *
 * Lienzo de 100 × 100. El centro es la misma forma escalada al 84 %, así el
 * filo de metal tiene el mismo grosor en las cinco formas.
 */

/** Tres paradas por metal: sombra, cuerpo y brillo. Croma bajo a propósito (ver lib/logros.ts). */
const METAL: Record<NivelDeLogro, [string, string, string]> = {
  bronze: ["#7A4E33", "#B98459", "#E6C19C"],
  silver: ["#6F7A89", "#B6BFCB", "#EDF0F4"],
  gold: ["#8C6A2B", "#CFAE5F", "#F2E2B1"],
  platinum: ["#56708F", "#A9BFD8", "#E8F0F9"],
}

const FORMA: Record<Exclude<TipoDeLogro, "dominio">, string> = {
  // Medallón.
  leccion: "M50 4 A46 46 0 1 1 49.99 4 Z",
  // Hexágono de punta arriba.
  practica: "M50 3 L90.7 26.5 L90.7 73.5 L50 97 L9.3 73.5 L9.3 26.5 Z",
  // Escudo.
  evaluacion: "M50 3 L88 15 L88 46 C88 71 71 88 50 97 C29 88 12 71 12 46 L12 15 Z",
  // Octágono.
  hito: "M32 4 L68 4 L96 32 L96 68 L68 96 L32 96 L4 68 L4 32 Z",
}

/** Las alas de piloto a los lados del medallón, para el módulo dominado. */
const ALA_IZQ =
  "M31 44 C22 42 12 40 2 39 C5 42 9 44 13 45 C9 46 5 47 3 49 C11 49 18 49 25 50 C20 51 15 53 12 55 C19 55 26 54 32 53 Z"
const ALA_DER =
  "M69 44 C78 42 88 40 98 39 C95 42 91 44 87 45 C91 46 95 47 97 49 C89 49 82 49 75 50 C80 51 85 53 88 55 C81 55 74 54 68 53 Z"
const ESTRELLA = "M50 3 L52.6 9.2 L59.3 9.7 L54.2 14 L55.8 20.5 L50 17 L44.2 20.5 L45.8 14 L40.7 9.7 L47.4 9.2 Z"

export function InsigniaLogro({
  code,
  nivel,
  conseguido,
  tamano = 64,
  className = "",
}: {
  code: string
  nivel: NivelDeLogro
  conseguido: boolean
  /** Lado en píxeles. */
  tamano?: number
  className?: string
}) {
  const id = useId().replace(/:/g, "")
  const tipo = tipoDeLogro(code)
  const cifra = cifraDeLogro(code)
  const [sombra, cuerpo, brillo] = conseguido ? METAL[nivel] : ["#B9C0CA", "#D5DAE1", "#EEF1F4"]
  const centro = conseguido ? [`#1B3358`, `#0B1E3A`] : ["#F3F5F8", "#E6EAEF"]
  const esDominio = tipo === "dominio"
  // Dónde va el glifo, en porcentaje del lienzo: el medallón del dominio está más abajo.
  const glifo = esDominio ? { top: 56, lado: 0.3 } : { top: cifra ? 45 : 50, lado: 0.36 }

  return (
    <span
      className={`relative inline-grid shrink-0 ${className}`}
      style={{ width: tamano, height: tamano }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" width={tamano} height={tamano} focusable="false">
        <defs>
          <linearGradient id={`${id}-metal`} x1="0.15" y1="0" x2="0.85" y2="1">
            <stop offset="0" stopColor={brillo} />
            <stop offset="0.45" stopColor={cuerpo} />
            <stop offset="1" stopColor={sombra} />
          </linearGradient>
          <linearGradient id={`${id}-centro`} x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0" stopColor={centro[0]} />
            <stop offset="1" stopColor={centro[1]} />
          </linearGradient>
        </defs>

        {esDominio ? (
          <g>
            <path d={ALA_IZQ} fill={`url(#${id}-metal)`} />
            <path d={ALA_DER} fill={`url(#${id}-metal)`} />
            <path d={ESTRELLA} fill={`url(#${id}-metal)`} />
            <circle cx="50" cy="56" r="34" fill={`url(#${id}-metal)`} />
            <circle cx="50" cy="56" r="28.5" fill={`url(#${id}-centro)`} />
            {conseguido && <circle cx="50" cy="56" r="28.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.14" />}
          </g>
        ) : (
          <g>
            <path d={FORMA[tipo]} fill={`url(#${id}-metal)`} />
            <path d={FORMA[tipo]} fill={`url(#${id}-centro)`} transform="translate(50 50) scale(0.84) translate(-50 -50)" />
            {conseguido && (
              <path
                d={FORMA[tipo]}
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity="0.14"
                strokeWidth="1.2"
                transform="translate(50 50) scale(0.84) translate(-50 -50)"
              />
            )}
          </g>
        )}

        {cifra && (
          <text
            x="50"
            y="75"
            textAnchor="middle"
            fontFamily="'Playfair Display Variable', 'Playfair Display', Georgia, serif"
            fontWeight="700"
            fontSize="15"
            fill={conseguido ? cuerpo : "#9AA3AF"}
          >
            {cifra}
          </text>
        )}
      </svg>

      {/* El glifo es un ícono de lucide que sale de una tabla, no un componente
          nuevo: createElement lo pinta sin declararlo dentro del render. */}
      {createElement(glifoDeLogro(code), {
        className: "absolute",
        strokeWidth: 1.7,
        style: {
          width: tamano * glifo.lado,
          height: tamano * glifo.lado,
          left: `calc(50% - ${(tamano * glifo.lado) / 2}px)`,
          top: `calc(${glifo.top}% - ${(tamano * glifo.lado) / 2}px)`,
          color: conseguido ? "#FFFFFF" : "#9AA3AF",
        },
      })}

      {!conseguido && (
        <span
          className="absolute grid place-items-center rounded-full border border-white bg-[#6B7686] text-white"
          style={{ width: tamano * 0.3, height: tamano * 0.3, right: 0, bottom: 0 }}
        >
          <Lock style={{ width: tamano * 0.15, height: tamano * 0.15 }} strokeWidth={2.2} />
        </span>
      )}
    </span>
  )
}
