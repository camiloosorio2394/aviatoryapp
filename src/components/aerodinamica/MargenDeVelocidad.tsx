/**
 * El margen de velocidad a altitud media y cerca del techo: el esquema de la
 * Sección 11, Coffin Corner.
 *
 * El documento lo trae como dos bloques de texto monoespaciado. Aquí se pinta
 * como pide la especificación: dos barras apiladas con los extremos rotulados
 * LOW-SPEED BUFFET y MACH BUFFET, y la de gran altitud visiblemente más corta.
 * La diferencia de ancho ES el contenido —el margen se estrecha—, así que se
 * lee de un vistazo en vez de contarse en párrafos.
 *
 * Sin animación, a pedido de Camilo. En móvil las barras siguen siendo barras:
 * lo que se encoge es el texto de los extremos, que pasa a ir encima y debajo.
 */

interface Franja {
  altitud: string
  /** Ancho de la barra, en porcentaje de la columna. El contraste es el dato. */
  ancho: number
  margen: string
}

const FRANJAS: Franja[] = [
  { altitud: "Altitud media", ancho: 100, margen: "Margen operacional amplio" },
  { altitud: "Gran altitud · cerca del techo", ancho: 34, margen: "Margen mínimo" },
]

export function MargenDeVelocidad() {
  return (
    <figure className="m-0 w-full">
      <div className="flex flex-col gap-5 rounded-lg border doc-rule doc-soft px-4 py-5 sm:px-6">
        {FRANJAS.map((f) => (
          <div key={f.altitud}>
            <div className="rotulo text-[10.5px] font-semibold uppercase tracking-[0.12em] doc-muted">
              {f.altitud}
            </div>

            {/* Los dos extremos y la barra. En pantalla ancha van en la misma
                línea; en móvil el rótulo de cada extremo se va a su lado de la
                barra, arriba, porque no caben tres cosas en 390 px. */}
            <div className="mt-2 flex items-center justify-between gap-2 text-[10.5px] font-semibold uppercase tracking-[0.08em] doc-muted">
              <span>Low-speed buffet</span>
              <span>Mach buffet</span>
            </div>

            <div className="mt-1.5 flex items-center gap-2">
              <span
                aria-hidden
                className="h-3 w-[3px] shrink-0 rounded-sm"
                style={{ background: "var(--av-ae-600)" }}
              />
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--doc-soft,rgba(0,0,0,0.06))]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${f.ancho}%`,
                    background: "var(--av-ae-500)",
                  }}
                />
              </div>
              <span
                aria-hidden
                className="h-3 w-[3px] shrink-0 rounded-sm"
                style={{ background: "var(--av-ae-600)" }}
              />
            </div>

            <div className="mt-1.5 text-[12.5px] leading-[1.5]" style={{ color: "var(--doc-fg)" }}>
              {f.margen}
            </div>
          </div>
        ))}
      </div>

      <figcaption className="mt-2 text-[12.5px] leading-[1.5] doc-muted">
        A gran altitud las dos líneas convergen: desacelerar lleva al buffet de baja velocidad y
        acelerar, al Mach buffet.
      </figcaption>
    </figure>
  )
}
