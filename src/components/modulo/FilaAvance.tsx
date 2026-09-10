import { Link } from "react-router-dom"

/**
 * Una parte del módulo dentro del hero: nombre, cifra y barra.
 *
 * Va sobre el panel de cristal, y ahí el color del módulo no se ve: el azul
 * carta de NOTAM, la mostaza de Mercancías y el petróleo de Meteorología son
 * todos oscuros de origen y sobre un fondo oscuro desaparecen. Por eso quien
 * la coloca pasa un `color` calibrado para este fondo y no el token del
 * módulo. El ámbar y el verde sí valen tal cual, que son claros.
 *
 * La fila entera es el enlace, no un «Seguir» aparte: a este tamaño un enlace
 * de texto sería un blanco diminuto en móvil.
 *
 * Vivía copiada en `Notam.tsx` y en `Mercancias.tsx`, idéntica línea a línea.
 * Al llegar la tercera portada se sacó aquí: tres copias de una barra de
 * avance es como se acaba teniendo tres barras distintas.
 */
export function FilaAvance({
  titulo,
  valor,
  pct,
  color,
  aviso,
  cargando,
  to,
}: {
  titulo: string
  valor: string
  pct: number
  color: string
  /** Todavía no hay nada que medir: la cifra se dice en ámbar. */
  aviso?: boolean
  cargando?: boolean
  to: string
}) {
  return (
    <Link to={to} className="block rounded-[9px] px-2.5 py-1.5 transition-colors hover:bg-white/[0.07]">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[12px] font-medium text-white/85">{titulo}</span>
        {cargando ? (
          <span className="h-3 w-12 animate-pulse rounded bg-white/15" />
        ) : (
          <span
            className="tabular text-[11px]"
            style={{ color: aviso ? "var(--av-amber-400)" : "rgba(255,255,255,0.62)" }}
          >
            {valor}
          </span>
        )}
      </div>
      <div
        className="mt-1.5 h-[3px] overflow-hidden rounded-sm bg-white/15"
        role="progressbar"
        aria-valuenow={cargando ? undefined : pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Avance de ${titulo}`}
      >
        <div
          className="h-full rounded-sm transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </Link>
  )
}
