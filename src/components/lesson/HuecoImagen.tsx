/**
 * Hueco de imagen rotulado, VISIBLE a propósito.
 *
 * La app está en construcción, solo entran Camilo y Nico, y el hueco es el
 * recordatorio de qué imagen falta y de qué medida. Sin radio, hundido en
 * paper-sunk, como manda el handoff. Cuando llegue el archivo real, el hueco
 * se cambia por la imagen conservando el pie.
 *
 * Lo comparten el lector (portadas) y los bloques de curso (la foto de un
 * caso real): la misma pieza en los dos sitios para que un hueco se reconozca
 * como hueco en cualquier lección.
 */
export function HuecoImagen({
  rotulo,
  descripcion,
  alto,
  anchoMax,
  pie,
  ratio,
}: {
  rotulo: string
  descripcion: string
  alto: number
  anchoMax?: number
  pie?: string
  /** Proporción, si el hueco reemplaza a una imagen que la lleva: así mide lo
   *  mismo que la foto en cualquier ancho, y no 270px fijos en el móvil. */
  ratio?: string
}) {
  return (
    <figure
      className={anchoMax ? "m-0 mx-auto w-full" : "m-0 w-full"}
      style={anchoMax ? { maxWidth: anchoMax } : undefined}
    >
      <div
        className="flex flex-col items-center justify-center gap-1.5 border px-6 text-center"
        style={{
          height: ratio ? undefined : alto,
          aspectRatio: ratio,
          minHeight: ratio ? 150 : undefined,
          background: "var(--ln-sunk, var(--doc-soft))",
          borderColor: "var(--ln-hair, var(--doc-border))",
        }}
      >
        <span
          className="mono text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: "var(--ln-primary, var(--doc-accent))" }}
        >
          {rotulo}
        </span>
        <span
          className="max-w-[460px] text-[13.5px] leading-[1.5]"
          style={{ color: "var(--ln-soft, var(--doc-muted))" }}
        >
          {descripcion}
        </span>
      </div>
      {pie && (
        <figcaption
          className="mt-2 text-[12.5px] leading-[1.5]"
          style={{ color: "var(--ln-faint, var(--doc-muted))" }}
        >
          {pie}
        </figcaption>
      )}
    </figure>
  )
}
