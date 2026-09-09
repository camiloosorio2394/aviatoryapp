import { useCallback, useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { ArrowLeft, Play } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { PsicoPlayer } from "@/components/psicotecnicas/PsicoPlayer"
import { PsicoResultado } from "@/components/psicotecnicas/PsicoResultado"
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
  type RespuestaPsico,
  type ResultadoPsico,
  armarTanda,
  calcularResultado,
  filtrar,
} from "@/lib/psicotecnicas"
import { BANCO } from "@/data/psicotecnicas"
import { guardarSesion } from "@/lib/psicotecnicasProgress"

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
 * La pantalla tiene tres estados y no navega entre rutas para pasar de uno a
 * otro: configurar, resolver y resultado. Cambiar de URL a mitad de una prueba
 * cronometrada es la forma más fácil de perder el reloj y las respuestas.
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
  const [tanda, setTanda] = useState<ReturnType<typeof armarTanda> | null>(null)
  const [resultado, setResultado] = useState<ResultadoPsico | null>(null)
  // Se guardan también las respuestas: son las que dejan repasar los
  // fallados en el informe, con su figura y su explicación.
  const [respuestas, setRespuestas] = useState<RespuestaPsico[] | null>(null)

  /** Cuántos hay realmente con el filtro puesto: la pantalla no promete de más. */
  const disponibles = useMemo(
    () => filtrar(BANCO, { categoria, nivel }).length,
    [categoria, nivel]
  )

  const empezar = useCallback(() => {
    setResultado(null)
    setRespuestas(null)
    setTanda(armarTanda(BANCO, { categoria, nivel }, Math.min(cantidad, disponibles)))
  }, [categoria, nivel, cantidad, disponibles])

  const terminar = useCallback(
    (respuestas: RespuestaPsico[]) => {
      const r = calcularResultado(respuestas)
      setRespuestas(respuestas)
      setResultado(r)
      setTanda(null)
      void guardarSesion({ modo, nivel, categoria, resultado: r })
    },
    [modo, nivel, categoria]
  )

  // Resolviendo: la pantalla se queda con el ejercicio y nada más.
  if (tanda) {
    return (
      <AppLayout>
        <div className="px-4 sm:px-7 py-6 sm:py-8 pb-16">
          <PsicoPlayer
            ejercicios={tanda}
            modo={modo}
            nivel={nivel}
            onTerminar={terminar}
          />
        </div>
      </AppLayout>
    )
  }

  if (resultado) {
    return (
      <AppLayout>
        <div className="px-4 sm:px-7 py-6 sm:py-8 pb-16">
          <PsicoResultado
            resultado={resultado}
            ejercicios={tanda ?? undefined}
            respuestas={respuestas ?? undefined}
            onRepetir={empezar}
          />
        </div>
      </AppLayout>
    )
  }

  const sinMaterial = disponibles === 0

  return (
    <AppLayout>
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
    </AppLayout>
  )
}

function Grupo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
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
  children: React.ReactNode
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
