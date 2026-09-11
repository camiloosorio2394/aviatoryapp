/**
 * Espeja el layout real (mismas clases de grid, mismos breakpoints y alturas
 * parecidas) para que al cargar no salte la página.
 */
export function DashboardSkeleton() {
  return (
    <>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto animate-pulse">
        {/* Consola: hero + indicadores, una sola pieza */}
        <div className="h-[430px] bg-muted rounded-xl" />

        {/* Tus cursos */}
        <div className="grid gap-4 md:grid-cols-3 mt-6 mb-6">
          <div className="h-[184px] bg-muted rounded-lg" />
          <div className="h-[184px] bg-muted rounded-lg" />
          <div className="h-[184px] bg-muted rounded-lg" />
        </div>

        {/* Plan de hoy + Wingman */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4 mb-6">
          <div>
            <div className="h-[52px] w-[260px] bg-muted rounded-lg mb-4" />
            <div className="h-[186px] bg-muted rounded-lg mt-3" />
          </div>
          <div className="h-[226px] bg-muted rounded-lg" />
        </div>

        {/* Racha + actividad */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,1fr)_2.2fr] gap-4 mb-6">
          <div className="h-[248px] bg-muted rounded-lg" />
          <div className="h-[248px] bg-muted rounded-lg" />
        </div>

        {/* Logros + cohorte */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
          <div className="h-[212px] bg-muted rounded-lg" />
          <div className="h-[212px] bg-muted rounded-lg" />
        </div>
      </div>
    </>
  )
}
