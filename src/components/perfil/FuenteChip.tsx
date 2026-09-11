/** Chip de fuente del dato: lo que midió Aviatory contra lo que declaró el piloto. */
export function FuenteChip({ verificado }: { verificado: boolean }) {
  return (
    <span
      className="mono text-[10px] font-bold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded"
      style={
        verificado
          ? { color: "var(--av-success-fg)", background: "color-mix(in oklab, var(--av-green-400) 12%, transparent)" }
          : { color: "var(--doc-muted, #6a6e76)", background: "color-mix(in oklab, var(--doc-fg) 6%, transparent)" }
      }
    >
      {verificado ? "Verificado por Aviatory" : "Declarado"}
    </span>
  )
}
