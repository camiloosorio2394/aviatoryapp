import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Library as LibraryIcon } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { useSession } from "@/hooks/useSession"
import {
  FAMILIAS,
  fetchBiblioteca,
  fetchSeguirLeyendo,
  metaDeDocumento,
  numeroDeDocumento,
  type CategoriaBiblioteca,
  type ItemBiblioteca,
} from "@/lib/biblioteca"
import { readLocalProgress, resumirNotam } from "@/lib/notam"
import { fetchNotamProgress } from "@/lib/notamProgress"
import { readMetarProgress, resumirMetar } from "@/lib/metar"
import { fetchMetarProgress } from "@/lib/metarProgress"
import { resumirMercancias } from "@/lib/mercancias"
import { fetchMercanciasProgress, readMercanciasLocal } from "@/lib/mercanciasProgress"

/**
 * Biblioteca: un estante, no una tabla.
 *
 * Filas con rótulo, cada una con su propio desplazamiento horizontal, y en cada
 * fila las portadas de los documentos. La portada manda: proporción A4 exacta
 * (1055/1491, que es lo que miden las de Cami), franja de lomo a la izquierda y
 * sombra, que es lo que las hace parecer libros y no recuadros.
 *
 * Las filas son FAMILIAS normativas y no materias. Un documento aeronáutico casi
 * nunca trata de una sola materia (el RAC 91 toca meteorología, performance,
 * comunicaciones y espacio aéreo a la vez) pero familia tiene una sola, así que
 * no hay documento en cuatro filas ni contadores inflados. Y el número ES el
 * nombre: un piloto no busca "algo de operaciones", busca el RAC 91, así que
 * dentro de cada fila van ordenados por número.
 *
 * Lo que NO lleva, y es deliberado: sin estados de vigencia ni semáforos, sin
 * estanterías por materia (se probó y se descartó), sin nivel, sin filtros, sin
 * buscador (con cinco documentos sobra; entra cuando pasen de 25) y sin botón de
 * descargar, que anularía el visor sin capa de texto. No añadir nada de esto
 * "por si acaso": cada cosa que se metió de más en la versión anterior hubo que
 * quitarla.
 *
 * El aviso de edición no vive aquí sino en la ficha de cada documento, justo
 * encima del visor: es donde el piloto está a punto de leer y aplicar un límite.
 */
export function Library() {
  const { user, isLoading: sessionLoading } = useSession()
  const [datos, setDatos] = useState<{
    categorias: CategoriaBiblioteca[]
    items: ItemBiblioteca[]
  } | null>(null)
  const [cargando, setCargando] = useState(true)
  const [fallo, setFallo] = useState(false)
  const [seguirIds, setSeguirIds] = useState<number[]>([])
  const [moduloEnCurso, setModuloEnCurso] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false
    void (async () => {
      const r = await fetchBiblioteca()
      if (cancelado) return
      if (r) setDatos(r)
      else setFallo(true)
      setCargando(false)
    })()
    return () => {
      cancelado = true
    }
  }, [])

  // Las dos filas personales salen de datos que YA existen: lo que dejaste a
  // medias en el visor y el módulo que estás estudiando. Cero datos nuevos.
  useEffect(() => {
    if (sessionLoading || !user) return
    let cancelado = false
    void (async () => {
      const [vistos, notamRes, metarRes, mpRes] = await Promise.all([
        fetchSeguirLeyendo(user.id),
        fetchNotamProgress(user.id),
        fetchMetarProgress(user.id),
        fetchMercanciasProgress(user.id),
      ])
      if (cancelado) return
      setSeguirIds(vistos)

      // El respaldo local completa lo que la consulta remota no trae (la mejor
      // nota de la evaluación vive aparte): aquí solo se necesita saber si el
      // módulo está a medias, y con lo local basta para no infravalorarlo.
      const local = readLocalProgress()
      const notam = resumirNotam({
        lessonScreens: notamRes?.lessonScreens ?? local.lessonScreens,
        practiceDone: notamRes?.practiceDone ?? local.exercisesDone,
        bestExamScore: local.bestExamScore,
      })
      const metar = resumirMetar(metarRes ?? readMetarProgress())
      const mercancias = resumirMercancias(mpRes ?? readMercanciasLocal())

      // El que estás estudiando es el que está a medias, y si hay varios, el
      // más avanzado. Terminado o sin empezar no cuentan: no hay nada que
      // acompañar.
      const enCurso = [
        { slug: "notam", pct: notam.overall },
        { slug: "metar", pct: metar.overall },
        { slug: "mercancias-peligrosas", pct: mercancias.overall },
      ]
        .filter((m) => m.pct > 0 && m.pct < 100)
        .sort((a, b) => b.pct - a.pct)[0]
      setModuloEnCurso(enCurso?.slug ?? null)
    })()
    return () => {
      cancelado = true
    }
  }, [user, sessionLoading])

  const filas = useMemo(() => {
    const items = datos?.items ?? []
    const categorias = datos?.categorias ?? []
    if (items.length === 0) return []

    const porNumero = (a: ItemBiblioteca, b: ItemBiblioteca) =>
      numeroDeDocumento(a) - numeroDeDocumento(b) || a.title.localeCompare(b.title, "es")

    const lista: Fila[] = []

    // Seguir leyendo, en el orden en que los dejaste.
    const seguir = seguirIds
      .map((id) => items.find((i) => i.id === id))
      .filter((i): i is ItemBiblioteca => Boolean(i))
    if (seguir.length > 0) {
      lista.push({ clave: "seguir", rotulo: "Seguir leyendo", nota: "Lo dejaste a medias", items: seguir })
    }

    // Del módulo que estás estudiando.
    const cat = categorias.find((c) => c.slug === moduloEnCurso)
    if (cat) {
      const delModulo = items.filter((i) => i.category_id === cat.id).sort(porNumero)
      if (delModulo.length > 0) {
        lista.push({
          clave: "modulo",
          rotulo: `Del módulo que estás estudiando · ${cat.name}`,
          nota: contar(delModulo.length),
          items: delModulo,
        })
      }
    }

    // Esenciales: curada a mano por Cami con la casilla `destacado`.
    const esenciales = items.filter((i) => i.destacado).sort(porNumero)
    if (esenciales.length > 0) {
      lista.push({
        clave: "esenciales",
        rotulo: "Esenciales",
        nota: "Elegidos a mano",
        items: esenciales,
      })
    }

    // Y las familias, en su orden.
    for (const f of FAMILIAS) {
      const deLaFamilia = items.filter((i) => i.familia === f.clave).sort(porNumero)
      if (deLaFamilia.length === 0) continue
      lista.push({
        clave: f.clave,
        rotulo: f.rotulo,
        nota: contar(deLaFamilia.length),
        items: deLaFamilia,
      })
    }

    // Un documento sin familia no puede desaparecer del estante.
    const huerfanos = items
      .filter((i) => !FAMILIAS.some((f) => f.clave === i.familia))
      .sort(porNumero)
    if (huerfanos.length > 0) {
      lista.push({
        clave: "sin-familia",
        rotulo: "Otros documentos",
        nota: contar(huerfanos.length),
        items: huerfanos,
      })
    }

    return lista
  }, [datos, seguirIds, moduloEnCurso])

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        <PageHeader
          eyebrow={
            <>
              <LibraryIcon className="h-3.5 w-3.5" /> Biblioteca
            </>
          }
          title="La biblioteca"
          subtitle="Los reglamentos y documentos de referencia que respaldan lo que estudias. Toca una portada para abrirla."
        />

        {cargando ? (
          <Esqueleto />
        ) : fallo ? (
          <section className="surface rounded-xl p-8 text-center">
            <h2 className="text-[17px] font-semibold">No pudimos cargar la biblioteca</h2>
            <p className="mt-2 text-[15px] text-muted-foreground">
              Vuelve a intentarlo en un momento.
            </p>
          </section>
        ) : filas.length === 0 ? (
          <section className="surface rounded-xl p-8 text-center">
            <h2 className="text-[17px] font-semibold">Todavía no hay documentos</h2>
            <p className="mt-2 text-[15px] text-muted-foreground max-w-[520px] mx-auto leading-relaxed">
              La biblioteca se va cargando a medida que se publica cada módulo. En cuanto haya
              documentos, aparecen aquí.
            </p>
          </section>
        ) : (
          <div className="flex flex-col gap-8">
            {filas.map((f) => (
              <Estante key={f.clave} fila={f} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}

interface Fila {
  clave: string
  rotulo: string
  /** La nota de la derecha: cuántos hay, o de dónde sale la fila. */
  nota: string
  items: ItemBiblioteca[]
}

function contar(n: number): string {
  return n === 1 ? "1 documento" : `${n} documentos`
}

/**
 * Una fila del estante.
 *
 * Se desplaza sola en horizontal y no arrastra la página. Los márgenes
 * negativos son simétricos con el relleno del contenedor a propósito: así la
 * fila llega al borde de la pantalla (que es lo que hace que se lea como un
 * estante que sigue) sin sobrarse ni un píxel a la derecha.
 */
function Estante({ fila }: { fila: Fila }) {
  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="text-[17px] font-semibold tracking-[-0.01em]">{fila.rotulo}</h2>
        <span className="shrink-0 text-[13px] text-muted-foreground">{fila.nota}</span>
      </div>

      <div
        className="-mx-4 px-4 sm:-mx-7 sm:px-7 flex gap-4 overflow-x-auto pb-2"
        style={{ scrollSnapType: "x proximity" }}
      >
        {fila.items.map((item) => (
          <Portada key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

/**
 * Una portada en el estante.
 *
 * Proporción 1055/1491, que es A4 exacto y lo que miden las portadas de Cami:
 * declarada con `aspect-ratio` para que el hueco esté reservado antes de que la
 * imagen cargue y la fila no dé un salto.
 */
function Portada({ item }: { item: ItemBiblioteca }) {
  const meta = metaDeDocumento(item)

  return (
    <Link
      to={`/app/biblioteca/${item.slug}`}
      className="group w-[142px] sm:w-[160px] shrink-0"
      style={{ scrollSnapAlign: "start" }}
    >
      <div
        className="relative aspect-[1055/1491] w-full overflow-hidden rounded-[6px] transition-all duration-200 group-hover:-translate-y-1.5"
        style={{
          background: "var(--muted)",
          boxShadow: "0 1px 2px rgb(11 16 32 / 10%), 0 8px 20px -12px rgb(11 16 32 / 45%)",
        }}
      >
        {item.portada_url ? (
          <img
            src={item.portada_url}
            /* Decorativa: el título va escrito debajo, en texto. */
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-end p-3 text-[13px] font-semibold leading-snug text-foreground/70">
            {item.title}
          </span>
        )}

        {/* La franja de lomo. Es lo que hace que se lea como un libro y no como
            un recuadro con una foto dentro. */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[7%]"
          style={{
            background:
              "linear-gradient(to right, rgb(11 16 32 / 30%), rgb(11 16 32 / 8%) 55%, transparent)",
          }}
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-[6px]"
          style={{ boxShadow: "inset 0 0 0 1px rgb(11 16 32 / 8%)" }}
        />
      </div>

      <div className="mt-2.5 text-[13px] font-semibold leading-snug">{item.title}</div>
      {meta && <div className="mt-0.5 text-[12px] text-muted-foreground">{meta}</div>}
    </Link>
  )
}

function Esqueleto() {
  return (
    <div className="flex flex-col gap-8" aria-hidden>
      {[0, 1].map((f) => (
        <section key={f}>
          <div className="mb-3 h-5 w-52 rounded bg-muted animate-pulse" />
          <div className="flex gap-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-[142px] sm:w-[160px] shrink-0 aspect-[1055/1491] rounded-[6px] bg-muted animate-pulse"
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
