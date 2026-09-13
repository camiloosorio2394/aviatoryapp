export function IdField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[12px] font-semibold text-muted-foreground">
        {label}
      </div>
      <div className="tabular-nums mt-0.5 text-[15px] font-semibold text-foreground tracking-[-0.02em]">
        {value}
      </div>
    </div>
  )
}
