import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  MapPinned,
  RotateCcw,
} from "lucide-react"
import { AP_ACENTO, AP_APRENDE, AP_PRACTICA } from "@/lib/aeropuertos"
import { AP_MISIONES, resultadoPaso, type MisionAeropuertos } from "@/lib/aeropuertosMisiones"

const CLAVE_LOCAL = "aviatory-aeropuertos-misiones-v1"

function leerCompletadas(): string[] {
  try {
    const guardadas: unknown = JSON.parse(localStorage.getItem(CLAVE_LOCAL) ?? "[]")
    return Array.isArray(guardadas)
      ? Array.from(new Set(guardadas.filter((id): id is string => typeof id === "string" && AP_MISIONES.some((m) => m.id === id))))
      : []
  } catch {
    return []
  }
}

function guardarCompletadas(ids: string[]): void {
  try {
    localStorage.setItem(CLAVE_LOCAL, JSON.stringify(ids))
  } catch {
    // La práctica funciona aunque el navegador bloquee el almacenamiento.
  }
}

export function AeropuertosMisiones() {
  const [activa, setActiva] = useState<string | null>(null)
  const [pasoActual, setPasoActual] = useState(0)
  const [elegida, setElegida] = useState<number | null>(null)
  const [errores, setErrores] = useState(0)
  const [terminada, setTerminada] = useState(false)
  const [completadas, setCompletadas] = useState(leerCompletadas)

  const mision = AP_MISIONES.find((item) => item.id === activa)
  const paso = mision?.pasos[pasoActual]
  const resultado = paso && elegida !== null ? resultadoPaso(paso, elegida) : null

  function abrir(id: string): void {
    setActiva(id)
    setPasoActual(0)
    setElegida(null)
    setErrores(0)
    setTerminada(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function volver(): void {
    setActiva(null)
    setElegida(null)
    setTerminada(false)
  }

  function elegir(indice: number): void {
    if (!paso || elegida !== null) return
    setElegida(indice)
    if (indice !== paso.correcta) setErrores((n) => n + 1)
  }

  function avanzar(): void {
    if (!mision || !resultado?.correcto) return
    if (pasoActual < mision.pasos.length - 1) {
      setPasoActual((n) => n + 1)
      setElegida(null)
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    setTerminada(true)
    if (!completadas.includes(mision.id)) {
      const nuevas = [...completadas, mision.id]
      setCompletadas(nuevas)
      guardarCompletadas(nuevas)
    }
  }

  return (
    <div
      className="mx-auto max-w-[1120px] px-4 py-8 pb-20 sm:px-7 sm:py-11"
      style={{ "--ap-acento": AP_ACENTO } as React.CSSProperties}
    >
      {mision && (
        <button
          type="button"
          onClick={volver}
          className="mb-5 inline-flex min-h-[40px] items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Todas las misiones
        </button>
      )}
      {!mision && (
        <Link to={AP_PRACTICA} className="mb-5 inline-flex min-h-[40px] items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a los ejercicios
        </Link>
      )}

      {!mision ? (
        <>
          <header className="overflow-hidden rounded-[20px] bg-[#142D2A] px-6 py-9 text-white sm:px-10 sm:py-12">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#B8E8D9]">
              <MapPinned className="h-4 w-4" /> Aeropuertos · Misiones guiadas
            </div>
            <h1 className="mt-4 max-w-[760px] font-[Archivo] text-[32px] font-semibold leading-[1.12] sm:text-[44px]">
              Observa. Decide. Vuelve a decidir.
            </h1>
            <p className="mt-4 max-w-[690px] text-[15px] leading-relaxed text-white/80">
              Cuatro situaciones breves donde aparece un dato nuevo después de tu primera decisión.
              Toca una pista visual, resuelve el caso y revisa por qué cambió la respuesta.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 text-[12px] text-white/85">
              <CheckCircle2 className="h-4 w-4" /> {completadas.length} de {AP_MISIONES.length} misiones completadas en este navegador
            </div>
          </header>

          <section className="mt-8" aria-labelledby="misiones-titulo">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: AP_ACENTO }}>Ruta de práctica</div>
                <h2 id="misiones-titulo" className="mt-1 font-[Archivo] text-[24px] font-semibold">Elige una misión</h2>
              </div>
              <span className="text-[12px] text-muted-foreground">3 momentos por misión · repite sin penalización</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {AP_MISIONES.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => abrir(item.id)}
                  className="group overflow-hidden rounded-2xl border border-border bg-card text-left transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-[#2F766A] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F766A]"
                >
                  <div className="relative aspect-[16/7] overflow-hidden bg-[#142D2A]">
                    <img src={item.imagen.src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-[1.025]" />
                    <span className="absolute left-4 top-4 rounded-md bg-[#142D2A]/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                      Misión {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: AP_ACENTO }}>{item.momento}</div>
                        <h3 className="mt-1 font-[Archivo] text-[21px] font-semibold leading-tight">{item.titulo}</h3>
                      </div>
                      {completadas.includes(item.id) && <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: AP_ACENTO }} aria-label="Completada" />}
                    </div>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{item.subtitulo}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: AP_ACENTO }}>
                      {completadas.includes(item.id) ? "Repetir misión" : "Empezar misión"} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <p className="mt-7 rounded-xl border border-border bg-card p-4 text-[12.5px] leading-relaxed text-muted-foreground">
            Son escenarios ficticios de formación. Las fotografías ilustran el momento inicial y no representan
            cartas, reportes ni interfaces operativas vigentes. Estas misiones son complementarias: no alteran el
            avance de los 30 ejercicios ni la evaluación.
          </p>
        </>
      ) : terminada ? (
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-9" aria-live="polite">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#DDF4EA] text-[#2F766A]"><Check className="h-6 w-6" /></span>
          <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: AP_ACENTO }}>Misión completada</div>
          <h1 className="mt-1 font-[Archivo] text-[30px] font-semibold">{mision.titulo}</h1>
          <p className="mt-3 max-w-[760px] text-[15px] leading-relaxed">{mision.cierre}</p>
          <div className="mt-5 rounded-xl border border-border bg-muted/35 p-4 text-[13px] leading-relaxed">
            {errores === 0
              ? "Resolviste los tres momentos al primer intento."
              : `Tuviste ${errores} ${errores === 1 ? "intento para revisar" : "intentos para revisar"}. Puedes repetir la misión y comprobar si reconoces antes las pistas importantes.`}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {mision.lecciones.map((n) => (
              <Link key={n} to={`${AP_APRENDE}?l=${n}`} className="inline-flex min-h-[40px] items-center rounded-lg border border-border px-3 text-[12.5px] font-semibold hover:bg-muted">
                Repasar lección {String(n).padStart(2, "0")}
              </Link>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => abrir(mision.id)} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-border px-4 text-[13px] font-semibold hover:bg-muted">
              <RotateCcw className="h-4 w-4" /> Repetir
            </button>
            <button type="button" onClick={volver} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 text-[13px] font-semibold text-white" style={{ background: AP_ACENTO }}>
              Elegir otra misión <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      ) : paso ? (
        <MisionEnCurso
          key={`${mision.id}-${pasoActual}`}
          mision={mision}
          pasoActual={pasoActual}
          elegida={elegida}
          onElegir={elegir}
          onReintentar={() => setElegida(null)}
          onAvanzar={avanzar}
        />
      ) : null}
    </div>
  )
}

function MisionEnCurso({
  mision,
  pasoActual,
  elegida,
  onElegir,
  onReintentar,
  onAvanzar,
}: {
  mision: MisionAeropuertos
  pasoActual: number
  elegida: number | null
  onElegir: (indice: number) => void
  onReintentar: () => void
  onAvanzar: () => void
}) {
  const paso = mision.pasos[pasoActual]
  const resultado = elegida !== null ? resultadoPaso(paso, elegida) : null

  return (
    <article>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: AP_ACENTO }}>{mision.momento}</div>
          <h1 className="mt-1 font-[Archivo] text-[28px] font-semibold leading-tight">{mision.titulo}</h1>
        </div>
        <span className="rounded-full border border-border px-3 py-1.5 text-[12px] font-semibold">Momento {pasoActual + 1} de {mision.pasos.length}</span>
      </div>
      <div className="mb-5 flex gap-1.5" aria-label={`Momento ${pasoActual + 1} de ${mision.pasos.length}`}>
        {mision.pasos.map((item, i) => (
          <span key={item.titulo} className="h-1.5 flex-1 rounded-full" style={{ background: i <= pasoActual ? AP_ACENTO : "var(--border)" }} />
        ))}
      </div>
      <div className="grid items-start gap-5 md:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)]">
        <figure className="m-0 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#142D2A]">
            <img src={mision.imagen.src} alt={mision.imagen.alt} className="h-full w-full object-cover" />
            {paso.tipo === "observa" && paso.puntos.map((punto, i) => {
              const seleccionado = elegida === i
              const tono = seleccionado ? (i === paso.correcta ? "#2F766A" : "#B34C4C") : "#142D2A"
              return (
                <button
                  key={punto.nombre}
                  type="button"
                  onClick={() => onElegir(i)}
                  disabled={elegida !== null}
                  aria-label={`Seleccionar punto ${i + 1}: ${punto.nombre}`}
                  aria-pressed={seleccionado}
                  className="absolute z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-[13px] font-bold text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:hover:scale-100 sm:h-10 sm:w-10"
                  style={{ left: `${punto.x}%`, top: `${punto.y}%`, background: tono }}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <figcaption className="px-4 py-3 text-[12px] leading-relaxed text-muted-foreground">
            {paso.tipo === "observa" ? <><Eye className="mr-1 inline h-3.5 w-3.5" /> Toca uno de los puntos numerados. </> : <>Referencia del momento inicial. </>}
            {mision.imagen.pie}
          </figcaption>
        </figure>

        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6" aria-labelledby="paso-titulo">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: AP_ACENTO }}>
            {paso.tipo === "observa" ? "01 · Observa" : pasoActual === 1 ? "02 · Decide" : "03 · Dato nuevo"}
          </div>
          <h2 id="paso-titulo" className="mt-1.5 font-[Archivo] text-[22px] font-semibold leading-tight">{paso.titulo}</h2>
          <p className="mt-3 rounded-xl border border-border bg-muted/35 p-3.5 text-[14px] leading-relaxed">{paso.situacion}</p>
          <h3 className="mt-5 text-[15px] font-semibold leading-snug">{paso.pregunta}</h3>

          {paso.tipo === "observa" ? (
            <div className="mt-3 flex flex-wrap gap-2" aria-label="Puntos de la imagen">
              {paso.puntos.map((punto, i) => (
                <button
                  key={punto.nombre}
                  type="button"
                  onClick={() => onElegir(i)}
                  disabled={elegida !== null}
                  aria-label={`Punto ${i + 1}: ${punto.nombre}`}
                  aria-pressed={elegida === i}
                  className="inline-flex min-h-[40px] items-center rounded-lg border border-border px-3 text-[13px] font-semibold hover:bg-muted disabled:hover:bg-transparent"
                >
                  Punto {i + 1}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-3 grid gap-2.5">
              {paso.opciones.map((opcion, i) => (
                <button
                  key={opcion.texto}
                  type="button"
                  onClick={() => onElegir(i)}
                  disabled={elegida !== null}
                  aria-pressed={elegida === i}
                  className="min-h-[50px] rounded-xl border p-3.5 text-left text-[13.5px] leading-relaxed transition-colors hover:bg-muted disabled:hover:bg-transparent"
                  style={{
                    borderColor: elegida === i ? (i === paso.correcta ? AP_ACENTO : "#B34C4C") : "var(--border)",
                    background: elegida === i ? (i === paso.correcta ? "#E8F6F0" : "#FCEDEC") : undefined,
                  }}
                >
                  <span className="mr-2 font-mono text-[11px] font-bold text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                  {opcion.texto}
                </button>
              ))}
            </div>
          )}

          {resultado && (
            <div className="mt-4 rounded-xl border p-4" style={{ borderColor: resultado.correcto ? "#A4D9BF" : "#EAC0BC", background: resultado.correcto ? "#EFF9F4" : "#FFF5F3" }} aria-live="polite">
              <div className="text-[13px] font-bold" style={{ color: resultado.correcto ? "#21624F" : "#933B38" }}>
                {resultado.correcto ? "Bien observado." : "Revisa esa pista."}
              </div>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#21332E]">
                {paso.tipo === "observa" && elegida !== null && <strong>{paso.puntos[elegida].nombre}. </strong>}
                {resultado.explicacion}
              </p>
              {resultado.correcto ? (
                <button type="button" onClick={onAvanzar} className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 text-[13px] font-semibold text-white" style={{ background: AP_ACENTO }}>
                  {pasoActual === mision.pasos.length - 1 ? "Ver lo aprendido" : "Continuar al siguiente momento"} <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button type="button" onClick={onReintentar} className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#EAC0BC] px-4 text-[13px] font-semibold text-[#933B38] hover:bg-white">
                  <RotateCcw className="h-4 w-4" /> Probar otra vez
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </article>
  )
}
