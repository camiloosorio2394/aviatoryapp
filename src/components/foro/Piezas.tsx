import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ArrowBigDown, ArrowBigUp, Check, Flame, Link2, UserRound } from "lucide-react"
import { toast } from "sonner"
import { InsigniaLogro } from "@/components/logros/InsigniaLogro"
import { UserAvatar } from "@/components/UserAvatar"
import { formatearPuntos, nombreDeAutor, rutaEquivalente, type AutorForo } from "@/lib/foro"
import { glifoDeCategoria } from "@/lib/foroGlifos"

/**
 * La placa de una categoría: el mismo trazo de las insignias de Logros
 * (filo de metal, centro navy, glifo blanco) y el dorado de los íconos de la
 * barra lateral. Medallón para todas, para que se lean como una familia.
 */
export function PlacaCategoria({ clave, tamano = 32 }: { clave: string; tamano?: number }) {
  return (
    <InsigniaLogro code={`foro-${clave}`} nivel="gold" conseguido tamano={tamano} icono={glifoDeCategoria(clave)} forma="leccion" />
  )
}

/**
 * Votar a favor o en contra, como en Reddit. Tocar el voto que ya dio lo
 * quita. El a favor va en el acento de la marca; el en contra, en gris: el
 * rojo es de los errores.
 */
export function Votos({
  puntos,
  miVoto,
  onVotar,
  compacto = false,
}: {
  puntos: number
  miVoto: -1 | 0 | 1
  onVotar: (valor: -1 | 0 | 1) => void
  compacto?: boolean
}) {
  const alto = compacto ? "h-8" : "h-9"
  const icono = compacto ? "h-4 w-4" : "h-[18px] w-[18px]"
  return (
    <div className={`relative z-10 inline-flex items-center rounded-full bg-muted/70 ${alto}`} role="group" aria-label={`${puntos} puntos`}>
      <button
        type="button"
        onClick={() => onVotar(miVoto === 1 ? 0 : 1)}
        aria-pressed={miVoto === 1}
        aria-label="Votar a favor"
        className={`grid h-full place-items-center rounded-full transition-colors duration-200 hover:bg-background ${compacto ? "w-8" : "w-9"}`}
        style={miVoto === 1 ? { color: "var(--marca-acento)" } : undefined}
      >
        <ArrowBigUp className={`${icono} ${miVoto === 1 ? "fill-current" : ""}`} aria-hidden />
      </button>
      <span
        className="min-w-[1.4rem] text-center text-[13px] font-bold tabular-nums"
        style={{ color: miVoto === 1 ? "var(--marca-acento)" : miVoto === -1 ? "var(--muted-foreground)" : undefined }}
      >
        {formatearPuntos(puntos)}
      </span>
      <button
        type="button"
        onClick={() => onVotar(miVoto === -1 ? 0 : -1)}
        aria-pressed={miVoto === -1}
        aria-label="Votar en contra"
        className={`grid h-full place-items-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-background hover:text-foreground ${compacto ? "w-8" : "w-9"}`}
      >
        <ArrowBigDown className={`${icono} ${miVoto === -1 ? "fill-current" : ""}`} aria-hidden />
      </button>
    </div>
  )
}

/** Quien escribió: foto, usuario y su racha, o «Piloto anónimo». */
export function Autor({ autor, destacado = false }: { autor: AutorForo | null; destacado?: boolean }) {
  if (!autor) {
    return (
      <span className="inline-flex min-w-0 items-center gap-1.5">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
          <UserRound className="h-3.5 w-3.5" aria-hidden />
        </span>
        <span className="truncate font-medium text-foreground">Piloto anónimo</span>
      </span>
    )
  }
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <UserAvatar username={autor.usuario} photoUrl={autor.foto} size="xs" />
      <span className="truncate font-medium text-foreground">{nombreDeAutor(autor)}</span>
      {destacado && (
        <span
          className="shrink-0 rounded-full px-1.5 py-px text-[10px] font-bold uppercase tracking-wide text-white"
          style={{ background: "var(--marca-acento)" }}
        >
          Autor
        </span>
      )}
      {autor.racha > 0 && (
        <span
          className="inline-flex shrink-0 items-center gap-0.5 text-[11.5px] font-semibold"
          style={{ color: "oklch(0.6 0.17 55)" }}
          title={`Racha de ${autor.racha} ${autor.racha === 1 ? "día" : "días"}`}
        >
          <Flame className="h-3 w-3" aria-hidden />
          {autor.racha}
        </span>
      )}
    </span>
  )
}

/**
 * Compartir la dirección pública, que es la que abre sin cuenta y la que
 * Google indexa. En el celular, el menú de compartir del sistema.
 */
export function BotonCompartir({ ruta, titulo }: { ruta: string; titulo: string }) {
  const [copiado, setCopiado] = useState(false)
  async function compartir() {
    const url = `${window.location.origin}${rutaEquivalente(ruta, "publica")}`
    try {
      if (navigator.share && window.matchMedia?.("(pointer: coarse)").matches) {
        await navigator.share({ title: titulo, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      toast.success("Enlace copiado")
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      // Cancelar el menú de compartir no es un error.
    }
  }
  return (
    <button
      type="button"
      onClick={() => void compartir()}
      className="relative z-10 inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {copiado ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Link2 className="h-3.5 w-3.5" aria-hidden />}
      Compartir
    </button>
  )
}

/**
 * La invitación a entrar, donde lo público se acaba. Vuelve a donde estaba
 * después de entrar (Login lee `state.from`), ya dentro de la app.
 */
export function InvitacionSesion({ titulo, texto, compacta = false }: { titulo: string; texto: string; compacta?: boolean }) {
  const location = useLocation()
  const destino = { from: { pathname: rutaEquivalente(location.pathname, "app") } }
  return (
    <div
      className={`relative overflow-hidden rounded-3xl text-white ${compacta ? "p-5" : "p-6 sm:p-7"}`}
      style={{
        background:
          "radial-gradient(90% 120% at 0% 0%, rgb(58 110 165 / 55%), transparent 60%), linear-gradient(160deg, #10284a, #0b1e3a 60%, #07152a)",
      }}
    >
      <p className="rotulo-mono m-0 text-[10.5px] text-white/60">Comunidad de pilotos</p>
      <p className={`display-archivo m-0 mt-2 font-bold leading-tight ${compacta ? "text-[19px]" : "text-[23px]"}`}>{titulo}</p>
      <p className="m-0 mt-2 text-[13.5px] leading-relaxed text-white/70">{texto}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to="/login?mode=signup"
          state={destino}
          className="inline-flex h-10 items-center rounded-full bg-white px-5 text-[13.5px] font-semibold text-[#0b1e3a] transition-opacity hover:opacity-90"
        >
          Crear cuenta gratis
        </Link>
        <Link
          to="/login"
          state={destino}
          className="inline-flex h-10 items-center rounded-full px-4 text-[13.5px] font-semibold text-white ring-1 ring-inset ring-white/30 transition-colors hover:bg-white/10"
        >
          Ya tengo cuenta
        </Link>
      </div>
    </div>
  )
}
