/**
 * La ficha de las lecciones: lo que comparten «En la operación» y «Piensa como
 * piloto».
 *
 * Nace de una queja concreta de Camilo sobre las dos fichas anteriores: la caja
 * teñida y el borde no se veían naturales, el rótulo diminuto en mostaza se
 * leía como hecho a máquina y el avión de trazo, a 14 px, parecía mal dibujado.
 * La dirección la marcó él con una maqueta: una pestaña sólida con el nombre de
 * la ficha, el texto grande sobre papel y, cuando la hay, una foto al lado.
 *
 * Todo toma el acento del lector en el que esté (`--ln-primary`), así que la
 * misma ficha sale azul en NOTAM, mostaza en Mercancías y turquesa en
 * Meteorología. El blanco sobre los tres pasa AA: 11,4, 6,2 y 9,8 a 1.
 */

import type { ReactNode } from "react"
import { HuecoImagen } from "@/components/lesson/HuecoImagen"
import { ImagenAmpliable } from "@/components/lesson/ImagenAmpliable"
import type { FotoFicha, HuecoFoto } from "@/lib/docBlocks"

const PRIMARIO = "var(--ln-primary, var(--av-blue-500))"
const FILETE = "var(--ln-hair, var(--doc-border))"

/**
 * Avión relleno. El `Plane` de Lucide es de trazo, y sobre la pestaña sólida
 * se deshacía. Silueta del icono «flight» de Material Symbols (Apache 2.0),
 * girada para que vuele hacia arriba a la derecha como el resto de la app.
 */
function AvionRelleno({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden style={{ transform: "rotate(45deg)" }}>
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  )
}

/** El rótulo de la esquina: qué clase de texto es, sin tener que leerlo. */
function Pildora({ children }: { children: ReactNode }) {
  return (
    <span
      className="mono inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
      style={{ borderColor: PRIMARIO, color: PRIMARIO, background: "rgb(251 250 248 / 92%)" }}
    >
      {children}
    </span>
  )
}

/**
 * La columna visual: la foto, o su hueco rotulado mientras no exista.
 *
 * «Lo que estás viendo» solo se pinta sobre una foto real. Sobre un hueco no
 * hay nada que señalar, y describir una imagen que todavía no está sería
 * inventarla.
 */
export function VisualFicha({ imagen, hueco, ves }: { imagen?: FotoFicha; hueco?: HuecoFoto; ves?: string[] }) {
  if (imagen) {
    return (
      <div className="relative h-full min-h-[240px] md:min-h-[300px]">
        {/* El aviso «Ampliar» va arriba a la izquierda: abajo está «Lo que estás
            viendo» y arriba a la derecha, la píldora de la ficha. */}
        <ImagenAmpliable
          src={imagen.src}
          alt={imagen.alt}
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover"
          esquina="arriba-izquierda"
        />
        {ves && ves.length > 0 && (
          <div
            className="absolute bottom-4 left-4 right-4 rounded-[12px] px-4 py-3.5 text-white sm:left-auto sm:max-w-[250px]"
            style={{ background: "rgb(14 18 22 / 76%)", backdropFilter: "blur(10px)" }}
          >
            <div className="mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">Lo que estás viendo</div>
            <ul className="m-0 mt-2.5 flex list-none flex-col gap-2 p-0">
              {ves.map((v, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] leading-[1.45]">
                  <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" aria-hidden />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
  if (hueco) {
    // En móvil el hueco va apilado y mide su proporción. En escritorio llena la
    // altura de la fila: con la 4:3 fija, cuando el texto era más alto quedaba
    // una franja en blanco debajo del hueco. Y ahí la proporción se anula con
    // `!aspect-auto`, que gana al estilo en línea: con la altura ya fijada, la
    // 4:3 calculaba un ancho mayor que la columna y el rótulo salía cortado.
    return (
      <div className="h-full md:[&>figure]:h-full md:[&>figure>div]:h-full md:[&>figure>div]:w-full md:[&>figure>div]:!aspect-auto">
        <HuecoImagen rotulo={`${hueco.id} · ${hueco.medida}`} descripcion={hueco.descripcion} alto={280} ratio="4 / 3" />
      </div>
    )
  }
  return null
}

/**
 * El armazón: pestaña, cuerpo y, si hay foto, la columna de la derecha.
 *
 * Sin foto la ficha va a una columna y sigue viéndose terminada: la mayoría de
 * las fichas de los tres módulos no tienen imagen, y no pueden quedar peor que
 * antes por no tenerla.
 */
export function Ficha({
  nombre,
  momento,
  rotulo,
  visual,
  pie,
  children,
}: {
  nombre: string
  momento?: string
  /** «Escenario de práctica», por ejemplo. Opcional a propósito: no todas lo son. */
  rotulo?: string
  visual?: ReactNode
  /**
   * Lo que va debajo, a todo el ancho de la ficha: la respuesta desplegada.
   * Dentro de la columna izquierda estiraba la foto hasta el doble de su alto.
   */
  pie?: ReactNode
  children: ReactNode
}) {
  return (
    <section
      aria-label={nombre}
      className="relative overflow-hidden rounded-[14px] border"
      style={{
        borderColor: FILETE,
        // El papel del lector y no --doc-bg: la hoja se atenúa en modo oscuro y la
        // página del lector no, así que con --doc-bg la ficha salía gris sobre
        // blanco. Fuera del lector no hay --ln-paper y vuelve a --doc-bg.
        background: "var(--ln-paper, var(--doc-bg))",
        boxShadow: "0 1px 2px rgb(22 25 29 / 5%), 0 10px 28px -18px rgb(22 25 29 / 22%)",
      }}
    >
      <div
        className={`grid [grid-template-areas:'texto'_'pie'_'visual'] ${
          visual ? "md:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] md:[grid-template-areas:'texto_visual'_'pie_pie']" : ""
        }`}
      >
        <div className="min-w-0 [grid-area:texto]">
          <div
            className="inline-flex max-w-[calc(100%-12px)] items-center gap-2.5 py-2.5 pl-5 pr-10 text-white sm:pl-7"
            style={{ background: PRIMARIO, clipPath: "polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%)" }}
          >
            <AvionRelleno className="h-[17px] w-[17px] shrink-0" />
            <span className="mono text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.14em]">
              {nombre}
              {momento && (
                <>
                  <span className="mx-2 opacity-60" aria-hidden>
                    ·
                  </span>
                  <span className="opacity-90">{momento}</span>
                </>
              )}
            </span>
          </div>

          <div className="px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
            {rotulo && (
              <div className="mb-3 sm:hidden">
                <Pildora>{rotulo}</Pildora>
              </div>
            )}
            {children}
          </div>
        </div>

        {visual && (
          <div className="h-full border-t [grid-area:visual] md:border-l md:border-t-0" style={{ borderColor: FILETE }}>
            {visual}
          </div>
        )}

        {pie && (
          <div className="border-t px-5 pb-6 pt-5 [grid-area:pie] sm:px-7 sm:pb-7" style={{ borderColor: FILETE }}>
            {pie}
          </div>
        )}
      </div>

      {rotulo && (
        <div className="absolute right-4 top-3 hidden sm:block">
          <Pildora>{rotulo}</Pildora>
        </div>
      )}
    </section>
  )
}
