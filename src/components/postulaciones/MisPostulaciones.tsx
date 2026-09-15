import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Briefcase, PartyPopper } from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SectionTitle } from "@/components/ui/section-title"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import {
  actualizarPostulacion,
  ESTADOS,
  ETAPAS,
  hoyEnColombia,
  registrarPostulacion,
  traerPostulaciones,
  type EstadoPostulacion,
  type EtapaProceso,
  type Postulacion,
} from "@/services/postulaciones"

const OTRA = "otra"

/**
 * Las postulaciones del piloto, dentro de «Para cuál calificas».
 *
 * Va aquí y no en una pantalla propia porque es la misma conversación: arriba
 * está para cuál califica, y esto es a cuál se postuló de verdad. Separarlo
 * sería pedirle que se acuerde de ir a otro sitio a contar lo que pasó.
 *
 * Se trae y se guarda solo, para que agregarlo a la pantalla sean dos líneas.
 */
export function MisPostulaciones({
  userId,
  aerolineas,
}: {
  userId: string
  aerolineas: { id: number; name: string }[]
}) {
  const [lista, setLista] = useState<Postulacion[]>([])
  const [cargando, setCargando] = useState(true)
  const [agregando, setAgregando] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [cual, setCual] = useState("")
  const [otroNombre, setOtroNombre] = useState("")
  const [fecha, setFecha] = useState(hoyEnColombia)

  async function recargar() {
    const p = await traerPostulaciones(userId)
    setLista(p)
    setCargando(false)
  }

  useEffect(() => {
    let cancelado = false
    traerPostulaciones(userId).then((p) => {
      if (cancelado) return
      setLista(p)
      setCargando(false)
    })
    return () => {
      cancelado = true
    }
  }, [userId])

  async function guardar() {
    setGuardando(true)
    try {
      await registrarPostulacion(userId, {
        airlineId: cual === OTRA || cual === "" ? null : Number(cual),
        aerolinea: cual === OTRA ? otroNombre : null,
        postuladaEn: fecha,
      })
      setCual("")
      setOtroNombre("")
      setFecha(hoyEnColombia())
      setAgregando(false)
      toast.success("Postulación registrada. Te preguntamos en unas semanas.")
      await recargar()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos guardarla.")
    } finally {
      setGuardando(false)
    }
  }

  if (cargando) return null

  const contratado = lista.find((p) => p.estado === "contratado")

  return (
    <section className="mt-8">
      <SectionTitle
        icon={Briefcase}
        eyebrow="Tu búsqueda"
        title="Mis postulaciones"
        hint="A dónde mandaste la hoja de vida y en qué quedó. Lo registras tú."
      />

      {contratado && <Celebracion aerolinea={contratado.aerolinea} />}

      <div className="rounded-xl surface p-5">
        {lista.length === 0 && !agregando && (
          <p className="m-0 text-[15px] leading-relaxed text-muted-foreground max-w-[680px]">
            Cuando te postules a una aerolínea, regístrala aquí. Te preguntamos en unas semanas en
            qué quedó, y así sabes qué te falta para la próxima.
          </p>
        )}

        {lista.length > 0 && (
          <ul className="m-0 p-0 list-none divide-y divide-border">
            {lista.map((p) => (
              <FilaPostulacion key={p.id} postulacion={p} alCambiar={recargar} />
            ))}
          </ul>
        )}

        {agregando ? (
          <div className="mt-4 space-y-3">
            <Select value={cual} onValueChange={setCual}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="¿A cuál te postulaste?" />
              </SelectTrigger>
              <SelectContent>
                {aerolineas.map((a) => (
                  <SelectItem key={a.id} value={String(a.id)}>
                    {a.name}
                  </SelectItem>
                ))}
                <SelectItem value={OTRA}>Otra</SelectItem>
              </SelectContent>
            </Select>

            {cual === OTRA && (
              <Input
                value={otroNombre}
                onChange={(e) => setOtroNombre(e.target.value)}
                placeholder="Nombre de la aerolínea"
                className="h-11 rounded-xl"
              />
            )}

            <div>
              <div className="text-[13px] font-medium text-muted-foreground mb-1.5">Cuándo</div>
              <Input
                type="date"
                value={fecha}
                max={hoyEnColombia()}
                onChange={(e) => setFecha(e.target.value)}
                className="h-11 rounded-xl tabular-nums"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={guardar}
                disabled={guardando || cual === "" || (cual === OTRA && otroNombre.trim().length < 2)}
                className={appButtonClass({}, "cursor-pointer")}
                style={appButtonStyle()}
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setAgregando(false)}
                disabled={guardando}
                className={appButtonClass({ variant: "secondary" }, "cursor-pointer")}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAgregando(true)}
            className={appButtonClass(
              { variant: lista.length > 0 ? "secondary" : "primary" },
              "mt-4 cursor-pointer",
            )}
            style={lista.length > 0 ? undefined : appButtonStyle()}
          >
            Registrar una postulación
          </button>
        )}
      </div>
    </section>
  )
}

/** Una postulación: dónde, cuándo y en qué va. El estado se cambia aquí mismo. */
function FilaPostulacion({
  postulacion,
  alCambiar,
}: {
  postulacion: Postulacion
  alCambiar: () => Promise<void>
}) {
  const [guardando, setGuardando] = useState(false)
  const [pidiendoEtapa, setPidiendoEtapa] = useState(false)

  async function cambiar(estado: EstadoPostulacion, etapaFinal: EtapaProceso | null = null) {
    setGuardando(true)
    try {
      await actualizarPostulacion(postulacion.id, { estado, etapaFinal, nota: postulacion.nota })
      // Preguntar la etapa es opcional y va después de guardar: si el piloto
      // cierra sin contestar, el estado ya quedó.
      setPidiendoEtapa(estado === "no_quedo")
      await alCambiar()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos guardar el cambio.")
    } finally {
      setGuardando(false)
    }
  }

  return (
    <li className="py-3 first:pt-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[15px] font-semibold text-foreground truncate">
            {postulacion.aerolinea}
          </div>
          <div className="text-[13px] text-muted-foreground tabular-nums">
            {fechaLarga(postulacion.postuladaEn)}
            {postulacion.etapaFinal && ` · ${etiquetaEtapa(postulacion.etapaFinal)}`}
          </div>
        </div>
        <Select
          value={postulacion.estado}
          onValueChange={(v) => cambiar(v as EstadoPostulacion)}
          disabled={guardando}
        >
          <SelectTrigger className="h-10 w-[180px] rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ESTADOS.map((e) => (
              <SelectItem key={e.valor} value={e.valor}>
                {e.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {pidiendoEtapa && (
        <div className="mt-3 rounded-xl surface p-3.5">
          <p className="m-0 mb-2.5 text-[13px] text-muted-foreground max-w-[560px]">
            ¿Hasta dónde llegaste? Saberlo es lo que nos dice qué piden de verdad, y contra eso
            medimos si los módulos preparan para lo que hay que preparar. Puedes saltarlo.
          </p>
          <div className="flex flex-wrap gap-2">
            {ETAPAS.map((e) => (
              <button
                key={e.valor}
                type="button"
                disabled={guardando}
                onClick={() => cambiar("no_quedo", e.valor).then(() => setPidiendoEtapa(false))}
                className={appButtonClass({ variant: "secondary" }, "cursor-pointer !h-9 !text-[13px]")}
              >
                {e.nombre}
              </button>
            ))}
          </div>
        </div>
      )}
    </li>
  )
}

/**
 * Lo que pasa cuando alguien entra a una aerolínea.
 *
 * Es el único momento en toda la app en el que pedir un referido no es pedir un
 * favor: es ofrecerle compartir algo que acaba de conseguir.
 */
function Celebracion({ aerolinea }: { aerolinea: string }) {
  return (
    <div
      className="mb-4 rounded-xl p-5 border"
      style={{
        background: "color-mix(in oklab, var(--av-green-400) 10%, var(--card))",
        borderColor: "color-mix(in oklab, var(--av-green-400) 35%, var(--border))",
      }}
    >
      <div className="flex items-start gap-3.5">
        <PartyPopper className="h-6 w-6 flex-shrink-0" style={{ color: "var(--av-success-fg)" }} />
        <div className="min-w-0">
          <h3 className="m-0 text-[17px] font-semibold text-foreground">
            Entraste a {aerolinea}
          </h3>
          <p className="m-0 mt-1 text-[14px] text-muted-foreground max-w-[620px]">
            Era para esto. Si algún piloto que conoces está en lo mismo, tu enlace le da acceso y te
            suma a ti. Y tus vencimientos siguen aquí: el médico y los recurrentes no se acaban
            porque ya te contrataron.
          </p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            <Link to="/app/referidos" className={appButtonClass({ variant: "secondary" })}>
              Ver mi enlace
            </Link>
            <Link to="/app/vencimientos" className={appButtonClass({ variant: "secondary" })}>
              Mis vencimientos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function etiquetaEtapa(etapa: EtapaProceso): string {
  return ETAPAS.find((e) => e.valor === etapa)?.nombre ?? "Otra"
}

/** «14 de septiembre de 2026», leída en la zona del piloto. */
function fechaLarga(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
