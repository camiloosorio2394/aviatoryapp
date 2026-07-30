/**
 * Celda de indicador del panel PCA.
 *
 * Sin cajas independientes: las celdas comparten una rejilla con separadores
 * de un píxel, como los paneles de métricas de Stripe. Seis tarjetas sueltas
 * con su propio borde y su propia sombra pesan más que los números que
 * contienen.
 *
 * Cuando `value` es null muestra un guion. Es deliberado: sin actividad no hay
 * dominio ni tiempo promedio que reportar, y un 0% se leería como un resultado
 * malo en vez de como un dato que aún no existe.
 */
export function StatTile({
  label,
  value,
  suffix,
  hint,
  tone,
}: {
  label: string
  value: number | string | null
  suffix?: string
  hint?: string
  tone?: "warn" | "success"
}) {
  const empty = value === null || value === undefined
  const color = empty
    ? "var(--muted-foreground)"
    : tone === "warn"
      ? "var(--av-warn-fg)"
      : tone === "success"
        ? "var(--av-success-fg)"
        : "var(--foreground)"

  return (
    <div className="bg-card px-5 py-4">
      <div className="text-[13px] text-muted-foreground">{label}</div>
      <div
        className="mt-1 tabular-nums text-[28px] font-semibold leading-none tracking-[-0.03em]"
        style={{ color }}
      >
        {empty ? "—" : value}
        {!empty && suffix && (
          <span className="ml-1 text-[15px] font-normal text-muted-foreground">{suffix}</span>
        )}
      </div>
      <div className="mt-1.5 text-[13px] text-muted-foreground">{hint ?? " "}</div>
    </div>
  )
}
