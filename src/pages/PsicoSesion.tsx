import { useState, type ReactNode } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { ArrowLeft, Play, RotateCcw } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { EstadoError } from "@/components/EstadoError"
import { PsicoCargando } from "@/components/psicotecnicas/EstadosPsico"
import { PsicoPlayer } from "@/components/psicotecnicas/PsicoPlayer"
import { PsicoResultado } from "@/components/psicotecnicas/PsicoResultado"
import { itemsDeRepaso, useSesionPsico } from "@/hooks/useSesionPsico"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import {
  CATEGORIAS,
  MODOS,
  NIVELES,
  NOTA_TIEMPOS,
  PSICO_HUB,
  type CategoriaPsico,
  type ModoPsico,
  type NivelPsico,
} from "@/lib/psicotecnicas"
import { disponiblesPsico } from "@/lib/psicotecnicasConteo"

type Filtro = CategoriaPsico | "todas"
type Nivel = NivelPsico | "todos"

const CANTIDADES = [10, 20, 30] as const

type ModoConFiltro = Extract<ModoPsico, "entrenamiento" | "evaluacion">

interface Props {
  modo: ModoConFiltro
}

/**
 * Las dos rutas entran por aquí y no con una prop desde App.tsx: el ayudante
 * `page()` que carga las páginas en diferido las tipa como componentes sin
 * props, y cambiarlo tocaría las cincuenta rutas de la app para arreglar dos.
 */
export function PsicoPractica() {
  return <PsicoSesion modo="entrenamiento" />
}

export function PsicoEvaluacion() {
  return <PsicoSesion modo="evaluacion" />
}

/**
 * Una tanda de entrenamiento o de evaluación.
 *
 * La pantalla no navega entre rutas para pasar de configurar a resolver y al
 * resultado: cambiar de URL a mitad de una prueba cronometrada es la forma más
 * fácil de perder el reloj y las respuestas. Los ejercicios, el reloj y la nota
 * son del servidor (useSesionPsico).
 *
 * La configuración llega por query string cuando se entra desde una tarjeta del
 * hub («entrenar espacial»), de modo que ese enlace deja el filtro puesto y el
 * piloto solo tiene que darle a empezar.
 */
export function PsicoSesion({ modo }: Props) {
  const [params] = useSearchParams()
  const categoriaInicial = params.get("categoria")

  const [categoria, setCategoria] = useState<Filtro>(
    categoriaInicial && categoriaInicial in CATEGORIAS
      ? (categoriaInicial as CategoriaPsico)
      : "todas"
  )
  const [nivel, setNivel] = useState<Nivel>("todos")
  const [cantidad, setCantidad] = useState<number>(10)
  const psico = useSesionPsico()
  const { estado, errorAccion } = psico

  /** Cuántos hay realmente con el filtro puesto: la pantalla no promete de más. */
  const disponibles = disponiblesPsico({ categoria, nivel })

  function empezar() {
    void psico.empezar({ modo, categoria, nivel, cantidad: Math.min(cantidad, disponibles) })
  }

  if (estado.fase === "iniciando") {
    return (
      <Marco>
        <PsicoCargando texto="Preparando tus ejercicios..." />
      </Marco>
    )
  }

  if (estado.fase === "error") {
    return (
      <Marco>
        <EstadoError
          titulo="No pudimos preparar la tanda"
          mensaje={estado.error.message}
          acciones={
            <>
              <button
                type="button"
                onClick={() => void psico.empezar(estado.parametros)}
                className={appButtonClass({ size: "lg" })}
                style={appButtonStyle()}
              >
                <RotateCcw className="h-4 w-4" /> Intentar de nuevo
              </button>
              <button type="button" onClick={psico.volverAConfigurar} className={appButtonClass({ variant: "secondary", size: "lg" })}>
                Cambiar la configuración
              </button>
            </>
          }
        />
      </Marco>
    )
  }

  // Resolviendo: la pantalla se queda con el ejercicio y nada más.
  if (estado.fase === "en_curso") {
    return (
      <Marco>
        <PsicoPlayer
          key={estado.sesion.id}
          sesion={estado.sesion}
          onCorregir={psico.corregir}
          onRegistrar={psico.registrar}
          onAplazar={psico.aplazar}
          onTerminar={() => void psico.terminar()}
          errorAccion={errorAccion}
        />
      </Marco>
    )
  }

  if (estado.fase === "terminando") {
    return (
      <Marco>
        {errorAccion ? (
          <EstadoError
            titulo="No pudimos cerrar la tanda"
            mensaje={errorAccion.message}
            acciones={
              <>
                <button type="button" onClick={() => void psico.terminar()} className={appButtonClass({ size: "lg" })} style={appButtonStyle()}>
                  <RotateCcw className="h-4 w-4" /> Intentar de nuevo
                </button>
                <button type="button" onClick={psico.volverAConfigurar} className={appButtonClass({ variant: "secondary", size: "lg" })}>
                  Empezar otra tanda
                </button>
              </>
            }
          />
        ) : (
          <PsicoCargando texto="Calculando tu resultado..." />
        )}
      </Marco>
    )
  }

  if (estado.fase === "terminada") {
    return (
      <Marco>
        <PsicoResultado
          resultado={estado.resultado}
          repaso={itemsDeRepaso(estado.sesion, estado.servidor)}
          onRepetir={empezar}
        />
      </Marco>
    )
  }

  const sinMaterial = disponibles === 0

  return (
    <>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-16 max-w-[820px] mx-auto">
        <Link
          to={PSICO_HUB}
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Pruebas psicotécnicas
        </Link>

        <PageHeader
          title={`Modo ${MODOS[modo].nombre.toLowerCase()}`}
          subtitle={MODOS[modo].descripcion}
        />

        <div className="rounded-2xl surface p-6 space-y-6">
          <Grupo titulo="Categoría">
            <Opcion activo={categoria === "todas"} onClick={() => setCategoria("todas")}>
              Todas
            </Opcion>
            {(Object.keys(CATEGORIAS) as CategoriaPsico[]).map((c) => (
              <Opcion key={c} activo={categoria === c} onClick={() => setCategoria(c)}>
                {CATEGORIAS[c].corto}
              </Opcion>
            ))}
          </Grupo>

          <Grupo titulo="Nivel">
            <Opcion activo={nivel === "todos"} onClick={() => setNivel("todos")}>
              Todos
            </Opcion>
            {(["basico", "intermedio", "avanzado"] as const).map((n) => (
              <Opcion key={n} activo={nivel === n} onClick={() => setNivel(n)}>
                {NIVELES[n].nombre}
              </Opcion>
            ))}
          </Grupo>

          <Grupo titulo="Cuántos ejercicios">
            {CANTIDADES.map((c) => (
              <Opcion key={c} activo={cantidad === c} onClick={() => setCantidad(c)}>
                {c}
              </Opcion>
            ))}
          </Grupo>

          <div className="pt-2 border-t border-border">
            <p className="text-[13px] text-muted-foreground">
              {sinMaterial
                ? "Con este filtro no hay ejercicios cargados todavía. Prueba con otro nivel o con todas las categorías."
                : `Con este filtro hay ${disponibles} ejercicios disponibles. La tanda toma ${Math.min(
                    cantidad,
                    disponibles
                  )} sin repetir.`}
            </p>
            <button
              type="button"
              onClick={empezar}
              disabled={sinMaterial}
              className={appButtonClass({ size: "lg" }, "mt-4")}
              style={appButtonStyle()}
            >
              <Play className="h-4 w-4" /> Empezar
            </button>
          </div>
        </div>

        <p className="mt-5 text-[13px] text-muted-foreground leading-relaxed">{NOTA_TIEMPOS}</p>
      </div>
    </>
  )
}

function Marco({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-16">{children}</div>
    </>
  )
}

function Grupo({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-[13px] font-semibold text-foreground/80 mb-2">{titulo}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Opcion({
  activo,
  onClick,
  children,
}: {
  activo: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className="h-9 px-4 rounded-lg border text-[15px] font-medium transition-colors"
      style={{
        borderColor: activo ? "var(--av-blue-500)" : "var(--border)",
        background: activo
          ? "color-mix(in oklab, var(--av-blue-500) 12%, transparent)"
          : undefined,
        color: activo ? "var(--av-blue-500)" : undefined,
      }}
    >
      {children}
    </button>
  )
}
