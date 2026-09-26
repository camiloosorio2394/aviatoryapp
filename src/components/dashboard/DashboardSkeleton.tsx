/**
 * Espeja la portada del panel para que al cargar no salte la página: el mismo
 * contenedor y las mismas rejillas, con sus cortes de contenedor, y alturas
 * medidas a 1440 px (hero 260, resumen 225, preparación y aerolíneas 295,
 * vencimientos y constancia 200).
 */
export function DashboardSkeleton() {
  return (
    <div
      className="@container mx-auto max-w-[1600px] animate-pulse px-5 py-6 pb-16 sm:px-8 sm:py-8"
      aria-busy="true"
      aria-label="Cargando tu panel"
    >
      {/* El hero */}
      <div className="h-[440px] rounded-[18px] bg-muted @4xl:h-[260px]" />

      {/* Horas, inglés, documentos y progreso */}
      <div className="mt-5 grid grid-cols-1 gap-4 @xl:grid-cols-2 @6xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-[210px] rounded-2xl bg-muted @6xl:h-[225px]" />
        ))}
      </div>

      {/* Preparación y aerolíneas */}
      <div className="mt-4 grid grid-cols-1 gap-4 @6xl:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
        <div className="h-[295px] rounded-2xl bg-muted" />
        <div className="h-[295px] rounded-2xl bg-muted" />
      </div>

      {/* Vencimientos, racha, cifras y destinos */}
      <div className="mt-4 grid grid-cols-1 gap-4 @3xl:grid-cols-2 @6xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-[200px] rounded-2xl bg-muted" />
        ))}
      </div>
    </div>
  )
}
