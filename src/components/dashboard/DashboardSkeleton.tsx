/**
 * Espeja la portada del panel para que al cargar no salte la página: el mismo
 * contenedor, las mismas secciones y las mismas rejillas, con alturas medidas
 * a 1440 px (hero 260, cursos 314, perfil 224, aerolíneas 212, constancia 222).
 */
function Encabezado() {
  return <div className="h-[45px] w-full max-w-[340px] rounded-xl bg-muted" />
}

export function DashboardSkeleton() {
  return (
    <div
      className="@container mx-auto max-w-[1600px] animate-pulse px-5 py-6 pb-16 sm:px-8 sm:py-8"
      aria-busy="true"
      aria-label="Cargando tu panel"
    >
      {/* El hero */}
      <div className="h-[440px] rounded-[18px] bg-muted @4xl:h-[260px]" />

      {/* Tus cursos abiertos */}
      <div className="mt-10 flex flex-col gap-4">
        <Encabezado />
        <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2 @4xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[314px] rounded-2xl bg-muted" />
          ))}
        </div>
      </div>

      {/* Tu perfil de piloto */}
      <div className="mt-10 flex flex-col gap-4">
        <Encabezado />
        <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-[224px] rounded-2xl bg-muted" />
          ))}
        </div>
      </div>

      {/* Tu perfil frente a aerolíneas */}
      <div className="mt-10 flex flex-col gap-4">
        <Encabezado />
        <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[212px] rounded-2xl bg-muted" />
          ))}
        </div>
      </div>

      {/* Tu constancia */}
      <div className="mt-10 flex flex-col gap-4">
        <Encabezado />
        <div className="grid grid-cols-1 gap-4 @3xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[222px] rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    </div>
  )
}
