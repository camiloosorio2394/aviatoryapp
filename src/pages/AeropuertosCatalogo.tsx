import { useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowUpRight, BookOpen, Search, X } from "lucide-react"
import { HuecoImagen } from "@/components/lesson/HuecoImagen"
import { AP_HUB, AP_TITULO, AP_VIGENCIA } from "@/lib/aeropuertos"
import {
  AP_CAT_FAMILIAS,
  AP_CAT_FICHAS,
  AP_CAT_TIPOS,
  AP_CAT_TOTAL,
  contarPorTipo,
  filtrarFichas,
  leccionDe,
  type ApCatFicha,
  type ApCatTipo,
} from "@/lib/aeropuertosCatalogo"
import { explicacionDeImagen, imagenDeFicha } from "@/lib/aeropuertosCatalogoImagenes"
import { registrarEstudioDiario } from "@/lib/activity"

/**
 * El catálogo visual de Aeropuertos (ruta /app/aerolinea/aeropuertos/catalogo).
 *
 * La segunda capa del módulo. Las lecciones enseñan lo que el piloto usa a
 * diario; esto es la consulta rápida donde no falta nada: las 177 fichas del
 * Anexo 14 Vol. I con la Enmienda 18, los paneles del Anexo 2 y las variantes
 * nacionales de LATAM, buscables por nombre y filtrables por tipo.
 *
 * Lleva el tema del lector (`lector-notam lector-ap`) por dos razones, no por
 * decoración: el catálogo es la misma pieza de contenido que la lección y tiene
 * que reconocerse como tal, y `HuecoImagen` se pinta con las variables de ese
 * tema. Así el violeta del módulo sale de `--ln-primary` y aquí no hay un solo
 * color escrito a mano.
 *
 * Las fichas reutilizan el archivo de la lección cuando el elemento coincide.
 * Si faltara un activo propio, conservaría su hueco rotulado. Ninguna
 * imagen se recorta para forzarla a la proporción de otra ficha.
 *
 * Se lee con el pulgar: una columna en el teléfono, la tira de filtros se
 * barre de lado y el buscador se queda pegado arriba.
 */

/** Se estudia al buscar o al filtrar, nunca solo por abrir la pantalla. */
function marcarEstudio(): void {
  void registrarEstudioDiario("aeropuertos-catalogo")
}

const TOTAL_PROPIAS = AP_CAT_FICHAS.filter((f) => f.imagen?.clase === "propia").length
const TOTAL_CON_IMAGEN = AP_CAT_FICHAS.filter((f) => Boolean(imagenDeFicha(f))).length

export function AeropuertosCatalogo() {
  const [texto, setTexto] = useState("")
  const [tipo, setTipo] = useState<ApCatTipo | "todas">("todas")
  const entradaRef = useRef<HTMLInputElement | null>(null)

  const fichas = useMemo(() => filtrarFichas(texto, tipo), [texto, tipo])

  /** Los contadores de las pestañas cuentan sobre el texto, no sobre el tipo. */
  const porTipo = useMemo(() => contarPorTipo(filtrarFichas(texto, "todas")), [texto])
  const totalTexto = useMemo(() => filtrarFichas(texto, "todas").length, [texto])

  /**
   * Sin búsqueda, las fichas van agrupadas por familia: 177 tarjetas seguidas
   * no se recorren. Con búsqueda manda el resultado y el orden es el del
   * catálogo.
   */
  const grupos = useMemo(() => {
    if (texto.trim()) return null
    const mapa = new Map<number, ApCatFicha[]>()
    for (const f of fichas) {
      const bolsa = mapa.get(f.familia)
      if (bolsa) bolsa.push(f)
      else mapa.set(f.familia, [f])
    }
    return [...mapa.entries()]
  }, [fichas, texto])

  /** Ir a la ficha dueña de una imagen: se busca por su código y se sube. */
  function verFicha(codigo: string) {
    setTipo("todas")
    setTexto(codigo)
    entradaRef.current?.focus()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="lector-notam lector-ap min-h-full">
      <div className="mx-auto max-w-[1180px] px-5 pt-8 pb-20 sm:px-7 sm:pt-10">
        <Link
          to={AP_HUB}
          className="mb-4 inline-flex items-center gap-1.5 text-[13px] transition-colors"
          style={{ color: "var(--ln-soft)" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a {AP_TITULO}
        </Link>

        <header className="mb-7">
          <div className="ln-epigrafe">{AP_TITULO} · Catálogo</div>
          <h1
            className="ln-display mt-1.5 text-[30px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[34px]"
            style={{ color: "var(--ln-ink)" }}
          >
            Todo lo que se ve desde la cabina
          </h1>
          <p
            className="mt-2.5 max-w-[680px] text-[15px] leading-[1.6]"
            style={{ color: "var(--ln-muted)" }}
          >
            Las {AP_CAT_TOTAL} fichas del aeródromo, de la señal pintada a la luz de obstáculo.
            Busca por el nombre en español o en inglés, o filtra por tipo. Las lecciones te
            enseñan lo que usas a diario; esto es para cuando ves algo que no reconoces.
          </p>
          <p className="ln-epigrafe mt-3">{AP_VIGENCIA}</p>
        </header>

        {/* Buscador y filtros: pegados arriba, debajo de la barra de la app. */}
        {/* El papel va opaco y no translúcido: con velo, el texto de las fichas
            se leía por debajo de las pastillas al desplazar. */}
        <div
          className="sticky top-16 z-20 -mx-5 mb-6 border-b px-5 pt-2 pb-3 sm:-mx-7 sm:px-7"
          style={{ background: "var(--ln-paper)", borderColor: "var(--ln-row-rule)" }}
        >
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "var(--ln-placeholder)" }}
              aria-hidden="true"
            />
            <label htmlFor="catalogo-buscar" className="sr-only">
              Buscar en el catálogo
            </label>
            <input
              id="catalogo-buscar"
              ref={entradaRef}
              type="search"
              inputMode="search"
              autoComplete="off"
              placeholder="Busca: umbral, stop bar, damero, AP-CAT-23…"
              value={texto}
              onChange={(e) => {
                setTexto(e.target.value)
                // Tres letras para no contar un roce del teclado.
                if (e.target.value.trim().length >= 3) marcarEstudio()
              }}
              className="h-12 w-full rounded-2xl border pl-11 pr-11 text-[15px] focus:outline-none"
              style={{
                background: "var(--ln-paper)",
                borderColor: "var(--ln-hair)",
                color: "var(--ln-ink)",
              }}
            />
            {texto && (
              <button
                type="button"
                onClick={() => setTexto("")}
                className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full"
                style={{ color: "var(--ln-soft)" }}
                aria-label="Borrar la búsqueda"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Se barre de lado con el pulgar; en el teléfono no caben los seis. */}
          <div
            className="mt-2.5 flex snap-x gap-1.5 overflow-x-auto px-1 pb-1"
            role="group"
            aria-label="Filtrar por tipo"
          >
            <PastillaTipo
              activa={tipo === "todas"}
              cuenta={totalTexto}
              etiqueta="Todas"
              onClick={() => {
                setTipo("todas")
                marcarEstudio()
              }}
            />
            {AP_CAT_TIPOS.map((t) => (
              <PastillaTipo
                key={t.id}
                activa={tipo === t.id}
                cuenta={porTipo[t.id]}
                etiqueta={t.label}
                onClick={() => {
                  setTipo(t.id)
                  marcarEstudio()
                }}
              />
            ))}
          </div>
        </div>

        {fichas.length === 0 ? (
          <div
            className="border px-6 py-14 text-center"
            style={{ background: "var(--ln-sunk)", borderColor: "var(--ln-hair)" }}
          >
            <p className="text-[15px]" style={{ color: "var(--ln-body)" }}>
              Nada con «{texto}» en ese filtro.
            </p>
            <button
              type="button"
              onClick={() => {
                setTexto("")
                setTipo("todas")
              }}
              className="mt-3 text-[14px] font-semibold underline underline-offset-4"
              style={{ color: "var(--ln-primary)" }}
            >
              Ver las {AP_CAT_TOTAL} fichas
            </button>
          </div>
        ) : grupos ? (
          grupos.map(([familia, deLaFamilia]) => (
            <section key={familia} className="mb-10">
              <h2
                className="ln-display mb-4 text-[19px] font-semibold tracking-[-0.01em]"
                style={{ color: "var(--ln-ink)" }}
              >
                {AP_CAT_FAMILIAS.find((f) => f.n === familia)?.titulo}
                <span className="ml-2 text-[13px] font-normal" style={{ color: "var(--ln-faint)" }}>
                  {deLaFamilia.length}
                </span>
              </h2>
              <Rejilla fichas={deLaFamilia} onVerFicha={verFicha} />
            </section>
          ))
        ) : (
          <>
            <p className="mb-4 text-[13px]" style={{ color: "var(--ln-faint)" }}>
              {fichas.length} {fichas.length === 1 ? "ficha" : "fichas"}
            </p>
            <Rejilla fichas={fichas} onVerFicha={verFicha} />
          </>
        )}

        <p
          className="mt-12 border-t pt-5 text-[12.5px] leading-[1.6]"
          style={{ borderColor: "var(--ln-row-rule)", color: "var(--ln-faint)" }}
        >
          {AP_CAT_TOTAL} fichas: {TOTAL_CON_IMAGEN} con imagen y {AP_CAT_TOTAL - TOTAL_CON_IMAGEN} de consulta textual.
          {" "}{TOTAL_PROPIAS} tienen código propio del catálogo; las imágenes de las lecciones
          se reutilizan sin duplicar archivos.
        </p>
      </div>
    </div>
  )
}

function PastillaTipo({
  activa,
  cuenta,
  etiqueta,
  onClick,
}: {
  activa: boolean
  cuenta: number
  etiqueta: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activa}
      className="inline-flex h-10 shrink-0 snap-start items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-semibold whitespace-nowrap transition-colors"
      style={{
        borderColor: activa ? "var(--ln-primary)" : "var(--ln-hair)",
        background: activa ? "var(--ln-tint)" : "transparent",
        color: activa ? "var(--ln-primary)" : "var(--ln-soft)",
      }}
    >
      <span>{etiqueta}</span>
      <span className="tabular-nums opacity-70">{cuenta}</span>
    </button>
  )
}

function Rejilla({
  fichas,
  onVerFicha,
}: {
  fichas: ApCatFicha[]
  onVerFicha: (codigo: string) => void
}) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
      {fichas.map((f) => (
        <Ficha key={f.n} ficha={f} onVerFicha={onVerFicha} />
      ))}
    </div>
  )
}

function Ficha({
  ficha,
  onVerFicha,
}: {
  ficha: ApCatFicha
  onVerFicha: (codigo: string) => void
}) {
  const { imagen } = ficha
  const src = imagenDeFicha(ficha)
  const explicacion = explicacionDeImagen(ficha)
  // Las de consulta pura van con la imagen pequeña: son las que un piloto de
  // línea casi con seguridad no verá desde la cabina.
  const anchoMax = ficha.consulta ? 240 : undefined

  return (
    <article className="flex flex-col">
      {src && (
        <figure
          className="flex h-[220px] items-center justify-center overflow-hidden border"
          style={{ background: "var(--ln-sunk)", borderColor: "var(--ln-hair)", maxWidth: anchoMax }}
        >
          <img
            src={src}
            alt={`${ficha.es}: ${ficha.linea}`}
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain"
          />
        </figure>
      )}
      {explicacion && (
        <p
          className="border-l-2 px-3 py-2 text-[12.5px] leading-[1.45]"
          style={{ borderColor: "var(--ln-primary)", background: "var(--ln-tint)", color: "var(--ln-body)" }}
        >
          {explicacion}
        </p>
      )}

      {!src && imagen?.clase === "propia" && (
        <HuecoImagen
          rotulo={`${imagen.codigo} · ${imagen.medida}`}
          descripcion={imagen.descripcion}
          alto={220}
          ratio={imagen.ratio}
          anchoMax={anchoMax}
        />
      )}

      {!src && imagen?.clase === "prestada" && imagen.de === "leccion" && (
        <HuecoImagen
          rotulo={`${imagen.codigo} · ${imagen.medida ?? "Imagen de lección"}`}
          descripcion={
            imagen.elemento
              ? `Se aprovecha «${imagen.elemento}» de la imagen de la lección ${imagen.leccion}. Se genera una sola vez, allí.`
              : `Se reutiliza la imagen de la lección ${imagen.leccion}. Se genera una sola vez, allí.`
          }
          alto={220}
          ratio={imagen.ratio}
          anchoMax={anchoMax}
        />
      )}

      {imagen?.clase === "prestada" && imagen.de === "catalogo" && (
        <div
          className="flex items-center justify-between gap-3 border px-4 py-3"
          style={{ background: "var(--ln-sunk)", borderColor: "var(--ln-hair)" }}
        >
          <span
            className="rotulo text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "var(--ln-primary)" }}
          >
            Misma imagen que {imagen.codigo}
          </span>
          <button
            type="button"
            onClick={() => onVerFicha(imagen.codigo)}
            className="shrink-0 text-[12.5px] font-semibold underline underline-offset-4"
            style={{ color: "var(--ln-primary)" }}
          >
            Ver
          </button>
        </div>
      )}

      {/* Sin imagen no se deja el hueco en blanco: se dice que es de texto, que
          es dato para quien está produciendo las imágenes. */}
      {!imagen && (
        <div className="ln-epigrafe border-t pt-2.5" style={{ borderColor: "var(--ln-row-rule)" }}>
          Ficha de texto
        </div>
      )}

      <h3
        className="mt-3 text-[16px] font-semibold leading-[1.35]"
        style={{ color: "var(--ln-ink)" }}
      >
        {ficha.es}
      </h3>
      <p className="mono mt-0.5 text-[12.5px]" style={{ color: "var(--ln-faint)" }}>
        {ficha.en}
      </p>
      <p className="mt-2 text-[14.5px] leading-[1.55]" style={{ color: "var(--ln-body)" }}>
        {ficha.linea}
      </p>

      {ficha.nota && (
        <p
          className="mt-2 text-[12.5px] leading-[1.5]"
          style={{ color: "var(--ln-caution-ink)" }}
        >
          {ficha.nota}
        </p>
      )}

      {imagen?.clase === "prestada" && imagen.de === "leccion" && (
        <Link
          to={leccionDe(imagen) ?? ""}
          className="mt-2.5 inline-flex items-center gap-1 text-[12.5px] font-semibold"
          style={{ color: "var(--ln-primary)" }}
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          Lección {imagen.leccion}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      )}
    </article>
  )
}
