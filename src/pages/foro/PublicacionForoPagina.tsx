import { useEffect, useState } from "react"
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, MapPin, MessageCircle, PenLine, Radar, RotateCcw, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Seo } from "@/components/Seo"
import { EstadoError } from "@/components/EstadoError"
import { useSession } from "@/hooks/useSession"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { Autor, BotonCompartir, InvitacionSesion, PlacaCategoria, Votos } from "@/components/foro/Piezas"
import { AvisoVigencia, LogoDeAerolinea, TextoConEnlaces } from "@/components/foro/TarjetaPublicacion"
import { CompositorComentario, ListaComentarios, ReportarForo } from "@/components/foro/Comentarios"
import { DatosEstructurados } from "@/components/foro/DatosEstructurados"
import { PanelLateral } from "@/components/foro/Laterales"
import {
  borrarComentario,
  borrarPublicacion,
  comentar,
  confirmarAviso,
  editarPublicacion,
  traerPublicacion,
  traerTendencias,
  votar,
  votarComentario,
} from "@/services/foro"
import {
  categoriaForo,
  conConfirmacion,
  conVoto,
  haceCuanto,
  rutaCategoria,
  rutaEquivalente,
  rutaPublicacion,
  slugDeTitulo,
  type ComentarioForo,
  type DetalleForo,
  type PublicacionForo,
  type TendenciasForo,
} from "@/lib/foro"
import { datosEstructurados, metaDePublicacion } from "@/lib/foroSeo"

/**
 * Una publicación con su conversación. Sin sesión se lee completa, con los
 * tres comentarios con más puntos; para ver el resto, votar o comentar hay
 * que entrar. La dirección canónica lleva el título en letras, y si llega con
 * otro (el título cambió de forma o alguien lo recortó) se corrige.
 */
export function PublicacionForoPagina({ donde }: { donde: "publica" | "app" }) {
  const { id: idParam, slug } = useParams()
  const id = Number(idParam)
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useSession()
  const sesion = Boolean(user)

  const [carga, setCarga] = useState<{ consulta: string; estado: "listo" | "no_esta" | "sin_foro" | "error" } | null>(null)
  const [detalle, setDetalle] = useState<DetalleForo | null>(null)
  const [tendencias, setTendencias] = useState<TendenciasForo | null>(null)
  const [editando, setEditando] = useState(false)
  const [borrador, setBorrador] = useState("")
  const [intento, setIntento] = useState(0)

  const consulta = [id, sesion, intento].join("|")
  const estado = carga?.consulta === consulta ? carga.estado : "cargando"

  useEffect(() => {
    if (!Number.isInteger(id) || id <= 0) return
    let cancelado = false
    void traerPublicacion(id).then((r) => {
      if (cancelado) return
      if (r.estado === "listo") setDetalle(r.datos)
      setCarga({ consulta, estado: r.estado === "listo" ? (r.datos ? "listo" : "no_esta") : r.estado })
    })
    return () => {
      cancelado = true
    }
  }, [consulta, id])

  useEffect(() => {
    let cancelado = false
    void traerTendencias().then((r) => {
      if (!cancelado && r.estado === "listo") setTendencias(r.datos)
    })
    return () => {
      cancelado = true
    }
  }, [sesion])

  // La dirección con el título al día: la que se comparte y la que Google guarda.
  const canonica = detalle ? rutaPublicacion(detalle.publicacion, donde) : null
  // Solo con el detalle de esta publicación: al pasar de una a otra, el de la
  // anterior sigue ahí mientras carga la nueva.
  const deEsta = estado === "listo" && detalle?.publicacion.id === id ? detalle : null
  useEffect(() => {
    if (deEsta && slug !== slugDeTitulo(deEsta.publicacion.titulo)) {
      navigate(`${rutaPublicacion(deEsta.publicacion, donde)}${location.hash}`, { replace: true })
    }
  }, [deEsta, slug, donde, navigate, location.hash])

  if (!Number.isInteger(id) || id <= 0) return <Navigate to={rutaCategoria(null, donde)} replace />

  const p = detalle?.publicacion
  const categoria = p ? categoriaForo(p.categoria) : undefined
  const pedirSesion = () =>
    navigate("/login", { state: { from: { pathname: rutaEquivalente(canonica ?? location.pathname, "app") } } })

  const cambiarPublicacion = (cambio: (x: PublicacionForo) => PublicacionForo) =>
    setDetalle((d) => (d ? { ...d, publicacion: cambio(d.publicacion) } : d))
  const cambiarComentario = (idComentario: number, cambio: (c: ComentarioForo) => ComentarioForo) =>
    setDetalle((d) => (d ? { ...d, comentarios: d.comentarios.map((c) => (c.id === idComentario ? cambio(c) : c)) } : d))

  function alVotar(valor: -1 | 0 | 1) {
    if (!p) return
    if (!sesion) return pedirSesion()
    const antes = p
    cambiarPublicacion((x) => conVoto(x, valor))
    void votar(p.id, valor).then((r) => {
      if (r.ok) cambiarPublicacion((x) => ({ ...x, puntos: r.datos.puntos, mi_voto: r.datos.mi_voto }))
      else {
        cambiarPublicacion(() => antes)
        toast.error(r.mensaje)
      }
    })
  }

  function alConfirmar(sigue: boolean | null) {
    if (!p) return
    if (!sesion) return pedirSesion()
    const antes = p
    cambiarPublicacion((x) => conConfirmacion(x, sigue))
    void confirmarAviso(p.id, sigue).then((r) => {
      if (r.ok) cambiarPublicacion((x) => ({ ...x, ...r.datos }))
      else {
        cambiarPublicacion(() => antes)
        toast.error(r.mensaje)
      }
    })
  }

  async function alComentar(texto: string, anonimo: boolean, padre: number | null = null): Promise<boolean> {
    if (!p) return false
    const r = await comentar(p.id, texto, { padre, anonimo })
    if (!r.ok) {
      toast.error(r.mensaje)
      return false
    }
    setDetalle((d) =>
      d
        ? {
            ...d,
            comentarios: [...d.comentarios, r.datos],
            total_comentarios: d.total_comentarios + 1,
            publicacion: { ...d.publicacion, comentarios: d.publicacion.comentarios + 1 },
          }
        : d,
    )
    return true
  }

  function alVotarComentario(c: ComentarioForo, valor: -1 | 0 | 1) {
    if (!sesion) return pedirSesion()
    cambiarComentario(c.id, (x) => conVoto(x, valor))
    void votarComentario(c.id, valor).then((r) => {
      if (r.ok) cambiarComentario(c.id, (x) => ({ ...x, puntos: r.datos.puntos, mi_voto: r.datos.mi_voto }))
      else {
        cambiarComentario(c.id, () => c)
        toast.error(r.mensaje)
      }
    })
  }

  async function alBorrarComentario(c: ComentarioForo) {
    if (!window.confirm("¿Borrar tu comentario?")) return
    const r = await borrarComentario(c.id)
    if (!r.ok) return toast.error(r.mensaje)
    cambiarComentario(c.id, (x) => ({ ...x, estado: "eliminado", cuerpo: "", autor: null }))
    setDetalle((d) =>
      d
        ? {
            ...d,
            total_comentarios: Math.max(d.total_comentarios - 1, 0),
            publicacion: { ...d.publicacion, comentarios: Math.max(d.publicacion.comentarios - 1, 0) },
          }
        : d,
    )
  }

  async function alBorrar() {
    if (!p || !window.confirm("¿Borrar tu publicación? Sus comentarios dejan de verse.")) return
    const r = await borrarPublicacion(p.id)
    if (!r.ok) return toast.error(r.mensaje)
    toast.success("Publicación borrada")
    navigate(rutaCategoria(null, donde), { replace: true })
  }

  async function alGuardarEdicion() {
    if (!p) return
    const r = await editarPublicacion(p.id, borrador)
    if (!r.ok) return toast.error(r.mensaje)
    cambiarPublicacion((x) => ({ ...x, cuerpo: borrador.trim(), editada_en: new Date().toISOString() }))
    setEditando(false)
  }

  if (estado === "sin_foro") return <Navigate to={rutaCategoria(null, donde)} replace />

  const meta = detalle ? metaDePublicacion(detalle) : null
  const ocultos = detalle ? detalle.total_comentarios - detalle.comentarios.filter((c) => c.estado === "publicado").length : 0

  return (
    <div className="@container mx-auto max-w-[1180px] px-4 py-5 pb-24 sm:px-8 sm:py-8">
      {donde === "publica" && meta && <Seo title={meta.titulo} description={meta.descripcion} path={meta.ruta} />}
      {donde === "publica" && detalle && <DatosEstructurados datos={datosEstructurados(detalle, window.location.origin)} />}

      <Link
        to={rutaCategoria(categoria?.clave ?? null, donde)}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> {categoria ? categoria.nombre : "Comunidad"}
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-6 @4xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          {estado === "cargando" ? (
            <div className="flex flex-col gap-3" aria-busy>
              <div className="h-[260px] animate-pulse rounded-3xl bg-muted" />
              <div className="h-[140px] animate-pulse rounded-3xl bg-muted" />
            </div>
          ) : estado === "error" ? (
            <EstadoError
              titulo="No pudimos cargar la publicación"
              mensaje="Revisa tu conexión e inténtalo de nuevo."
              acciones={
                <button type="button" onClick={() => setIntento((n) => n + 1)} className={appButtonClass({ size: "lg" })} style={appButtonStyle()}>
                  <RotateCcw className="h-4 w-4" /> Intentar de nuevo
                </button>
              }
            />
          ) : estado === "no_esta" || !detalle || !p ? (
            <div className="rounded-3xl surface px-6 py-12 text-center">
              <p className="display-archivo m-0 text-[20px] font-bold text-foreground">Esta publicación ya no está</p>
              <p className="m-0 mt-2 text-[14px] text-muted-foreground">Su autor la borró o la estamos revisando.</p>
              <Link to={rutaCategoria(null, donde)} className={`${appButtonClass({ size: "lg" })} mt-5`} style={appButtonStyle()}>
                Ver la comunidad
              </Link>
            </div>
          ) : (
            <>
              <article className="rounded-3xl surface p-5 sm:p-7">
                {p.estado === "oculta" && (
                  <p className="m-0 mb-4 rounded-2xl px-3.5 py-2.5 text-[13px]" style={{ background: "color-mix(in oklab, var(--av-warn-fg) 10%, transparent)", color: "var(--av-warn-fg)" }}>
                    Varios pilotos la reportaron: solo tú la ves mientras la revisamos.
                  </p>
                )}
                <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5 text-[13px] text-muted-foreground">
                  <PlacaCategoria clave={p.categoria} tamano={30} />
                  <Link to={rutaCategoria(p.categoria, donde)} className="font-semibold text-foreground hover:underline">
                    {categoria?.nombre}
                  </Link>
                  <span aria-hidden>·</span>
                  <Autor autor={p.autor} />
                  <span aria-hidden>·</span>
                  <time dateTime={p.creada_en}>{haceCuanto(p.creada_en)}</time>
                  {p.editada_en && <span className="text-[12px]">(editada)</span>}
                </div>

                {p.categoria === "avisos" && (
                  <p className="rotulo-mono m-0 mt-4 inline-flex items-center gap-1.5 text-[10.5px]" style={{ color: "var(--marca-acento)" }}>
                    <Radar className="h-3.5 w-3.5" aria-hidden /> Aviso rápido
                    {p.ciudad && (
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" aria-hidden /> {p.ciudad}
                      </span>
                    )}
                  </p>
                )}

                <h1 className="display-archivo m-0 mt-3 text-[26px] font-extrabold leading-[1.15] text-foreground sm:text-[32px]">{p.titulo}</h1>

                {p.aerolinea && (
                  <div className="mt-4">
                    <LogoDeAerolinea aerolinea={p.aerolinea} className="h-6" />
                  </div>
                )}

                {editando ? (
                  <div className="mt-4">
                    <textarea
                      value={borrador}
                      onChange={(e) => setBorrador(e.target.value)}
                      maxLength={10000}
                      rows={8}
                      aria-label="Texto de la publicación"
                      className="block w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-[15px] leading-relaxed outline-none focus:border-foreground/30"
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <button type="button" onClick={() => setEditando(false)} className="inline-flex h-9 items-center rounded-full px-4 text-[13px] font-semibold text-muted-foreground hover:bg-muted">
                        Cancelar
                      </button>
                      <button type="button" onClick={() => void alGuardarEdicion()} className="inline-flex h-9 items-center rounded-full bg-foreground px-4 text-[13px] font-semibold text-background">
                        Guardar
                      </button>
                    </div>
                  </div>
                ) : (
                  p.cuerpo && <TextoConEnlaces texto={p.cuerpo} className="mt-4 text-[15.5px] leading-[1.7] text-foreground" />
                )}

                {p.categoria === "avisos" && <AvisoVigencia publicacion={p} onConfirmar={alConfirmar} />}

                <div className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-border pt-4">
                  <Votos puntos={p.puntos} miVoto={p.mi_voto} onVotar={alVotar} />
                  <a href="#comentarios" className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[13px] font-semibold text-muted-foreground hover:bg-muted hover:text-foreground">
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    {detalle.total_comentarios} {detalle.total_comentarios === 1 ? "comentario" : "comentarios"}
                  </a>
                  <BotonCompartir ruta={rutaPublicacion(p, "publica")} titulo={p.titulo} />
                  <span className="ml-auto flex items-center gap-1">
                    {p.es_mia ? (
                      <>
                        {!editando && (
                          <button
                            type="button"
                            onClick={() => {
                              setBorrador(p.cuerpo)
                              setEditando(true)
                            }}
                            className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            <PenLine className="h-3.5 w-3.5" aria-hidden /> Editar
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => void alBorrar()}
                          className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden /> Borrar
                        </button>
                      </>
                    ) : (
                      sesion && <ReportarForo objetivo={{ publicacion: p.id }} />
                    )}
                  </span>
                </div>
              </article>

              <section id="comentarios" className="mt-4 scroll-mt-24 rounded-3xl surface p-5 sm:p-7" aria-labelledby="foro-comentarios">
                <h2 id="foro-comentarios" className="display-archivo m-0 text-[19px] font-bold text-foreground">
                  {detalle.total_comentarios === 0
                    ? "Sé el primero en comentar"
                    : `${detalle.total_comentarios} ${detalle.total_comentarios === 1 ? "comentario" : "comentarios"}`}
                </h2>
                {sesion && (
                  <div className="mt-4">
                    <CompositorComentario onEnviar={(texto, anonimo) => alComentar(texto, anonimo)} />
                  </div>
                )}
                {detalle.comentarios.length > 0 && (
                  <div className="mt-6">
                    <ListaComentarios
                      comentarios={detalle.comentarios}
                      sesion={sesion}
                      onResponder={(padre, texto, anonimo) => alComentar(texto, anonimo, padre)}
                      onVotar={alVotarComentario}
                      onBorrar={(c) => void alBorrarComentario(c)}
                    />
                  </div>
                )}
                {!sesion && (
                  <div className="mt-6">
                    <InvitacionSesion
                      titulo={ocultos > 0 ? `${ocultos} ${ocultos === 1 ? "comentario más" : "comentarios más"} adentro` : "Únete a la conversación"}
                      texto="Crea tu cuenta gratis para leer toda la conversación, comentar y votar. Te toma un minuto."
                    />
                  </div>
                )}
              </section>
            </>
          )}
        </div>

        <div className="min-w-0 @4xl:sticky @4xl:top-24 @4xl:self-start">
          <PanelLateral donde={donde} sesion={sesion} tendencias={tendencias} />
        </div>
      </div>
    </div>
  )
}
