/**
 * Espeja la portada del panel para que al cargar no salte la página: el mismo
 * contenedor y las mismas rejillas, con sus cortes de contenedor, y alturas
 * medidas a 1440 px (hero 250, resumen 215, preparación y aerolíneas 285,
 * accesos 170).
 *
 * Solo llega hasta los accesos: lo de debajo ya queda fuera de la primera
 * pantalla, y dibujar bloques grises que nadie ve no evita ningún salto.
 */
export function DashboardSkeleton() {
  return (
    <div
      className="@container mx-auto max-w-[1600px] animate-pulse px-5 py-6 pb-16 sm:px-8 sm:py-8"
      aria-busy="true"
      aria-label="Cargando tu panel"
    >
      {/* El hero */}
      <div className="h-[430px] rounded-[18px] bg-muted @4xl:h-[250px]" />

      {/* Horas, inglés, documentos y progreso */}
      <div className="mt-5 grid grid-cols-1 gap-4 @xl:grid-cols-2 @6xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-[200px] rounded-2xl bg-muted @6xl:h-[215px]" />
        ))}
      </div>

      {/* Preparación y aerolíneas */}
      <div className="mt-4 grid grid-cols-1 gap-4 @6xl:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
        <div className="h-[285px] rounded-2xl bg-muted" />
        <div className="h-[285px] rounded-2xl bg-muted" />
      </div>

      {/* Accesos rápidos */}
      <div className="mt-4 h-[170px] rounded-2xl bg-muted" />
    </div>
  )
}
