/**
 * Espeja el panel real para que al cargar no salte la página: el mismo
 * contenedor, los mismos rótulos de grupo, las mismas rejillas con sus mismos
 * cortes de contenedor y alturas medidas en el navegador a 1440 px (hero 261,
 * números 143, accesos 202, módulos 822, cursos 235).
 *
 * Solo llega hasta los cursos: lo de debajo ya queda fuera de la primera
 * pantalla, y dibujar bloques grises que nadie ve no evita ningún salto.
 */
function Rotulo({ ancho }: { ancho: number }) {
  return <div className="h-3 rounded bg-muted" style={{ width: ancho }} />
}

export function DashboardSkeleton() {
  return (
    <div
      className="@container mx-auto max-w-[1600px] animate-pulse px-5 py-6 pb-16 sm:px-8 sm:py-8"
      aria-busy="true"
      aria-label="Cargando tu panel"
    >
      {/* El hero */}
      <div className="h-[340px] rounded-[18px] bg-muted @4xl:h-[261px]" />

      {/* Tus números */}
      <div className="mt-8">
        <Rotulo ancho={96} />
        <div className="mt-3 h-[210px] rounded-2xl bg-muted @3xl:h-[114px]" />
      </div>

      {/* Accesos directos */}
      <div className="mt-8">
        <Rotulo ancho={132} />
        <div className="mt-3 grid grid-cols-1 gap-3 @xl:grid-cols-2 @4xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-[76px] rounded-2xl bg-muted" />
          ))}
        </div>
      </div>

      {/* Ingreso a aerolínea */}
      <div className="mt-8">
        <Rotulo ancho={148} />
        <div className="mt-3 grid grid-cols-1 gap-4 @xl:grid-cols-2 @4xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-[386px] rounded-2xl bg-muted" />
          ))}
        </div>
      </div>

      {/* Tus cursos */}
      <div className="mt-8">
        <Rotulo ancho={88} />
        <div className="mt-3 grid grid-cols-1 gap-4 @4xl:grid-cols-2">
          <div className="h-[206px] rounded-2xl bg-muted" />
          <div className="h-[206px] rounded-2xl bg-muted" />
        </div>
      </div>
    </div>
  )
}
