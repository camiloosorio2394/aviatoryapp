import { useEffect, useState, type FormEvent } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { ArrowLeft, MapPin, UsersRound } from "lucide-react"
import { toast } from "sonner"
import { PlacaCategoria } from "@/components/foro/Piezas"
import { LogoDeAerolinea } from "@/components/foro/TarjetaPublicacion"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { publicar, traerAerolineasDelForo } from "@/services/foro"
import { CATEGORIAS_FORO, categoriaForo, rutaPublicacion, type AerolineaForo, type ClaveCategoria } from "@/lib/foro"

const MINIMO_TITULO = 8
const MAXIMO_TITULO = 140
const MAXIMO_CUERPO = 10000

/**
 * Publicar en la comunidad. Primero de qué se trata (la categoría pide su
 * propio título y texto); los avisos rápidos piden además la aerolínea.
 * Lo publicado lo leen todos los pilotos de Aviatory, y así se dice antes de
 * publicar.
 */
export function PublicarForo() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const inicial = categoriaForo(params.get("categoria") ?? "")?.clave ?? null

  const [categoria, setCategoria] = useState<ClaveCategoria | null>(inicial)
  const [titulo, setTitulo] = useState("")
  const [cuerpo, setCuerpo] = useState("")
  const [aerolinea, setAerolinea] = useState<number | null>(null)
  const [ciudad, setCiudad] = useState("")
  const [anonima, setAnonima] = useState(false)
  const [aerolineas, setAerolineas] = useState<AerolineaForo[]>([])
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    let cancelado = false
    void traerAerolineasDelForo().then((lista) => {
      if (!cancelado) setAerolineas(lista)
    })
    return () => {
      cancelado = true
    }
  }, [])

  const elegida = categoria ? categoriaForo(categoria) : undefined
  const esAviso = categoria === "avisos"
  const largoTitulo = titulo.trim().length
  const listo =
    Boolean(categoria) &&
    largoTitulo >= MINIMO_TITULO &&
    largoTitulo <= MAXIMO_TITULO &&
    cuerpo.length <= MAXIMO_CUERPO &&
    (!esAviso || aerolinea !== null) &&
    !enviando

  async function enviar(evento: FormEvent) {
    evento.preventDefault()
    if (!listo || !categoria) return
    setEnviando(true)
    const r = await publicar({
      categoria,
      titulo: titulo.trim(),
      cuerpo: cuerpo.trim(),
      aerolinea,
      ciudad: esAviso && ciudad.trim() ? ciudad.trim() : null,
      anonima,
    })
    setEnviando(false)
    if (!r.ok) {
      toast.error(r.mensaje)
      return
    }
    toast.success("Publicado en la comunidad")
    navigate(rutaPublicacion({ id: r.datos, titulo: titulo.trim() }), { replace: true })
  }

  return (
    <div className="@container mx-auto max-w-[880px] px-4 py-5 pb-24 sm:px-8 sm:py-8">
      <Link to="/app/comunidad" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Comunidad
      </Link>
      <h1 className="display-archivo m-0 mt-4 text-[30px] font-extrabold leading-tight text-foreground sm:text-[36px]">Publicar</h1>
      <p className="m-0 mt-2 inline-flex items-start gap-2 text-[13.5px] leading-relaxed text-muted-foreground">
        <UsersRound className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        Lo que publiques lo leen todos los pilotos de Aviatory, con tu usuario o sin él.
      </p>

      <form onSubmit={(e) => void enviar(e)} className="mt-6 flex flex-col gap-5">
        <fieldset className="m-0 border-0 p-0">
          <legend className="rotulo-mono p-0 text-[10.5px] text-muted-foreground">¿De qué se trata?</legend>
          <div className="mt-3 grid grid-cols-1 gap-2.5 @xl:grid-cols-2 @3xl:grid-cols-3" role="radiogroup">
            {CATEGORIAS_FORO.map((c) => {
              const activa = categoria === c.clave
              return (
                <button
                  key={c.clave}
                  type="button"
                  role="radio"
                  aria-checked={activa}
                  onClick={() => setCategoria(c.clave)}
                  className={`flex min-w-0 items-start gap-3 rounded-2xl border bg-card p-3.5 text-left transition-colors ${
                    activa ? "border-foreground ring-1 ring-foreground" : "border-border hover:border-foreground/30"
                  }`}
                >
                  <PlacaCategoria clave={c.clave} tamano={40} />
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-foreground">{c.nombre}</span>
                    <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-snug text-muted-foreground">{c.descripcion}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </fieldset>

        {elegida && (
          <div className="flex flex-col gap-5 rounded-3xl surface p-5 sm:p-6">
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor="foro-titulo" className="text-[13.5px] font-semibold text-foreground">
                  Título
                </label>
                <span className={`text-[12px] tabular-nums ${largoTitulo > MAXIMO_TITULO ? "text-destructive" : "text-muted-foreground"}`}>
                  {largoTitulo}/{MAXIMO_TITULO}
                </span>
              </div>
              <input
                id="foro-titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                maxLength={MAXIMO_TITULO + 20}
                placeholder={elegida.guiaTitulo}
                className="mt-2 block h-12 w-full rounded-2xl border border-border bg-background px-4 text-[15px] text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground/30"
              />
              {largoTitulo > 0 && largoTitulo < MINIMO_TITULO && (
                <p className="m-0 mt-1.5 text-[12px] text-muted-foreground">Un poco más: al menos {MINIMO_TITULO} caracteres.</p>
              )}
            </div>

            <div>
              <p className="m-0 text-[13.5px] font-semibold text-foreground">
                Aerolínea {esAviso ? <span className="font-normal text-muted-foreground">(obligatoria en un aviso)</span> : <span className="font-normal text-muted-foreground">(opcional)</span>}
              </p>
              <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Aerolínea">
                {!esAviso && (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={aerolinea === null}
                    onClick={() => setAerolinea(null)}
                    className={`inline-flex h-11 items-center rounded-2xl border px-3.5 text-[13px] font-semibold ${
                      aerolinea === null ? "border-foreground ring-1 ring-foreground" : "border-border text-muted-foreground hover:border-foreground/30"
                    }`}
                  >
                    Ninguna
                  </button>
                )}
                {aerolineas.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    role="radio"
                    aria-checked={aerolinea === a.id}
                    aria-label={a.nombre}
                    onClick={() => setAerolinea(a.id)}
                    className={`inline-flex h-11 items-center rounded-2xl border bg-card px-3.5 ${
                      aerolinea === a.id ? "border-foreground ring-1 ring-foreground" : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <LogoDeAerolinea aerolinea={a} className="h-5" />
                  </button>
                ))}
              </div>
            </div>

            {esAviso && (
              <div>
                <label htmlFor="foro-ciudad" className="text-[13.5px] font-semibold text-foreground">
                  Ciudad <span className="font-normal text-muted-foreground">(opcional)</span>
                </label>
                <div className="relative mt-2">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                  <input
                    id="foro-ciudad"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    maxLength={60}
                    placeholder="Bogotá, Medellín, Ciudad de Panamá…"
                    className="block h-11 w-full rounded-2xl border border-border bg-background pl-10 pr-4 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground/30"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor="foro-cuerpo" className="text-[13.5px] font-semibold text-foreground">
                  Texto <span className="font-normal text-muted-foreground">{esAviso ? "(opcional)" : ""}</span>
                </label>
                {cuerpo.length > MAXIMO_CUERPO * 0.8 && (
                  <span className={`text-[12px] tabular-nums ${cuerpo.length > MAXIMO_CUERPO ? "text-destructive" : "text-muted-foreground"}`}>
                    {cuerpo.length}/{MAXIMO_CUERPO}
                  </span>
                )}
              </div>
              <textarea
                id="foro-cuerpo"
                value={cuerpo}
                onChange={(e) => setCuerpo(e.target.value)}
                rows={esAviso ? 3 : 9}
                placeholder={elegida.guiaCuerpo}
                className="mt-2 block w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-[15px] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground/30"
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-muted/50 p-3.5">
              <input type="checkbox" checked={anonima} onChange={(e) => setAnonima(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="text-[13px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Publicar sin mi nombre.</span> Nadie verá tu usuario. Aviatory sí sabe
                quién la publicó y aplica las mismas normas.
              </span>
            </label>

            <div className="flex flex-col gap-3 border-t border-border pt-4 @xl:flex-row @xl:items-center @xl:justify-between">
              <p className="m-0 text-[12px] leading-relaxed text-muted-foreground">
                Sin datos personales de otros ni documentos internos de una aerolínea. Lo que tres pilotos reportan se oculta.
              </p>
              <button type="submit" disabled={!listo} className={`${appButtonClass({ size: "lg" })} shrink-0 disabled:opacity-50`} style={appButtonStyle()}>
                {enviando ? "Publicando" : "Publicar"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
