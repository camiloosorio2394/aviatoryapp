import { useEffect, useState } from "react"
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom"
import { PenLine, RotateCcw, X } from "lucide-react"
import { toast } from "sonner"
import { EstadoError } from "@/components/EstadoError"
import { useSession } from "@/hooks/useSession"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { PlacaCategoria } from "@/components/foro/Piezas"
import { TarjetaPublicacion } from "@/components/foro/TarjetaPublicacion"
import { CabeceraForo, MenuCategorias, PanelLateral } from "@/components/foro/Laterales"
import { confirmarAviso, traerFeed, traerTendencias, votar } from "@/services/foro"
import { traerIdentidadEnLaBarra } from "@/services/perfil"
import {
  ORDENES_FORO,
  categoriaForo,
  conConfirmacion,
  conVoto,
  rutaCategoria,
  type OrdenForo,
  type PublicacionForo,
  type TendenciasForo,
} from "@/lib/foro"
import { Community } from "@/pages/Community"

const ORDENES = new Set<string>(ORDENES_FORO.map((o) => o.clave))

/**
 * La comunidad: el feed de publicaciones, con las categorías arriba (o a un
 * lado en pantallas muy anchas) y los avisos activos al otro lado.
 *
 * Mientras la base no tenga el foro (migración 20261003010000), se ven las
 * salas de chat de siempre.
 */
export function Foro() {
  const { categoria: claveParam } = useParams()
  const [params, setParams] = useSearchParams()
  const { user } = useSession()
  const [identidad, setIdentidad] = useState<{ username: string | null; photoUrl: string | null } | null>(null)

  const categoria = claveParam ? (categoriaForo(claveParam) ?? null) : null
  const ordenParam = params.get("orden") ?? ""
  const orden: OrdenForo = ORDENES.has(ordenParam) ? (ordenParam as OrdenForo) : "tendencia"
  const aerolinea = Number(params.get("aerolinea")) > 0 ? Number(params.get("aerolinea")) : null

  const [carga, setCarga] = useState<{ consulta: string; estado: "listo" | "sin_foro" | "error" } | null>(null)
  const [publicaciones, setPublicaciones] = useState<PublicacionForo[]>([])
  const [hayMas, setHayMas] = useState(false)
  const [pagina, setPagina] = useState(0)
  const [cargandoMas, setCargandoMas] = useState(false)
  const [tendencias, setTendencias] = useState<TendenciasForo | null>(null)
  const [intento, setIntento] = useState(0)

  const clave = categoria?.clave ?? null

  // «Cargando» mientras lo que hay no sea de esta consulta: así no hace falta
  // apagar nada al cambiar de categoría, de orden o de aerolínea.
  const consulta = [clave, orden, aerolinea, intento].join("|")
  const estado = carga?.consulta === consulta ? carga.estado : "cargando"

  useEffect(() => {
    let cancelado = false
    void traerFeed({ categoria: clave, orden, aerolinea, pagina: 0 }).then((r) => {
      if (cancelado) return
      if (r.estado === "listo") {
        setPublicaciones(r.datos.publicaciones)
        setHayMas(r.datos.hay_mas)
        setPagina(0)
      }
      setCarga({ consulta, estado: r.estado })
    })
    return () => {
      cancelado = true
    }
  }, [consulta, clave, orden, aerolinea])

  useEffect(() => {
    let cancelado = false
    void traerTendencias().then((r) => {
      if (!cancelado && r.estado === "listo") setTendencias(r.datos)
    })
    return () => {
      cancelado = true
    }
  }, [])

  // El usuario y la foto del compositor, los mismos de la barra.
  const userId = user?.id
  useEffect(() => {
    if (!userId) return
    let cancelado = false
    void traerIdentidadEnLaBarra(userId).then((i) => {
      if (!cancelado && i) setIdentidad(i)
    })
    return () => {
      cancelado = true
    }
  }, [userId])

  if (claveParam && !categoria) return <Navigate to={rutaCategoria(null)} replace />
  if (estado === "sin_foro") return <Community />

  const actualizar = (id: number, cambio: (p: PublicacionForo) => PublicacionForo) =>
    setPublicaciones((lista) => lista.map((p) => (p.id === id ? cambio(p) : p)))

  function alVotar(p: PublicacionForo, valor: -1 | 0 | 1) {
    actualizar(p.id, (x) => conVoto(x, valor))
    void votar(p.id, valor).then((r) => {
      if (r.ok) actualizar(p.id, (x) => ({ ...x, puntos: r.datos.puntos, mi_voto: r.datos.mi_voto }))
      else {
        actualizar(p.id, () => p)
        toast.error(r.mensaje)
      }
    })
  }

  function alConfirmar(p: PublicacionForo, sigue: boolean | null) {
    actualizar(p.id, (x) => conConfirmacion(x, sigue))
    void confirmarAviso(p.id, sigue).then((r) => {
      if (r.ok) actualizar(p.id, (x) => ({ ...x, ...r.datos }))
      else {
        actualizar(p.id, () => p)
        toast.error(r.mensaje)
      }
    })
  }

  async function cargarMas() {
    setCargandoMas(true)
    const r = await traerFeed({ categoria: clave, orden, aerolinea, pagina: pagina + 1 })
    setCargandoMas(false)
    if (r.estado !== "listo") {
      toast.error("No pudimos traer más publicaciones.")
      return
    }
    // Una publicación nueva corre el orden: se evita repetir la que ya está.
    setPublicaciones((lista) => [...lista, ...r.datos.publicaciones.filter((n) => !lista.some((p) => p.id === n.id))])
    setHayMas(r.datos.hay_mas)
    setPagina((n) => n + 1)
  }

  const cambiarOrden = (nuevo: OrdenForo) => {
    const siguiente = new URLSearchParams(params)
    if (nuevo === "tendencia") siguiente.delete("orden")
    else siguiente.set("orden", nuevo)
    setParams(siguiente, { replace: true })
  }

  const quitarAerolinea = () => {
    const siguiente = new URLSearchParams(params)
    siguiente.delete("aerolinea")
    setParams(siguiente, { replace: true })
  }

  const nombreAerolinea =
    tendencias?.aerolineas.find((a) => a.id === aerolinea)?.nombre ??
    publicaciones.find((p) => p.aerolinea?.id === aerolinea)?.aerolinea?.nombre ??
    "la aerolínea"

  return (
    <div className="@container mx-auto max-w-[1400px] px-4 py-5 pb-24 sm:px-8 sm:py-8">
      <CabeceraForo categoria={categoria} usuario={identidad?.username ?? null} foto={identidad?.photoUrl ?? null} />

      <div className="mt-6 grid grid-cols-1 gap-6 @5xl:grid-cols-[minmax(0,1fr)_300px] @7xl:grid-cols-[210px_minmax(0,1fr)_300px]">
        <div className="min-w-0 @5xl:col-span-2 @7xl:sticky @7xl:top-24 @7xl:col-span-1 @7xl:self-start">
          <MenuCategorias activa={clave} tendencias={tendencias} />
        </div>

        <section className="min-w-0" aria-label="Publicaciones">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex rounded-full surface p-1" role="group" aria-label="Ordenar publicaciones">
              {ORDENES_FORO.map((o) => (
                <button
                  key={o.clave}
                  type="button"
                  onClick={() => cambiarOrden(o.clave)}
                  aria-pressed={orden === o.clave}
                  className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors duration-200 ${
                    orden === o.clave ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {o.nombre}
                </button>
              ))}
            </div>
            {aerolinea && (
              <button
                type="button"
                onClick={quitarAerolinea}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-foreground/[0.06] px-3 text-[12.5px] font-semibold text-foreground hover:bg-foreground/10"
              >
                Solo {nombreAerolinea} <X className="h-3.5 w-3.5" aria-label="Quitar filtro" />
              </button>
            )}
          </div>

          {estado === "cargando" ? (
            <div className="mt-4 flex flex-col gap-3" aria-busy>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-[168px] animate-pulse rounded-3xl bg-muted" />
              ))}
            </div>
          ) : estado === "error" ? (
            <div className="mt-6">
              <EstadoError
                titulo="No pudimos cargar la comunidad"
                mensaje="Revisa tu conexión e inténtalo de nuevo."
                acciones={
                  <button type="button" onClick={() => setIntento((n) => n + 1)} className={appButtonClass({ size: "lg" })} style={appButtonStyle()}>
                    <RotateCcw className="h-4 w-4" /> Intentar de nuevo
                  </button>
                }
              />
            </div>
          ) : publicaciones.length === 0 ? (
            <Vacio categoria={clave} nombre={categoria?.nombre ?? null} />
          ) : (
            <ol className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
              {publicaciones.map((p) => (
                <li key={p.id}>
                  <TarjetaPublicacion publicacion={p} onVotar={(v) => alVotar(p, v)} onConfirmar={(s) => alConfirmar(p, s)} />
                </li>
              ))}
            </ol>
          )}

          {estado === "listo" && hayMas && (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => void cargarMas()}
                disabled={cargandoMas}
                className="inline-flex h-10 items-center rounded-full border border-border bg-card px-5 text-[13px] font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-60"
              >
                {cargandoMas ? "Cargando" : "Ver más publicaciones"}
              </button>
            </div>
          )}
        </section>

        <div className="min-w-0 @7xl:sticky @7xl:top-24 @7xl:self-start">
          <PanelLateral tendencias={tendencias} />
        </div>
      </div>
    </div>
  )
}

function Vacio({ categoria, nombre }: { categoria: string | null; nombre: string | null }) {
  return (
    <div className="mt-4 flex flex-col items-center rounded-3xl surface px-6 py-12 text-center">
      {categoria ? <PlacaCategoria clave={categoria} tamano={64} /> : null}
      <p className="display-archivo m-0 mt-4 text-[20px] font-bold text-foreground">
        {nombre ? `Todavía no hay nada en ${nombre}` : "Todavía no hay publicaciones"}
      </p>
      <p className="m-0 mt-2 max-w-[420px] text-[14px] leading-relaxed text-muted-foreground">
        La primera la puedes escribir tú: lo que te pasó en un proceso, un curso que te sirvió o una pregunta que tengas.
      </p>
      <Link
        to={`/app/comunidad/publicar${categoria ? `?categoria=${categoria}` : ""}`}
        className={`${appButtonClass({ size: "lg" })} mt-5`}
        style={appButtonStyle()}
      >
        <PenLine className="h-4 w-4" /> Escribir la primera
      </Link>
    </div>
  )
}
