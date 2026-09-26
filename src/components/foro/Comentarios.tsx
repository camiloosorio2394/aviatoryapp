import { useMemo, useState, type KeyboardEvent, type ReactNode } from "react"
import { Flag, MessageCircle, Trash2, X } from "lucide-react"
import { toast } from "sonner"
import { Autor, Votos } from "@/components/foro/Piezas"
import { TextoConEnlaces } from "@/components/foro/TarjetaPublicacion"
import { MOTIVOS_REPORTE, reportar, type MotivoReporte } from "@/services/foro"
import { haceCuanto, type ComentarioForo } from "@/lib/foro"

/** Escribir un comentario o una respuesta. Cmd/Ctrl + Enter lo envía. */
export function CompositorComentario({
  onEnviar,
  placeholder = "Aporta a la conversación",
  autoFocus = false,
  onCancelar,
}: {
  /** Devuelve si se publicó: solo entonces se borra lo escrito. */
  onEnviar: (texto: string, anonimo: boolean) => Promise<boolean>
  placeholder?: string
  autoFocus?: boolean
  onCancelar?: () => void
}) {
  const [texto, setTexto] = useState("")
  const [anonimo, setAnonimo] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const listo = texto.trim().length > 0 && !enviando

  async function enviar() {
    if (!listo) return
    setEnviando(true)
    const ok = await onEnviar(texto.trim(), anonimo)
    setEnviando(false)
    if (ok) {
      setTexto("")
      setAnonimo(false)
      onCancelar?.()
    }
  }

  function alTeclear(evento: KeyboardEvent<HTMLTextAreaElement>) {
    if (evento.key === "Enter" && (evento.metaKey || evento.ctrlKey)) {
      evento.preventDefault()
      void enviar()
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-background transition-colors focus-within:border-foreground/30">
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={alTeclear}
        maxLength={5000}
        rows={autoFocus ? 2 : 3}
        autoFocus={autoFocus}
        placeholder={placeholder}
        aria-label={placeholder}
        className="block w-full resize-y rounded-t-2xl bg-transparent px-3.5 py-3 text-[14px] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-2.5 py-2">
        <label className="inline-flex cursor-pointer items-center gap-2 pl-1 text-[12px] text-muted-foreground">
          <input type="checkbox" checked={anonimo} onChange={(e) => setAnonimo(e.target.checked)} className="h-3.5 w-3.5" />
          Sin mi nombre
        </label>
        <div className="flex items-center gap-1.5">
          {onCancelar && (
            <button
              type="button"
              onClick={onCancelar}
              className="inline-flex h-8 items-center rounded-full px-3 text-[12.5px] font-semibold text-muted-foreground hover:bg-muted"
            >
              Cancelar
            </button>
          )}
          <button
            type="button"
            onClick={() => void enviar()}
            disabled={!listo}
            className="inline-flex h-8 items-center rounded-full bg-foreground px-4 text-[12.5px] font-semibold text-background transition-opacity disabled:opacity-40"
          >
            {enviando ? "Publicando" : "Comentar"}
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Reportar una publicación o un comentario. Con tres reportes de pilotos
 * distintos se oculta hasta que alguien lo revise.
 */
export function ReportarForo({
  objetivo,
  compacto = false,
}: {
  objetivo: { publicacion: number } | { comentario: number }
  compacto?: boolean
}) {
  const [abierto, setAbierto] = useState(false)
  const [motivo, setMotivo] = useState<MotivoReporte>("spam")
  const [enviando, setEnviando] = useState(false)

  async function enviar() {
    setEnviando(true)
    const r = await reportar(objetivo, motivo)
    setEnviando(false)
    if (!r.ok) {
      toast.error(r.mensaje)
      return
    }
    setAbierto(false)
    toast.success(r.datos ? "Gracias. Lo vamos a revisar." : "Ya lo habías reportado. Lo vamos a revisar.")
  }

  return (
    <span className="relative z-10 inline-flex">
      <button
        type="button"
        onClick={() => setAbierto((a) => !a)}
        aria-expanded={abierto}
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${
          compacto ? "h-7 text-[12px]" : "h-8 text-[12.5px]"
        }`}
      >
        <Flag className="h-3.5 w-3.5" aria-hidden /> Reportar
      </button>
      {abierto && (
        <div
          role="dialog"
          aria-label="Reportar"
          className="absolute right-0 top-full z-30 mt-1.5 w-64 rounded-2xl border border-border bg-card p-3 shadow-[0_16px_40px_-16px_rgb(0_0_0_/_30%)]"
        >
          <div className="flex items-center justify-between">
            <p className="m-0 text-[13px] font-semibold text-foreground">¿Qué pasa con esto?</p>
            <button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar" className="grid h-6 w-6 place-items-center rounded-full hover:bg-muted">
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
          <div className="mt-2 flex flex-col gap-1" role="radiogroup">
            {MOTIVOS_REPORTE.map((m) => (
              <label key={m.clave} className="flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1 text-[13px] text-foreground hover:bg-muted">
                <input type="radio" name="motivo" checked={motivo === m.clave} onChange={() => setMotivo(m.clave)} />
                {m.nombre}
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={() => void enviar()}
            disabled={enviando}
            className="mt-2.5 inline-flex h-8 w-full items-center justify-center rounded-full bg-foreground text-[12.5px] font-semibold text-background disabled:opacity-50"
          >
            {enviando ? "Enviando" : "Enviar reporte"}
          </button>
        </div>
      )}
    </span>
  )
}

interface NodoComentario {
  comentario: ComentarioForo
  respuestas: ComentarioForo[]
}

/**
 * Los comentarios en dos niveles, como el foro los guarda. Arriba los que más
 * puntos tienen; las respuestas, en el orden en que llegaron.
 */
export function ListaComentarios({
  comentarios,
  sesion,
  onResponder,
  onVotar,
  onBorrar,
}: {
  comentarios: ComentarioForo[]
  sesion: boolean
  onResponder: (padre: number, texto: string, anonimo: boolean) => Promise<boolean>
  onVotar: (comentario: ComentarioForo, valor: -1 | 0 | 1) => void
  onBorrar: (comentario: ComentarioForo) => void
}) {
  const arbol = useMemo<NodoComentario[]>(() => {
    const ids = new Set(comentarios.map((c) => c.id))
    const hijos = new Map<number, ComentarioForo[]>()
    for (const c of comentarios) {
      if (c.padre_id !== null && ids.has(c.padre_id)) hijos.set(c.padre_id, [...(hijos.get(c.padre_id) ?? []), c])
    }
    return comentarios
      .filter((c) => c.padre_id === null || !ids.has(c.padre_id))
      .sort((a, b) => b.puntos - a.puntos || Date.parse(a.creado_en) - Date.parse(b.creado_en))
      .map((c) => ({
        comentario: c,
        respuestas: (hijos.get(c.id) ?? []).sort((a, b) => Date.parse(a.creado_en) - Date.parse(b.creado_en)),
      }))
  }, [comentarios])

  return (
    <ol className="m-0 flex list-none flex-col gap-5 p-0">
      {arbol.map(({ comentario, respuestas }) => (
        <ItemComentario
          key={comentario.id}
          comentario={comentario}
          sesion={sesion}
          onResponder={onResponder}
          onVotar={onVotar}
          onBorrar={onBorrar}
        >
          {respuestas.length > 0 && (
            <ol className="m-0 mt-4 flex list-none flex-col gap-4 border-l-2 border-border p-0 pl-4">
              {respuestas.map((r) => (
                <ItemComentario
                  key={r.id}
                  comentario={r}
                  sesion={sesion}
                  // Responder a una respuesta cuelga del mismo raíz, como en la base.
                  padreDeRespuesta={comentario.id}
                  onResponder={onResponder}
                  onVotar={onVotar}
                  onBorrar={onBorrar}
                />
              ))}
            </ol>
          )}
        </ItemComentario>
      ))}
    </ol>
  )
}

function ItemComentario({
  comentario: c,
  sesion,
  padreDeRespuesta,
  onResponder,
  onVotar,
  onBorrar,
  children,
}: {
  comentario: ComentarioForo
  sesion: boolean
  padreDeRespuesta?: number
  onResponder: (padre: number, texto: string, anonimo: boolean) => Promise<boolean>
  onVotar: (comentario: ComentarioForo, valor: -1 | 0 | 1) => void
  onBorrar: (comentario: ComentarioForo) => void
  children?: ReactNode
}) {
  const [respondiendo, setRespondiendo] = useState(false)
  const visible = c.estado === "publicado"
  return (
    <li className="min-w-0">
      <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[12.5px] text-muted-foreground">
        {visible ? <Autor autor={c.autor} destacado={c.es_del_autor} /> : <span className="italic">Comentario {c.estado}</span>}
        <span aria-hidden>·</span>
        <time dateTime={c.creado_en}>{haceCuanto(c.creado_en)}</time>
      </div>
      {visible && <TextoConEnlaces texto={c.cuerpo} className="mt-1.5 text-[14px] leading-relaxed text-foreground" />}
      {visible && (
        <div className="-ml-1 mt-1.5 flex flex-wrap items-center gap-0.5">
          <Votos puntos={c.puntos} miVoto={c.mi_voto} onVotar={(v) => onVotar(c, v)} compacto />
          {sesion && (
            <button
              type="button"
              onClick={() => setRespondiendo((r) => !r)}
              className="inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden /> Responder
            </button>
          )}
          {sesion &&
            (c.es_mio ? (
              <button
                type="button"
                onClick={() => onBorrar(c)}
                className="inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden /> Borrar
              </button>
            ) : (
              <ReportarForo objetivo={{ comentario: c.id }} compacto />
            ))}
        </div>
      )}
      {respondiendo && (
        <div className="mt-2.5">
          <CompositorComentario
            autoFocus
            placeholder="Escribe tu respuesta"
            onCancelar={() => setRespondiendo(false)}
            onEnviar={(texto, anonimo) => onResponder(padreDeRespuesta ?? c.id, texto, anonimo)}
          />
        </div>
      )}
      {children}
    </li>
  )
}
